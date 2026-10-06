(function(){
  var nav=document.querySelector('.nav');
  var links=document.querySelector('.nav-links');
  if(!nav||!links) return;
  var reduced=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var frame=0, targetX=0, targetY=0, currentX=0, currentY=0;
  var items=Array.prototype.slice.call(links.querySelectorAll('.nav-item > a'));

  function highlight(item){
    if(!item) return;
    var linkRect=item.getBoundingClientRect();
    var groupRect=links.getBoundingClientRect();
    links.style.setProperty('--highlight-x', (linkRect.left-groupRect.left)+'px');
    links.style.setProperty('--highlight-width', linkRect.width+'px');
  }
  function move(){
    currentX+=(targetX-currentX)*.12;
    currentY+=(targetY-currentY)*.12;
    nav.style.setProperty('--nav-x', currentX.toFixed(2)+'px');
    nav.style.setProperty('--nav-y', (currentY + (window.scrollY>24 ? -2 : 0)).toFixed(2)+'px');
    frame=requestAnimationFrame(move);
  }
  items.forEach(function(item){
    item.addEventListener('pointerenter', function(){ highlight(item); });
    item.addEventListener('focus', function(){ highlight(item); });
  });
  nav.addEventListener('pointermove', function(event){
    if(reduced) return;
    var rect=nav.getBoundingClientRect();
    targetX=Math.max(-4, Math.min(4, (event.clientX-(rect.left+rect.width/2))*0.018));
    targetY=Math.max(-2, Math.min(2, (event.clientY-(rect.top+rect.height/2))*0.012));
    if(!frame) frame=requestAnimationFrame(move);
  });
  nav.addEventListener('pointerleave', function(){ targetX=0;targetY=0; });
  window.addEventListener('scroll', function(){ nav.classList.toggle('scrolled', window.scrollY>24); }, {passive:true});
  nav.classList.toggle('scrolled', window.scrollY>24);
})();

(function(){
  var burger=document.getElementById('burger');
  var menu=document.getElementById('menu');
  if(!burger||!menu) return;
  function set(open){
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true':'false');
    burger.setAttribute('aria-label', open ? 'Close menu':'Open menu');
  }
  burger.addEventListener('click', function(e){
    e.stopPropagation();
    set(!menu.classList.contains('open'));
  });
  menu.addEventListener('click', function(e){
    if(e.target.closest('a')) set(false);
  });
  document.addEventListener('click', function(e){
    if(menu.classList.contains('open') && !menu.contains(e.target) && !burger.contains(e.target)){
      set(false);
    }
  });
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape' && menu.classList.contains('open')){
      set(false);
      burger.focus();
    }
  });
})();
