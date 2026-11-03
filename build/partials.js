/* ==========================================================
   SHARED SITE HEADER + FOOTER (single source of truth)
   Edit the markup below, then run:  node build/render.js
   The script writes the finished HTML into every page, so the
   navigation and footer are in the server's HTML (crawlable by
   Google and other search engines) instead of being built by JS.
   R is the relative path to the site root: '' or '../'.
   ========================================================== */

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
// UK services: [card anchor on destinations/united-kingdom.html, name]
var ukServices=[
  ['uk-skilled-worker','Skilled Worker Visa'],
  ['uk-sponsor-licence','Sponsor Licence'],
  ['uk-global-talent','Global Talent Visa'],
  ['uk-innovator-founder','Innovator Founder Visa'],
  ['uk-creative-worker','Creative Worker Visa'],
  ['uk-spouse-partner','Spouse &amp; Partner Visas'],
  ['uk-visa-extensions','Visa Extensions &amp; Switching'],
  ['uk-ilr','Indefinite Leave to Remain'],
  ['uk-british-citizenship','British Citizenship'],
  ['uk-visit-visas','UK Visit Visas']
];
// Destinations: [file in destinations/, name]
var destinations=[
  ['canada','Canada'],['united-states','United States'],['united-kingdom','United Kingdom'],
  ['australia','Australia'],['new-zealand','New Zealand'],['germany','Germany'],
  ['lithuania','Lithuania'],['italy','Italy'],['ireland','Ireland'],
  ['spain','Spain'],['sweden','Sweden'],['finland','Finland']
];

// Footer links: [href from site root, label]. Kept short on purpose:
// individual services and destinations are already listed in the header nav.
var explore=[
  ['services/index.html','Services'],
  ['destinations/index.html','Destinations'],
  ['about.html','About Us'],
  ['contact.html','Contact']
];
var legal=[
  ['privacy.html','Privacy &amp; Cookies']
];

// Social profiles shown under the footer brand blurb
var social=[
  ['Instagram','https://www.instagram.com/vanguard.global.migration/','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>'],
  ['Facebook','https://www.facebook.com/profile.php?id=61594552546076','<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.6 21v-7.7h2.6l.4-3h-3V8.4c0-.9.3-1.5 1.5-1.5h1.6V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.6V21h3z"/></svg>'],
  ['TikTok','https://www.tiktok.com/@vanguard.globalmigration','<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.7c-1.4.1-2.6-.3-3.9-1.1v5c0 6.4-7 8.4-9.8 3.8-1.8-3-.7-8.2 5.1-8.4v2.8c-.4.1-.9.2-1.3.3-1.3.4-2 1.2-1.8 2.6.4 2.7 5.4 3.5 5-1.8V3h2.8z"/></svg>'],
  ['YouTube','https://www.youtube.com/@VanguardGlobalMigration','<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.7 12 4.7 12 4.7s-6.8 0-8.5.5a2.8 2.8 0 0 0-2 2C1 8.9 1 12 1 12s0 3.1.5 4.8a2.8 2.8 0 0 0 2 2c1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5a2.8 2.8 0 0 0 2-2c.5-1.7.5-4.8.5-4.8s0-3.1-.5-4.8zM9.8 15.1V8.9l5.4 3.1-5.4 3.1z"/></svg>'],
  ['LinkedIn','https://www.linkedin.com/in/vanguardglobalmigration','<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.9 8.6H3.6V20h3.3V8.6zM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 13.5c0-3.1-1.7-5.1-4.4-5.1-1.5 0-2.6.8-3.1 1.6V8.6H9.7V20H13v-6c0-1.5.7-2.6 2-2.6s1.9 1 1.9 2.6v6h3.4l.1-6.5z"/></svg>']
];

function map(list, fn){ return list.map(fn).join(''); }

// page: path of the current file from the site root, e.g. 'services/express-entry.html'
function header(R, page){
  // Mark the current section in the desktop nav
  function cur(href){
    var section=href.match(/^(services|destinations)\/index\.html$/);
    var on=section ? page.indexOf(section[1]+'/')===0 : page===href;
    return on ? ' aria-current="page"' : '';
  }
  return ''+
  '<header class="nav">'+
    '<a class="logo" href="'+R+'index.html" aria-label="Vanguard Global Migration home">'+
      '<span class="logo-mark" aria-hidden="true"><img class="logo-image" src="'+R+'icons/logo.png" alt=""></span>'+
      '<span class="logo-word"><b>VANGUARD</b><span>Global Migration</span></span>'+
    '</a>'+
    '<nav class="nav-links" aria-label="Primary">'+
      '<div class="nav-item has-drop">'+
        '<a href="'+R+'services/index.html"'+cur('services/index.html')+'>Services '+caret+'</a>'+
        '<div class="nav-drop drop-wide" role="menu" aria-label="Services">'+
          '<div class="drop-col">'+
            '<p class="drop-label">Canada</p>'+
            map(services,function(s){ return '<a href="'+R+'services/index.html#'+s[0]+'"><b>'+s[1]+'</b><span>'+s[2]+'</span></a>'; })+
            '<div class="drop-foot"><a href="'+R+'services/index.html">View all Canada services '+arw+'</a></div>'+
          '</div>'+
          '<div class="drop-col drop-col-uk">'+
            '<p class="drop-label">United Kingdom</p>'+
            map(ukServices,function(s){ return '<a href="'+R+'destinations/united-kingdom.html#'+s[0]+'"><b>'+s[1]+'</b></a>'; })+
            '<div class="drop-foot"><a href="'+R+'destinations/united-kingdom.html#uk-services">View all UK services '+arw+'</a></div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="nav-item has-drop">'+
        '<a href="'+R+'destinations/index.html"'+cur('destinations/index.html')+'>Destinations '+caret+'</a>'+
        '<div class="nav-drop" role="menu" aria-label="Destinations">'+
          map(destinations,function(d){ return '<a href="'+R+'destinations/'+d[0]+'.html"><b>'+d[1]+'</b></a>'; })+
          '<div class="drop-foot"><a href="'+R+'destinations/index.html">View all destinations '+arw+'</a></div>'+
        '</div>'+
      '</div>'+
      '<div class="nav-item"><a href="'+R+'about.html"'+cur('about.html')+'>About Us</a></div>'+
      '<div class="nav-item"><a href="'+R+'consultation.html"'+cur('consultation.html')+'>Book Consultation</a></div>'+
      '<div class="nav-item"><a href="'+R+'contact.html"'+cur('contact.html')+'>Contact</a></div>'+
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
        '<p class="m-label">UK Services</p>'+
        map(ukServices,function(s){ return '<a href="'+R+'destinations/united-kingdom.html#'+s[0]+'">'+s[1]+'</a>'; })+
        '<a href="'+R+'destinations/united-kingdom.html#uk-services"><strong>View all UK services</strong></a>'+
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
}

function footer(R){
  return ''+
  '<footer class="c-footer">'+
    '<div class="wrap">'+
      '<div class="footer-grid">'+
        '<div class="footer-brand-block">'+
          '<a class="footer-logo" href="'+R+'index.html" aria-label="Vanguard Global Migration home"><img src="'+R+'icons/logo.png" alt="" width="58" height="36"><span class="footer-logo-word"><b>VANGUARD</b><span>Global Migration</span></span></a>'+
          '<p>Regulated Canadian immigration consultancy with offices in Mississauga and Lahore. Every file is reviewed under RCIC R416527, Muhammad Abid Nisar.</p>'+
          '<div class="footer-social" aria-label="Follow Vanguard Global Migration">'+
            map(social,function(s){ return '<a href="'+s[1]+'" target="_blank" rel="noopener" aria-label="'+s[0]+'" title="'+s[0]+'">'+s[2]+'</a>'; })+
          '</div>'+
        '</div>'+
        '<div class="footer-col"><h4>Explore</h4><ul>'+
          map(explore,function(l){ return '<li><a href="'+R+l[0]+'">'+l[1]+'</a></li>'; })+
        '</ul></div>'+
        '<div class="footer-col"><h4>Get in Touch</h4><ul>'+
          '<li><a href="mailto:info@vanguardglobalmigration.com">info@vanguardglobalmigration.com</a></li>'+
          '<li><a href="https://wa.me/923274012525" target="_blank" rel="noopener">WhatsApp: +92 327 4012525</a></li>'+
          '<li>Mississauga, Canada &middot; Lahore, Pakistan</li>'+
        '</ul>'+
        '<a class="footer-cta" href="'+R+'consultation.html">Book a Consultation</a></div>'+
      '</div>'+
      '<div class="footer-bottom">'+
        '<span>&copy; <span data-year>'+new Date().getFullYear()+'</span> Vanguard Global Migration. All rights reserved.</span>'+
        '<nav aria-label="Legal">'+
          map(legal,function(l){ return '<a href="'+R+l[0]+'">'+l[1]+'</a>'; })+
        '</nav>'+
      '</div>'+
    '</div>'+
  '</footer>'+

  // Floating WhatsApp button (bottom-right). Number in international format: 0327 4012525 -> 92 327 4012525
  '<a class="wa-float" href="https://wa.me/923274012525" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">'+
    '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3C9.4 3 4 8.38 4 15c0 2.12.56 4.19 1.62 6.01L4 29l8.2-1.6A12.05 12.05 0 0 0 16.04 27C22.66 27 28 21.62 28 15S22.66 3 16.04 3zm0 21.8c-1.86 0-3.68-.5-5.27-1.45l-.38-.22-4.86.95.97-4.73-.25-.4A9.72 9.72 0 0 1 6.3 15c0-5.37 4.37-9.73 9.74-9.73 5.36 0 9.7 4.36 9.7 9.73s-4.34 9.8-9.7 9.8zm5.34-7.3c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.66.14-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.58-.9-2.17-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.14.2 2.06 3.15 5 4.42.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.72-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34z"/></svg>'+
  '</a>'+

  // Back-to-top button (appears after scrolling, sits above WhatsApp); behaviour lives in scripts/site-footer.js
  '<button class="back-to-top" type="button" aria-label="Back to top"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 15V5M5 9.5l5-5 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
}

module.exports={header:header, footer:footer};
