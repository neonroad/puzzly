//work on mage

//define the board, literally
var board = document.getElementById("board");
var enemySide = document.getElementById("enemyside");
var playerSide = document.getElementById("playerside");
var History = document.getElementById('historyText');

//if you lose, then turn to 1
var lose = 0;

//toUpdate is an array that holds tiles that need to be updated at the end of an action
toUpdate = [];
var ongoingUpdate = 0; //0 if the array is empty

//Define sides as lists
var enemySideMin = [];

var playerSideMin = [];

//dungeon levels, used for later
var dLevel = 1
var descend = 0;


var skipguy = 0; //if necessary, skip updating this guy

//Preset tiles saved in an array for convenience?
presetTiles = [];

//"borrowed" code for random int

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


//Fighting
fight = function(guy1, guy2){ //1 = playerside
  //var skipguy = 0; //if necessary, skip updating this guy
  History.innerHTML+="<br><span id='quote'><span id='friendlyName'>"+guy1.name + "</span>: \"" + guy1.quote + "\"</span><br>";

  
  if(guy1.mainTile == 1){
    guy1.actualtile.id = "player";
  }
  else{
    guy1.actualtile.id = "friendly";
  }
  
  guy1.hp -= guy2.atk;
  History.innerHTML += "<br><span id='friendlyCombat'> <span id='friendlyName'>" + guy1.name + "</span> attacked <span id='unfriendlyName'>" + guy2.name + "</span> for <span id='unfriendlyName'>" + guy1.atk + "</span> damage.</span>";


  guy2.hp -= guy1.atk;
  History.innerHTML += "<br><span id='unfriendlyCombat'>In return, <span id='unfriendlyName'>" + guy2.name + "</span> did <span id='unfriendlyName'>" + guy2.atk + "</span> damage to <span id='friendlyName'>" + guy1.name + "</span>.</span>"; 

  
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

//find in array function
findInArray = function(search, array){
  for(var x = 0; x < array.length; x++){
    if(array[x] = search){
      return x;
    }
  }
  return undefined;
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

surrenderSide = function(side){

  for (var i = 0; i < side.length; i++) {
    var t = side[i];
    if(t.mainTile != 1){

      var tempTile = makeATile(t, t.friendly);


      //History text
      if(t.friendly != 1){
        History.innerHTML += "<br><span id='unfriendlyName'>" + t.name + "</span> surrendered!";


      }
      else{
        History.innerHTML += "<br><span id='friendlyName'>" + t.name + "</span> surrendered!";


      }


      //New tile

    }

    t.currentTile.remove();
    side.splice(i,1);
    i--;
  
  };

  //out of loop
  
}

nextLevel = function(){
    dLevel++;
    descend = 1;

    surrenderSide(enemySideMin);

    makeATile(presetTiles[getRandomIntInclusive(0,presetTiles.length-1)], true, true);

    for(var x = 0; x < getRandomIntInclusive(0,10); x ++){
      makeATile(presetTiles[getRandomIntInclusive(0,presetTiles.length-1)], true);
    }
    descend = 0;



}

//Describing what a 'tile' holds
tile = function(name,hp,atk,special,imageURL,position){ //imageurl is just the name of the file stored in assets WITHOUT the extension
  var currentTile;
  this.tileElement;
  this.originalName = name;
  this.position = position;
  this.buffs = [];
  this.spell = false;
  this.name = name;
  this.hp = hp;
  this.maxhp = hp;
  this.atk = atk;
  this.special = special;
  this.imageURL = imageURL;
  this.friendly = 0;

  this.quote = "";
  this.deathQuote = "";
  this.specQuote = "";

  this.createTile = function(){
    this.tileElement = document.createElement("div");

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
    else if(this.mainTile == 1 && this.friendly == 0){
      this.tileElement.setAttribute("id","enemy");
    }

    //Other
    else if(this.spell == true){
      this.tileElement.setAttribute("id", "friendlyMage");
    }
    else if(this.friendly ==1){
      this.tileElement.setAttribute("id","friendly");
    }
    else{
      this.tileElement.setAttribute("id","unfriendly");
    }
    
    this.tileElement.setAttribute("class","tile");


    //this.tileElement.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"
    //+this.name +":<br><strong>"+this.hp+"</strong> Health<strong><br>"+this.atk+"</strong> Attack<br>---<br>"+this.special;

    currentTile = this.tileElement;
    this.currentTile = currentTile;
  }

  
  this.update = function(){

    //If currentTile exists and this tile is FRIENDLY
    if(currentTile != undefined && this.friendly == 1){
      //define its parent being the tile we want
      currentTile.parent = this;

      //when this tile is clicked
      currentTile.onmousedown = function(){
        
        //If the tile can attack
        if(targeting == 0 && this.parent.atk >= 1 && this.parent.spell == false){
          target(this.parent);
        }

        //if the tile has no attack
        else if(targeting == 0 && this.parent.atk < 1 && this.parent.spell == false){
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
    else if(currentTile != undefined && this.friendly != 1){
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

      if(currentTile.id == "enemy"){
  
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
      else if(currentTile.id == "friendly" || currentTile.id == "friendlyMage" || currentTile.id == "friendlyMageLow" || currentTile.id == "selected"){
        History.innerHTML += "<br><br><span id='quote'><span id='friendlyName'>" + this.name + "</span>: \"" + this.deathQuote + "\"</span>";
        History.innerHTML += "<br><span id='death'><span id='friendlyName'>"+ this.name + "</span> died.</span><br>";

        //remove from existence
        if(this.markForDeath == true){
          this.actualtile.id = "friendly";

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
        playerSideMin.splice(this.position, 1, "")
        playerSide.removeChild(currentTile);
        Fdivnum--;
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
    
    if(this.spell == true){
      
      currentTile.innerHTML= "<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"
      +this.name +":<br><strong>"+this.hp+ "/" + this.maxhp + "</strong> Health<strong><br>"+this.mna+ "/" + this.maxmna + "</strong> Mana<br>---<br>"+this.special;

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
        currentTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"
        +this.name +":<br><strong>"+this.hp+"</strong> Health<strong><br>"+this.atk+"</strong> Attack<br>---<br>"+this.special;

      }

      else{
        
        if(this.spell !== true){
          currentTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"
          +this.name +":<br><strong>"+this.hp+ "/" + this.maxhp +  "</strong> Health<strong><br>"+this.atk+"</strong> Attack<br>---<br>"+this.special;
        }

      }
    }
    if(this.mainTile == 1){
      //currentTile.innerHTML="<img src='assets/"+ imageURL + ".png' height='100' width='100'><span id='name'> <br>"+this.name +"<br><strong>"+this.hp+ "/" + this.maxhp + "</strong> Health<strong><br>"+this.atk+"</strong> Attack<br>---<br>"+this.special;

    }
    
    this.actualtile = currentTile;
    
  };
  

};


makeATile = function(tileT, enemy, main){
  newTile = new tile(tileT.name, tileT.hp, tileT.atk, tileT.special, tileT.imageURL);

  newTile.quote = tileT.quote;
  newTile.deathQuote = tileT.deathQuote;
  newTile.specQuote = tileT.specQuote;

  if(main){
    newTile.mainTile = 1;
    newTile.special += "<br><strong> [MAIN TILE] </strong><br>";
  }
  if(enemy){
    enemySideMin.push(newTile);
    newTile.createTile();
  }
  else{
    playerSideMin.push(newTile);
    newTile.friendly = 1;
    newTile.createTile();
  }
  newTile.update();
  return newTile;
}


