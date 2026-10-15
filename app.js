function youtubeId(s){var m=String(s).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtube\.com\/v\/)([\w-]{11})|^([\w-]{11})$/);return m?m[1]||m[2]:null}
function vimeoId(s){if(youtubeId(s))return null;var m=String(s).match(/(\d{5,})/);return /vimeo|^\d+$/.test(s)&&m?m[1]:null}

function cardHome(v){
  var inner;
  if(youtubeId(v.source)||vimeoId(v.source)){
    /* home is local WSJ media; keep embed path for completeness */
    var yt=youtubeId(v.source),vid=vimeoId(v.source);
    if(yt) inner=`<iframe data-src="https://www.youtube.com/embed/${yt}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${yt}&enablejsapi=1&controls=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    else inner=`<iframe data-src="https://player.vimeo.com/video/${vid}?background=1&muted=1&loop=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  }else{
    inner=`<video muted loop playsinline preload="metadata" data-auto src="${v.source}" ${v.poster?`poster="${v.poster}"`:''}></video>`;
  }
  return `<div class="v ${v.vertical?'vert':''}"><div class="frame">${inner}</div><p>${v.title}</p></div>`;
}

function cardCrew(v){
  var yt=youtubeId(v.source);
  if(!yt) return '';
  return `<div class="v"><div class="frame thumb" data-yt="${yt}" role="button" tabindex="0" aria-label="Play ${v.title.replace(/"/g,'&quot;')}">
    <img src="https://i.ytimg.com/vi/${yt}/hqdefault.jpg" alt="" loading="lazy" data-max="https://i.ytimg.com/vi/${yt}/maxresdefault.jpg">
  </div><p>${v.title}</p></div>`;
}

function ytCmd(iframe,fn){try{iframe.contentWindow&&iframe.contentWindow.postMessage(JSON.stringify({event:'command',func:fn,args:[]}),'*')}catch(e){}}

function bindHomeAutoplay(root){
  var io=new IntersectionObserver(es=>es.forEach(e=>{
    var t=e.target;
    if(t.tagName==='VIDEO'){
      if(e.isIntersecting) t.play().catch(()=>{});
      else t.pause();
    }else if(t.dataset.src){
      if(e.isIntersecting){ if(!t.src) t.src=t.dataset.src; ytCmd(t,'playVideo'); }
      else if(t.src) ytCmd(t,'pauseVideo');
    }
  }),{threshold:.25});
  root.querySelectorAll('video[data-auto],iframe[data-src]').forEach(x=>io.observe(x));
  /* click video: unmute + show controls; click again while unmuted keeps controls */
  root.querySelectorAll('video[data-auto]').forEach(v=>{
    v.addEventListener('click',()=>{
      if(v.muted){ v.muted=false; v.controls=true; v.play().catch(()=>{}); }
    });
  });
}

function bindCrewThumbs(root){
  root.querySelectorAll('.frame.thumb img[data-max]').forEach(img=>{
    var t=new Image(); t.onload=function(){ if(t.naturalWidth>=480) img.src=img.dataset.max; }; t.src=img.dataset.max;
  });
  root.querySelectorAll('.frame.thumb').forEach(frame=>{
    function play(){
      var id=frame.dataset.yt; if(!id||frame.dataset.playing) return;
      frame.dataset.playing='1';
      frame.innerHTML=`<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    }
    frame.addEventListener('click',play);
    frame.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); play(); }});
  });
}

function render(el,section){
  var list=VIDEOS.filter(v=>(v.section||'home')===section);
  if(section==='home'||section==='dp'){
    list=list.filter(v=>v.vertical).concat(list.filter(v=>!v.vertical));
  }
  if(section==='crew'){
    el.className='grid grid-crew';
    el.innerHTML=list.map(cardCrew).join('');
    bindCrewThumbs(el);
  }else{
    el.className='grid grid-home';
    el.innerHTML=list.map(cardHome).join('');
    bindHomeAutoplay(el);
  }
}

function siteNav(cur){
  return `<nav class="top"><a href="index.html" class="${cur==='home'?'on':''}">WSJ</a><a href="production-crew.html" class="${cur==='crew'?'on':''}">Production Crew</a><a href="dp-work.html" class="${cur==='dp'?'on':''}">DP Work</a></nav>`;
}
