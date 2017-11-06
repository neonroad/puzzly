
var defineName = function(buff, opposite){
	var quoteName = "unfriendlyName";

	if(opposite == undefined){
		opposite = false;
	}

	if(buff.parent.friendly){
		quoteName = "friendlyName";
	}	

	if(opposite && quoteName == "friendlyName"){
		quoteName = "unfriendlyName";
	}
	else if(opposite && quoteName == "unfriendlyName"){
		quoteName = "friendlyName";
	}

	return quoteName;
}

var defineSide = function(buff, opposite){
	var side = enemySideMin;
	if(opposite == undefined){
		opposite = false;
	}
	if(buff.parent.friendly){
		side = playerSideMin;
	}
	if(opposite && side == playerSideMin){
		side = enemySideMin;
	}
	else if(opposite && side == enemySideMin){
		side = playerSideMin;
	}
	return side;
}



//Descent buffs

createDescentBuffs = function(){



	photosynthesisBuff = new buff('Photosynthesis', 'descent', 1);

	photosynthesisBuff.activate = function(){
		//console.log(this.parent);
		if(this.parent != undefined){
			var quoteName = defineName(this);

			if(this.parent.hp < this.parent.maxhp && !this.parent.markForDeath){
				var healAmount = this.parent.maxhp-this.parent.hp;
				healTile(this.parent, healAmount);

				History.innerHTML += "<br><span id='quote'><span id='" + quoteName + "'>" + this.parent.name + "</span>:\"" + this.parent.specQuote + "\"</span>";
				History.innerHTML += "<br><span id='" + quoteName + "'>" + this.parent.name + "</span> healed <span id='friendlyName'>" + healAmount +"</span> hp!";
			}
		}
	}

	presetBuffs.push(photosynthesisBuff);

	//----

	createSkeletonBuff = new buff('Animate Dead', 'descent', 1);

	createSkeletonBuff.activate = function(){
		if(this.parent != undefined){
			var quoteName = defineName(this);
			var side = defineSide(this);

			if(side.length < side.maxLength && !this.parent.markForDeath){


				makeATile(necromancerSummonToken, !this.parent.friendly, false);

				History.innerHTML += "<br><span id='quote'><span id='" + quoteName + "'>" + this.parent.name + "</span>:\"" + this.parent.specQuote + "\"</span>";
				History.innerHTML += "<br><span id='quote'><span id='" + quoteName + "'>" + necromancerSummonToken.name + "</span>:\"" + necromancerSummonToken.summQuote + "\"</span>";
				History.innerHTML += "<br><span id='" + quoteName + "'>" + this.parent.name + "</span> created <span id='friendlyName'>" + necromancerSummonToken.name +"</span>!";
			}
		}
	}

	presetBuffs.push(createSkeletonBuff);

	//----

	summonRandMinionBuff = new buff('Random Dial', 'descent', 1);

	summonRandMinionBuff.activate = function(){

		if(this.parent != undefined){
			var quoteName = defineName(this);
			var side = defineSide(this);

			if(side.length < side.maxLength && !this.parent.markForDeath && summonHand.length > 0){
				var randSummon = getRandomIntInclusive(0, summonHand.length-1);
				History.innerHTML += "<br><span id='quote'><span id='" + quoteName + "'>" + this.parent.name + "</span>:\"" + this.parent.specQuote + "\"</span>";
				summonHand[randSummon].summon();
			}

		}	
	}

	presetBuffs.push(summonRandMinionBuff);

	//----

	summonFirstMinionBuff = new buff('Call-In', 'descent', 1);

	summonFirstMinionBuff.activate = function(){

		if(this.parent != undefined){
			var quoteName = defineName(this);
			var side = defineSide(this);

			if(side.length < side.maxLength && !this.parent.markForDeath && summonHand.length > 0){
				var handSummon = 0;
				History.innerHTML += "<br><span id='quote'><span id='" + quoteName + "'>" + this.parent.name + "</span>:\"" + this.parent.specQuote + "\"</span>";
				summonHand[handSummon].summon();
			}

		}	
	}

	presetBuffs.push(summonFirstMinionBuff);

	//Descent Debuffs

	hurtOnDescentDeBuff = new buff('Evaporating Gas', 'descent', 0);

	hurtOnDescentDeBuff.activate = function(){
		if(this.parent != undefined){
			var quoteName = defineName(this);

			if(!this.markForDeath){
				History.innerHTML += "<br><span id='" + quoteName + "'>" + this.parent.name + "</span> hurt itself for <span id='unfriendlyName'>1</span> hp!";
				hurtTile(this.parent, 1);
			}
			
		}
	}

	presetBuffs.push(hurtOnDescentDeBuff);

	discardOnDescentDeBuff = new buff('Forgotten Memories', 'descent', 0);

	discardOnDescentDeBuff.activate = function(){
		if(this.parent != undefined){
			var quoteName = defineName(this);
			var side = defineSide(this);

			if(summonHand.length > 0 && !this.parent.markForDeath){
				discarded = summonHand[0];
				History.innerHTML += "<br><span id='" + quoteName + "'>" + this.parent.name + "</span> discarded <span id='unfriendlyName'>" + discarded.name + "</span> from your hand!";
				History.innerHTML += "<br><span id='quote'><span id='" + quoteName + "'>" + this.parent.name + "</span>:\"" + this.parent.specQuote + "\"</span>";
				summonHand[0].discard();
			}
		}
	}

	presetBuffs.push(discardOnDescentDeBuff);

	increaseAtkOnDescentBuff = new buff('Growing Hunger', 'descent', 1);

	increaseAtkOnDescentBuff.activate = function(){
		if(this.parent != undefined){
			var quoteName = defineName(this);

			if(!this.parent.markForDeath){
				History.innerHTML += "<br><span id='" + quoteName + "'>" + this.parent.name + "</span> gained <span id='friendlyName'>1</span> attack!";
				this.parent.atk ++;
			}
		}

	}

	presetBuffs.push(increaseAtkOnDescentBuff);

	increaseHpOnDescentBuff = new buff('Growing Numbers', 'descent', 1);

	increaseHpOnDescentBuff.activate = function(){
		if(this.parent != undefined){
			var quoteName = defineName(this);
			this.parent.maxhp ++;
			this.parent.hp++;
			History.innerHTML += "<br><span id='" + quoteName + "'>" + this.parent.name + "</span> gained <span id='friendlyName'>1</span> health!";
		}
	}

	presetBuffs.push(increaseHpOnDescentBuff);

	//Legendary Buffs?

	sendToHandBuff = new buff('Return Spell', 'descent', 0);

	sendToHandBuff.activate = function(){
		if(this.parent != undefined){
			var quoteName = defineName(this);
			var side = defineSide(this);

			if(summonHand.length < summonHand.maxLength){
				for (var i = 0; i < side.length; i++) {
					if(!side[i].mainTile && side[i] != this.parent && !this.parent.markForDeath){

						if(checkForOriginal(side[i]) != undefined){
							testSummon = makeASummon(checkForOriginal(side[i]));
						}
						//testSummon = makeASummon(side[i]);
						History.innerHTML += "<br><span id='quote'><span id='" + quoteName + "'>" + this.parent.name + "</span>:\"" + this.parent.specQuote + "\"</span>";
						History.innerHTML += "<br><span id='" + quoteName + "'>" + this.parent.name + "</span> sent <span id='friendlyName'>" + side[i].name +"</span> back to your hand!";
						side[i].removeSafely();
						break;
					}
				};
			}


		}
	}

	presetBuffs.push(sendToHandBuff);

}

createDescentBuffs();


//Before Fight Buffs
createBeforeFightBuffs = function(){
	killOpponentBuff = new buff("Deathly Touch", 'beforeFight', 1);

	killOpponentBuff.activate = function(opponent){
		if(this.parent != undefined && opponent != undefined){
			var quoteName = defineName(this);
			var otherQuoteName = defineName(this, true);

			History.innerHTML += "<br><span id='" + quoteName + "'>" + this.parent.name + "</span> outright killed <span id='" + otherQuoteName +"'>" + opponent.name +"</span>!";
			if(!opponent.markForDeath){
				opponent.markForDeath = true;
			}
			//opponent.markForDeath = true;
		}
	
	}

	presetBuffs.push(killOpponentBuff);

}

createBeforeFightBuffs();

//After Fight Buffs
createAfterFightBuffs = function(){
	surrenderEnemyAfterFightBuff = new buff('Convincing Offer', 'afterFight', 1);

	surrenderEnemyAfterFightBuff.activate = function(opponent){
		if(this.parent != undefined && opponent != undefined){
			var quoteName = defineName(this);
			var otherQuoteName = defineName(this, true);

			if(!opponent.mainTile && !opponent.markForDeath){
				History.innerHTML += "<br><span id='" + quoteName + "'>" + this.parent.name + "</span> convinces <span id='" + otherQuoteName +"'>" + opponent.name +"</span> to surender!";
				surrenderTile(opponent);
			}
		}
	}

	presetBuffs.push(surrenderEnemyAfterFightBuff);
}

createAfterFightBuffs();

//Surrender Buffs

createSurrenderBuffs = function(){

	loyalDeathBuff = new buff('Ardent Life', 'surrender', 1);
	
	loyalDeathBuff.activate = function(){
		if(this.parent != undefined && !this.parent.markForDeath){
			var quoteName = defineName(this);

			History.innerHTML += "<br><span id='" + quoteName + "'>" + this.parent.name + "</span> killed itself instead of surrendering!";
			this.parent.markForDeath = true;
			//console.log('loyal death?');
			//this.parent.update();
		}
	}

	presetBuffs.push(loyalDeathBuff);

	surrenderDamageBuff = new buff('Flaming Prisoner', 'surrender', 1);

	surrenderDamageBuff.activate = function(){
		if(this.parent != undefined && !this.parent.markForDeath){
			cancelOngoingActions = false;
			var quoteName = defineName(this);
			var side = defineSide(this);

			History.innerHTML += "<br><span id='quote'><span id='" + quoteName + "'>" + this.parent.name + "</span>:\"" + this.parent.specQuote + "\"</span>";
			console.log(side);
			for (var i = 0; i < side.length; i++) {
				if(side[i] != this.parent && !cancelOngoingActions){

					currentUpdate = side[i];
					hurtTile(side[i], 1);

					var quoteName = "unfriendlyName";
					if(side[i].friendly){
						quoteName = "friendlyName";
					}

					History.innerHTML += "<br><span id='"+quoteName+"'>"+ side[i].name + "</span> took 1 damage from " + this.parent.name + "'s " + this.name + " ability!";
					if(!side[i].markForDeath){

						if(side[i].update()){
							i--;
						}
						//i--;
					}
				}
				else if(cancelOngoingActions){
					console.log('prob killed main tile!');
					break;
				}
			};

		}
	}

	presetBuffs.push(surrenderDamageBuff);

	surrenderFightBuff = new buff('Snap Back', 'surrender', 1);
	surrenderFightBuff.activate = function(){
		if(this.parent != undefined && !this.parent.markForDeath){
			
			var quoteName = defineName(this);
			var oppQuoteName = defineName(this, true);
			var side = defineSide(this, false);
			var main;

			//Find main
			
			for (var i = 0; i < side.length; i++) {
				if(side[i].mainTile){
					main = side[i];
					break;
				}
			};

			if(main != undefined){
				if(!main.markForDeath){
					//console.log('updating ' + main.name + " from " + this.parent.name);
					if(!main.update()){
						History.innerHTML += "<br><span id='" + quoteName + "'>" + this.parent.name + "</span> attacks <span id='" + oppQuoteName + "'>" + main.name + "</span>!";
						fight(this.parent, main);
					}	
				}
			
			}


		}
	}

	presetBuffs.push(surrenderFightBuff);

}

createSurrenderBuffs();

//Death Buffs

createDeathBuffs = function(){

	surrenderAllyDeBuff = new buff('Bean Spiller', 'death', 0);

	surrenderAllyDeBuff.activate = function(){
		if(this.parent!= undefined && this.parent.markForDeath){
			var quoteName = defineName(this);
			var oppQuoteName = defineName(this, true);
			var side = defineSide(this);

			for (var i = 0; i < side.length; i++) {
				
				if(!side[i].mainTile && !side[i].markForDeath && side[i] != this.parent && !side[i].update()){
					
	
					History.innerHTML += "<br><span id='quote'><span id='" + quoteName + "'>" + this.parent.name + "</span>:\"" + this.parent.specQuote + "\"</span>";
					History.innerHTML += "<br><span id='" + quoteName + "'>" + this.parent.name + "</span> made <span id='" + quoteName + "'>" + side[i].name + "</span> surrender!";
					surrenderTile(side[i]);
					
					//surrenderTile(side[i]);
					break;
					
				}
			};
		}
	}

	presetBuffs.push(surrenderAllyDeBuff);

}

createDeathBuffs();