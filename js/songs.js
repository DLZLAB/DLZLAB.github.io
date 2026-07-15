const TRANSLATIONS={en:{title:"Songs — Dawood WaliZada",desc:"Songs by Dawood WaliZada",heading:"Songs",sub:"Listen to songs created by Dawood WaliZada",back:"← Back to Home",empty:"No songs yet. Check back soon!",play:"Play",pause:"Pause",download:"Download",lyrics:"Lyrics",artist:"Artist",by:"by",s_unknown:"Unknown Artist"},fa:{title:"آهنگ‌ها — داود ولی‌زاده",desc:"آهنگ‌های داود ولی‌زاده",heading:"آهنگ‌ها",sub:"به آهنگ‌های ساخته شده توسط داود ولی‌زاده گوش دهید",back:"→ بازگشت به صفحه اصلی",empty:"هنوز آهنگی وجود ندارد. به زودی!",play:"پخش",pause:"توقف",download:"دانلود",lyrics:"متن شعر",artist:"هنرمند",by:"اثر",s_unknown:"هنرمند ناشناس"}}

let currentAudio=null,currentBtn=null,currentItem=null
let lang=localStorage.getItem('dlz-lang')||'en'

document.addEventListener('DOMContentLoaded',()=>{
  applyLang(lang)
  document.getElementById('langToggle')?.addEventListener('click',()=>{
    lang=lang==='en'?'fa':'en'
    localStorage.setItem('dlz-lang',lang)
    applyLang(lang)
  })
  loadSongs()
})

function applyLang(l){
  const t=TRANSLATIONS[l]
  if(!t)return
  document.documentElement.lang=l==='fa'?'fa':'en'
  document.documentElement.dir=l==='fa'?'rtl':'ltr'
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.dataset.i18n
    if(t[k]){if(el.tagName==='META'&&el.hasAttribute('content'))el.setAttribute('content',t[k]);else el.innerHTML=t[k]}
  })
  const btn=document.getElementById('langToggle')
  if(btn)btn.innerHTML=`<span class="lang-icon">${l==='fa'?'EN':'FA'}</span>`
}

async function loadSongs(){
  try{
    const r=await fetch('data.json')
    const d=await r.json()
    const sorted=(d.songs||[]).sort((a,b)=>(b.id||0)-(a.id||0))
    renderSongs(sorted)
  }catch(e){
    document.getElementById('songList').innerHTML=`<div class="empty-state"><i class="fas fa-music"></i><p data-i18n="empty">${TRANSLATIONS[lang].empty}</p></div>`
  }
}

function audioUrl(s){return s.audio.startsWith('/')?s.audio:'/'+s.audio}

function renderSongs(songs){
  const container=document.getElementById('songList')
  if(!songs.length){
    container.innerHTML=`<div class="empty-state"><i class="fas fa-music"></i><p data-i18n="empty">${TRANSLATIONS[lang].empty}</p></div>`
    return
  }
  container.className='song-list'
  container.innerHTML=songs.map((s,i)=>`
    <div class="song-item" data-id="${s.id||i}">
      <div class="song-header" onclick="toggleSong(this)">
        <div class="song-num">${i+1}</div>
        ${s.photo?`<div class="song-photo"><img src="${escAttr(s.photo)}" alt="" loading="lazy" /></div>`:''}
        <div class="song-info">
          <h3>${esc(s.title)}</h3>
          <span class="artist">${TRANSLATIONS[lang].by} ${esc(s.artist||TRANSLATIONS[lang].s_unknown)}</span>
        </div>
        <div class="song-actions">
          <button onclick="event.stopPropagation();playSong(this,'${escAttr(audioUrl(s))}',${i})" title="${TRANSLATIONS[lang].play}" aria-label="${TRANSLATIONS[lang].play}"><i class="fas fa-play"></i></button>
          <a href="${escAttr(audioUrl(s))}" download class="download-btn" onclick="event.stopPropagation()" title="${TRANSLATIONS[lang].download}"><i class="fas fa-download"></i></a>
        </div>
      </div>
      <div class="song-body">
        <div class="song-body-inner">
          <div class="player-wrapper">
            <div class="player-controls">
              <button onclick="event.stopPropagation();playSong(this,'${escAttr(audioUrl(s))}',${i})"><i class="fas fa-play"></i></button>
            </div>
            <div class="progress-wrap">
              <span class="time-display">0:00</span>
              <input type="range" class="seek" min="0" max="100" value="0" oninput="seekAudio(this)">
              <span class="time-display">0:00</span>
              <div class="loading-indicator" style="display:none"><i class="fas fa-circle-notch fa-spin"></i></div>
            </div>
            <div class="volume-wrap">
              <i class="fas fa-volume-up"></i>
              <input type="range" min="0" max="1" step="0.05" value="1" oninput="setVolume(this)">
            </div>
            <a href="${escAttr(audioUrl(s))}" download class="download-btn"><i class="fas fa-download"></i> ${TRANSLATIONS[lang].download}</a>
          </div>
          <div class="player-error"></div>
          ${s.poet?`<div class="poet-box"><h4><i class="fas fa-feather"></i> ${TRANSLATIONS[lang].lyrics}</h4><div class="poet-text">${esc(s.poet)}</div></div>`:''}
        </div>
      </div>
    </div>
  `).join('')
}

function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}
function escAttr(s){return s.replace(/"/g,'&quot;').replace(/'/g,'&#39;')}

function toggleSong(header){
  const item=header.closest('.song-item')
  const body=item.querySelector('.song-body')
  const wasActive=item.classList.contains('active')
  document.querySelectorAll('.song-item.active').forEach(el=>{
    el.classList.remove('active')
    const b=el.querySelector('.song-body')
    if(b)b.style.maxHeight='0px'
  })
  if(!wasActive){
    item.classList.add('active')
    body.style.maxHeight=body.scrollHeight+'px'
  }
}

function playSong(btn,src,idx){
  if(currentAudio&&currentAudio.src.endsWith(src)){
    if(currentAudio.paused){currentAudio.play();setPlayBtn(btn,'play')}
    else{currentAudio.pause();setPlayBtn(btn,'pause')}
    return
  }
  if(currentAudio){currentAudio.pause();currentAudio.currentTime=0;if(currentBtn)setPlayBtn(currentBtn,'pause')}
  currentAudio=new Audio(src)
  currentAudio.preload='auto'
  currentBtn=btn
  const item=btn.closest('.song-item')
  const seekBar=item?.querySelector('.seek')
  const timeDisps=item?.querySelectorAll('.time-display')
  const volSlider=item?.querySelector('.volume-wrap input')
  const loadInd=item?.querySelector('.loading-indicator')
  const errEl=item?.querySelector('.player-error')
  if(volSlider)currentAudio.volume=parseFloat(volSlider.value)
  if(errEl)errEl.textContent=''

  setPlayBtn(btn,'loading')
  if(loadInd)loadInd.style.display=''

  const loaded=()=>{
    setPlayBtn(btn,'play')
    if(loadInd)loadInd.style.display='none'
  }

  currentAudio.addEventListener('canplay',loaded,{once:true})

  currentAudio.addEventListener('timeupdate',()=>{
    if(!currentAudio||!seekBar||!timeDisps)return
    const pct=(currentAudio.currentTime/currentAudio.duration)*100||0
    seekBar.value=pct
    timeDisps[0].textContent=formatTime(currentAudio.currentTime)
    timeDisps[1].textContent=formatTime(currentAudio.duration)
  })
  currentAudio.addEventListener('ended',()=>{
    setPlayBtn(btn,'pause')
    if(timeDisps){timeDisps[0].textContent='0:00';timeDisps[1].textContent='0:00'}
    if(seekBar)seekBar.value=0
    if(loadInd)loadInd.style.display='none'
  })
  currentAudio.addEventListener('waiting',()=>{
    if(loadInd)loadInd.style.display=''
  })
  currentAudio.addEventListener('playing',()=>{
    if(loadInd)loadInd.style.display='none'
  })

  const onError=()=>{
    setPlayBtn(btn,'pause')
    if(timeDisps){timeDisps[0].textContent='0:00';timeDisps[1].textContent='0:00'}
    if(seekBar)seekBar.value=0
    if(loadInd)loadInd.style.display='none'
    if(errEl)errEl.textContent='Playback failed. Try downloading the song.'
  }
  currentAudio.addEventListener('error',onError)
  currentAudio.play().catch(onError)
}

function setPlayBtn(btn,state){
  const item=btn.closest('.song-item')
  if(!item)return
  const cls=state==='loading'?'fas fa-circle-notch fa-spin':state==='play'?'fas fa-pause':'fas fa-play'
  item.querySelectorAll('.fa-play, .fa-pause, .fa-circle-notch').forEach(ic=>{ic.className=cls})
  const hdrBtn=item.querySelector('.song-header .song-actions button')
  if(hdrBtn)hdrBtn.innerHTML='<i class="'+cls+'"></i>'
}

function seekAudio(el){
  if(currentAudio&&currentAudio.duration){
    const t=(el.value/100)*currentAudio.duration
    currentAudio.currentTime=t
  }
}

function setVolume(el){
  if(currentAudio)currentAudio.volume=parseFloat(el.value)
}

function formatTime(s){
  if(!s||!isFinite(s))return '0:00'
  const m=Math.floor(s/60),sec=Math.floor(s%60)
  return m+':'+(sec<10?'0':'')+sec
}
