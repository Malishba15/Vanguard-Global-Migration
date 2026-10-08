/* ==========================================================
   SHARED SITE FOOTER
   Edit the markup below once and every page updates.
   Pages include it with: <script src="scripts/site-footer.js"></script>
   (use "../scripts/site-footer.js" from services/ and destinations/).
   ========================================================== */
(function(){
  var script=document.currentScript;
  var R=script.src.replace(/scripts\/site-footer\.js(\?.*)?$/,'');

  // Footer columns: heading + [href from site root, label]
  var columns=[
    ['Permanent Residence',[
      ['services/express-entry.html','Express Entry'],
      ['services/provincial-nominee-program.html','Provincial Nominee Programs'],
      ['services/healthcare-pathway.html','Healthcare Canada Pathway'],
      ['services/physician-dentist-elite.html','Physician &amp; Dentist Elite'],
      ['services/french-fast-track.html','French Fast-Track']
    ]],
    ['Work, Study &amp; Visit',[
      ['services/federal-skilled-trades.html','Skilled Trades Pathway'],
      ['services/c11-work-permit.html','C11 Work Permit'],
      ['services/study-permit.html','Study in Canada'],
      ['services/super-visa.html','Super Visa'],
      ['services/visitor-visa.html','Visitor Visa']
    ]],
    ['Global Destinations',[
      ['destinations/canada.html','Canada'],
      ['destinations/united-kingdom.html','United Kingdom'],
      ['destinations/australia.html','Australia'],
      ['destinations/germany.html','Germany'],
      ['destinations/index.html','All destinations']
    ]]
  ];
  var legal=[
    ['about.html','About'],
    ['consultation.html','Book a Consultation'],
    ['contact.html','Contact'],
    ['privacy.html','Privacy &amp; Cookies']
  ];

  // Social profiles shown under the footer brand blurb
  var social=[
    ['Instagram','https://www.instagram.com/vanguard.global.migration/','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>'],
    ['Facebook','https://www.facebook.com/profile.php?id=61594552546076','<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.6 21v-7.7h2.6l.4-3h-3V8.4c0-.9.3-1.5 1.5-1.5h1.6V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.6V21h3z"/></svg>'],
    ['TikTok','https://www.tiktok.com/@vanguard.globalmigration','<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.7c-1.4.1-2.6-.3-3.9-1.1v5c0 6.4-7 8.4-9.8 3.8-1.8-3-.7-8.2 5.1-8.4v2.8c-.4.1-.9.2-1.3.3-1.3.4-2 1.2-1.8 2.6.4 2.7 5.4 3.5 5-1.8V3h2.8z"/></svg>'],
    ['YouTube','https://www.youtube.com/@VanguardGlobalMigration','<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.7 12 4.7 12 4.7s-6.8 0-8.5.5a2.8 2.8 0 0 0-2 2C1 8.9 1 12 1 12s0 3.1.5 4.8a2.8 2.8 0 0 0 2 2c1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5a2.8 2.8 0 0 0 2-2c.5-1.7.5-4.8.5-4.8s0-3.1-.5-4.8zM9.8 15.1V8.9l5.4 3.1-5.4 3.1z"/></svg>']
  ];

  var html=''+
  '<footer class="c-footer">'+
    '<div class="wrap">'+
      '<div class="footer-grid">'+
        '<div class="footer-brand-block">'+
          '<a class="footer-logo" href="'+R+'index.html" aria-label="Vanguard Global Migration home"><img src="'+R+'icons/logo.png" alt="" width="58" height="36"><span class="footer-logo-word"><b>VANGUARD</b><span>Global Migration</span></span></a>'+
          '<p>Regulated Canadian immigration consultancy with offices in Mississauga and Lahore. Every file is reviewed under RCIC R416527, Muhammad Abid Nisar.</p>'+
          '<div class="footer-social" aria-label="Follow Vanguard Global Migration">'+
            social.map(function(s){ return '<a href="'+s[1]+'" target="_blank" rel="noopener" aria-label="'+s[0]+'" title="'+s[0]+'">'+s[2]+'</a>'; }).join('')+
          '</div>'+
        '</div>'+
        columns.map(function(c){
          return '<div class="footer-col"><h4>'+c[0]+'</h4><ul>'+
            c[1].map(function(l){ return '<li><a href="'+R+l[0]+'">'+l[1]+'</a></li>'; }).join('')+
          '</ul></div>';
        }).join('')+
      '</div>'+
      '<div class="footer-bottom">'+
        '<span>&copy; '+new Date().getFullYear()+' Vanguard Global Migration. All rights reserved.</span>'+
        '<nav aria-label="Legal">'+
          legal.map(function(l){ return '<a href="'+R+l[0]+'">'+l[1]+'</a>'; }).join('')+
        '</nav>'+
      '</div>'+
    '</div>'+
  '</footer>'+

  // Floating WhatsApp button (bottom-right). Number in international format: 0327 4012525 -> 92 327 4012525
  '<a class="wa-float" href="https://wa.me/923274012525" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">'+
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3C9.4 3 4 8.38 4 15c0 2.12.56 4.19 1.62 6.01L4 29l8.2-1.6A12.05 12.05 0 0 0 16.04 27C22.66 27 28 21.62 28 15S22.66 3 16.04 3zm0 21.8c-1.86 0-3.68-.5-5.27-1.45l-.38-.22-4.86.95.97-4.73-.25-.4A9.72 9.72 0 0 1 6.3 15c0-5.37 4.37-9.73 9.74-9.73 5.36 0 9.7 4.36 9.7 9.73s-4.34 9.8-9.7 9.8zm5.34-7.3c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.66.14-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.58-.9-2.17-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.14.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.72-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34z"/></svg>'+
  '</a>'+

  // Back-to-top button (appears after scrolling, sits above WhatsApp)
  '<button class="back-to-top" type="button" aria-label="Back to top"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 15V5M5 9.5l5-5 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';

  script.insertAdjacentHTML('beforebegin', html);

  var toTop=document.querySelector('.back-to-top');
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
