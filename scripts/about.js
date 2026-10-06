(function(){
  document.documentElement.classList.add('js-ready');
  var revealItems=Array.prototype.slice.call(document.querySelectorAll('.about-reveal'));
  if(!revealItems.length) return;
  var reduced=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced || !('IntersectionObserver' in window)){
    revealItems.forEach(function(item){item.classList.add('is-visible');});
    return;
  }
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.14});
  revealItems.forEach(function(item){observer.observe(item);});
})();