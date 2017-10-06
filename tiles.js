//TILES



//Intended to be the player's starting tile
playerTile = new tile('Willing Adventurer', 10, 0, "\'Down the depths we go!\'", "playertile");
playerTile.quote = "Quick in, quick out!";
playerTile.deathQuote = "This wasn't part of my plans!!!";
presetTiles.push(playerTile);





//Vanilla dungeon enemies

skeletonTile = new tile('Entrance Skeleton', 2, 3, "\'You shall not pass!\'", "skellyTile");
skeletonTile.quote = "No guts, no fear!";
skeletonTile.deathQuote = "No life, no fear...";
presetTiles.push(skeletonTile);

puppetTile = new tile('Posessed Adventurer', 3, 2, "\'Plan ahead.\'", "puppet");
puppetTile.quote = "*shuffles unnaturally*";
puppetTile.deathQuote = "*falls over*";
presetTiles.push(puppetTile);

axeKnightTile = new tile('Dungeon Knight', 5,5, "\'None may disturb this place!\'", "axeKnight");
axeKnightTile.quote = "Unless, of course, you'll pay me.";
axeKnightTile.deathQuote = "I... failed....";
presetTiles.push(axeKnightTile);

deadKnightTile = new tile('Forgotten Knight', 4,5, "\'You will be forgotten, too...\'", "deadAdvent");
deadKnightTile.quote = "What do I have to lose?";
deadKnightTile.deathQuote = "I regret nothing...";
presetTiles.push(deadKnightTile);

flyTile = new tile('Mutated Fly', 1,1, "\'Bzzt...\'", "fly");
flyTile.quote = "BZZ!";
flyTile.deathQuote = "Bzzz......";
presetTiles.push(flyTile);

mudmanTile = new tile('Lost Mudman', 2,2, "\'This! Is! Not! My! Swamp!\'", "mudman");
mudmanTile.quote = "GET OUT!";
mudmanTile.deathQuote = "Blugh..!";
presetTiles.push(mudmanTile);


//Unique effects
glitchTile = new tile('Unknown Entity', getRandomIntInclusive(1,5),getRandomIntInclusive(1,5), "<strong>Exists</strong> with <strong>random</strong> Health and random attack. <br> \'1010\'", 'glitch');
glitchTile.quote = "10010101...";
glitchTile.deathQuote = "2";
presetTiles.push(glitchTile);



//Always make a first level

player = makeATile(playerTile, false, true);

testMin = makeATile(flyTile, true, true);

for (var i = 0; i < 3; i++) {
  testMin = makeATile(skeletonTile, false);
};