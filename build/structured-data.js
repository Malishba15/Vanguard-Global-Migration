/* ==========================================================
   STRUCTURED DATA (schema.org JSON-LD) for search engines
   Built from what each page already shows, so it always
   matches the visible content (Google requires this):
     - WebPage      : <title>, meta description, canonical URL
     - BreadcrumbList: the visible .c-crumb trail
     - FAQPage      : the visible FAQ questions and answers
     - Service      : services/*.html detail pages
   The site-wide WebSite + organization entities live in
   index.html; every page links to them by @id.
   ========================================================== */
var SITE='https://vanguardglobalmigration.com/';
var ORG={'@id':SITE+'#organization'};
var WEBSITE={'@id':SITE+'#website'};

var ENTITIES={amp:'&',nbsp:' ',middot:'·',mdash:'—',ndash:'–',ldquo:'“',rdquo:'”',lsquo:'‘',rsquo:'’',quot:'"',apos:"'",lt:'<',gt:'>',copy:'©'};

// HTML fragment -> clean plain text
function text(html){
  return html
    .replace(/<\/(p|li|h\d)>\s*/gi,'$& ')
    .replace(/<[^>]+>/g,'')
    .replace(/&(#\d+|[a-z]+);/gi,function(m,e){
      if(e[0]==='#') return String.fromCharCode(+e.slice(1));
      return ENTITIES[e.toLowerCase()]!=null ? ENTITIES[e.toLowerCase()] : m;
    })
    .replace(/\s+/g,' ')
    .trim();
}

// Relative href on a page -> absolute canonical URL (index.html -> folder URL)
function absolute(href, page){
  var url=new URL(href, SITE+page);
  url.hash='';
  return url.href.replace(/index\.html$/,'');
}

function match(html, re){ var m=html.match(re); return m ? m[1] : ''; }

function breadcrumbs(html, page, canonical){
  var ol=match(html, /<nav class="c-crumb[^"]*"[^>]*>\s*<ol>([\s\S]*?)<\/ol>/);
  if(!ol) return null;
  var items=[];
  ol.replace(/<li>([\s\S]*?)<\/li>/g, function(_, li){
    var href=match(li, /href="([^"]+)"/);
    items.push({
      '@type':'ListItem',
      position:items.length+1,
      name:text(li),
      item:href ? absolute(href, page) : canonical
    });
  });
  return items.length>1 ? {'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:items} : null;
}

// FAQ sections: .faq-explain (inner pages) and .faq-list (home page)
function faqs(html){
  var questions=[];
  var sections=html.match(/<div class="faq-(?:explain|list)">[\s\S]*?<\/details>\s*<\/div>/g)||[];
  sections.forEach(function(section){
    section.replace(/<details>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g, function(_, q, a){
      q=text(q.replace(/<span class="q-icon">[\s\S]*?<\/span>/,''));
      a=text(a);
      if(q && a) questions.push({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}});
    });
  });
  return questions;
}

function build(html, page){
  var canonical=match(html, /<link rel="canonical" href="([^"]+)"/);
  if(!canonical) return '';
  var title=text(match(html, /<title>([\s\S]*?)<\/title>/));
  var description=text(match(html, /<meta name="description" content="([^"]*)"/));
  var graph=[];

  var crumbs=breadcrumbs(html, page, canonical);
  var webPage={
    '@type':'WebPage',
    '@id':canonical+'#webpage',
    url:canonical,
    name:title,
    description:description,
    inLanguage:'en',
    isPartOf:WEBSITE,
    publisher:ORG
  };
  if(crumbs) webPage.breadcrumb={'@id':crumbs['@id']};
  graph.push(webPage);
  if(crumbs) graph.push(crumbs);

  // Individual Canada service pages
  if(/^services\/(?!index\.html)/.test(page)){
    var name=crumbs ? crumbs.itemListElement[crumbs.itemListElement.length-1].name : title.split(' | ')[0];
    graph.push({
      '@type':'Service',
      '@id':canonical+'#service',
      name:name,
      serviceType:'Canadian immigration consulting',
      description:description,
      url:canonical,
      provider:ORG,
      mainEntityOfPage:{'@id':canonical+'#webpage'}
    });
  }

  var questions=faqs(html);
  if(questions.length) graph.push({'@type':'FAQPage','@id':canonical+'#faq',mainEntity:questions});

  var json=JSON.stringify({'@context':'https://schema.org','@graph':graph}, null, 2)
    .replace(/</g,'\\u003c'); // never let content close the <script> early
  return '<script type="application/ld+json">\n'+json+'\n</script>';
}

module.exports={build:build};
