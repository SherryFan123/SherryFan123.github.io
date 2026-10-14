function vimeoId(s){var m=String(s).match(/(\d{5,})/);return /vimeo|^\d+$/.test(s)&&m?m[1]:null}
function card(v){var id=vimeoId(v.source),inner;
 if(id) inner=`<iframe ${v.autoplay?'data-':''}src="https://player.vimeo.com/video/${id}${v.autoplay?'?background=1&muted=1&loop=1':''}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
 else inner=v.autoplay?`<video muted loop playsinline preload="none" data-auto src="${v.source}" ${v.poster?`poster="${v.poster}"`:''}></video>`
  :`<video controls playsinline preload="none" src="${v.source}" ${v.poster?`poster="${v.poster}"`:''}></video>`;
 return `<div class="v ${v.vertical?'vert':''}"><div class="frame">${inner}</div><p>${v.title}</p></div>`}
function render(el){
 el.innerHTML=VIDEOS.map(card).join('');
 var io=new IntersectionObserver(es=>es.forEach(e=>{var t=e.target;
  if(t.tagName=='VIDEO'){e.isIntersecting?t.play().catch(()=>{}):t.pause()}
  else{ if(e.isIntersecting&&!t.src&&t.dataset.src) t.src=t.dataset.src;
   else if(t.src) t.contentWindow&&t.contentWindow.postMessage(JSON.stringify({method:e.isIntersecting?'play':'pause'}),'*')}
 }),{threshold:.35});
 el.querySelectorAll('video[data-auto],iframe[data-src]').forEach(x=>io.observe(x));
}
