(function(){
"use strict";
/* ---------- profil (Vid / Brina) ---------- */
var WHO=null; try{WHO=localStorage.getItem("forma-who"); if(!WHO&&localStorage.getItem("vf-state")){WHO="vid";localStorage.setItem("forma-who","vid")}}catch(e){}
var IS_B=WHO==="brina", PFX=IS_B?"b.":"", BR=window.BRINA;
/* ---------- program data ---------- */
var START = {d:"2026-11-24", kg:115};
var ORDER, PLAN, LEVELS, REWARDS, MEALS, BADGES;
/* Vsaka vaja: [ime, serije, ponovitve, dodatna teža (bw), enota "s" = sekunde]. Vrstni red v treningu se ne sme spreminjati
   (shranjeni treningi se sklicujejo na položaj vaje); nove vaje vedno dodaj na konec. */
var DAYS = {
  ZgA:{name:"Zgornji A", sub:"moč", ex:[
    ["Weighted Pull-up",4,"5–8",true],["Barbell Bench Press",4,"6–8"],["One-Arm Dumbbell Row",3,"8–10"],
    ["Weighted Dip",3,"6–10",true],["Dumbbell Lateral Raise",3,"12–15"],["Face Pull",3,"15"],["Barbell Curl",3,"8–12"],
    ["Pallof Press",3,"10 / stran"]]},
  SpA:{name:"Spodnji A", sub:"počep", lower:true, ex:[
    ["Barbell Back Squat",4,"6–8"],["Bulgarian Split Squat",3,"8–10 / nogo"],["Romanian Deadlift (RDL)",3,"8"],
    ["Leg Extension",3,"12–15"],["Nordic Hamstring Curl",3,"4–6",true],["Standing Calf Raise",4,"10–12"],["Hanging Leg Raise",3,"10–12",true]]},
  ZgB:{name:"Zgornji B", sub:"hipertrofija", ex:[
    ["Overhead Press",4,"6–8"],["Incline Dumbbell Press",3,"8–12"],["Lat Pulldown",3,"10–12"],
    ["Chest-Supported Row",3,"10–12"],["Push-up",2,"max",true],["Triceps Rope Pushdown",3,"10–15"],["Hammer Curl",3,"10–12"],
    ["RKC Plank",3,"20–40 s",true,"s"]]},
  SpB:{name:"Spodnji B", sub:"kolk", lower:true, ex:[
    ["Trap Bar Deadlift",3,"5"],["Barbell Hip Thrust",4,"8–10"],["Leg Press",3,"10–12"],["Lying Leg Curl",3,"10–12"],
    ["Copenhagen Plank",3,"20 s / stran",true,"s"],["Standing Calf Raise",3,"12–15"],["Ab Wheel Rollout",3,"8–12",true]]}
};
var CORE={"Pallof Press":1,"Hanging Leg Raise":1,"RKC Plank":1,"Ab Wheel Rollout":1,"Copenhagen Plank":1};
/* Slike: free-exercise-db (javna domena), dve sliki na vajo: začetni in končni položaj */
var IMG={
"Weighted Pull-up":"Weighted_Pull_Ups","Barbell Bench Press":"Barbell_Bench_Press_-_Medium_Grip","One-Arm Dumbbell Row":"One-Arm_Dumbbell_Row",
"Weighted Dip":"Dips_-_Chest_Version","Dumbbell Lateral Raise":"Side_Lateral_Raise","Face Pull":"Face_Pull","Barbell Curl":"Barbell_Curl",
"Pallof Press":"Pallof_Press","Barbell Back Squat":"Barbell_Squat","Bulgarian Split Squat":"Split_Squat_with_Dumbbells",
"Romanian Deadlift (RDL)":"Romanian_Deadlift","Leg Extension":"Leg_Extensions","Nordic Hamstring Curl":"Natural_Glute_Ham_Raise",
"Standing Calf Raise":"Standing_Calf_Raises","Hanging Leg Raise":"Hanging_Leg_Raise","Overhead Press":"Standing_Military_Press",
"Incline Dumbbell Press":"Incline_Dumbbell_Press","Lat Pulldown":"Wide-Grip_Lat_Pulldown","Chest-Supported Row":"Dumbbell_Incline_Row",
"Push-up":"Pushups","Triceps Rope Pushdown":"Triceps_Pushdown_-_Rope_Attachment","Hammer Curl":"Hammer_Curls","RKC Plank":"Plank",
"Trap Bar Deadlift":"Trap_Bar_Deadlift","Barbell Hip Thrust":"Barbell_Hip_Thrust","Leg Press":"Leg_Press","Lying Leg Curl":"Lying_Leg_Curls",
"Copenhagen Plank":"Side_Bridge","Ab Wheel Rollout":"Ab_Roller"
};
var HOW={
"Weighted Pull-up":[["Začni iz polnega visa, lopatice navzdol","Vleci prsi proti drogu, ne brado","Spuščaj se 2 s"],"weighted pull up proper form"],
"Barbell Bench Press":[["Lopatice skupaj in navzdol, rahel lok","Drog spusti na spodnji del prsi","Stopala trdno v tleh"],"bench press proper form"],
"One-Arm Dumbbell Row":[["Roka in koleno na klopi, hrbet raven","Komolec vleci proti boku","Trup se ne obrača"],"one arm dumbbell row form"],
"Weighted Dip":[["Trup rahlo nagni naprej","Spusti se, da so rame v višini komolcev","Brez zamaha"],"weighted dips proper form"],
"Dumbbell Lateral Raise":[["Komolci rahlo pokrčeni","Dvigni do višine ramen","Navzdol počasi, 2 s"],"dumbbell lateral raise form"],
"Face Pull":[["Vrv na višini oči","Vleci proti obrazu, komolci visoko","Na koncu roke zavrti navzven"],"face pull proper form"],
"Barbell Curl":[["Komolci ob telesu","Brez zibanja s hrbtom","Navzdol počasi"],"barbell curl proper form"],
"Pallof Press":[["Škripec ali elastika v višini prsi, stojiš bočno","Stisni trebuh in zadnjico, iztegni roke naravnost naprej","Zadrži 2 s, trup se ne sme zavrteti proti škripcu"],"pallof press proper form"],
"Barbell Back Squat":[["Drog na zgornjem delu hrbta, prsi pokonci","Kolena gredo v smeri prstov","Vsaj do vzporedno, pete na tleh"],"barbell back squat proper form"],
"Bulgarian Split Squat":[["Zadnja noga na klopi","Potiskaj skozi sprednjo peto","Trup rahlo naprej"],"bulgarian split squat form"],
"Romanian Deadlift (RDL)":[["Kolena rahlo pokrčena in mirna","Boke potiskaj nazaj, drog drsi ob nogah","Navzdol do raztega, nikoli do bolečine"],"romanian deadlift proper form"],
"Leg Extension":[["Hrbet na naslonu","Na vrhu stisni 1 s","Navzdol počasi"],"leg extension proper form"],
"Nordic Hamstring Curl":[["Kolena na blazini, nekdo ti drži gležnje","Telo ravno od kolen do glave: stisni trebuh in zadnjico, boki ne smejo zlomiti","Spuščaj se čim počasneje in se ujemi z rokami","Na začetku elastika okoli prsi ali samo prvi del giba"],"nordic hamstring curl beginner progression"],
"Standing Calf Raise":[["Polna amplituda gor in dol","Na vrhu 1 s pavze","Na dnu raztegni"],"calf raise proper form"],
"Hanging Leg Raise":[["Brez zamaha","Na vrhu podvij medenico","Navzdol počasi"],"hanging leg raise proper form"],
"Overhead Press":[["Stisni zadnjico in trebuh","Glava gre »skozi okno« na vrhu","Brez loka v križu"],"overhead press proper form"],
"Incline Dumbbell Press":[["Klop na 30 stopinj","Ročke nad zgornjimi prsmi","Komolci 45 stopinj od telesa"],"incline dumbbell press form"],
"Lat Pulldown":[["Prsi naprej in navzgor","Drog do zgornjih prsi","Komolci gredo navzdol, ne nazaj"],"lat pulldown proper form"],
"Chest-Supported Row":[["Prsi na klopi","Vleci z lopaticami","Na vrhu kratka pavza"],"chest supported row form"],
"Push-up":[["Telo ravno kot deska","Komolci 45 stopinj","Prsi skoraj do tal"],"push up proper form"],
"Triceps Rope Pushdown":[["Komolci ob telesu","Do konca iztegni in razpri vrv","Nazaj počasi"],"tricep rope pushdown proper form"],
"Hammer Curl":[["Dlani obrnjene ena proti drugi","Komolci mirni","Brez zibanja"],"hammer curl proper form"],
"RKC Plank":[["Komolci pod rameni, pesti stisnjene","Močno stisni zadnjico in trebuh, medenico podvij","Komolce »vleci« proti prstom na nogah. Bolje 20 s na polno kot 2 min mlahavo","Ko zdržiš 3 × 40 s, na hrbet dodaj ploščo"],"rkc plank"],
"Trap Bar Deadlift":[["Stoj v sredini droga","Hrbet raven, prsi pokonci","Potiskaj tla stran od sebe"],"trap bar deadlift proper form"],
"Barbell Hip Thrust":[["Lopatice na robu klopi","Brada proti prsim","Na vrhu stisni zadnjico 1 s"],"barbell hip thrust proper form"],
"Leg Press":[["Križ ostane na sedežu","Na vrhu ne zakleni kolen","Stopala v širini bokov"],"leg press proper form"],
"Lying Leg Curl":[["Boki ostanejo na blazini","Navzdol počasi, 3 s","Brez sunkov"],"lying leg curl proper form"],
"Copenhagen Plank":[["Zgornja noga na klopi","Telo ravno","Začni s pokrčenim kolenom"],"copenhagen plank beginner"],
"Ab Wheel Rollout":[["Začni na kolenih","Križ ne sme pasti","Pojdi samo tako daleč, kot zdržiš ravno"],"ab wheel rollout proper form"]
};
var REHAB_YT=[["isometric hamstring heel dig","glute bridge hold",null],["single leg glute bridge","hamstring slider curl towel","dumbbell romanian deadlift form"],["band assisted nordic hamstring curl","single leg romanian deadlift form","barbell hip thrust form","tempo run training"],["sprint warm up drills","change of direction drills football","nordic hamstring curl"]];
function yt(q){return "https://www.youtube.com/results?search_query="+encodeURIComponent(q)}
function howHtml(e){var h=e.how;if(!h&&!e.link&&!e.note)return "";var im=e.img,name=e.name;return '<details class="how"><summary>Kako se izvaja</summary>'+(im?'<div class="how-img"><img loading="lazy" alt="'+esc(name)+': začetni položaj" src="img/'+im+'_0.jpg"><img loading="lazy" alt="'+esc(name)+': končni položaj" src="img/'+im+'_1.jpg"></div>'+(name==="Copenhagen Plank"?'<p class="small muted">Slika kaže navadno stransko oporo. Pri Copenhagnu je zgornja noga na klopi, spodnja v zraku.</p>':''):'')+(h?'<ol>'+h.map(function(c){return '<li>'+esc(c)+'</li>'}).join("")+'</ol>':'')+(e.note?'<p class="small">'+esc(e.note)+'</p>':'')+(e.link?'<a class="yt" href="'+esc(e.link)+'" target="_blank" rel="noopener">Odpri video</a> ':'')+(e.yt?'<a class="yt" href="'+yt(e.yt)+'" target="_blank" rel="noopener">Poglej video na YouTube</a>':'')+'</details>'}
BADGES=[
 ["first","1","Prvi trening",function(c){return c.trainings>=1}],
 ["pr1","PR","Prvi rekord",function(c){return c.prs>=1}],
 ["pr10","10","10 rekordov",function(c){return c.prs>=10}],
 ["week","4/4","Poln teden",function(c){return c.fullWeeks>=1}],
 ["streak4","4×","Veriga 4 tedne",function(c){return c.streak>=4}],
 ["prot7","190","7 dni beljakovin",function(c){return c.protDays>=7}],
 ["scale","kg","10 tehtanj",function(c){return c.weighIns>=10}],
 ["photo","IMG","Prva slika",function(c){return c.photos>=1}],
 ["rehab","R","Rehab končan",function(c){return c.rehabDone}],
 ["foot","10","10 tekem",function(c){return c.football>=10}],
 ["cardio","Z2","10× kardio",function(c){return c.cardio>=10}],
 ["hundred","100","100 treningov",function(c){return c.trainings>=100}]
];
ORDER=["ZgA","SpA","ZgB","SpB"];
PLAN={1:"ZgA",2:"SpA",3:"cardio",4:"ZgB",5:"football",6:"rest",0:"SpB"};
var PHASES=[
  {n:1,t:"Izometrija",dur:"1–2 tedna",ex:["Pritisk pete v tla, koleno pokrčeno: 5 × 30–45 s (50–70 % moči)","Glute bridge zadržek: 4 × 30 s","Hoja 30 min"],next:"Hoja in počasni počep brez bolečine"},
  {n:2,t:"Lahka moč",dur:"1–2 tedna",ex:["Glute bridge na eni nogi: 3 × 10","Zdrsi s petami na brisači: 3 × 8","RDL z lahko ročko: 3 × 10, počasi navzdol"],next:"RDL in zdrsi brez bolečine, naslednji dan OK"},
  {n:3,t:"Polna dolžina",dur:"2–3 tedne",ex:["Nordic z elastiko ali do blazine: 3 × 4–6","RDL na eni nogi: 3 × 8","Hip thrust: 3 × 10","Tempo teki 6 × 80 m na 60–70 %"],next:"Tempo teki na 80 % in Nordic 3 × 5 brez bolečine"},
  {n:4,t:"Nogomet",dur:"1–2 tedna",ex:["Sprinti 6 × 30 m na 80–90 %","Spremembe smeri, trening z žogo","Nordic 2× na teden za vedno"],next:"Polni sprint brez bolečine in brez strahu"}
];
LEVELS=[[0,"Rekrut"],[1500,"Redni"],[4000,"Železar"],[8000,"Zver"],[14000,"Stroj"],[22000,"Titan"],[32000,"Legenda"],[45000,"Bog fitnesa"]];
REWARDS=[
  {id:"r8",need:"tr",n:8,txt:"Nova majica ali kratke hlače za trening",lab:"8 treningov"},
  {id:"r16",need:"tr",n:16,txt:"Dobre slušalke ali copati za fitnes",lab:"16 treningov"},
  {id:"rehab",need:"rehab",n:1,txt:"Večerja s punco",lab:"Rehab končan, nazaj na nogomet"},
  {id:"s4",need:"streak",n:4,txt:"Dan v wellnessu s prijatelji",lab:"4 tedne zapored"},
  {id:"r32",need:"tr",n:32,txt:"Ura ali pas za srčni utrip",lab:"32 treningov"},
  {id:"r48",need:"r48",n:48,txt:"Nov kos oblačil v manjši velikosti",lab:"48 treningov in −5 cm v pasu"},
  {id:"r100",need:"tr",n:100,txt:"Vikend izlet ali fotografiranje »prej in potem«",lab:"100 treningov"}
];
MEALS={
  t:{kcal:"~3.000",p:"190–200 g",f:"80–90 g",c:"~350 g",rows:[
    ["Zajtrk","100 g ovsenih kosmičev, 300 ml mleka, banana, 30 g whey",745,48],
    ["Malica","250 g skute, 2 kosa polnozrnatega kruha, paprika",520,38],
    ["Kosilo","200 g piščančjih prsi, 100 g riža (suh), zelenjava, žlica olja",830,55],
    ["Pred/po treningu","200 g grškega jogurta, jabolko, 30 g oreškov",420,23],
    ["Večerja","Omleta iz 3 jajc, 30 g sira, 2 kosa kruha, solata",520,34]]},
  p:{kcal:"~2.800",p:"190 g",f:"80–90 g",c:"~300 g",rows:[
    ["Zajtrk","4 jajca, 2 kosa polnozrnatega kruha, paradižnik",500,32],
    ["Malica","500 ml kefirja, banana",335,18],
    ["Kosilo","200 g puste mlete puranje ali goveje, 100 g polnozrnatih testenin, omaka, parmezan",830,60],
    ["Popoldne","Proteinski puding, 2 riževa vaflja z arašidovim maslom",340,25],
    ["Večerja","150 g lososa ali postrvi, 300 g krompirja, brokoli",650,38],
    ["Pred spanjem","150 g skute",135,17]]}
};
var DAILY=[["steps","8.000+ korakov",10],["sleep","7+ ur spanja",10],["water","3 l vode",5]];

var PROT=190;
if(IS_B){
  START=BR.START; ORDER=BR.ORDER; PLAN=BR.PLAN; MEALS=BR.MEALS; REWARDS=BR.REWARDS; PROT=BR.PROTEIN;
  LEVELS=[[0,"Rekrutka"],[1500,"Redna"],[4000,"Železna"],[8000,"Zver"],[14000,"Stroj"],[22000,"Titanka"],[32000,"Legenda"],[45000,"Boginja fitnesa"]];
  BADGES=BADGES.filter(function(b){return b[0]!=="rehab"&&b[0]!=="foot"});
}
BADGES.forEach(function(b){if(b[0]==="prot7")b[1]=String(PROT)});
/* Enoten opis treninga: {name, sub, short, lower, ex:[{id,name,sets,reps,bw,unit,core,img,how,yt,link,note,g,lib}]}.
   Vid: id vaje = njen položaj (kot prej). Brina: id = uid iz njene rutine, ki jo lahko ureja. */
function vidEx(e,i){var h=HOW[e[0]];return {id:String(i),name:e[0],sets:e[1],reps:e[2],bw:!!e[3],unit:e[4]||"",core:!!CORE[e[0]],img:IMG[e[0]],how:h&&h[0],yt:h&&h[1]}}
function libEx(id){return (BR&&BR.byId[id])||(S.profile.custom||{})[id]||null}
function routineList(day){var r=S.profile.routine&&S.profile.routine[day];if(r)return r;var b=BR.DAYS[day];return b?b.ex.map(function(x){return {uid:x.lib,lib:x.lib,sets:x.sets,reps:x.reps}}):[]}
function dayDef(day){
  if(!IS_B){var D=DAYS[day];if(!D)return null;return {name:D.name,sub:D.sub,lower:!!D.lower,short:D.name.replace("Zgornji","Zg").replace("Spodnji","Sp"),ex:D.ex.map(vidEx)}}
  var B=BR.DAYS[day]; if(!B) return null;
  return {name:B.name,sub:B.sub,short:B.short,lower:false,ex:routineList(day).map(function(it){var L=libEx(it.lib)||{name:it.name||"Vaja",cat:"moje"};
    return {id:it.uid,lib:it.lib,name:L.name,sets:+it.sets||+L.sets||3,reps:it.reps||L.reps||"",bw:!!L.bw,unit:L.unit||"",core:L.cat==="core",img:L.img,how:L.how,yt:L.yt,link:L.link,note:L.note,g:L.g,custom:!!L.custom}})};
}
function wDef(w){var D=dayDef(w.day); if(w.ex) return {name:(D&&D.name)||w.name||"Trening",ex:w.ex}; return D}

/* ---------- state ---------- */
var S={profile:emptyProfile(),workouts:{}};
var draft={};           // day -> {exIdx:[{kg,reps,done}]}
var curDay=PLAN[new Date().getDay()]; if(ORDER.indexOf(curDay)<0) curDay=ORDER[0];
var calMonth=new Date(); calMonth.setDate(1);
var foodMode="t", pendingDel=null;

function emptyProfile(){return {dailies:{},weights:[],activities:[],pain:[],claimed:{},rewardText:{},rehabPhase:1,rehabDone:false,rehabChecks:{},photos:[]}}
function lsGet(k){try{var v=localStorage.getItem(k);return v?JSON.parse(v):null}catch(e){return null}}
function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}

/* ---------- dates ---------- */
function ymd(d){d=d||new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function parse(s){var p=s.split("-");return new Date(+p[0],+p[1]-1,+p[2])}
function monday(d){var x=new Date(d.getFullYear(),d.getMonth(),d.getDate());var w=(x.getDay()+6)%7;x.setDate(x.getDate()-w);return x}
function weekKey(s){return ymd(monday(parse(s)))}
var MONTHS=["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december"];
var WD=["Ned","Pon","Tor","Sre","Čet","Pet","Sob"];
function fmtD(s){var d=parse(s);return d.getDate()+". "+(d.getMonth()+1)+"."}
function fmtN(n){return Math.round(n).toLocaleString("sl-SI")}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}

/* ---------- stats ---------- */
function e1rm(kg,reps){kg=+kg||0;reps=+reps||0;if(!reps)return 0;return (kg+1)*(1+reps/30)}
function stats(){
  var P=S.profile, pts=0, list=Object.values(S.workouts).sort(function(a,b){return a.ts-b.ts});
  var best={}, prs=0, perW={};
  list.forEach(function(w){
    var done=0,planned=0,wprs=0;
    var def=wDef(w); if(!def) return;
    def.ex.forEach(function(e){
      planned+=+e.sets||0;
      var sets=(w.sets&&w.sets[e.id])||[]; var top=0;
      sets.forEach(function(s){if(s&&s.done){done++;top=Math.max(top,e1rm(s.kg,s.reps))}});
      if(top>0){ if(best[e.name]!=null && top>best[e.name]+0.01){wprs++} if(best[e.name]==null||top>best[e.name]) best[e.name]=top; }
    });
    var p=done*5+(done>=planned*0.7?100:0)+wprs*25;
    perW[w.id]={pts:p,done:done,planned:planned,prs:wprs}; pts+=p; prs+=wprs;
  });
  var acts=P.activities||[];
  acts.forEach(function(a){pts+= a.type==="football"?30:40});
  Object.keys(P.dailies||{}).forEach(function(d){var x=P.dailies[d];
    if((x.protein||0)>=PROT)pts+=15; if(x.steps)pts+=10; if(x.sleep)pts+=10; if(x.water)pts+=5});
  var wd={}; (P.weights||[]).forEach(function(w){wd[w.d]=1}); pts+=Object.keys(wd).length*5;
  // trainings per week
  var trainDays=[]; list.forEach(function(w){trainDays.push(w.d)}); acts.forEach(function(a){if(a.type==="rehab")trainDays.push(a.d)});
  var weeks={}; trainDays.forEach(function(d){var k=weekKey(d);weeks[k]=(weeks[k]||0)+1});
  var fullWeeks=0; Object.keys(weeks).forEach(function(k){if(weeks[k]>=4){pts+=150;fullWeeks++}});
  var protDays=0; Object.keys(P.dailies||{}).forEach(function(d){if((P.dailies[d].protein||0)>=PROT)protDays++});
  var photos=(P.photos||[]).length; pts+=photos*20;
  var nowK=ymd(monday(new Date())); var streak=0; var cur=monday(new Date());
  if((weeks[nowK]||0)<3){cur.setDate(cur.getDate()-7)}
  while((weeks[ymd(cur)]||0)>=3){streak++;cur.setDate(cur.getDate()-7)}
  var ctx={trainings:trainDays.length,prs:prs,fullWeeks:fullWeeks,streak:streak,protDays:protDays,weighIns:Object.keys(wd).length,photos:photos,rehabDone:!!P.rehabDone,
    football:acts.filter(function(a){return a.type==="football"}).length,cardio:acts.filter(function(a){return a.type==="cardio"}).length};
  var earned=BADGES.filter(function(b){return b[3](ctx)}).map(function(b){return b[0]}); pts+=earned.length*50;
  var lvl=0; for(var i=0;i<LEVELS.length;i++){if(pts>=LEVELS[i][0])lvl=i}
  return {earned:earned,pts:pts,lvl:lvl,trainings:trainDays.length,weekCount:weeks[nowK]||0,streak:streak,best:best,perW:perW,prs:prs,list:list};
}

/* ---------- persistence ----------
   Vsaka sprememba se TAKOJ zapiše v telefon (localStorage), nato v ~0,4 s še v Supabase.
   Kar ne gre skozi (brez povezave), ostane na seznamu "dirty" in se pošlje ob naslednji priložnosti. */
var CFG=window.FORMA_CONFIG||{}, REMOTE=!!(CFG.supabaseUrl&&CFG.supabaseKey);
var dirty=lsGet(PFX+"vf-dirty")||{}, seq=Date.now(), pushT=null, pushing=false, pushAgain=false, online=true;
function api(path,opt){
  opt=opt||{}; var key=CFG.supabaseKey;
  var h={apikey:key,"Content-Type":"application/json"}; if(key.indexOf("sb_")!==0) h.Authorization="Bearer "+key;
  Object.keys(opt.headers||{}).forEach(function(k){h[k]=opt.headers[k]});
  return fetch(CFG.supabaseUrl.replace(/\/$/,"")+"/rest/v1/"+path,{method:opt.method||"GET",headers:h,body:opt.body,keepalive:!!opt.keepalive})
    .then(function(r){if(!r.ok)return r.text().then(function(t){throw new Error(r.status+" "+t.slice(0,160))});return r});
}
function rowData(id){if(id==="profile")return S.profile; if(id==="draft")return draft; return S.workouts[id]||null}
function markDirty(id){dirty[id]=++seq; lsSet(PFX+"vf-dirty",dirty); schedulePush()}
function saveLocal(){lsSet(PFX+"vf-state",S)}
function saveProfile(){S.profile._t=Date.now(); saveLocal(); markDirty("profile")}
function saveDraft(){draft._t=Date.now(); lsSet(PFX+"vf-draft",draft); markDirty("draft")}
function saveWorkout(w){S.workouts[w.id]=w; saveLocal(); markDirty(w.id)}
function deleteWorkout(id){delete S.workouts[id]; saveLocal(); markDirty(id)}
function schedulePush(){if(!REMOTE){setSync("Shranjeno na tem telefonu");return} setSync("Shranjujem …"); clearTimeout(pushT); pushT=setTimeout(push,400)}
function push(keepalive){
  if(!REMOTE) return Promise.resolve();
  if(pushing){pushAgain=true;return Promise.resolve()}
  var ids=Object.keys(dirty); if(!ids.length){setSync(online?"Vse shranjeno":"Shranjeno na telefonu");return Promise.resolve()}
  pushing=true; var snap={}, ups=[], dels=[];
  ids.forEach(function(id){snap[id]=dirty[id]; var d=rowData(id); if(d) ups.push({id:id,data:JSON.parse(JSON.stringify(d))}); else dels.push(id)});
  var ps=[];
  ups.forEach(function(u){u.id=PFX+u.id});
  if(ups.length) ps.push(api("forma",{method:"POST",keepalive:keepalive,headers:{Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(ups)}));
  if(dels.length) ps.push(api("forma?id=in.("+dels.map(function(x){return '"'+PFX+x+'"'}).join(",")+")",{method:"DELETE",keepalive:keepalive}));
  return Promise.all(ps).then(function(){
    ids.forEach(function(id){if(dirty[id]===snap[id]) delete dirty[id]}); lsSet(PFX+"vf-dirty",dirty); online=true;
    pushing=false; if(pushAgain||Object.keys(dirty).length){pushAgain=false;schedulePush()} else setSync("Vse shranjeno");
  }).catch(function(e){
    pushing=false; online=false; console.warn("forma push",e);
    setSync("Ni povezave z bazo. Shranjeno na telefonu, pošljem pozneje."); clearTimeout(pushT); pushT=setTimeout(push,15000);
  });
}
function pull(){
  if(!REMOTE) return;
  api("forma?select=id,data").then(function(r){return r.json()}).then(function(rows){
    var before=JSON.stringify([S,draft]), ws={}, prof=null, dr=null;
    rows.forEach(function(r){var id=r.id; if(IS_B){if(id.indexOf(PFX)!==0)return; id=id.slice(PFX.length)} else if(id.indexOf("b.")===0) return; r={id:id,data:r.data}; if(r.id==="profile")prof=r.data; else if(r.id==="draft")dr=r.data; else if(r.id.indexOf("w-")===0)ws[r.id]=r.data});
    if(prof&&!dirty.profile&&(prof._t||0)>=(S.profile._t||0)) S.profile=Object.assign(emptyProfile(),prof);
    else if(!prof||(S.profile._t||0)>(prof._t||0)) dirty.profile=++seq;
    if(dr&&!dirty.draft&&(dr._t||0)>=(draft._t||0)) draft=dr;
    else if((draft._t||0)>((dr&&dr._t)||0)) dirty.draft=++seq;
    Object.keys(dirty).forEach(function(id){if(id.indexOf("w-")===0){if(S.workouts[id])ws[id]=S.workouts[id];else delete ws[id]}});
    S.workouts=ws; saveLocal(); lsSet(PFX+"vf-draft",draft); lsSet(PFX+"vf-dirty",dirty); online=true;
    if(JSON.stringify([S,draft])!==before) renderAll(true);
    if(Object.keys(dirty).length) push(); else setSync("Vse shranjeno");
  }).catch(function(e){online=false;console.warn("forma pull",e);setSync("Ni povezave z bazo. Delam s podatki na telefonu.")});
}
function setSync(t){document.getElementById("sync").textContent=t}
function initStore(){
  var cached=lsGet(PFX+"vf-state"); if(cached&&cached.profile){S=cached; S.profile=Object.assign(emptyProfile(),S.profile); S.workouts=S.workouts||{}}
  draft=lsGet(PFX+"vf-draft")||{};
  try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist()}catch(e){}
  renderAll();
  if(!REMOTE){setSync("Shranjeno na tem telefonu (baza ni nastavljena)");return}
  setSync("Nalagam iz baze …"); pull();
  document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")push(true);else pull()});
  window.addEventListener("pagehide",function(){push(true)});
  window.addEventListener("online",function(){push()});
}
/* ---------- varnostna kopija ---------- */
function exportData(){
  var blob=new Blob([JSON.stringify({app:"forma",v:1,exported:new Date().toISOString(),profile:S.profile,workouts:S.workouts},null,1)],{type:"application/json"});
  var a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="forma-"+ymd()+".json"; document.body.appendChild(a); a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1000); toast("Izvoženo: forma-"+ymd()+".json");
}
function importData(file){
  if(!file)return; var r=new FileReader();
  r.onload=function(){try{
    var d=JSON.parse(r.result); if(!d||(!d.profile&&!d.workouts)) throw 0;
    var n=0; Object.keys(d.workouts||{}).forEach(function(id){if(id.indexOf("w-")===0&&!S.workouts[id]){S.workouts[id]=d.workouts[id];markDirty(id);n++}});
    if(d.profile){var P=Object.assign(emptyProfile(),S.profile), I=d.profile;
      P.dailies=Object.assign({},I.dailies||{},P.dailies||{});
      ["weights","activities","pain"].forEach(function(k){var seen={};P[k]=(P[k]||[]).concat(I[k]||[]).filter(function(x){var s=JSON.stringify(x);if(seen[s])return false;seen[s]=1;return true})});
      P.claimed=Object.assign({},I.claimed||{},P.claimed||{}); P.rewardText=Object.assign({},I.rewardText||{},P.rewardText||{});
      P.rehabPhase=Math.max(P.rehabPhase||1,I.rehabPhase||1); P.rehabDone=!!(P.rehabDone||I.rehabDone);
      S.profile=P; saveProfile()}
    saveLocal(); renderAll(); toast("Uvoženo"+(n?": "+n+" treningov":""));
  }catch(e){toast("To ni datoteka iz aplikacije Forma")}};
  r.readAsText(file);
}
/* ---------- slike napredka: samo na tem telefonu (IndexedDB) ---------- */
var IDB=null, photoUrls={};
function idb(){if(!IDB)IDB=new Promise(function(res,rej){var q=indexedDB.open("forma",1);q.onupgradeneeded=function(){q.result.createObjectStore("photos")};q.onsuccess=function(){res(q.result)};q.onerror=function(){rej(q.error)}});return IDB}
function idbDo(mode,fn){return idb().then(function(db){return new Promise(function(res,rej){var t=db.transaction("photos",mode);var q=fn(t.objectStore("photos"));t.oncomplete=function(){res(q&&q.result)};t.onerror=function(){rej(t.error)}})})}
function photoSrc(p){
  if(photoUrls[p.id]) return photoUrls[p.id];
  if(photoUrls[p.id]===undefined){photoUrls[p.id]=null;
    idbDo("readonly",function(s){return s.get(p.id)}).then(function(b){if(b){photoUrls[p.id]=URL.createObjectURL(b);renderPhotos()}else photoUrls[p.id]=""}).catch(function(){photoUrls[p.id]=""})}
  return "";
}

/* ---------- ui helpers ---------- */
function $(id){return document.getElementById(id)}
function toast(t){var el=$("toast");el.textContent=t;el.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(function(){el.classList.remove("show")},2400)}
function today(){return S.profile.dailies[ymd()]||(S.profile.dailies[ymd()]={})}
function award(before,label){var a=stats();var gain=a.pts-before;
  var nb=a.earned.filter(function(x){return (stats.lastBadges||[]).indexOf(x)<0});
  if(stats.lastLvl!=null&&a.lvl>stats.lastLvl){levelUp(a.lvl)}
  else if(nb.length){var b=BADGES.filter(function(x){return x[0]===nb[0]})[0];toast("Nova značka: "+b[2]+" · +"+gain+" XP")}
  else if(gain>0){toast("+"+gain+" XP · "+label)}
  stats.lastLvl=a.lvl; stats.lastBadges=a.earned}
function levelUp(l){
  $("luNum").textContent=l+1; $("luName").textContent=LEVELS[l][1];
  $("luText").textContent=LEVELS[l+1]?"Naslednji cilj: »"+LEVELS[l+1][1]+"« pri "+fmtN(LEVELS[l+1][0])+" XP.":"Najvišji nivo. Legenda.";
  $("lvlUp").hidden=false; confetti();
}
function confetti(){
  if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  var c=$("confetti"),x=c.getContext("2d"),W=c.width=innerWidth,H=c.height=innerHeight,cols=["#ff7a33","#e3b54b","#4cc386","#7aa7ff","#ffffff"],ps=[];
  for(var i=0;i<140;i++)ps.push({x:W/2,y:H/2,vx:(Math.random()-.5)*14,vy:Math.random()*-14-4,r:Math.random()*6+3,c:cols[i%5],a:Math.random()*6});
  var t0=performance.now();
  (function f(t){x.clearRect(0,0,W,H);ps.forEach(function(p){p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.a+=.15;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);x.restore()});
    if(t-t0<2600&&!$("lvlUp").hidden)requestAnimationFrame(f);else x.clearRect(0,0,W,H)})(t0);
}

/* ---------- render ---------- */
function renderHeader(st){
  var L=LEVELS[st.lvl], N=LEVELS[st.lvl+1];
  $("lvlNum").textContent=st.lvl+1; $("lvlName").textContent=L[1]; $("ptsTotal").textContent=fmtN(st.pts);
  var rp=N?Math.min(1,(st.pts-L[0])/(N[0]-L[0])):1; $("ringFg").style.strokeDashoffset=(144.5*(1-rp)).toFixed(1);
  if(N){var p=(st.pts-L[0])/(N[0]-L[0]);$("lvlBar").style.width=Math.min(100,p*100)+"%";$("lvlNext").textContent=fmtN(st.pts-L[0])+" / "+fmtN(N[0]-L[0])+" XP do nivoja »"+N[1]+"«"}
  else{$("lvlBar").style.width="100%";$("lvlNext").textContent="Najvišji nivo"}
}
function dayMarks(d){
  var m={gym:false,rehab:false,cardio:false,foot:false};
  Object.values(S.workouts).forEach(function(w){if(w.d===d)m.gym=true});
  (S.profile.activities||[]).forEach(function(a){if(a.d===d){if(a.type==="rehab")m.rehab=true;if(a.type==="cardio")m.cardio=true;if(a.type==="football")m.foot=true}});
  return m;
}
function dotsHtml(m){return '<span class="dots">'+(m.gym?'<i class="dot d-gym"></i>':'')+(m.rehab?'<i class="dot d-rehab"></i>':'')+(m.cardio?'<i class="dot d-cardio"></i>':'')+(m.foot?'<i class="dot d-foot"></i>':'')+'</span>'}

function renderToday(st){
  var plan=PLAN[new Date().getDay()], P=S.profile, h="";
  var dec=new Date()<new Date(2027,0,1);
  var dname=WD[new Date().getDay()]+", "+fmtD(ymd());
  var m=dayMarks(ymd());
  var D=dayDef(plan);
  if(D){
    h+='<span class="label">'+esc(dname)+' · danes na sporedu</span><h2>'+D.name+' <span style="font-weight:500">('+D.sub+')</span></h2>';
    if(IS_B){h+='<p class="small">'+D.ex.slice(0,3).map(function(e){return esc(e.name)}).join(" · ")+(D.ex.length>3?' …':'')+'</p>'}
    else if(D.lower&&!P.rehabDone){h+='<p class="small">Dokler stegenska ni v redu, spodnji del sledi rehab fazi '+P.rehabPhase+'. Naredi rehab, nato samo vaje, ki ne bolijo.</p>'}
    else if(dec&&!D.lower){h+='<p class="small">Zgornji del lahko treniraš polno že decembra. Doma: zgibi, dipsi in sklece z nahrbtnikom.</p>'}
    h+='<div class="row">'+(m.gym?'<span class="chip green">Opravljeno</span>':'<button class="btn primary" data-start="'+plan+'">Začni trening</button>')+(D.lower&&!P.rehabDone?'<button class="btn ghost" data-go="rehab">Rehab</button>':'')+'</div>';
  } else if(plan==="cardio"){
    h+='<span class="label">'+esc(dname)+'</span><h2>Kardio cona 2</h2><p class="small">35–45 min hoje v klanec, kolesa ali veslanja. Lahko govoriš v celih stavkih.</p>';
    h+='<div class="row">'+(m.cardio?'<span class="chip green">Opravljeno</span>':'<button class="btn primary" data-act="cardio">Zabeleži kardio (+40)</button>')+'</div>';
  } else if(plan==="football"){
    h+='<span class="label">'+esc(dname)+'</span><h2>Nogomet</h2><p class="small">'+(P.rehabDone?'Dobro se ogrej: 10 min tek, dinamično gibanje, nekaj pospeševanj.':'Če še nisi v rehab fazi 3, danes raje izpusti ali igraj počasi.')+'</p>';
    h+='<div class="row">'+(m.foot?'<span class="chip green">Opravljeno</span>':'<button class="btn primary" data-act="football">Zabeleži nogomet (+30)</button>')+'</div>';
  } else {
    h+='<span class="label">'+esc(dname)+'</span><h2>Počitek</h2><p class="small">'+(IS_B?'Sprehod z Vidom ali prijateljicami':'Sprehod s punco ali prijatelji')+' šteje za korake. Jutri spet.</p>';
  }
  var big=D?(IS_B?(plan==="BZ"?"Z":plan.replace("B","")):plan.replace("Zg","Z").replace("Sp","S")):plan==="cardio"?"Z2":plan==="football"?"90'":"ZZZ";
  var xp=D?(D.ex.reduce(function(s,e){return s+(+e.sets||0)},0)*5+100):plan==="cardio"?40:plan==="football"?30:0;
  if(xp) h=h.replace('</h2>','</h2><span class="xpchip num">do +'+xp+' XP</span>');
  $("todayCard").setAttribute("data-big",big);
  $("todayCard").innerHTML=h;
  $("kStreak").textContent=st.streak; $("kStreakBox").classList.toggle("hot",st.streak>0); $("kWeek").textContent=st.weekCount+"/4"; $("kTotal").textContent=st.trainings;
  // week strip
  var mon=monday(new Date()), ws="";
  for(var i=0;i<7;i++){var d=new Date(mon);d.setDate(mon.getDate()+i);var k=ymd(d);var p=PLAN[d.getDay()];
    var dd=dayDef(p); var lab=dd?dd.short:(p==="cardio"?"Kardio":p==="football"?"Nogomet":"Počitek");
    ws+='<div class="wd'+(k===ymd()?' is-today':'')+'"><span>'+WD[d.getDay()]+'</span><b class="num">'+d.getDate()+'</b>'+dotsHtml(dayMarks(k))+'<span style="font-size:10px">'+lab+'</span></div>'}
  $("weekStrip").innerHTML=ws;
  var sun=new Date(mon);sun.setDate(mon.getDate()+6);$("weekRange").textContent=fmtD(ymd(mon))+" – "+fmtD(ymd(sun));
  // dailies
  var t=S.profile.dailies[ymd()]||{}; var pr=t.protein||0;
  $("protVal").textContent=pr+" g / "+PROT+" g"; $("protBar").style.width=Math.min(100,pr/PROT*100)+"%";
  var dh=""; DAILY.forEach(function(x){dh+='<button class="check'+(t[x[0]]?' done':'')+'" data-daily="'+x[0]+'"><span class="box"></span><span class="t">'+x[1]+'</span><span class="pts">+'+x[2]+'</span></button>'});
  $("dailyChecks").innerHTML=dh;
  var q=(pr>=PROT?1:0)+DAILY.filter(function(x){return t[x[0]]}).length; $("questCount").textContent=q+"/4 opravljenih";
  Array.prototype.forEach.call($("questBar").children,function(el,i){el.classList.toggle("on",i<q)});
}

function lastFor(day){
  var l=Object.values(S.workouts).filter(function(w){return w.day===day}).sort(function(a,b){return b.ts-a.ts});return l[0]||null}
/* zadnje serije za isto vajo: pri Brini po imenu vaje (tudi če je v drugem dnevu ali je zamenjala vrstni red) */
function lastSets(day,e){
  if(!IS_B){var l=lastFor(day);return (l&&l.sets&&l.sets[e.id])||[]}
  var ws=Object.values(S.workouts).sort(function(a,b){return b.ts-a.ts});
  for(var i=0;i<ws.length;i++){var w=ws[i],def=wDef(w);if(!def)continue;
    for(var j=0;j<def.ex.length;j++){var x=def.ex[j];if(x.name===e.name){var ss=(w.sets&&w.sets[x.id])||[];if(ss.some(function(s){return s&&s.done}))return ss}}}
  return [];
}
function exThumb(e){return e.img?'<div class="ex-img" aria-hidden="true"><img loading="lazy" alt="" src="img/'+e.img+'_0.jpg"><img loading="lazy" alt="" class="b" src="img/'+e.img+'_1.jpg"></div>':'<div class="ex-img noimg" aria-hidden="true"><span>'+esc(e.name.replace(/[^A-Za-zČŠŽčšž ]/g,"").split(/\s+/).filter(Boolean).map(function(w){return w[0]}).join("").slice(0,3).toUpperCase())+'</span></div>'}
function gChips(g){return (g||[]).map(function(x){return '<span class="chip g">'+BR.GLUTE[x]+'</span>'}).join("")}
var editMode=false;
function renderTraining(st){
  var sh=""; ORDER.forEach(function(k){sh+='<button class="'+(k===curDay?'on':'')+'" data-day="'+k+'">'+dayDef(k).short+'</button>'});
  $("daySeg").innerHTML=sh;
  var D=dayDef(curDay), last=lastFor(curDay), dr=draft[curDay]||{};
  var intro='<div class="row between"><h2>'+esc(D.name)+' <span class="muted" style="font-weight:500">· '+esc(D.sub)+'</span></h2>'+(IS_B?'<button class="btn sm '+(editMode?'primary':'ghost')+'" id="editBtn">'+(editMode?'Končano':'Uredi')+'</button>':'')+'</div>';
  if(last) intro+='<p class="small muted">Zadnjič: '+fmtD(last.d)+'. Številke v sivem so tvoje zadnje vrednosti.</p>';
  else intro+='<p class="small muted">Prvič? Začni s težo, pri kateri ti ostaneta 2–3 ponovitvi v rezervi.</p>';
  if(IS_B&&editMode) intro+='<div class="note small">Urejaš rutino: premikaj vaje, zamenjaj jih z drugimi iz knjižnice, spremeni serije in ponovitve ali dodaj svojo vajo.</div>';
  if(!IS_B&&D.lower&&!S.profile.rehabDone) intro+='<div class="note small">Rehab faza '+S.profile.rehabPhase+': RDL, Nordic in mrtvi dvig delaj samo, če bolečina ostane do 3/10. Sicer jih preskoči.</div>';
  $("dayIntro").innerHTML=intro;
  var h="";
  D.ex.forEach(function(e,i){
    var sets=dr[e.id]||[]; var ls=lastSets(curDay,e);
    var allDone=sets.length>=e.sets&&sets.slice(0,e.sets).every(function(s){return s&&s.done});
    h+='<div class="ex'+(allDone?' done':'')+'"><div class="ex-top">'+exThumb(e)+'<div class="ex-head"><span class="ex-name">'+esc(e.name)+(e.core?' <span class="chip core">Core</span>':'')+(e.custom?' <span class="chip">Moja</span>':'')+'</span><span class="ex-target num">'+e.sets+' × '+esc(e.reps)+'</span>'+(IS_B&&e.g?'<span class="gchips">'+gChips(e.g)+'</span>':'')+'</div></div>';
    if(IS_B&&editMode){
      h+='<div class="edit-row"><label>Serije<input type="number" inputmode="numeric" min="1" max="10" data-rsets="'+esc(e.id)+'" value="'+e.sets+'"></label><label>Ponovitve<input data-rreps="'+esc(e.id)+'" value="'+esc(e.reps)+'"></label></div>'+
        '<div class="edit-btns"><button class="btn sm ghost" data-mv="-1" data-uid="'+esc(e.id)+'" aria-label="Premakni gor"'+(i===0?' disabled':'')+'>↑</button><button class="btn sm ghost" data-mv="1" data-uid="'+esc(e.id)+'" aria-label="Premakni dol"'+(i===D.ex.length-1?' disabled':'')+'>↓</button><button class="btn sm ghost" data-swap="'+esc(e.id)+'">Zamenjaj</button><button class="btn sm ghost" data-rm="'+esc(e.id)+'">'+(pendingRm===e.id?'Res odstranim?':'Odstrani')+'</button></div></div>';
      return;
    }
    h+=howHtml(e);
    if(ls.length&&ls.some(function(s){return s&&s.done})){h+='<div class="small muted num">Zadnjič: '+ls.filter(function(s){return s&&s.done}).map(function(s){return (s.kg||0)+' kg × '+(s.reps||0)}).join(", ")+'</div>'}
    h+='<div class="set-head"><span>#</span><span>'+(e.bw?'+kg':'kg')+'</span><span>'+(e.unit==="s"?'sek':'pon.')+'</span><span>✓</span></div><div class="sets">';
    for(var j=0;j<e.sets;j++){var s=sets[j]||{}; var l=ls[j]||{};
      h+='<div class="set"><span class="n num">'+(j+1)+'</span>'+
      '<input type="number" inputmode="decimal" step="0.5" aria-label="Teža serija '+(j+1)+'" data-ex="'+esc(e.id)+'" data-set="'+j+'" data-f="kg" value="'+(s.kg!=null&&s.kg!==""?esc(s.kg):"")+'" placeholder="'+(l.kg!=null?esc(l.kg):"")+'">'+
      '<input type="number" inputmode="numeric" step="1" aria-label="Ponovitve serija '+(j+1)+'" data-ex="'+esc(e.id)+'" data-set="'+j+'" data-f="reps" value="'+(s.reps!=null&&s.reps!==""?esc(s.reps):"")+'" placeholder="'+(l.reps!=null?esc(l.reps):"")+'">'+
      '<button class="tick'+(s.done?' on':'')+'" aria-label="Serija opravljena" data-tick="'+esc(e.id)+'" data-set="'+j+'"></button></div>'}
    h+='</div></div>';
  });
  if(IS_B) h+='<button class="btn ghost block" data-addto="'+curDay+'">+ Dodaj vajo v ta trening</button>';
  $("exList").innerHTML=h;
  $("finishBtns").hidden=IS_B&&editMode;
}
function setVal(ex,set,f,v){draft[curDay]=draft[curDay]||{};var a=draft[curDay][ex]=draft[curDay][ex]||[];a[set]=a[set]||{};a[set][f]=v;saveDraft()}

function renderRehab(){
  var P=S.profile, ph="";
  PHASES.forEach(function(p){ph+='<button class="'+(P.rehabPhase===p.n?'on':'')+'" data-phase="'+p.n+'"><b>'+p.n+'</b><span>'+p.t+'</span></button>'});
  $("phaseSel").innerHTML=ph;
  var p=PHASES[P.rehabPhase-1]; var done=(P.rehabChecks&&P.rehabChecks[ymd()])||{};
  var h='<div class="row between"><h3>Faza '+p.n+': '+p.t+'</h3><span class="chip">'+p.dur+'</span></div><div class="stack" style="gap:8px">';
  p.ex.forEach(function(x,i){var q=REHAB_YT[p.n-1][i];h+='<div class="rex"><button class="check'+(done[p.n+"-"+i]?' done':'')+'" data-rex="'+p.n+'-'+i+'"><span class="box"></span><span class="t">'+esc(x)+'</span></button>'+(q?'<a class="yt" href="'+yt(q)+'" target="_blank" rel="noopener">Video</a>':'')+'</div>'});
  h+='</div><div class="note good small"><b>Naprej, ko:</b> '+esc(p.next)+'</div>';
  $("phaseCard").innerHTML=h;
  var mb=""; [0,1,2,3,4,5,6].forEach(function(v){mb+='<button class="btn sm ghost num" data-morning="'+v+'">'+v+(v===6?'+':'')+'</button>'});
  $("morningBtns").innerHTML=mb;
  var hist=(P.pain||[]).slice(-7).reverse();
  $("painHist").innerHTML=hist.length?('<span class="muted">Zadnji vpisi: </span>'+hist.map(function(x){return '<span class="num">'+fmtD(x.d)+' '+(x.kind==="m"?"jutro":"vaja")+' <b>'+x.v+'</b></span>'}).join(" · ")):'<span class="muted">Vsako jutro vpiši bolečino od 0 do 10. Če raste, pojdi fazo nazaj.</span>';
  var rf="";
  if(P.rehabPhase===4&&!P.rehabDone) rf='<button class="btn primary block" id="rehabFinishBtn">Rehab končan, nazaj na nogomet</button>';
  else if(P.rehabDone) rf='<div class="note good">Rehab je končan. Nordic in Copenhagen ostaneta v programu za vedno.</div>';
  $("rehabFinish").innerHTML=rf;
  painUI();
}
function painUI(){var v=+$("painRange").value;$("painVal").textContent=v;
  $("painWarn").innerHTML=v>3?'<div class="note warn small">Več kot 3/10: danes zmanjšaj obremenitev ali se vrni eno fazo nazaj za 2–3 dni.</div>':''}

function renderFood(){
  var M=MEALS[foodMode];
  $("foodTargets").innerHTML=[["Kalorije",M.kcal+" kcal"],["Beljakovine",M.p],["Maščobe",M.f],["Ogljikovi hidrati",M.c]].map(function(x){return '<div class="kpi"><span class="label">'+x[0]+'</span><b class="num" style="font-size:24px">'+x[1]+'</b></div>'}).join("");
  var tk=0,tp=0; var h='<tr><th>Obrok</th><th>Kaj</th><th class="r">kcal</th><th class="r">B</th></tr>';
  M.rows.forEach(function(r){tk+=r[2];tp+=r[3];h+='<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td><td class="r">'+r[2]+'</td><td class="r">'+r[3]+' g</td></tr>'});
  h+='<tr><td colspan="2"><b>Skupaj</b></td><td class="r"><b>'+fmtN(tk)+'</b></td><td class="r"><b>'+tp+' g</b></td></tr>';
  $("mealTbl").innerHTML=h;
  Array.prototype.forEach.call($("foodSeg").children,function(b){b.classList.toggle("on",b.dataset.f===foodMode)});
}

function renderProgress(st){
  var W=(S.profile.weights||[]).slice().sort(function(a,b){return a.d<b.d?-1:1});
  var pts=[{d:START.d,kg:START.kg,start:true}].concat(W.filter(function(w){return w.kg}));
  var last=pts[pts.length-1];
  var waists=W.filter(function(w){return w.waist});
  $("wSummary").textContent="Začetek "+START.kg+" kg · zdaj "+last.kg+" kg ("+(last.kg-START.kg>0?"+":"")+(last.kg-START.kg).toFixed(1)+")"+(waists.length>1?(IS_B?" · boki ":" · pas ")+(waists[waists.length-1].waist-waists[0].waist).toFixed(1)+" cm":"");
  // chart
  var w=600,h=220,pl=44,pr=16,pt=16,pb=30;
  var t0=parse(pts[0].d).getTime(), t1=Math.max(parse(last.d).getTime(),t0+86400000*28);
  var ks=pts.map(function(p){return p.kg}); var lo=Math.floor(Math.min.apply(null,ks.concat([START.kg-4]))), hi=Math.ceil(Math.max.apply(null,ks.concat([START.kg+1])));
  function X(d){return pl+(parse(d).getTime()-t0)/(t1-t0)*(w-pl-pr)} function Y(k){return pt+(hi-k)/(hi-lo)*(h-pt-pb)}
  var g='<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Graf telesne teže">';
  var step=(hi-lo)>8?2:1;
  for(var k=lo;k<=hi;k+=step){g+='<line x1="'+pl+'" x2="'+(w-pr)+'" y1="'+Y(k)+'" y2="'+Y(k)+'" stroke="var(--line)" stroke-width="1"/><text x="'+(pl-8)+'" y="'+(Y(k)+4)+'" text-anchor="end" font-size="12" fill="var(--muted)" font-family="Inter">'+k+'</text>'}
  g+='<text x="'+pl+'" y="'+(h-8)+'" font-size="12" fill="var(--muted)" font-family="Inter">'+fmtD(pts[0].d)+'</text><text x="'+(w-pr)+'" y="'+(h-8)+'" font-size="12" text-anchor="end" fill="var(--muted)" font-family="Inter">'+fmtD(ymd(new Date(t1)))+'</text>';
  if(pts.length>1){var path=pts.map(function(p,i){return (i?"L":"M")+X(p.d).toFixed(1)+" "+Y(p.kg).toFixed(1)}).join(" ");
    g+='<path d="'+path+' L'+X(last.d).toFixed(1)+' '+(h-pb)+' L'+X(pts[0].d).toFixed(1)+' '+(h-pb)+' Z" fill="var(--accent-soft)" opacity=".6"/><path d="'+path+'" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>'}
  pts.forEach(function(p,i){g+='<circle cx="'+X(p.d)+'" cy="'+Y(p.kg)+'" r="'+(i===pts.length-1?5:3)+'" fill="'+(i===pts.length-1?'var(--accent)':'var(--surface)')+'" stroke="var(--accent)" stroke-width="2"/>'});
  if(pts.length===1) g+='<text x="'+(w/2)+'" y="'+(h/2)+'" text-anchor="middle" font-size="14" fill="var(--muted)" font-family="Inter">Izhodišče '+START.kg+' kg. Vpiši težo 3–4× na teden zjutraj.</text>';
  g+='</svg>'; $("wChart").innerHTML=g;
  // calendar
  var y=calMonth.getFullYear(), mo=calMonth.getMonth();
  $("calTitle").textContent=MONTHS[mo].charAt(0).toUpperCase()+MONTHS[mo].slice(1)+" "+y;
  var c=["Pon","Tor","Sre","Čet","Pet","Sob","Ned"].map(function(x){return '<div class="h">'+x+'</div>'}).join("");
  var first=new Date(y,mo,1), off=(first.getDay()+6)%7, days=new Date(y,mo+1,0).getDate();
  for(var i=0;i<off;i++)c+='<div class="c empty"></div>';
  for(var d=1;d<=days;d++){var k2=ymd(new Date(y,mo,d)); var m=dayMarks(k2);
    var cls=(m.gym||m.rehab)?' x':((m.cardio||m.foot)?' soft':''); if(k2===ymd())cls+=' today';
    c+='<div class="c'+cls+'"><span>'+((m.gym||m.rehab)?'✕':d)+'</span></div>'}
  $("cal").innerHTML=c;
  // PRs
  var names=Object.keys(st.best);
  $("prTbl").innerHTML=names.length?'<table class="tbl"><tr><th>Vaja</th><th class="r">Ocena 1RM</th></tr>'+names.map(function(n){return '<tr><td>'+esc(n)+'</td><td class="r">'+(st.best[n]-1).toFixed(1)+' kg</td></tr>'}).join("")+'</table><p class="small muted" style="margin-top:8px">Ocena iz najboljše serije (Epley). Pri zgibih in dipsih je to dodatna teža.</p>':'<p class="muted small">Rekordi se pojavijo po prvem zaključenem treningu.</p>';
  // history
  var items=[]; st.list.forEach(function(w){items.push({d:w.d,ts:w.ts,t:(wDef(w)||{name:"Trening"}).name,s:st.perW[w.id].done+"/"+st.perW[w.id].planned+" serij"+(st.perW[w.id].prs?" · "+st.perW[w.id].prs+" PR":""),p:st.perW[w.id].pts,id:w.id})});
  (S.profile.activities||[]).forEach(function(a,i){items.push({d:a.d,ts:a.ts||0,t:a.type==="rehab"?"Rehab faza "+(a.phase||""):a.type==="cardio"?"Kardio":"Nogomet",s:a.type==="rehab"&&a.pain!=null?"bolečina "+a.pain+"/10":"",p:a.type==="football"?30:40,aid:a.ts})});
  items.sort(function(a,b){return b.d<a.d?-1:b.d>a.d?1:b.ts-a.ts});
  $("histList").innerHTML=items.length?items.slice(0,30).map(function(x){var key=x.id||("a"+x.aid);return '<div class="hist"><div><b>'+esc(x.t)+'</b> <span class="small muted num">'+fmtD(x.d)+(x.s?' · '+esc(x.s):'')+'</span></div><div class="row" style="gap:8px"><span class="pts num">+'+x.p+'</span><button class="btn sm ghost" data-del="'+esc(key)+'">'+(pendingDel===key?'Res izbriši?':'Izbriši')+'</button></div></div>'}).join(""):'<p class="muted small">Tukaj se bodo pokazali treningi, rehab, kardio in nogomet.</p>';
}

function rewardProgress(r,st){
  var P=S.profile;
  if(r.need==="tr") return [Math.min(st.trainings,r.n),r.n];
  if(r.need==="rehab") return [P.rehabDone?1:0,1];
  if(r.need==="streak") return [Math.min(st.streak,r.n),r.n];
  if(r.need==="r48"){var ws=(P.weights||[]).filter(function(w){return w.waist}).sort(function(a,b){return a.d<b.d?-1:1});var dw=ws.length>1?ws[0].waist-ws[ws.length-1].waist:0;var ok=st.trainings>=48&&dw>=5;return [ok?1:Math.min(st.trainings/48,0.99)*(dw>=5?1:0.9),1,"pas −"+dw.toFixed(1)+" cm"]}
}
function renderRewards(st){
  var P=S.profile, h="";
  REWARDS.forEach(function(r){var pr=rewardProgress(r,st); var unlocked=pr[0]>=pr[1]; var claimed=P.claimed[r.id];
    var txt=(P.rewardText&&P.rewardText[r.id])||r.txt;
    h+='<div class="reward'+(unlocked?' unlocked':'')+(claimed?' claimed':'')+'"><div class="row between"><span class="label">'+esc(r.lab)+'</span>'+(claimed?'<span class="chip green">Prevzeto '+fmtD(claimed)+'</span>':unlocked?'<span class="chip gold">Odklenjeno</span>':'<span class="chip num">'+(r.need==="r48"?Math.min(st.trainings,48)+"/48":Math.floor(pr[0])+"/"+pr[1])+'</span>')+'</div>'+
      '<input aria-label="Nagrada" data-rtext="'+r.id+'" value="'+esc(txt)+'">'+
      '<div class="bar'+(unlocked?' green':'')+'"><i style="width:'+Math.min(100,pr[0]/pr[1]*100)+'%"></i></div>'+
      (r.need==="r48"&&pr[2]?'<span class="small muted">'+esc(pr[2])+'</span>':'')+
      (unlocked&&!claimed?'<button class="btn primary" data-claim="'+r.id+'">Prevzemi nagrado</button>':'')+'</div>'});
  $("rewardList").innerHTML=h;
  $("levelList").innerHTML=LEVELS.map(function(l,i){return '<div class="'+(i===st.lvl?'cur':'')+'"><span>'+(i+1)+'. '+l[1]+'</span><span class="num">'+fmtN(l[0])+' XP</span></div>'}).join("");
}

var pose="spredaj", cmpPos=50, pendingPhoto=null, uploading=false;
function renderPhotos(){
  var all=(S.profile.photos||[]).slice().sort(function(a,b){return a.d<b.d?-1:a.d>b.d?1:a.ts-b.ts});
  var list=all.filter(function(p){return (p.pose||"spredaj")===pose});
  Array.prototype.forEach.call($("poseSeg").children,function(b){b.classList.toggle("on",b.dataset.pose===pose)});
  $("photoCount").textContent=all.length?all.length+(all.length===1?" slika":" slik"):"";
  var btn=$("photoBtn");
  {btn.textContent=uploading?"Nalagam …":"Dodaj sliko: "+({spredaj:"spredaj",stran:"s strani",zadaj:"zadaj"})[pose]+" (+20 XP)"}
  var src=photoSrc;
  if(list.length>=2){var a=list[0],b=list[list.length-1];
    $("compare").innerHTML='<div class="cmp" id="cmpBox"><img alt="Potem" src="'+src(b)+'"><img class="before" id="cmpBefore" alt="Prej" src="'+src(a)+'" style="clip-path:inset(0 '+(100-cmpPos)+'% 0 0)"><div class="div" id="cmpDiv" style="left:'+cmpPos+'%"></div><span class="tag" style="left:10px">Prej · '+fmtD(a.d)+'</span><span class="tag" style="right:10px">Zdaj · '+fmtD(b.d)+'</span><input type="range" id="cmpRange" min="0" max="100" value="'+cmpPos+'" aria-label="Primerjava prej in zdaj"></div>';
  } else $("compare").innerHTML=list.length===1?'<p class="small muted">Dodaj še eno sliko te poze in tukaj se pokaže primerjava prej/zdaj z drsnikom.</p>':'';
  $("photoGrid").innerHTML=list.slice().reverse().map(function(p){var k="p"+p.ts;return '<div class="ph"><img loading="lazy" alt="Progres slika '+fmtD(p.d)+'" src="'+src(p)+'"><span class="num">'+fmtD(p.d)+(src(p)?'':' · na drugi napravi')+'</span><button data-pdel="'+k+'">'+(pendingPhoto===k?'Res?':'Izbriši')+'</button></div>'}).join("");
}
function shrink(file){return new Promise(function(res,rej){var url=URL.createObjectURL(file);var im=new Image();im.onload=function(){var m=1600,w=im.naturalWidth,h=im.naturalHeight,sc=Math.min(1,m/Math.max(w,h));var c=document.createElement("canvas");c.width=Math.round(w*sc);c.height=Math.round(h*sc);c.getContext("2d").drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(url);c.toBlob(function(b){b?res(b):rej()},"image/jpeg",.85)};im.onerror=function(){URL.revokeObjectURL(url);rej()};im.src=url})}
function uploadPhoto(file){
  if(!file)return; uploading=true; renderPhotos(); var before=stats().pts; var id="ph-"+Date.now();
  shrink(file).catch(function(){return file}).then(function(blob){return idbDo("readwrite",function(s){return s.put(blob,id)}).then(function(){photoUrls[id]=URL.createObjectURL(blob);return {id:id}})})
  .then(function(r){S.profile.photos=S.profile.photos||[];S.profile.photos.push({d:ymd(),ts:Date.now(),id:r.id,pose:pose});saveProfile();uploading=false;renderAll();award(before,"progres slika")})
  .catch(function(e){uploading=false;renderPhotos();toast("Shranjevanje slike ni uspelo, poskusi znova")});
}
function renderBadges(st){
  $("badgeGrid").innerHTML=BADGES.map(function(b){var on=st.earned.indexOf(b[0])>=0;return '<div class="bdg'+(on?' on':'')+'"><div class="hex num">'+esc(b[1])+'</div><span>'+esc(b[2])+'</span></div>'}).join("");
  $("badgeCount").textContent=st.earned.length+" / "+BADGES.length;
}
function renderAll(fromSync){
  var st=stats(); if(stats.lastLvl==null){stats.lastLvl=st.lvl;stats.lastBadges=st.earned}
  var typing=fromSync&&document.activeElement&&document.activeElement.closest&&document.activeElement.closest("#exList");
  renderHeader(st); renderToday(st); if(!typing) renderTraining(st); renderRehab(); renderFood(); renderProgress(st); renderRewards(st); renderPhotos(); renderBadges(st); renderLib(); renderWho();
}

/* ---------- Brina: urejanje rutine in knjižnica vaj ---------- */
var pendingRm=null, libCat="vse", libPick=null, swapFor=null, pendingCdel=null;
function ensureRoutine(day){S.profile.routine=S.profile.routine||{}; if(!S.profile.routine[day]) S.profile.routine[day]=routineList(day).map(function(x){return Object.assign({},x)}); return S.profile.routine[day]}
function newUid(day,lib){var r=routineList(day);var u=lib;while(r.some(function(x){return x.uid===u}))u=lib+"-"+Math.random().toString(36).slice(2,6);return u}
function addToDay(day,lib){var L=libEx(lib);if(!L)return;var r=ensureRoutine(day);r.push({uid:newUid(day,lib),lib:lib,sets:L.sets||3,reps:L.reps||"10–12"});saveProfile()}
function libList(){
  var all=BR.LIB.concat(Object.values(S.profile.custom||{}).sort(function(a,b){return b.ts-a.ts}));
  return all.filter(function(e){
    if(libCat==="vse")return true; if(libCat==="moje")return !!e.custom;
    if(libCat==="stran")return (e.g||[]).indexOf("med")>=0||(e.g||[]).indexOf("min")>=0;
    return e.cat===libCat});
}
function usedIn(lib){return ORDER.filter(function(k){return routineList(k).some(function(x){return x.lib===lib})}).map(function(k){return BR.DAYS[k].short})}
function renderLib(){
  if(!IS_B) return;
  $("libCats").innerHTML=BR.CATS.map(function(c){return '<button class="'+(c[0]===libCat?'on':'')+'" data-libcat="'+c[0]+'">'+c[1]+'</button>'}).join("");
  var sw=swapFor&&dayDef(swapFor.day).ex.filter(function(x){return x.id===swapFor.uid})[0];
  $("libSwap").innerHTML=sw?'<div class="note row between"><span class="small">Izberi vajo, ki zamenja <b>'+esc(sw.name)+'</b> ('+esc(dayDef(swapFor.day).short)+').</span><button class="btn sm ghost" id="swapCancel">Prekliči</button></div>':'';
  var h="";
  libList().forEach(function(L){
    var e={name:L.name,img:L.img,how:L.how,yt:L.yt,link:L.link,note:L.note};
    var used=usedIn(L.id);
    h+='<div class="ex lib"><div class="ex-top">'+exThumb(e)+'<div class="ex-head"><span class="ex-name">'+esc(L.name)+(L.custom?' <span class="chip">Moja</span>':'')+'</span><span class="ex-target num">'+(L.sets||3)+' × '+esc(L.reps||"")+'</span><span class="gchips">'+gChips(L.g)+(L.cat==="core"?'<span class="chip core">Core</span>':'')+(used.length?'<span class="chip green">'+esc(used.join(", "))+'</span>':'')+'</span></div></div>'+howHtml(e);
    if(sw) h+='<button class="btn primary block" data-pickswap="'+esc(L.id)+'">Zamenjaj s to vajo</button>';
    else if(libPick===L.id) h+='<div class="pickdays"><span class="small muted">Dodaj v:</span>'+ORDER.map(function(k){return '<button class="btn sm" data-addlib="'+esc(L.id)+'" data-addday="'+k+'">'+esc(BR.DAYS[k].short)+'</button>'}).join("")+'</div>';
    else h+='<div class="row" style="gap:8px"><button class="btn sm primary" data-pick="'+esc(L.id)+'">Dodaj v trening</button>'+(L.custom?'<button class="btn sm ghost" data-cdel="'+esc(L.id)+'">'+(pendingCdel===L.id?'Res izbrišem?':'Izbriši')+'</button>':'')+'</div>';
    h+='</div>';
  });
  $("libList").innerHTML=h||'<p class="muted small">Tukaj še ni vaj. Dodaj svojo zgoraj.</p>';
  $("cDay").innerHTML='<option value="">Samo v knjižnico</option>'+ORDER.map(function(k){return '<option value="'+k+'">Dodaj v: '+esc(BR.DAYS[k].name)+'</option>'}).join("");
}
function saveCustom(){
  var name=$("cName").value.trim(); if(!name){toast("Vpiši ime vaje");$("cName").focus();return}
  var link=$("cLink").value.trim(); if(link&&!/^https?:\/\//i.test(link)) link="https://"+link;
  var id="c-"+Date.now();
  var g=Array.prototype.filter.call(document.querySelectorAll("[data-cg]"),function(x){return x.checked}).map(function(x){return x.dataset.cg});
  var L={id:id,custom:true,ts:Date.now(),name:name.slice(0,80),cat:$("cCat").value,g:g,sets:Math.max(1,Math.min(10,+$("cSets").value||3)),reps:($("cReps").value.trim()||"10–12").slice(0,30),link:link.slice(0,500),note:$("cNote").value.trim().slice(0,300),bw:$("cBw").checked};
  S.profile.custom=S.profile.custom||{}; S.profile.custom[id]=L;
  var day=$("cDay").value; if(day) addToDay(day,id); else saveProfile();
  ["cName","cLink","cNote","cReps"].forEach(function(x){$(x).value=""}); $("cSets").value=3; $("cBw").checked=false; document.querySelectorAll("[data-cg]").forEach(function(x){x.checked=false});
  $("customForm").open=false; libCat="moje"; renderLib(); renderTraining(stats());
  toast(day?"Vaja dodana v "+BR.DAYS[day].name:"Vaja shranjena v knjižnico");
}
function brinaClick(b,d){
  if(b.id==="editBtn"){editMode=!editMode;pendingRm=null;renderTraining(stats());return true}
  if(d.mv){var r=ensureRoutine(curDay),i=r.findIndex(function(x){return x.uid===d.uid}),j=i+(+d.mv);if(i>=0&&j>=0&&j<r.length){var t=r[i];r[i]=r[j];r[j]=t;saveProfile();renderTraining(stats())}return true}
  if(d.rm){if(pendingRm!==d.rm){pendingRm=d.rm;renderTraining(stats());return true}
    var r2=ensureRoutine(curDay);S.profile.routine[curDay]=r2.filter(function(x){return x.uid!==d.rm});pendingRm=null;saveProfile();renderTraining(stats());renderToday(stats());return true}
  if(d.swap){swapFor={day:curDay,uid:d.swap};libPick=null;renderLib();go("vaje");return true}
  if(b.id==="swapCancel"){swapFor=null;renderLib();go("trening");return true}
  if(d.pickswap){var r3=ensureRoutine(swapFor.day),it=r3.filter(function(x){return x.uid===swapFor.uid})[0],L=libEx(d.pickswap);
    if(it&&L){it.lib=d.pickswap;it.sets=L.sets||3;it.reps=L.reps||it.reps;saveProfile()} curDay=swapFor.day;swapFor=null;renderLib();renderTraining(stats());go("trening");toast("Zamenjano: "+(L?L.name:""));return true}
  if(d.addto){libPick=null;swapFor=null;renderLib();go("vaje");toast("Izberi vajo in tapni Dodaj v trening");return true}
  if(d.pick){libPick=d.pick;renderLib();return true}
  if(d.addlib){addToDay(d.addday,d.addlib);libPick=null;renderLib();renderTraining(stats());renderToday(stats());toast("Dodano v "+BR.DAYS[d.addday].name);return true}
  if(d.libcat){libCat=d.libcat;libPick=null;renderLib();return true}
  if(b.id==="cSave"){saveCustom();return true}
  if(d.cdel){if(pendingCdel!==d.cdel){pendingCdel=d.cdel;renderLib();return true}
    delete S.profile.custom[d.cdel]; ORDER.forEach(function(k){if(S.profile.routine&&S.profile.routine[k])S.profile.routine[k]=S.profile.routine[k].filter(function(x){return x.lib!==d.cdel})});
    pendingCdel=null;saveProfile();renderLib();renderTraining(stats());return true}
  return false;
}
function brinaInput(t){
  if(t.dataset.rsets!=null||t.dataset.rreps!=null){var uid=t.dataset.rsets||t.dataset.rreps;var it=ensureRoutine(curDay).filter(function(x){return x.uid===uid})[0];if(!it)return;
    if(t.dataset.rsets!=null){var n=Math.round(+t.value);if(n>=1&&n<=10)it.sets=n}else it.reps=t.value.slice(0,30); saveProfile()}
}

/* ---------- profil: izbira in besedila ---------- */
function renderWho(){
  $("whoBtn").textContent=(IS_B?"Brina":"Vid")+" · zamenjaj";
  Array.prototype.forEach.call(document.querySelectorAll(".protGoal"),function(x){x.textContent=PROT});
  $("wWaistLab").textContent=IS_B?"Boki (cm, neobvezno)":"Pas (cm, neobvezno)";
  $("wKg").placeholder=IS_B?"57.0":"115.0"; $("wWaist").placeholder=IS_B?"95":"105";
}
function pickWho(w){try{localStorage.setItem("forma-who",w)}catch(e){} location.reload()}
document.addEventListener("click",function(ev){var b=ev.target.closest("button[data-who]");if(b){pickWho(b.dataset.who);return}
  if(ev.target.closest("#whoBtn")){$("whoPick").hidden=false}});

/* ---------- tabs ---------- */
function go(tab){
  Array.prototype.forEach.call(document.querySelectorAll("section.view"),function(s){s.classList.toggle("on",s.id==="v-"+tab)});
  Array.prototype.forEach.call($("tabs").children,function(b){b.classList.toggle("on",b.dataset.tab===tab)});
  window.scrollTo(0,0); try{sessionStorage.setItem("vf-tab",tab)}catch(e){}
}

/* ---------- rest timer ---------- */
var tEnd=0,tInt=null;
function startTimer(sec){tEnd=Date.now()+sec*1000;$("timer").hidden=false;clearInterval(tInt);tick();tInt=setInterval(tick,500)}
function tick(){var s=Math.max(0,Math.round((tEnd-Date.now())/1000));$("timerVal").textContent=Math.floor(s/60)+":"+String(s%60).padStart(2,"0");if(s<=0){clearInterval(tInt);$("timerVal").textContent="Gremo!";setTimeout(function(){$("timer").hidden=true},2500)}}
$("timerAdd").onclick=function(){tEnd+=30000};
$("timerStop").onclick=function(){clearInterval(tInt);$("timer").hidden=true};

/* ---------- events ---------- */
document.addEventListener("click",function(ev){
  var b=ev.target.closest("button"); if(!b) return;
  var d=b.dataset, before=stats().pts;
  if(IS_B&&brinaClick(b,d)) return;
  if(d.tab){go(d.tab);return}
  if(d.go){go(d.go);return}
  if(d.start){curDay=d.start;renderTraining(stats());go("trening");return}
  if(d.day){curDay=d.day;renderTraining(stats());return}
  if(d.act){S.profile.activities.push({d:ymd(),type:d.act,ts:Date.now()});saveProfile();renderAll();award(before,d.act==="cardio"?"kardio":"nogomet");return}
  if(d.prot){var t=today();t.protein=d.prot==="-1"?0:(t.protein||0)+(+d.prot);saveProfile();renderAll();award(before,"beljakovine");return}
  if(d.daily){var t2=today();t2[d.daily]=!t2[d.daily];saveProfile();renderAll();award(before,"dnevna naloga");return}
  if(d.tick!=null&&d.set!=null){var ex=d.tick,si=+d.set;var row=b.parentNode;var kg=row.querySelector('[data-f=kg]'),rp=row.querySelector('[data-f=reps]');
    var cur=(draft[curDay]&&draft[curDay][ex]&&draft[curDay][ex][si])||{};
    var was=!!cur.done;
    if(!was){ if(kg.value==="")kg.value=kg.placeholder; if(rp.value==="")rp.value=rp.placeholder; setVal(ex,si,"kg",kg.value); setVal(ex,si,"reps",rp.value); }
    setVal(ex,si,"done",!was); b.classList.toggle("on",!was); var exEl=b.closest(".ex"); if(exEl){var all=exEl.querySelectorAll(".tick");exEl.classList.toggle("done",Array.prototype.every.call(all,function(x){return x.classList.contains("on")}))} if(!was){var ce=dayDef(curDay).ex.filter(function(x){return x.id===ex})[0];startTimer(ce&&ce.sets>=4?150:90)} return}
  if(b.id==="finishBtn"){finishWorkout();return}
  if(b.id==="discardBtn"){if(b.dataset.sure){delete draft[curDay];saveDraft();renderTraining(stats());b.textContent="Počisti vnose";delete b.dataset.sure}else{b.dataset.sure="1";b.textContent="Res počistim? Tapni še enkrat"}return}
  if(d.phase){S.profile.rehabPhase=+d.phase;saveProfile();renderRehab();renderToday(stats());return}
  if(d.rex){var RC=S.profile.rehabChecks=S.profile.rehabChecks||{};var o=RC[ymd()]=RC[ymd()]||{};o[d.rex]=!o[d.rex];Object.keys(RC).forEach(function(k){if(k<ymd(new Date(Date.now()-14*864e5)))delete RC[k]});saveProfile();b.classList.toggle("done",!!o[d.rex]);return}
  if(b.id==="rehabDoneBtn"){var v=+$("painRange").value;S.profile.activities.push({d:ymd(),type:"rehab",phase:S.profile.rehabPhase,pain:v,ts:Date.now()});S.profile.pain.push({d:ymd(),v:v,kind:"v"});saveProfile();renderAll();award(before,"rehab");return}
  if(d.morning!=null){S.profile.pain.push({d:ymd(),v:+d.morning,kind:"m"});saveProfile();renderRehab();toast("Jutranja bolečina: "+d.morning+"/10");return}
  if(b.id==="rehabFinishBtn"){S.profile.rehabDone=true;saveProfile();renderAll();toast("Rehab končan! Nagrada je odklenjena.");return}
  if(d.f){foodMode=d.f;renderFood();return}
  if(b.id==="wAdd"){var kgv=parseFloat($("wKg").value.replace(",",".")),wv=parseFloat($("wWaist").value.replace(",","."));if(!(kgv>40&&kgv<250)){toast("Vpiši težo v kg, npr. 114,6");return}
    S.profile.weights=S.profile.weights.filter(function(w){return w.d!==ymd()});S.profile.weights.push({d:ymd(),kg:kgv,waist:wv>40?wv:null});$("wKg").value="";$("wWaist").value="";saveProfile();renderAll();award(before,"teža");return}
  if(b.id==="calPrev"){calMonth.setMonth(calMonth.getMonth()-1);renderProgress(stats());return}
  if(b.id==="calNext"){calMonth.setMonth(calMonth.getMonth()+1);renderProgress(stats());return}
  if(d.del){if(pendingDel!==d.del){pendingDel=d.del;renderProgress(stats());return}
    pendingDel=null; if(d.del.indexOf("w-")===0){deleteWorkout(d.del)}else{var ts=+d.del.slice(1);S.profile.activities=S.profile.activities.filter(function(a){return a.ts!==ts});saveProfile()} renderAll();return}
  if(d.pose){pose=d.pose;renderPhotos();return}
  if(b.id==="exportBtn"){exportData();return}
  if(b.id==="luClose"){$("lvlUp").hidden=true;return}
  if(d.pdel){if(pendingPhoto!==d.pdel){pendingPhoto=d.pdel;renderPhotos();return}
    pendingPhoto=null;var ts=+d.pdel.slice(1);var ph=(S.profile.photos||[]).filter(function(p){return p.ts===ts})[0];
    S.profile.photos=S.profile.photos.filter(function(p){return p.ts!==ts});saveProfile();renderAll();
    if(ph)idbDo("readwrite",function(s){return s.delete(ph.id)}).catch(function(){});return}
  if(d.claim){S.profile.claimed[d.claim]=ymd();saveProfile();renderRewards(stats());toast(IS_B?"Nagrada prevzeta. Zaslužila si jo!":"Nagrada prevzeta. Zaslužil si jo!");return}
});
document.addEventListener("input",function(ev){var t=ev.target;
  if(t.dataset.f&&t.dataset.ex!=null){setVal(t.dataset.ex,+t.dataset.set,t.dataset.f,t.value)}
  if(t.id==="painRange")painUI();
  if(t.id==="cmpRange"){cmpPos=+t.value;$("cmpBefore").style.clipPath="inset(0 "+(100-cmpPos)+"% 0 0)";$("cmpDiv").style.left=cmpPos+"%"}
});
document.addEventListener("change",function(ev){var t=ev.target;
  if(IS_B&&(t.dataset.rsets!=null||t.dataset.rreps!=null)){brinaInput(t);renderToday(stats());return}
  if(t.id==="photoIn"){var f=t.files&&t.files[0];t.value="";uploadPhoto(f);return}
  if(t.id==="importIn"){var f2=t.files&&t.files[0];t.value="";importData(f2);return}
  if(t.dataset.rtext){S.profile.rewardText[t.dataset.rtext]=t.value.slice(0,120);saveProfile()}
});
function finishWorkout(){
  var dr=draft[curDay]||{}, any=false, sets={};
  Object.keys(dr).forEach(function(i){if(!Array.isArray(dr[i]))return;sets[i]=(dr[i]||[]).map(function(s){s=s||{};if(s.done)any=true;return {kg:s.kg===""||s.kg==null?0:+s.kg,reps:s.reps===""||s.reps==null?0:+s.reps,done:!!s.done}})});
  if(!any){toast("Najprej odkljukaj vsaj eno serijo");return}
  var before=stats().pts, now=Date.now();
  var D=dayDef(curDay);
  var w={id:"w-"+now,d:ymd(),day:curDay,ts:now,sets:sets,ex:D.ex.map(function(e){return {id:e.id,name:e.name,sets:e.sets}})};
  saveWorkout(w); delete draft[curDay]; saveDraft(); clearInterval(tInt); $("timer").hidden=true;
  var st=stats(); var pw=st.perW[w.id];
  renderAll(); award(before,D.name+(pw&&pw.prs?" · "+pw.prs+" PR":""));
  go("danes");
}

var savedTab=null; try{savedTab=sessionStorage.getItem("vf-tab")}catch(e){}
if(IS_B&&savedTab==="rehab") savedTab=null; if(!IS_B&&savedTab==="vaje") savedTab=null;
if(!WHO) $("whoPick").hidden=false;
initStore(); if(savedTab&&$("v-"+savedTab)) go(savedTab);
})();
