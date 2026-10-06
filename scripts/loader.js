/* Intro loader: wordmark is written -> plane slices through it -> the page opens.
   Load synchronously as the first thing in <body>. Exposes window.vgmLoader and fires
   `vgm:loader-open` on document when the halves start to part. */
(function(){
  var doc = document, root = doc.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var state = window.vgmLoader = { opened:false };
  root.classList.add('vgm-loading');

  var NS = 'http://www.w3.org/2000/svg';
  var VB = '80 0 640 500';          // centre (400,250); y=250 is the screen midline = the cut
  var CUT_Y = 250, START_X = -450, END_X = 1250;  // the plane's straight pass, off-screen to off-screen

  function word(sfx){
    return '' +
      '<svg viewBox="' + VB + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        '<defs>' +
          '<linearGradient id="vgmGold' + sfx + '" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="#f6e1a6"/><stop offset=".55" stop-color="#d9b25e"/><stop offset="1" stop-color="#a97f2f"/>' +
          '</linearGradient>' +
          '<clipPath id="vgmReveal' + sfx + '"><rect class="vgm-reveal" x="0" y="0" width="0" height="500"/></clipPath>' +
        '</defs>' +
        '<g clip-path="url(#vgmReveal' + sfx + ')">' +
          '<text class="vgm-word vgm-word--fill" x="400" y="274" text-anchor="middle" fill="url(#vgmGold' + sfx + ')">Vanguard</text>' +
          '<text class="vgm-word vgm-word--ink" x="400" y="274" text-anchor="middle">Vanguard</text>' +
        '</g>' +
        '<line class="vgm-rule vgm-rule--l" x1="0" y1="314" x2="0" y2="314"/>' +
        '<text class="vgm-sub" x="400" y="320" text-anchor="middle">GLOBAL MIGRATION</text>' +
        '<line class="vgm-rule vgm-rule--r" x1="0" y1="314" x2="0" y2="314"/>' +
      '</svg>';
  }

  var el = doc.createElement('div');
  el.className = 'vgm-loader' + (reduced ? ' is-reduced' : '');
  el.setAttribute('role', 'status');
  el.setAttribute('aria-label', 'Loading Vanguard Global Migration');
  el.innerHTML =
    '<div class="vgm-half vgm-half--top">' + word('T') + '</div>' +
    '<div class="vgm-half vgm-half--bot">' + word('B') + '</div>' +
    '<svg class="vgm-overlay" viewBox="' + VB + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
      '<line class="vgm-cut-glow" x1="' + START_X + '" y1="' + CUT_Y + '" x2="' + START_X + '" y2="' + CUT_Y + '"/>' +
      '<line class="vgm-cut" x1="' + START_X + '" y1="' + CUT_Y + '" x2="' + START_X + '" y2="' + CUT_Y + '"/>' +
      '<circle class="vgm-pen-glow" cx="0" cy="' + CUT_Y + '" r="13"/>' +
      '<circle class="vgm-pen" cx="0" cy="' + CUT_Y + '" r="4.5"/>' +
      '<path class="vgm-plane" d="M24 0C24-2 20-3 16-3H6L-4-17H-9L-3-3H-13L-17-9H-21L-18 0-21 9H-17L-13 3H-3L-9 17H-4L6 3H16C20 3 24 2 24 0Z"/>' +
    '</svg>';

  (doc.body || root).appendChild(el);

  var $ = function(s){ return el.querySelector(s); };
  var $$ = function(s){ return Array.prototype.slice.call(el.querySelectorAll(s)); };
  var reveals = $$('.vgm-reveal'), pens = [$('.vgm-pen'), $('.vgm-pen-glow')];
  var plane = $('.vgm-plane');
  var cuts = [$('.vgm-cut'), $('.vgm-cut-glow')];
  var timers = [], raf = 0, finished = false;

  function at(ms, fn){ timers.push(setTimeout(fn, ms)); }
  function add(c){ el.classList.add(c); }
  function easeInOut(t){ return t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2; }
  function easeIn(t){ return t*t*(.4 + .6*t); }

  function tween(dur, ease, frame, done){
    var t0 = performance.now();
    (function step(now){
      var t = Math.min(1, (now - t0) / dur);
      frame(ease(t));
      if(t < 1){ raf = requestAnimationFrame(step); } else if(done){ done(); }
    })(t0);
  }

  function placePlane(x, y, deg){
    plane.setAttribute('transform', 'translate(' + x + ' ' + y + ') rotate(' + deg + ') scale(.8)');
  }

  // Measure the real wordmark once fonts are in, then line up the pen and rules.
  var span = { x0:140, x1:660 };
  function layout(){
    try{
      var b = $('.vgm-half--top .vgm-word--fill').getBBox();
      if(b.width){ span = { x0:b.x, x1:b.x + b.width }; }
      var s = $('.vgm-half--top .vgm-sub').getBBox();
      $$('.vgm-rule--l').forEach(function(l){ l.setAttribute('x1', s.x - 74); l.setAttribute('x2', s.x - 14); });
      $$('.vgm-rule--r').forEach(function(l){ l.setAttribute('x1', s.x + s.width + 6); l.setAttribute('x2', s.x + s.width + 66); });
    }catch(e){}
    pens.forEach(function(p){ p.setAttribute('cx', span.x0); });
  }

  function write(){
    add('is-writing');
    var from = span.x0 - 12, to = span.x1 + 14;
    tween(1350, easeInOut, function(p){
      var x = from + (to - from) * p;
      reveals.forEach(function(r){ r.setAttribute('width', Math.max(0, x)); });
      pens.forEach(function(c){ c.setAttribute('cx', x); });
    });
  }

  // The plane streaks straight across the midline, leaving the cut behind it.
  function cut(){
    placePlane(START_X, CUT_Y, 0);
    plane.classList.add('is-flying');
    cuts.forEach(function(c){ c.classList.add('is-cutting'); });
    tween(1000, easeIn, function(p){
      var x = START_X + (END_X - START_X) * p;
      placePlane(x, CUT_Y, 0);
      cuts.forEach(function(c){ c.setAttribute('x2', x); });
    }, open);
  }

  function open(){
    if(state.opened) return;
    state.opened = true;
    add('is-filled'); add('is-open');
    root.classList.remove('vgm-loading');
    at(140, function(){ doc.dispatchEvent(new CustomEvent('vgm:loader-open')); });
    at(1150, finish);
  }

  function finish(){
    if(finished) return;
    finished = true;
    add('is-done');
    setTimeout(function(){ if(el.parentNode){ el.parentNode.removeChild(el); } }, 600);
  }

  // Click / key skips straight to the reveal.
  function skip(){
    if(state.opened) return;
    timers.forEach(clearTimeout); timers = [];
    cancelAnimationFrame(raf);
    reveals.forEach(function(r){ r.setAttribute('width', 2000); });
    open();
  }
  el.addEventListener('click', skip);
  doc.addEventListener('keydown', function onKey(){ doc.removeEventListener('keydown', onKey); skip(); });

  var begun = false;
  function begin(){
    if(begun || state.opened) return;
    begun = true;
    layout();
    if(reduced){
      reveals.forEach(function(r){ r.setAttribute('width', 2000); });
      at(700, function(){
        state.opened = true;
        root.classList.remove('vgm-loading');
        doc.dispatchEvent(new CustomEvent('vgm:loader-open'));
        finish();
      });
      return;
    }
    at(250,  write);
    at(1600, function(){ add('is-filled'); });
    at(2300, cut);
  }

  // Wait for the wordmark fonts (capped) so the measured text is the real one.
  if(doc.fonts && doc.fonts.load){
    Promise.all([
      doc.fonts.load('700 90px "Playfair Display"'),
      doc.fonts.load('600 16px "Plus Jakarta Sans"')
    ]).then(begin, begin);
    setTimeout(begin, 1200);
  } else {
    begin();
  }
  // Absolute safety net: never trap the visitor behind the loader.
  setTimeout(function(){ if(!state.opened){ skip(); } }, 9000);
})();
