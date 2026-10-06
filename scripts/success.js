(function(){
  var form=document.getElementById('contactForm');
  if(!form) return;
  var status=document.getElementById('formStatus');
  form.addEventListener('submit',function(event){
    if(form.elements._honey.value){
      event.preventDefault();
      return;
    }
    if(status) status.textContent='Sending your enquiry...';
    var button=form.querySelector('button[type="submit"]');
    if(button){
      button.disabled=true;
      button.setAttribute('aria-busy','true');
    }
  });
})();