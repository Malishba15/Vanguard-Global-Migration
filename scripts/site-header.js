/* ==========================================================
   SHARED SITE HEADER (desktop nav + mobile menu)
   Edit the markup below once and every page updates.
   Pages include it with: <script src="scripts/site-header.js"></script>
   (use "../scripts/site-header.js" from services/ and destinations/).
   Links are built from the site root, so they work from any folder.
   ========================================================== */
(function(){
  var script=document.currentScript;
  var R=script.src.replace(/scripts\/site-header\.js(\?.*)?$/,'');
  var arw='<svg class="arw" viewBox="0 0 12 10" fill="none" aria-hidden="true" width="12" height="10"><path d="M0.8 5h10M7.1 1.4 10.9 5l-3.8 3.6" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var caret='<svg class="drop-caret" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // Service categories: [anchor on services/index.html, name, short hint]
  var services=[
    ['permanent-residence','Permanent Residence','Express Entry, PNP &amp; more'],
    ['trade-skills','Trade Skills','Skilled trades pathway'],
    ['business-work-permits','Business Work Permits','C11 &amp; C10 permits'],
    ['study','Study','Study in Canada'],
    ['visitor-visas','Visitor Visas','Visitor, Super &amp; Business visas'],
    ['support-services','Support Services','Assessment, IELTS, documents &amp; landing']
  ];
  // Destinations: [file in destinations/, name]
  var destinations=[
    ['canada','Canada'],['united-states','United States'],['united-kingdom','United Kingdom'],
    ['australia','Australia'],['new-zealand','New Zealand'],['germany','Germany'],
    ['lithuania','Lithuania'],['italy','Italy'],['ireland','Ireland'],
    ['spain','Spain'],['sweden','Sweden'],['finland','Finland']
  ];

  function map(list, fn){ return list.map(fn).join(''); }

  var html=''+
  '<header class="nav">'+
    '<a class="logo" href="'+R+'index.html" aria-label="Vanguard Global Migration home">'+
      '<span class="logo-mark" aria-hidden="true"><img class="logo-image" src="'+R+'1.png" alt=""></span>'+
      '<span class="logo-word"><b>VANGUARD</b><span>Global Migration</span></span>'+
    '</a>'+
    '<nav class="nav-links" aria-label="Primary">'+
      '<div class="nav-item has-drop">'+
        '<a href="'+R+'services/index.html">Services '+caret+'</a>'+
        '<div class="nav-drop" role="menu" aria-label="Canada services">'+
          map(services,function(s){ return '<a href="'+R+'services/index.html#'+s[0]+'"><b>'+s[1]+'</b><span>'+s[2]+'</span></a>'; })+
          '<div class="drop-foot"><a href="'+R+'services/index.html">View all Canada services '+arw+'</a></div>'+
        '</div>'+
      '</div>'+
      '<div class="nav-item has-drop">'+
        '<a href="'+R+'destinations/index.html">Destinations '+caret+'</a>'+
        '<div class="nav-drop" role="menu" aria-label="Destinations">'+
          map(destinations,function(d){ return '<a href="'+R+'destinations/'+d[0]+'.html"><b>'+d[1]+'</b></a>'; })+
          '<div class="drop-foot"><a href="'+R+'destinations/index.html">View all destinations '+arw+'</a></div>'+
        '</div>'+
      '</div>'+
      '<div class="nav-item"><a href="'+R+'about.html">About Us</a></div>'+
      '<div class="nav-item"><a href="'+R+'consultation.html">Book Consultation</a></div>'+
      '<div class="nav-item"><a href="'+R+'contact.html">Contact</a></div>'+
    '</nav>'+
    '<div class="nav-actions">'+
      '<a class="btn-nav-cta" href="mailto:info@vanguardglobalmigration.com" aria-label="Contact for queries by email">Contact for Queries</a>'+
      '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span></button>'+
    '</div>'+
  '</header>'+

  '<nav class="menu" id="menu" aria-label="Mobile">'+
    '<details>'+
      '<summary>Services</summary>'+
      '<div class="m-sub">'+
        map(services,function(s){ return '<a href="'+R+'services/index.html#'+s[0]+'">'+s[1]+'</a>'; })+
        '<a href="'+R+'services/index.html"><strong>View all services</strong></a>'+
      '</div>'+
    '</details>'+
    '<details>'+
      '<summary>Destinations</summary>'+
      '<div class="m-sub">'+
        map(destinations,function(d){ return '<a href="'+R+'destinations/'+d[0]+'.html">'+d[1]+'</a>'; })+
      '</div>'+
    '</details>'+
    '<a href="'+R+'about.html">About Us</a>'+
    '<a href="'+R+'consultation.html">Book Consultation</a>'+
    '<a href="'+R+'index.html#success-stories">Success Stories</a>'+
    '<a href="'+R+'contact.html">Contact</a>'+
    '<div class="divider"></div>'+
    '<a class="m-cta" href="mailto:info@vanguardglobalmigration.com">Contact for Queries '+arw+'</a>'+
  '</nav>';

  script.insertAdjacentHTML('beforebegin', html);

  // Mark the current section in the desktop nav
  var path=location.pathname.replace(/index\.html$/,'');
  var top=document.querySelectorAll('.nav-links > .nav-item > a');
  for(var i=0;i<top.length;i++){
    var p=new URL(top[i].href).pathname.replace(/index\.html$/,'');
    if(path===p || (/\/(services|destinations)\/$/.test(p) && path.indexOf(p)===0)){
      top[i].setAttribute('aria-current','page');
    }
  }
})();
