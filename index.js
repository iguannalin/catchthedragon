window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  let div = document.getElementById("poem");
  let phrases = [];
  let foundPhrases = [];

  // amazing chengyu data source -- http://thuocl.thunlp.org/
  fetch("https://annaylin.com/100-days/chengyu/THUOCL_chengyu.txt").then((f) => f.text()).then((r) => {
    phrases = r.split(",");
    getRandomPhrase();
  });
  
  function showPhrase(phrase) { // hehe
    if (!phrase) return;
    phrase.split("").forEach((letter, index) => {
      let span = document.createElement("a");
      span.innerHTML = letter;
      if (index == (phrase.length - 1)) span.innerHTML += "  ";
      span.classList = "grayed";
      span.onclick = connectWord;
      div.appendChild(span);
    });
  }

  function connectWord(e) {
    e.target.onclick = null;
    e.target.classList.remove("grayed");
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