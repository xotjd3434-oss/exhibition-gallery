import { Link } from "react-router-dom";
import { dateRange, getStatus, priceLabel } from "../data/exhibitions";

export function Heart({ active = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M20.5 4.6a5.1 5.1 0 0 0-7.2 0L12 5.9l-1.3-1.3a5.1 5.1 0 0 0-7.2 7.2L12 20l8.5-8.2a5.1 5.1 0 0 0 0-7.2Z" />
    </svg>
  );
}

export default function ExhibitionCard({
  exhibition: item,
  saved,
  toggleSave,
  index = 0,
}) {
  const active = saved.includes(item.id);
  const status = getStatus(item);

  return (
    <article
      className="exhibition-card"
      style={{
        "--delay": `${Math.min(index, 7) * 45}ms`,
        "--poster-bg": item.bg,
      }}
    >
      <div className="poster-frame">
        <Link
          to={`/exhibition/${item.id}`}
          className="poster-link"
          aria-label={`${item.title} 상세 보기`}
        >
          <img
            src={item.image}
            alt={`${item.title} 전시 그래픽 포스터`}
            loading={index < 4 ? "eager" : "lazy"}
            width="600"
            height="800"
          />
        </Link>
        <button
          className={`heart-button ${active ? "selected" : ""}`}
          aria-pressed={active}
          aria-label={`${item.title} 관심 전시 ${active ? "해제" : "등록"}`}
          onClick={() => toggleSave(item)}
        >
          <Heart active={active} />
        </button>
      </div>
      <div className="card-meta">
        <span>{item.category}</span>
        <span>
          {item.region} · {priceLabel(item.price)}
        </span>
      </div>
      <div className="card-title-row">
        <h3><Link to={`/exhibition/${item.id}`}>{item.title}</Link></h3>
        <span className={`status status-${status}`}>{status}</span>
      </div>
      <p className="card-place">{item.place}</p>
      <p className="card-date">{dateRange(item)}</p>
    </article>
  );
}
