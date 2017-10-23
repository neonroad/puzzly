
var defineName = function(buff){
	var quoteName = "unfriendlyName";

	if(buff.parent.friendly){
		quoteName = "friendlyName";
	}	

	return quoteName;
}

var defineSide = function(buff){
	var side = enemySideMin;

	if(buff.parent.friendly){
		side = playerSideMin;
	}
	return side;
}



//Descent buffs

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