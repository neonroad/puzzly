//TILES



//Intended to be the player's starting tile
playerTile = new tile('Willing Adventurer', 10, 0, "\"Down the depths we go!\"", "playertile");
playerTile.quote = "Quick in, quick out!";
playerTile.deathQuote = "This wasn't part of my plans!!!";
presetTiles.push(playerTile);





//Dungeone enemies

skeletonTile = new tile('Entrance Skeleton', 2, 1, "\"You shall not pass!\"", "skellyTile");
skeletonTile.quote = "No guts, no fear!";
skeletonTile.deathQuote = "No fear, no life...";
presetTiles.push(skeletonTile);



//Always make a first level

player = makeATile(playerTile, false, true);

testMin = makeATile(skeletonTile, true, true);

for (var i = 0; i < 3; i++) {
  testMin = makeATile(skeletonTile, false);
};