// all elements vars
let Keyboard = document.querySelector(".keyboard");
let KeyboardLines = document.querySelectorAll(".keyboard div");
let SittingsBtn = document.querySelector(".sittings-btn");
let SittingsSection = document.querySelector(".sittings-section");
let SittingsDifficulty = document.querySelector(".difficulty");
let DifficultyOptions = document.querySelectorAll(".difficulty+div span");
let SittingsSound = document.querySelector(".sound");
let SoundOptions = document.querySelectorAll(".sound+div .sound-span");
let ClearDataBtn = document.querySelector(".clear-data");
let StartBtn = document.querySelector(".start-btn");
let TheWord = document.querySelector(".word");
let WordInput = document.querySelector(".word-input");
let ScoreEle = document.querySelector(".status .score p");
let Score = 0;
let GameOver = document.querySelector(".game-over");
let GameOverStatus = document.querySelector(".game-over article");
let GameOverScore = document.querySelector(".game-over .score");
let CloseWindowBtn = document.querySelector(".close-window");
let PlayAgainBtn = document.querySelector(".play-again");
let FirstTimeSection = document.querySelector(".first-time");
let UserNameInput = document.querySelector(".username");
let UserNameBtn = document.querySelector(".username-btn");
let UserName = document.querySelector(".user-name p");
let BestScore = document.querySelector(".best-score p");
let BestScoreSound = document.querySelector(".new-best-score-sound");
let FailSound = document.querySelector(".fail-sound");
let SuccessSound = document.querySelector(".success-sound");
let EndGameSound = document.querySelector(".end-game-sound");
let BackGroundMusic = document.querySelector(".background-music");
    BackGroundMusic.volume = 0.3;
let FooterTxt = document.querySelector(".email");
let CopyTxt = document.querySelector(".email+p");

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
    if(window.localStorage.getItem("KeyboardSound") === "on" || window.localStorage.getItem("KeyboardSound") === null){
        KeyboardSound();
    }
    let AllKeyboardBtns = document.querySelectorAll(".keyboard span");
    if(e.key === " "){
        let SpaceBtn = document.querySelector(".keyboard .space-btn");
        SpaceBtn.classList.add("active-btn");
    }
    AllKeyboardBtns.forEach((btn)=>{
        if(e.key.toLocaleLowerCase() === btn.innerHTML.toLocaleLowerCase()){
            btn.classList.add("active-btn");
        }
    })
})

window.addEventListener('keyup' ,(e) => { 
    let AllKeyboardBtns = document.querySelectorAll(".keyboard span");
    if(e.key === " "){
        let SpaceBtn = document.querySelector(".keyboard .space-btn");
            SpaceBtn.classList.remove("active-btn");
    }
    AllKeyboardBtns.forEach((btn)=>{
            btn.classList.remove("active-btn");
    })
})

function KeyboardSound(){ // to make click sound
    let KeyboardClickSound = document.createElement("audio");
    KeyboardClickSound.setAttribute("src","sounds/keyboard.mp3");
    KeyboardClickSound.setAttribute("preload","auto");
    document.body.appendChild(KeyboardClickSound);
    KeyboardClickSound.play();
    setTimeout(() => {
        KeyboardClickSound.remove();
    }, 300);
}

// local storage 

// for keyboard sound
SoundOptions[0].addEventListener('click',()=>{
    if(window.localStorage.getItem("KeyboardSound") === "on"){
        window.localStorage.setItem("KeyboardSound","off");
    } else {
        window.localStorage.setItem("KeyboardSound","on");
    }
})

// for game sound
SoundOptions[1].addEventListener('click',()=>{
    if(window.localStorage.getItem("GameSound") === "on"){
        window.localStorage.setItem("GameSound","off");
    } else {
        window.localStorage.setItem("GameSound","on");
    }
})

// for background music sound
SoundOptions[2].addEventListener('click',()=>{
    if(window.localStorage.getItem("BackGroundMusic") === "on"){
        window.localStorage.setItem("BackGroundMusic","off");
    } else {
        window.localStorage.setItem("BackGroundMusic","on");
        PlayRandomMusic();
    }
})

LocalStorageSound(0 , "KeyboardSound");
LocalStorageSound(1 , "GameSound");
LocalStorageSound(2 , "BackGroundMusic");

// to add and remove mute class 

function LocalStorageSound(num , key){
    if(window.localStorage.getItem(key) === "off"){
        SoundOptions[num].classList.add("mute");
    }else {
        SoundOptions[num].classList.remove("mute");
    }
}

// first time playing the game

if(window.localStorage.getItem("username") === null){
    FirstTimeSection.style.display = "flex";
    UserNameBtn.addEventListener('click', ()=>{
        SaveUserName()
    });
    UserNameInput.addEventListener("keyup",(event)=>{
        if(event.key === "Enter"){
            SaveUserName()
        }
    });
}

function SaveUserName(){ // to show username from local storage
    if(UserNameInput.value !== "" ){
        let UserName2 = UserNameInput.value;
        window.localStorage.setItem("username", UserName2);
        FirstTimeSection.style.display = "none";
        UserName.innerHTML = UserName2;
    }
}

//local storage for username
UserName.innerHTML = window.localStorage.getItem("username");

// local storage best score
function SetBestScore(){
    if(window.localStorage.getItem("BestScore") !== null){
        BestScore.innerHTML = window.localStorage.getItem("BestScore");
    } else {
        BestScore.innerHTML = "0";
    }
}
SetBestScore();
// sittings section

SittingsBtn.addEventListener('click',()=>{
    SittingsSection.classList.toggle("shown");
});
window.addEventListener('keyup',(event)=>{
    if(event.key === "Escape"){
        SittingsSection.classList.toggle("shown");
    }
})

// to show difficulty options
SittingsDifficulty.addEventListener('click',()=>{
    SittingsDifficulty.nextElementSibling.classList.toggle("shown");
    SittingsDifficulty.firstElementChild.classList.toggle("up");
    SittingsSound.nextElementSibling.classList.remove("shown");
    SittingsSound.firstElementChild.classList.remove("up");
});

// to select difficulty
DifficultyOptions.forEach((ele)=>{
    ele.addEventListener('click',()=>{
        DifficultyOptions.forEach((rem)=>{
            rem.classList.remove("chosen");
        });
        ele.classList.add("chosen");
        // local storage difficulty
        window.localStorage.setItem("Difficulty", ele.innerHTML);
    });
    // to set the difficulty
    if(ele.innerHTML === window.localStorage.getItem("Difficulty")){
        DifficultyOptions.forEach((rem)=>{
            rem.classList.remove("chosen");
        });
        ele.classList.add("chosen");
    }
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

// clear data btn
ClearDataBtn.addEventListener('click',()=>{
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("BestScore",undefined);
    setTimeout(() => {
        location.reload();
    }, 250);
})

// start the game 
StartBtn.addEventListener('click',()=>{
    InputFocus();
    StartTimer();
    TimeOutChecker()
    setTimeout(() => {
        GetDate();
    }, 4000);
    if(window.localStorage.getItem("BackGroundMusic") === null || window.localStorage.getItem("BackGroundMusic") === "on"){
        PlayRandomMusic();
    }
});
// function to run a random background music
function PlayRandomMusic() {
    num = Math.floor(Math.random()*4);
    BackGroundMusic.setAttribute("src",`sounds/background music${num}.mp3`);
    if(num === 0){
        MusicLength = 195;
    } else if(num === 1){
        MusicLength = 177;
    } else if(num === 2){
        MusicLength = 225;
    } else if(num === 3){
        MusicLength = 337;
    }
    BackGroundMusic.play();
    let MusicEnd = setInterval(() => {
        MusicLength--;
        if(MusicLength === 0){
            PlayRandomMusic();
            clearInterval(MusicEnd);
        }
        if(SoundOptions[2].classList.contains("mute")){
            BackGroundMusic.pause();
            clearInterval(MusicEnd);
        }
    }, 1000);
}

// to focus on the input
function InputFocus(){
    StartBtn.classList.add("start");
    setTimeout(() => {
        StartBtn.style.display = "none";
    }, 300);
    WordInput.focus();
};

// the Start timer
function StartTimer(){
    for(let i=3; i>0 ; i--){
        setTimeout(() => {
            TheWord.innerHTML = i;
        }, 4000-(1000 * i));
    }
};

// get the random word
function GetDate(){
    fetch("https://random-word-api.herokuapp.com/word").then((data)=>{
        let word = data.json();
        return word;
    }).then((word)=>{
        TheWord.innerHTML = word[0];
        return word;
    }).then((word)=>{
        CalcTheTimer(word);
    }).catch(()=>{
        StartBtn.click();
    })
}

// to check if the word is right or wrong
WordInput.addEventListener('keyup',()=>{
    CheckTheWord();
});

function CheckTheWord(){
    let TimeLeft = document.querySelector(".time-left p");
    if(WordInput.value !== "" && TimeLeft.innerHTML !== "0"){
        if(TheWord.innerHTML === WordInput.value){
            GetDate();
            WordInput.value = "";
            Score+=1;
            ScoreEle.innerHTML = Score;
            if(window.localStorage.getItem("GameSound") === null || window.localStorage.getItem("GameSound") === "on"){
                let Sound = SuccessSound;
                Sound.volume = 0.4;
                Sound.play();
            }
        }else if(!TheWord.innerHTML.startsWith(WordInput.value)){
            if(window.localStorage.getItem("GameSound") === null || window.localStorage.getItem("GameSound") === "on"){
                let Sound = FailSound;
                Sound.volume = 0.4;
                Sound.play();
            }
        }
    }
}

// to start the game and the time left timer
function CalcTheTimer(word){
    let ChosenDifficulty = document.querySelector(".chosen").innerHTML;
    let Timer = 0;
    if(ChosenDifficulty === "easy"){
        Timer = (word[0].length*0.9).toFixed();
    }else if (ChosenDifficulty === "medium"){
        Timer = (word[0].length*0.7).toFixed();
    }else if (ChosenDifficulty === "hard"){
        Timer = (word[0].length*0.4).toFixed();;
    }
    let TimeLeftH2 = document.querySelector(".time-left");// to reset the time by deleting the old element and create new one
    let TimeLeft = document.querySelector(".time-left p");
    TimeLeft.remove();
    let NewP = document.createElement("p");
    TimeLeftH2.appendChild(NewP);
    let NewTimeLeft = document.querySelector(".time-left p");
    NewTimeLeft.innerHTML = Timer;
    let CountDown = setInterval(() => {
        NewTimeLeft.innerHTML--;
        if(NewTimeLeft.innerHTML === "0"){
            clearInterval(CountDown);
        }
    }, 1000);
}

//when the time is out 
function TimeOutChecker(){
    let TimeChecker = setInterval(() => {
        let TimeLeft = document.querySelector(".time-left p");
        if(TimeLeft.innerHTML === "0"){
            TimeOut();
            clearInterval(TimeChecker);
        }
    }, 250);
}

function TimeOut(){ // to add game over screen
    GameOver.style.display = "flex";
    setTimeout(() => {
        GameOver.classList.add("shown"); 
    }, 100);
    setTimeout(() => {
        GameOverStatus.classList.add("shown");
    }, 500);
    if(Score > BestScore.innerHTML ){
        GameOverScore.innerHTML = `new best score : ${ScoreEle.innerHTML}`
        // local storage
        window.localStorage.setItem("BestScore", Score);
        if(window.localStorage.getItem("GameSound") === null || window.localStorage.getItem("GameSound") === "on"){
            let Sound = BestScoreSound;
            Sound.volume = 0.4;
            Sound.play();
        }
    }else if(Score === 0){
        GameOverScore.innerHTML = `you didn't score`;
        if(window.localStorage.getItem("GameSound") === null || window.localStorage.getItem("GameSound") === "on"){
            let Sound = EndGameSound;
            Sound.volume = 0.4;
        setTimeout(() => {
            Sound.play();
        }, 500);
        }
    }else {
        GameOverScore.innerHTML = `your score is : ${ScoreEle.innerHTML}`;
        if(window.localStorage.getItem("GameSound") === null || window.localStorage.getItem("GameSound") === "on"){
            let Sound = EndGameSound;
            Sound.volume = 0.4;
            Sound.play();
        }
    }
}
// to close the window
CloseWindowBtn.addEventListener('click',()=>{
    let TimeLeft = document.querySelector(".time-left p");
    TimeLeft.innerHTML = "";
    ScoreEle.innerHTML = "";
    Score = 0;
    WordInput.value="";
    GameOverStatus.classList.remove("shown");
        GameOver.classList.remove("shown");
    setTimeout(() => {
        GameOver.style.display = "none";
    }, 1500);
    setTimeout(() => {
        window.close();
    }, 2000);
})
// to reset the game when the user press play again Btns
PlayAgainBtn.addEventListener('click',()=>{
    ResestTheGame();
});

// to reset the game when the user press Enter Btns
window.addEventListener("keyup",(event)=>{
    if(GameOver.style.display === "flex" && event.key === "Enter"){
        ResestTheGame();
    }
});

// to reset the game
function ResestTheGame(){
    let TimeLeft = document.querySelector(".time-left p");
    TimeLeft.innerHTML = "";
    ScoreEle.innerHTML = "";
    Score = 0;
    WordInput.value="";
    GameOverStatus.classList.remove("shown");
        GameOver.classList.remove("shown");
    setTimeout(() => {
        GameOver.style.display = "none";
    }, 1500);
    InputFocus();
    StartTimer();
    TimeOutChecker();
    SetBestScore()   
    setTimeout(() => {
        GetDate();
    }, 4000);
}

// footer 
FooterTxt.addEventListener('click',()=>{
    navigator.clipboard.writeText("contact@malikkajiji.online");
    CopyTxt.innerHTML = "copied";
    setTimeout(() => {
        CopyTxt.innerHTML = "copy";
    }, 3000);
})
