"use strict";
const natural = require("natural");
const wordnet = new natural.WordNet();

let word = "wayfaring";

wordnet.lookup(word, (results) => {
	results.forEach(result => {
		console.log(result.synsetOffset);
		console.log(result.pos); // part of speech
		console.log(result.gloss); // definitions
		console.log(result.synonyms);
	})
});

// direct lookup with synset number and pos
wordnet.get(298144, "n", (result) => {
	console.log(result);
});
