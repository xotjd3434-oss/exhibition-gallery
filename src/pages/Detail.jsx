import { Link, useParams } from "react-router-dom";
import { Heart } from "../components/ExhibitionCard";
import ExhibitionCard from "../components/ExhibitionCard";
import {
  exhibitions,
  dateRange,
  getStatus,
  priceLabel,
} from "../data/exhibitions";

export default function Detail({ saved, toggleSave }) {
  const { id } = useParams();
  const item = exhibitions.find((entry) => entry.id === Number(id));
  if (!item)
    return (
      <main id="main" className="shell page empty-state">
        <h2>찾으시는 전시가 없어요.</h2>
        <Link className="text-link" to="/exhibition">
          전체 전시 보기 →
        </Link>
      </main>
    );
  const active = saved.includes(item.id);
  const related = exhibitions
    .filter((entry) => entry.category === item.category && entry.id !== item.id)
    .slice(0, 2);

  return (
    <main id="main" className="shell detail-page page">
      <Link className="breadcrumb" to="/exhibition">
        전시 둘러보기 / {item.category}
      </Link>
      <section className="detail-hero">
        <div className="detail-poster" style={{ background: item.bg }}>
          <img
            src={item.image}
            alt={`${item.title} 전시 그래픽 포스터`}
            width="600"
            height="800"
          />
        </div>
        <div className="detail-info">
          <p className="eyebrow">
            {item.category} · {item.region} · {getStatus(item)}
          </p>
          <h2>{item.title}</h2>
          <p className="detail-english">{item.english}</p>
          <p className="detail-lead">{item.desc}</p>
          <dl>
            <div>
              <dt>전시 기간</dt>
              <dd>{dateRange(item)}</dd>
            </div>
            <div>
              <dt>전시 공간</dt>
              <dd>
                {item.place} · {item.region}
              </dd>
            </div>
            <div>
              <dt>운영 시간</dt>
              <dd>
                {item.hours}
                <small>{item.closed} · 입장 마감은 종료 30분 전</small>
              </dd>
            </div>
            <div>
              <dt>관람료</dt>
              <dd>
                {priceLabel(item.price)}
                <small>예시 일반 관람료 기준</small>
              </dd>
            </div>
            <div>
              <dt>관람 소요</dt>
              <dd>{item.duration}</dd>
            </div>
          </dl>
          <button
            className={`pill-button save-detail ${active ? "is-saved" : ""}`}
            onClick={() => toggleSave(item)}
            aria-pressed={active}
          >
            <Heart active={active} />
            {active ? "관심 전시에 담았어요" : "관심 전시에 담기"}
            <span>{active ? "해제" : "→"}</span>
          </button>
          <p className="demo-note">
            이 전시는 포트폴리오용 예시입니다. 실제 예매는 제공하지 않습니다.
          </p>
        </div>
      </section>
      <section className="detail-story">
        <div>
          <p className="eyebrow">전시 이야기</p>
          <h2>이렇게 만나보세요.</h2>
        </div>
        <div>
          <p>{item.story}</p>
          <h3>관람 포인트</h3>
          <p>
            {item.desc} 작품에서 조금 떨어져 전체를 바라본 뒤, 가까이 다가가
            세부의 차이를 발견해 보세요.
          </p>
          <div className="ticket-note">
            <h3>방문 전 확인해 주세요</h3>
            <p>
              편안한 관람을 위해 운영 시간과 휴관일을 확인해 주세요. 작품 보호를
              위해 플래시와 삼각대 사용은 제한될 수 있으며, 세부 촬영 규정은
              공간마다 다릅니다.
            </p>
            <small>
              공간명·일정·요금·운영 안내는 모두 화면 구현을 위한 예시
              정보입니다.
            </small>
          </div>
        </div>
      </section>
      <section className="related-section">
        <div className="section-heading">
          <h2>비슷한 전시</h2>
          <Link
            className="text-link"
            to={`/exhibition?category=${encodeURIComponent(item.category)}`}
          >
            같은 분야 더 보기 →
          </Link>
        </div>
        <div className="exhibition-grid related-grid">
          {related.map((entry, index) => (
            <ExhibitionCard
              key={entry.id}
              exhibition={entry}
              saved={saved}
              toggleSave={toggleSave}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
