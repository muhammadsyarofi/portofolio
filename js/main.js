(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
$("#yr").textContent=new Date().getFullYear();

// Navbar
const nav=$("#nav"),menu=$("#menu"),burger=$(".burger");
addEventListener("scroll",()=>{nav.classList.toggle("scrolled",scrollY>30);
  const y=scrollY+120;$$("nav a").forEach(a=>{const s=$(a.getAttribute("href"));a.classList.toggle("on",s&&s.offsetTop<=y&&s.offsetTop+s.offsetHeight>y)});
  document.documentElement.style.setProperty("--py",scrollY*.05+"px");const v=$(".hero-visual");if(v&&scrollY<900)v.style.translate="0 "+(scrollY*-.06)+"px"},{passive:true});
burger.onclick=()=>{const o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",o)};
$$("nav a").forEach(a=>a.onclick=()=>{menu.classList.remove("open");burger.setAttribute("aria-expanded",false)});

// Projects
const grid=$("#projectGrid");
PROJECTS.forEach((p,i)=>{
  const el=document.createElement("article");el.className="card project glow-b reveal";
  const thumb=p.thumbnail?`<img src="${esc(p.thumbnail)}" alt="Preview ${esc(p.name)}" loading="lazy">`:`<div class="mock" aria-hidden="true"><i></i><i></i><i></i><i></i></div>`;
  const live=p.live?`<a class="btn primary" href="${esc(p.live)}" target="_blank" rel="noopener noreferrer">Live Preview</a>`:`<a class="btn primary" aria-disabled="true" tabindex="-1">Live Preview</a>`;
  el.innerHTML=`<div class="thumb">${thumb}</div><div class="pbody"><h3>${esc(p.name)}</h3><p style="color:var(--mut)">${esc(p.description)}</p><div class="chips">${p.tech.map(t=>`<span class="chip">${esc(t)}</span>`).join("")}</div><div class="pbtn">${live}<button class="btn ghost" data-i="${i}">View Details</button></div>${p.live?"":'<span class="hint">Tautan live belum diatur di js/data.js</span>'}</div>`;
  grid.appendChild(el)});
const modal=$("#modal");
grid.addEventListener("click",e=>{const b=e.target.closest("[data-i]");if(!b)return;const p=PROJECTS[b.dataset.i];
  $("#mTitle").textContent=p.name;$("#mDesc").textContent=p.description;$("#mTech").innerHTML=p.tech.map(t=>`<span class="chip">${esc(t)}</span>`).join("");modal.hidden=false;$(".close").focus()});
modal.onclick=e=>{if(e.target===modal||e.target.closest(".close"))modal.hidden=true};
addEventListener("keydown",e=>{if(e.key==="Escape")modal.hidden=true});

// Email (muncul hanya jika diisi)
if(SITE.email){const c=$("#emailCard");c.hidden=false;c.href="mailto:"+SITE.email;$("#emailText").textContent=SITE.email}

// Reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
$$(".reveal").forEach(el=>io.observe(el));

// Cursor
const cur=$(".cursor");
addEventListener("pointermove",e=>{if(e.pointerType!=="mouse")return;cur.style.opacity=1;cur.style.transform=`translate(${e.clientX-13}px,${e.clientY-13}px)`;cur.classList.toggle("big",!!e.target.closest("a,button,.card"))});

// Network particles
const cv=$("#net"),cx=cv.getContext("2d");let W,H,pts=[];
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
function size(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0);
  pts=Array.from({length:Math.min(70,Math.floor(W*H/18000))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3}))}
function draw(){cx.clearRect(0,0,W,H);
  for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;cx.fillStyle="rgba(0,229,255,.7)";cx.beginPath();cx.arc(p.x,p.y,1.5,0,7);cx.fill()}
  for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<140){cx.strokeStyle=`rgba(59,130,246,${.28*(1-d/140)})`;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}}
  if(!reduce&&!document.hidden)requestAnimationFrame(draw)}
size();draw();addEventListener("resize",size);
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&!reduce)draw()});
})();
