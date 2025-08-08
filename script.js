(function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  const yearEl = document.getElementById('year');

  function setYear(){
    if(yearEl){ yearEl.textContent = new Date().getFullYear(); }
  }

  function closeOnRoute(){
    if(window.innerWidth < 960){
      nav?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  }

  function initNav(){
    if(!toggle || !nav) return;
    toggle.addEventListener('click', ()=>{
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', closeOnRoute);
    });
  }

  function initHeaderOnScroll(){
    const header = document.querySelector('.site-header');
    const progress = document.getElementById('scroll-progress');
    const onScroll = ()=>{
      if(!header) return;
      const scrolled = window.scrollY > 8;
      header.classList.toggle('scrolled', scrolled);
      // progress bar
      if(progress){
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const pct = Math.max(0, Math.min(1, window.scrollY / (max || 1)));
        progress.style.width = `${pct * 100}%`;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function smoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(link=>{
      link.addEventListener('click', function(e){
        const id = this.getAttribute('href');
        if(!id || id.length <= 1) return;
        const target = document.querySelector(id);
        if(!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', id);
      });
    });
  }

  function initScrollSpy(){
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.primary-nav a[href^="#"]'));
    if(!sections.length || !navLinks.length) return;
    const byId = (id)=> navLinks.find(a => a.getAttribute('href') === `#${id}`);
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const id = entry.target.getAttribute('id');
          navLinks.forEach(a=> a.classList.remove('active'));
          const link = byId(id);
          if(link) link.classList.add('active');
        }
      });
    }, { threshold: 0.6 });
    sections.forEach(s=> observer.observe(s));
  }

  function initLightbox(){
    const box = document.getElementById('lightbox');
    if(!box) return;
    const imgEl = box.querySelector('img');
    const closeBtn = box.querySelector('.lightbox-close');
    const imgs = document.querySelectorAll('#images img');
    function open(src, alt){
      if(!imgEl) return;
      imgEl.src = src; imgEl.alt = alt || '';
      box.classList.add('open');
      box.setAttribute('aria-hidden', 'false');
    }
    function close(){
      box.classList.remove('open');
      box.setAttribute('aria-hidden', 'true');
      if(imgEl) imgEl.src = '';
    }
    imgs.forEach(i=>{
      i.style.cursor = 'zoom-in';
      i.addEventListener('click', ()=> open(i.src, i.alt));
    });
    closeBtn?.addEventListener('click', close);
    box.addEventListener('click', (e)=>{ if(e.target === box) close(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });
  }

  document.addEventListener('DOMContentLoaded', function(){
    setYear();
    initNav();
    smoothScroll();
    initHeaderOnScroll();
    initScrollSpy();
    initLightbox();
  });
})();

