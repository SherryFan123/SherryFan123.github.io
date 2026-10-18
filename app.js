function youtubeId(s){var m=String(s).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtube\.com\/v\/)([\w-]{11})|^([\w-]{11})$/);return m?m[1]||m[2]:null}
function vimeoId(s){if(youtubeId(s))return null;var m=String(s).match(/(\d{5,})/);return /vimeo|^\d+$/.test(s)&&m?m[1]:null}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}

var SOUND_ICON='<span class="snd" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path class="on" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"/><path class="off" d="M16 9l5 6M21 9l-5 6"/></svg></span>';

/* ---------- one-sound-at-a-time manager ---------- */
var Sound={cur:null,
  toggle:function(p){
    if(this.cur===p){ p.mute(); this.cur=null; return; }
    if(this.cur) this.cur.mute();
    this.cur=p; p.unmute();
  }
};
window.Sound=Sound;

/* ---------- cards ---------- */
function card(v,i){
  var yt=youtubeId(v.source),vm=vimeoId(v.source),inner,kind;
  if(yt){
    kind='yt';
    inner=`<img class="poster" src="https://i.ytimg.com/vi/${yt}/hqdefault.jpg" data-max="https://i.ytimg.com/vi/${yt}/maxresdefault.jpg" alt="" loading="lazy"><div class="ytmount" data-yt="${yt}"></div>`;
  }else if(vm){
    kind='vimeo';
    inner=`<iframe data-src="https://player.vimeo.com/video/${vm}?background=1&muted=1&loop=1" allow="autoplay; fullscreen; picture-in-picture"></iframe>`;
  }else{
    kind='mp4';
    inner=`<video muted loop playsinline preload="metadata" src="${v.source}" ${v.poster?`poster="${v.poster}"`:''}></video>`;
  }
  return `<div class="v ${v.vertical?'vert':''}" data-kind="${kind}"><div class="frame" role="button" tabindex="0" aria-label="Toggle sound: ${esc(v.title)}">${inner}<div class="hit"></div>${kind!=='vimeo'?SOUND_ICON:''}</div><p>${v.title}</p></div>`;
}

/* ---------- YouTube IFrame API ---------- */
var ytReady=null;
function loadYT(){
  if(ytReady) return ytReady;
  ytReady=new Promise(function(res){
    if(window.YT&&YT.Player) return res();
    var prev=window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady=function(){ if(prev) prev(); res(); };
    var s=document.createElement('script'); s.src='https://www.youtube.com/iframe_api'; document.head.appendChild(s);
  });
  return ytReady;
}

function setupCard(el,io){
  var frame=el.querySelector('.frame'),kind=el.dataset.kind,ctl={inView:false};
  function setOn(on){ el.classList.toggle('sound',on); }
  if(kind==='mp4'){
    var vid=frame.querySelector('video');
    ctl.play=function(){ vid.play().catch(function(){}); };
    ctl.pause=function(){ vid.pause(); };
    ctl.mute=function(){ vid.muted=true; setOn(false); };
    ctl.unmute=function(){ vid.muted=false; setOn(true); vid.play().catch(function(){}); };
    ctl.isMuted=function(){ return vid.muted; };
  }else if(kind==='yt'){
    var mount=frame.querySelector('.ytmount'),id=mount.dataset.yt,player=null,ready=false,wantSound=false;
    var img=frame.querySelector('img.poster');
    var t=new Image(); t.onload=function(){ if(t.naturalWidth>=480) img.src=img.dataset.max; }; t.src=img.dataset.max;
    function create(){
      if(player) return;
      player='pending';
      loadYT().then(function(){
        player=new YT.Player(mount,{videoId:id,host:'https://www.youtube-nocookie.com',
          playerVars:{autoplay:1,mute:1,playsinline:1,controls:0,rel:0,loop:1,playlist:id,disablekb:1,fs:0,iv_load_policy:3,modestbranding:1,cc_load_policy:0,enablejsapi:1,origin:location.origin},
          events:{
            onReady:function(e){ ready=true; e.target.mute(); if(wantSound) e.target.unMute(); if(ctl.inView) e.target.playVideo(); else e.target.pauseVideo(); },
            onStateChange:function(e){ if(e.data===1) el.classList.add('live'); }
          }});
        el.ytPlayer=player;
      });
    }
    ctl.play=function(){ create(); if(ready) player.playVideo(); };
    ctl.pause=function(){ if(ready) player.pauseVideo(); };
    ctl.mute=function(){ wantSound=false; setOn(false); if(ready){ player.mute(); if(ctl.inView) player.playVideo(); } };
    ctl.unmute=function(){ wantSound=true; setOn(true); create(); if(ready){ player.unMute(); player.setVolume(100); player.playVideo();
      /* if the browser blocks sound (e.g. some mobile browsers), fall back to muted playback instead of freezing */
      setTimeout(function(){ if(wantSound&&ctl.inView&&player.getPlayerState()===2){ player.mute(); player.playVideo(); wantSound=false; setOn(false); if(Sound.cur===ctl) Sound.cur=null; } },700); } };
    ctl.isMuted=function(){ return ready?player.isMuted():!wantSound; };
  }else{
    var ifr=frame.querySelector('iframe');
    ctl.play=function(){ if(!ifr.src) ifr.src=ifr.dataset.src; };
    ctl.pause=function(){}; ctl.mute=function(){}; ctl.unmute=function(){}; ctl.isMuted=function(){return true};
  }
  el.ctl=ctl;
  if(kind!=='vimeo'){
    frame.addEventListener('click',function(){ Sound.toggle(ctl); });
    frame.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); Sound.toggle(ctl); }});
  }
  io.observe(el);
}

function render(el,section){
  var list=VIDEOS.filter(function(v){return (v.section||'home')===section});
  list=list.filter(function(v){return v.vertical}).concat(list.filter(function(v){return !v.vertical}));
  el.className='grid'+(section==='crew'?' grid-crew':'');
  el.innerHTML=list.map(card).join('');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    var c=e.target.ctl; c.inView=e.isIntersecting;
    if(e.isIntersecting) c.play(); else c.pause();
  })},{threshold:.25,rootMargin:'0px'});
  el.querySelectorAll('.v').forEach(function(c){ setupCard(c,io); });
}

var PAGES=[['home','index.html','WSJ'],['wsj-app','wsj-app.html','WSJ App'],['crew','production-crew.html','Production Crew'],['dp','dp-work.html','DP Work']];
function siteNav(cur){
  return '<nav class="top">'+PAGES.map(function(p){return `<a href="${p[1]}" class="${cur===p[0]?'on':''}">${p[2]}</a>`}).join('')+'</nav>';
}
