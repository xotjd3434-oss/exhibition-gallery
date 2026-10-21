import { NavLink, Link } from "react-router-dom";

export default function Header({ count }) {
  return (
    <header className="header">
      <div className="shell header-inner">
        <Link to="/" aria-label="MUSE SEOUL 홈">
          <h1>
            MUSE SEOUL
          </h1>
        </Link>
        <nav aria-label="주 메뉴">
          <NavLink to="/" end>
            홈
          </NavLink>
          <NavLink to="/exhibition">전시 둘러보기</NavLink>
          <NavLink to="/mypage">
            관심 전시 <span className="saved-count">{count}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
