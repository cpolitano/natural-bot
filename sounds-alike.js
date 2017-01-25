"use strict";
const natural = require("natural");
const soundex = natural.SoundEx; // weights beginning of word more
const metaphone = natural.Metaphone; // more powerful

const word1 = "write";
const word2 = "right";

if (soundex.compare(word1, word2)) {
	console.log("sounds alike");
}

console.log(soundex.process(word1));
console.log(soundex.process(word2));
console.log(metaphone.process(word1));
console.log(metaphone.process(word2));