"use strict";

const natural = require("natural");

// Tokenizers
// splits words by spaces, discards punctuation
const tokenizer = new natural.WordTokenizer();

// NGrams
const NGrams = natural.NGrams;
const para = "These violent delights have violent ends.\nAnd in their triumph die, like fire and powder,\nWhich, as they kiss, consume. The sweetest honey \nIs loathsome in his own deliciousness\nAnd in the taste confounds the appetite.\nTherefore love moderately. Long love doth so.\nToo swift arrives as tardy as too slow.";
let bigrams = NGrams.bigrams(para); // breaks text into groups of two neighboring words
let trigrams = NGrams.trigrams(para); // breaks text into groups of three
let nGrams = NGrams.ngrams(para, 5); // breaks text into groups of n

// Tag parts of speech
const Tagger = natural.BrillPOSTagger;
const baseFolder = "./node_modules/natural/lib/natural/brill_pos_tagger";
const rules = baseFolder + "/data/English/tr_from_posjs.txt";
const lexicon = baseFolder + "/data/English/lexicon_from_posjs.json";
const defaultCategory = "N";

const tagger = new Tagger(lexicon, rules, defaultCategory, (err) => {
	if (err) {
		console.log(err);
	}
	else {
		let word_array = tokenizer.tokenize(para);
		// console.log(tagger.tag(word_array)); // assigns NN, JJ etc to mark parts of speech
	}
});



