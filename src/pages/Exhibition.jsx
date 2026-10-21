import { useSearchParams } from "react-router-dom";
import ExhibitionCard from "../components/ExhibitionCard";
import {
  categories,
  filterExhibitions,
} from "../data/exhibitions";

export default function Exhibition({ saved, toggleSave, embedded = false }) {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "전체";
  const region = params.get("region") || "전체";
  const status = params.get("status") || "전체";
  const query = params.get("q") || "";
  const free = params.get("free") === "yes";
  const sort = params.get("sort") || "추천순";
  const filtered = filterExhibitions({
    category,
    region,
    status,
    query,
    free,
    sort,
  });
  const activeCount = [
    category !== "전체",
    region !== "전체",
    status !== "전체",
    free,
    Boolean(query),
  ].filter(Boolean).length;

  function update(key, value) {
    const next = new URLSearchParams(params);
    if (!value || value === "전체" || value === "추천순") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  const content = (
    <>
      <div className="section-heading">
        <div>
          <p className="eyebrow">EXHIBITION ARCHIVE</p>
          <h2>전시 아카이브</h2>
        </div>
      </div>
      <div className="filter-area">
        <div className="category-tabs" role="group" aria-label="전시 분야">
          {categories.map((name) => (
            <button
              key={name}
              className={category === name ? "active" : ""}
              aria-pressed={category === name}
              onClick={() => update("category", name)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <label className="search-box">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
            <input
              aria-label="전시명, 공간 검색"
              value={query}
              placeholder="전시명, 공간을 검색해 보세요"
              onChange={(event) => update("q", event.target.value)}
            />
            {query && (
              <button
                onClick={() => update("q", "")}
                aria-label="검색어 지우기"
              >
                ×
              </button>
            )}
          </label>
          <div className="select-filters">
            <label>
              <span className="sr-only">지역</span>
              <select
                aria-label="지역"
                value={region}
                onChange={(event) => update("region", event.target.value)}
              >
                <option value="전체">지역 전체</option>
                {["서울", "경기", "부산", "대구", "광주", "제주"].map(
                  (name) => (
                    <option key={name}>{name}</option>
                  ),
                )}
              </select>
            </label>
            <label>
              <span className="sr-only">전시 상태</span>
              <select
                aria-label="전시 상태"
                value={status}
                onChange={(event) => update("status", event.target.value)}
              >
                <option value="전체">상태 전체</option>
                {["진행중", "예정", "종료"].map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </label>
            <button
              className={`free-filter ${free ? "active" : ""}`}
              aria-pressed={free}
              onClick={() => update("free", free ? "" : "yes")}
            >
              무료 전시
            </button>
          </div>
        </div>
      </div>
      <div className="result-row">
        <p role="status" aria-live="polite">
          총 <strong>{filtered.length}</strong>개의 전시
          {activeCount > 0 && (
            <button className="reset-button" onClick={() => setParams({})}>
              필터 초기화 ×
            </button>
          )}
        </p>
        <select
          aria-label="전시 정렬"
          value={sort}
          onChange={(event) => update("sort", event.target.value)}
        >
          {["추천순", "최신 오픈순", "종료 임박순", "낮은 가격순"].map(
            (name) => (
              <option key={name}>{name}</option>
            ),
          )}
        </select>
      </div>
      {filtered.length ? (
        <div
          className="exhibition-grid"
          key={`${category}-${region}-${status}-${query}-${free}-${sort}`}
        >
          {filtered.map((item, index) => (
            <ExhibitionCard
              key={item.id}
              exhibition={item}
              saved={saved}
              toggleSave={toggleSave}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>조건에 맞는 전시가 없어요.</h3>
          <p>지역이나 분야를 바꾸면 새로운 전시를 만날 수 있어요.</p>
          <button className="pill-button" onClick={() => setParams({})}>
            전체 전시 보기 <span>→</span>
          </button>
        </div>
      )}
    </>
  );

  return embedded ? (
    <section className="catalog shell" id="exhibitions">
      {content}
    </section>
  ) : (
    <main id="main" className="catalog shell page">
      {content}
    </main>
  );
}
