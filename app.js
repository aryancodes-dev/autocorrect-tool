// Autocorrect Tool v20 ADVANCED — Project #03. Levenshtein distance + common-misspellings map.
// Works offline, no server, no account. Personal words + history live only on this phone.
// v20 advanced fixes: split words (alot -> a lot), double words, lone "i" -> "I",
// capital after . ! ?, spacing after punctuation, collapsed double spaces.
const WORDS = ("the be to of and a in that it was for on are as with his they i at be this have from or one had by word but not what all were we when your can said there use an each which she do how their if will up other about out many then them these so some her would make like him into time has look two more write go see number no way could people my than first water been call who oil its now find long down day did get come made may part over new sound take only little work know place year live me back give most very after thing our just name good sentence man think say great where help through much before line right too mean old any same tell boy follow came want show also around form three small set put end does another well large must big even such because turn here why ask went men read need land different home us move try kind hand picture again change off play spell air away animal house point page letter mother answer found study still learn should world high every near add food between own below country plant last school father keep tree never start city earth eye light thought head under story saw left few while along might close something seem next hard open example begin life always those both paper together got group often run important until children side feet car mile night walk white sea began grow took river four carry state once book hear stop without second later miss idea enough eat face watch far indian real almost let above girl sometimes mountains cut young talk soon list song leave family body music color stand sun questions fish area mark dog horse birds problem complete room knew since ever piece told usually did not friends easy heard order red door sure become top ship across today during short better best however low hours black products happened whole measure remember early waves reached listen wind rock space covered fast several hold himself toward five step morning passed vowel true hundred against pattern numeral table north slowly money map busy pulled draw voice seen cold cried plan notice south sing war ground fall king town ill unit figure certain field travel wood fire upon done english road halt ten fly gave box finally wait correct oh quickly person became shown minutes strong verb stars front feel fact inches street decided contain course surface produce building ocean class note nothing rest carefully scientists inside wheels stay green known island week less machine base ago stand plane system behind ran round boat game force brought understand warm common bring explain dry though language shape deep thousands yes clear equation yet government filled heat full hot check object am among").split(" ");
const EXTRA = ("i is am hello hi going went come came get got take took see saw know knew think thought say said tell told ask asked work worked play played live lived love loved like liked want wanted need needed help helped try tried call called keep kept feel felt leave left put set cut run ran walk walked talk talked look looked use used find found give gave make made receive address tomorrow definitely separate writing friend school college computer python javascript program project student teacher exam question answer study learn book library science mathematics english history geography physics chemistry biology technology internet mobile phone laptop keyboard mouse screen window door table chair house family mother father brother sister friend happy sad good bad beautiful important different because people children woman women man men child day night morning evening today yesterday week month year time place world country india delhi kolkata mumbai chennai bangalore hyderabad").split(" ");
const DICT = new Set([...WORDS, ...EXTRA]);
// Common misspellings people actually type — these win over distance, so they are always right.
const MISSPELL = {
  recieve:"receive", receieve:"receive", adress:"address", addres:"address", tommorow:"tomorrow", tommoroww:"tomorrow",
  definately:"definitely", definitelyy:"definitely", seperate:"separate", separete:"separate", occurr:"occur", occured:"occurred",
  writting:"writing", freind:"friend", freinds:"friends", teh:"the", thier:"their", beleive:"believe", acheive:"achieve",
  neccessary:"necessary", necesary:"necessary", accomodate:"accommodate", enviroment:"environment", goverment:"government",
  independant:"independent", experiance:"experience", knowlege:"knowledge", libary:"library", publich:"publish",
  grammer:"grammar", vocabularly:"vocabulary", spellingg:"spelling", happyness:"happiness", untill:"until",
  withing:"within", comming:"coming", goin:"going", studing:"studying", exampl:"example", exampel:"example",
  langauge:"language", languague:"language", compiter:"computer", computar:"computer", mobil:"mobile",
  schol:"school", collage:"college", univercity:"university", studnet:"student", teachar:"teacher",
  wich:"which", whitch:"which", wen:"when", thay:"they", taht:"that", hte:"the", nad:"and", formm:"from",
  abuot:"about", becasue:"because", becuase:"because", thruogh:"through", throught:"through",
  importent:"important", diffrent:"different", diffrence:"difference", govermentt:"government",
  succes:"success", sucess:"success", bussiness:"business", buisness:"business", peice:"piece",
  wierd:"weird", neigbor:"neighbor", neighbourr:"neighbor", colourr:"color", favour:"favor",
  centre:"center", programme:"program", licence:"license", practise:"practice", realise:"realize",
  organise:"organize", recognise:"recognize", travelling:"traveling", cancelled:"canceled",
  "doesnt":"doesn't", "dont":"don't", "cant":"can't", "wont":"won't", "isnt":"isn't", "didnt":"didn't"
};
const $ = id => document.getElementById(id);
let customWords = load("ac-custom", []);
let history = load("ac-history", []);
let checked = 0, corrected = 0;
function load(k, f){ try { const v = JSON.parse(localStorage.getItem(k)); return v==null?f:v; } catch(e){ return f; } }
function save(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
function dictionary(){ return new Set([...DICT, ...customWords.map(w=>w.toLowerCase())]); }
function levenshtein(a, b){
  const m=a.length, n=b.length, dp=Array.from({length:m+1},(_,i)=>[i]);
  for(let j=1;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++) dp[i][j]=Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  return dp[m][n];
}
function suggestions(word, limit=5){
  const w = word.toLowerCase();
  if (!w) return [];
  if (MISSPELL[w]) return [MISSPELL[w]];
  if (w.length<=1) return []; // never "correct" a single letter like i / a
  const dict = dictionary();
  if (dict.has(w)) return [];
  const maxDist = w.length<=4 ? 1 : 2;
  const out = [];
  for (const d of dict) {
    if (Math.abs(d.length-w.length)>maxDist) continue;
    const dist = levenshtein(w, d);
    if (dist<=maxDist) out.push({word:d, dist});
  }
  out.sort((a,b)=>a.dist-b.dist || a.word.localeCompare(b.word));
  return out.slice(0, limit).map(x=>x.word);
}
function matchCase(original, corrected){
  if (original===original.toUpperCase() && original.length>1) return corrected.toUpperCase();
  if (original[0]===original[0].toUpperCase()) return corrected[0].toUpperCase()+corrected.slice(1);
  return corrected;
}
function correctWord(raw){
  const lower = raw.toLowerCase();
  if (dictionary().has(lower)) return raw;
  const sug = suggestions(lower, 1);
  return sug.length ? matchCase(raw, sug[0]) : raw;
}
const SPLIT_WORDS = {alot:"a lot", infrot:"in front", infront:"in front", atleast:"at least", incase:"in case", alotof:"a lot of", everydayy:"every day"};
function advancedFixes(text, changes){
  let out = text;
  // Split words
  out = out.replace(/\b(alot|infront|atleast|incase)\b/gi, (m)=>{ const f=SPLIT_WORDS[m.toLowerCase()]; if(f) changes.push(`${m} → ${f}`); return f; });
  // Double words: "the the" -> "the" (case-insensitive, keep first)
  out = out.replace(/\b([A-Za-z]+)\s+\1\b/gi, (m, w)=>{ changes.push(`double word "${m}" → "${w}"`); return w; });
  // Lone "i" -> "I"
  out = out.replace(/(^|\s)i(\s|[.,!?]|$)/g, (m, a, b)=>{ changes.push(`i → I`); return a+"I"+b; });
  // Space after punctuation if missing: "Hello.World" -> "Hello. World", "hello.world" -> "Hello. World"
  out = out.replace(/([.!?])([A-Za-z])/g, (m, p, ch)=>{ changes.push(`spacing after "${p}"`); return p+" "+ch; });
  // Collapse double spaces
  if (/\s{2,}/.test(out)) { out = out.replace(/\s{2,}/g, " "); changes.push("double spaces → single space"); }
  // Capitalise first letter of each sentence
  out = out.replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, (m)=>m.toUpperCase());
  return out;
}
function correctSentence(text){
  const changes = [];
  let out = text.replace(/[A-Za-z']+/g, (raw)=>{
    const lower = raw.toLowerCase();
    if (dictionary().has(lower)) return raw;
    const fixed = correctWord(raw);
    if (fixed.toLowerCase()!==lower) changes.push(`${raw} → ${fixed}`);
    return fixed;
  });
  if ($("advancedFix") && $("advancedFix").checked) out = advancedFixes(out, changes);
  return {out, changes};
}
function renderStats(){
  $("statsLine").textContent = `Words checked: ${checked} • Corrections: ${corrected} • Your words: ${customWords.length}`;
  $("customList").textContent = customWords.length ? customWords.join(", ") : "No personal words yet.";
  $("historyList").textContent = history.length ? history.slice(-10).reverse().join("  •  ") : "No corrections yet.";
}
function showWordSuggestions(){
  const raw = $("wordInput").value.trim();
  const chips = $("suggestions"); chips.innerHTML="";
  if (!raw || !/^[A-Za-z']+$/.test(raw)) { $("wordResult").textContent = raw ? "Type letters only for a single word — use the Sentence tab for full text." : "Type a word above — suggestions will appear live."; return; }
  checked++;
  const lower = raw.toLowerCase();
  if (dictionary().has(lower)) {
    $("wordResult").textContent = `✓ "${raw}" looks correct.`;
  } else {
    const sug = suggestions(lower, 5);
    if (sug.length) {
      $("wordResult").textContent = `Did you mean: ${matchCase(raw, sug[0])}?  (tap a suggestion to use it)`;
      sug.forEach(s=>{
        const b=document.createElement("button"); b.textContent=matchCase(raw, s);
        b.onclick=()=>{ $("wordInput").value=b.textContent; showWordSuggestions(); };
        chips.appendChild(b);
      });
    } else {
      $("wordResult").textContent = `No suggestion found for "${raw}". Tap "Learn this word" if it is a name or a correct word I do not know yet.`;
    }
  }
  renderStats();
}
function doCorrectWord(){
  const raw = $("wordInput").value.trim();
  if (!raw) return;
  const fixed = correctWord(raw);
  if (fixed.toLowerCase()!==raw.toLowerCase()) {
    corrected++; history.push(`${raw} → ${fixed}`); save("ac-history", history);
    $("wordInput").value = fixed;
  }
  showWordSuggestions(); renderStats();
}
function doCorrectSentence(){
  const text = $("sentenceInput").value;
  if (!text.trim()) return;
  checked += (text.match(/[A-Za-z']+/g)||[]).length;
  const {out, changes} = correctSentence(text);
  $("sentenceResult").textContent = out;
  $("changes").textContent = changes.length ? `Changed ${changes.length}: ${changes.join(", ")}` : "No changes — your sentence already looks correct.";
  corrected += changes.length;
  changes.forEach(c=>history.push(c)); save("ac-history", history);
  renderStats();
}
function addCustom(){
  const w = ($("customInput").value || $("wordInput").value || "").trim().toLowerCase();
  if (!w || !/^[a-z']+$/.test(w)) { alert("Type a word with letters only."); return; }
  if (!customWords.includes(w)) { customWords.push(w); save("ac-custom", customWords); }
  $("customInput").value="";
  showWordSuggestions(); renderStats();
}
$("wordInput").addEventListener("input", showWordSuggestions);
$("correctWordBtn").addEventListener("click", doCorrectWord);
$("learnWordBtn").addEventListener("click", addCustom);
$("correctSentenceBtn").addEventListener("click", doCorrectSentence);
$("copyBtn").addEventListener("click", async ()=>{
  const t = $("sentenceResult").textContent;
  if (!t || t.startsWith("Corrected")) return;
  try { await navigator.clipboard.writeText(t); $("changes").textContent = "Copied! ✓"; } catch(e){ alert("Copy failed — select the corrected text and copy it manually."); }
});
$("clearBtn").addEventListener("click", ()=>{ $("sentenceInput").value=""; $("sentenceResult").textContent="Corrected text will appear here."; $("changes").textContent=""; });
$("addCustomBtn").addEventListener("click", addCustom);
$("shareBtn").addEventListener("click", async ()=>{
  const t = $("sentenceResult").textContent;
  if (!t || t.startsWith("Corrected")) return;
  try { if (navigator.share) await navigator.share({text:t}); else await navigator.clipboard.writeText(t); } catch(e){}
});
$("exportBtn").addEventListener("click", ()=>{
  const t = $("sentenceResult").textContent;
  if (!t || t.startsWith("Corrected")) return;
  const blob = new Blob([t], {type:"text/plain"}); const a=document.createElement("a");
  a.href=URL.createObjectURL(blob); a.download="autocorrected.txt"; a.click();
});
let theme = load("ac-theme", "dark");
function applyTheme(){ document.body.classList.toggle("light", theme==="light"); $("themeBtn").textContent = theme==="light" ? "☀️" : "🌙"; }
$("themeBtn").addEventListener("click", ()=>{ theme = theme==="light" ? "dark" : "light"; save("ac-theme", theme); applyTheme(); });
applyTheme();
$("tabWord").addEventListener("click", ()=>{ $("tabWord").classList.add("active"); $("tabSentence").classList.remove("active"); $("wordPanel").style.display="block"; $("sentencePanel").style.display="none"; });
$("tabSentence").addEventListener("click", ()=>{ $("tabSentence").classList.add("active"); $("tabWord").classList.remove("active"); $("sentencePanel").style.display="block"; $("wordPanel").style.display="none"; });
document.querySelectorAll("[data-example]").forEach(b=>b.addEventListener("click", ()=>{
  const ex = b.dataset.example;
  if (ex.includes(" ")) { $("tabSentence").click(); $("sentenceInput").value=ex; doCorrectSentence(); }
  else { $("tabWord").click(); $("wordInput").value=ex; showWordSuggestions(); }
}));
renderStats();
