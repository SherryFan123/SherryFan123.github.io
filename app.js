function youtubeId(s){var m=String(s).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtube\.com\/v\/)([\w-]{11})|^([\w-]{11})$/);return m?m[1]||m[2]:null}
function vimeoId(s){if(youtubeId(s))return null;var m=String(s).match(/(\d{5,})/);return /vimeo|^\d+$/.test(s)&&m?m[1]:null}
function card(v){
  var yt=youtubeId(v.source),vid=vimeoId(v.source),inner;
  if(yt){
    var q=v.autoplay?'?autoplay=1&mute=1&playsinline=1&loop=1&playlist='+yt+'&enablejsapi=1&controls=0':'?enablejsapi=1&rel=0';
    inner=`<iframe ${v.autoplay?'data-':''}src="https://www.youtube.com/embed/${yt}${q}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>`;
  }else if(vid){
    inner=`<iframe ${v.autoplay?'data-':''}src="https://player.vimeo.com/video/${vid}${v.autoplay?'?background=1&muted=1&loop=1':''}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
  }else{
    inner=v.autoplay?`<video muted loop playsinline preload="none" data-auto src="${v.source}" ${v.poster?`poster="${v.poster}"`:''}></video>`
      :`<video controls playsinline preload="none" src="${v.source}" ${v.poster?`poster="${v.poster}"`:''}></video>`;
  }
  return `<div class="v ${v.vertical?'vert':''}"><div class="frame">${inner}</div><p>${v.title}</p></div>`;
}
function ytCmd(iframe,fn){iframe.contentWindow&&iframe.contentWindow.postMessage(JSON.stringify({event:'command',func:fn,args:[]}),'*')}
function render(el,section){
  var list=VIDEOS.filter(v=>(v.section||'home')===section);
  el.innerHTML=list.map(card).join('');
  var io=new IntersectionObserver(es=>es.forEach(e=>{var t=e.target;
    if(t.tagName==='VIDEO'){e.isIntersecting?t.play().catch(()=>{}):t.pause()}
    else if(t.dataset.src){if(e.isIntersecting&&!t.src)t.src=t.dataset.src;else if(t.src)ytCmd(t,e.isIntersecting?'playVideo':'pauseVideo')}
    else if(/youtube/.test(t.src||''))ytCmd(t,e.isIntersecting?'playVideo':'pauseVideo');
    else if(t.src)t.contentWindow&&t.contentWindow.postMessage(JSON.stringify({method:e.isIntersecting?'play':'pause'}),'*');
  }),{threshold:.35});
  el.querySelectorAll('video[data-auto],iframe[data-src],iframe[src*="youtube"][src*="autoplay"]').forEach(x=>io.observe(x));
}
function siteNav(cur){
  return `<nav class="top"><a href="index.html" class="${cur==='home'?'on':''}">WSJ</a><a href="production-crew.html" class="${cur==='crew'?'on':''}">Production Crew</a></nav>`;
}
