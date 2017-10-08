

//Stat buffs, etc.
// buffAttack = new buff('Attack Buff', 'constant', 1);

// buffAttack.activate = function(){
// 	//this.created = false;
// 	// this.points = 0;
// 	// this.source = undefined;

// 	if(this.parent != undefined){
// 		//console.log("I am buffing " + this.parent.name);
// 		console.log(this.created);
// 		var sideBuff = enemySideMin;
// 		if(this.parent.friendly){
// 			sideBuff = playerSideMin;
// 		}

// 		for (var i = 0; i < sideBuff.length; i++) {	

// 			if(sideBuff[i] == this.source.parent && !sideBuff[i].markForDeath){
// 				console.log("source still there");
// 				this.parent.atk += this.points;
// 				this.created = true;
// 				//this.parent.update();
// 				break;
// 			}
// 		};

// 		if(this.created == false){
// 			console.log('erase atk!');	
// 			this.parent.atk -= this.points;
// 			this.parent.buffs.splice(findInArray(this,this.parent.buffs), 1);
// 		}
// 		//this.parent.update();


// 	}


// }

// //Constant buffs
// motivateAtkBuff = new buff('Motivate Attack', 'constant', 1);
// motivateAtkBuff.activate = function(){
// 	//console.log("BUFFING!");
// 	if(this.parent != undefined){
// 		var apply = true;
// 		var sideBuff = enemySideMin;
// 		if(this.parent.friendly){
// 			sideBuff = playerSideMin;
// 		}


// 		for (var i = 0; i < sideBuff.length; i++) {

// 			for (var b = 0; b < sideBuff[i].buffs.length; b++) {

// 				if( (sideBuff[i].buffs[b].name == 'Attack Buff' && sideBuff[i].buffs[b].source == this) || sideBuff[i] == this.parent || this.markForDeath){
// 					apply = false;
// 				}

// 			};

// 			if(apply && !this.markForDeath){

// 				console.log("BUFFING!" + sideBuff[i].name);

// 				tempBuff = makeABuff(buffAttack);

// 				tempBuff.points = 1;

// 				tempBuff.source = this;

// 				tempBuff.created = false;

// 				sideBuff[i].buffs.push(tempBuff);	

// 				sideBuff[i].update();
// 			}
// 		};

// 		// if(this.parent.markForDeath){
// 		// 	console.log("im ded");
// 		// 	for (var i = 0; i < sideBuff.length; i++) {
// 		// 		if(sideBuff[i] != this.parent){
// 		// 			sideBuff[i].update();
// 		// 		}
// 		// 	};
// 		// }
// 	}
// }

// motivateAtkBuff.deactivate = function(){
// 	if(this.parent.markForDeath){
// 		for (var i = 0; i < sideBuff.length; i++) {
// 			if(sideBuff[i] != this.parent){
// 				sideBuff[i].update();
// 			}
// 		};
// 	}
// }

//Descent buffs

photosynthesisBuff = new buff('Photosynthesis', 'descent', 1);

photosynthesisBuff.activate = function(){
	//console.log(this.parent);
	if(this.parent != undefined){
		var quoteName = "unfriendlyName";

		if(this.parent.friendly){
			quoteName = "friendlyName";
		}
		if(this.parent.hp < this.parent.maxhp && !this.parent.markForDeath){
			var healAmount = this.parent.maxhp-this.parent.hp;
			healTile(this.parent, healAmount);

			History.innerHTML += "<br><span id='quote'><span id='" + quoteName + "'>" + this.parent.name + "</span>:\"" + this.parent.specQuote + "\"</span>";
			History.innerHTML += "<br><span id='" + quoteName + "'>" + this.parent.name + "</span> healed " + healAmount +" hp!";
		}
	}
}

presetBuffs.push(photosynthesisBuff);