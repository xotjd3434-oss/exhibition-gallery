import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Exhibition from "./pages/Exhibition";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";
import "./App.css";

function readSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem("muse-saved") || "[]");
    return Array.isArray(saved)
      ? [...new Set(saved.filter(Number.isInteger))]
      : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [saved, setSaved] = useState(readSaved);
  const [notice, setNotice] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2600);
    return () => clearTimeout(timer);
  }, [notice]);

  function toggleSave(item) {
    const exists = saved.includes(item.id);
    const next = exists
      ? saved.filter((id) => id !== item.id)
      : [...saved, item.id];
    setSaved(next);
    try {
      localStorage.setItem("muse-saved", JSON.stringify(next));
    } catch {
      setNotice("저장 공간을 사용할 수 없어 이번 방문 동안만 보관돼요.");
      return;
    }
    setNotice(
      exists
        ? `${item.title} 전시를 해제했어요.`
        : `${item.title} 전시를 담았어요.`,
    );
  }

  const shared = { saved, toggleSave };

  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 이동
      </a>
      <Header count={saved.length} />
      <Routes>
        <Route path="/" element={<Home {...shared} />} />
        <Route path="/exhibition" element={<Exhibition {...shared} />} />
        <Route path="/exhibition/:id" element={<Detail {...shared} />} />
        <Route path="/mypage" element={<MyPage {...shared} />} />
        <Route
          path="*"
          element={
            <main id="main" className="empty-state page">
              <h2>페이지를 찾을 수 없어요.</h2>
              <Link className="text-link" to="/">
                홈으로 돌아가기 →
              </Link>
            </main>
          }
        />
      </Routes>
      <footer className="footer shell">
        <Link to="/" className="footer-logo">
          MUSE SEOUL
        </Link>
        <p>일상과 예술 사이, 새로운 발견.</p>
        <small>
          포트폴리오용 예시 전시 · 실제 개최 및 예매 정보가 아닙니다.
        </small>
        <span>© MUSE SEOUL 2026</span>
      </footer>
      <button
        className="top-button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="맨 위로 이동"
      >
        TOP
      </button>
      <div
        className={`toast ${notice ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice}
      </div>
    </>
  );
}
