//work on mage

//define the board, literally
var board = document.getElementById("board");
var enemySide = document.getElementById("enemyside");
var playerSide = document.getElementById("playerside");
var History = document.getElementById('historyText');

//if you lose, then turn to 1
var lose

//toUpdate is an array that holds tiles that need to be updated at the end of an action
toUpdate = [];
var ongoingUpdate = 0; //0 if the array is empty

//Define sides as lists
var enemySideMin = [];
enemyTaunt = 0;
friendlyTaunt = 0;
var playerSideMin = [];

//dungeon levels, used for later
var dLevel = 1
var descend = 0;

//variables declaring things from the document, specifically the player tile requirements
var playerTile = document.getElementById('player');
var playerText = document.getElementById('playerText');

//player stats
var playerHP = 30;
var playerATK = 2;
var mana = 5;
var spellDMG = 0
var skipguy = 0; //if necessary, skip updating this guy

//Preset tiles saved in an array for convenience?
presetTiles = [];


//Fighting
fight = function(guy1, guy2){ //1 = playerside
  //var skipguy = 0; //if necessary, skip updating this guy
  
  if(guy1.mainTile == 1){
    guy1.actualtile.id = "player";
  }
  else{
    guy1.actualtile.id = "friendly";
  }
  
  guy1.hp -= guy2.atk;
  History.innerHTML += "<br>Friendly " + guy1.name + " attacked " + guy2.name + " for " + guy1.atk + " damage.";

  guy2.hp -= guy1.atk;
  History.innerHTML += "<br>In return, enemy " + guy2.name + " did " + guy2.atk + " damage to " + guy1.name + "."; 

  
  guy1.update();


  guy2.update();
  
  targeting = 0;

  minionAttack = 0;
  $("body").css("cursor","auto");
  skipguy = 0;
};

//Targeting

targeting = 0;
fighter = "";

//the final step of casting a spell
cast = function(guy1, guy2, tome){
  if(tome == "Magic Missile"){
    if(guy1.mna >= 2){
      guy1.mna -= 2;
      guy2.hp -= 2 + spellDMG;
      History.innerHTML += "<br>" + guy1.name + " cast " + tome + " on " + guy2.name + " for " + (2+spellDMG) + " damage!";
    }
  }
  else if(tome == "Lesser Heal"){
    guy1.mna -= 3;
    guy2.hp += 2;
    History.innerHTML += "<br>" + guy1.name + " cast " + tome + " on " + guy2.name + " and gave "+ guy2.name +" 2 health!";
    guy2.unupdate = 1;
  }
  guy1.update();
  guy2.update();
  targeting = 0;
  fighter = "";
  skipguy = 0;
  $("body").css("cursor","auto");
}

//clicking a friendly minion
target = function(tile){
  $("body").css("cursor","crosshair");
  History.innerHTML+="<br> Targeting...";
  targeting = 1;
  fighter = tile;
};

//clicking a friendly spell caster
spellTarget = function(tile){
  $("body").css("cursor","pointer");
  History.innerHTML = "Casting...";
  targeting = 1;
  fighter = tile;
  this.spell = tile.tome;
  if(tile.costs > tile.mna){
    History.innerHTML += "<br> " + tile.name + " doesn't have enough MANA! (Needs " + tile.costs + " mana, but only has " + tile.mna + " mana).";
    tile.actualtile.id = "friendlyMageLow";
    targeting = 0;
    fighter = "";
    $("body").css("cursor","auto");
  }
  /**if(this.spell == "Magic Missile"){
    mnaCost = 2;
    if(mnaCost > tile.mna){
      History.innerHTML += "<br> " + tile.name + " doesn't have enough MANA!";
      tile.actualtile.id = "friendlyMageLow";
      targeting = 0;
      fighter = "";
      $("body").css("cursor","auto");
    }
  }
  else if(this.spell == "Lesser Heal"){
    mnaCost = 3;
    if(mnaCost > tile.mna){
      History.innerHTML += "<br> " + tile.name + " doesn't have enough MANA!";
      tile.actualtile.id = "friendlyMageLow";
      targeting = 0;
      fighter = "";
      $("body").css("cursor","auto");
    }
  }**/
}

//clicking an enemy minion
detarget = function(tile){
  
  minionAttack = 1;
  $("body").css("cursor","auto");
  History.innerHTML= "Hit:";
  fight(fighter,tile);
}

//casting on an enemy minion
despelltarget = function(tile){
  $("body").css("cursor","auto");
  History.innerHTML= "Cast a spell:";
  cast(fighter,tile,fighter.tome);
}

nextLevel = function(){
    dLevel++;
    descend = 1;
    for(var j = 0; j < enemySideMin.length; j++){
      if(enemySideMin[j] !== ""){
        History.innerHTML += "<br>Enemy " + enemySideMin[j].name + " surrendered and joined your party!"

        if(enemySideMin[j].spell == 'yes'){
          
          newSpellMinion = new tile(enemySideMin[j].name,enemySideMin[j].hp,enemySideMin[j].atk,enemySideMin[j].special,enemySideMin[j].imageURL);
          newSpellMinion.spell = enemySideMin[j].spell;
          newSpellMinion.mna = enemySideMin[j].mna;
          newSpellMinion.maxmna = enemySideMin[j].maxmna;
          newSpellMinion.tome = enemySideMin[j].tome;
          newSpellMinion.costs = enemySideMin[j].costs;
          playerSideMin.push(newSpellMinion);
          newSpellMinion.createFriendlyTile();
          enemySide.removeChild(enemySideMin[j].actualtile);
          enemySideMin.splice(enemySideMin[j].position, 1, "");
          Edivnum--;
          Fdivnum--;
          
        }
        else{
          newMinion = new tile(enemySideMin[j].name, enemySideMin[j].hp, enemySideMin[j].atk, enemySideMin[j].special, enemySideMin[j].imageURL)
          playerSideMin.push(newMinion);
          newMinion.buffs = enemySideMin[j].buffs
          newMinion.createFriendlyTile();
          //console.log(Fdivnum)
          //newMinion = new tile('spider', 2, 1, "", "spider");
          //enemySideMin.push(newMinion);
          //newMinion.createEnemyTile();
          //console.log(enemySideMin[j]);
          enemySide.removeChild(enemySideMin[j].actualtile);
          enemySideMin.splice(enemySideMin[j].position, 1, "");
          Edivnum--;
          Fdivnum--;

        }
        //newMinion.update()
        //Update all minions on friendly side now that they moved
        for (var i = 0; i < playerSideMin.length; i++) {
          if(playerSideMin[i] != ""){
            playerSideMin[i].update();
          }
          
        };
        
      }
    }
    enemySideMin = []

    //next level spawns:

    if(dLevel > 1 && dLevel < 150){
      rand = 1;
      if(rand == 1){
        newMinion = new tile('spider', 2, 1, "", "spider");
        newMinion.mainTile = 1;
        enemySideMin.push(newMinion);
        newMinion.createEnemyTile();
      }
      else if(rand ==2){
        newMinion = new tile('slime', 2, 1, "When this minion survives a hit, summon a slime with one less health.", "slime");
        newMinion.mainTile = 1;
        newMinion.buffs.push('slimecreate');
        enemySideMin.push(newMinion);
        newMinion.createEnemyTile();
      }
    }

    for (var i = 0; i <rand; i++) {
      rand = 2;
      if(rand == 1){
        newMinion = new tile('magic spider', 1 , 1, "Spell damage + 1", "spider2");
        enemySideMin.push(newMinion);
        newMinion.buffs.push('spellDMG1');
        newMinion.createEnemyTile();
      }
      else if(rand == 2){
        newSpellMinion = new tile('holy mage',1,0,"Give a tile +2 HP for 3 MANA","holyKnight");
        newSpellMinion.spell = 'yes';
        newSpellMinion.mna = 4;
        newSpellMinion.maxmna = 4;
        newSpellMinion.costs = 3;
        newSpellMinion.tome = 'Lesser Heal';
        enemySideMin.push(newSpellMinion);
        newSpellMinion.createEnemyTile();
      }
      
    };
    for(var m = 0; m <playerSideMin.length; m++){
      if(playerSideMin[m].spell == 'yes' && playerSideMin[m].mna < playerSideMin[m].maxmna){
        playerSideMin[m].mna += 1;
        playerSideMin[m].update();
      }
    }

}

//Describing what a 'tile' holds
var Fdivnum = 6;
var Edivnum = 3;
tile = function(name,hp,atk,special,imageURL,position){ //imageurl is just the name of the file stored in assets WITHOUT the extension
  var currentTile;
  this.position = position;
  this.buffs = [];
  tempTile = "";

  this.name = name;
  this.hp = hp;
  this.maxhp = hp;
  this.atk = atk;
  this.special = special;
  this.imageURL = imageURL;
  this.friendly = 0;

  this.createEnemyTile = function(position){
    this.friendly = 2;
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
    if(this.spell == 'yes'){
      mana = this.mna
      tempTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"+this.name +"<br><strong>"+this.hp+"</strong> Health<strong><br>"+this.mna+"</strong> Mana<br>---<br>"+this.special;
    }
    else{
      tempTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"+this.name +"<br><strong>"+this.hp+"</strong> Health<strong><br>"+this.atk+"</strong> Attack<br>---<br>"+this.special;

    }
    Edivnum++;
    Fdivnum++;
    currentTile = tempTile;
    this.position = position;
    this.actualtile = tempTile;
    currentTile.onclick = function(){
      this.check = 0;
      //this.buffs = [];
      if(targeting == 1 && enemySideMin[position].buffs.length > 0 && fighter.spell !== 'yes'){
        //console.log(Buffs);
        for(var t = 0; t < enemySideMin.length; t++){
          if(enemySideMin[t] !== "" ){
            for(var b = 0; b < enemySideMin[t].buffs.length; b++){
              if(enemySideMin[t].buffs[b] == "guard" && enemySideMin[t] == enemySideMin[position]){
                this.check = 0;
                detarget(enemySideMin[position]);
                return
              }
              else if(enemySideMin[t].buffs[b] == "guard" && this.check == 0){
                //console.log("taunty");
                History.innerHTML = "You must attack the GUARDING tile!";
                targeting = 0;
                
                if(fighter.mainTile == 1){
                  fighter.actualtile.id = "player";
                }
                else{
                  fighter.actualtile.id = "friendly";
                }

                $("body").css("cursor","auto");   
                this.check = 1;          
              }

            }
          }
          /**if(enemySideMin[t] == enemySideMin[position] && enemySideMin[position] !== ""){
            for(var b = 0; b < enemySideMin[position].buffs.length; b++){
               if(enemySideMin[position].buffs[b] == "guard"){
                this.check = 0;
                //detarget(enemySideMin[position]);
                

               }
             }
          }**/
          
          
        }
        if(this.check == 0){
            console.log("This tile is the source of the guard.")
            detarget(enemySideMin[position]);
        }

      }
      else if(targeting == 1 && enemySideMin[position].buffs.length == 0 && fighter.spell !== 'yes'){
        for(var t = 0; t < enemySideMin.length; t++){
          if(enemySideMin[t] !== "" && enemySideMin[t] !== enemySideMin[position]){
            for(var b = 0; b < enemySideMin[t].buffs.length; b++){
              if(enemySideMin[t].buffs[b] == "guard"){
                History.innerHTML = "You must hit the GUARDING tile!";
                targeting = 0;

                if(fighter.mainTile == 1){
                  fighter.actualtile.id = "player";
                }
                else{
                  fighter.actualtile.id = "friendly";
                }
                
                $("body").css("cursor","auto"); 
                this.check = 1; 
              }

            }
            /**if(this.check == 0){
              console.log("bypassed taunt (no taunt)");
              detarget(enemySideMin[position]);
            }**/

          }
        }
        if(this.check == 0){
          console.log("bypassed taunt (no taunt)");
          detarget(enemySideMin[position]);
        }
        
      }

      else if(targeting == 1 && fighter.spell == 'yes'){
        despelltarget(enemySideMin[position])
      }
      else{
        
        History.innerHTML = "<br> You can not attack with an enemy tile.";
        targeting = 0;
        $("body").css("cursor","auto");
      }
    };
    

    
  };


  this.createFriendlyTile = function(){
    this.friendly = 1;
    position = playerSideMin.length-1
    var tempTile = document.createElement("DIV");
    playerSide.appendChild(tempTile);
    document.getElementsByTagName("DIV")[Fdivnum].setAttribute("class","tile"); 
    if(this.mainTile == 1){
      document.getElementsByTagName("DIV")[Fdivnum].setAttribute("id","player");
    }
    else if(this.spell == "yes"){
      document.getElementsByTagName("DIV")[Fdivnum].setAttribute("id","friendlyMage");
    }
    else{
      document.getElementsByTagName("DIV")[Fdivnum].setAttribute("id","friendly");
    }

    //if the minion is a spellcaster...
    if(this.spell == 'yes'){
      tempTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"+this.name +"<br><strong>"+this.hp+"</strong> Health<strong><br>"+this.mna+"</strong> Mana<br>---<br>"+this.special;
    }
    else{
      tempTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"+this.name +"<br><strong>"+this.hp+"</strong> Health<strong><br>"+this.atk+"</strong> Attack<br>---<br>"+this.special;
    }
    Fdivnum++;
    currentTile = tempTile;
    this.position = position;
    this.actualtile = tempTile;
    //playerSideMin.push(currentTile);

    //if the tile has a constant buff:
    if(this.buffs.length > 0){
      for(b = 0; b < this.buffs.length; b++){
        if (this.buffs[b] == 'spellDMG1'){
          spellDMG += 1;
        }
      }
    }

    //enemySideMin.push(this);
  };
    
  
  this.update = function(){

    if(currentTile != undefined && this.friendly == 1){
      currentTile.onclick = function(){
        if(targeting == 0 && playerSideMin[position].atk >= 1 && playerSideMin[position].spell !== 'yes'){
          target(playerSideMin[position]);
          currentTile.id = "selected";
        }
        else if(targeting == 0 && playerSideMin[position].atk <= 0 && playerSideMin[position].spell !== 'yes'){
          History.innerHTML = "<br> This tile has no attack value.";
          targeting = 0;
          $("body").css("cursor","auto");  
        }
        else if(targeting == 0 && playerSideMin[position].spell == 'yes' && playerSideMin[position].mna > 0){
          currentTile.id = "selected";
          spellTarget(playerSideMin[position]);
          
        }
        else if(targeting == 0 && playerSideMin[position].spell == 'yes' && playerSideMin[position].mna <= 0){
          History.innerHTML = "<br> This tile has no mana or attack.";
          targeting = 0;
          $("body").css("cursor","auto"); 
        }
        else if(targeting == 1 && fighter !== ""){
          if(fighter.spell == 'yes' && fighter !== playerSideMin[position]){
            despelltarget(playerSideMin[position])
          }
          else if(fighter == playerSideMin[position] && fighter.spell == 'yes'){
            if(fighter.tome == "Lesser Heal"){
              useOnSelf = confirm("Cast Lesser Heal on itself?")
              if(useOnSelf == true){
                despelltarget(playerSideMin[position])
              }
              else{
                if(playerSideMin[position].mainTile == 1){
                  console.log("return");
                  currentTile.id = "player";
                }
                else{
                  console.log("return");
                  currentTile.id = "friendlyMage";
                }
                History.innerHTML = "Action cancelled.";
                targeting = 0;
                $("body").css("cursor","auto"); 
              }
            }
            else{
              History.innerHTML = fighter.name + " can't cast that spell on itself.";
              currentTile.id = "friendlyMage";
              targeting = 0;
              $("body").css("cursor","auto"); 
            }
          }
          else{
            if(playerSideMin[position].mainTile == 1){
              console.log("return");
              currentTile.id = "player";
            }
            else{
              console.log("return");
              currentTile.id = "friendly";
            }
            History.innerHTML = "<br> You have to target an enemy tile to attack.";
            targeting = 0;
            $("body").css("cursor","auto");
          }
        }
        else{
          if(playerSideMin[position].mainTile == 1){
            currentTile.id = "player";
          }
          else{
            currentTile.id = "friendly";
          }
          History.innerHTML = "<br> You have to target an enemy tile to attack.";
          targeting = 0;
          $("body").css("cursor","auto");
        }
      }
    }

    if(this.hp > this.maxhp){
      this.hp = this.maxhp;
    }

    if(this.hp <= 0){
      this.alreadyDead = 0;
      //this.name = "DEAD";
      //History.innerHTML += "<br> "+ name + " died.";
      if(currentTile.id == "enemy"){
        History.innerHTML += "<br> (Main tile) Enemy "+ name + " died.";
        this.alreadyDead = 1; 

        mainEnemy = "";
        console.log("cleared");
        skipguy = 2;
        enemySideMin.splice(this.position, 1, "");
        //console.log(currentTile);
        enemySide.removeChild(currentTile);
        Edivnum--;
        Fdivnum--;
        //ongoingUpdate = 0;
       // toUpdate = [];

        if(lose !== 1 && ongoingUpdate == 0){
          //alert("Descending to next level...");
          /**dLevel++;
          descend = 1;
          for(var j = 0; j < enemySideMin.length; j++){
            if(enemySideMin[j] !== ""){
              History.innerHTML += "<br>Enemy " + enemySideMin[j].name + " surrendered and joined your party!"

              if(enemySideMin[j].spell == 'yes'){
                
                newSpellMinion = new tile(enemySideMin[j].name,enemySideMin[j].hp,enemySideMin[j].atk,enemySideMin[j].special,enemySideMin[j].imageURL);
                newSpellMinion.spell = enemySideMin[j].spell;
                newSpellMinion.mna = enemySideMin[j].mna;
                newSpellMinion.maxmna = enemySideMin[j].maxmna;
                newSpellMinion.tome = enemySideMin[j].tome;
                newSpellMinion.costs = enemySideMin[j].costs;
                playerSideMin.push(newSpellMinion);
                newSpellMinion.createFriendlyTile();
                enemySide.removeChild(enemySideMin[j].actualtile);
                enemySideMin.splice(enemySideMin[j].position, 1, "");
                Edivnum--;
                Fdivnum--;
                
              }
              else{
                newMinion = new tile(enemySideMin[j].name, enemySideMin[j].hp, enemySideMin[j].atk, enemySideMin[j].special, enemySideMin[j].imageURL)
                playerSideMin.push(newMinion);
                newMinion.buffs = enemySideMin[j].buffs
                newMinion.createFriendlyTile();
                //console.log(Fdivnum)
                //newMinion = new tile('spider', 2, 1, "", "spider");
                //enemySideMin.push(newMinion);
                //newMinion.createEnemyTile();
                //console.log(enemySideMin[j]);
                enemySide.removeChild(enemySideMin[j].actualtile);
                enemySideMin.splice(enemySideMin[j].position, 1, "");
                Edivnum--;
                Fdivnum--;
              }
              //newMinion.update()
              
            }
          }
          enemySideMin = []**/
          /**function nextLevel(){
            if(dLevel > 1 && dLevel < 150){
              rand = Math.floor((Math.random() * 3) + 1);
              if(rand == 1 && dLevel < 5){
                newMinion = new tile('spider', 2, 1, "", "spider");
                newMinion.mainTile = 1;
                enemySideMin.push(newMinion);
                newMinion.createEnemyTile();
              }
              else if(rand ==2){
                newMinion = new tile('slime', 2, 1, "When this minion survives a hit, summon a slime with one less health.", "slime");
                newMinion.mainTile = 1;
                newMinion.buffs.push('slimecreate');
                enemySideMin.push(newMinion);
                newMinion.createEnemyTile();
              }
            }
           
            for (var i = 0; i <rand; i++) {
              rand = Math.floor((Math.random() * 5) + 1);
              if(rand == 1 && (dLevel > 1 && dLevel < 15)){
                newMinion = new tile('magic spider', 1 , 1, "Spell damage + 1", "spider2");
                enemySideMin.push(newMinion);
                newMinion.buffs.push('spellDMG1');
                newMinion.createEnemyTile();
              }
              else if(rand == 2 && (dLevel >= 10 && dLevel < 150)){
                newSpellMinion = new tile('holy mage',1,0,"Give a tile +2 HP for 3 MANA","holyKnight");
                newSpellMinion.spell = 'yes';
                newSpellMinion.mna = 4;
                newSpellMinion.maxmna = 4;
                newSpellMinion.costs = 3;
                newSpellMinion.tome = 'Lesser Heal';
                enemySideMin.push(newSpellMinion);
                newSpellMinion.createEnemyTile();
              }
              
            };
            for(var m = 0; m <playerSideMin.length; m++){
              if(playerSideMin[m].spell == 'yes' && playerSideMin[m].mna < playerSideMin[m].maxmna){
                playerSideMin[m].mna += 1;
                playerSideMin[m].update();
              }
            }

          }**/
          nextLevel();
          //skipguy = 0;
          //enemySideMin = []


        }
        else if(lose !== 1 && ongoingUpdate == 1){
          
        }


      }
      else if(currentTile.id == "friendly" || currentTile.id == "friendlyMage" || currentTile.id == "friendlyMageLow" || currentTile.id == "selected"){
        History.innerHTML += "<br> Friendly "+ name + " died.";
        for(var  y = 0; y<this.buffs.length; y++){
          if(this.buffs[y] == 'gnomeHurt'){
            for(var i=0; i<playerSideMin.length; i++){
              if(playerSideMin[i].mainTile == 1){
                playerSideMin[i].hp -= 2;
                History.innerHTML += "<br>...Because of friendly " + name + "'s special ability, " + playerSideMin[i].name + " were hurt for 2 health.";
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
          if(this.buffs[y] == 'spellDMG1'){
            spellDMG -= 1;
          }
          if(this.buffs[y] == "bomb1"){
            toUpdate = [];
            ongoingUpdate = 0;

            History.innerHTML += "<br>Because of friendly " + this.name + "'s special ability, ALL TILES took 1 damage!";
            this.alreadyDead = 1;

            playerSideMin.splice(this.position, 1, "")
            playerSide.removeChild(currentTile);
            Fdivnum--;

            for(g = 0; g < enemySideMin.length; g ++){
              if(enemySideMin[g] !== ""){
                enemySideMin[g].hp -= 1;
                History.innerHTML += "<br>Enemy " + enemySideMin[g].name + " took 1 damage from " + this.name + "'s explosion.";
                //enemySideMin[g].update();
                if(enemySideMin[g].mainTile == 1){
                  mainEnemy = enemySideMin[g]
                }
                else{
                  toUpdate.push(enemySideMin[g]);
                  console.log("push to update")
                }
              }
            }

            for(var o = 0; o < playerSideMin.length; o ++){
              if(playerSideMin[o] !== ""){
                playerSideMin[o].hp -= 1;
                History.innerHTML += "<br>Friendly " + playerSideMin[o].name + " took 1 damage from " + this.name + "'s explosion.";
                //playerSideMin[o].update();
                toUpdate.push(playerSideMin[o]);
              }
            }


            ongoingUpdate = 1;
            for(var u = 0; u < toUpdate.length; u++){
              console.log("Updating " + toUpdate[u].name)
              toUpdate[u].update();
            }
            ongoingUpdate = 0;
            toUpdate = []; //clear once everyone is updated
            targeting = 0;
            if(mainEnemy !== ""){
              console.log("main update")
              mainEnemy.update();
              mainEnemy = "";
            }
          }
        }
        if(this.alreadyDead == 0){
          this.actualtile.id = "friendly";
          playerSideMin.splice(this.position, 1, "")
          playerSide.removeChild(currentTile);
          Fdivnum--;

          console.log(playerSideMin);
            
          //remove "" from array
          /*
          for (var i = 0; i < playerSideMin.length; i++) {

            if(playerSideMin[i] == ""){
              playerSideMin.splice(i,1);
              i--;
            }
            playerSideMin[i].position --;
          };
          */
        }
      }
      else if(currentTile.id == "player"){
        History.innerHTML += "<br> "+ name + " died.";
        playerSideMin.splice(this.position, 1, "")
        playerSide.removeChild(currentTile);
        Fdivnum--;
        lose = 1;
        alert("You lose!");
      }
      else if(currentTile.id == "unfriendly"){
        History.innerHTML += "<br> Enemy "+ name + " died.";
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
          if(this.buffs[y] == "bomb1"){
            toUpdate = [];
            ongoingUpdate = 0;

            History.innerHTML += "<br>Because of enemy " + this.name + "'s special ability, ALL TILES took 1 damage!";
            this.alreadyDead = 1;

            enemySideMin.splice(this.position, 1, "");
            enemySide.removeChild(currentTile);
            Edivnum--;
            Fdivnum--;

            for(g = 0; g < enemySideMin.length; g ++){
              if(enemySideMin[g] !== ""){
                enemySideMin[g].hp -= 1;
                History.innerHTML += "<br>Enemy " + enemySideMin[g].name + " took 1 damage from " + this.name + "'s explosion.";
                //enemySideMin[g].update();
                if(enemySideMin[g].mainTile == 1){
                  mainEnemy = enemySideMin[g]
                }
                else{
                  toUpdate.push(enemySideMin[g]);
                  console.log("push to update")
                }
              }
            }

            for(var o = 0; o < playerSideMin.length; o ++){
              if(playerSideMin[o] !== ""){
                playerSideMin[o].hp -= 1;
                History.innerHTML += "<br>Friendly " + playerSideMin[o].name + " took 1 damage from " + this.name + "'s explosion.";
                //playerSideMin[o].update();
                toUpdate.push(playerSideMin[o]);
              }
            }


            ongoingUpdate = 1;
            for(var u = 0; u < toUpdate.length; u++){
              console.log("Updating " + toUpdate[u].name)
              toUpdate[u].update();
            }
            ongoingUpdate = 0;
            toUpdate = []; //clear once everyone is updated
            targeting = 0;
            if(mainEnemy !== ""){
              console.log("main update")
              mainEnemy.update();
              mainEnemy = "";
            }
          }
        }
        if(this.alreadyDead == 0){
          enemySideMin.splice(this.position, 1, "");
          enemySide.removeChild(currentTile);
          Edivnum--;
          Fdivnum--;
        }
      }

    }
    
    if(this.spell == 'yes'){
      
      currentTile.innerHTML= "<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"+this.name +"<br><strong>"+this.hp+ "/" + this.maxhp + "</strong> Health<strong><br>"+this.mna+ "/" + this.maxmna + "</strong> Mana<br>---<br>"+this.special;

      if(currentTile.id == "unfriendly"){
        //currentTile.id = "unfriendly";
      }

      else{
        //currentTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"+this.name +"<br><strong>"+this.hp+"</strong> Health<strong><br>"+this.mna+"</strong> Mana<br>---<br>"+this.special;
        //console.log(this.costs);
        if(this.costs > this.mna){
          //console.log("OOM!");
          currentTile.id = "friendlyMageLow";
        }
        else{
          currentTile.id = "friendlyMage";
        }
      }
      
    }
    if(this.hp > 0){
      if(this.buffs.length > 0){
        //if this has slime buff the make duplicate gimmick
        for(p = 0; p < this.buffs.length; p++){
          if(this.buffs[p] == "slimecreate"){
            if(this.friendly == 2 && this.unupdate !== 1){
              History.innerHTML += "<br> Because of " + this.name + "'s special ability, a slime was spawned on the enemy side.";
              newMinion = new tile('slime',(this.hp), 1, "When this minion survives a hit, summon a slime with one less health.", "slime");
              newMinion.buffs.push('slimecreate');
              enemySideMin.push(newMinion);
              newMinion.createEnemyTile();
            }
            else{
              if(this.unupdate !== 1){
                History.innerHTML += "<br> Because of " + this.name + "'s special ability, a slime was spawned on your side.";
                newMinion = new tile('slime', (this.hp), 1, "When this minion survives a hit, summon a slime", "slime");
                newMinion.buffs.push('slimecreate');
                playerSideMin.push(newMinion);
                newMinion.createFriendlyTile();
              }
              this.unupdate = 0;
              
            }
          }
        }
        currentTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"+this.name +"<br><strong>"+this.hp+"</strong> Health<strong><br>"+this.atk+"</strong> Attack<br>---<br>"+this.special;

      }
      else{
        
        if(this.spell !== 'yes'){
          currentTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"+this.name +"<br><strong>"+this.hp+ "/" + this.maxhp +  "</strong> Health<strong><br>"+this.atk+"</strong> Attack<br>---<br>"+this.special;
        }

      }
    }
    if(this.mainTile == 1){
      //currentTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"+this.name +"<br><strong>"+this.hp+ "/" + this.maxhp + "</strong> Health<strong><br>"+this.atk+"</strong> Attack<br>---<br>"+this.special;

    }
    
    this.actualtile = currentTile;
    
  };
  
};

//what the player is
player = new tile('You', 10, 2, "Main tile - If this tile dies, you lose!", "playertile");
presetTiles.push(player);

/*
player.mainTile = 1;
playerSideMin.push(player);
player.position = playerSideMin.length-1;
player.createFriendlyTile();
player.update();
*/




//Random mob

skeletonTile = new tile('Entrance Skeleton', 2, 3, "\"You shall not pass!\"", "skellyTile");
presetTiles.push(skeletonTile);

/*
newMinion = skeletonTile;
newMinion.mainTile = 1;
enemySideMin.push(newMinion);
newMinion.createEnemyTile();
*/

makeATile = function(tileT, enemy, main){
  newTile = new tile(tileT.name, tileT.hp, tileT.atk, tileT.special, tileT.imageURL);
  if(main){
    newTile.mainTile = 1;
    newTile.special += "<br> <strong> [MAIN TILE] </strong>";
  }
  if(enemy){
    enemySideMin.push(newTile);
    newTile.createEnemyTile();
  }
  else{
    playerSideMin.push(newTile);
    newTile.createFriendlyTile();
  }
  newTile.update();
  return newTile;
}

playerTile = makeATile(player, false, true);

testMin = makeATile(skeletonTile, true, true);

for (var i = 0; i < 3; i++) {
  testMin = makeATile(skeletonTile, true);
};

