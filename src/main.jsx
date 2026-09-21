import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Asterisk, Menu, Radio, Sparkles, Users, X, Zap } from 'lucide-react';
import './styles.css';

const missions = [
  { no: '01', type: 'CURATION', title: ['취향을 발견하는', '가장 즐거운 방법'], text: '수많은 취미 속에서 내 마음을 움직이는 단 하나를 발견할 수 있도록, 새로운 경험을 섬세하게 큐레이션합니다.', image: '/img/contents/Group 31.png' },
  { no: '02', type: 'COMMUNITY', title: ['좋아하는 마음이', '서로를 만날 때'], text: '같은 관심사를 가진 사람들과 자연스럽게 연결되고, 경험과 영감을 나누는 커뮤니티를 만듭니다.', image: '/img/contents/Group 34.png' },
  { no: '03', type: 'EXPERIENCE', title: ['화면을 넘어', '진짜 경험으로'], text: '온라인에서 시작된 발견을 모임과 이벤트로 확장해, 일상에 오래 남을 장면을 함께 완성합니다.', image: '/img/contents/Group 35.png' },
];

function Logo() {
  return <Link className="logo" to="/" aria-label="READY SPACE 홈"><img className="logo-symbol" src="/img/logo-symbol.png" alt="" /><span>READY<br />SPACE</span></Link>;
}

function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-topline"><Logo /><span>BUSAN · KOREA</span><span>EST. 2022</span></div>
    <div className="footer-statement"><span><Asterisk size={14} /> READY FOR LAUNCH?</span><h2>FIND THE NEXT<br /><em>ORBIT WITH US.</em></h2></div>
    <div className="footer-links">
      <div><b>EXPLORE</b><Link to="/">Planet</Link><Link to="/config">Config</Link><Link to="/portfolio">Portfolio</Link><Link to="/awards">Awards</Link></div>
      <div><b>CONTACT</b><a href="mailto:readyspace0810@gmail.com">readyspace0810@gmail.com</a><a href="tel:05043161645">0504-316-1645</a></div>
      <div><b>SOCIAL</b><a href="#">Instagram <ArrowUpRight size={14} /></a><a href="#">Blog <ArrowUpRight size={14} /></a></div>
    </div>
    <div className="footer-bottom"><span>© 2026 READY SPACE. ALL RIGHTS RESERVED.</span><a href="#top">BACK TO TOP <ArrowUpRight size={13} /></a></div>
  </footer>;
}

function CountUp({ target, suffix = '', pad = 0 }) {
  const [value, setValue] = useState(1);
  const ref = React.useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const started = performance.now();
      const duration = 1700;
      const tick = (now) => {
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(Math.max(1, Math.round(1 + (target - 1) * eased)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: .55 });
    observer.observe(node);
    return () => { observer.disconnect(); if (frame) cancelAnimationFrame(frame); };
  }, [target]);

  return <strong ref={ref}>{String(value).padStart(pad, '0')}{suffix}</strong>;
}

function CosmicCursor() {
  const cursorRef = React.useRef(null);
  const dotRef = React.useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!cursor || !dot || !finePointer || reducedMotion) return;

    let frame;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const render = () => {
      ringX += (mouseX - ringX) * .18;
      ringY += (mouseY - ringY) * .18;
      cursor.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      frame = requestAnimationFrame(render);
    };
    const move = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.classList.add('is-visible');
      dot.classList.add('is-visible');
    };
    const over = (event) => cursor.classList.toggle('is-active', Boolean(event.target.closest('a, button, [tabindex], .mission-card')));
    const down = () => cursor.classList.add('is-pressed');
    const up = () => cursor.classList.remove('is-pressed');
    const leave = () => { cursor.classList.remove('is-visible'); dot.classList.remove('is-visible'); };

    document.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over, { passive: true });
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', leave);
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  return <><span className="cosmic-cursor" ref={cursorRef} aria-hidden="true"><i /></span><span className="cosmic-cursor-dot" ref={dotRef} aria-hidden="true" /></>;
}

function ContentProtection() {
  useEffect(() => {
    const block = (event) => event.preventDefault();
    const blockShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'x', 'v', 's', 'u'].includes(event.key.toLowerCase())) {
        event.preventDefault();
      }
    };

    document.documentElement.classList.add('content-protected');
    document.addEventListener('copy', block);
    document.addEventListener('cut', block);
    document.addEventListener('paste', block);
    document.addEventListener('contextmenu', block);
    document.addEventListener('selectstart', block);
    document.addEventListener('dragstart', block);
    document.addEventListener('keydown', blockShortcut);

    return () => {
      document.documentElement.classList.remove('content-protected');
      document.removeEventListener('copy', block);
      document.removeEventListener('cut', block);
      document.removeEventListener('paste', block);
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('selectstart', block);
      document.removeEventListener('dragstart', block);
      document.removeEventListener('keydown', blockShortcut);
    };
  }, []);

  return null;
}

function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .13, rootMargin: '0px 0px -7% 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const go = () => setOpen(false);

  return <main id="top">
    <CosmicCursor />
    <header className={scrolled ? 'site-header scrolled' : 'site-header'}>
      <div className="nav-shell">
        <Logo />
        <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="주요 메뉴">
          <Link to="/" onClick={go}>Planet</Link><Link to="/config" onClick={go}>Config</Link><Link to="/portfolio" onClick={go}>Portfolio</Link><Link to="/awards" onClick={go}>Awards</Link>
        </nav>
        <a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>

    <section className="hero" aria-labelledby="hero-title">
      <div className="stars" aria-hidden="true" /><div className="meteor meteor-one" aria-hidden="true" /><div className="meteor meteor-two" aria-hidden="true" /><div className="meteor meteor-three" aria-hidden="true" />
      <div className="hero-orbit orbit-one" aria-hidden="true"><span /></div><div className="hero-orbit orbit-two" aria-hidden="true"><span /></div>
      <div className="planet" aria-hidden="true"><div className="planet-glow" /><div className="satellite-orbit"><span className="satellite"><i /></span></div></div>
      <div className="hero-copy">
        <div className="eyebrow"><Radio size={13} /> SIGNAL FROM READY SPACE <span>25.09°</span></div>
        <h1 id="hero-title">FIND YOUR<br /><em>OWN ORBIT.</em></h1>
        <div className="hero-bottom"><p>좋아하는 것을 발견하고,<br />나만의 궤도를 그리기 시작하세요.</p><a className="round-link" href="#about" aria-label="아래로 이동"><ArrowDown /></a></div>
      </div>
      <div className="hero-index"><span>SCROLL TO EXPLORE</span><b>01</b><span>/ 04</span></div>
    </section>

    <section className="manifesto" id="about">
      <div className="section-tag" data-reveal="up"><Asterisk size={15} /> WHO WE ARE</div>
      <div className="manifesto-grid">
        <h2 data-reveal="left">WE ARE<br />READY.</h2>
        <div className="manifesto-copy" data-reveal="right">
          <p className="lead">모든 사람의 마음속에는<br />아직 발견하지 못한 행성이 있습니다.</p>
          <p>READY SPACE는 취미를 통해 일상의 새로운 가능성을 발견하는 라이프스타일 커뮤니티입니다. 궁금증에 불을 붙이고, 낯선 경험을 반갑게 맞이하며, 좋아하는 마음들이 서로 연결되도록 돕습니다.</p>
          <a className="text-link" href="#missions">우리의 미션 보기 <ArrowUpRight size={17} /></a>
        </div>
      </div>
      <div className="stats" data-reveal="up">
        <div><CountUp target={3} pad={2} /><span>Innovation<br />Projects</span></div><div><CountUp target={60} suffix="+" /><span>Curated<br />Activities</span></div><div><CountUp target={2022} /><span>Journey<br />Started</span></div><div><strong className="infinity">∞</strong><span>Possibilities<br />Ahead</span></div>
      </div>
    </section>

    <section className="missions" id="missions">
      <div className="section-heading" data-reveal="up"><div className="section-tag light"><Sparkles size={15} /> OUR MISSIONS</div><h2>MAKE EVERY DAY<br /><em>LESS ORDINARY.</em></h2></div>
      <div className="mission-list">
        {missions.map((m, index) => <article className="mission-card" data-reveal={index % 2 ? 'right' : 'left'} style={{ '--delay': `${index * 70}ms` }} key={m.no}>
          <span className="mission-no">({m.no})</span><div className="mission-image"><img src={m.image} alt="" /></div>
          <div className="mission-copy"><span>{m.type}</span><h3>{m.title[0]}<br />{m.title[1]}</h3><p>{m.text}</p></div><ArrowUpRight className="mission-arrow" />
        </article>)}
      </div>
    </section>

    <section className="crew" id="crew">
      <div className="crew-copy" data-reveal="up"><div className="section-tag"><Users size={15} /> THE CREW</div><h2>SMALL CREW.<br /><em>BIG UNIVERSE.</em></h2><p>다른 강점을 가진 두 사람이 같은 방향을 바라봅니다. 작은 팀의 빠른 실행력과 열린 태도로, 취미의 우주를 더 넓게 만들어갑니다.</p></div>
      <div className="crew-cards">
        <article className="crew-card red" data-reveal="left" tabIndex="0"><div className="crew-meta"><span>CEO / CREATIVE DIRECTOR</span><b>01</b></div><div className="crew-disc"><img src="/img/contents/Group 75.png" alt="CEO Jessica의 캐릭터 Shawnee" /><i /></div><div><h3>JESSICA</h3><p>호기심을 경험으로 바꾸는<br />크리에이티브 탐험가</p></div></article>
        <article className="crew-card dark" data-reveal="right" tabIndex="0"><div className="crew-meta"><span>CTO / DEVELOPER</span><b>02</b></div><div className="crew-disc"><img src="/img/contents/Group 76.png" alt="CTO David의 캐릭터 Remo" /><i /></div><div><h3>DAVID</h3><p>아이디어를 현실로 연결하는<br />디지털 궤도 설계자</p></div></article>
      </div>
    </section>

    <section className="contact" id="contact"><div className="contact-orbit" aria-hidden="true" /><div className="contact-content" data-reveal="up"><span className="contact-kicker"><Zap size={14} /> READY FOR LAUNCH?</span><h2>LET’S CREATE<br />A NEW <em>ORBIT.</em></h2><a className="contact-link" href="mailto:readyspace0810@gmail.com">Start a conversation <ArrowUpRight /></a></div></section>

    <SiteFooter />
  </main>;
}

function SubPageLayout({ current, children }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  const links = [['Planet', '/', 'planet'], ['Config', '/config', 'config'], ['Portfolio', '/portfolio', 'portfolio'], ['Awards', '/awards', 'awards']];
  return <main className="sub-page" id="top">
    <CosmicCursor />
    <header className="site-header scrolled"><div className="nav-shell"><Logo />
      <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="주요 메뉴">{links.map(([label, href, id]) => <Link className={current === id ? 'current' : ''} to={href} key={label} onClick={() => setOpen(false)}>{label}</Link>)}</nav>
      <a className="nav-cta" href="mailto:readyspace0810@gmail.com">Let’s talk <ArrowUpRight size={15} /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </div></header>
    {children}
    <SiteFooter />
  </main>;
}

const portfolioItems = [
  { no: '01', year: 'LIVE', title: '리모션', en: 'REMOTION', category: 'WEB PROJECT', url: 'https://remotionstudio.co.kr/', domain: 'remotionstudio.co.kr', shot: '/img/portfolio/remotion.png' },
  { no: '02', year: 'LIVE', title: '스탬플릿', en: 'STAMPIT', category: 'WEB PROJECT', url: 'https://stampit.co.kr/', domain: 'stampit.co.kr', shot: '/img/portfolio/stampit.png' },
  { no: '03', year: 'LIVE', title: '지출레시피', en: 'JICUL RECIPE', category: 'WEB PROJECT', url: 'https://www.jiculrecipe.com/', domain: 'jiculrecipe.com', shot: '/img/portfolio/jiculrecipe.png' },
  { no: '04', year: 'LIVE', title: '틱폴리오', en: 'TICKPOLIO', category: 'WEB PROJECT', url: 'https://tickpolio.stampit.co.kr/', domain: 'tickpolio.stampit.co.kr', shot: '/img/portfolio/tickpolio.png' },
  { no: '05', year: 'LIVE', title: '바이브키트', en: 'VIBEKIT', category: 'WEB PROJECT', url: 'https://vibekit.stampit.co.kr/', domain: 'vibekit.stampit.co.kr', shot: '/img/portfolio/vibekit.png' },
];

function PortfolioPage() {
  return <SubPageLayout current="portfolio">
    <section className="sub-hero portfolio-hero"><div className="sub-orbit" /><div className="sub-kicker"><Sparkles size={14} /> SELECTED WORKS · 2022—2026</div><h1>PORT<br /><em>FOLIO.</em></h1><p>호기심에서 출발해 실제 경험으로 이어진<br />READY SPACE의 프로젝트 아카이브입니다.</p></section>
    <section className="project-grid">
      {portfolioItems.map((item, index) => <article className="project-card" data-reveal={index % 2 ? 'right' : 'left'} key={item.no}>
        <a href={item.url} target="_blank" rel="noreferrer">
          <div className="project-visual site-preview"><div className="browser-bar"><i /><i /><i /><span>{item.domain}</span></div><img className="site-shot" src={item.shot} alt={`${item.title} 웹사이트 미리보기`} loading="lazy" /><div className="preview-orbit"><i /></div><div className="preview-shade" /><span>{item.no}</span><b>VIEW LIVE SITE</b></div>
          <div className="project-meta"><span>{item.category}</span><span>{item.year}</span></div>
          <h2>{item.title} <ArrowUpRight /></h2><p>{item.en} · {item.domain}</p>
        </a>
      </article>)}
    </section>
    <section className="sub-cta" id="contact" data-reveal="up"><span>NEXT MISSION</span><h2>YOUR IDEA,<br /><em>OUR NEXT ORBIT.</em></h2><a href="mailto:readyspace0810@gmail.com">프로젝트 문의하기 <ArrowUpRight /></a></section>
  </SubPageLayout>;
}

const processItems = [
  { no: '01', word: 'PLAN', ko: '가능성을 발견합니다', copy: '질문하고 관찰하며 프로젝트가 향해야 할 가장 선명한 목표를 찾습니다.' },
  { no: '02', word: 'DESIGN', ko: '경험에 형태를 부여합니다', copy: '브랜드의 목소리와 사용자의 감각이 만나는 독창적인 경험을 설계합니다.' },
  { no: '03', word: 'DEVELOP', ko: '아이디어를 현실로 보냅니다', copy: '작은 디테일까지 놓치지 않는 실행으로 지속 가능한 결과물을 완성합니다.' },
];

function ConfigPage() {
  return <SubPageLayout current="config">
    <section className="sub-hero config-hero"><div className="sub-kicker"><Asterisk size={14} /> HOW WE CREATE</div><h1>FROM<br />SPARK TO<br /><em>SPACE.</em></h1><p>PLAN · DESIGN · DEVELOP<br />세 개의 엔진으로 아이디어를 발사합니다.</p></section>
    <section className="process-section">
      <div className="process-intro" data-reveal="up"><span>OUR CONFIGURATION</span><h2>THREE ENGINES.<br />ONE DIRECTION.</h2></div>
      <div className="process-list">{processItems.map((item, index) => <article data-reveal="up" style={{ '--delay': `${index * 110}ms` }} key={item.no}><span>{item.no}</span><div className="process-planet"><i /></div><h3>{item.word}</h3><h4>{item.ko}</h4><p>{item.copy}</p></article>)}</div>
    </section>
    <section className="principles"><div data-reveal="left"><span>CORE VALUES</span><h2>CURIOUS.<br />PRECISE.<br /><em>TOGETHER.</em></h2></div><p data-reveal="right">낯선 것을 반기는 호기심, 생각을 현실로 바꾸는 정확함, 그리고 함께할 때 더 멀리 갈 수 있다는 믿음. 이것이 READY SPACE를 움직이는 방식입니다.</p></section>
  </SubPageLayout>;
}

function AwardsPage() {
  const awards = [
    ['2022—2023', '2022년 예비창업패키지 선정', 'STARTUP PROGRAM', 'SELECTED'],
    ['2023.10', '스탬플릿 서비스 출시', 'SERVICE LAUNCH', 'LAUNCHED'],
    ['2023.11', 'SKKU SIS 실험실탐색 경진대회', 'COMPETITION', '대상'],
    ['2024', 'IBK 창공기업 선정', 'STARTUP PROGRAM', 'PRE'],
    ['2024', 'BUSAN 슬러시드 Youth League', 'YOUTH LEAGUE', 'WINNER'],
    ['2024.07.03', '2024 여성창업경진대회', 'COMPETITION', '입상'],
    ['2024.08.14', '투자 네트워킹데이 제2회 B.BRIDGING DAY', 'NETWORKING DAY', '2회 동시수상'],
  ];
  return <SubPageLayout current="awards">
    <section className="sub-hero awards-hero"><div className="award-halo" /><div className="sub-kicker"><Zap size={14} /> AWARDS & MILESTONES · 2022—2024</div><h1>SEVEN<br /><em>MOMENTS.</em></h1><p>Seven signals that shaped<br />the orbit of READY SPACE.</p></section>
    <section className="award-summary" data-reveal="up"><div><CountUp target={7} /><span>AWARDS &<br />MILESTONES</span></div><p>From the 2022 Preliminary Startup Package selection to the double recognition at B.BRIDGING DAY, these seven milestones mark the trajectory of READY SPACE.</p></section>
    <section className="award-archive">
      <div className="archive-head" data-reveal="up"><span>MISSION DATE</span><span>AWARD / MILESTONE</span><span>RESULT</span></div>
      {awards.map((row, index) => <article className="award-row" data-reveal="up" style={{ '--delay': `${index * 55}ms` }} key={`${row[0]}-${row[1]}`}>
        <b>{row[0]}</b><div><span>{row[2]}</span><h3>{row[1]}</h3></div><i>{row[3]}</i><span className="award-index">0{index + 1}</span>
      </article>)}
    </section>
    <section className="award-note" data-reveal="up"><span>BEYOND THE TROPHY</span><h2>AWARDS ARE MARKERS.<br /><em>THE JOURNEY CONTINUES.</em></h2><p>An award is not the destination. It is a signal that we are moving in the right orbit.</p></section>
  </SubPageLayout>;
}

function RoutedApp() {
  return <BrowserRouter><ContentProtection /><Routes>
    <Route path="/" element={<App />} />
    <Route path="/config" element={<ConfigPage />} />
    <Route path="/portfolio" element={<PortfolioPage />} />
    <Route path="/awards" element={<AwardsPage />} />
    <Route path="/index.html" element={<Navigate to="/" replace />} />
    <Route path="/config.html" element={<Navigate to="/config" replace />} />
    <Route path="/portfolio.html" element={<Navigate to="/portfolio" replace />} />
    <Route path="/prospect.html" element={<Navigate to="/awards" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></BrowserRouter>;
}

createRoot(document.getElementById('root')).render(<RoutedApp />);
