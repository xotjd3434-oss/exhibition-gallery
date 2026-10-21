import { Link } from "react-router-dom";
import ExhibitionCard from "../components/ExhibitionCard";
import { exhibitions } from "../data/exhibitions";

export default function MyPage({ saved, toggleSave }) {
  const items = exhibitions.filter((item) => saved.includes(item.id));
  return (
    <main id="main" className="shell page saved-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">다음에 꼭 만나고 싶은 순간들</p>
          <h2>
            나의 관심 전시 <span>{items.length}</span>
          </h2>
        </div>
        <Link className="text-link" to="/exhibition">
          더 둘러보기 →
        </Link>
      </div>
      {items.length ? (
        <>
          <p className="saved-description">
            마음에 담은 전시를 모았어요. 하트를 다시 누르면 해제할 수 있어요.
          </p>
          <div className="exhibition-grid">
            {items.map((item, index) => (
              <ExhibitionCard
                key={item.id}
                exhibition={item}
                saved={saved}
                toggleSave={toggleSave}
                index={index}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <h3>아직 마음에 담은 전시가 없어요.</h3>
          <p>마음에 드는 전시의 하트를 눌러 나만의 목록을 만들어보세요.</p>
          <Link className="pill-button" to="/exhibition">
            전시 찾아보기 <span>→</span>
          </Link>
        </div>
      )}
    </main>
  );
}
