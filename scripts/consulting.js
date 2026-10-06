(function(){
  document.documentElement.classList.add('js-ready');

  /* ---------- page load progress bar ---------- */
  var bar = document.querySelector('.page-progress');
  if(bar){
    requestAnimationFrame(function(){ bar.style.width='72%'; });
    window.addEventListener('load', function(){
      bar.style.width='100%';
      setTimeout(function(){ bar.classList.add('is-done'); }, 220);
    });
  }
  requestAnimationFrame(function(){ document.documentElement.classList.add('hero-in'); });

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if(reveals.length){
    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
      reveals.forEach(function(el){ io.observe(el); });
    } else {
      reveals.forEach(function(el){ el.classList.add('is-visible'); });
    }
  }

  /* ---------- floating contact (FAB) ---------- */
  var fab = document.querySelector('.fab-wrap');
  var fabMain = document.querySelector('.fab-main');
  if(fab && fabMain){
    fabMain.addEventListener('click', function(){
      var open = !fab.classList.contains('is-open');
      fab.classList.toggle('is-open', open);
      fabMain.setAttribute('aria-expanded', open ? 'true':'false');
    });
    document.addEventListener('click', function(e){
      if(fab.classList.contains('is-open') && !fab.contains(e.target)){
        fab.classList.remove('is-open');
        fabMain.setAttribute('aria-expanded','false');
      }
    });
    document.addEventListener('keydown', function(e){
      if(e.key==='Escape' && fab.classList.contains('is-open')){
        fab.classList.remove('is-open');
        fabMain.setAttribute('aria-expanded','false');
        fabMain.focus();
      }
    });
  }

  /* ---------- cookie banner ---------- */
  var cookieBanner = document.querySelector('.cookie-banner');
  if(cookieBanner){
    var KEY = 'vgm-cookie-consent';
    var stored;
    try{ stored = localStorage.getItem(KEY); }catch(e){ stored = null; }
    if(!stored){
      setTimeout(function(){ cookieBanner.classList.add('is-visible'); }, 900);
    }
    function decide(value){
      try{ localStorage.setItem(KEY, value); }catch(e){}
      cookieBanner.classList.remove('is-visible');
    }
    var acceptBtn = cookieBanner.querySelector('[data-cookie="accept"]');
    var declineBtn = cookieBanner.querySelector('[data-cookie="decline"]');
    if(acceptBtn) acceptBtn.addEventListener('click', function(){ decide('accepted'); });
    if(declineBtn) declineBtn.addEventListener('click', function(){ decide('declined'); });
  }

  /* ---------- forms: AJAX submit with success / error states ---------- */
  document.querySelectorAll('.c-form').forEach(function(form){
    var fields = form.querySelector('.form-fields');
    var btn = form.querySelector('button[type="submit"]');
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }
      form.classList.remove('is-success','is-error');
      if(btn){ btn.classList.add('is-loading'); btn.disabled = true; }
      if(status){ status.textContent = 'Sending your enquiry…'; }

      var data = new FormData(form);
      fetch(form.action, {
        method:'POST',
        headers:{ 'Accept':'application/json' },
        body:data
      }).then(function(res){
        if(!res.ok) throw new Error('bad-status');
        return res.json();
      }).then(function(json){
        // FormSubmit answers 200 with success:"false" (e.g. form not yet activated), so check the body too
        if(!json || String(json.success) !== 'true') throw new Error(json && json.message || 'not-sent');
        form.classList.add('is-success');
        if(status){ status.textContent = 'Enquiry sent.'; }
        form.reset();
      }).catch(function(err){
        if(window.console) console.warn('Form submit failed:', err && err.message);
        form.classList.add('is-error');
        if(status){ status.textContent = 'Enquiry failed to send.'; }
      }).finally(function(){
        if(btn){ btn.classList.remove('is-loading'); btn.disabled = false; }
      });
    });

    form.querySelectorAll('[data-form-reset]').forEach(function(resetBtn){
      resetBtn.addEventListener('click', function(){
        form.classList.remove('is-success','is-error');
        if(status){ status.textContent = ''; }
      });
    });
  });
})();
