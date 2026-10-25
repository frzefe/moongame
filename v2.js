'use strict';
window.onerror=(m)=>{const e=document.getElementById('err');e.style.display='block';e.textContent='Fehler: '+m+' — bitte Seite neu laden.'};
const W=480,H=270,G=380,OY=-165,PX=2,DT=1/60,$=id=>document.getElementById(id);
const cv=$('cv'),c=cv.getContext('2d'),ui=$('ui'),gw=$('gw'),pz=$('pz');cv.width=W*PX;cv.height=H*PX;
const CFG={g:950,run:105,acc:900,fr:1100,jump:350,fall:520,coy:.1,buf:.12,atkT:.22,atkCd:.35};
const hs=n=>((n*2654435761)>>>0)%1000/1000;
// ---- SEVİYELER ----
const LV=[
{n:'KAPITEL 1 — SUPERMARKT',ob:'Finde den Ausgang',w:2720,th:0,sp:40,msg:'Feierabend.',
 s:[[0,G,2720,100],[330,G-30,30,30,'c'],[420,G-30,30,30,'c'],[640,G-40,70,40,'r'],[930,G-30,30,30,'c'],[1180,G-40,70,40,'r'],[1260,G-30,30,30,'c'],[1480,G-40,70,40,'r'],[1760,G-28,28,28,'x'],[2020,G-30,30,30,'c'],[2050,G-30,30,30,'c'],[2035,G-60,30,30,'c'],[2105,G-130,14,130,'g'],[2610,G-130,14,130,'g']],
 it:[{t:'door',x:2650,y:G-60,w:34,h:60,lk:1}],cp:[620,1320,2000],ar:[2119,2610,2160,2135,2552,2420],
 en:[['cust',250,200,330],['cust',520,460,620],['cust',780,725,880],['cust',1060,1000,1160],['cust',1360,1300,1460],['cust',1700,1600,1740],['boss',2560,2119,2610]],
 tips:[[0,150,'Bewege dich mit den Pfeilen'],[150,330,'Springen und Schlagen'],[1700,1800,'Kiste zerschlagen: SCHLAG'],[1940,2140,'Achtung!']]},
{n:'KAPITEL 2 — NACHTSTRASSE',ob:'Geh nach Hause',w:5400,th:1,sp:40,
 s:[[0,G,1100,100],[1160,G,1040,100],[2200,G,200,100],[2460,G,140,100],[2670,G,100,100],[3170,G,200,100],[3560,G,160,100],[3800,G,1600,100],
  [420,G-26,56,26,'car',0],[640,G-30,12,30,'b'],[1480,G-26,56,26,'car',2],[2300,G-30,12,30,'b'],[3600,G-26,56,26,'car',1],[3950,G-26,56,26,'car',1],[4040,G-30,12,30,'b'],[4130,G-30,30,30,'c'],
  [2790,G-44,60,10],[2870,G-88,60,10],[2950,G-88,120,10],[3090,G-44,60,10],[3745,G-40,30,10],[4380,G-52,50,10],[4440,G-92,60,10],[4510,G-52,50,10],[3390,G,56,14,'m',100],[150,G-58,112,8],[290,G-98,70,8],[390,G-58,100,8],[560,G-58,112,8],[690,G-90,50,8],[760,G-58,112,8],[900,G-58,112,8],[4850,G-130,14,130,'g'],[5250,G-130,14,130,'g']],
 it:[{t:'door',x:5300,y:G-60,w:34,h:60,lk:1}],cp:[780,1400,2180,3180,3820,4350,4780],ar:[4864,5250,4900,4817,5160,5000],pk:[],
 hz:[[3250,G-34,24,34,44,1.7],[1700,G-26,34,26,110,1.1,'bike'],[1990,G-26,34,26,80,1.3,'bike']],fp:[[1330,1250],[1590,1500],[1860,1790]],
 en:[['thug',880,830,950],['gun',4250,3960,4280],['rush',4470,4400,4560],['def',4680,4600,4760],['bagger',5160,4864,5250]],
 st:[[200,300],[325,262],[430,300],[615,300],[715,268],[830,300],[950,300],[1450,330],[2900,272],[3210,300],[4470,268]],
 d:[['shop',10,'KIOSK','#c0782a'],['shop',150,'BÄCKEREI','#a0522d'],['tree',300],['bench',360],['shop',560,'APOTHEKE','#2a9d6a'],['sign',690,'HAUPTSTR.'],['shop',760,'DÖNER','#c04a2a'],['shop',900,'BLUMEN','#b04a7a'],['door2',1030],['cone',1086],['bin',1120],['tree',1240],['sign',1280,'WOHNVIERTEL'],['bench',1330],['tree',1560],['bin',1620],['door2',1800],['tree',1900],['bench',2000],['fence',2210,180],['sign',2230,'BAUSTELLE'],['cone',2388],['fence',2470,120],['cone',2588],['cone',2650],['scaf',2790,60,44],['scaf',2870,60,88],['scaf',2950,120,88],['scaf',3090,60,44],['fence',3180,180],['cone',3358],['cone',3708],['cone',3788],['shop',3850,'KIOSK','#7a2a4a'],['bin',3900],['shop',4090,'BAR','#7a2a4a'],['bike',4290],['bin',4600],['sign',4780,'BAHNHOF'],['apt',5200]],
 tips:[[0,200,'Finde einen Weg nach Hause!'],[200,330,'Spring auf die Markisen!'],[330,420,'Springen!'],[1080,1180,'Springe über die Lücke!'],[1200,1245,'Wohnviertel'],[1245,1330,'Achtung, Blumentöpfe!'],[1500,1590,'Vorsicht, Radfahrer!'],[2210,2300,'Baustelle: Spring!'],[2640,2790,'Plattformen: Spring hoch!'],[3240,3330,'Warte auf den richtigen Moment!'],[3380,3480,'Steig auf die Plattform!'],[3820,3900,'Gefährliche Gegend!'],[4050,4250,'Weiche aus!'],[4350,4440,'Ein Weg nach oben!'],[4800,4890,'Achtung!']]},
{n:'KAPITEL 3 — TREPPENHAUS',ob:'Geh in die Wohnung',w:560,th:4,sp:30,s:[[0,G,560,100]],it:[{t:'door',x:480,y:G-60,w:34,h:60}],tips:[[0,300,'Die Tür zur Wohnung ist am Ende']]},
{n:'KAPITEL 3 — WOHNUNG',ob:'Besiege Abi',w:760,th:2,sp:24,s:[[0,G,760,100]],it:[{t:'door',x:676,y:G-60,w:34,h:60,lk:1},{t:'cupboard',x:384,y:G-40,w:30,h:40},{t:'sink',x:420,y:G-40,w:30,h:40}],en:[['abi',330,70,640]],tips:[[0,420,'Abi blockiert den Weg!']]},
{n:'KAPITEL 3 — AYS ZIMMER',ob:'Streichle Luka',w:700,th:3,sp:130,s:[[0,G,700,100]],it:[{t:'bed',x:8,y:G-34,w:84,h:34},{t:'light',x:100,y:G-30,w:10,h:30},{t:'window',x:120,y:G-40,w:44,h:40},{t:'pc',x:206,y:G-34,w:36,h:34},{t:'fbowl',x:300,y:G-16,w:16,h:16},{t:'wbowl',x:340,y:G-16,w:16,h:16},{t:'book',x:400,y:G-40,w:60,h:40},{t:'ball'},{t:'cat'},{t:'pizza',x:576,y:G-40,w:60,h:40}],tips:[[0,700,'Luka braucht Futter und Wasser']]}];
// ---- DURUM ----
let S='MENU',L,p,cam=0,T=0,spawn,TR,RS=0,JB=0,UQ=0,AQ=0,acc=0,last=0,P=[],paused=0;
let HS=0,SH=0,SY=null,HAS=null,AB=0,RES=null;const K={l:0,r:0,j:0,u:0,a:0},A={on:true,ctx:null,vol:1};
function newP(x){return{x,y:G-22,w:12,h:22,vx:0,vy:0,f:1,on:null,coy:0,atk:0,cd:0,use:0,land:0,air:0,near:null,cel:0,hp:3,inv:0,aid:0}}
function loadLevel(i){const d=LV[i];
 L={i,d,w:d.w,th:d.th,t:0,s:d.s.map(a=>({x:a[0],y:a[1],w:a[2],h:a[3],t:a[4]||'f',x0:a[0],rg:a[5]||0,dx:0,dead:0})),
 it:d.it.map(o=>({...o,on:0})),cp:(d.cp||[]).map(x=>({x,got:0})),st:(d.st||[]).map(a=>({x:a[0],y:a[1],got:0})),
 cat:i==4?{x:256,y:G-10,f:-1,pet:0,done:0,st:0,m:0,cd:0}:null,en:(d.en||[]).map(mkEn),abiDown:0,ar:d.ar,unl:0,wv:[],pk:(d.pk||[]).map(x=>({x,got:0})),fight:0,bossDown:0,bl:[],hz:(d.hz||[]).map(a=>({x0:a[0],x:a[0],y:a[1],w:a[2],h:a[3],rg:a[4],sp:a[5],k:a[6]})),fp:(d.fp||[]).map(a=>({x:a[0],tr:a[1],done:0})),lt:0,fb:0,wb:0,ball:i==4?{x:500,vx:0,mv:0,t:0}:null,msg:{t:2.5,s:d.msg||''},ttl:2.2,fin:0,n:0};
 for(const s of L.s)if(s.t=='g')s.dead=1;p=newP(d.sp);spawn={x:d.sp,y:G-22};P.length=0;SY=null;clearInput();cam=camT();setAmb(d.th);}
function clearInput(){for(const k in K)K[k]=0;JB=UQ=AQ=AB=0;for(const k of ['l','r','j'])if(HELD[k]&&HELD[k].size)K[k]=1;for(const k in BTN)BTN[k].classList.toggle('on',!!(HELD[k]&&HELD[k].size))}
function camT(){const t=(L.fight&&!L.bossDown)?L.ar[3]:(L.cat&&L.end)?(p.x+L.cat.x)/2+8-W/2:p.x+6-W*.42+p.f*(26+Math.min(40,Math.abs(p.vx)*.4));return Math.max(0,Math.min(L.w-W,t))}
// ---- SES ----
let AM=null;
function ambVol(){if(AM)AM.g.gain.value=A.on?A.vol:0}
function setAmb(th){try{if(AM){AM.stop();AM=null}if(!A.ctx)return;const x=A.ctx,g=x.createGain();g.gain.value=A.on?A.vol:0;g.connect(x.destination);const o=x.createOscillator(),og=x.createGain();o.type='sine';o.frequency.value=[100,60,60,55,60][th]||60;og.gain.value=.012;o.connect(og);og.connect(g);o.start();let src=null;
 if(th<2){const b=x.createBuffer(1,x.sampleRate*2,x.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;src=x.createBufferSource();src.buffer=b;src.loop=true;const f=x.createBiquadFilter();f.type='lowpass';f.frequency.value=th?450:900;const ng=x.createGain();ng.gain.value=th?.05:.018;src.connect(f);f.connect(ng);ng.connect(g);src.start()}
 AM={g,stop(){try{o.stop();src&&src.stop();g.disconnect()}catch(e){}}}}catch(e){}}
function initAudio(){if(!A.ctx){try{A.ctx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}if(A.ctx)setAmb(L.th)}try{A.ctx&&A.ctx.resume()}catch(e){}}
function sfx(f,d=.1,ty='square',sl=0,v=.04){if(!A.on||!A.ctx)return;try{const t=A.ctx.currentTime,o=A.ctx.createOscillator(),g=A.ctx.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);if(sl)o.frequency.exponentialRampToValueAtTime(Math.max(30,f+sl),t+d);g.gain.setValueAtTime(v*A.vol,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(A.ctx.destination);o.start(t);o.stop(t+d)}catch(e){}}
// ---- GİRDİ ----
const HELD={},BTN={};
document.querySelectorAll('.k').forEach(b=>BTN[b.dataset.k]=b);
// ---- EINGABE: zentrale Verwaltung (Zeiger + Tastatur teilen sich HELD) ----
function press(k,d){if(d&&S=='INTRO'&&(k=='u'||k=='j'))introNext();if(d&&!K[k]&&S=='PLAY'){if(k=='j')JB=CFG.buf;if(k=='u')UQ=1;if(k=='a')AQ=1}K[k]=d?1:0}
function down(k,id){const h=HELD[k]||(HELD[k]=new Set());if(h.has(id))return;const was=h.size;h.add(id);if(!was)press(k,1);if(BTN[k])BTN[k].classList.add('on')}
function up(k,id){const h=HELD[k];if(!h||!h.delete(id))return;if(!h.size){press(k,0);if(BTN[k])BTN[k].classList.remove('on')}}
function hardClear(){for(const k in HELD)HELD[k].clear();clearInput()}
document.querySelectorAll('.k').forEach(b=>{const k=b.dataset.k;
 b.addEventListener('pointerdown',e=>{e.preventDefault();try{b.setPointerCapture(e.pointerId)}catch(x){}initAudio();down(k,e.pointerId)});
 ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>b.addEventListener(ev,e=>up(k,e.pointerId)));
 b.addEventListener('contextmenu',e=>e.preventDefault())});
const KM={j:'a',J:'a',ArrowLeft:'l',a:'l',ArrowRight:'r',d:'r',' ':'j',ArrowUp:'j',w:'j',e:'u',Enter:'u',f:'a',x:'a'};
addEventListener('keydown',e=>{initAudio();const k=KM[e.key];if(e.repeat){if(k)e.preventDefault();return}if(e.key=='p'||e.key=='Escape'){if(S=='PLAY')pause();else if(S=='PAUSED')resume();else if(S=='PIZZA')exitPizza();return}if(k){e.preventDefault();down(k,'k'+e.key)}});
addEventListener('keyup',e=>{const k=KM[e.key];if(k)up(k,'k'+e.key)});
addEventListener('blur',()=>{hardClear();if(S=='PLAY')pause()});
document.addEventListener('visibilitychange',()=>{hardClear();if(document.hidden&&S=='PLAY')pause();last=0});
document.addEventListener('contextmenu',e=>e.preventDefault());
let lastTap=0;document.addEventListener('touchend',e=>{const t=Date.now();if(t-lastTap<350)e.preventDefault();lastTap=t},{passive:false});
['gesturestart','gesturechange','gestureend','dblclick'].forEach(ev=>document.addEventListener(ev,e=>e.preventDefault()));
addEventListener('touchmove',e=>e.preventDefault(),{passive:false});
function fit(){const g=gw.getBoundingClientRect(),s=Math.max(.5,Math.min(g.width/W,g.height/H));cv.style.width=W*s+'px';cv.style.height=H*s+'px';
 const land=matchMedia('(pointer:coarse)').matches&&innerHeight>innerWidth;$('rot').classList.toggle('h',!land);if(land&&S=='PLAY')pause()}
addEventListener('resize',fit);addEventListener('orientationchange',()=>setTimeout(fit,100));
// ---- DURUM MAKİNESİ / ARAYÜZ ----
function showUI(k){ui.className='';const snd=`<button class=b data-a=snd>TON: ${A.on?'AN':'AUS'}</button><button class=b data-a=vol>LAUTSTÄRKE: ${Math.round(A.vol*100)}%</button>`;let h='';
 if(k=='menu')h=`<h1>☾ AY<br>EVE DÖNÜŞ</h1><p>Nach einem langen Tag nach Hause.</p><button class=b data-a=play>SPIELEN</button><button class=b data-a=ctrl>STEUERUNG</button>${snd}`;
 if(k=='ctrl')h=`<h1>STEUERUNG</h1><p>◀ ▶ / A D: Gehen<br>▲ / Leertaste: Springen<br>SCHLAG / J / Mausklick: Schlagen<br>AKTION / E: Interagieren<br>Esc: Pause</p><button class=b data-a=back>ZURÜCK</button>`;
 if(k=='pause')h=`<h1>PAUSE</h1><button class=b data-a=resume>WEITER</button><button class=b data-a=restart>LEVEL NEUSTART</button><button class=b data-a=menu>HAUPTMENÜ</button>${snd}`;
 if(k=='over')h=`<h1>GAME OVER</h1><button class=b data-a=again>NOCHMAL</button><button class=b data-a=menu>HAUPTMENÜ</button>`;
 if(k=='end'){ui.className='e';h=`<h1>ENDE</h1><p>Endlich zu Hause.${L.fed&&L.watered?'<br>Luka schläft zufrieden neben dir.':''}</p><button class=b data-a=play>RESTART</button><button class=b data-a=menu>HAUPTMENÜ</button>`}
 ui.innerHTML=h;pz.style.display=(k=='none')?'block':'none'}
function hideUI(){ui.className='h';ui.innerHTML='';pz.style.display='block';pz.textContent=S=='INTRO'?'SKIP':'❚❚';pz.style.fontSize=S=='INTRO'?'10px':'14px'}
ui.addEventListener('click',e=>{const a=e.target.dataset.a;if(!a)return;initAudio();sfx(660,.06);
 if(a=='play')newGame();else if(a=='ctrl')showUI('ctrl');else if(a=='back'||a=='menu')toMenu();else if(a=='resume')resume();
 else if(a=='again'){restartCp()}else if(a=='restart'){loadLevel(L.i);S='PLAY';hideUI()}else if(a=='snd'){A.on=!A.on;ambVol();showUI(S=='MENU'?'menu':'pause')}else if(a=='vol'){A.vol=A.vol>.7?.6:A.vol>.4?.3:1;ambVol();showUI(S=='MENU'?'menu':'pause')}});
pz.addEventListener('click',()=>{if(S=='PLAY')pause();else if(S=='INTRO')endIntro()});cv.addEventListener('pointerdown',e=>{initAudio();if(S=='PIZZA'){try{cv.setPointerCapture(e.pointerId)}catch(x){}pzPtr(e,'d');return}introNext();if(e.pointerType=='mouse'&&S=='PLAY')down('a','mouse')});addEventListener('pointerup',e=>{if(e.pointerType=='mouse')up('a','mouse')});cv.addEventListener('pointermove',e=>{if(S=='PIZZA')pzPtr(e,'m')});cv.addEventListener('pointerup',e=>{if(S=='PIZZA')pzPtr(e,'u')});
function restartCp(){const i=L.i;loadLevel(i);if(RES&&RES.i==i){for(const k of L.cp)if(k.x<=RES.x)k.got=1;spawn={x:RES.x,y:G-22};p.x=RES.x;p.y=G-22;cam=camT()}S='PLAY';hideUI()}
function toMenu(){S='MENU';loadLevel(0);showUI('menu')}
function newGame(){HAS=null;SY=null;RES=null;hardClear();loadLevel(0);S='INTRO';IN={st:0,t:0,tw:0,rt:0};clearInput();hideUI()}
function pause(){S='PAUSED';clearInput();showUI('pause')}
function resume(){S='PLAY';hideUI();last=0;acc=0}
function go(i){S='TRANS';TR={t:0,to:i,done:0};clearInput();sfx(300,.3,'triangle',200)}
function respawn(){S='RESP';RS=0;clearInput();sfx(200,.3,'sawtooth',-120)}
// ---- DÜŞMANLAR ----
const EK={cust:{w:12,h:22,hp:1,sp:26,sg:0,rg:0},thug:{w:14,h:26,hp:2,sp:30,sg:105,rg:24},rush:{w:14,h:26,hp:2,sp:34,sg:140,rg:24},def:{w:15,h:27,hp:3,sp:28,sg:120,rg:24},abi:{w:16,h:28,hp:4,sp:40,sg:230,rg:26},gun:{w:14,h:28,hp:2,sp:0,sg:240,rg:0},boss:{w:34,h:52,hp:14,sp:58,sg:999,rg:0},teyze:{w:26,h:44,hp:18,sp:70,sg:999,rg:0},bagger:{w:64,h:50,hp:12,sp:40,sg:999,rg:0}};
const DL={cust:[['Entschuldigung, wie viel kostet das?',''],['Wo finde ich die Milch?','']],thug:[['Ey, hast du eine Zigarette?',''],['Hey, warte mal!',''],['Hast du Feuer?','']],rush:[['Hast du Feuer?','']],def:[['Hey, warte mal!','']],abi:[['Gibt es was zu essen?','']],gun:[['','']],boss:[['Du schon wieder?','']],teyze:[['Wohin so spät, mein Junge?','']],bagger:[['Platz da, ich muss arbeiten!','']]};
function wrap(t,n){const o=[];let l='';for(const w of t.split(' ')){if((l+' '+w).trim().length>n){o.push(l);l=w}else l=(l+' '+w).trim()}if(l)o.push(l);return o}
function dlg(k,i){const m={cust:[0,1,0],thug:[0,1,0,2],rush:[0],def:[0],abi:[0],gun:[0],boss:[0],teyze:[0],bagger:[0]}[k],q=DL[k][m[i%m.length]];return{txt:q[0],tr:'',st:0,t:0,r:{cust:90,thug:140,rush:140,def:140,abi:215,gun:0,boss:0,teyze:0,bagger:0}[k],once:k=='abi'||k=='boss'||k=='teyze'||k=='bagger',ln:null,tl:null}}
function mkEn(a,i){const k=EK[a[0]];return{k:a[0],x:a[1],y:G-k.h,w:k.w,h:k.h,hp:k.hp,mx:k.hp,sp:k.sp*(a[0]=='thug'&&i%2?1.35:a[0]=='cust'?1+(i%3)*.3:1),sg:a[0]=='cust'&&i%3==1?70:k.sg,rg:a[0]=='cust'&&i%3==1?12:k.rg,a:a[2],b:a[3],f:a[0]=='gun'||i%2?-1:1,dir:i%2?-1:1,st:['boss','teyze','bagger'].includes(a[0])?'SLEEP':'PATROL',t:0,vx:0,fl:0,hid:0,dead:0,pz:0,wt:0,v:i,rc:2,hit:0,low:0,ph:0,rd:1,inv:['boss','teyze','bagger'].includes(a[0])?1:0,dl:dlg(a[0],i)}}
function emv(e,dx){const ox=e.x;e.x+=dx;let ok=1;const lo=Math.max(e.a,0),hi=Math.min(e.b,L.w)-e.w;if(e.x<lo){e.x=lo;ok=0}if(e.x>hi){e.x=hi;ok=0}
 for(const s of L.s)if(!s.dead&&s.t!='m'&&s.y<e.y+e.h-1&&ov(e,s)){e.x=ox;ok=0;break}return ok}
function tok(e){for(const o of L.en)if(o!==e&&!o.dead&&(o.st=='ATTACK'||o.st=='RUSH'))return 0;return 1}
const BAT={boss:{punch:{w:.7,d:.3},sweep:{w:.8,d:.35},charge:{w:.9,d:1},slam:{w:.9,d:.2},cart:{w:.7,d:.2},leap:{w:.8,d:.7}},teyze:{bag:{w:.5,d:.32},terlik:{w:.5,d:.2},pin:{w:.6,d:.8},rush:{w:.45,d:.8},guard:{w:.25,d:1.1}},bagger:{rocks:{w:.8,d:1.8},ball:{w:.9,d:3.4},dig:{w:.8,d:.2}}};
const RGN={boss:{punch:36,sweep:42,charge:150,slam:100,cart:190,leap:150},teyze:{bag:34,pin:40,guard:60,rush:130,terlik:150}};
const RECT={boss:{punch:.9,sweep:.9,charge:.8,slam:1.1,cart:.9,leap:1},teyze:{bag:.8,terlik:.7,pin:1,rush:1.1,guard:.5}};
function isB(e){return e.k=='boss'||e.k=='teyze'||e.k=='bagger'}
function pickAtk(e,ad){if(e.k=='bagger'){let c=e.p2?['rocks','ball','dig','rocks']:['rocks','ball'];c=c.filter(a=>a!=e.last);return c[Math.floor(Math.random()*c.length)]}let c;if(e.k=='teyze'){c=ad<60?['bag','pin','guard','bag']:ad<150?['rush','terlik','pin','guard']:['terlik','rush','terlik'];if(e.p2)c=c.concat(['terlik','rush'])}
 else{c=ad<70?['punch','sweep','punch','slam']:ad<170?['charge','slam','cart','sweep']:['charge','cart','charge'];if(e.p2)c=c.concat(ad>70?['leap','leap']:['punch'])}
 c=c.filter(a=>a!=e.last);return c[Math.floor(Math.random()*c.length)]}
function tzAct(e,a,dt,dur){let atk=null;
 if(a=='bag'){emv(e,e.rd*90*dt);if(e.t<dur-.05&&e.t>.05)atk={x:e.rd>0?e.x+e.w-2:e.x-40,y:e.y-4,w:42,h:e.h+4}}
 if(a=='pin'){emv(e,e.rd*28*dt);if(e.p2&&e.t<dur/2&&!e.h2){e.h2=1;e.hit=0}if(e.t<dur-.12)atk={x:e.x-34,y:G-44,w:e.w+68,h:36}}
 if(a=='rush'){if(!emv(e,e.rd*(e.p2?340:300)*dt)){e.st='STAG';e.t=1.3;e.vx=-e.rd*60;e.guard=0;SH=.3;burst(e.x+(e.rd>0?e.w:0),e.y+22,10,'#c8b890');sfx(90,.4,'sawtooth',-40,.08);return null}atk={x:e.x+2,y:e.y+4,w:e.w-4,h:e.h-4}}
 return atk}
function updBagger(e,dt,d,ad,dir){const cx=e.x+e.w/2,k=e.p2?.8:1,BG=BAT.bagger;
 if(p.inv<=0&&e.st!='REC'&&ov(e,p))hurtP(e);
 if(e.st=='IDLE'){e.f=dir;e.mv=0;if(ad>75){emv(e,dir*(e.p2?55:40)*dt);e.mv=1}else if(ad<48){emv(e,-dir*30*dt);e.mv=1}
  if(e.t<=0){const a=pickAtk(e,ad);e.st='WIND';e.at=a;e.last=a;e.t=BG[a].w*k;e.mv=0;sfx(80,.6,'sawtooth',30,.06);
   if(a=='ball'){const aw=BG.ball.w*k;for(let i=0;i<(e.p2?2:1);i++)L.hz.push({k:'ball',x0:(e.a+e.b)/2,x:(e.a+e.b)/2,y:G-30,w:30,h:30,rg:(e.b-e.a)/2-30,sp:2.1,ph:i*Math.PI,life:aw+BG.ball.d,arm:aw,arm0:aw})}}return}
 if(e.st=='WIND'){if(e.t<=0){e.st='ACT';const a=e.at;e.t=BG[a].d;e.q=0;
   if(a=='dig'){for(const sg of [-1,1])L.wv.push({x:cx-8+sg*30,vx:sg*(e.p2?200:170),w:16,h:14,t:0,k:'w',lo:e.a,hi:e.b});SH=.3;burst(cx,G-4,8,'#8a6a4a');sfx(70,.3,'sawtooth',-30,.08)}}return}
 if(e.st=='ACT'){if(e.at=='rocks'){e.q-=dt;if(e.q<=0){e.q=e.p2?.22:.32;const rx=Math.max(e.a+10,Math.min(e.b-24,Math.random()<.6?p.x+6+(Math.random()-.5)*90:e.a+Math.random()*(e.b-e.a)));L.wv.push({k:'rock',x:rx,y:G-210,w:14,h:14,vx:0,t:0,lo:-1e9,hi:1e9});sfx(100,.1,'sawtooth',-30,.03)}}
  if(e.t<=0){e.st='REC';e.t=e.p2?1.8:2.2;e.want=null;sfx(300,.5,'sawtooth',-200,.05)}return}
 if(e.st=='REC'){e.mv=0;e.f=dir;if(e.t<=0){e.st='IDLE';e.t=.9;e.want=null}}}
function updBoss(e,dt,d,ad,dir){const cx=e.x+e.w/2,BA=BAT[e.k],t2=e.k=='teyze';
 if(e.st=='DEAD'){e.t-=dt;if(e.t<=0){e.dead=1;L.bossDown=1;L.unl=1;for(const s of L.s)if(s.t=='g')s.dead=1;L.wv=[];L.bl=[];L.msg={t:3.5,s:'Geschafft!'};sfx(600,.5,'triangle',400,.06)}return}
 if(e.fl>0)e.fl-=dt;e.t-=dt;
 if(e.st=='INTRO'){e.f=-1;const LN={boss:['Du schon wieder?','Das wirst du bereuen!'],teyze:['Wohin so spät, mein Junge?','Ich bring dir Manieren bei!'],bagger:['Platz da, ich muss arbeiten!','Das ist MEINE Baustelle!']}[e.k],tx=e.t>2.2?LN[0]:LN[1];if(tx!=e.dl.txt){e.dl.txt=tx;e.dl.ln=null;sfx(120,.3,'sawtooth',-40,.05)}e.dl.st=1;if(e.x>L.ar[5]){e.x-=65*dt;e.mv=1}else e.mv=0;if(e.t<=0){e.dl.st=2;e.st='IDLE';e.t=1;e.inv=0;e.want=null}return}
 if(e.st=='TRANS'){e.mv=0;e.guard=0;if(e.t<=0){e.st='IDLE';e.t=.8;e.inv=0;e.p2=1;e.want=null}return}
 if(e.st=='STAG'){e.guard=0;emv(e,e.vx*dt);e.vx*=.9;if(e.t<=0){e.st='IDLE';e.t=.6;e.want=null}return}
 if(e.k=='bagger')return updBagger(e,dt,d,ad,dir);
 const k=e.p2?.8:1;
 if(e.st=='IDLE'){e.f=dir;e.mv=0;const w=e.want||(e.want=pickAtk(e,ad)),rg=RGN[e.k][w],sp=t2?(e.p2?115:90):(e.p2?80:60);
  if(ad>rg+8){emv(e,dir*sp*dt);e.mv=1}else if(ad<rg*.45&&w!='punch'&&w!='sweep'&&w!='bag'&&w!='pin'){emv(e,-dir*45*dt);e.mv=1}
  if((ad<=rg+8&&e.t<.7)||e.t<=0){e.st='WIND';e.at=w;e.last=w;e.t=BA[w].w*k;e.rd=dir;e.f=dir;e.hit=0;sfx(110,.25,'sawtooth',40,.04)}return}
 if(e.st=='WIND'){e.mv=0;if(e.t<=0){e.st='ACT';const a=e.at;e.t=BA[a].d;e.hit=0;e.h2=0;
   if(t2){if(a=='terlik'){const n=e.p2?3:1;for(let i=0;i<n;i++){const vx=Math.max(-230,Math.min(230,(p.x+6-cx)/.85+(i-(n-1)/2)*70));L.wv.push({k:'slip',x:cx-5,y:e.y+8,vx,vy:-190,w:10,h:6,t:0,lo:e.a-60,hi:e.b+60})}sfx(300,.15,'square',200,.05)}
    if(a=='guard'){e.guard=1;sfx(500,.1,'triangle',100,.05)}if(a=='bag'||a=='pin')sfx(180,.15,'sawtooth',-90,.06);if(a=='rush')sfx(130,.3,'sawtooth',-40,.06)}
   else{if(a=='slam'){for(const sg of [-1,1])L.wv.push({x:cx-8,vx:sg*(e.p2?185:150),w:16,h:14,t:0,k:'w',lo:e.a,hi:e.b});SH=.28;burst(cx,G-4,8,'#c8b890');sfx(70,.3,'sawtooth',-30,.08)}
    if(a=='cart'){L.wv.push({x:e.rd>0?cx+10:cx-32,vx:e.rd*(e.p2?190:150),w:22,h:16,t:0,k:'cart',lo:e.a,hi:e.b});sfx(200,.2,'square',-80,.05)}
    if(a=='leap'){e.bx=e.x;e.lx=Math.max(e.a,Math.min(e.b-e.w,p.x+6-e.w/2));e.f=e.lx<e.x?-1:1}
    if(a=='punch'||a=='sweep')sfx(180,.15,'sawtooth',-90,.06)}}return}
 if(e.st=='ACT'){const a=e.at,dur=BA[a].d,u=1-e.t/dur;let atk=null;
  if(t2)atk=tzAct(e,a,dt,dur);
  else{
   if(a=='punch'&&e.t<dur-.05&&e.t>.05)atk={x:e.rd>0?e.x+e.w-2:e.x-44,y:e.y+14,w:46,h:24};
   if(a=='sweep'&&e.t<dur-.08&&e.t>.05)atk=e.p2?{x:e.x-72,y:G-26,w:e.w+144,h:20}:{x:e.rd>0?e.x+e.w-4:e.x-72,y:G-26,w:76,h:20};
   if(a=='charge'){if(!emv(e,e.rd*(e.p2?270:225)*dt)){e.st='STAG';e.t=1;e.vx=-e.rd*60;SH=.3;burst(e.x+(e.rd>0?e.w:0),e.y+26,10,'#c8b890');sfx(90,.4,'sawtooth',-40,.08);return}atk={x:e.x+2,y:e.y+4,w:e.w-4,h:e.h-4}}
   if(a=='leap'){const ee=Math.min(1,u);e.x=e.bx+(e.lx-e.bx)*ee;e.y=G-52-90*Math.sin(Math.PI*ee);if(e.t<=0){e.y=G-52;SH=.35;burst(e.x+e.w/2,G-4,10,'#c8b890');for(const sg of [-1,1])L.wv.push({x:e.x+e.w/2-8,vx:sg*170,w:16,h:14,t:0,k:'w',lo:e.a,hi:e.b});if(p.inv<=0&&ov({x:e.x-8,y:G-30,w:e.w+16,h:30},p))hurtP(e)}}}
  if(e.st!='ACT')return;
  if(atk&&!e.hit&&p.inv<=0&&ov(atk,p)){e.hit=1;hurtP(e)}
  if(e.t<=0){
   if(t2&&a=='guard'){e.guard=0;e.st='WIND';e.at='bag';e.t=.28;e.hit=0;e.f=e.rd=dir;return}
   if(t2&&a=='bag'&&e.p2&&!e.c2){e.c2=1;e.st='WIND';e.at='pin';e.t=.35;e.hit=0;e.f=e.rd=dir;return}
   if(!t2&&a=='punch'&&e.p2&&!e.c2){e.c2=1;e.st='WIND';e.at='punch';e.t=.38;e.hit=0;e.f=e.rd=dir;return}
   e.c2=0;e.guard=0;e.st='REC';e.t=RECT[e.k][a]*(e.p2?.8:1);e.y=G-e.h;e.want=null}return}
 if(e.st=='REC'){e.mv=0;e.f=dir;if(e.t<=0){e.st='IDLE';e.t=e.p2?.8:1.1;e.want=null}}}
function updEn(e,dt){if(e.dead||e.st=='GIVE'||e.st=='SLEEP')return;if(e.fl>0)e.fl-=dt;e.rc-=dt;
 const d=p.x+6-(e.x+e.w/2),ad=Math.abs(d),dir=d<0?-1:1,zone=p.x+6>e.a-40&&p.x+6<e.b+40&&Math.abs(p.y+22-(e.y+e.h))<50;
 if(isB(e))return updBoss(e,dt,d,ad,dir);
 if(e.st=='DIE'){e.t-=dt;if(e.t<=0)e.dead=1;emv(e,e.vx*dt);e.vx*=.9;return}
 if(e.st=='HIT'){e.t-=dt;emv(e,e.vx*dt);e.vx*=.88;if(e.t<=0){e.st='RECOVER';e.t=.3}return}
 if(e.st=='RECOVER'){e.t-=dt;if(e.t<=0){if(e.low){e.low=0;e.st='FLEE';e.t=1.2}else e.st='PATROL'}return}
 if(e.st=='BLOCK'){e.t-=dt;e.f=dir;if(e.t<=0){if(ad<e.rg+14&&tok(e)){e.st='ATTACK';e.t=.4;e.hit=0}else e.st='CHASE'}return}
 if(e.st=='FLEE'){e.t-=dt;e.f=dir;if(!emv(e,-dir*e.sp*1.2*dt)||e.t<=0){e.st='CHASE'}return}
 if(e.st=='ATTACK'){e.t-=dt;if(e.t<=0){e.st='RECOVER';e.t=e.hit?.5:(e.sp>35?.95:.75)}return}
 if(e.st=='RUSH'){e.t-=dt;if(e.ph==0){e.f=e.rd;if(e.t<=0){e.ph=1;e.t=.45;sfx(120,.3,'sawtooth',-50,.05)}}else if(!emv(e,e.rd*190*dt)||e.t<=0){e.st='RECOVER';e.t=1;e.rc=3.5;e.ph=0}return}
 if(e.k=='gun'){if(e.st=='AIM'){e.t-=dt;e.f=dir;if(e.t<.3&&!e.lk){e.lk=1;e.ty=p.y+10}if(e.t<=0){fireGun(e);e.st='COOL';e.t=1.7}return}
  if(e.st=='COOL'){e.t-=dt;e.f=dir;if(e.t<=0)e.st='PATROL';return}
  if(e.st=='BACK'){e.t-=dt;e.f=dir;if(!emv(e,-dir*55*dt)){e.st='AIM';e.t=.5;e.lk=0;e.rc=2}else if(e.t<=0){e.st='PATROL';e.rc=2}return}
  if(zone&&ad<75&&e.rc<=0){e.st='BACK';e.t=.9;return}
  if(zone&&ad<e.sg&&ad>30){e.st='AIM';e.t=.8;e.lk=0;e.f=dir}else if(ad<300)e.f=dir;return}
 const D=e.dl;if(D.st==1){D.t-=dt;if(D.t<=0)D.st=2}
 if(e.st=='TALK'){e.t-=dt;e.f=dir;if(e.t<=0)e.st=e.k=='abi'?'CHASE':'PATROL';return}
 if(e.st=='NOTICE'){e.t-=dt;e.f=dir;if(e.t<=0){e.st='TALK';e.t=2.2;D.st=1;D.t=2.2}return}
 if(D.st==2){if(!D.once&&ad>D.r*1.6)D.st=0}
 else if(D.st==0&&ad<D.r&&Math.abs(p.y+22-(e.y+e.h))<50&&(e.k=='cust'||zone)){if(e.k=='cust'){D.st=1;D.t=2.2}else{e.st='NOTICE';e.t=.35;e.f=dir;return}}
 if(e.k=='def'&&e.rc<=0&&p.atk>0&&ad<e.rg+34&&(e.st=='CHASE'||e.st=='PATROL')){e.st='BLOCK';e.t=.45;e.rc=1.8;e.f=dir;return}
 if(e.sg&&zone&&ad<e.sg)e.st='CHASE';else if(e.st=='CHASE')e.st='PATROL';
 if(e.st=='CHASE'){e.f=e.dir=dir;
  if(e.k=='rush'&&e.rc<=0&&ad>75&&ad<190&&tok(e)){e.st='RUSH';e.ph=0;e.t=.6;e.rd=dir;return}
  const punish=p.cd>.12&&ad<e.rg+16;
  if(ad<e.rg||punish){if(tok(e)){e.st='ATTACK';e.t=.55;e.hit=0;sfx(150,.14,'sawtooth',-60,.03)}else emv(e,-dir*e.sp*.5*dt)}
  else if(ad>e.rg+46||tok(e))emv(e,dir*e.sp*1.3*dt)}
 else if(e.pz>0)e.pz-=dt;
 else{e.wt+=dt;if(e.k!='abi'&&e.wt>(e.k=='cust'?2.2:3.2+e.v%2)){e.wt=0;e.pz=e.k=='cust'?.9:1.4}if(!emv(e,e.dir*e.sp*dt))e.dir=-e.dir;e.f=e.dir}}
function hurtP(e){if(p.inv>0)return;if(e.k)e.hit=1;p.hp--;p.inv=1.1;SH=.25;p.vx=(p.x+6<e.x+e.w/2?-1:1)*150;p.vy=-170;p.on=null;burst(p.x+6,p.y+8,8,'#ff5a5a');sfx(120,.25,'sawtooth',-60,.07)}
function hitEn(e){e.hid=p.aid;
 if(isB(e)){if(e.inv||e.st=='DEAD')return;if(e.k=='bagger'&&e.st!='REC'){burst(e.x+e.w/2+e.f*30,e.y+20,5,'#cfd6e6');sfx(700,.07,'square',-300,.07);SH=Math.max(SH,.04);return}if(e.guard&&Math.sign(p.x+6-(e.x+e.w/2))==e.f){burst(e.x+e.w/2+e.f*12,e.y+14,6,'#cfd6e6');sfx(600,.08,'square',-200,.06);SH=Math.max(SH,.05);return}e.hp--;e.fl=.12;HS=.08;SH=.12;burst(e.x+e.w/2,e.y+22,10,'#fff4a0');sfx(200,.15,'square',-100,.07);
  if(e.hp<=0){e.st='DEAD';e.t=2.2;e.inv=1;L.wv=[];L.bl=[];L.hz=L.hz.filter(h=>h.life==null);sfx(100,1,'sawtooth',-60,.08);return}
  if(!e.p2&&e.hp<=e.mx/2){e.st='TRANS';e.t=1.8;e.inv=1;L.wv=[];L.hz=L.hz.filter(h=>h.life==null);L.pk.push({x:(L.ar[0]+L.ar[1])/2-50,got:0});SH=.3;sfx(90,.8,'sawtooth',30,.08);return}
  if(e.st=='REC'&&e.k!='bagger'){e.st='STAG';e.t=.7;e.vx=p.f*70;e.guard=0}return}
 if(e.st=='BLOCK'){burst(e.x+e.w/2+e.f*8,e.y+12,5,'#9ad');sfx(500,.06,'square',-100,.05);SH=Math.max(SH,.04);return}
 e.hp--;e.dl.st=2;HS=.07;SH=.12;e.fl=.15;burst(e.x+e.w/2,e.y+10,8,'#fff4a0');sfx(260,.12,'square',-120,.06);
 if(e.hp<=0){if(e.k=='abi'){e.st='GIVE';L.abiDown=1;L.unl=1;sfx(500,.4,'triangle',300)}else{e.st='DIE';e.t=.5;e.vx=p.f*160}}else{e.st='HIT';e.t=.35;e.vx=p.f*150;if(e.hp==1&&e.mx>=2)e.low=1}}
// ---- GÜNCELLEME ----
function ov(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y}
function burst(x,y,n,col){for(let i=0;i<n&&P.length<60;i++)P.push({x,y,vx:(Math.random()-.5)*120,vy:-Math.random()*120,t:.6,c:col})}
function ibox(o){return o.t=='ball'?{x:L.ball.x-14,y:G-22,w:28,h:22}:o.t=='cat'?{x:L.cat.x-10,y:L.cat.y-8,w:36,h:18}:{x:o.x-14,y:o.y-6,w:o.w+28,h:o.h+12}}
function step(){const dt=DT;
 if(S=='TRANS'){TR.t+=dt;if(!TR.done&&TR.t>.45){TR.done=1;loadLevel(TR.to)}if(TR.t>.9)S='PLAY';return}
 if(S=='RESP'){RS+=dt;if(RS>.2&&RS-dt<=.2){p.x=spawn.x;p.y=spawn.y;p.vx=p.vy=0;p.on=null;p.inv=.8;p.atk=0;p.use=0;L.bl=[];L.wv=[];L.msg={t:2,s:'Versuch es noch einmal!'};for(const e of L.en)if(!e.dead&&e.k!='boss'&&['ATTACK','RUSH','AIM','BACK','NOTICE','TALK','COOL'].includes(e.st))e.st='PATROL';cam=camT();clearInput()}if(RS>.4)S='PLAY';return}
 L.t+=dt;L.bp=(L.bp||0)-dt;if(L.bp<=0){L.bp=5+Math.random()*5;if(L.th==0)sfx(1800,.05,'square',0,.02);if(L.th==1)sfx(70,1.2,'sawtooth',40,.012)}if(L.msg.t>0)L.msg.t-=dt;if(L.ttl>0)L.ttl-=dt;
 for(const s of L.s)if(s.t=='m'){const nx=s.x0+(1+Math.sin(L.t*1.1))/2*s.rg;s.dx=nx-s.x;s.x=nx}
 let ax=(K.l?-1:0)+(K.r?1:0);
 if(ax){p.f=ax;p.vx+=ax*CFG.acc*dt;if(Math.abs(p.vx)>CFG.run)p.vx=ax*CFG.run}else{const f=CFG.fr*dt;p.vx=Math.abs(p.vx)<=f?0:p.vx-Math.sign(p.vx)*f}
 p.coy=p.on?CFG.coy:p.coy-dt;JB-=dt;
 if(JB>0&&p.coy>0){p.vy=-CFG.jump;p.coy=0;JB=0;p.on=null;sfx(380,.15,'square',300)}
 if(!K.j&&p.vy<-170)p.vy+=2200*dt;
 p.vy=Math.min(CFG.fall,p.vy+CFG.g*dt);
 const carry=p.on&&p.on.t=='m'?p.on.dx:0,dx=p.vx*dt+carry;p.x+=dx;
 for(const s of L.s)if(!s.dead&&ov(p,s)){if(dx>0)p.x=s.x-p.w;else p.x=s.x+s.w;p.vx=0}
 p.x=Math.max(0,Math.min(L.w-p.w,p.x));
 const wasAir=!p.on,pv=p.vy;p.on=null;p.y+=p.vy*dt;
 for(const s of L.s)if(!s.dead&&ov(p,s)){if(p.vy>0){p.y=s.y-p.h;p.on=s}else p.y=s.y+s.h;p.vy=0}
 if(p.on&&wasAir&&pv>200){p.land=.12;burst(p.x+6,p.y+22,3,'#a8a0b8');sfx(120,.08,'triangle',-40,.06)}
 if(p.on&&Math.abs(p.vx)>60){p.ft=(p.ft||0)-dt;if(p.ft<=0){p.ft=.27;sfx(80+Math.random()*30,.05,'triangle',0,.03)}}if(p.land>0)p.land-=dt;if(p.use>0)p.use-=dt;
 // saldırı
 p.cd-=dt;if(AQ){AB=.15;AQ=0}AB-=dt;if(AB>0&&p.cd<=0&&p.atk<=0){AB=0;p.atk=CFG.atkT;p.cd=CFG.atkCd;p.aid++;sfx(200,.08,'sawtooth',-80)}
 if(p.atk>0){p.atk-=dt;const fr={x:p.f>0?p.x+p.w:p.x-16,y:p.y+6,w:16,h:10};
  for(const s of L.s)if(s.t=='x'&&!s.dead&&ov(fr,s)){s.dead=1;burst(s.x+s.w/2,s.y+s.h/2,12,'#d9a066');sfx(150,.2,'sawtooth',-90,.07)}
  for(const e of L.en)if(!e.dead&&e.st!='GIVE'&&e.st!='DIE'&&e.st!='SLEEP'&&e.st!='DEAD'&&e.hid!=p.aid&&ov(fr,e))hitEn(e)}
 // etkileşim
 p.near=null;{let bd=1e9;for(const o of L.it){if(o.on&&o.t!='door')continue;if(o.lk&&!L.unl)continue;if(!can(o))continue;const b=ibox(o);if(ov(p,b)){const dd=Math.abs(p.x+6-(b.x+b.w/2));if(dd<bd){bd=dd;p.near=o}}}}
 if(L.fin>0)p.near=null;
 if(UQ&&p.near){const o=p.near;p.use=.3;if(o.t=='door'){o.op=1;sfx(500,.2,'triangle',200);go(L.i+1);UQ=0;return}
  if(o.t=='lever'){o.on=1;for(const s of L.s)if(s.t=='g')s.dead=1;sfx(250,.3,'square',200);burst(1187,G-45,10,'#aab')}
  if(o.t=='cat'){const ct=L.cat;ct.pet=1.6;ct.cd=2.4;L.pt=(L.pt||0)+1;p.use=1.2;sfx(700,.25,'sine',300);sfx(55,.9,'sawtooth',0,.035);for(let i=0;i<5;i++)P.push({x:ct.x+8+i*2,y:ct.y-4,vx:(i-2)*14,vy:-40,t:1,c:'#ff6b8a'})}
  else if(o.t=='cupboard'){HAS='food';p.use=.5;sfx(520,.1,'triangle',120);say('Katzenfutter genommen.')}
  else if(o.t=='sink'){HAS='water';p.use=.5;sfx(900,.3,'sine',-400,.03);say('Wasser geschöpft.')}
  else if(o.t=='fbowl'){HAS=null;L.fb=1;p.use=.7;burst(308,G-10,6,'#a0643a');sfx(300,.2,'square',-100,.03)}
  else if(o.t=='wbowl'){HAS=null;L.wb=1;p.use=.7;burst(348,G-10,6,'#6ac8f0');sfx(900,.3,'sine',-300,.03)}
  else if(o.t=='light'){L.dark=!L.dark;sfx(1200,.04,'square',0,.03)}
  else if(o.t=='window'){L.wo=!L.wo;sfx(400,.4,'sine',-150,.03)}
  else if(o.t=='pc'){L.pc=4;p.use=1;sfx(700,.1,'square',300,.03);say('Zeynep: Gute Nacht, Ay!')}
  else if(o.t=='book'){L.bk=.8;say('Ein altes Fotobuch über Berlin.')}
  else if(o.t=='ball'){const b=L.ball;b.vx=p.f*130;b.mv=1;b.t=0;if(L.cat.m==0)L.cat.m=3;sfx(300,.1,'triangle',200,.04)}
  else if(o.t=='pizza'){UQ=0;startPizza();return}
  else if(o.t=='bed'){L.end=1;L.fin=2.8;p.use=3;if(L.fed&&L.watered){L.cat.m=1;L.cat.act='rest';L.cat.tx=p.x+26}sfx(300,.5,'sine',-100,.03)}}
 UQ=0;
 if(L.cat){const ct=L.cat,d=p.x+6-(ct.x+8);if(ct.pet>0)ct.pet-=dt;if(ct.cd>0)ct.cd-=dt;ct.st=0;ct.eat=0;
  const go=(tx,sp)=>{const dx=tx-ct.x;if(Math.abs(dx)<3)return 1;ct.x+=Math.sign(dx)*sp*dt;ct.f=dx<0?-1:1;ct.st=1;return 0};
  if(ct.m==1){if(go(ct.tx,48)){ct.m=2;ct.f=ct.act=='rest'?(d<0?-1:1):1;ct.t=ct.act=='rest'?99:ct.act=='eat'?4.5:3.5}}
  else if(ct.m==2){ct.t-=dt;if(ct.act!='rest')ct.eat=ct.act;if(ct.t<=0){ct.m=0;if(ct.act=='eat'){L.fb=2;L.fed=1}else{L.wb=2;L.watered=1}}}
  else if(ct.m==3){const r=go(L.ball.x-8,85);if(!L.ball.mv&&(r||L.ball.t<=0))ct.m=0}
  else if(L.fb==1&&!L.end){ct.m=1;ct.tx=286;ct.act='eat'}
  else if(L.wb==1&&!L.end){ct.m=1;ct.tx=326;ct.act='drink'}
  else{if(Math.abs(d)<130&&ct.pet<=0)ct.f=d<0?-1:1;if(Math.abs(d)<100&&Math.abs(d)>34&&ct.pet<=0){ct.x+=Math.sign(d)*38*dt;ct.st=1}}
  const busy=ct.m==2&&ct.act!='rest';ct.it=(ct.st||ct.pet>0||busy)?0:(ct.it||0)+dt;ct.sit=ct.it>1.2&&!busy}
 if(L.fin>0){L.fin-=dt;if(L.fin<=0){S='END';p.cel=1;clearInput();showUI('end')}}
 for(const k of L.cp)if(!k.got&&p.x>k.x){k.got=1;spawn={x:k.x,y:G-22};RES={i:L.i,x:k.x};L.msg={t:1.6,s:'Kontrollpunkt'};sfx(800,.2,'sine',400)}
 for(const s of L.st)if(!s.got&&ov(p,{x:s.x-6,y:s.y-6,w:12,h:12})){s.got=1;L.n++;burst(s.x,s.y,8,'#ffe08a');sfx(1000,.15,'sine',500)}
 for(let i=P.length-1;i>=0;i--){const q=P[i];q.t-=dt;q.vy+=400*dt;q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.t<=0)P.splice(i,1)}
 p.inv-=dt;for(const e of L.en){updEn(e,dt);if(e.dead||e.st=='GIVE'||e.st=='DIE'||e.st=='HIT')continue;
  if(e.k=='cust'?(e.st=='PATROL'&&ov(p,e)):((e.st=='ATTACK'&&e.t<.2&&e.t>.05&&ov({x:e.f>0?e.x+e.w:e.x-14,y:e.y+8,w:14,h:10},p))||(e.st=='RUSH'&&e.ph==1&&ov(e,p))))hurtP(e)}
 {const bo=L.en.find(isB);if(bo){if(!L.fight&&p.x>L.ar[2]&&bo.st=='SLEEP'){L.fight=1;for(const s of L.s)if(s.t=='g')s.dead=0;bo.st='INTRO';bo.t=4.4;bo.x=L.ar[4];L.pk.push({x:(L.ar[0]+L.ar[1])/2,got:0});sfx(90,.8,'sawtooth',20,.07)}if(bo.st=='INTRO'&&UQ){bo.t=Math.min(bo.t,.05);UQ=0}}}
 for(const w of L.wv){w.t+=dt;w.x+=w.vx*dt;if(w.k=='slip'){w.vy+=420*dt;w.y+=w.vy*dt;if(w.y>G-w.h)w.dead=1}if(w.k=='rock'&&w.t>.8){w.y+=300*dt;if(w.y>=G-w.h){w.dead=1;burst(w.x+7,G-4,6,w.pot?'#c8683a':'#8a8a96');sfx(90,.1,'sawtooth',-30,.04)}}const wy=(w.k=='slip'||w.k=='rock')?w.y:G-w.h;if(!w.hit&&p.inv<=0&&(w.k!='rock'||w.t>.8)&&ov({x:w.x,y:wy,w:w.w,h:w.h},p)){w.hit=1;hurtP({x:w.x,w:w.w});if(w.k=='slip')w.dead=1}if(w.x<w.lo||w.x+w.w>w.hi||w.t>4)w.dead=1}L.wv=L.wv.filter(w=>!w.dead);
 for(const k of L.pk)if(!k.got&&p.hp<3&&Math.abs(p.x+6-k.x)<14){k.got=1;p.hp++;sfx(900,.2,'sine',400);burst(k.x,G-30,6,'#ff6b8a')}
 for(const b of L.bl){b.t+=dt;b.x+=b.vx*dt;const r={x:b.x,y:b.y-1,w:6,h:3};
  for(const s of L.s)if(!s.dead&&s.t!='m'&&ov(r,s)){b.dead=1;burst(b.x,b.y,5,'#ffd24a');sfx(900,.06,'square',-500,.04);break}
  if(!b.dead&&p.inv<=0&&ov(r,p)){b.dead=1;hurtP({x:b.x,w:0})}
  if(b.t>3.5||b.x<-20||b.x>L.w+20)b.dead=1}
 L.bl=L.bl.filter(b=>!b.dead);
 for(const h of L.hz){h.x=h.x0+Math.sin(L.t*h.sp+(h.ph||0))*h.rg;if(h.arm>0)h.arm-=dt;if(h.life!=null){h.life-=dt;if(h.life<=0)h.dead=1}if(!(h.arm>0)&&p.inv<=0&&ov(p,h.k=='ball'?{x:h.x+4,y:h.y+4,w:h.w-8,h:h.h-8}:h))hurtP({x:h.x,w:h.w})}L.hz=L.hz.filter(h=>!h.dead);for(const f of L.fp)if(!f.done&&p.x>f.tr){f.done=1;L.wv.push({k:'rock',pot:1,x:f.x,y:G-210,w:14,h:14,vx:0,t:0,lo:-1e9,hi:1e9})}
 if(L.i==4){L.lt+=((L.dark?1:0)-L.lt)*Math.min(1,dt*4);if(L.pc>0)L.pc-=dt;if(L.bk>0)L.bk-=dt;const b=L.ball;if(b.mv){b.x+=b.vx*dt;b.vx*=Math.pow(.35,dt);if(b.x<12){b.x=12;b.vx=Math.abs(b.vx)*.5}if(b.x>L.w-12){b.x=L.w-12;b.vx=-Math.abs(b.vx)*.5}if(Math.abs(b.vx)<6){b.vx=0;b.mv=0;b.t=1.2}}else if(b.t>0)b.t-=dt}
 if(SY&&SY.t>0)SY.t-=dt;
 if(p.hp<=0){S='OVER';clearInput();sfx(110,.6,'sawtooth',-70,.06);showUI('over')}
 cam+=(camT()-cam)*Math.min(1,dt*6);
 if(p.y>G+140)respawn();
}
// ---- ÇİZİM ----
function R(x,y,w,h,col,par=1){c.fillStyle=col;c.fillRect(Math.round(x-cam*par),Math.round(y),w,h)}
function F(x,y,w,h,col){c.fillStyle=col;c.fillRect(x,y,w,h)}
function drawMkt(){F(0,0,W,G,'#efe0b8');F(0,165,W,26,'#d8c690');
 for(let x=40;x<L.w;x+=120){R(x,191,44,4,x>2100&&x<2640?'#ffd0a0':'#fff6c0');R(x+4,195,36,2,'rgba(255,246,192,.3)')}
 for(let x=20;x<1950;x+=140){R(x,G-110,60,70,'#cdb98a',.6);for(let j=0;j<4;j++)R(x+4+j*14,G-100,10,8,['#c88','#8ac','#cb8','#8c9'][(j+(x/140|0))%4],.6)}
 for(let k=0;k<3;k++){const bx=((T*14+k*700)%2000)-40;R(bx,G-58,10,40,['#5a4a8a','#8a5a4a','#4a7a6a'][k],.7);R(bx+1,G-68,8,10,'#d2a888',.7);R(bx,G-18,10,2,'rgba(0,0,0,.2)',.7)}
 const win=x=>{c.save();c.translate(0,131);R(x,70,70,70,'#2a2060');R(x,110,70,30,'#c0586a');R(x,128,70,12,'#e0834a');R(x+8,80,2,2,'#fff6c8');R(x+40,90,2,2,'#fff6c8');R(x+52,76,9,9,'#fff3c4');R(x-2,68,74,3,'#d8d0c0');R(x-2,138,74,3,'#d8d0c0');R(x+32,70,3,70,'#d8d0c0');c.restore()};win(300);win(1560);
 for(const x of [10,150]){R(x,G-34,70,34,'#7a5a3a');R(x,G-38,70,6,'#d8d0c0');R(x+4,G-42,60,4,'#444');R(x+8,G-46,6,4,'#e04a4a');R(x+20,G-46,8,4,'#f0c040');R(x+42,G-52,20,14,'#444');R(x+45,G-49,14,6,'#7fd');R(x+30,G-44,6,2,Math.floor(T*4)%2?'#f33':'#722');R(x+20,201,32,12,'#c33');txt('KASSE',x+36,210,'#fff',6)}
 const sg=['LEBENSMITTEL','SNACKS','GETRÄNKE','TIEFKÜHL','MILCH','HAUSHALT','REINIGUNG','TIERBEDARF'];
 for(let x=480,i=0;x<1900;x+=170,i++){const sec=x<1000?0:x<1500?1:2,cool=sec==1&&i%2==0;
  if(cool){R(x,G-96,80,96,'#9fd4e8',.9);R(x+4,G-92,72,88,'#cfeeff',.9);for(let r=0;r<3;r++)for(let j=0;j<4;j++)R(x+8+j*17,G-86+r*28,12,16,['#e04a4a','#f0c040','#4aa0e0','#fff','#5ac06a'][(r+j+i)%5],.9);R(x+39,G-92,2,88,'#6a8aa0',.9);R(x+4,G-94,72,2,'#fff',.9)}
  else{R(x,G-96,80,96,sec==2?'#4a6a7a':'#6b5b4a',.9);for(let r=0;r<3;r++){R(x+3,G-88+r*26,74,2,'#2a2a30',.9);for(let j=0;j<6;j++)R(x+5+j*12,G-102+r*26,10,14,(sec==2?['#7ac','#9d7','#cc8','#fff','#b8c']:['#e04a4a','#4aa0e0','#f0c040','#5ac06a','#c070d0'])[(i+r+j)%5],.9);for(let j=0;j<3;j++)R(x+6+j*24,G-85+r*26,12,3,'#fff',.9)}}
  R(x,G-2,80,3,'rgba(0,0,0,.2)',.9);R(x+10,201,60,12,['#2a6aa0','#2a8a5a','#a0522d'][sec]);txt(sg[i%8],x+40,210,'#fff',6)}
 R(1950,165,200,215,'#8a7a5a');for(let x=1970;x<2140;x+=60){R(x,G-60,46,60,'#a0702f');R(x,G-60,46,3,'#c89050');R(x+20,G-60,6,60,'#7a5020')}R(2030,G-96,60,36,'#b88040',.9);
 R(2119,G-3,491,3,'#f0c040');for(let x=2119;x<2610;x+=24)R(x,G-3,12,3,'#222');
 for(let r=0;r<12;r++)R(2360-r*4,191+r*14,40+r*8,14,'rgba(255,230,160,.05)');
 for(const x of [2150,2270,2440])R(x,G-90,70,90,'#5a4a5a',.85);
 const bo=L.en.find(e=>e.k=='boss'),op=bo&&bo.st!='SLEEP'&&bo.st!='IDLE'||(bo&&bo.x<2540);R(2552,G-96,56,96,'#5a5a6a');R(2556,G-92,48,90,op?'#1a1020':'#6a6a7a');txt('LAGER',2580,G-100,'#fff',7);
 R(2640,G-84,56,12,'#2a9d4f');txt('AUSGANG',2668,G-75,'#fff',7);R(2640,G-2,80,2,'rgba(140,170,255,.3)');
 R(330,236,52,26,'#c33');R(332,238,48,22,'#e55');txt('ANGEBOT',356,252,'#fff',7);R(1100,236,44,26,'#2a6aa0');R(1102,238,40,22,'#4a8ac0');txt('FRISCH',1122,252,'#fff',7);
 for(const x of [120,560,1130,1700]){R(x,G-22,20,3,'#aab');R(x,G-22,2,14,'#aab');R(x+18,G-22,2,14,'#aab');R(x+2,G-9,3,3,'#222');R(x+15,G-9,3,3,'#222')}
 for(const x of [16,160]){R(x,G-42,6,4,'#e04a4a');R(x+12,G-42,8,4,'#f0c040');R(x+24,G-42,6,4,'#4a9ae0')}}
function drawBG(){const th=L.th;
 if(th==0)drawMkt(); else if(th==1){const cs=['#0d0b2e','#15103c','#1f1650','#2d1b61','#40236d','#5c2c72','#8a3d6e','#c0586a','#e0834a','#e09a50'];
  for(let i=0;i<10;i++)F(0,165+i*22,W,22,cs[i]);F(0,385,W,80,'#e09a50');
  for(let i=0;i<22;i++){const sx=hs(i+1)*W,sy=165+hs(i+50)*130;if(Math.sin(T*2+i*1.7)>-.5)F(Math.round(sx),Math.round(sy),i%4?1:2,i%4?1:2,'#fff6c8')}
  c.fillStyle='#fff3c4';for(let dy=-14;dy<=14;dy++){const h=Math.sqrt(196-dy*dy);c.fillRect(Math.round(400-h),205+dy,Math.round(h*2),1)}
  c.fillStyle='#d8ceb0';for(let dy=-4;dy<=4;dy++)c.fillRect(395+dy,201+dy%2,3,2);
  const b0=Math.floor(cam*.25/70);for(let k=-1;k<9;k++){const i=b0+k,h=90+hs(i)*90,x=i*70-cam*.25;F(Math.round(x),G-h-20,66,h+20,'#1d1a45');for(let wy=0;wy<h;wy+=22)for(let wx=8;wx<56;wx+=22)if(hs(i*7+wx+wy)>.6)F(Math.round(x+wx),G-h-8+wy,6,8,'#c8a050')}
  F(0,G-150,W,110,'rgba(120,80,130,.13)');const cx=(L.t*28+T*0)%(W+120)-60;F(Math.round(cx),G-34,26,8,'#0a0820');F(Math.round(cx)+5,G-40,14,6,'#0a0820');F(Math.round(cx)+(cx%2<1?22:0),G-33,3,3,'#ffe9a0');
  const n0=Math.floor(cam*.55/120);for(let k=-1;k<6;k++){const i=n0+k,h=130+hs(i+9)*70,x=i*120-cam*.55,br=hs(i)>.5;F(Math.round(x),G-h,112,h,br?'#5a3550':'#34275e');F(Math.round(x)-2,G-h-8,116,8,br?'#3a2038':'#221844');
   for(let wy=14;wy<h-30;wy+=30)for(let wx=10;wx<100;wx+=30){const lit=hs(i*13+wx*3+wy)>.4;F(Math.round(x+wx),G-h+wy,14,18,lit?'#ffcf6b':'#1a1438');if(lit){F(Math.round(x+wx),G-h+wy+16,14,2,'#d09a40');F(Math.round(x+wx),G-h+wy,3,16,'#b85a3a');F(Math.round(x+wx+11),G-h+wy,3,16,'#b85a3a')}}
   F(Math.round(x+104),G-h,3,h,'#2a2448');F(Math.round(x-2),G-h-3,116,3,'#1a1438');if(hs(i+3)>.5){F(Math.round(x+8),G-h+46,36,3,'#15102a');F(Math.round(x+8),G-h+38,36,1,'#15102a');F(Math.round(x+8),G-h+38,1,8,'#15102a');F(Math.round(x+43),G-h+38,1,8,'#15102a')}}
  for(let x=100;x<L.w;x+=260){R(x,G-84,3,84,'#1c1c2c');R(x-6,G-88,16,4,'#1c1c2c');R(x-5,G-84,14,3,'#ffd77a');R(x-9,G-80,22,3,'rgba(255,200,100,.25)');R(x-13,G-77,30,3,'rgba(255,200,100,.15)')}
  for(const d of L.d.d||[]){const x=d[1];
   if(d[0]=='scaf'){R(x,G-d[3],3,d[3],'#5a5a6a');R(x+d[2]-3,G-d[3],3,d[3],'#5a5a6a');for(let i=14;i<d[3];i+=22)R(x,G-i,d[2],2,'#5a5a6a')}
   if(d[0]=='fence'){R(x,G-26,d[2],20,'#d8a030');for(let i=0;i<d[2];i+=10)R(x+i,G-26,5,20,'#2a2a30');for(let i=0;i<d[2];i+=40)R(x+i,G-32,3,32,'#444')}
   if(d[0]=='cone'){R(x,G-10,7,10,'#e86a2a');R(x+1,G-6,5,2,'#fff');R(x-1,G-1,9,1,'#e86a2a')}
   if(d[0]=='bench'){R(x,G-16,34,3,'#6a4a2a');R(x,G-24,34,2,'#6a4a2a');R(x+2,G-16,3,16,'#2a2030');R(x+29,G-16,3,16,'#2a2030')}
   if(d[0]=='sign'){R(x,G-70,3,70,'#556');R(x-14,G-78,40,12,'#1c5a9a');R(x-13,G-77,38,1,'#8ac');txt(d[2],x+6,G-69,'#fff',5)}
   if(d[0]=='door2'){R(x-3,G-4,30,4,'#6a6a7a');R(x,G-48,24,44,'#3a2a3a');R(x+3,G-44,18,40,'#241a2c');R(x+17,G-24,3,3,'#d8b030');R(x+2,G-56,20,6,Math.floor(T*1.3)%7?'#ffcf6b':'#a08040')}
   if(d[0]=='shop'){R(x,G-74,112,74,'#2e2448');R(x,G-74,112,6,d[3]);for(let i=0;i<7;i++)R(x+i*16,G-68,8,8,i%2?'#f4ecd0':d[3]);R(x+8,G-52,50,34,'#ffcf6b');R(x+8,G-35,50,2,'#c8963a');R(x+72,G-50,22,50,'#1a1438');R(x+14,G-88,84,12,'#1a1438');txt(d[2],x+56,G-79,(Math.floor(T*1.7+x)%9)?'#ffe08a':'#6a5a40',7)}
   if(d[0]=='car'){R(x,G-16,52,12,d[2]);R(x+10,G-26,30,10,d[2]);R(x+13,G-24,10,7,'#9ad');R(x+27,G-24,10,7,'#9ad');R(x+6,G-6,10,6,'#111');R(x+36,G-6,10,6,'#111');R(x+48,G-12,3,3,'#ffe9a0')}
   if(d[0]=='tree'){R(x,G-30,5,30,'#4a3020');R(x-14,G-62,34,34,'#1f4a3a');R(x-8,G-70,22,12,'#2a5a44');R(x-10,G-50,6,6,'#2a5a44')}
   if(d[0]=='bin'){R(x,G-18,14,18,'#3c6a4a');R(x-1,G-20,16,3,'#2a4a34')}
   if(d[0]=='bus'){R(x,G-70,3,70,'#556');R(x+60,G-70,3,70,'#556');R(x-4,G-74,70,5,'#334');R(x+6,G-20,48,5,'#8a5a3a');R(x+8,G-62,44,30,'rgba(150,200,255,.25)')}
   if(d[0]=='bike'){R(x,G-12,10,10,'#222');R(x+16,G-12,10,10,'#222');R(x+2,G-4,6,2,'#999');R(x+5,G-18,16,3,'#c33');R(x+18,G-22,3,10,'#c33')}
   if(d[0]=='apt'){R(x,G-300,200,300,'#6b3f3a');R(x-4,G-308,208,10,'#3a2230');for(let wy=0;wy<4;wy++)for(let wx=0;wx<4;wx++)R(x+14+wx*46,G-280+wy*60,22,30,hs(wx*5+wy)>.3?'#ffcf6b':'#241a3a');R(x+30,G-44,40,16,'#c8a030');for(let i=0;i<4;i++){R(x+33+i*9,G-41,7,10,'#e8d890');R(x+35+i*9,G-38,3,1,'#333')}R(x+148,G-44,10,22,'#444');R(x+150,G-40,6,6,Math.floor(T*2)%2?'#ffe08a':'#a08a40');R(x+150,G-32,6,2,'#222')}}}
 else if(th==2){F(0,0,W,G,'#e3bf8f');for(let x=0;x<L.w;x+=16)R(x,0,8,G,'rgba(160,100,60,.15)');F(0,0,W,12,'#c79a6a');
  c.save();c.translate(0,100);R(190,70,70,90,'#5a3a24');R(194,74,62,82,'#12103a');c.fillStyle='#fff3c4';for(let dy=-10;dy<=10;dy++){const h=Math.sqrt(100-dy*dy);c.fillRect(Math.round(225-h-cam),100+dy,Math.round(h*2),1)}c.fillStyle='#12103a';for(let dy=-9;dy<=9;dy++){const h=Math.sqrt(81-dy*dy);c.fillRect(Math.round(231-h-cam),97+dy,Math.round(h*2),1)}
  R(224,74,3,82,'#5a3a24');R(194,114,62,3,'#5a3a24');for(const sx of [200,240,212])R(sx,84+(sx%7)*3,2,2,'#fff6c8');c.restore();
  R(40,G-36,90,36,'#7a4a6a');R(40,G-56,10,20,'#7a4a6a');R(46,G-30,78,8,'#946083');R(60,G-50,18,14,'#caa');
  R(150,G-26,26,26,'#6a4a2a');R(146,G-30,34,5,'#8a6a3a');R(158,G-42,10,12,'#ffe9a0');R(156,G-34,14,4,'#f5d080');R(160,G-72,3,30,'#333');
  R(290,G-100,50,100,'#5a3a24');for(let r=0;r<4;r++){R(293,G-96+r*24,44,3,'#3a2414');for(let j=0;j<5;j++)R(295+j*8,G-96+r*24-16+3,6,14,['#c44','#48c','#4a6','#ca4','#a5c'][(j+r)%5])}
  R(0,G-92,6,92,'#6a4a2a');R(0,G-92,6,2,'#3a2414');R(8,G-70,14,2,'#caa');R(120,G-6,110,6,'#8a3a4a');R(124,G-4,102,2,'#a85a6a');c.save();c.translate(0,130);R(290,60,24,18,'#5a3a24');R(293,63,18,12,'#6a9ad0');R(322,66,18,14,'#5a3a24');R(325,69,12,8,'#d08a5a');c.restore();R(8,G-3,24,3,'#4a3020');R(30,G-60,14,2,'#333');R(32,G-56,6,22,'#6a4fb0');R(350,G-82,28,82,'#d8dce8');R(350,G-82,28,3,'#aab');R(352,G-50,2,10,'#889');R(352,G-76,2,16,'#889');R(384,G-92,66,28,'#7a5a3a');R(386,G-90,30,24,'#8a6a4a');R(418,G-90,30,24,'#8a6a4a');R(384,G-36,66,36,'#8a6a4a');R(384,G-40,66,5,'#c8c0b0');R(388,G-34,28,30,'#7a5a3a');R(420,G-34,28,30,'#7a5a3a');R(392,G-46,8,6,'#f4ecd0');R(404,G-48,6,8,'#6aa0d0');R(424,G-44,24,4,'#aab');R(426,G-42,20,2,'#6a8aa0');R(433,G-54,2,10,'#bbb');R(430,G-54,8,2,'#bbb');R(408,G-46,6,8,'#d84a4a');R(408,G-44,6,2,'#fff');
  R(190,G-28,60,5,'#8a5a34');R(196,G-23,4,23,'#5a3a24');R(240,G-23,4,23,'#5a3a24');R(200,G-34,10,6,'#f4ecd0');R(226,G-34,10,6,'#f4ecd0');R(180,G-24,8,24,'#6a4a2a');R(180,G-24,3,10,'#6a4a2a');R(254,G-24,8,24,'#6a4a2a');R(220,G-130,2,40,'#333');R(212,G-92,18,6,'#ffd77a');R(208,G-88,26,16,'rgba(255,215,120,.15)');R(500,G-60,70,50,'#1a1a2a');R(504,G-56,62,40,Math.floor(T*.5)%2?'#2a3a5a':'#2a4a6a');R(496,G-10,78,10,'#5a3a24');R(600,G-38,12,38,'#3a7a4a');R(596,G-8,20,8,'#8a5a34');R(640,G-90,24,18,'#5a3a24');R(643,G-87,18,12,'#d08a5a');R(672,G-66,42,66,'#5a3a24')}
 else if(th==4){F(0,0,W,G,'#b9a98a');F(0,165,W,10,'#8a7a5a');F(0,G-60,W,60,'#6d7d70');for(let x=0;x<L.w;x+=24)R(x,G-60,1,60,'rgba(0,0,0,.15)');R(0,G-62,L.w,3,'#4a5a4e');
  for(let x=60;x<L.w;x+=190){R(x,169,22,6,'#ffe9a0');R(x-6,175,34,8,'rgba(255,233,160,.18)')}
  R(40,G-110,104,52,'#7a7a88');for(let i=0;i<5;i++)for(let j=0;j<2;j++){R(44+i*20,G-106+j*24,17,20,'#a8a8b8');R(46+i*20,G-100+j*24,13,3,'#f4ecd0');R(52+i*20,G-90+j*24,3,1,'#333')}txt('BRIEFKÄSTEN',92,G-114,'#ffe9a0',6);
  for(let i=0;i<9;i++){R(200+i*14,G-8-i*8,14,8+i*8,i%2?'#6a5a4a':'#7a6a5a');R(200+i*14,G-30-i*8,14,2,'#333')}
  R(410,G-90,36,26,'#6a4a2a');R(414,G-86,12,10,'#f4ecd0');R(430,G-84,12,12,'#e8d890');R(470,G-68,48,68,'#4a3a2a');txt('WOHNUNG 3',494,G-72,'#ffe9a0',6)}
 else{F(0,0,W,G,'#d9b48a');F(0,0,W,10,'#a8845a');for(let x=0;x<L.w;x+=20)R(x,10,2,G-10,'rgba(120,70,40,.12)');
  c.save();c.translate(0,110);R(110,60,64,86,'#5a3a24');R(114,64,56,78,'#15123e');c.fillStyle='#fff3c4';for(let dy=-9;dy<=9;dy++){const h=Math.sqrt(81-dy*dy);c.fillRect(Math.round(132-h-cam),92+dy,Math.round(h*2),1)}
  c.fillStyle='#15123e';for(let dy=-8;dy<=8;dy++){const h=Math.sqrt(64-dy*dy);c.fillRect(Math.round(137-h-cam),90+dy,Math.round(h*2),1)}
  R(152,78,2,2,'#fff6c8');R(160,110,2,2,'#fff6c8');R(150,126,2,2,'#fff6c8');R(140,64,3,78,'#5a3a24');R(114,100,56,3,'#5a3a24');R(104,146,76,5,'#7a5434');if(L.wo){R(141,64,29,78,'#1b1850');R(141,64,2,78,'#9a8a6a');R(152,90,2,2,'#fff6c8');for(let i=0;i<4;i++)R(112+Math.round(Math.sin(T*2+i)*2),64+i*20,5,20,'#b85a7a');R(165-Math.round(Math.sin(T*2)*2),64,5,78,'#b85a7a')}c.restore();
  R(8,G-44,8,44,'#6a4a34');R(8,G-30,84,30,'#6a4a34');R(16,G-34,76,18,'#e8e0f0');R(16,G-38,26,10,'#fff');R(44,G-30,48,14,'#5a6ab8');
  R(196,G-34,50,5,'#7a5434');R(198,G-29,4,29,'#5a3a24');R(242,G-29,4,29,'#5a3a24');R(208,G-22,16,4,'#8a6a4a');R(208,G-18,3,18,'#6a4a2a');R(221,G-18,3,18,'#6a4a2a');
  R(204,G-52,2,18,'#333');R(200,G-56,12,6,'#ffd77a');R(194,G-50,26,16,'rgba(255,215,120,.15)');R(228,G-44,5,10,'#c44');R(233,G-42,5,8,'#4a6');
  R(100,G-5,90,5,'#8a4a6a');R(104,G-3,82,2,'#a8607a');R(96,G-18,14,16,'#4a6a4a');R(120,G-8,10,8,'#c44');R(130,G-6,8,6,'#48c');c.save();c.translate(0,140);R(30,50,24,32,'#2a4a6a');R(34,56,16,10,'#ffe08a');c.restore();R(206,G-36,10,14,'#6a4fb0');R(246,G-8,46,8,'#7a4a6a');R(250,G-11,38,5,'#9a6a8a');R(300,G-6,16,6,'#9a9aa4');R(301,G-7,14,2,'#c9c9d4');{const hh=L.fb==1?(L.cat.m==2&&L.cat.act=='eat'?Math.max(1,Math.ceil(4*L.cat.t/4.5)):4):0;if(hh)R(302,G-6-hh,12,hh,'#a0643a')}
  R(340,G-6,16,6,'#7a9ab0');R(341,G-7,14,2,'#c9c9d4');if(L.wb==1){const wl=L.cat.m==2&&L.cat.act=='drink'?Math.max(1,Math.ceil(2*L.cat.t/3.5)):2;R(342,G-6-wl+1,12,wl,'#6ac8f0');if(L.cat.m==2&&L.cat.act=='drink')R(345+Math.floor(T*6)%6,G-6-wl+1,2,1,'#fff')}else R(341,G-6,14,1,'#4a6a80');
  R(100,G-62,8,12,'#e8e0d0');R(102,G-60,4,4,L.dark?'#444':'#ffe08a');
  R(214,G-52,24,16,'#1a1a2a');R(216,G-50,20,11,L.pc>0?'#5ab0e0':'#2a2a3a');if(L.pc>0){R(218,G-48,12,1,'#fff');R(218,G-45,8,1,'#fff');R(218,G-42,Math.floor(T*4)%2?3:0,2,'#fff')}R(224,G-36,4,3,'#555');
  R(400,G-100,60,100,'#5a3a24');for(let r=0;r<4;r++){R(403,G-96+r*24,54,2,'#3a2414');for(let j=0;j<7;j++)R(404+j*7,G-94+r*24,5,20,['#c44','#48c','#4a6','#ca4','#a5c','#d86','#6ac'][(j+r*2)%7])}if(L.bk>0)R(425,G-27,5,3,'#fff');
  {const b=L.ball;R(Math.round(b.x)-3,G-6,6,6,'#e8483a');R(Math.round(b.x)-2,G-5,2,1,'#fff')}
  R(566,G-96,70,26,'#7a5a3a');R(568,G-94,32,22,'#8a6a4a');R(602,G-94,32,22,'#8a6a4a');R(560,G-36,92,36,'#7a5a3a');R(560,G-40,92,5,'#d8d0c0');R(570,G-34,38,32,'#555a6a');R(574,G-28,30,18,Math.floor(T*3)%2?'#3a2a2a':'#4a2a1a');R(574,G-30,30,2,'#aab');R(612,G-44,34,4,'#222');R(618,G-47,8,3,'#e04a4a');R(632,G-47,8,3,'#e04a4a');R(660,G-90,34,90,'#d8dce8');R(662,G-50,2,10,'#889');R(662,G-84,2,16,'#889');R(600,G-52,22,6,'#c8a068');txt('KÜCHE',610,G-102,'#5a3a24',8);R(0,G-92,6,92,'#6a4a2a')}}
function floorDet(s,x,y,w){for(let i=0;i<w;i+=40){const v=hs(Math.floor((s.x+i)/40)+5);
 if(v>.75){F(x+i+4,y+3,10,1,'#2a2640');F(x+i+9,y+4,6,1,'#2a2640');F(x+i+12,y+5,3,2,'#2a2640')}
 else if(v<.12){F(x+i+4,y+9,16,7,'#2a2640');for(let k=0;k<4;k++)F(x+i+6+k*4,y+10,1,5,'#4a4568')}
 else if(v<.2)F(x+i+8,y-2,6,2,'#e8e0c8');
 if(i%80==0)F(x+i,y+24,22,2,'#c8b84a')}
 F(x,y,w,2,'#b0a8d0')}
function drawFG(){if(L.th!=1)return;for(let x=100;x<L.w;x+=260){const rx=Math.round(x-cam);F(rx-30,G-1,64,2,'rgba(255,200,100,.12)');F(rx-18,G+1,40,2,'rgba(255,200,100,.18)');F(rx-6,G+3,14,2,'rgba(255,215,130,.3)')}
 for(let x=180;x<L.w;x+=310){const rx=Math.round(x-cam*1.08);F(rx,G+18,5,24,'#0a0820');F(rx,G+18,5,3,'#3a3558')}}
function drawRain(){c.fillStyle='rgba(150,170,230,.45)';for(let i=0;i<36;i++){const x=(hs(i+3)*(W+40)-T*30+(W+40)*10)%(W+40),y=(hs(i+9)*H+T*230)%H;c.fillRect(Math.round(x),Math.round(y),1,4)}}
function drawSolid(s){const x=Math.round(s.x-cam),y=Math.round(s.y),w=s.w,h=s.h,th=L.th;
 if(x>W||x+w<0)return;if(s.t=='c'||s.t=='r'||s.t=='x')F(x-1,y+h,w+2,2,'rgba(0,0,0,.35)');
 if(s.t=='f'){if(s.h>50){F(x,y,w,h,th==0?'#8f7f6a':th==1?'#4a4568':th==4?'#6a6a72':'#8a5a3a');F(x,y,w,6,th==0?'#b5a58e':th==1?'#8c87a8':th==4?'#9a9aa4':'#b57a4a');for(let i=0;i<w;i+=24){F(x+i,y+6,1,h,'rgba(0,0,0,.18)')}F(x,y+30,w,1,'rgba(0,0,0,.15)');if(th==1)floorDet(s,x,y,w);if(th==0){for(let i=0;i<w;i+=30){const v=hs(Math.floor((s.x+i)/30)+2);if(v>.8)F(x+i+3,y+9,9,2,'#6e5f4c');if(v<.1)F(x+i,y+1,14,3,'#a09076')}F(x,y+14,w,1,'rgba(0,0,0,.12)')}}
  else{if(th==1){F(x,y,w,h,'#6a6a7a');F(x,y,w,3,'#e8963a');for(let i=4;i<w-3;i+=8)F(x+i,y+3,2,h-3,'#4a4a5a')}else{F(x,y,w,h,'#6a5a8a');F(x,y,w,3,'#a898d0');F(x,y+h-2,w,2,'#3a2e5a')}}}
 else if(s.t=='c'){F(x,y,w,h,'#a0702f');F(x,y,w,2,'#c89050');F(x+2,y+2,w-4,2,'#7a5020');for(let i=0;i<w-4;i++)F(x+2+i,y+2+Math.floor(i*(h-4)/(w-4)),2,2,'#7a5020');F(x,y+h-2,w,2,'#6a4818')}
 else if(s.t=='r'){F(x,y,w,h,'#8a8a96');F(x,y,w,3,'#bcbcc8');F(x+2,y+h/2,w-4,2,'#5a5a66');for(let j=0;j<5;j++){F(x+4+j*13,y+5,9,h/2-7,['#e04a4a','#4aa0e0','#f0c040','#5ac06a','#c070d0'][j]);F(x+4+j*13,y+h/2+4,9,h/2-8,['#4aa0e0','#f0c040','#5ac06a','#c070d0','#e04a4a'][j])}}
 else if(s.t=='car'){const cc=['#3a6aa0','#a03a3a','#4a7a4a'][s.rg];F(x,y+10,w,h-10,cc);F(x+10,y,w-22,12,cc);F(x+13,y+2,10,7,'#9ad');F(x+27,y+2,10,7,'#9ad');F(x,y+10,w,2,'rgba(255,255,255,.25)');F(x+4,y+h-7,10,7,'#111');F(x+w-14,y+h-7,10,7,'#111');F(x+w-4,y+13,3,3,'#ffe9a0');F(x,y+13,2,3,'#d33')}
 else if(s.t=='b'){for(let i=0;i<h;i+=6)F(x,y+i,w,3,i%12?'#e8e8e8':'#d33');F(x-2,y-3,w+4,3,Math.floor(T*3)%2?'#ffb030':'#6a4a18')}
 else if(s.t=='x'){F(x,y,w,h,'#d9a066');F(x,y,w,2,'#f0c088');F(x,y+h-2,w,2,'#a07040');for(let i=10;i<h;i+=22){F(x+2,i+y-8,w-4,2,'#a07040');F(x+w/2-2,y+i-4,3,6,'#8a5a30')}F(x+3,y+4,4,1,'#6a4020')}
 else if(s.t=='g'){F(x,y,w,h,'#555a6a');for(let i=0;i<h;i+=12)F(x,y+i,w,6,i%24?'#f0c040':'#333');F(x,y,w,2,'#9aa')}
 else if(s.t=='m'){F(x,y,w,h,'#4a3a6a');F(x,y,w,3,'#8a7ac0');for(let i=6;i<w-4;i+=14)F(x+i,y+6,4,3,(Math.floor(T*4)+i)%2?'#ffe08a':'#7a6a40')}}
function drawItems(){for(const o of L.it){const x=Math.round(o.x-cam);
 if(o.t=='door'){F(x-2,o.y-2,o.w+4,o.h+2,'#3a2414');F(x,o.y,o.w,o.h,L.th==0?'#2b3a6b':'#7a4a2a');if(L.th==0){F(x+3,o.y+3,o.w-6,o.h-10,'#4a5a98');F(x+4,o.y+4,4,8,'rgba(255,255,255,.3)')}else{F(x+4,o.y+6,o.w-8,12,'#ffd77a')}F(x+o.w-7,o.y+o.h/2,3,4,'#e8c040');if(o.lk&&!L.unl)F(x+o.w/2-4,o.y+o.h/2-6,8,8,'#e83a4a');if(o.op){F(x,o.y,o.w,o.h,'#ffcf6b');F(x,o.y,7,o.h,'#3a2414');F(x+o.w-4,o.y,4,o.h,'#8a6a3a')}}
 if(o.t=='lever'){F(x,o.y+14,o.w,10,'#555a6a');F(x+8,o.y+(o.on?12:2),4,o.on?4:14,'#999');F(x+6,o.y+(o.on?12:0),8,4,o.on?'#5ae07a':'#e05a5a')}}
 for(const k of L.cp){const x=Math.round(k.x-cam);F(x,G-30,2,30,'#ccc');F(x+2,G-30,10,7,k.got?'#5ae07a':'#e0a040')}
 for(const s of L.st)if(!s.got){const x=Math.round(s.x-cam),b=Math.round(Math.sin(T*3+s.x)*2);F(x-1,s.y-5+b,3,11,'#ffe08a');F(x-5,s.y-1+b,11,3,'#ffe08a');F(x-3,s.y-3+b,7,7,'#fff3b0')}}
function drawCat(){const q=L.cat,x=Math.round(q.x-cam),y=Math.round(q.y);c.save();c.translate(x+8,y);c.scale(q.f,1);
 const hp=q.pet>0,w=Math.round(Math.sin(T*(hp?14:4))*(hp?3:2)),bl=Math.floor(T*1.2)%5==0,tw=Math.floor(T*.7)%4==0&&Math.floor(T*10)%2?1:0,hy=(q.pet>0?1:0)+(q.eat?4+Math.floor(T*4)%2:0);if(q.sit&&!hp){F(-7,1,11,9,'#8d93a0');F(-7,1,11,2,'#b4bac6');F(-4,3,2,6,'#5d6370');F(2,5,3,5,'#b4bac6');F(1,-5,8,8,'#8d93a0');F(1,-8+tw,2,3,'#8d93a0');F(7,-8,2,3,'#8d93a0');F(2,-7,1,2,'#d89aa8');if(bl)F(4,-2,4,1,'#222');else{F(4,-3,1,2,'#d6e04a');F(7,-3,1,2,'#d6e04a')}F(5,0,2,1,'#f08a9a');F(-10,7+w,4,3,'#5d6370');F(-10,9,2,1,'#c9ced8');c.restore();return}
 F(-8,3,16,7,'#8d93a0');F(-8,3,16,2,'#b4bac6');F(-5,5,2,5,'#5d6370');F(1,5,2,5,'#5d6370');F(-7+(q.st?Math.floor(T*8)%2:0),9,3,2,'#5d6370');F(4-(q.st?Math.floor(T*8)%2:0),9,3,2,'#5d6370');
 F(-11,-1+w,3,8,'#8d93a0');F(-11,-2+w,3,2,'#c9ced8');
 F(5,-3+hy,8,8,'#8d93a0');F(5,-6+hy,2,3,'#8d93a0');F(11,-6+hy+tw,2,3,'#8d93a0');F(6,-5+hy,0,0,'#f0a');
 if(bl||hp)F(8,0,3,1,'#222');else{F(8,-1,1,2,'#d6e04a');F(11,-1,1,2,'#d6e04a')}F(10,2,2,1,'#f08a9a');c.restore();
 if(hp)for(let i=0;i<2;i++)F(x+4+i*8,y-10-Math.floor(T*10)%4,3,3,'#ff6b8a')}
function drawAy(){const q=p,sx=Math.round(q.x+q.w/2-cam),sy=Math.round(q.y);if(S=='RESP'&&RS>.05&&RS<.35)return;if(q.inv>0&&Math.floor(T*14)%2)return;
 const walking=q.on&&Math.abs(q.vx)>10,run=Math.abs(q.vx)>95,ph=Math.floor(T*(run?16:10))%4,th=L.th,co=th==0?'#2f6fb5':'#6a4fb0',pa='#2b2b4a',sk='#f2c9a0',hr='#3a2418';
 if(q.on)F(sx-5,sy+22,10,2,'rgba(0,0,0,.3)');
 c.save();c.translate(sx,sy+22);c.scale(q.f,(q.use>0&&L.cat)?.72:q.land>0?.85:1);if(S=='OVER')c.rotate(-1.4*q.f);c.translate(0,-22);
 const bob=(!walking&&q.on&&!q.cel)?Math.floor(T*1.6)%2:0,cel=q.cel?Math.abs(Math.sin(T*6))*-3:0;c.translate(0,cel);
 if(!q.on){F(-4,16,3,4,pa);F(1,q.vy<0?15:17,3,4,pa);F(-4,20,4,2,'#222');F(1,q.vy<0?19:21,4,2,'#222')}
 else{const k2=run?2:1,a=walking?(ph==1?2:ph==3?-1:0)*k2:0,b=walking?(ph==3?2:ph==1?-1:0)*k2:0;F(-4+a,16,3,4,pa);F(1+b,16,3,4,pa);F(-4+a,20,4,2,'#222');F(1+b,20,4,2,'#222')}
 c.translate(0,bob);
 F(-6,8,12,9,'#14102a');F(-5,9,10,7,co);if(th==0)F(-3,10,6,6,'#f5f5f5');else{F(1,11,1,3,'#ffe08a');F(2,11,2,1,'#ffe08a');F(2,13,2,1,'#ffe08a')}
 const sw=walking?(ph<2?1:-1):0;
 if(S=='INTRO'&&IN.st>0&&IN.st<3){F(2,5,3,6,co);F(3,2,4,6,'#1a2250');F(4,3,2,3,'#7ad')}else if(S=='INTRO'&&IN.st==3){F(0,12,3,4,co);F(1,15,2,2,sk)}else if(q.inv>.85){F(-7,5,2,7,co);F(5,5,2,7,co)}else if(q.cel){F(-7,2,2,8,co);F(5,2,2,8,co)}
 else if(q.atk>0){F(2,11,9,3,co);F(10,10,4,4,sk);F(15,7,2,12,'rgba(255,255,255,.6)');F(17,9,1,8,'rgba(255,255,255,.4)')}
 else if(q.use>0){F(2,11,6,3,co);F(7,11,3,3,sk)}
 else if(!q.on){F(2,q.vy<0?5:8,2,5,co);F(-6,q.vy<0?5:8,2,5,co)}
 else{F(-1+sw,10,2,6,co);F(-1-sw,10,2,6,'#4a3a8a')}
 F(-9,-1,15,11,'#14102a');F(-5,0,10,3,hr);F(-3,0,4,1,'#6a4a38');F(-5,3,2,5,hr);F(-8,2,3,6,hr);F(-4,3,8,6,sk);F(1,5,2,2,'#222');F(2,7,2,1,'#e89a8a');F(-5,0,10,1,'#5a3a2a');if(q.inv>.85)F(0,4,4,1,'#c33');
 c.restore()}
function hrt(x,y,col){F(x-1,y-1,12,14,'#0a0820');for(const r of [[0,0,2,2],[3,0,2,2],[0,2,5,2],[1,4,3,1],[2,5,1,1]])F(x+r[0]*2,y+r[1]*2,r[2]*2,r[3]*2,col)}
function tg(t,wx,top,col){c.font='bold 7px monospace';c.textAlign='center';const w=t.length*5+8,x=Math.round(wx-cam),y=Math.round(top)-12;F(x-Math.round(w/2),y,w,9,'rgba(8,6,30,.7)');c.fillStyle=col;c.fillText(t,x,y+7)}
function tags(){if(L.cat&&!L.pt){const by=Math.round(Math.sin(T*5)*2),ax=Math.round(L.cat.x+8-cam),ay=L.cat.y-24+by;F(ax-4,ay,9,2,'#ffe08a');F(ax-3,ay+2,7,2,'#ffe08a');F(ax-2,ay+4,5,2,'#ffe08a');F(ax-1,ay+6,3,2,'#ffe08a')}if(!(S=='RESP'&&RS>.05&&RS<.35))tg('AY',p.x+p.w/2,p.y,'#ffe08a');for(const e of L.en)if(e.k=='abi'&&!e.dead)tg('ABİ',e.x+e.w/2,e.y-6,'#ff9a7a');if(L.cat)tg('LUKA',L.cat.x+8,L.cat.y-4,'#cfd6e6')}
function drawEn(e){if(e.dead||e.st=='SLEEP')return;if(e.k=='boss'){drawBoss(e);return}if(e.k=='teyze'){drawTeyze(e);return}if(e.k=='bagger'){drawBagger(e);return}const sx=Math.round(e.x+e.w/2-cam),sy=Math.round(e.y+e.h),h=e.h,w=e.w/2,k=e.k;if(sx<-30||sx>W+30)return;
 const pl={cust:[['#7a4a2a','#c7a02a','#e06a8a','#3a2a1a','#d8d8e8'][e.v%5],['#d2503a','#3aa0d2','#7ac23a','#d29a3a','#a05ad2'][e.v%5],'#4a4a6a'],thug:['#15151f','#262634','#101018'],gun:['#2a1a1a','#3a2a3a','#12121a'],rush:['#3a1010','#7a1a1a','#101018'],def:['#10203a','#2a3a70','#101018'],abi:['#2a1a12','#3f7a5a','#5a4a3a']}[k];
 const fl=e.fl>0,gv=e.st=='GIVE',ph=Math.floor(T*(e.st=='CHASE'?14:8))%4,mv=(e.st=='PATROL'&&e.pz<=0&&k!='gun')||e.st=='CHASE'||e.st=='FLEE'||(e.st=='RUSH'&&e.ph==1);
 if(e.st!='DIE')F(sx-Math.round(w)-1,sy,e.w+2,2,'rgba(0,0,0,.3)');c.save();c.translate(sx,sy-(e.dl.st==1?Math.floor(T*8)%2:0));c.scale(e.f,gv?.75:1);if(e.st=='DIE')c.rotate(-1.3*(1-e.t/.5));if(e.st=='RUSH'&&e.ph==0)c.translate(-2,0);if(!mv&&e.st=='PATROL')c.translate(Math.floor(T*1.6+e.v)%2,0);if(e.st=='DIE')c.globalAlpha=Math.max(0,e.t/.5);
 const bc=fl?'#fff':pl[1],a=mv?(ph==1?2:ph==3?-1:0):0,b=mv?(ph==3?2:ph==1?-1:0):0;
 F(-w+1+a,-6,3,6,pl[2]);F(w-4+b,-6,3,6,pl[2]);F(-w+1+a,-2,4,2,'#222');F(w-4+b,-2,4,2,'#222');F(-w-1,-h+7,e.w+2,h-12,'#14102a');F(-6,-h-1,12,10,'#14102a');F(-w,-h+8,e.w,h-14,bc);
 if(k=='thug'){F(-w,-h+8,e.w,3,'#8a2a2a');F(-w+1,-h+16,e.w-2,2,'#34344a')}
 F(-5,-h,10,8,fl?'#fff':'#e8b890');F(-5,-h,10,k=='thug'?4:3,fl?'#fff':pl[0]);if(k=='thug')F(-6,-h+3,12,2,'#3a3a4a');if(k=='abi')F(-4,-h+5,9,4,pl[0]);
 F(1,-h+4,2,2,'#222');F(0,-h+3,4,1,'#222');
 if(k=='gun'){const aim=e.st=='AIM';F(w-2,-h+9,3,aim?3:6,bc);F(w,-h+(aim?10:14),9,3,'#1a1a20');F(w+7,-h+(aim?9:13),2,2,aim&&Math.floor(T*14)%2?'#ff4a4a':'#1a1a20')}else if(e.st=='TALK'&&k!='cust'){F(w-2,-h+6,3,6,bc);F(w-1,-h+3,4,4,'#e8b890')}else if(e.st=='ATTACK'){if(e.t>.2)F(w-2,-h+2,3,7,bc);else{F(w-1,-h+10,10,3,bc);F(w+8,-h+9,4,5,'#e8b890')}}else if(e.st=='BLOCK'){F(w-5,-h+8,9,12,'#9aa8c8');F(w-4,-h+9,7,10,'#c8d4ec')}else if(e.st=='RUSH'){F(w-4,-h+10,3,8,bc);F(-w-4,-h+10,3,8,bc)}else F(w-2,-h+9,3,7,bc);
 if(k=='cust')F(w,-h+14,7,5,'#a07030');
 c.restore();c.globalAlpha=1;
 if(e.st=='NOTICE'||(e.st=='RUSH'&&e.ph==0)){F(sx-1,sy-h-9,2,5,'#ffe08a');F(sx-1,sy-h-3,2,2,'#ffe08a')}if(e.st=='HIT'||gv)for(let i=0;i<3;i++)F(sx-8+i*7+Math.round(Math.sin(T*8+i)*2),sy-h-6,3,3,'#ffe08a');
 if(k=='abi'&&!gv)for(let i=0;i<e.mx;i++)F(sx-e.mx*3+i*6,sy-h-18,5,3,i<e.hp?'#e83a4a':'#3a2a50')}
function drawUI(){{const bo=L.en.find(isB);if(bo&&L.fight&&!bo.dead){const bw=200,bx=(W-bw)/2;F(bx-2,30,bw+4,10,'#0a0820');F(bx,32,bw,6,'#3a1a2a');F(bx,32,Math.max(0,Math.round(bw*bo.hp/bo.mx)),6,bo.p2?'#ff4a2a':'#e0a030');F(Math.round(bx+bw/2)-1,32,2,6,'#0a0820');txt(({teyze:'TEYZE',bagger:'BAGGER'})[bo.k]||'MARKTLEITER',W/2,28,'#fff',7,1)}}for(let i=0;i<3;i++)hrt(8+i*15,6,i<p.hp?'#e83a4a':'#3a3050');txt(L.d.n,W/2,10,'#ffe08a',7,1);txt(OB(),W/2,20,'#cfd6e6',7,1);if(HAS)txt(HAS=='food'?'Katzenfutter dabei':'Wasser dabei',72,46,'#cfd6e6',7,1);c.textAlign='center';c.font='bold 9px monospace';
 const pill=(t,y,col)=>{const w=t.length*5.6+14;F(Math.round(W/2-w/2),y-9,Math.round(w),14,'rgba(10,6,30,.7)');c.fillStyle=col||'#fff';c.fillText(t,W/2,y+1)};
 if(L.msg.t>0&&L.msg.s)pill(L.msg.s,58,'#ffe08a');else if(L.ttl>0&&L.i)pill(L.d.n,58,'#ffe08a');
 else for(const t of L.d.tips)if(p.x>=t[0]&&p.x<t[1]&&!p.near&&!L.abiDown&&!(L.i==4&&L.fed&&L.watered)){pill(t[2],58);break}
 if(L.i==1){c.textAlign='left';c.fillStyle='#ffe08a';c.fillText('★ '+L.n+'/'+L.st.length,8,34)}
 c.textAlign='center';
 if(p.near&&S=='PLAY'){c.save();c.translate(0,OY);const o=p.near,b=ibox(o),lb=LAB(o),x=(b.x+b.w/2)-cam,y=b.y-6,w=lb.length*5.6+10;F(Math.round(x-w/2),Math.round(y-12),Math.round(w),14,'#ffe08a');c.fillStyle='#1a1040';c.fillText(lb,x,y-2);c.restore()}
 $('k-use').classList.toggle('hint',!!(p.near&&S=='PLAY'));$('k-use').classList.toggle('off',!p.near);BTN.a.classList.toggle('cd',p.cd>.05&&S=='PLAY')}
function draw(){c.setTransform(PX,0,0,PX,0,0);c.imageSmoothingEnabled=false;if(S=='PIZZA'){drawPizza();return}c.save();c.translate(SH>0?(Math.floor(T*60)%2?1:-1)*Math.min(2,Math.ceil(SH*10)):0,OY);drawBG();for(const s of L.s)if(!s.dead)drawSolid(s);drawItems();if(L.cat)drawCat();for(const e of L.en)drawEn(e);for(const h of L.hz)drawHZ(h);for(const b of L.bl)drawBullet(b);for(const w of L.wv)drawWV(w);for(const k of L.pk)if(!k.got)hrt(Math.round(k.x-cam)-5,Math.round(G-36+Math.sin(T*4)*2),'#ff5a6a');drawAy();drawFG();tags();for(const e of L.en){drawBub(e);drawGunLine(e)}if(SY&&SY.t>0)bub(SY,p.x+6,p.y-14);
 for(const q of P)F(Math.round(q.x-cam),Math.round(q.y),3,3,q.c);
 c.restore();if(L.th==1)drawRain();if(L.th==3){F(0,0,W,H,'rgba(255,170,80,'+(.07*(1-L.lt)).toFixed(3)+')');if(L.lt>.01)F(0,0,W,H,'rgba(6,8,34,'+(.55*L.lt).toFixed(2)+')')};if(p.inv>.9)F(0,0,W,H,'rgba(255,40,40,.2)');
 if(S=='INTRO')drawIntro();else if(S!='MENU')drawUI();
 if(S=='TRANS'){const a=TR.t<.45?TR.t/.45:Math.max(0,1-(TR.t-.45)/.45);F(0,0,W,H,`rgba(5,3,20,${a})`)}
 if(S=='RESP'){const a=RS<.2?RS/.2:Math.max(0,1-(RS-.2)/.2);F(0,0,W,H,`rgba(5,3,20,${a})`)}}
function bub(D,cx,ty){if(!D.ln){D.ln=wrap(D.txt,18);D.tl=D.tr?wrap(D.tr,24):[]}
 c.font='bold 7px monospace';let mw=0;for(const l of D.ln)mw=Math.max(mw,c.measureText(l).width);
 const w=Math.round(mw)+8,h=D.ln.length*9+6,ex=cx-cam,bx=Math.round(Math.max(2,Math.min(W-2-w,ex-w/2))),by=Math.round(ty-h),tx=Math.round(Math.max(bx+4,Math.min(bx+w-5,ex)));
 F(bx-1,by-1,w+2,h+2,'#0a0820');F(bx,by,w,h,'#f4ecd0');F(tx-3,by+h,7,1,'#0a0820');F(tx-2,by+h,5,2,'#f4ecd0');F(tx-3,by+h+1,1,1,'#0a0820');F(tx+3,by+h+1,1,1,'#0a0820');F(tx-1,by+h+2,3,2,'#f4ecd0');F(tx-2,by+h+2,1,1,'#0a0820');F(tx+2,by+h+2,1,1,'#0a0820');F(tx-1,by+h+4,3,1,'#0a0820');
 c.textAlign='left';c.fillStyle='#1a1040';c.font='bold 7px monospace';D.ln.forEach((l,i)=>c.fillText(l,bx+4,by+8+i*9))}
function drawBub(e){const D=e.dl;if(D.st!=1||e.dead||e.st=='HIT')return;bub(D,e.x+e.w/2,e.y-(e.k=='abi'?30:12))}
function say(t){SY={txt:t,tr:'',st:1,t:3,ln:null,tl:null}}
function can(o){const t=o.t,ct=L.cat;return t=='cat'?ct.m==0&&ct.pet<=0&&ct.cd<=0:t=='cupboard'?HAS!='food':t=='sink'?HAS!='water':t=='fbowl'?HAS=='food'&&L.fb!=1:t=='wbowl'?HAS=='water'&&L.wb!=1:t=='ball'?!L.ball.mv:true}
function LAB(o){return({door:o.lk?'ZIMMER BETRETEN':'TÜR ÖFFNEN',cat:'Luka streicheln',cupboard:'Futter nehmen',sink:'Wasser schöpfen',fbowl:'Futter geben',wbowl:'Wasser auffüllen',light:L.dark?'Licht an':'Licht aus',window:L.wo?'Fenster schließen':'Fenster öffnen',pc:'Computer benutzen',book:'Buch ansehen',ball:'Mit Luka spielen',bed:'Schlafen gehen',pizza:'Pizza backen'})[o.t]||'Interagieren'}
function OB(){return L.fight&&!L.bossDown?(L.i==0?'Besiege den Marktleiter!':'Besiege den Bagger!'):L.i==3&&L.abiDown?'Geh in dein Zimmer':L.i==4&&L.pt?'Kümmere dich um Luka oder geh schlafen':L.d.ob}
function fireGun(e){L.bl.push({x:e.x+(e.f>0?e.w:-6),y:e.ty,vx:e.f*175,t:0});burst(e.x+e.w/2+e.f*12,e.ty,5,'#ffd24a');sfx(300,.12,'square',-200,.05);SH=Math.max(SH,.08)}
function drawWV(w){const x=Math.round(w.x-cam);if(w.k=='rock'){if(w.t<=.8){F(x-2,G-2,w.w+4,2,Math.floor(T*10)%2?'#ff4a4a':'#8a2a2a');F(x+3,G-4,w.w-6,2,'rgba(0,0,0,.3)')}else{const y=Math.round(w.y);if(w.pot){F(x+1,y+5,12,9,'#c8683a');F(x,y+4,14,3,'#e8885a');F(x+4,y,6,5,'#3a8a3a')}else{F(x+2,y,10,14,'#7a7a86');F(x,y+3,14,9,'#8a8a96');F(x+3,y+2,4,3,'#aaa')}}return}if(w.k=='slip'){const y=Math.round(w.y),r=Math.floor(T*14)%2;F(x,y,10,r?5:6,'#e86a8a');F(x,y+(r?3:4),10,2,'#8a3a4a');F(x+7,y-1,2,3,'#f4a0b8');return}if(w.k=='cart'){F(x,G-16,22,2,'#aab');F(x,G-14,22,9,'rgba(200,200,225,.5)');for(let i=0;i<22;i+=4)F(x+i,G-14,1,9,'#99a');F(x-4,G-20,4,2,'#aab');F(x+3,G-5,4,4,'#222');F(x+15,G-5,4,4,'#222')}else{F(x,G-w.h,w.w,w.h,'rgba(255,210,90,.9)');F(x+3,G-w.h+4,w.w-6,w.h-4,'#fff0b0');F(x,G-2,w.w,2,'#c8821a');F(x+w.w/2-2,G-w.h-3,4,3,'#ffd24a')}}
function drawBagger(e){const sx=Math.round(e.x+e.w/2-cam),sy=Math.round(e.y+e.h),st=e.st,at=e.at,p2=e.p2,fl=e.fl>0||(st=='TRANS'&&Math.floor(T*12)%2);
 F(sx-36,G,72,3,'rgba(0,0,0,.35)');
 c.save();c.translate(sx+Math.round(st=='ACT'&&at=='rocks'?Math.sin(T*50):e.mv?Math.sin(T*40)*.5:0),sy);c.scale(e.f,1);if(st=='DEAD')c.globalAlpha=Math.max(0,e.t/2.2);
 const ol='#14102a',y1=fl?'#fff':p2?'#e86a20':'#e8b020',y2=fl?'#fff':p2?'#b84a10':'#b88a10',dk='#3a3a44',ln=(x0,y0,x1,y1_,w,col)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1_-y0),1);for(let i=0;i<=n;i++)F(Math.round(x0+(x1-x0)*i/n-w/2),Math.round(y0+(y1_-y0)*i/n-w/2),w,w,col)};
 F(-34,-16,68,16,ol);F(-33,-15,66,14,dk);for(let i=-30;i<30;i+=8)F(i+(e.mv?Math.floor(T*8)%8:0)%8,-12,4,8,'#2a2a34');F(-33,-15,66,3,'#5a5a66');disc(-26,-8,6,'#555');disc(26,-8,6,'#555');disc(-26,-8,2,'#999');disc(26,-8,2,'#999');
 F(-32,-35,64,21,ol);F(-31,-34,62,19,y1);F(-31,-21,62,5,y2);for(let i=-28;i<28;i+=14)F(i,-34,6,19,y2);
 F(-32,-64,28,30,ol);F(-31,-63,26,28,y1);F(-28,-60,20,16,'#9ad');F(-28,-60,20,3,'#cfeeff');F(-31,-37,26,3,y2);
 F(-22,-54,8,9,'#e8b890');F(-23,-58,10,5,'#e8c020');F(-22,-52,6,1,'#222');F(-18,-50,2,2,'#222');F(-21,-47,5,1,'#8a3a3a');
 F(-27,-72,4,10,dk);F(-26,-76-Math.floor(T*6)%6,4,4,'rgba(200,200,210,.5)');
 F(-4,-46,34,13,ol);F(-3,-45,32,11,st=='REC'&&Math.floor(T*6)%2?'#e04a2a':y1);F(26,-42,4,5,'#ffe9a0');
 const A=(st=='WIND'||st=='ACT')?at:null,P=A=='rocks'?[[10,-46],[34,-92],[56,-90]]:A=='ball'?[[10,-46],[36,-100],[54,-110]]:A=='dig'?(st=='WIND'?[[10,-46],[30,-96],[44,-104]]:[[10,-46],[44,-36],[60,-4]]):st=='REC'?[[10,-46],[42,-30],[56,-8]]:[[10,-46],[40,-60],[58,-26]];
 ln(P[0][0],P[0][1],P[1][0],P[1][1],8,ol);ln(P[0][0],P[0][1],P[1][0],P[1][1],5,y1);ln(P[1][0],P[1][1],P[2][0],P[2][1],6,ol);ln(P[1][0],P[1][1],P[2][0],P[2][1],3,y2);
 const bx=P[2][0],by=P[2][1];F(bx-7,by,18,13,ol);F(bx-6,by+1,16,11,dk);F(bx+8,by+6,5,5,'#8a8a96');F(bx-6,by+10,16,2,'#aaa');if(A=='rocks'&&Math.floor(T*14)%2)F(bx-2,by+12,5,5,'#7a7a86');
 if(st=='REC'){for(let i=0;i<3;i++)F(-6+i*10,Math.round(-54-((T*30+i*9)%18)),5,5,'rgba(255,255,255,.65)');F(-30,-68,4,4,Math.floor(T*6)%2?'#ff3a2a':'#6a1a1a')}
 if(st=='DEAD')for(let i=0;i<6;i++)F(Math.round(Math.sin(T*9+i*2)*30)-4,-30-Math.round(Math.abs(Math.cos(T*7+i))*34),8,8,i%2?'#ff8a2a':'#ffd24a');
 c.restore();c.globalAlpha=1;
 if(st=='TRANS'||st=='REC')for(let i=0;i<3;i++)F(sx-9+i*7+Math.round(Math.sin(T*8+i)*2),Math.round(e.y)-18,3,3,'#ffe08a');
 if(e.dl.st==1&&st!='DEAD')bub(e.dl,e.x+e.w/2,e.y-80)}
function drawTeyze(e){const sx=Math.round(e.x+e.w/2-cam),sy=Math.round(e.y+e.h),st=e.st,at=e.at,fl=e.fl>0||(st=='TRANS'&&Math.floor(T*12)%2),p2=e.p2;
 const ph=Math.floor(T*(at=='rush'&&st=='ACT'?20:9))%4,mv=e.mv||(st=='ACT'&&at=='rush'),br=(st=='IDLE'||st=='REC')?Math.floor(T*2)%2:0,wd=st=='WIND',ac=st=='ACT';
 F(sx-14,G,28,3,'rgba(0,0,0,.35)');
 c.save();c.translate(sx,sy);c.scale(e.f,1);if(st=='DEAD'){c.globalAlpha=Math.max(0,e.t/2.2);c.rotate(-1.4*(1-e.t/2.2))}
 c.translate(ac&&at=='rush'?4:wd&&at=='rush'?-3:0,0);
 const ol='#14102a',sk=fl?'#fff':'#e8b890',sc=fl?'#fff':p2?'#c82a4a':'#a84a8a',ca=fl?'#fff':'#7a5a9a',sr=fl?'#fff':'#2a5a6a',a=mv?(ph==1?3:ph==3?-2:0):0,b=mv?(ph==3?3:ph==1?-2:0):0;
 F(-5+a,-3,6,3,'#3a2a2a');F(1+b,-3,6,3,'#3a2a2a');
 F(-12,-27,24,25,ol);F(-11,-26,22,23,sr);F(-11,-9,22,4,fl?'#fff':'#1a4050');F(-3,-24,2,12,'rgba(255,255,255,.15)');
 F(-11,-37+br,22,13,ol);F(-10,-36+br,20,12,ca);F(-2,-36+br,4,12,fl?'#fff':'#f0e0d0');F(5,-30+br,2,2,'#fff6c8');
 F(-8,-46+br,16,15,ol);F(-6,-43+br,12,11,sk);F(-8,-46+br,16,8,sc);F(-9,-41+br,4,15,sc);F(5,-41+br,4,15,sc);F(-6,-33+br,12,3,sc);F(-4,-45+br,2,2,'#fff6c8');F(2,-44+br,2,2,'#fff6c8');F(-7,-40+br,2,2,'#fff6c8');
 F(-5,-39+br,5,3,'#14102a');F(1,-39+br,5,3,'#14102a');F(-4,-38+br,3,1,'#9ad');F(2,-38+br,3,1,'#9ad');F(-5,-41+br,5,1,'#222');F(1,-41+br,5,1,'#222');F(0,-34+br,5,wd||ac?3:1,'#a03a4a');
 const arm=(x,y,w,h)=>{F(x-1,y-1,w+2,h+2,ol);F(x,y,w,h,ca)},hand=(x,y,w,h)=>{F(x-1,y-1,w+2,h+2,ol);F(x,y,w,h,sk)},bag=(x,y)=>{F(x-1,y-1,14,12,ol);F(x,y,12,10,'#8a5a2a');F(x+4,y+4,4,2,'#d8b030')};
 if(at=='bag'&&wd){arm(9,-56,4,20);bag(5,-68)}
 else if(at=='bag'&&ac){arm(10,-32,26,4);hand(34,-33,4,5);bag(34,-34)}
 else if(at=='terlik'&&wd){arm(9,-56,4,20);F(7,-62,10,5,'#e86a8a');F(7,-58,10,2,'#8a3a4a')}
 else if(at=='terlik'&&ac){arm(10,-34,16,4);hand(24,-35,4,5)}
 else if(at=='pin'&&wd){arm(9,-56,4,20);F(8,-66,4,16,'#d8b878')}
 else if(at=='pin'&&ac){const x=Math.round(Math.cos(T*20)*24);F(-32,-30,64,2,'rgba(255,255,255,.3)');arm(x>0?9:-13,-34,4,12);F(x-7,-32,14,4,'#d8b878');F(x-8,-33,2,6,'#a88848');F(x+6,-33,2,6,'#a88848')}
 else if(at=='guard'&&(wd||ac)){arm(9,-34,4,12);F(12,-46,4,26,ol);F(13,-45,2,24,'#c8ccd8');F(13,-45,1,24,'#fff')}
 else if(at=='rush'&&(wd||ac)){arm(-14,-34,4,14);arm(10,-34,4,14)}
 else if(st=='TRANS'){arm(9,-56,4,20);arm(-13,-56,4,20);hand(8,-60,6,5);hand(-14,-60,6,5)}
 else{arm(9,-34+br,4,14);hand(9,-21+br,4,3);bag(8,-19+br);arm(-13,-34+br,4,12)}
 if(p2)F(-14,-48+br,1,50,'rgba(255,60,40,.5)');
 c.restore();c.globalAlpha=1;
 if(st=='STAG'||st=='TRANS')for(let i=0;i<3;i++)F(sx-9+i*7+Math.round(Math.sin(T*8+i)*2),Math.round(e.y)-14,3,3,'#ffe08a');
 if(e.dl.st==1&&st!='DEAD')bub(e.dl,e.x+e.w/2,e.y-14)}
function drawBoss(e){const sx=Math.round(e.x+e.w/2-cam),sy=Math.round(e.y+e.h),st=e.st,at=e.at,W2=17;
 const fl=e.fl>0||(st=='TRANS'&&Math.floor(T*12)%2),ph=Math.floor(T*(st=='ACT'&&at=='charge'?18:8))%4,mv=e.mv||(st=='ACT'&&at=='charge'),p2=e.p2;
 F(sx-20,G,40,3,'rgba(0,0,0,.35)');if(e.at=='leap'&&(st=='WIND'||st=='ACT'))F(Math.round((st=='ACT'?e.lx:p.x)+6-cam)-18,G-2,36,3,'rgba(255,60,60,.7)');
 c.save();c.translate(sx,sy);c.scale(e.f,1);if(st=='DEAD'){c.globalAlpha=Math.max(0,e.t/2.2);c.rotate(-1.4*(1-e.t/2.2))}
 const lean=st=='ACT'&&at=='charge'?5:st=='WIND'&&at=='charge'?-3:0,crouch=(st=='WIND'&&(at=='leap'||at=='charge'))?5:0,br=(st=='IDLE'||st=='REC')?Math.floor(T*2)%2:0;
 const sk=fl?'#fff':p2?'#e07a68':'#e0a888',vs=fl?'#fff':p2?'#2a6a3a':'#2a7a4a',pa='#2a2a3a',ol='#14102a',a=mv?(ph==1?3:ph==3?-2:0):0,b=mv?(ph==3?3:ph==1?-2:0):0;
 c.translate(lean,crouch);
 F(-W2+2+a,-12,10,12-crouch,ol);F(W2-13+b,-12,10,12-crouch,ol);F(-W2+3+a,-12,8,12-crouch,pa);F(W2-12+b,-12,8,12-crouch,pa);F(-W2+1+a,-3,12,3,'#222');F(W2-13+b,-3,12,3,'#222');
 F(-W2-1,-40+br,36,30,ol);F(-W2,-39+br,34,28,vs);F(-7,-39+br,14,26,fl?'#fff':'#e8e8f0');F(-2,-37+br,4,17,'#c82a2a');F(7,-30+br,9,5,'#fff');F(8,-29+br,6,1,'#888');F(-W2,-14+br,34,3,'#3a2a1a');F(-1,-14+br,4,3,'#d8b030');
 const hy=-56+br;F(-10,hy-1,20,20,ol);F(-9,hy,18,18,sk);F(-9,hy,18,4,fl?'#fff':'#8a8a92');F(-9,hy+4,4,8,fl?'#fff':'#8a8a92');F(5,hy+4,4,8,fl?'#fff':'#8a8a92');
 F(0,hy+7,5,4,'#fff');F(2,hy+8,3,3,'#222');F(-6,hy+7,4,4,'#fff');F(-5,hy+8,3,3,'#222');F(-7,hy+5,8,2,'#222');F(1,hy+4,6,2,'#222');F(-3,hy+13,10,3,'#8a8a92');F(-1,hy+16,6,2,'#6a2a2a');
 if(p2){F(-9,hy-3,18,1,'rgba(255,60,40,.6)');F(-W2-3,-42+br,2,32,'rgba(255,60,40,.35)');F(W2+1,-42+br,2,32,'rgba(255,60,40,.35)')}
 const arm=(x,y,w,h)=>{F(x-1,y-1,w+2,h+2,ol);F(x,y,w,h,vs)},fist=(x,y,w,h)=>{F(x-1,y-1,w+2,h+2,ol);F(x,y,w,h,sk)};
 if(st=='WIND'&&at=='punch'){arm(14,-62,8,26);fist(13,-70,10,9)}
 else if(st=='ACT'&&at=='punch'){arm(15,-38,30,9);fist(44,-40,12,13)}
 else if(st=='WIND'&&at=='sweep'){arm(-30,-38,26,9);fist(-38,-40,10,12)}
 else if(st=='ACT'&&at=='sweep'){arm(14,-36,54,9);fist(66,-38,12,13);if(p2){arm(-70,-36,54,9);fist(-78,-38,12,13)}}
 else if((st=='WIND'||st=='ACT')&&at=='slam'){if(st=='WIND'){arm(14,-70,8,32);fist(13,-78,10,9);arm(-22,-70,8,32);fist(-23,-78,10,9)}else{arm(14,-22,8,22);fist(14,-6,10,8);arm(-22,-22,8,22);fist(-24,-6,10,8)}}
 else if(at=='charge'&&(st=='WIND'||st=='ACT')){arm(-20,-34,8,22);arm(14,-36,24,9);fist(36,-38,10,12)}
 else if(at=='leap'&&(st=='WIND'||st=='ACT')){arm(14,-48,8,26);fist(14,-50,9,8);arm(-22,-48,8,26)}
 else if(at=='cart'&&(st=='WIND'||st=='ACT')){arm(14,-30,22,9);fist(34,-32,9,11)}
 else if(st=='TRANS'){arm(14,-62,8,24);fist(13,-70,10,9);arm(-22,-62,8,24);fist(-23,-70,10,9)}
 else if(st=='STAG'){arm(-26,-34,8,22);arm(14,-26,8,22);fist(14,-6,10,8)}
 else{arm(14,-36+br,8,24);fist(14,-14+br,10,9);arm(-22,-36+br,8,24)}
 c.restore();c.globalAlpha=1;
 if(st=='STAG'||st=='TRANS')for(let i=0;i<3;i++)F(sx-9+i*7+Math.round(Math.sin(T*8+i)*2),Math.round(e.y)-14,3,3,'#ffe08a');
 if(e.dl.st==1&&st!='DEAD')bub(e.dl,e.x+e.w/2,e.y-18)}
function drawBullet(b){const x=Math.round(b.x-cam),y=Math.round(b.y),d=Math.sign(b.vx);F(x-d*10,y,10,1,'rgba(255,200,80,.25)');F(x-d*5,y,5,1,'rgba(255,220,120,.5)');F(x,y-1,6,3,'#fff6d0');F(x+(d>0?3:0),y,3,1,'#ffb030')}
function drawHZ(h){if(h.k=='ball'){const bx=Math.round(h.x+h.w/2-cam),ax=Math.round(h.x0+h.w/2-cam),ay=G-150,tb=h.arm>0?1-h.arm/h.arm0:1,by=Math.round(G-120+(h.y+15-(G-120))*tb);if(h.arm>0&&Math.floor(T*10)%2)F(bx-1,G-2,3,2,'#ff4a4a');for(let i=0;i<=20;i++)F(Math.round(ax+(bx-ax)*i/20),Math.round(ay+(by-ay)*i/20),2,2,'#555');disc(bx,by,15,'#14102a');disc(bx,by,13,h.arm>0?'#7a4a3a':'#3a3a46');disc(bx-4,by-4,3,'#8a8a96');F(Math.round(h.x0-h.rg-cam),G+1,h.rg*2+h.w,2,'rgba(255,120,60,.4)');return}
 if(h.k=='bike'){const x=Math.round(h.x-cam),sg=Math.sin(L.t*h.sp+1.57)>0?1:-1;F(Math.round(h.x0-h.rg-cam),G+1,h.rg*2+h.w,2,'rgba(232,192,48,.35)');disc(x+7,G-7,7,'#14102a');disc(x+7,G-7,5,'#555');disc(x+27,G-7,7,'#14102a');disc(x+27,G-7,5,'#555');F(x+7,G-16,20,2,'#c8321e');F(x+14,G-24,8,10,'#3a6aa0');F(x+15,G-31,7,7,'#e8b890');F(x+(sg>0?19:14),G-20,8,2,'#3a6aa0');if(Math.floor(T*4)%2)F(x+(sg>0?29:3),G-30,3,3,'#ffe08a');return}
const cx=Math.round(h.x+h.w/2-cam);F(Math.round(h.x0-h.rg-cam),G+1,h.rg*2+h.w,2,'rgba(232,192,48,.45)');F(cx,G-112,1,h.y-(G-112),'#333');F(cx-2,G-115,5,3,Math.floor(T*4)%2?'#f33':'#600');const x=Math.round(h.x-cam);F(x,h.y,h.w,h.h,'#e8c030');for(let i=0;i<h.h;i+=8)F(x,h.y+i,h.w,3,'#222');F(x+h.w/2-1,h.y+h.h/2-3,2,5,'#222')}
function drawGunLine(e){if(e.k!='gun'||e.st!='AIM')return;const ty=Math.round(e.lk?e.ty:p.y+10),mx=e.x+e.w/2+e.f*(e.w/2+9),px=p.x+6,a=Math.min(mx,px),b=Math.max(mx,px);c.fillStyle=Math.floor(T*12)%2?'rgba(255,70,70,.8)':'rgba(255,70,70,.3)';for(let x=a;x<b;x+=8)c.fillRect(Math.round(x-cam),ty,3,1);F(Math.round(e.x+e.w/2-cam)-1,Math.round(e.y)-12,3,6,'#ff4a4a');F(Math.round(e.x+e.w/2-cam)-1,Math.round(e.y)-4,3,2,'#ff4a4a')}
// ---- GİRİŞ (TELEFON) ----
let IN={st:0,t:0,tw:0,rt:0};
const IL=[null,['ZEYNEP','„Ich bin schon zu Hause.“'],['AY','„Ich komme auch.“']];
function txt(t,x,y,col,sz,nc){c.font='bold '+sz+'px monospace';c.textAlign='center';c.fillStyle=col;c.fillText(t,Math.round(x-(nc?0:cam)),y)}
function introNext(){if(S!='INTRO')return;if(IN.st==0){IN.st=1;IN.tw=0;sfx(520,.1,'square');return}if(IN.st>2)return;if(IN.tw<IL[IN.st][1].length){IN.tw=99;return}IN.st++;IN.tw=0;IN.t=0;sfx(440,.06)}
function introUpd(d){IN.t+=d;if(IN.st==0){IN.rt-=d;if(IN.rt<=0){IN.rt=.9;sfx(880,.12,'square');sfx(1175,.12,'square',0,.025)}}else if(IN.st<3)IN.tw+=d*40;else if(IN.t>.9)endIntro()}
function endIntro(){if(S!='INTRO')return;S='PLAY';clearInput();L.msg={t:3.2,s:'Finde den Ausgang'};hideUI();last=0;acc=0}
function drawIntro(){if(IN.st>2)return;F(0,0,W,H,'rgba(8,6,30,.55)');
 const x=135+(IN.st==0?Math.round(Math.sin(T*40)*1.5):0),y=40,px=x+14,py=y+26,sp=IN.st==1&&Math.floor(T*8)%2;
 F(x-3,y-3,216,194,'#0a0820');F(x,y,210,188,'#3a4676');F(x+4,y+4,202,180,'#1a2250');F(x+90,y+1,30,3,'#0a0820');
 F(px-2,py-2,60,60,'#0a0820');F(px,py,56,56,'#2a3a6a');F(px+6,py+14,44,40,'#e8742a');F(px+14,py+18,28,26,'#f2c9a0');F(px+10,py+6,36,14,'#e8742a');F(px+6,py+14,8,36,'#e8742a');F(px+42,py+14,8,36,'#e8742a');F(px+12,py+6,32,4,'#f59a48');F(px+20,py+16,16,4,'#c8561a');
 F(px+18,py+26,5,5,'#222');F(px+33,py+26,5,5,'#222');F(px+19,py+26,2,2,'#fff');F(px+34,py+26,2,2,'#fff');F(px+15,py+34,5,3,'#f0a090');F(px+36,py+34,5,3,'#f0a090');F(px+24,py+38,8,sp?5:2,sp?'#8a2030':'#c0505a');F(px+10,py+50,36,6,'#2a9d8f');
 txt('ZEYNEP',px+28,py+76,'#ffe08a',9,1);
 if(IN.st==0){txt('ruft an'+'...'.slice(0,1+Math.floor(T*3)%3),px+28,py+90,'#cfd6e6',7,1);F(x+100,y+80,90,26,'#14501f');F(x+102,y+82,86,22,'#3aba5c');txt('ANNEHMEN',x+145,y+98,'#fff',9,1);txt('Tippen',x+145,y+130,'#8a96c0',7,1)}
 else{const m=IL[IN.st],ln=wrap(m[1],19);F(x+84,y+22,118,150,'#f4ecd0');F(x+84,y+22,118,12,IN.st==1?'#c8561a':'#3a4aa0');txt(m[0],x+143,y+32,'#fff',8,1);
  let r=Math.floor(IN.tw);c.textAlign='left';c.font='bold 9px monospace';c.fillStyle='#1a1040';
  ln.forEach((l,i)=>{c.fillText(l.slice(0,Math.max(0,r)),x+89,y+54+i*12);r-=l.length+1});
  if(Math.floor(T*2)%2&&IN.tw>=m[1].length)txt('▼ WEITER',x+143,y+164,'#3a2a7a',7,1)}}
// ---- PIZZA-MINISPIEL (Bestellung → Teig → Soße → Käse → Belag → Backen → Servieren) ----
const TP=[['Salami','#d84a3a'],['Pilze','#e8d8b8'],['Oliven','#2a2a3a'],['Paprika','#4aa84a']],PCX=150,PCY=138,PR=70;
let PZ=null;const PCELLS=[];for(let y=-PR+4;y<PR-4;y+=8)for(let x=-PR+4;x<PR-4;x+=8)if(x*x+y*y<(PR-8)*(PR-8))PCELLS.push([x,y]);
function disc(cx,cy,r,col){c.fillStyle=col;for(let y=-r;y<=r;y++){const h=Math.floor(Math.sqrt(r*r-y*y));c.fillRect(cx-h,cy+y,h*2,1)}}
function startPizza(){S='PIZZA';clearInput();$('ctl').style.visibility='hidden';pz.style.display='none';PZ={n:0,sc:[],btns:[],dn:0};pzOrder()}
function pzOrder(){const a=[0,1,2,3].sort(()=>Math.random()-.5);PZ.o=a.slice(0,PZ.n==2?3:2);PZ.st='order';PZ.t=0;PZ.dough=0;PZ.sa=new Set();PZ.ch=new Set();PZ.tops=[];PZ.sel=0;PZ.bk=0;PZ.q=0;PZ.dn=0}
function exitPizza(){if(S!='PIZZA')return;S='PLAY';PZ=null;$('ctl').style.visibility='';pz.style.display='block';pz.textContent='❚❚';clearInput();L.pizza=1;say('Das war lecker!');last=0;acc=0}
function pzUpd(dt){if(!PZ)return;PZ.t+=dt;const n=PCELLS.length;
 if(PZ.st=='sauce'&&PZ.sa.size/n>=.8){PZ.st='cheese';PZ.t=0;sfx(600,.1,'triangle',200,.04)}
 else if(PZ.st=='cheese'&&PZ.ch.size/n>=.8){PZ.st='top';PZ.t=0;sfx(600,.1,'triangle',200,.04)}
 else if(PZ.st=='bake'){PZ.bk+=dt/3.6;if(PZ.bk>=1){PZ.bk=1;pzBakeDone()}}}
function pzBakeDone(){if(PZ.st!='bake')return;const b=PZ.bk;PZ.q=b>=.55&&b<=.75?1:b>=.42&&b<=.88?.6:.2;pzServe()}
function pzServe(){const need=PZ.o,cnt=[0,0,0,0],n=PCELLS.length;for(const t of PZ.tops)cnt[t.i]++;let ts=0;for(const i of need)ts+=Math.min(1,cnt[i]/2);ts/=need.length;let wrong=0;for(let i=0;i<4;i++)if(!need.includes(i))wrong+=cnt[i];ts=Math.max(0,ts-wrong*.15);
 const sc=.4*ts+.15*Math.min(1,PZ.sa.size/n/.8)+.15*Math.min(1,PZ.ch.size/n/.8)+.3*PZ.q,st=sc>=.85?3:sc>=.6?2:1;PZ.stars=st;PZ.sc.push(st);PZ.st='serve';PZ.t=0;sfx(st==3?900:500,.3,'triangle',st==3?400:100,.05)}
function pzIn(x,y){return (x-PCX)*(x-PCX)+(y-PCY)*(y-PCY)<PR*PR}
function pzPaint(x,y){const st=PZ.st;if(st!='sauce'&&st!='cheese')return;const T2=st=='sauce'?PZ.sa:PZ.ch;let n=0;PCELLS.forEach((q,i)=>{const dx=x-PCX-q[0],dy=y-PCY-q[1];if(dx*dx+dy*dy<144&&!T2.has(i)){T2.add(i);n++}});if(n)sfx(300+Math.random()*60,.03,'sine',0,.02)}
function pzTap(x,y){const st=PZ.st;if(st=='dough'&&pzIn(x,y)){PZ.dough=Math.min(1,PZ.dough+.09);sfx(200+PZ.dough*200,.05,'triangle',0,.04);if(PZ.dough>=1){PZ.st='sauce';PZ.t=0}}
 else if(st=='sauce'||st=='cheese')pzPaint(x,y);else if(st=='top'&&pzIn(x,y)&&PZ.tops.length<9){PZ.tops.push({i:PZ.sel,x:x-PCX,y:y-PCY});sfx(500,.05,'square',0,.04)}}
function pzPtr(e,k){if(!PZ)return;const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*W,y=(e.clientY-r.top)/r.height*H;
 if(k=='d'){for(const b of PZ.btns)if(x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h){b.fn();return}PZ.dn=1;pzTap(x,y)}
 else if(k=='m'){if(PZ.dn)pzPaint(x,y)}else if(k=='u')PZ.dn=0}
function drawTop(i,x,y){if(i==0){disc(x,y,6,'#b83a2a');disc(x,y,5,'#d84a3a');F(x-2,y-2,2,2,'#e87a6a');F(x+1,y+1,2,2,'#a02a1a')}
 else if(i==1){F(x-6,y-3,12,5,'#c8b898');F(x-5,y-4,10,4,'#e8d8b8');F(x-2,y+2,4,5,'#d8c8a8')}
 else if(i==2){disc(x,y,4,'#2a2a3a');disc(x,y,1,'#e8d8b8')}
 else{F(x-6,y-1,12,3,'#3a8a3a');F(x-5,y-3,10,2,'#4aa84a');F(x-5,y+2,10,2,'#4aa84a')}}
function drawPizza(){F(0,0,W,H,'#e6cfa4');F(0,0,W,6,'#c8a874');for(let x=0;x<W;x+=24)F(x,6,1,190,'rgba(0,0,0,.06)');F(0,198,W,72,'#8a5a34');F(0,198,W,5,'#c8985a');
 PZ.btns=[];const bt=(x,y,w,h,l,fn,col)=>{PZ.btns.push({x,y,w,h,fn});F(x-2,y-2,w+4,h+4,'#14102a');F(x,y,w,h,col||'#34447a');F(x,y,w,3,'rgba(255,255,255,.3)');F(x,y+h-3,w,3,'rgba(0,0,0,.3)');txt(l,x+w/2,y+h/2+3,'#f4ecd0',8,1)};
 const st=PZ.st,n=PCELLS.length;bt(6,6,60,18,'ZURÜCK',exitPizza,'#8a3040');txt('Pizza '+Math.min(3,PZ.n+1)+'/3',W/2-40,16,'#5a3a24',9,1);
 if(st=='final'){txt('Schicht beendet!',W/2,90,'#5a3a24',16,1);const tot=PZ.sc.reduce((a,b)=>a+b,0);txt('Sterne: '+tot+' / 9',W/2,120,'#c87a1a',12,1);txt(tot>=8?'Hervorragend!':tot>=6?'Gut gemacht!':'Übung macht den Meister.',W/2,146,'#5a3a24',9,1);bt(W/2-50,206,100,28,'FERTIG',exitPizza,'#2a7a6a');return}
 if(st=='bake'||(st=='serve'&&0)){F(40,30,220,150,'#14102a');F(46,36,208,138,'#555a6a');F(56,46,188,100,'#3a1a10');F(60,50,180,92,'#ff8a2a');F(60,50,180,92,'rgba(255,200,80,'+(.25+.15*Math.sin(T*8))+')');disc(150,100,36,PZ.bk>.88?'#4a2a10':PZ.bk>.42?'#c8903a':'#e8cf90');disc(150,100,30,PZ.bk>.88?'#5a2a1a':PZ.bk>.42?'#e0a040':'#f0dca8');
  F(60,158,180,14,'#222');F(60+180*.42,158,180*.46,14,'#8a7a2a');F(60+180*.55,158,180*.2,14,'#3aba5c');F(60+Math.round(180*PZ.bk)-1,154,3,22,'#fff');txt('Stoppe im grünen Bereich!',150,26,'#5a3a24',8,1);bt(370,206,100,28,'RAUS!',pzBakeDone,'#c8561a')}
 else{
  disc(PCX,PCY,PR+6,'#a0703a');disc(PCX,PCY,PR+4,'#b88048');
  const rr=st=='order'?0:st=='dough'?18+Math.round(PZ.dough*(PR-18)):PR;
  if(rr){disc(PCX,PCY,rr,st=='serve'&&PZ.q<.5&&PZ.bk>.8?'#6a3a1a':'#d8b878');disc(PCX,PCY,Math.max(1,rr-3),st=='serve'&&PZ.q==1?'#e0b060':'#ecd49a')}
  if(st!='order'&&st!='dough'){for(const i of PZ.sa){const q=PCELLS[i];F(PCX+q[0]-4,PCY+q[1]-4,8,8,'#c8321e');F(PCX+q[0]-3,PCY+q[1]-3,3,3,'#d8523a')}for(const i of PZ.ch){const q=PCELLS[i];F(PCX+q[0]-4,PCY+q[1]-4,8,8,'#f0c040');F(PCX+q[0]-2,PCY+q[1]-2,3,3,'#ffe070')}}
  for(const t of PZ.tops)drawTop(t.i,PCX+t.x,PCY+t.y);
  if(st=='serve'){F(PCX-PR-8,PCY+PR+8,2*PR+16,3,'rgba(0,0,0,.2)')}
 }
 // Kunde + Bestellung
 const ck=PZ.n%3,hair=['#3a2a1a','#c8a040','#8a8a92'][ck],shirt=['#4a7ac0','#c04a6a','#4aa07a'][ck];
 F(312,100,46,58,'#14102a');F(314,102,42,54,shirt);F(322,84,26,26,'#14102a');F(324,86,22,22,'#e8b890');F(324,86,22,7,hair);F(329,96,3,3,'#222');F(338,96,3,3,'#222');
 const mood=st=='serve'?PZ.stars:2;F(331,102,8,mood==3?4:mood==2?2:1,mood==1?'#8a3a3a':'#a03a4a');
 F(366,40,102,64,'#14102a');F(367,41,100,62,'#f4ecd0');txt('BESTELLUNG',417,52,'#8a3a2a',8,1);
 PZ.o.forEach((o,i)=>{drawTop(o,382+i*30,68);txt('2×',382+i*30+2,86,'#5a3a24',7,1)});
 c.textAlign='left';c.font='7px monospace';c.fillStyle='#5a3a24';
 const msg={order:'Hallo! Eine Pizza mit '+PZ.o.map(i=>TP[i][0]).join(' und ')+', bitte!',dough:'Tippe schnell auf den Teig!',sauce:'Wische die Soße über den Teig!',cheese:'Jetzt den Käse verteilen!',top:'Wähle den Belag und tippe auf die Pizza.',serve:['','Na ja ...','Ganz gut, danke!','Perfekt! Danke!'][PZ.stars||0]}[st]||'';
 wrap(msg,26).forEach((l,i)=>c.fillText(l,284,174+i*9));
 if(st=='order')bt(370,206,100,28,'LOS!',()=>{PZ.st='dough';PZ.t=0},'#2a7a6a');
 if((st=='sauce'&&PZ.sa.size/n>=.45)||(st=='cheese'&&PZ.ch.size/n>=.45))bt(370,206,100,28,'WEITER',()=>{PZ.st=st=='sauce'?'cheese':'top';PZ.t=0},'#2a7a6a');
 if(st=='top'){TP.forEach((t,i)=>{bt(284+i*47,206,43,28,'',()=>{PZ.sel=i},PZ.sel==i?'#c8961a':'#6a5a4a');drawTop(i,284+i*47+21,218);txt(t[0],284+i*47+21,231,'#f4ecd0',5,1)});
  bt(284,238,90,24,'ENTFERNEN',()=>{PZ.tops.pop()},'#6a3a3a');if(PZ.tops.length)bt(384,238,86,24,'BACKEN',()=>{PZ.st='bake';PZ.bk=0;PZ.t=0;sfx(300,.2,'sine',200,.04)},'#c8561a')}
 if(st=='serve'){for(let i=0;i<3;i++)txt('★',PCX-24+i*24,PCY+PR+34,i<PZ.stars?'#ffd24a':'#6a5a4a',16,1);bt(370,206,100,28,'WEITER',()=>{PZ.n++;if(PZ.n>=3){PZ.st='final'}else pzOrder()},'#2a7a6a')}}
function loop(ts){requestAnimationFrame(loop);try{if(!last)last=ts;const d=Math.min((ts-last)/1000,.1);last=ts;
 if(S!='PAUSED')T+=d;if(S=='INTRO')introUpd(d);if(S=='PIZZA')pzUpd(d);SH>0&&(SH-=d);if(S=='PLAY'||S=='TRANS'||S=='RESP'){if(HS>0)HS-=d;else{acc+=d;while(acc>=DT){step();acc-=DT}}}else acc=0;
 draw()}catch(e){window.onerror(e.message)}}
loadLevel(0);fit();showUI('menu');requestAnimationFrame(loop);
