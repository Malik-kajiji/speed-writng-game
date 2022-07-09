// all elements vars
let Keyboard = document.querySelector(".keyboard");
let KeyboardLines = document.querySelectorAll(".keyboard div");
let SittingsBtn = document.querySelector(".sittings-btn");
let SittingsSection = document.querySelector(".sittings-section");
let SittingsDifficulty = document.querySelector(".difficulty");
let SittingsSound = document.querySelector(".sound");
let DifficultyOptions = document.querySelectorAll(".difficulty+div span");
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
});
SittingsSound.addEventListener('click',()=>{
    SittingsSound.nextElementSibling.classList.toggle("shown");
})

DifficultyOptions.forEach((ele)=>{
    ele.addEventListener('click',()=>{
        DifficultyOptions.forEach((rem)=>{
            rem.classList.remove("chosen");
        });
        ele.classList.add("chosen")
    });
});