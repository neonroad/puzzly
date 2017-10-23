//TILES



//Intended to be the player's starting tile
playerTile = new tile('Willing Adventurer', 5, 0, "\'Let's go!\'", "playertile");
playerTile.quote = "Quick in, quick out!";
playerTile.deathQuote = "This wasn't part of my plans!!!";
playerTile.summQuote = "What adventures will we find here?";
playerTile.pointsToSummon = 20;
presetTokens.push(playerTile);

//Legendaries

createLegendaryTiles = function(){


	nzomMage = new tile('N\'zom, Great Mage', 5,5,"On <strong>descent</strong>, sends the first other available tile on your side back to your hand (NOT the main tile or itself).", "nzom", "legendary");
	nzomMage.summQuote = "Cower before N'zom!";
	nzomMage.deathQuote = "Guh... Absurd...!";
	nzomMage.quote = "Simple fool...";
	nzomMage.specQuote = "Back to whence you came!";
	nzomMage.pointsToSummon = 30;
	nzomMage.buffs.push(sendToHandBuff);
	legendaries.push(nzomMage);

}

createLegendaryTiles();


//Vanilla dungeon enemies
createVanillaTiles = function(){


	skeletonTile = new tile('Entrance Skeleton', 2, 3, "\'You shall not pass!\'", "skellyTile");
	skeletonTile.summQuote = "No trespassing!";
	skeletonTile.quote = "No guts, no fear!";
	skeletonTile.deathQuote = "No life, no fear...";
	skeletonTile.pointsToSummon = 20;
	presetTiles.push(skeletonTile);

	puppetTile = new tile('Posessed Adventurer', 3, 2, "\'Plan ahead.\'", "puppet");
	puppetTile.summQuote = "*falls from ceiling*";
	puppetTile.quote = "*shuffles unnaturally*";
	puppetTile.deathQuote = "*falls over*";
	puppetTile.pointsToSummon = 20;
	presetTiles.push(puppetTile);

	axeKnightTile = new tile('Dungeon Knight', 5,5, "\'None may disturb this place!\'", "axeKnight");
	axeKnightTile.summQuote = "Who dares enter the dungeon?";
	axeKnightTile.quote = "Unless, of course, you'll pay me.";
	axeKnightTile.deathQuote = "I... failed....";
	axeKnightTile.pointsToSummon = 50;
	presetTiles.push(axeKnightTile);

	deadKnightTile = new tile('Forgotten Knight', 4,5, "\'You will be forgotten, too...\'", "deadAdvent");
	deadKnightTile.summQuote = "Lambs to the slaughter...";
	deadKnightTile.quote = "What do I have to lose?";
	deadKnightTile.deathQuote = "I regret nothing...";
	deadKnightTile.pointsToSummon = 45;
	presetTiles.push(deadKnightTile);

	flyTile = new tile('Mutated Fly', 1,1, "\'Bzzt...\'", "fly");
	flyTile.summQuote = "Bzzt!";
	flyTile.quote = "BZZ!";
	flyTile.deathQuote = "Bzzz......";
	flyTile.pointsToSummon = 0;
	presetTiles.push(flyTile);

	mudmanTile = new tile('Lost Mudman', 2,2, "\'This! Is! Not! My! Swamp!\'", "mudman");
	mudmanTile.summQuote = "It ain't home, but it can be!";
	mudmanTile.quote = "GET OUT!";
	mudmanTile.deathQuote = "Blugh..!";
	mudmanTile.pointsToSummon = 15;
	presetTiles.push(mudmanTile);

	bubbleSlime = new tile('Bubble Slime', 1, 2, "\'Blib blub\'", "bubbleSlime");
	bubbleSlime.summQuote = "*expands*";
	bubbleSlime.quote = "Blub?";
	bubbleSlime.deathQuote = "*pop*";
	bubbleSlime.pointsToSummon = 10;
	presetTiles.push(bubbleSlime);

	crazyTile = new tile('Crazed Adventurer', 3, 3, "\'You ain't one of them, are ya?!\'", "crazyGuy");
	crazyTile.summQuote = "I- I swear I've been here before!";
	crazyTile.quote = "THERE'S ANOTHER ONE!";
	crazyTile.deathQuote = "I'm just gonna lie down here...";
	crazyTile.pointsToSummon = 30;
	presetTiles.push(crazyTile);

	antTile = new tile('Unpleas-Ant', 2, 1, "\'>:(\'", "ant");
	antTile.summQuote = "*crawls up*";
	antTile.quote = ">:U";
	antTile.deathQuote = "<:(";
	antTile.pointsToSummon = 10;
	presetTiles.push(antTile);

	ghostTile = new tile("Ghost Host", 4, 4, "\'Scary boo!\'", "ghost");
	ghostTile.summQuote = "BOO!";
	ghostTile.quote = "Jeering boo!";
	ghostTile.deathQuote = "Sad boo-hoo...";
	ghostTile.pointsToSummon = 40;
	presetTiles.push(ghostTile);

	centipedeTile = new tile("Dungeon Centipede", 4, 3, "\'(Doesn't have 100 legs)\'", "chatterpillar");
	centipedeTile.summQuote = "*skitters in*";
	centipedeTile.quote = "(Doesn't have a soul)";
	centipedeTile.deathQuote = "(Doesn't care)";
	centipedeTile.pointsToSummon = 35;
	presetTiles.push(centipedeTile);

	dungeonBarbarianTile = new tile("Dungeon Barbarian", 3, 4, "\'This is not yours to claim!\'", "redKnight");
	dungeonBarbarianTile.summQuote = "For the Crimson Claw!";
	dungeonBarbarianTile.quote = "Taste my blade.";
	dungeonBarbarianTile.deathQuote = "Death claims us all...";
	dungeonBarbarianTile.pointsToSummon = 35;
	presetTiles.push(dungeonBarbarianTile);

}

createVanillaTiles();

//Unique effects

//Existence
createExistenceTiles = function(){

	glitchTile = new tile('Unknown Entity', getRandomIntInclusive(1,5),getRandomIntInclusive(1,5), "<strong>Exists</strong> with <strong>random</strong> Health and <strong>random</strong> attack.", 'glitch');
	glitchTile.summQuote = "0000";
	glitchTile.quote = "10010101...";
	glitchTile.deathQuote = "2";
	glitchTile.pointsToSummon = 40;
	presetTiles.push(glitchTile);

	glitchBuff = new tile('Unknown Being', 3, 3, "<strong>Exists</strong> with a <strong>random</strong> buff.", 'glitchMage');
	glitchBuff.summQuote = "exist.exe";
	glitchBuff.quote = "attack.js";
	glitchBuff.deathQuote = "fatal error.";
	glitchBuff.specQuote = "calculating...";
	glitchBuff.pointsToSummon = 40;

	glitchBuff.randomBuff = presetBuffs[getRandomIntInclusive(0,presetBuffs.length-1)]
	glitchBuff.buffs.push(glitchBuff.randomBuff);
	glitchBuff.special += "<br>Buff: <strong>" + glitchBuff.randomBuff.name + "</strong>";

	presetTiles.push(glitchBuff);
}

createExistenceTiles();


//Descent

createDescentTiles = function(){


	tulipMageTile = new tile('Tulip Mage', 3, 2, "<strong>Heals</strong> itself to full health on <strong>descent</strong>.", 'tulipMage');
	tulipMageTile.summQuote = "I must not fall!";
	tulipMageTile.quote = "I'll do what I can!";
	tulipMageTile.deathQuote = "Noo..!";
	tulipMageTile.specQuote = "Refreshed and ready!";
	tulipMageTile.pointsToSummon = 30;

	tulipMageTile.buffs.push(photosynthesisBuff);

	presetTiles.push(tulipMageTile);

	gasCloudTile = new tile('Living Gas Cloud', 3, 4, "Loses <strong>1</strong> hp on <strong>descent</strong>.", 'icky');
	gasCloudTile.summQuote = "Let's get messy!";
	gasCloudTile.quote = "This is my favorite part!";
	gasCloudTile.deathQuote = "Hahaha...!";
	gasCloudTile.pointsToSummon = 35;

	gasCloudTile.buffs.push(hurtOnDescentDeBuff);

	presetTiles.push(gasCloudTile);

	//NECROMANCER

	necromancerTile = new tile('Practicing Necromancer',4,4, "Creates a <strong>1 hp 1 atk</strong> minion on <strong>descent</strong>.",'necromancer');
	necromancerTile.summQuote = "A blank canvas for my art!";
	necromancerTile.quote = "If I must...";
	necromancerTile.deathQuote = "Leave me be..!";
	necromancerTile.specQuote = "RISE!";
	necromancerTile.pointsToSummon = 50;

	//NECROMANCER TOKEN
	necromancerSummonToken = new tile('Risen Undead', 1,1,"\'Hiss..\'",'animatedSkeleton');
	necromancerSummonToken.summQuote = "*reanimates*";
	necromancerSummonToken.quote = "Living flesh!";
	necromancerSummonToken.deathQuote = "Ashes to ashes...";
	necromancerSummonToken.pointsToSummon = 0;

	presetTokens.push(necromancerSummonToken);

	//BACK TO NECROMANCER
	necromancerTile.buffs.push(createSkeletonBuff);
	presetTiles.push(necromancerTile);


	richGuyTile = new tile('Popular Adventurer', 1, 2, "On <strong>descent</strong>, <strong>summons</strong> the first tile in your <strong>hand</strong>.","richguy");
	richGuyTile.summQuote = "I'm needed in a lot of places!";
	richGuyTile.quote = "Step aside!";
	richGuyTile.deathQuote = "Watch the glasses..!";
	richGuyTile.specQuote = "I know just the person for this!";
	richGuyTile.pointsToSummon = 45;

	richGuyTile.buffs.push(summonFirstMinionBuff);

	presetTiles.push(richGuyTile);


	discardWraithTile = new tile('Lingering Wraith', 3, 3, "On <strong>descent</strong>, <strong>discards</strong> the first tile in your hand.", "wraith");
	discardWraithTile.summQuote = "I think I'll stick around for a while...";
	discardWraithTile.quote = "Feeling scared?";
	discardWraithTile.deathQuote = "Agahhhh...!";
	discardWraithTile.specQuote = "Hope you didn't need that...";
	discardWraithTile.pointsToSummon = 20;

	discardWraithTile.buffs.push(discardOnDescentDeBuff);
	presetTiles.push(discardWraithTile);

	ghoulGroupTile = new tile('Ghoul Infestation', 2,2, "On <strong>descent</strong>, gain <strong>1</strong> health.", "ghouls");
	ghoulGroupTile.summQuote = "Food! Air! Mold!";
	ghoulGroupTile.quote = "More! More! MORE!";
	ghoulGroupTile.deathQuote = "AH! Ooh--! Ow..!";
	ghoulGroupTile.pointsToSummon = 25;

	ghoulGroupTile.buffs.push(increaseHpOnDescentBuff);
	presetTiles.push(ghoulGroupTile);

	mountainBeastTile = new tile('Hungry Beast', 2, 2, "On <strong>descent</strong>, gain <strong>1</strong> attack.", "beast");
	mountainBeastTile.summQuote = "Haargh!";
	mountainBeastTile.quote = "Mmmm.....";
	mountainBeastTile.deathQuote = "Rraaah..!";
	mountainBeastTile.pointsToSummon = 30;

	mountainBeastTile.buffs.push(increaseAtkOnDescentBuff);
	presetTiles.push(mountainBeastTile);

}

createDescentTiles();

//Always make a first level

player = makeATile(playerTile, false, true);

testMin = makeATile(flyTile, true, true);

for (var i = 0; i < 2; i++) {
  testMin = makeATile(axeKnightTile, false);
};