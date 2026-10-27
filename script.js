(()=>{'use strict';
const chapters=[
{icon:'✦',label:'ABOUT ME',title:'Curious by nature.',text:"I'm someone who likes to explore new ideas, learn new skills, and create things that people can interact with. I may still be learning, but I keep moving forward.",short:'A curious mind, always learning.',idTitle:'Selalu ingin tahu.',idText:'Aku suka menjelajahi ide baru, mempelajari keterampilan, dan membuat sesuatu yang bisa digunakan orang lain. Aku mungkin masih belajar, tetapi aku terus melangkah.'},
{icon:'⌘',label:'MY JOURNEY',title:'Learning by building.',text:'I learn best by trying things for myself. From experimenting with websites to solving coding problems, every challenge gives me a chance to understand a little more.',short:'I learn by making real projects.',idTitle:'Belajar dengan berkarya.',idText:'Aku paling mudah belajar saat mencoba sendiri. Dari bereksperimen membuat website sampai memecahkan masalah coding, setiap tantangan membantuku memahami lebih banyak.'},
{icon:'◈',label:'MY CREATIVE SIDE',title:'Ideas into experiences.',text:'I enjoy imagining digital experiences that feel modern, interactive, and different. I like details, movement, and the feeling of turning an idea into something real.',short:'I turn ideas into interactive projects.',idTitle:'Mengubah ide menjadi pengalaman.',idText:'Aku suka membayangkan pengalaman digital yang modern, interaktif, dan berbeda. Aku menyukai detail, animasi, dan proses mengubah ide menjadi sesuatu yang nyata.'},
{icon:'↗',label:'MY MINDSET',title:'Progress over perfection.',text:'Not everything works on the first try. When something goes wrong, I want to understand why, improve it, and try again. Small steps can become something meaningful.',short:'I keep improving, one step at a time.',idTitle:'Proses lebih penting daripada kesempurnaan.',idText:'Tidak semua hal berhasil pada percobaan pertama. Saat ada yang salah, aku ingin memahami penyebabnya, memperbaikinya, lalu mencoba lagi. Langkah kecil bisa menjadi sesuatu yang berarti.'},
{icon:'◎',label:'MY NEXT CHAPTER',title:'There is more to create.',text:"I'm still discovering what I can do. My goal is to keep learning, build better projects, and create things that make people stop, explore, and remember the experience.",short:"I'm building toward what comes next.",idTitle:'Masih banyak yang bisa diciptakan.',idText:'Aku masih menemukan hal-hal yang bisa kulakukan. Tujuanku adalah terus belajar, membangun proyek yang lebih baik, dan membuat sesuatu yang membuat orang tertarik untuk menjelajah dan mengingat pengalamannya.'}
];
const field=document.getElementById('bookField'),dots=document.getElementById('dots'),story=document.getElementById('story');let active=0,startX=0,startY=0,dragging=false,moved=false;const cards=[];
chapters.forEach((c,i)=>{const b=document.createElement('button');b.className='book';b.type='button';b.setAttribute('aria-label','Open '+c.label);b.innerHTML='<span class="number">0'+(i+1)+' / CHAPTER</span><span class="symbol">'+c.icon+'</span><strong>'+c.label+'</strong><small>'+c.short+'</small><span class="shine"></span>';b.addEventListener('click',()=>{if(!moved)select(i,true)});field.appendChild(b);cards.push(b);const d=document.createElement('button');d.className='dotbtn';d.type='button';d.setAttribute('aria-label','Go to '+c.label);d.addEventListener('click',()=>select(i,true));dots.appendChild(d)});
function render(){const total=cards.length;cards.forEach((b,i)=>{let delta=((i-active+total+total/2)%total)-Math.floor(total/2);if(total%2===0&&delta===total/2)delta=-total/2;const abs=Math.abs(delta),x=delta*108,z=-abs*76,y=abs*9,ry=delta*-19;b.style.transform='translate3d('+x+'px,'+y+'px,'+z+'px) rotateY('+ry+'deg) rotateZ('+(delta*1.5)+'deg) scale('+(1-abs*.12)+')';b.style.zIndex=20-abs;b.style.opacity=abs>2?'0':String(1-abs*.17);b.style.pointerEvents=abs>2?'none':'auto';b.classList.toggle('active',i===active);b.setAttribute('aria-pressed',String(i===active))});[...dots.children].forEach((d,i)=>d.setAttribute('aria-current',String(i===active)))}
function select(i,scroll){active=(i+chapters.length)%chapters.length;render();const c=chapters[active];story.classList.add('changing');setTimeout(()=>{document.getElementById('storyKicker').textContent='CHAPTER 0'+(active+1)+' / '+c.label;document.getElementById('storyTitle').textContent=typeof storyLanguage!=='undefined'&&storyLanguage==='id'?c.idTitle:c.title;document.getElementById('storyText').textContent=typeof storyLanguage!=='undefined'&&storyLanguage==='id'?c.idText:c.text;story.classList.remove('changing')},180);if(scroll&&window.innerWidth<700)document.getElementById('about').scrollIntoView({behavior:'smooth',block:'center'})}
document.getElementById('prev').addEventListener('click',()=>select(active-1,false));document.getElementById('next').addEventListener('click',()=>select(active+1,false));document.getElementById('openAbout').addEventListener('click',()=>{select(0,false);document.getElementById('about').scrollIntoView({behavior:'smooth',block:'center'})});
field.addEventListener('pointerdown',e=>{dragging=true;moved=false;startX=e.clientX;startY=e.clientY;field.classList.add('dragging');field.setPointerCapture(e.pointerId)});field.addEventListener('pointermove',e=>{if(!dragging)return;const dx=e.clientX-startX;if(Math.abs(dx)>12||Math.abs(e.clientY-startY)>12)moved=true;if(Math.abs(dx)>38){select(active+(dx<0?1:-1),false);startX=e.clientX}});function stopDrag(){dragging=false;field.classList.remove('dragging');setTimeout(()=>moved=false,80)}field.addEventListener('pointerup',stopDrag);field.addEventListener('pointercancel',stopDrag);field.addEventListener('lostpointercapture',stopDrag);
let auto=true,autoTimer;function resetAuto(){clearInterval(autoTimer);autoTimer=setInterval(()=>{if(auto&&!document.hidden)select(active+1,false)},6500)}field.addEventListener('pointerdown',()=>{auto=false;clearInterval(autoTimer)});document.getElementById('next').addEventListener('click',()=>{auto=false;clearInterval(autoTimer)});document.getElementById('prev').addEventListener('click',()=>{auto=false;clearInterval(autoTimer)});
let storyLanguage='id';
function paintStoryLanguage(){
 const c=chapters[active],idLabels=['TENTANG AKU','PERJALANANKU','SISI KREATIFKU','CARA PANDANGKU','BAB BERIKUTNYA'];
 document.getElementById('storyKicker').textContent=storyLanguage==='id'?'BAB 0'+(active+1)+' / '+idLabels[active]:'CHAPTER 0'+(active+1)+' / '+c.label;
 document.getElementById('storyTitle').textContent=storyLanguage==='id'?c.idTitle:c.title;
 document.getElementById('storyText').textContent=storyLanguage==='id'?c.idText:c.text;
 const toggle=document.getElementById('toggleStoryLanguage');
 toggle.textContent=storyLanguage==='id'?'Tampilkan English':'Tampilkan Bahasa Indonesia';
 toggle.setAttribute('aria-pressed',String(storyLanguage==='en'));
}
document.getElementById('toggleStoryLanguage').addEventListener('click',()=>{storyLanguage=storyLanguage==='id'?'en':'id';paintStoryLanguage()});
document.getElementById('speak').addEventListener('click',()=>{
 const c=chapters[active],status=document.getElementById('status');
 if(!('speechSynthesis'in window)){status.textContent='Browser ini belum mendukung suara otomatis.';return}
 window.speechSynthesis.cancel();const voices=window.speechSynthesis.getVoices();
 function chooseVoice(lang){return voices.find(v=>v.lang&&v.lang.toLowerCase()===lang.toLowerCase())||voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith(lang.slice(0,2).toLowerCase()))||null}
 const id=new SpeechSynthesisUtterance((c.idTitle||c.title)+'. '+(c.idText||c.text));id.lang='id-ID';id.rate=.91;id.pitch=1.02;const iv=chooseVoice('id-ID');if(iv)id.voice=iv;
 const en=new SpeechSynthesisUtterance(c.title+'. '+c.text);en.lang='en-US';en.rate=.88;en.pitch=1;const ev=chooseVoice('en-US');if(ev)en.voice=ev;
 status.textContent='Memutar bahasa Indonesia…';id.onend=()=>status.textContent='Berikutnya bahasa Inggris…';en.onend=()=>status.textContent='Selesai · Sudah diputar dalam dua bahasa';id.onerror=()=>status.textContent='Suara Indonesia mungkin belum tersedia di perangkat ini.';
 window.speechSynthesis.speak(id);window.speechSynthesis.speak(en);
});paintStoryLanguage();render();resetAuto();
const intro=document.getElementById('introScreen'),stage=document.getElementById('stage'),skipIntro=document.getElementById('skipIntro'),cinemaPercent=document.getElementById('cinemaPercent');
let introFinished=false,percentValue=0;
const percentTimer=window.setInterval(()=>{percentValue=Math.min(100,percentValue+4);if(cinemaPercent)cinemaPercent.textContent=String(percentValue).padStart(2,'0')+'%';if(percentValue>=100)window.clearInterval(percentTimer)},145);
function finishIntro(){if(introFinished)return;introFinished=true;window.clearInterval(percentTimer);if(cinemaPercent)cinemaPercent.textContent='100%';intro.classList.add('done');document.body.classList.remove('is-entering');stage.classList.add('entered');window.setTimeout(()=>intro.remove(),1200);}
if(skipIntro)skipIntro.addEventListener('click',finishIntro);
window.setTimeout(finishIntro,3900);

})();


/* Gallery lightbox, scroll progress, and efficient reveal-on-scroll */
const photoCards=[...document.querySelectorAll('.photo-card')];
const photoSources=photoCards.map(card=>card.dataset.photo);
const lightbox=document.getElementById('photoLightbox');
const lightboxImage=document.getElementById('lightboxImage');
const lightboxCount=document.getElementById('lightboxCount');
let photoIndex=0,previousFocus=null;
function showPhoto(index){photoIndex=(index+photoSources.length)%photoSources.length;const src=photoSources[photoIndex];lightboxImage.src=src;lightboxImage.alt='Expanded gallery photo '+(photoIndex+1);lightboxCount.textContent=String(photoIndex+1).padStart(2,'0')+' / '+String(photoSources.length).padStart(2,'0');}
function openPhoto(index){previousFocus=document.activeElement;showPhoto(index);lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('lightbox-open');document.getElementById('closeLightbox').focus();}
function closePhoto(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.classList.remove('lightbox-open');lightboxImage.removeAttribute('src');if(previousFocus&&previousFocus.focus)previousFocus.focus();}
photoCards.forEach((card,index)=>card.addEventListener('click',()=>openPhoto(index)));
document.getElementById('closeLightbox').addEventListener('click',closePhoto);
document.getElementById('photoPrev').addEventListener('click',()=>showPhoto(photoIndex-1));
document.getElementById('photoNext').addEventListener('click',()=>showPhoto(photoIndex+1));
lightbox.addEventListener('click',event=>{if(event.target===lightbox)closePhoto();});
document.addEventListener('keydown',event=>{if(!lightbox.classList.contains('open'))return;if(event.key==='Escape')closePhoto();if(event.key==='ArrowLeft')showPhoto(photoIndex-1);if(event.key==='ArrowRight')showPhoto(photoIndex+1);});
const progress=document.getElementById('scrollProgress');
let scrollQueued=false;
function updateScrollProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?Math.min(100,window.scrollY/max*100):0)+'%';scrollQueued=false;}
window.addEventListener('scroll',()=>{if(!scrollQueued){window.requestAnimationFrame(updateScrollProgress);scrollQueued=true;}},{passive:true});
updateScrollProgress();
if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -24px 0px'});
 document.querySelectorAll('.gallery-heading.reveal,.photo-card.reveal,.quote-heading.reveal,.quote-card.reveal').forEach(el=>{el.classList.add('reveal-ready');revealObserver.observe(el);});
}



/* Pengendali tunggal untuk tab Ismayanti, animasi, foto, dan suara */
(()=>{
 const modal=document.getElementById('loveModal'),openButton=document.getElementById('openLove'),closeButton=document.getElementById('closeLove'),particleLayer=document.getElementById('loveParticles'),voiceButton=document.getElementById('loveVoice'),voiceStatus=document.getElementById('loveVoiceStatus');
 if(!modal||!openButton||!closeButton)return;
 let particleTimer=null,previousFocus=null;
 const messageID='Sejak kamu hadir, hari-hariku terasa lebih indah. Kehadiranmu mungkin sederhana, tapi kamu punya cara sendiri untuk membuatku bahagia. Terima kasih sudah menjadi bagian dari ceritaku. Semoga kamu selalu tahu kalau kamu begitu berarti.';
 const messageEN='Since you came into my life, my days have felt brighter. You have your own way of making me happy. Thank you for being part of my story, and I hope you always know how much you mean.';
 function makeHeart(){if(!particleLayer||!modal.classList.contains('open'))return;const heart=document.createElement('span');heart.className='love-particle';heart.textContent=Math.random()>.22?'♥':'♡';heart.style.left=(5+Math.random()*90)+'%';heart.style.setProperty('--size',(12+Math.random()*20)+'px');heart.style.setProperty('--time',(2.4+Math.random()*1.6)+'s');heart.style.setProperty('--heart-color',Math.random()>.45?'#ff86ce':'#c0a7ff');particleLayer.appendChild(heart);window.setTimeout(()=>heart.remove(),4300)}
 const cinema=document.getElementById('loveCinema'),skipCinema=document.getElementById('skipLoveCinema'),loveExplosionAudio=document.getElementById('loveExplosionAudio'),loveCardAudio=document.getElementById('loveCardAudio'),cinemaProgress=document.querySelector('.love-cinema-progress span');let cinemaTimer=null,explosionTimer=null;
 function playAudio(audio){if(!audio)return;audio.muted=false;audio.defaultMuted=false;audio.volume=1;audio.preload='auto';if(audio.readyState===0)audio.load();const attempt=audio.play();if(attempt&&attempt.catch)attempt.catch(()=>{if(audio===loveCardAudio){/* Keep retry in the original click flow and expose a useful error instead of silently failing. */audio.muted=false;audio.volume=1;audio.currentTime=0;const retry=audio.play();if(retry&&retry.catch)retry.catch(()=>{if(voiceStatus)voiceStatus.textContent='Audio pertama gagal diputar: periksa file MP3 dan tekan Ismayanti lagi.'})}else if(voiceStatus)voiceStatus.textContent='Browser memblokir audio ledakan. Coba tekan Ismayanti sekali lagi.'})}
 function stopAudio(audio){if(audio){audio.pause();audio.currentTime=0}}
 function clearCinemaTimers(){if(cinemaTimer){window.clearTimeout(cinemaTimer);cinemaTimer=null}if(explosionTimer){window.clearTimeout(explosionTimer);explosionTimer=null}}
 function finishCinema(){clearCinemaTimers();const wasRunning=modal.classList.contains('cinema-running');if(wasRunning){modal.classList.remove('cinema-running','cinema-bursting');modal.classList.add('card-assembling');if(cinema)cinema.setAttribute('aria-hidden','true');stopAudio(loveExplosionAudio);cinemaTimer=window.setTimeout(()=>{modal.classList.remove('card-assembling');cinemaTimer=null},1150)}else{modal.classList.remove('cinema-running','cinema-bursting');if(cinema)cinema.setAttribute('aria-hidden','true');stopAudio(loveExplosionAudio)}}
 function openLove(){clearCinemaTimers();modal.classList.remove('card-assembling','cinema-bursting');stopAudio(loveExplosionAudio);stopAudio(loveCardAudio);previousFocus=document.activeElement;modal.classList.add('open','cinema-running');modal.setAttribute('aria-hidden','false');if(cinema)cinema.setAttribute('aria-hidden','false');document.body.classList.add('love-open');openButton.classList.add('selected');openButton.setAttribute('aria-pressed','true');if(cinemaProgress){cinemaProgress.style.animation='none';void cinemaProgress.offsetWidth;cinemaProgress.style.animation='loveCinemaLoad 10s linear both'}closeButton.focus();for(let i=0;i<12;i++)window.setTimeout(makeHeart,i*80);if(!particleTimer)particleTimer=window.setInterval(makeHeart,420);
 /* Start the existing song from the user's click so mobile browsers have a user gesture. */
 playAudio(loveCardAudio);
 /* At 100% the charged heart detonates; only after the flash do we reveal the assembling ID card. */
 cinemaTimer=window.setTimeout(()=>{if(!modal.classList.contains('cinema-running'))return;modal.classList.add('cinema-bursting');if(loveExplosionAudio){loveExplosionAudio.currentTime=0;playAudio(loveExplosionAudio)}cinemaTimer=window.setTimeout(()=>{if(!modal.classList.contains('cinema-running'))return;finishCinema()},1050)},10000)}
 function closeLove(){finishCinema();clearCinemaTimers();stopAudio(loveExplosionAudio);stopAudio(loveCardAudio);modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('love-open');openButton.classList.remove('selected');openButton.setAttribute('aria-pressed','false');if(particleTimer){window.clearInterval(particleTimer);particleTimer=null}if(particleLayer)particleLayer.replaceChildren();if(window.speechSynthesis)window.speechSynthesis.cancel();if(voiceStatus)voiceStatus.textContent='Pesan dibacakan dalam bahasa Indonesia, lalu Inggris.';if(previousFocus&&previousFocus.focus)previousFocus.focus();else openButton.focus()}

 if(skipCinema)skipCinema.addEventListener('click',()=>{finishCinema();stopAudio(loveExplosionAudio)});
 openButton.setAttribute('aria-pressed','false');openButton.addEventListener('click',openLove);closeButton.addEventListener('click',closeLove);
 modal.querySelectorAll('[data-close-love="true"]').forEach(el=>el.addEventListener('click',closeLove));
 modal.querySelectorAll('[data-love-photo]').forEach(button=>button.addEventListener('click',()=>{const src=button.getAttribute('data-love-photo');closeLove();const index=photoSources.indexOf(src);if(index>=0){openPhoto(index);return}lightboxImage.src=src;lightboxImage.alt='Foto kenangan khusus';lightboxCount.textContent='♡';previousFocus=button;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('lightbox-open');document.getElementById('closeLightbox').focus()}));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modal.classList.contains('open'))closeLove()});
 if(voiceButton)voiceButton.addEventListener('click',()=>{if(!('speechSynthesis'in window)){voiceStatus.textContent='Browser ini belum mendukung suara otomatis.';return}window.speechSynthesis.cancel();const voices=window.speechSynthesis.getVoices(),iv=voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith('id'))||null,ev=voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith('en'))||null;const id=new SpeechSynthesisUtterance(messageID);id.lang='id-ID';id.rate=.9;id.pitch=1.04;if(iv)id.voice=iv;const en=new SpeechSynthesisUtterance(messageEN);en.lang='en-US';en.rate=.9;if(ev)en.voice=ev;voiceStatus.textContent='Sedang membacakan pesan dalam bahasa Indonesia…';id.onend=()=>voiceStatus.textContent='Sekarang versi bahasa Inggris…';en.onend=()=>voiceStatus.textContent='Selesai · Pesan sudah dibacakan dalam dua bahasa.';id.onerror=()=>voiceStatus.textContent='Suara Indonesia tidak tersedia. Periksa pengaturan Text-to-Speech HP.';window.speechSynthesis.speak(id);window.speechSynthesis.speak(en)});
})();
