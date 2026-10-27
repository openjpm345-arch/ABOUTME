(()=>{'use strict';
const chapters=[
{icon:'✦',label:'ABOUT ME',title:'Curious by nature.',text:"I'm someone who likes to explore new ideas, learn new skills, and create things that people can interact with. I may still be learning, but I keep moving forward.",short:'A curious mind, always learning.'},
{icon:'⌘',label:'MY JOURNEY',title:'Learning by building.',text:'I learn best by trying things for myself. From experimenting with websites to solving coding problems, every challenge gives me a chance to understand a little more.',short:'I learn by making real projects.'},
{icon:'◈',label:'MY CREATIVE SIDE',title:'Ideas into experiences.',text:'I enjoy imagining digital experiences that feel modern, interactive, and different. I like details, movement, and the feeling of turning an idea into something real.',short:'I turn ideas into interactive projects.'},
{icon:'↗',label:'MY MINDSET',title:'Progress over perfection.',text:'Not everything works on the first try. When something goes wrong, I want to understand why, improve it, and try again. Small steps can become something meaningful.',short:'I keep improving, one step at a time.'},
{icon:'◎',label:'MY NEXT CHAPTER',title:'There is more to create.',text:"I'm still discovering what I can do. My goal is to keep learning, build better projects, and create things that make people stop, explore, and remember the experience.",short:"I'm building toward what comes next."}
];
const field=document.getElementById('bookField'),dots=document.getElementById('dots'),story=document.getElementById('story');let active=0,startX=0,startY=0,dragging=false,moved=false;const cards=[];
chapters.forEach((c,i)=>{const b=document.createElement('button');b.className='book';b.type='button';b.setAttribute('aria-label','Open '+c.label);b.innerHTML='<span class="number">0'+(i+1)+' / CHAPTER</span><span class="symbol">'+c.icon+'</span><strong>'+c.label+'</strong><small>'+c.short+'</small><span class="shine"></span>';b.addEventListener('click',()=>{if(!moved)select(i,true)});field.appendChild(b);cards.push(b);const d=document.createElement('button');d.className='dotbtn';d.type='button';d.setAttribute('aria-label','Go to '+c.label);d.addEventListener('click',()=>select(i,true));dots.appendChild(d)});
function render(){const total=cards.length;cards.forEach((b,i)=>{let delta=((i-active+total+total/2)%total)-Math.floor(total/2);if(total%2===0&&delta===total/2)delta=-total/2;const abs=Math.abs(delta),x=delta*108,z=-abs*76,y=abs*9,ry=delta*-19;b.style.transform='translate3d('+x+'px,'+y+'px,'+z+'px) rotateY('+ry+'deg) rotateZ('+(delta*1.5)+'deg) scale('+(1-abs*.12)+')';b.style.zIndex=20-abs;b.style.opacity=abs>2?'0':String(1-abs*.17);b.style.pointerEvents=abs>2?'none':'auto';b.classList.toggle('active',i===active);b.setAttribute('aria-pressed',String(i===active))});[...dots.children].forEach((d,i)=>d.setAttribute('aria-current',String(i===active)))}
function select(i,scroll){active=(i+chapters.length)%chapters.length;render();const c=chapters[active];story.classList.add('changing');setTimeout(()=>{document.getElementById('storyKicker').textContent='CHAPTER 0'+(active+1)+' / '+c.label;document.getElementById('storyTitle').textContent=c.title;document.getElementById('storyText').textContent=c.text;story.classList.remove('changing')},180);if(scroll&&window.innerWidth<700)document.getElementById('about').scrollIntoView({behavior:'smooth',block:'center'})}
document.getElementById('prev').addEventListener('click',()=>select(active-1,false));document.getElementById('next').addEventListener('click',()=>select(active+1,false));document.getElementById('openAbout').addEventListener('click',()=>{select(0,false);document.getElementById('about').scrollIntoView({behavior:'smooth',block:'center'})});
field.addEventListener('pointerdown',e=>{dragging=true;moved=false;startX=e.clientX;startY=e.clientY;field.classList.add('dragging');field.setPointerCapture(e.pointerId)});field.addEventListener('pointermove',e=>{if(!dragging)return;const dx=e.clientX-startX;if(Math.abs(dx)>12||Math.abs(e.clientY-startY)>12)moved=true;if(Math.abs(dx)>38){select(active+(dx<0?1:-1),false);startX=e.clientX}});function stopDrag(){dragging=false;field.classList.remove('dragging');setTimeout(()=>moved=false,80)}field.addEventListener('pointerup',stopDrag);field.addEventListener('pointercancel',stopDrag);field.addEventListener('lostpointercapture',stopDrag);
let auto=true,autoTimer;function resetAuto(){clearInterval(autoTimer);autoTimer=setInterval(()=>{if(auto&&!document.hidden)select(active+1,false)},6500)}field.addEventListener('pointerdown',()=>{auto=false;clearInterval(autoTimer)});document.getElementById('next').addEventListener('click',()=>{auto=false;clearInterval(autoTimer)});document.getElementById('prev').addEventListener('click',()=>{auto=false;clearInterval(autoTimer)});
document.getElementById('speak').addEventListener('click',()=>{const c=chapters[active],status=document.getElementById('status');if(!('speechSynthesis'in window)){status.textContent='Speech is not supported in this browser.';return}window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(c.label+'. '+c.title+' '+c.text);u.lang='en-US';u.rate=.88;u.pitch=1.02;const voices=window.speechSynthesis.getVoices();const v=voices.find(x=>x.lang==='en-US')||voices.find(x=>x.lang&&x.lang.startsWith('en'));if(v)u.voice=v;u.onstart=()=>status.textContent='Speaking in English…';u.onend=()=>status.textContent='English voice · ready to replay';u.onerror=()=>status.textContent='Voice unavailable · check device speech settings';window.speechSynthesis.speak(u)});render();resetAuto();
const intro=document.getElementById('introScreen'),stage=document.getElementById('stage');
window.setTimeout(()=>{intro.classList.add('done');document.body.classList.remove('is-entering');stage.classList.add('entered');window.setTimeout(()=>intro.remove(),900)},1450);

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
 document.querySelectorAll('.gallery-heading.reveal,.photo-card.reveal').forEach(el=>{el.classList.add('reveal-ready');revealObserver.observe(el);});
}
