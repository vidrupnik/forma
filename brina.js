/* Brinin profil: knjižnica vaj, privzeta rutina, prehrana, nagrade.
   Vaja v knjižnici: id, name, cat (rit|noge|zgornji|core), g (katere ritne mišice: max/med/min), img (free-exercise-db), sets, reps, bw, unit ("s"), how (3 namigi), yt. */
window.BRINA = (function () {
  var L = [
    // ---------- RIT ----------
    { id: "hip-thrust", name: "Barbell Hip Thrust", cat: "rit", g: ["max"], img: "Barbell_Hip_Thrust", sets: 4, reps: "8–12", how: ["Lopatice na robu klopi, stopala v širini bokov", "Brada proti prsim, rebra navzdol", "Na vrhu stisni rit 1–2 s, kolena navzven"], yt: "barbell hip thrust glute focus form" },
    { id: "sl-hip-thrust", name: "Single-Leg Hip Thrust", cat: "rit", g: ["max", "med"], img: "Single_Leg_Glute_Bridge", sets: 3, reps: "10–12 / nogo", how: ["Hrbet na klopi, ena noga v zraku", "Potiskaj skozi peto delovne noge", "Boki ostanejo poravnani, ne zvrni se na stran"], yt: "single leg hip thrust form" },
    { id: "glute-bridge", name: "Barbell Glute Bridge", cat: "rit", g: ["max"], img: "Barbell_Glute_Bridge", sets: 3, reps: "12–15", how: ["Hrbet na tleh, drog na bokih", "Potiskaj skozi pete", "Na vrhu 2 s stiska"], yt: "barbell glute bridge form" },
    { id: "kas-bridge", name: "Kas Glute Bridge", cat: "rit", g: ["max"], img: "Barbell_Glute_Bridge", sets: 3, reps: "10–12", how: ["Kot hip thrust, a le zgornja polovica giba", "Boki se ne spustijo do konca", "Mišica je ves čas pod napetostjo"], yt: "kas glute bridge" },
    { id: "frog-pump", name: "Frog Pump", cat: "rit", g: ["max"], sets: 3, reps: "20–30", bw: true, how: ["Leži na hrbtu, podplati skupaj, kolena navzven", "Dvigni boke in stisni rit", "Hiter ritem, odlično za konec treninga"], yt: "frog pumps glutes" },
    { id: "cable-kickback", name: "Cable Glute Kickback", cat: "rit", g: ["max", "med"], img: "One-Legged_Cable_Kickback", sets: 3, reps: "12–15 / nogo", how: ["Manšeta na gležnju, trup rahlo nagnjen naprej", "Nogo potiskaj nazaj in malo vstran, ne v križ", "Na vrhu stisni 1 s"], yt: "cable glute kickback form" },
    { id: "kickback", name: "Glute Kickback (machine or floor)", cat: "rit", g: ["max"], img: "Glute_Kickback", sets: 3, reps: "12–15 / nogo", how: ["Na vseh štirih ali na napravi", "Peta proti stropu, koleno pokrčeno", "Križ se ne usloči"], yt: "glute kickback machine form" },
    { id: "hip-abd-machine", name: "Hip Abduction Machine (lean forward)", cat: "rit", g: ["med", "min"], img: "Thigh_Abductor", sets: 3, reps: "15–20", how: ["Trup nagni naprej, da bolj zadeneš zgornji del riti", "Kolena razpri čim dlje in zadrži 1 s", "Nazaj počasi, uteži naj se ne dotaknejo"], yt: "hip abduction machine lean forward glutes" },
    { id: "cable-abd", name: "Standing Cable Hip Abduction", cat: "rit", g: ["med", "min"], sets: 3, reps: "15 / nogo", how: ["Manšeta na zunanji nogi, stojiš bočno ob škripcu", "Nogo vodi vstran in rahlo nazaj", "Trup miren, brez nagibanja"], yt: "standing cable hip abduction" },
    { id: "side-lying-abd", name: "Side-Lying Hip Abduction", cat: "rit", g: ["med", "min"], img: "Side_Leg_Raises", sets: 3, reps: "15–20 / nogo", bw: true, how: ["Leži na boku, spodnja noga pokrčena", "Zgornjo nogo dvigni rahlo nazaj, prsti naprej", "Počasi, z elastiko ali utežjo za gleženj"], yt: "side lying hip abduction glute medius" },
    { id: "banded-walk", name: "Banded Lateral Walk", cat: "rit", g: ["med", "min"], img: "Monster_Walk", sets: 3, reps: "15 korakov / smer", bw: true, how: ["Elastika nad koleni ali na gležnjih", "Polčep, kolena potiskaj navzven", "Majhni koraki, napetost ves čas"], yt: "banded lateral walk glutes" },
    { id: "clamshell", name: "Clamshell (band)", cat: "rit", g: ["med", "min"], sets: 3, reps: "15–20 / nogo", bw: true, how: ["Leži na boku, kolena pokrčena, elastika nad koleni", "Odpri zgornje koleno, stopala ostanejo skupaj", "Boki se ne zavrtijo nazaj"], yt: "clamshell exercise band" },
    { id: "fire-hydrant", name: "Fire Hydrant", cat: "rit", g: ["med"], sets: 3, reps: "15 / nogo", bw: true, how: ["Na vseh štirih", "Pokrčeno nogo dvigni vstran", "Trup ostane miren, z elastiko je težje"], yt: "fire hydrant exercise form" },
    { id: "back-ext-glute", name: "45° Back Extension (glute focus)", cat: "rit", g: ["max"], img: "Hyperextensions_Back_Extensions", sets: 3, reps: "12–15", how: ["Blazina pod boki, stopala obrnjena navzven", "Zgornji hrbet zaokrožen, brada k prsim", "Dvigni se s stiskom riti, ne s križem"], yt: "glute focused back extension 45 degree" },
    { id: "reverse-hyper", name: "Reverse Hyperextension", cat: "rit", g: ["max"], img: "Reverse_Hyperextension", sets: 3, reps: "12–15", how: ["Trup na klopi, noge visijo", "Noge dvigni do ravnine s stiskom riti", "Brez zamaha"], yt: "reverse hyperextension form" },
    { id: "pull-through", name: "Cable Pull-Through", cat: "rit", g: ["max"], img: "Pull_Through", sets: 3, reps: "12–15", how: ["Vrv med nogami, obrnjena stran od škripca", "Boki nazaj, hrbet raven", "Naprej pridi s stiskom riti"], yt: "cable pull through form" },
    { id: "kb-swing", name: "Kettlebell Swing", cat: "rit", g: ["max"], img: "One-Arm_Kettlebell_Swings", sets: 3, reps: "15", how: ["Gib iz bokov, ne iz počepa", "Na vrhu močno stisni rit", "Roke samo vodijo utež"], yt: "kettlebell swing proper form" },
    { id: "sumo-dl", name: "Sumo Deadlift", cat: "rit", g: ["max"], img: "Sumo_Deadlift", sets: 3, reps: "6–8", how: ["Široka stoja, prsti navzven", "Kolena potiskaj navzven, hrbet raven", "Na vrhu stisni rit, ne usloči križa"], yt: "sumo deadlift form" },
    { id: "curtsy-lunge", name: "Curtsy Lunge", cat: "rit", g: ["med", "max"], sets: 3, reps: "10 / nogo", how: ["Zadnjo nogo prekriži za sprednjo", "Spusti se počasi, koleno sledi prstom", "Potiskaj skozi sprednjo peto"], yt: "curtsy lunge form" },
    // ---------- NOGE ----------
    { id: "rdl", name: "Romanian Deadlift", cat: "noge", g: ["max"], img: "Romanian_Deadlift", sets: 3, reps: "8–10", how: ["Kolena rahlo pokrčena", "Boke potiskaj nazaj, drog drsi ob nogah", "Navzdol do raztega zadnje lože"], yt: "romanian deadlift form" },
    { id: "db-rdl", name: "Dumbbell RDL", cat: "noge", g: ["max"], img: "Stiff-Legged_Dumbbell_Deadlift", sets: 3, reps: "10–12", how: ["Ročke ob nogah", "Boki nazaj, hrbet raven", "Gor s stiskom riti"], yt: "dumbbell romanian deadlift form" },
    { id: "b-stance-rdl", name: "B-Stance RDL", cat: "noge", g: ["max"], sets: 3, reps: "10 / nogo", how: ["Zadnja noga je samo opora na prstih", "Teža na sprednji nogi", "Boki ostanejo poravnani"], yt: "b stance rdl" },
    { id: "good-morning", name: "Good Morning", cat: "noge", g: ["max"], img: "Good_Morning", sets: 3, reps: "10", how: ["Drog na hrbtu", "Boki nazaj, kolena rahlo pokrčena", "Lahka teža, poudarek na raztegu"], yt: "good morning exercise form" },
    { id: "lying-leg-curl", name: "Lying Leg Curl", cat: "noge", img: "Lying_Leg_Curls", sets: 3, reps: "10–12", how: ["Boki na blazini", "Navzdol počasi, 3 s", "Brez sunkov"], yt: "lying leg curl form" },
    { id: "seated-leg-curl", name: "Seated Leg Curl", cat: "noge", img: "Seated_Leg_Curl", sets: 3, reps: "10–12", how: ["Trup rahlo nagni naprej za večji razteg", "Na dnu stisni 1 s", "Nazaj počasi"], yt: "seated leg curl form" },
    { id: "bulgarian", name: "Bulgarian Split Squat (glute bias)", cat: "noge", g: ["max", "med"], img: "Split_Squat_with_Dumbbells", sets: 3, reps: "8–10 / nogo", how: ["Sprednja noga malo dlje od klopi", "Trup nagni naprej, da bolj dela rit", "Potiskaj skozi sprednjo peto"], yt: "bulgarian split squat glute focus" },
    { id: "deficit-rev-lunge", name: "Deficit Reverse Lunge", cat: "noge", g: ["max"], img: "Dumbbell_Rear_Lunge", sets: 3, reps: "10 / nogo", how: ["Sprednja noga na plošči ali stopnici", "Stopi nazaj in se spusti globoko", "Trup rahlo naprej"], yt: "deficit reverse lunge glutes" },
    { id: "walking-lunge", name: "Dumbbell Walking Lunge", cat: "noge", g: ["max"], img: "Dumbbell_Lunges", sets: 3, reps: "10 / nogo", how: ["Dolgi koraki = več riti", "Zadnje koleno skoraj do tal", "Trup pokonci ali rahlo naprej"], yt: "walking lunge glute focus" },
    { id: "step-up", name: "Dumbbell Step-up", cat: "noge", g: ["max", "med"], img: "Dumbbell_Step_Ups", sets: 3, reps: "10 / nogo", how: ["Visoka klop, koleno nad boki", "Odrini se samo s sprednjo nogo", "Navzdol počasi"], yt: "dumbbell step up glutes" },
    { id: "goblet-squat", name: "Goblet Squat", cat: "noge", g: ["max"], img: "Goblet_Squat", sets: 3, reps: "10–12", how: ["Ročka ob prsih", "Komolci med kolena, globoko", "Pete na tleh"], yt: "goblet squat form" },
    { id: "back-squat", name: "Barbell Back Squat", cat: "noge", g: ["max"], img: "Barbell_Squat", sets: 3, reps: "8–10", how: ["Drog na zgornjem hrbtu", "Kolena v smeri prstov", "Vsaj do vzporedno"], yt: "barbell back squat form" },
    { id: "hack-squat", name: "Hack Squat", cat: "noge", g: ["max"], img: "Hack_Squat", sets: 3, reps: "10–12", how: ["Stopala višje na plošči = več riti", "Globoko, križ na naslonu", "Na vrhu ne zakleni kolen"], yt: "hack squat glute focus" },
    { id: "leg-press-high", name: "Leg Press (feet high and wide)", cat: "noge", g: ["max"], img: "Leg_Press", sets: 3, reps: "12", how: ["Stopala visoko in široko na plošči", "Globoko, a križ ostane na sedežu", "Potiskaj skozi pete"], yt: "leg press glute focus feet high" },
    { id: "leg-ext", name: "Leg Extension", cat: "noge", img: "Leg_Extensions", sets: 3, reps: "12–15", how: ["Hrbet na naslonu", "Na vrhu stisni 1 s", "Navzdol počasi"], yt: "leg extension form" },
    { id: "calf-raise", name: "Standing Calf Raise", cat: "noge", img: "Standing_Calf_Raises", sets: 3, reps: "12–15", how: ["Polna amplituda", "Na vrhu 1 s", "Na dnu raztegni"], yt: "calf raise form" },
    // ---------- ZGORNJI DEL ----------
    { id: "lat-pulldown", name: "Lat Pulldown", cat: "zgornji", img: "Wide-Grip_Lat_Pulldown", sets: 3, reps: "10–12", how: ["Prsi naprej in navzgor", "Drog do zgornjih prsi", "Komolci navzdol, ne nazaj"], yt: "lat pulldown form" },
    { id: "assisted-pullup", name: "Assisted Pull-up", cat: "zgornji", img: "Band_Assisted_Pull-Up", sets: 3, reps: "6–10", how: ["Elastika ali naprava za pomoč", "Iz polnega visa, lopatice navzdol", "Vleci prsi proti drogu"], yt: "assisted pull up form" },
    { id: "seated-row", name: "Seated Cable Row", cat: "zgornji", img: "Seated_Cable_Rows", sets: 3, reps: "10–12", how: ["Hrbet raven", "Ročaj proti popku, lopatice skupaj", "Nazaj počasi"], yt: "seated cable row form" },
    { id: "db-row", name: "One-Arm Dumbbell Row", cat: "zgornji", img: "One-Arm_Dumbbell_Row", sets: 3, reps: "10–12", how: ["Roka in koleno na klopi", "Komolec proti boku", "Trup se ne obrača"], yt: "one arm dumbbell row form" },
    { id: "db-shoulder-press", name: "Dumbbell Shoulder Press", cat: "zgornji", img: "Dumbbell_Shoulder_Press", sets: 3, reps: "8–12", how: ["Sedi pokonci, hrbet na naslonu", "Ročke nad glavo, brez loka v križu", "Navzdol do ušes"], yt: "dumbbell shoulder press form" },
    { id: "arnold-press", name: "Arnold Press", cat: "zgornji", img: "Arnold_Dumbbell_Press", sets: 3, reps: "10–12", how: ["Začni z dlanmi proti sebi", "Med potiskom zavrti dlani naprej", "Počasi nazaj"], yt: "arnold press form" },
    { id: "lateral-raise", name: "Dumbbell Lateral Raise", cat: "zgornji", img: "Side_Lateral_Raise", sets: 3, reps: "12–15", how: ["Komolci rahlo pokrčeni", "Do višine ramen", "Navzdol počasi"], yt: "lateral raise form" },
    { id: "reverse-fly", name: "Reverse Dumbbell Fly", cat: "zgornji", img: "Reverse_Flyes", sets: 3, reps: "12–15", how: ["Nagnjena naprej ali na klopi", "Roke vstran, lopatice skupaj", "Lahka teža"], yt: "reverse dumbbell fly form" },
    { id: "face-pull", name: "Face Pull", cat: "zgornji", img: "Face_Pull", sets: 3, reps: "15", how: ["Vrv v višini oči", "Vleci proti obrazu, komolci visoko", "Na koncu roke zavrti navzven"], yt: "face pull form" },
    { id: "incline-db-press", name: "Incline Dumbbell Press", cat: "zgornji", img: "Incline_Dumbbell_Press", sets: 3, reps: "8–12", how: ["Klop na 30 stopinj", "Ročke nad zgornjimi prsmi", "Komolci 45 stopinj od telesa"], yt: "incline dumbbell press form" },
    { id: "push-up", name: "Push-up", cat: "zgornji", img: "Pushups", sets: 3, reps: "max", bw: true, how: ["Telo ravno kot deska", "Komolci 45 stopinj", "Če je pretežko, roke na klop"], yt: "push up form" },
    { id: "rope-pushdown", name: "Triceps Rope Pushdown", cat: "zgornji", img: "Triceps_Pushdown_-_Rope_Attachment", sets: 2, reps: "12–15", how: ["Komolci ob telesu", "Do konca iztegni in razpri vrv", "Nazaj počasi"], yt: "tricep rope pushdown form" },
    { id: "db-curl", name: "Dumbbell Biceps Curl", cat: "zgornji", img: "Dumbbell_Bicep_Curl", sets: 2, reps: "10–12", how: ["Komolci ob telesu", "Brez zibanja", "Navzdol počasi"], yt: "dumbbell bicep curl form" },
    // ---------- CORE ----------
    { id: "dead-bug", name: "Dead Bug", cat: "core", img: "Dead_Bug", sets: 3, reps: "8 / stran", bw: true, how: ["Križ ves čas pritisnjen v tla", "Iztegni nasprotno roko in nogo", "Počasi, izdihni ob iztegu"], yt: "dead bug exercise form" },
    { id: "plank", name: "Plank", cat: "core", img: "Plank", sets: 3, reps: "30–45 s", bw: true, unit: "s", how: ["Komolci pod rameni", "Stisni rit in trebuh", "Telo ravno, boki ne visijo"], yt: "plank proper form" },
    { id: "side-plank", name: "Side Plank", cat: "core", img: "Side_Bridge", sets: 3, reps: "30 s / stran", bw: true, unit: "s", how: ["Komolec pod ramo", "Boki visoko, telo ravno", "Dela tudi srednja ritna mišica"], yt: "side plank form" },
    { id: "pallof", name: "Pallof Press", cat: "core", img: "Pallof_Press", sets: 3, reps: "10 / stran", how: ["Bočno ob škripcu", "Iztegni roke naprej, trup se ne zavrti", "Zadrži 2 s"], yt: "pallof press form" },
    { id: "cable-crunch", name: "Cable Crunch", cat: "core", img: "Cable_Crunch", sets: 3, reps: "12–15", how: ["Kleči pred škripcem, vrv ob glavi", "Zvij se navzdol s trebuhom", "Boki ostanejo mirni"], yt: "cable crunch form" },
    { id: "hanging-knee-raise", name: "Hanging Knee Raise", cat: "core", img: "Hanging_Leg_Raise", sets: 3, reps: "10–12", bw: true, how: ["Brez zamaha", "Kolena proti prsim, podvij medenico", "Navzdol počasi"], yt: "hanging knee raise form" }
  ];
  var byId = {}; L.forEach(function (e) { byId[e.id] = e; });
  function R(id, sets, reps) { var e = byId[id]; return { lib: id, sets: sets || e.sets, reps: reps || e.reps }; }
  return {
    LIB: L, byId: byId,
    CATS: [["vse", "Vse"], ["rit", "Rit"], ["stran", "Stranska rit"], ["noge", "Noge"], ["zgornji", "Zgornji del"], ["core", "Core"], ["moje", "Moje"]],
    GLUTE: { max: "velika ritna", med: "srednja ritna", min: "mala ritna" },
    DAYS: {
      BA: { name: "Rit + zadnja loža", short: "Rit A", sub: "hip thrust", ex: [R("hip-thrust"), R("rdl"), R("bulgarian"), R("back-ext-glute"), R("hip-abd-machine"), R("lying-leg-curl"), R("dead-bug")] },
      BZ: { name: "Zgornji del", short: "Zgornji", sub: "hrbet in ramena", ex: [R("lat-pulldown"), R("seated-row"), R("db-shoulder-press"), R("lateral-raise"), R("incline-db-press"), R("face-pull"), R("rope-pushdown"), R("plank")] },
      BB: { name: "Rit + kvadricepsi", short: "Rit B", sub: "počep in izpadni", ex: [R("back-squat"), R("sl-hip-thrust"), R("deficit-rev-lunge"), R("leg-press-high"), R("cable-kickback"), R("banded-walk"), R("pallof")] },
      BC: { name: "Rit + celo telo", short: "Rit C", sub: "sumo in pump", ex: [R("sumo-dl"), R("kas-bridge"), R("step-up"), R("seated-leg-curl"), R("assisted-pullup"), R("db-row"), R("cable-abd"), R("side-plank")] }
    },
    ORDER: ["BA", "BZ", "BB", "BC"],
    PLAN: { 1: "BA", 2: "BZ", 3: "cardio", 4: "BB", 5: "rest", 6: "rest", 0: "BC" },
    START: { d: "2026-11-25", kg: 57 },
    PROTEIN: 115,
    MEALS: {
      t: { kcal: "~2.300–2.400", p: "110–130 g", f: "65–75 g", c: "~300 g", rows: [
        ["Zajtrk", "80 g ovsenih kosmičev, 250 ml mleka, žlica arašidovega masla, jagodičevje", 595, 23],
        ["Malica", "200 g grškega jogurta, 40 g granole, banana", 485, 25],
        ["Kosilo", "150 g piščančjih prsi, 80 g riža (suh), zelenjava, žlica olivnega olja", 625, 53],
        ["Pred treningom", "2 riževa vaflja z medom, banana", 250, 3],
        ["Večerja", "Omleta iz 2 jajc in 50 g šunke, 2 kosa kruha, solata", 450, 30]] },
      p: { kcal: "~2.100–2.200", p: "110–130 g", f: "65–75 g", c: "~250 g", rows: [
        ["Zajtrk", "80 g ovsenih kosmičev, 250 ml mleka, žlica arašidovega masla, jagodičevje", 595, 23],
        ["Malica", "200 g grškega jogurta, 40 g granole, banana", 485, 25],
        ["Kosilo", "150 g lososa, 200 g krompirja, zelenjava", 495, 37],
        ["Popoldne", "150 g skute, sadje", 180, 18],
        ["Večerja", "70 g polnozrnatih testenin, 100 g puranjega mesa, paradižnikova omaka, parmezan", 460, 39]] }
    },
    REWARDS: [
      { id: "b8", need: "tr", n: 8, txt: "Nove pajkice za fitnes", lab: "8 treningov" },
      { id: "b16", need: "tr", n: 16, txt: "Masaža", lab: "16 treningov" },
      { id: "bs4", need: "streak", n: 4, txt: "Wellness dan z Vidom", lab: "4 tedne zapored" },
      { id: "b32", need: "tr", n: 32, txt: "Nove superge za fitnes", lab: "32 treningov" },
      { id: "b48", need: "tr", n: 48, txt: "Fotografiranje napredka", lab: "48 treningov" },
      { id: "b100", need: "tr", n: 100, txt: "Vikend izlet", lab: "100 treningov" }
    ]
  };
})();
