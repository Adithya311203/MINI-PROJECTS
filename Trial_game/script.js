var xp=0;
var health=100;
var gold=50;
var currentWeapon=0;
var fighting;
var monsterHealth;
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
const monsterHealthText=document.querySelector("#monsterHealthText")
const locations=[{
    name: "town square",
    "button text":["Go to Store","Go to Cave","Fight Dragon"],
    "button functions":[goStore,goCave,fightDragon],
    text: "You are in the town square"},
{
    name:"store",
    "button text":["Buy 10 Health [10 GOLD]","Buy Weapon\n[30 GOLD]","Go to town Square" ],
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
},
{
    name:"kill monster",
    "button text":["Go town square","Go town square","Go town square"],
    "button functions":[goTown,goTown,goTown],
    text:"The monster groans as it dies. You gained XP and Gold!"
},
{
    name:"lose",
    "button text":["Restart?","Restart?","Restart?"],
    "button functions":[restart,restart,restart],
    text:"You died lol "
},
{
    name:"win",
    "button text":["Restart?","Restart?","Restart?"],
    "button functions":[restart,restart,restart],
    text:"You defeated the dragon and saved the village. You are a hero now. YOU WIN THE GAME!!! "
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
    monsterStats.style.display="none";
    button1.innerText=location["button text"][0];
    button2.innerText=location["button text"][1];
    button3.innerText=location["button text"][2];
    button1.onclick=location["button functions"][0];
    button2.onclick=location["button functions"][1];
    button3.onclick=location["button functions"][2];
    text.innerText=location.text;
}
   


function goTown(){
    dragon.style.display="none";
    fangedbeast.style.display="none";
    slime.style.display="none";
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
    slime.style.display="block";
    goFight();
}

function fightBeast(){
    fighting=1;
    fangedbeast.style.display="block";
    goFight();
}

function fightDragon(){
    fighting=2;
    dragon.style.display="block";
    goFight();
}

function goFight(){
    update(locations[3]);
    monsterHealth=monsters[fighting].health;
    monsterStats.style.display="block";
    monsterName.innerText=monsters[fighting].name;
    monsterHealthText.innerText=monsterHealth;
}

function attack(){
    text.innerText="The "+ monsters[fighting].name+" attacks!";
    text.innerText+="You attack it with your "+ weapons[currentWeapon].name+".";
    health-=getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()){
        monsterHealth-=weapons[currentWeapon].power + Math.floor(Math.random()*xp+1);}
    else{
        text.innerText+=" You missed."
    }
    hpstat.innerText=health;
    monsterHealthText.innerText=monsterHealth;
    if (health<=0){
        dragon.style.display="none";
        slime.style.display="none";
        fangedbeast.style.display="none";
        lose();
    }
    else if(monsterHealth<=0){
        dragon.style.display="none";
        slime.style.display="none";
        fangedbeast.style.display="none";
        (fighting===2)?wingame():defeatMonster();
    }
}

function dodge(){
    text.innerText="You dodge the attack from the "+monsters[fighting].name+".";
}

function isMonsterHit(){
    return Math.random() > 0.1 || health <20;
}

function getMonsterAttackValue(level){
    let hit=(level*5)-(Math.floor(Math.random()*xp));
    console.log(hit);
    return hit;
}

function defeatMonster(){
    gold+=Math.floor(monsters[fighting].level * 6.8);
    xp+=monsters[fighting].level;
    goldstat.innerText=gold;
    xpstat.innerText=xp;
    update(locations[4]);
}

function lose(){
    update(locations[5]);
}

function wingame(){
    update(locations[6]);
}

function restart(){
    xp=0;
    health=100;
    gold=50;
    currentWeapon=0;
    inventory=["stick"];
    goldstat.innerText=gold;
    xpstat.innerText=xp;
    hpstat.innerText=health;
    goTown();

}