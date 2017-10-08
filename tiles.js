//TILES



//Intended to be the player's starting tile
playerTile = new tile('Willing Adventurer', 10, 0, "\'Let's go!\'", "playertile");
playerTile.quote = "Quick in, quick out!";
playerTile.deathQuote = "This wasn't part of my plans!!!";
playerTile.summQuote = "What adventures will we find here?";
playerTile.pointsToSummon = 20;
presetTiles.push(playerTile);





//Vanilla dungeon enemies

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





//Unique effects
glitchTile = new tile('Unknown Entity', getRandomIntInclusive(1,5),getRandomIntInclusive(1,5), "<strong>Exists</strong> with <strong>random</strong> Health and <strong>random</strong> attack.", 'glitch');
glitchTile.summQuote = "0000";
glitchTile.quote = "10010101...";
glitchTile.deathQuote = "2";
glitchTile.pointsToSummon = 40;
presetTiles.push(glitchTile);

//Heal at descent
tulipMageTile = new tile('Tulip Mage', 3, 2, "<strong>Heals</strong> itself to full health after <strong>descending</strong>.", 'tulipMage');
tulipMageTile.summQuote = "I must not fall!";
tulipMageTile.quote = "I'll do what I can!";
tulipMageTile.deathQuote = "Noo..!";
tulipMageTile.specQuote = "Refreshed and ready!";
tulipMageTile.pointsToSummon = 30;


tulipMageTile.buffs.push(photosynthesisBuff);


presetTiles.push(tulipMageTile);




//Always make a first level

player = makeATile(playerTile, false, true);

testMin = makeATile(flyTile, true, true);

for (var i = 0; i < 5; i++) {
  testMin = makeATile(tulipMageTile, false);
};