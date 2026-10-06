(function(){
  var counters=Array.prototype.slice.call(document.querySelectorAll('.counter'));
  if(!counters.length) return;

  function format(value, element){
    return element.dataset.format==='comma' ? value.toLocaleString('en-US') : String(value);
  }

  function showFinal(){
    counters.forEach(function(counter){
      counter.textContent=format(Number(counter.dataset.target), counter);
    });
  }

  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)){
    showFinal();
    return;
  }

  var section=document.querySelector('.results-section');
  var started=false;
  var observer=new IntersectionObserver(function(entries){
    if(started || !entries.some(function(entry){ return entry.isIntersecting; })) return;
    started=true;
    counters.forEach(function(counter){
      var target=Number(counter.dataset.target);
      var start=performance.now();
      var duration=1500;
      function tick(now){
        var progress=Math.min((now-start)/duration, 1);
        var eased=1-Math.pow(1-progress, 3);
        counter.textContent=format(Math.round(target*eased), counter);
        if(progress<1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
    observer.disconnect();
  }, {threshold:.28});

  if(section) observer.observe(section); else showFinal();
})();