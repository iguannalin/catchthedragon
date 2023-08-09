window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  function getRandomPosition() {  
    let wOffset = window.innerWidth / 20;
    let hOffset = window.innerHeight / 25;
    let w = window.innerWidth - wOffset;
    let h = window.innerHeight - hOffset;
    return {top: getRandomInt(hOffset, h/3), left: getRandomInt(wOffset, w/4)};
  }

  let poem = document.getElementById("poem");
  let phrases = [];
  let foundPhrases = [];
  let isDown = true;
  let top = 0;
  let left = 0;
  let inc = 24;

  // amazing chengyu data source -- http://thuocl.thunlp.org/
  fetch("https://annaylin.com/100-days/chengyu/THUOCL_chengyu.txt").then((f) => f.text()).then((r) => {
    phrases = r.split(",");
    let x = getRandomPosition();
    top = x.top;
    left = x.left;
    getRandomPhrase();
  });
  
  function showPhrase(phrase) { // hehe
    if (!phrase) return;
    let div = document.createElement("div");
    if (!isDown) {
      div.style.writingMode = "horizontal-tb";
      div.style.top = `${top}px`;
      div.style.left = `${left += inc}px`;
    } else {
      div.style.left = `${left}px`;
      div.style.top = `${top += inc}px`;
    }
    isDown = !isDown;
    phrase.split("").forEach((letter, index) => {
      let span = document.createElement("a");
      span.innerHTML = letter;
      if (index == (phrase.length - 1)) span.innerHTML += "  ";
      span.classList = "grayed";
      span.onclick = connectWord;
      div.appendChild(span);
    });
    console.log({top, left});
    poem.appendChild(div);
  }

  function connectWord(e) {
    e.target.onclick = null;
    e.target.classList.remove("grayed");
    console.log(e.target);
    let target = e.target.innerText;
    let found = phrases.find((v) => v.startsWith(target) && !foundPhrases.includes(v));
    showPhrase(found);
  }

  function getRandomPhrase() {
    let phrase = phrases[getRandomInt(0, phrases.length)];
    foundPhrases.push(phrase);
    showPhrase(phrase);
  }
});