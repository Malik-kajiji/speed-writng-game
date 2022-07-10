// all elements vars
let Keyboard = document.querySelector(".keyboard");
let KeyboardLines = document.querySelectorAll(".keyboard div");
let SittingsBtn = document.querySelector(".sittings-btn");
let SittingsSection = document.querySelector(".sittings-section");
let SittingsDifficulty = document.querySelector(".difficulty");
let DifficultyOptions = document.querySelectorAll(".difficulty+div span");
let SittingsSound = document.querySelector(".sound");
let SoundOptions = document.querySelectorAll(".sound+div span");
let StartBtn = document.querySelector(".start-btn");
let WordInput = document.querySelector(".word-input")
let TheWord = document.querySelector(".word");
// create the keyboard
Array.from("qwertyuiop").forEach((e)=>{ // first line of keyboard
    let Btn = document.createElement("span");
    Btn.innerHTML = e.toLocaleUpperCase();
    KeyboardLines[0].appendChild(Btn);
});

Array.from("asdfghjkl").forEach((e)=>{ // second line of keyboard
    let Btn = document.createElement("span");
    Btn.innerHTML = e.toLocaleUpperCase();
    KeyboardLines[1].appendChild(Btn);
});

Array.from("zxcvbnm").forEach((e)=>{ // third line of keyboard
    let Btn = document.createElement("span");
    Btn.innerHTML = e.toLocaleUpperCase();
    KeyboardLines[2].appendChild(Btn);
});

// to make the keyboard active

window.addEventListener('keydown', (e)=>{
    let AllKeyboardBtns = document.querySelectorAll(".keyboard span");
    if(e.key === " "){
        let SpaceBtn = document.querySelector(".keyboard .space-btn");
        SpaceBtn.classList.add("active-btn");
        setTimeout(() => {
            SpaceBtn.classList.remove("active-btn");
        }, 250);
    }
    AllKeyboardBtns.forEach((btn)=>{
        if(e.key.toLocaleLowerCase() === btn.innerHTML.toLocaleLowerCase()){
            btn.classList.add("active-btn");
        }
        setTimeout(() => {
            btn.classList.remove("active-btn");
        }, 250);
    })
})

// sittings section

SittingsBtn.addEventListener('click',()=>{
    SittingsSection.classList.toggle("shown");
});
SittingsDifficulty.addEventListener('click',()=>{
    SittingsDifficulty.nextElementSibling.classList.toggle("shown");
    SittingsDifficulty.firstElementChild.classList.toggle("up");
    SittingsSound.nextElementSibling.classList.remove("shown");
    SittingsSound.firstElementChild.classList.remove("up");
});
DifficultyOptions.forEach((ele)=>{
    ele.addEventListener('click',()=>{
        DifficultyOptions.forEach((rem)=>{
            rem.classList.remove("chosen");
        });
        ele.classList.add("chosen")
    });
});
SittingsSound.addEventListener('click',()=>{
    SittingsSound.nextElementSibling.classList.toggle("shown");
    SittingsSound.firstElementChild.classList.toggle("up");
    SittingsDifficulty.nextElementSibling.classList.remove("shown");
    SittingsDifficulty.firstElementChild.classList.remove("up");
});
SoundOptions.forEach((ele)=>{
    ele.addEventListener('click',()=>{
        ele.classList.toggle("mute");
    });
});

// start the game
StartBtn.addEventListener('click',()=>{
    InputFocus();
    StartTimer();
    setTimeout(() => {
        GetDate();
    }, 4000);
});
// to focus on the input
function InputFocus(){
    StartBtn.classList.add("start");
    setTimeout(() => {
        StartBtn.style.display = "none";
    }, 300);
    WordInput.focus();
}
// the Start timer
function StartTimer(){
    for(let i=3; i>0 ; i--){
        setTimeout(() => {
            TheWord.innerHTML = i;
        }, 4000-(1000 * i));
    }
}
// get the random word
function GetDate(){
    fetch("https://random-word-api.herokuapp.com/word").then((data)=>{
        let word = data.json();
        return word;
    }).then((word)=>{
        TheWord.innerHTML = word[0];
    }).catch(()=>{
        StartBtn.click();
    })
}