//define the board, literally
var board = document.getElementById("board");
var enemySide = document.getElementById("enemyside");
var playerSide = document.getElementById("playerside");
var History = document.getElementById('historyText');

//if you lose, then turn to 1
var lose
//Define sides as lists
var enemySideMin = [];
enemyTaunt = 0;
friendlyTaunt = 0;
var playerSideMin = [];

//variables declaring things from the document, specifically the player tile requirements
var playerTile = document.getElementById('player');
var playerText = document.getElementById('playerText');

//player stats
var playerHP = 30;
var playerATK = 2;
var mana = 5;

//Fighting
fight = function(guy1, guy2){ //1 = playerside
  var skipguy = 0; //if necessary, skip updating this guy
  for(var i=0; i<playerSideMin.length; i++){ //Friendly buff activating on minion fight
    if(playerSideMin[i] !== ""){
      for(var b = 0; b<playerSideMin[i].buffs.length; b++){
        if(playerSideMin[i].buffs[b] == 'spawnSpider'){
          if(minionAttack == 1){
            newMinion = new tile('Spider', 1, 1, "", "spider2");
            playerSideMin.push(newMinion);
            newMinion.createFriendlyTile();    

            History.innerHTML += "<br>Because of " + playerSideMin[i].name + "'s special ability, a Spider was spawned.";
            playerSideMin[i].hp = 0;
            playerSideMin[i].update();
            break;
          }

        }
      }
    }
  }

  for(var i=0; i<enemySideMin.length; i++){ //Enemy buff activating on minion fight
    if(enemySideMin[i] !== ""){
      for(var b = 0; b<enemySideMin[i].buffs.length; b++){

        if(enemySideMin[i].buffs[b] == 'spawnSpider'){
          if(minionAttack == 1){
            newMinion = new tile('Spider', 1, 1, "", "spider2");
            enemySideMin.push(newMinion);
            newMinion.createEnemyTile();    

            History.innerHTML += "<br>Because of " + enemySideMin[i].name + "'s special ability, a Spider was spawned.";
            enemySideMin[i].hp = 0;
            skipguy = 1;
            enemySideMin[i].update();
            targeting = 0;

            minionAttack = 0;
            break;
          }

        }
      }
    }
  }

  guy1.hp -= guy2.atk;
  History.innerHTML += "<br>" + guy1.name + " attacked " + guy2.name + " for " + guy1.atk + " damage.";

  guy2.hp -= guy1.atk;
  History.innerHTML += "<br>In return, " + guy2.name + " did " + guy2.atk + " damage to " + guy1.name + "."; 

  for(var p = 0; p<guy1.buffs.length; p++){
    
    if(guy1.buffs[p] == 'batsteal'){
      for(var i=0; i<playerSideMin.length; i++){
        if(playerSideMin[i].mainTile == 1){
          History.innerHTML += "<br>...Because of " + guy1.name + "'s special ability, " + playerSideMin[i].name + " were healed " + guy1.atk + " health.";
          playerSideMin[i].hp += guy1.atk;
          playerSideMin[i].update();
        }
      }
    }
  }
  if(skipguy !== 2){
    for(var t = 0; t<guy2.buffs.length; t++){
      if(guy2.buffs[t] == 'batsteal'){
        for(var i=0; i<enemySideMin.length; i++){
          if(enemySideMin[i].mainTile == 1){
            History.innerHTML += "<br>...Because of " + guy2.name + "'s special ability, " + enemySideMin[i].name + " was healed " + guy2.atk + " health.";
            enemySideMin[i].hp += guy2.atk;
            enemySideMin[i].update();
          }
        }
      }
    }
  }



  guy1.update();
  if(skipguy !== 2){
    guy2.update();
  }
  targeting = 0;

  minionAttack = 0;
  $("body").css("cursor","auto");
};

//Targeting

targeting = 0;
fighter = "";

//clicking a friendly minion
target = function(tile){
  $("body").css("cursor","crosshair");
  History.innerHTML+="<br> Targeting...";
  targeting = 1;
  fighter = tile;
};

//clicking an enemy minion
detarget = function(tile){
  minionAttack = 1;
  $("body").css("cursor","auto");
  History.innerHTML= "Hit:";
  fight(fighter,tile);
}

//Describing what a 'tile' holds
var Fdivnum = 6;
var Edivnum = 3;
tile = function(name,hp,atk,special,imageURL,position){ //imageurl is just the name of the file stored in assets WITHOUT the extension
  var currentTile;
  this.position = position;
  this.buffs = [];
  var Buffs = this.buffs;

  this.createEnemyTile = function(position){
    position = enemySideMin.length-1
    var tempTile = document.createElement("DIV");
    enemySide.appendChild(tempTile);
    document.getElementsByTagName("DIV")[Edivnum].setAttribute("class","tile"); 
    if(this.mainTile == 1){
      document.getElementsByTagName("DIV")[Edivnum].setAttribute("id","enemy");
    }

    else{
      document.getElementsByTagName("DIV")[Edivnum].setAttribute("id","unfriendly");
    }
    Edivnum++;
    Fdivnum++;
    tempTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"+this.name +"<br><strong>"+this.hp+"</strong> Health<strong><br>"+this.atk+"</strong> Attack<br>---<br>"+this.special;
    currentTile = tempTile;
    this.position = position;
    
    currentTile.onclick = function(){
      //this.buffs = [];
      if(targeting == 1 && Buffs.length > 0){
        //console.log(Buffs);
        for(var t = 0; t < enemySideMin.length; t++){
          if(enemySideMin[t] !== ""){
            for(var b = 0; b < enemySideMin[t].buffs.length; b++){
              if(enemySideMin[t].buffs[b] == "taunt"){
                console.log("taunty");
                enemyTaunt = 1;
                History.innerHTML = "You must attack the tile with taunt!";
                targeting = 0;
                $("body").css("cursor","auto");             
              }

            }
          }
          if(enemySideMin[t] == enemySideMin[position] && enemySideMin[position] !== ""){
            for(var b = 0; b < enemySideMin[position].buffs.length; b++){
               if(enemySideMin[position].buffs[b] == "taunt"){
                detarget(enemySideMin[position]);
                

               }
             }
          }
        }

        var check = 0;
        if(enemyTaunt == 0){
          for(var c = 0; c < Buffs.length; c++){
            if(Buffs[c] == "skellyimmune"){
              for(var k = 0; k < enemySideMin.length; k++){
                if(enemySideMin[k] === ""){
                  check += 1;
                }
                else if(enemySideMin[k] === enemySideMin[position]){
                  check += 1;
                }
                
              }   
              if(check === enemySideMin.length){
                detarget(enemySideMin[position]);
              }      
              else{
                History.innerHTML = "This tile cannot be attacked until all other tiles on its side are killed.";
                targeting = 0;
                $("body").css("cursor","auto");
              }
            }
            /**if(Buffs[c] == "taunt"){
              detarget(enemySideMin[position]);
            }**/
            else{
              detarget(enemySideMin[position]);
            }
          }
        }


        
        



        
      }
      else if(targeting == 1 && Buffs.length == 0){
        for(var t = 0; t < enemySideMin.length; t++){
          if(enemySideMin[t] !== ""){
            for(var b = 0; b < enemySideMin[t].buffs.length; b++){
              if(enemySideMin[t].buffs[b] == "taunt"){
                History.innerHTML = "Duhh taunt";
                targeting = 0;
                $("body").css("cursor","auto");                
              }

            }
          }
        }
        detarget(enemySideMin[position]);
      }
      else{
        
        History.innerHTML = "<br> You can not attack with an enemy tile.";
        targeting = 0;
        $("body").css("cursor","auto");
      }
    };
    

    
  };


  this.createFriendlyTile = function(){
    position = playerSideMin.length-1
    var tempTile = document.createElement("DIV");
    playerSide.appendChild(tempTile);
    document.getElementsByTagName("DIV")[Fdivnum].setAttribute("class","tile"); 
    if(this.mainTile == 1){
      document.getElementsByTagName("DIV")[Fdivnum].setAttribute("id","player");
    }
    else{
      document.getElementsByTagName("DIV")[Fdivnum].setAttribute("id","friendly");
    }
    Fdivnum++;
    tempTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"+this.name +"<br><strong>"+this.hp+"</strong> Health<strong><br>"+this.atk+"</strong> Attack<br>---<br>"+this.special;
    currentTile = tempTile;
    this.position = position;
    //playerSideMin.push(currentTile);
    
  currentTile.onclick = function(){
      if(targeting == 0 && atk >= 1){
        target(playerSideMin[position]);
      }
      else if(targeting == 0 && atk <= 0){
        History.innerHTML = "<br> This tile has no attack.";
        targeting = 0;
        $("body").css("cursor","auto");        
      }
      else{
        
        History.innerHTML = "<br> You have to target an enemy tile to attack.";
        targeting = 0;
        $("body").css("cursor","auto");
        
      }
    }
  };
    
  
  
  this.name = name;
  this.hp = hp;
  this.atk = atk;
  this.special = special;
  

  this.update = function(){


    if(this.hp <= 0){
      //this.name = "DEAD";
      History.innerHTML += "<br> "+ name + " died.";
      if(currentTile.id == "enemy"){
        enemySideMin.splice(this.position, 1, "");
        enemySide.removeChild(currentTile);
        Edivnum--;
        Fdivnum--;

        if(lose !== 1){
          alert("You won!");
        }

      }
      else if(currentTile.id == "friendly"){
        for(var y = 0; y<this.buffs.length; y++){
          if(this.buffs[y] == 'gnomeHurt'){
            for(var i=0; i<playerSideMin.length; i++){
              if(playerSideMin[i].mainTile == 1){
                playerSideMin[i].hp -= 2;
                History.innerHTML += "<br>...Because of " + name + "'s special ability, " + playerSideMin[i].name + " were hurt for 2 health.";
                playerSideMin[i].update();
              }

            }
          }
          if(this.buffs[y] == 'spidereggSpawn'){
            newMinion = new tile('Spider Egg', 1, 0, "Hatches after a tile attacks.", "spiderEgg");
            playerSideMin.push(newMinion);
            newMinion.buffs.push('spawnSpider');
            newMinion.createFriendlyTile();
            History.innerHTML += "<br>...Because of " + name + "'s special ability, a Spider Egg was spawned.";
          }
        }
        playerSideMin.splice(this.position, 1, "")
        playerSide.removeChild(currentTile);
        Fdivnum--;
      }
      else if(currentTile.id == "player"){
        playerSideMin.splice(this.position, 1, "")
        playerSide.removeChild(currentTile);
        Fdivnum--;
        lose = 1;
        alert("You lose!");
      }
      else if(currentTile.id == "unfriendly"){
        for(var y = 0; y<this.buffs.length; y++){
          if(this.buffs[y] == 'gnomeHurt'){
            for(var i=0; i<enemySideMin.length; i++){
              if(enemySideMin[i].mainTile == 1){
                enemySideMin[i].hp -= 2;
                History.innerHTML += "<br>...Because of " + name + "'s special ability, " + enemySideMin[i].name + " was hurt for 2 health.";
                enemySideMin[i].update();
              }

            }
          }
          if(this.buffs[y] == 'spidereggSpawn'){
            newMinion = new tile('Spider Egg', 1, 0, "Hatches after a tile attacks.", "spiderEgg");
            enemySideMin.push(newMinion);
            newMinion.buffs.push('spawnSpider');
            newMinion.createEnemyTile();
            History.innerHTML += "<br>...Because of " + name + "'s special ability, a Spider Egg was spawned.";
          }
          if(this.buffs[y] == 'taunt'){
            enemyTaunt = 0;
          }
        }
        enemySideMin.splice(this.position, 1, "");
        enemySide.removeChild(currentTile);
        Edivnum--;
        Fdivnum--;
      }

    }
    
    currentTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"+this.name +"<br><strong>"+this.hp+"</strong> Health<strong><br>"+this.atk+"</strong> Attack<br>---<br>"+this.special;
    
    
  };
  
};

//what the player is
player = new tile('You', 10, 2, "Main tile - If this tile dies, you lose!", "playertile");
player.mainTile = 1;
playerSideMin.push(player);
player.position = playerSideMin.length-1;
player.createFriendlyTile();

/**player.update = function(){
    playerText.innerHTML = player.name +"<br><strong>"+player.hp+"</strong> Health<strong><br>"+player.atk+"</strong> Attack<br><strong>"+player.mana+"</strong> Mana<br>"+player.special;
  };
player.update();
**/
//playerText.innerHTML = "<br><strong>"+player.hp +"</strong> Health <br><strong>"+ player.atk + "</strong> Attack<br><strong>"+player.mana +" </strong>Mana"+"<br>"+player.special;


//What our enemy is

//var enemyText = document.getElementById('enemyText');

enemyTile = new tile('Skeleton',6,6,"Main tile - If this tile dies, you win! <br>---<br>Cannot be attacked while other tiles on this side still exist.", "skellytile");
enemyTile.mainTile = 1;
enemySideMin.push(enemyTile);
enemyTile.buffs.push("skellyimmune");
enemyTile.position = enemySideMin.length-1;
enemyTile.createEnemyTile();

newMinion = new tile('Ooze', 1, 3, "When this tile dies, deal 2 damage to the MAIN TILE", "icky");

enemySideMin.push(newMinion);
newMinion.buffs.push('gnomeHurt');
newMinion.createEnemyTile();

//enemyText.innerHTML = enemyTile.name +"<br><strong>"+enemyTile.hp+"</strong> Health<strong><br>"+enemyTile.atk+"</strong> Attack<br>"+enemyTile.special;






//Targeting CONTINUED

/**$(document).ready(function(){

  $("#enemy").mousedown(function(){
      if(targeting == 1){
        targeting = 0;
        $("body").css("cursor","auto");
      }
      else if(targeting === 0){
        History.innerHTML += "<br>You must choose a tile from your side to play.";
      }
    });
  
   $("body").mousedown(function(){
     if(targeting == 1){
       History.innerHTML+= "<br>That is not a valid target.";
       targeting = 0;
       $("body").css("cursor","auto");
     }
   });
   $("#player").mousedown(function(){
     if(targeting == 1){
       History.innerHTML+= "<br>You can't target yourself.";
       $("body").css("cursor","auto");
       targeting = 0;
     }
   });**/
  





//Random mob

/**minion1 = new tile('Bat',2,2,"Heals MAIN TILE for amount of damage done","bat");
playerSideMin.push(minion1);
minion1.batSteal = 1;
minion1.position = playerSideMin.length-1;
minion1.createFriendlyTile(minion1.position);
**/

for(var i=0;i<3;i++){
  newMinion = new tile('Bat',2,2,"Heals MAIN TILE for amount of damage done","bat");
  playerSideMin.push(newMinion);
  newMinion.buffs.push('batsteal');
  newMinion.position = playerSideMin.length-1;
  newMinion.createFriendlyTile();
}
for(var i=0;i<2;i++){
  newMinion = new tile('Bat',2,2,"Heals MAIN TILE for amount of damage done","bat");
  enemySideMin.push(newMinion);
  newMinion.buffs.push('batsteal');
  newMinion.position = enemySideMin.length-1;
  newMinion.createEnemyTile();
}
newMinion = new tile('Ooze', 1, 3, "When this tile dies, deal 2 damage to the MAIN TILE", "icky");
playerSideMin.push(newMinion);
newMinion.buffs.push('gnomeHurt');
newMinion.createFriendlyTile();

newMinion = new tile('Ooze', 1, 3, "When this tile dies, deal 2 damage to the MAIN TILE", "icky");
enemySideMin.push(newMinion);
newMinion.buffs.push('gnomeHurt');
newMinion.createEnemyTile();

newMinion = new tile('Death Knight', 1, 1, "TAUNT: This tile must be attacked.", "deathKnight");
enemySideMin.push(newMinion);
newMinion.buffs.push('taunt');
newMinion.createEnemyTile();

newMinion = new tile('Death Knight', 1, 1, "TAUNT: This tile must be attacked.", "deathKnight");
enemySideMin.push(newMinion);
newMinion.buffs.push('taunt');
newMinion.createEnemyTile();