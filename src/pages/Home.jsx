import { useState } from "react";
import { Link } from "react-router-dom";
import { exhibitions, dateRange } from "../data/exhibitions";
import Exhibition from "./Exhibition";

const slides = [exhibitions[0], exhibitions[4], exhibitions[2]];
export default function Home(props) {
  const [slide, setSlide] = useState(0);
  const item = slides[slide];
  return (
    <main id="main">
      <section className="museum-intro shell">
        <p className="eyebrow">MUSE SEOUL — EXHIBITION JOURNAL</p>
        <div className="intro-line"><h2>예술을 보는<br className="mobile-break" /> 또 다른 시선.</h2><p>전시를 발견하고, 머무르고, 기억하는 곳.<br />당신의 다음 관람을 위한 작은 아카이브.</p></div>
      </section>
      <section className="museum-stage shell" aria-label="추천 전시">
        <img className="stage-space" src={`${import.meta.env.BASE_URL}images/hero.jpg`} alt="조명이 비추는 사진 작품과 어두운 전시장 내부" width="1920" height="1280" />
        <div className="stage-shade" />
        <div className="stage-copy" key={`copy-${item.id}`}>
          <p className="stage-english">{item.english}</p>
          <h2>{item.title}</h2>
          <p className="stage-description">{item.desc}</p>
          <p className="stage-date">{dateRange(item)}<br />{item.place}</p>
          <Link className="stage-link" to={`/exhibition/${item.id}`}>전시 살펴보기 <span>→</span></Link>
        </div>
        <Link className="stage-poster" key={item.id} to={`/exhibition/${item.id}`} aria-label={`${item.title} 전시 상세 보기`}>
          <img src={item.image} alt={`${item.title} 전시 포스터`} width="600" height="800" />
        </Link>
        <div className="stage-controls" aria-label="추천 전시 슬라이드">
          <button className="stage-prev" onClick={() => setSlide(value => (value + slides.length - 1) % slides.length)} aria-label="이전 추천 전시">{'<'}</button>
          <button className="stage-next" onClick={() => setSlide(value => (value + 1) % slides.length)} aria-label="다음 추천 전시">{'>'}</button>
        </div>
      </section>
      <Exhibition embedded {...props} />
      <section className="visit-note shell"><p className="eyebrow">YOUR PERSONAL COLLECTION</p><h2>한 번의 관람이,<br />오래 남는 취향이 되도록.</h2><div><p>다시 보고 싶은 전시를 모아두세요.<br />다음 발걸음이 향할 곳을 천천히 골라보세요.</p><Link className="text-link" to="/mypage">나의 관심 전시 →</Link></div></section>
    </main>
  );
}
