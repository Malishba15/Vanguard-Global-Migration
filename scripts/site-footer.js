/* ==========================================================
   SHARED SITE FOOTER BEHAVIOUR
   The footer markup itself is pre-rendered into each page by
   build/render.js (edit build/partials.js, then re-run it).
   ========================================================== */
(function(){
  var year=document.querySelector('[data-year]');
  if(year) year.textContent=new Date().getFullYear();

  var toTop=document.querySelector('.back-to-top');
  if(!toTop) return;
  // Some pages (index, about) set overflow on html+body, which makes <body> the scroller instead of the window
  function scrollPos(){ return Math.max(window.scrollY||0, document.documentElement.scrollTop||0, document.body.scrollTop||0); }
  function syncTop(){ toTop.classList.toggle('is-visible', scrollPos()>560); }
  window.addEventListener('scroll', syncTop, {passive:true});
  document.body.addEventListener('scroll', syncTop, {passive:true});
  syncTop();
  toTop.addEventListener('click', function(){
    var reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var opts={top:0, behavior: reduce ? 'auto' : 'smooth'};
    window.scrollTo(opts);
    if(document.body.scrollTop>0) document.body.scrollTo(opts);
  });
})();
