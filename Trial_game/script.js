var xp=0;
var health=100;
var gold=504;
var currentWeapon=0;
var fighting;
var inventory=["stick"];

const button1=document.querySelector("#button1");
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3");
const text=document.querySelector("#text");
const hpstat=document.querySelector("#hpstat");
const xpstat=document.querySelector("#xpstat");
const goldstat=document.querySelector("#goldstat");
const monsterStats=document.querySelector("#monsterStats")
const monsterName=document.querySelector("#monsterName")
const monsterHealth=document.querySelector("#monsterHealth")
const locations=[{
    name: "town square",
    "button text":["Go to Store","Go to Cave","Fight Dragon"],
    "button functions":[goStore,goCave,fightDragon],
    text: "You are in the town square"},
{
    name:"store",
    "button text":["Buy 10 Health [10 GOLD]","Buy Weapon [30 GOLD]","Go to town Square" ],
    "button functions":[buyHealth,buyWeapon,goTown],
    text:"You are in the store."},
{
    name:"cave",
    "button text":["Fight Slime","Fight fanged beast","Go to Town Square"],
    "button functions":[fightSlime,fightBeast,goTown],
    text:"You enter the cave. You see some monsters."
},
{
    name:"fight",
    "button text":["Attack","Dodge","Run"],
    "button functions":[attack,dodge,goTown],
    text:"You are fighting a monster!"
}
]
const weapons=[{
        name:"stick",
        power:10
    },
    {
        name:"dagger",
        power:30
    },
    {
        name:"scythe",
        power:50
    }
]
const monsters=[{
    name:"slime",
    level:2,
    health:15
},
{
    name:"fanged beast",
    level:8,
    health:60
},
{
    name:"DRAGON",
    level:20,
    health:300
}]
button1.onclick=goStore;
button2.onclick=goCave;
button3.onclick=fightDragon;

function update(location){
    button1.innerText=location["button text"][0];
    button2.innerText=location["button text"][1];
    button3.innerText=location["button text"][2];
    button1.onclick=location["button functions"][0];
    button2.onclick=location["button functions"][1];
    button3.onclick=location["button functions"][2];
    text.innerText=location.text;
}
   


function goTown(){
    update(locations[0]);
}

function goStore(){
   update(locations[1]);
}

function goCave(){
    update(locations[2]);
}


function buyWeapon(){
    if(currentWeapon<weapons.length-1){if(gold>=30){
        gold-=30;
        currentWeapon++;
        goldstat.innerText=gold;
        let newWeapon=weapons[currentWeapon].name;
        text.innerText="You now have a "+newWeapon;
        inventory.push(newWeapon)
        text.innerText+="\nYour Inventory: "+inventory
    }
    else{
        text.innerText="Insufficient Gold"
    }}
    else{
        text.innerText="You already have the most powerful weapon"
        button2.innerText="Sell your "+inventory[0]+" for 15 gold";
        button2.onclick=sellWeapon;
    }
}

function sellWeapon(){
    if(inventory.length>1){
        gold+=15
        goldstat.innerText=gold
        let currentWeapon=inventory.shift();
        text.innerText="You sold your "+currentWeapon+" for 15 gold."
    }
    else{
        text.innerText="Dont sell your only weapon!"
    }
}

function buyHealth(){
    if(gold-10>=0){gold-=10
    health+=10}
    else{
        text.innerText="Insufficient Gold"
    }
    hpstat.innerText=health;
    goldstat.innerText=gold;
}

function fightSlime(){
    fighting=0;
    goFight();
}

function fightBeast(){
    fighting=1;
    goFight();
}

function fightDragon(){
    fighting=2;
    goFight();
}

function goFight(){
    update(locations[3]);
    monsterHealth
}

function attack(){

}

function dodge(){

}
