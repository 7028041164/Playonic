let data = {
  word: {
    easy: [
      "cat","dog","sun","car","pen","hat","cup","bat","box","toy",
      "run","eat","red","blue","day","sky","sea","bed","map","key",
      "fan","egg","ice","boy","girl","tree","milk","fish","bird","home",
      "book","door","road","star","moon","rain","wind","fire","leaf","rock",
      "ship","farm","hill","lake","ring","ball","lamp","desk","shoe","coat"
    ],

    medium: [
      "coding","typing","speed","browser","game","player","system","screen","keyboard","monitor",
      "window","button","design","layout","engine","script","object","array","string","number",
      "random","timer","input","output","result","update","function","event","style","color",
      "border","shadow","margin","padding","flexbox","grid","center","align","display","hover",
      "focus","click","scroll","value","change","select","option","level","mode","score"
    ],

    hard: [
      "javascript","optimization","performance","developer","interface","application","architecture","asynchronous","functionality","implementation",
      "configuration","compatibility","integration","environment","interaction","efficiency","complexity","validation","manipulation","initialization",
      "transformation","calculation","representation","generation","customization","responsiveness","accessibility","modification","distribution","execution",
      "compilation","interpretation","abstraction","inheritance","encapsulation","polymorphism","synchronization","authentication","authorization","encryption",
      "compression","decompression","virtualization","containerization","scalability","maintainability","readability","debugging","refactoring","deployment"
    ]
  },

  sentence: {
    easy: [
      "the cat runs fast",
      "i like my dog",
      "sun is very hot",
      "this is a red ball",
      "she has a blue pen",
      "we play in the park",
      "he drinks milk daily",
      "birds fly in the sky",
      "the fish swims fast",
      "i read a good book",
      "the boy runs quickly",
      "the girl sings well",
      "it is a sunny day",
      "the wind is cool",
      "the fire is hot",
      "the tree is tall",
      "the road is long",
      "the sky is blue",
      "the stars shine bright",
      "the moon looks big",
      "the rain is falling",
      "i have a small toy",
      "he has a big house",
      "we go to school",
      "they play together"
    ],

    medium: [
      "coding is very interesting",
      "typing speed is important",
      "practice makes a man perfect",
      "the browser loads the page",
      "i like playing typing games",
      "this system works very well",
      "he writes code every day",
      "she learns new skills fast",
      "we build simple web apps",
      "the keyboard is very smooth",
      "focus improves typing speed",
      "accuracy is more important",
      "the screen shows results clearly",
      "we should avoid making mistakes",
      "the program runs without errors",
      "learning coding takes time",
      "good design improves user experience",
      "we use functions in javascript",
      "events trigger actions in code",
      "styling makes apps attractive",
      "practice daily to improve speed",
      "the game becomes more challenging",
      "try to type without looking",
      "consistency is the key to success",
      "improving skills requires patience"
    ],

    hard: [
      "javascript is a powerful language",
      "performance optimization is important",
      "developers build amazing applications",
      "asynchronous code improves efficiency",
      "clean code increases readability",
      "debugging helps find hidden errors",
      "responsive design improves usability",
      "modern apps require scalability",
      "efficient algorithms save time",
      "understanding concepts is essential",
      "complex problems need smart solutions",
      "software development requires practice",
      "optimization reduces load time significantly",
      "secure systems prevent unauthorized access",
      "good architecture improves maintainability",
      "writing reusable code saves effort",
      "testing ensures code reliability",
      "version control helps track changes",
      "deployment makes apps live online",
      "user experience defines product success",
      "handling errors is very important",
      "modular code improves flexibility",
      "clean interfaces enhance usability",
      "high performance systems scale better",
      "continuous learning makes better developers"
    ]
  }
};

let currentWord = "";
let time = 0;
let totalTime = 0;
let timer;

let totalTyped = 0;
let correctTyped = 0;

const home = document.getElementById("setup");
const game = document.getElementById("game");
const result = document.getElementById("result");

const wordEl = document.getElementById("word");
const input = document.getElementById("input");
const progressBar = document.getElementById("progressBar");

/* SOUND EFFECTS */
const clickSound = document.getElementById("correctSound"); // click.mp3
const typeSound = document.getElementById("typeSound"); // type.mp3
const errorSound = document.getElementById("wrongSound"); // error.mp3

/* SCREEN SWITCH */
function show(x){
  mainHome.classList.remove("active");
  home.classList.remove("active");
  game.classList.remove("active");
  result.classList.remove("active");
  x.classList.add("active");
}

/* START GAME */
function startGame(){

  // Start button click sound
  clickSound.currentTime = 0;
  clickSound.play();

  let t = document.getElementById("timeSelect").value;

  time = parseInt(t);
  totalTime = time;

  totalTyped = 0;
  correctTyped = 0;

  show(game);
  input.value = "";
  input.focus();

  nextWord();

  progressBar.style.width = "100%";

  timer = setInterval(()=>{
    time--;
    document.getElementById("time").innerText = time;

    let percent = (time / totalTime) * 100;
    progressBar.style.width = percent + "%";

    if(time <= 0){
      endGame();
    }

    updateStats();
  },1000);
}

/* NEW WORD / SENTENCE / PARAGRAPH */
function nextWord(){
  let level = document.getElementById("level").value;
  let mode = document.getElementById("mode").value;

  if(mode === "paragraph"){
    currentWord = generateParagraph(level);
  } 
  else {
    let list = data[mode][level];
    currentWord = list[Math.floor(Math.random() * list.length)];
  }

  wordEl.innerHTML = currentWord
    .split("")
    .map(letter => `<span>${letter}</span>`)
    .join("");
}

/* INPUT LOGIC */
input.addEventListener("input", ()=>{

  // Every letter typing sound
  typeSound.currentTime = 0;
  typeSound.play();

  let typed = input.value;
  let spans = wordEl.querySelectorAll("span");

  spans.forEach((span, i)=>{
    let char = typed[i];

    if(char == null){
      span.classList.remove("correct","wrong");
    }
    else if(char === span.innerText){
      span.classList.add("correct");
      span.classList.remove("wrong");
    }
    else{
      span.classList.add("wrong");
      span.classList.remove("correct");

      // Wrong letter sound
      errorSound.currentTime = 0;
      errorSound.play();
    }
  });

  totalTyped = typed.length;

  let correctNow = [...spans].filter(s=>s.classList.contains("correct")).length;
  correctTyped = correctNow;

  if(typed === currentWord){
    input.value = "";
    nextWord();
  }

  updateStats();
});

/* STATS */
function updateStats(){
  let timeUsed = (totalTime - time) / 60;

  let wpm = timeUsed > 0
    ? Math.round((correctTyped / 5) / timeUsed)
    : 0;

  let acc = totalTyped > 0
    ? Math.round((correctTyped / totalTyped) * 100)
    : 100;

  document.getElementById("wpm").innerText = wpm;
  document.getElementById("acc").innerText = acc;
}

/* END GAME */
function endGame(){
  clearInterval(timer);

  let wpm = parseInt(document.getElementById("wpm").innerText);
  let acc = document.getElementById("acc").innerText;

  let timeUsed = totalTime - time;

  let best = localStorage.getItem("bestWPM") || 0;
  if(wpm > best){
    best = wpm;
    localStorage.setItem("bestWPM", wpm);
  }

  let performanceText = "";

  if(wpm < 20){
    performanceText = "🐢 Beginner";
  }
  else if(wpm < 40){
    performanceText = "👍 Average";
  }
  else if(wpm < 60){
    performanceText = "🔥 Good";
  }
  else if(wpm < 80){
    performanceText = "🚀 Pro";
  }
  else{
    performanceText = "⚡ God Level";
  }

  document.getElementById("rwpm").innerText = wpm;
  document.getElementById("racc").innerText = acc;
  document.getElementById("rtime").innerText = timeUsed;
  document.getElementById("bestWpm").innerText = best;
  document.getElementById("performance").innerText = performanceText;

  show(result);
}

/* PLAY AGAIN BUTTON */
function restartGame(){
  clickSound.currentTime = 0;
  clickSound.play();

  startGame();
}

/* HOME */
function goHome(){

  clickSound.currentTime = 0;
  clickSound.play();

  clearInterval(timer);

  show(mainHome);
}

/* PARAGRAPH GENERATOR */
function generateParagraph(level){

  let sentences = data.sentence[level];

  let count = 0;

  if(level === "easy") count = 2;
  else if(level === "medium") count = 3;
  else count = 4;

  let paragraph = [];

  for(let i = 0; i < count; i++){
    let randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    paragraph.push(randomSentence);
  }

  let text = paragraph.join(". ");

  text = text.charAt(0).toUpperCase() + text.slice(1) + ".";

  return text;
}




const mainHome = document.getElementById("mainHome");
const bgMusic = document.getElementById("bgMusic");

function goToSetup() {
  clickSound.currentTime = 0;
  clickSound.play();

  // BG Music Start
  bgMusic.volume = 0.9;
  bgMusic.play();

  mainHome.classList.remove("active");
  home.classList.add("active");
}

