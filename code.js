//work on mage

//define the board, literally
var board = document.getElementById("board");
var enemySide = document.getElementById("enemyside");
var playerSide = document.getElementById("playerside");
var History = document.getElementById('historyText');
var summonElement = document.getElementById("hand");
var pointElement = document.getElementById("points");

//if you lose, then turn to 1
var lose = 0;

//toUpdate is an array that holds tiles that need to be updated at the end of an action
toUpdate = [];
var ongoingUpdate = 0; //0 if the array is empty

//Define sides as lists
var enemySideMin = [];

enemySideMin.maxLength = 8;

var playerSideMin = [];

playerSideMin.maxLength = 8;

//Summoning hand
var summonHand = [];
summonHand.maxLength = 4;
var points = 0;

//dungeon levels, used for later
var dLevel = 1
var descend = 0;



var skipguy = 0; //if necessary, skip updating this guy

//Preset tiles saved in an array for convenience?
presetTiles = [];

presetTokens = [];

legendaries = [];

presetBuffs = [];

//"borrowed" code for random int

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

pointUpdate = function(){
  if(points < 0){
    points = 0;
  }
  pointElement.innerHTML = points;
}

//Fighting
fight = function(guy1, guy2){ //1 = playerside
  //var skipguy = 0; //if necessary, skip updating this guy
  History.innerHTML+="<br><span id='quote'><span id='friendlyName'>"+guy1.name + "</span>: \"" + guy1.quote + "\"</span><br>";

  
  if(guy1.mainTile == 1){
    //guy1.actualtile.id = "player";
  }
  else{
   // guy1.actualtile.id = "friendly";
  }
  
  guy1.hp -= guy2.atk;
  History.innerHTML += "<br><span id='friendlyCombat'> <span id='friendlyName'>" + guy1.name + "</span> attacked <span id='unfriendlyName'>" + guy2.name + "</span> for <span id='unfriendlyName'>" + guy1.atk + "</span> damage.</span>";


  guy2.hp -= guy1.atk;
  History.innerHTML += "<br><span id='friendlyCombat'>In return, <span id='unfriendlyName'>" + guy2.name + "</span> did <span id='unfriendlyName'>" + guy2.atk + "</span> damage to <span id='friendlyName'>" + guy1.name + "</span>.</span>"; 

  
  guy1.update();


  guy2.update();
  
  targeting = 0;

  minionAttack = 0;
  $("body").css("cursor","auto");
  skipguy = 0;
};

//healing
healTile = function(tile, hp){
  tile.hp += hp;
  //tile.update();
}

hurtTile = function(tile, dmg){
  tile.hp -= dmg;
  //tile.update();
}

checkForOriginal = function(tileA){
  if(tileA.rank == 'legendary'){
    for (var i = 0; i < legendaries.length; i++) {
      if(legendaries[i].originalName == tileA.originalName){
        return legendaries[i];
      }
    };
  }
  else{
    for (var i = 0; i < presetTiles.length; i++) {
      if(presetTiles[i].originalName == tileA.originalName){
        return presetTiles[i];
      }
    };
  }
  for (var i = 0; i < presetTokens.length; i++) {
    if(presetTokens[i].originalName == tileA.originalName){
      return presetTokens[i];
    }
  };
  return undefined;
}

//Targeting

targeting = 0;
fighter = "";

updateBoard = function(){
  for (var i = 0; i < enemySideMin.length; i++) {
    enemySideMin[i].update();
  };
  for (var i = 0; i < playerSideMin.length; i++) {
    playerSideMin[i].update();
  };
}

//find in array function
findInArray = function(search, array){
  for(var x = 0; x < array.length; x++){
    if(array[x] == search){
      return x;
    }
  }
  return undefined;
}

checkIfFull = function(array){
  if(array.length >= array.maxLength){
    return true;
  }
  return false;
}

//Check for activated buffs
checkForBuffs = function(condition, side){
  var currentUpdate = undefined;
  for (var i = 0; i < side.length; i++) {
    

    for (var b = 0; b < side[i].buffs.length; b++) {

  
      if(side[i].buffs[b].type == condition){

        currentUpdate = side[i];
        side[i].buffs[b].activate();
        
        if(side[i] != currentUpdate ){
          i --;
          //side[i].update();
        }
        else{
          side[i].update();
        }

      }
    };
  };
  
}

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
  History.innerHTML="Targeting with " + tile.name + "...";
  History.innerHTML+="<br><span id='quote'><span id='friendlyName'>"+tile.name + "</span>: \"" + tile.quote + "\"</span><br>";
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
}

//clicking an enemy minion
detarget = function(tile){
  
  minionAttack = 1;
  $("body").css("cursor","auto");
  History.innerHTML= "Hit:";
  fight(fighter,tile);
}

//canceling a target
cancelTarget = function(){
  targeting = 0;
  $("body").css("cursor","auto");
}

//casting on an enemy minion
despelltarget = function(tile){
  $("body").css("cursor","auto");
  History.innerHTML= "Cast a spell:";
  cast(fighter,tile,fighter.tome);
}

//creating a 'summon' tile
makeASummon = function(summonTile){
  newTile = new tile(summonTile.name, summonTile.hp, summonTile.atk, summonTile.special, summonTile.imageURL, summonTile.rank);

  newTile.summQuote = summonTile.summQuote;
  newTile.quote = summonTile.quote;
  newTile.deathQuote = summonTile.deathQuote;
  newTile.specQuote = summonTile.specQuote;
  newTile.pointsToSummon = summonTile.pointsToSummon;

  for (var i = 0; i < summonTile.buffs.length; i++) {
    newTile.buffs.push(makeABuff(summonTile.buffs[i]));
  };

  newTile.createSummon();
  newTile.update();
  summonHand.push(newTile);
  return newTile;
}

//Move all minions to other side
surrenderSide = function(side){

  for (var i = 0; i < side.length; i++) {
    var t = side[i];
    if(t.mainTile != 1){
      //t.update();
      var tempTile = makeATile(t, t.friendly, false, true); //it is an incarnation, so set its maxhp BEFORE updating
      //tempTile.maxhp = t.maxhp;
      //console.log(t);

      //History text
      if(t.friendly != 1 && tempTile != undefined){
        History.innerHTML += "<br><span id='unfriendlyName'>" + t.name + "</span> surrendered!";
        if(!checkIfFull(summonHand) && checkForOriginal(t) != undefined){
          makeASummon(checkForOriginal(t))
        }
        /*
        for (var y = 0; y < presetTiles.length; y++) {

          if(presetTiles[y].originalName == t.originalName && !checkIfFull(summonHand)){
            makeASummon(presetTiles[y]);
          }

        };*/

      }
      else if(t.friendly != 1 && tempTile == undefined){
        History.innerHTML += "<br><span id='unfriendlyName'>" + t.name + "</span> ran away!";
      }
      else if(t.friendly == 1 && tempTile != undefined){
        History.innerHTML += "<br><span id='friendlyName'>" + t.name + "</span> surrendered!";
      }
      else if(t.friendly == 1 && tempTile == undefined){
        History.innerHTML += "<br><span id='friendlyName'>" + t.name + "</span> ran away!";
      }


    }
    //t.currentTile.remove();
  };

  
  for (var i = side.length-1; i >=0; i--) {
    side[i].currentTile.remove();
    side.splice(i,1);
  };
  //out of loop
  
}

//descent
nextLevel = function(){

    History.innerHTML += "<br><span id='friendlyCombat'>You descend!</span><br>";

    dLevel++;
    descend = 1;

    //check for descend buffs and ACTIVATE them
    checkForBuffs('descent', playerSideMin);


    //Add points
    for (var i = 0; i < playerSideMin.length; i++) {
      points += 5;
      pointUpdate();
    };

    //Surrender enemy minions
    surrenderSide(enemySideMin);

    //---------------------------
    //Make the next level
    var legendaryLevel = getRandomIntInclusive(1,10);
    if(legendaryLevel == 1){
      makeATile(legendaries[getRandomIntInclusive(0,legendaries.length-1)],true,true);
    }
    else{
      makeATile(presetTiles[getRandomIntInclusive(0,presetTiles.length-1)], true, true);
    }

    for(var x = 0; x < getRandomIntInclusive(1,enemySideMin.maxLength-1); x ++){
      makeATile(presetTiles[getRandomIntInclusive(0,presetTiles.length-1)], true);
    }
    descend = 0;
    //updateBoard();



}

//Describe a buff
buff = function(name, type, healthy){
  this.parent = undefined;
  this.name = name;
  this.type = type;
  this.healthy = healthy;
}

//Describing what a 'tile' holds
tile = function(name,hp,atk,special,imageURL,rank){ //imageurl is just the name of the file stored in assets WITHOUT the extension
  var currentTile;
  this.cardText;
  this.tileElement;
  this.originalName = name;
  //this.position = position;
  this.buffs = [];
  this.name = name;
  this.hp = hp;
  this.maxhp = hp;
  this.atk = atk;
  this.special = special;
  this.imageURL = imageURL;
  this.friendly = 0;
  this.rank = rank;
  this.summoning = false;
  this.pointsToSummon = 0;

  this.summQuote = "";
  this.quote = "";
  this.deathQuote = "";
  this.specQuote = "";

  if(rank == undefined){
    //console.log("no rank defined for " + this.name);
    this.rank = "common";
  }

  this.createTile = function(){
    this.tileElement = document.createElement("div");

    this.costElement = document.createElement("div");
    this.costElement.setAttribute("id","tileCost");

    this.tileElement.appendChild(this.costElement);

    this.cardText = document.createElement("p");
    this.cardText.setAttribute("id","cardText");
    this.tileElement.appendChild(this.cardText);

    //Put the tile in either DIV
    if(this.friendly == 1){
      playerSide.appendChild(this.tileElement);
    }
    else{
      enemySide.appendChild(this.tileElement);
    }


    //Friendly Main

    if(this.mainTile == 1 && this.friendly == 1){
      this.tileElement.setAttribute("id","player");
    }

    //Enemy Main
    else if(this.mainTile == 1 && this.friendly == 0 && this.rank != 'legendary'){
      this.tileElement.setAttribute("id","enemy");
    }

    else if(this.mainTile == 1 && this.friendly == 0 && this.rank == 'legendary'){
      this.tileElement.setAttribute("id","legendaryEnemy");
    }

    
    else if(this.friendly ==1){
      this.tileElement.setAttribute("id","friendly");
    }
    else{
      this.tileElement.setAttribute("id","unfriendly");
    }
    

    if(this.rank == 'legendary'){
      this.tileElement.setAttribute("class", "legendaryTile");
    }
    else{
      this.tileElement.setAttribute("class","tile");
    }

    //this.tileElement.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"
    //+this.name +":<br><strong>"+this.hp+"</strong> Health<strong><br>"+this.atk+"</strong> Attack<br>---<br>"+this.special;

    currentTile = this.tileElement;
    this.currentTile = currentTile;
  }

  this.createSummon = function(){
    this.tileElement = document.createElement("div");

    if(this.rank == 'legendary'){
      this.tileElement.setAttribute("class","legendaryTileSummon");      
    }
    else{
      this.tileElement.setAttribute("class","tileSummon");
    }

    this.costElement = document.createElement("div");
    this.costElement.setAttribute("id","tileCost");

    this.tileElement.appendChild(this.costElement);

    this.cardText = document.createElement("p");
    this.cardText.setAttribute("id","cardText");
    this.tileElement.appendChild(this.cardText);
    
    // this.costElement = document.createElement("div");
    // this.costElement.setAttribute("id","summonCost");

    //this.costElement.innerHTML = this.pointsToSummon;

    summonElement.appendChild(this.tileElement);

    //this.tileElement.appendChild(this.costElement);

    currentTile = this.tileElement;
    this.currentTile = currentTile;
    this.summoning = true;

  }

  this.summon = function(){
    // points -= this.pointsToSummon;
    // pointUpdate();
    makeATile(this, false);
    History.innerHTML += "<br><br><span id='friendlyName'>" + this.name + "</span>:<span id='quote'>\"" + this.summQuote + "\"</span>"; 
    History.innerHTML += "<br><span id='friendlyName'>" + this.name + "</span><span id='friendlyCombat'> was <strong>summoned</strong></span>.<br>";

    
    if(findInArray(this, summonHand) != undefined){
      summonHand.splice(findInArray(this,summonHand), 1);
      currentTile.remove();
    }
  }

  this.discard = function(){
    if(findInArray(this, summonHand) != undefined){
      summonHand.splice(findInArray(this,summonHand), 1);
      currentTile.remove();
    }
  }

  this.removeSafely = function(){
    var side = enemySideMin;

    if(this.friendly){
      side = playerSideMin;
    }

    if(findInArray(this,side) != undefined){
      side.splice(findInArray(this,side),1);      
    }
    currentTile.remove();
    
  }
  
  this.update = function(){

    //define parent for buffs
    for (var i = 0; i < this.buffs.length; i++) {
      this.buffs[i].parent = this;
    };



    //If currentTile exists and this tile is FRIENDLY
    if(currentTile != undefined && this.friendly == 1 && !this.summoning){
      //define its parent being the tile we want
      currentTile.parent = this;

      //when this tile is clicked
      currentTile.onmousedown = function(){
        
        //If the tile can attack
        if(targeting == 0 && this.parent.atk >= 1){
          target(this.parent);
        }

        //if the tile has no attack
        else if(targeting == 0 && this.parent.atk < 1){
          History.innerHTML = "This minion has no attack.";
        }

        //if aiming at friendly minion
        else if(targeting == 1 && this.parent.friendly == 1){
          History.innerHTML = "You can't attack friendly minions!";
          cancelTarget();
        }
      }
    }

    //if currenttile exists and this tile is NOT FRIENDLY
    else if(currentTile != undefined && this.friendly != 1 && !this.summoning){
      //define the parent
      currentTile.parent = this;

      //when this tile is clicked
      currentTile.onmousedown = function(){

        //clicking an enemy first
        if(targeting == 0){
          History.innerHTML = "You have to choose a minion from your side to attack with!";
        }

        //fighting
        if(targeting == 1){
          detarget(this.parent);
        }
      }

    }

    else if(this.summoning){
      currentTile.parent = this;
      currentTile.onmousedown = function(){
        if(targeting == 0 && playerSideMin.length < playerSideMin.maxLength && points >= this.parent.pointsToSummon){
          points -= this.parent.pointsToSummon;
          pointUpdate();         
          this.parent.summon();
        }
        else if(targeting == 0 && playerSideMin.length >= playerSideMin.maxLength && points >= this.parent.pointsToSummon){
          History.innerHTML = "Your side is full!";
        }
        else if(targeting == 0 && playerSideMin.length < playerSideMin.maxLength && points < this.parent.pointsToSummon){
          History.innerHTML = "You don't have enough points! (" + this.parent.pointsToSummon + " required)";
        }
        else{
          History.innerHTML = "You can't attack a summon tile!";
          cancelTarget();
        }
      }
    }




    //Avoid out of bounds with the following
    //---------------------------------------
    if(this.hp > this.maxhp){
      this.hp = this.maxhp;
    }

    if(this.atk < 0){
      this.atk = 0;
    }
    //---------------------------------------


    //If minion dies

    if(this.hp <= 0 || this.markForDeath){
      this.markForDeath = true;
      //this.name = "DEAD";


      if(currentTile.id == "enemy" || currentTile.id == "legendaryEnemy"){
  
        History.innerHTML += "<br><br><span id='quote'><span id='unfriendlyName'>" + this.name + "</span>: \"" + this.deathQuote + "\"</span>";

        History.innerHTML += "<br><span id='death'> (Main tile) <span id='unfriendlyName'>"+ this.name + "</span> died.</span><br>";

        //skipguy = 2;
        if(findInArray(this,enemySideMin) != undefined){
          enemySideMin.splice(findInArray(this,enemySideMin), 1)            
        }

        //console.log(currentTile);
        currentTile.remove();
        //ongoingUpdate = 0;
        // toUpdate = [];

        if(lose !== 1 && ongoingUpdate == 0){
          
          nextLevel();


        }
        else if(lose !== 1 && ongoingUpdate == 1){
          
        }


      }
      else if(currentTile.id == "friendly" || currentTile.id == "selected"){
        History.innerHTML += "<br><br><span id='quote'><span id='friendlyName'>" + this.name + "</span>: \"" + this.deathQuote + "\"</span>";
        History.innerHTML += "<br><span id='death'><span id='friendlyName'>"+ this.name + "</span> died.</span><br>";

        //remove from existence
        if(this.markForDeath == true){
          //this.actualtile.id = "friendly";

          //find in array
          if(findInArray(this,playerSideMin) != undefined){
            playerSideMin.splice(findInArray(this,playerSideMin), 1)            
          }

          //remove HTML
          currentTile.remove();
          
        }
      }
      else if(currentTile.id == "player"){
        History.innerHTML += "<br><br><span id='quote'><span id='friendlyName'>" + this.name + "</span>: \"" + this.deathQuote + "\"</span>";
        History.innerHTML += "<br><span id='death'><span id='friendlyName'>"+ name + " died.</span><br>";
        //playerSideMin.splice(this.position, 1, "")

        if(this.markForDeath == true){
          //this.actualtile.id = "friendly";

          //find in array
          if(findInArray(this,playerSideMin) != undefined){
            playerSideMin.splice(findInArray(this,playerSideMin), 1)            
          }

          //remove HTML
          currentTile.remove();
          
        }

        lose = 1;
        alert("You lose!");
      }
      else if(currentTile.id == "unfriendly"){

        History.innerHTML += "<br><br><span id='quote'><span id='unfriendlyName'>" + this.name + "</span>: \"" + this.deathQuote + "\"</span>";

        History.innerHTML += "<br><span id='death'><span id='unfriendlyName'>"+ name + "</span> died.</span><br>";
        
        //remove from existence
        if(this.markForDeath == true){

          //find in array
          if(findInArray(this,enemySideMin) != undefined){
            enemySideMin.splice(findInArray(this,enemySideMin), 1)            
          }

          //remove the HTML
          currentTile.remove();
        }
      }

    }

    //if(this.hp > 0){

    if(this.cardText != undefined){

      this.cardText.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"
      +this.name +":<br><span id='friendlyName'>"+this.hp+ "/" + this.maxhp +  "</span> Health<span id='unfriendlyName'><br>"+this.atk+"</span> Attack<br>---<br>"+this.special;
    }

    if(this.costElement != undefined){
      this.costElement.innerHTML = this.pointsToSummon;
    }
    //}
    
    //this.actualtile = currentTile;
    
  };
  

};

makeABuff = function(buffB){
  newBuff = new buff(buffB.name, buffB.type, buffB.healthy);
  //newBuff.parent = tile;
  newBuff.activate = buffB.activate;
  return newBuff;

}

makeATile = function(tileT, enemy, main, incarnation){
  //create tile
  newTile = new tile(tileT.name, tileT.hp, tileT.atk, tileT.special, tileT.imageURL, tileT.rank);
  
  //check if the tile was created already
  var created = false;

  newTile.summQuote = tileT.summQuote;
  newTile.quote = tileT.quote;
  newTile.deathQuote = tileT.deathQuote;
  newTile.specQuote = tileT.specQuote;
  newTile.pointsToSummon = tileT.pointsToSummon;

  for (var i = 0; i < tileT.buffs.length; i++) {
    newTile.buffs.push(makeABuff(tileT.buffs[i]));
  };

  //newTile.buffs = tileT.buffs;

  if(main){
    newTile.mainTile = 1;
    newTile.special += "<br><strong> [MAIN TILE] </strong><br>";
  }

  if(enemy && enemySideMin.length < enemySideMin.maxLength){
    created = true;
    enemySideMin.push(newTile);
    newTile.createTile();
        
  }

  else if(!enemy && playerSideMin.length < playerSideMin.maxLength){
    created = true;
    playerSideMin.push(newTile);
    newTile.friendly = 1;
    newTile.createTile();
  }
  if(incarnation){
    newTile.maxhp = tileT.maxhp;
  }

  if(created){
    newTile.update();
    return newTile;
  }
  return undefined;
}
