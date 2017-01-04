"use strict";

const natural = require("natural");
const string = "What's in a name? That which we call a rose by any other name would smell as sweet.";

// Tokenizers
// splits words by spaces, discards punctuation
const tokenizer = new natural.WordTokenizer();
let tokenizedString = tokenizer.tokenize(string);

// splits words by spaces, retains punctuation as tokens
const punctTokenizer = new natural.WordPunctTokenizer();

// splits words by spaces, preserves semantics
const treebankTokenizer = new natural.TreebankWordTokenizer();

// splits regex - this one will split by sentences
const regexTokenizer = new natural.RegexpTokenizer({pattern: /[!?.]/});


// Stemming
// finds the roots of words
const stemmer = natural.PorterStemmer;
let rose = stemmer.stem("roses");

// returns the roots of all words able to be stemmed
let roots = stemmer.tokenizeAndStem(string);

// Inflectors
const nounInflector = new natural.NounInflector();
// console.log(nounInflector.pluralize("rose"));
// console.log(nounInflector.singularize("tomatoes"));
const countInflector = natural.CountInflector;
let ordinal = countInflector.nth(3); // transforms 1 to 1st, 2 to 2nd, etc

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
		console.log(tagger.tag(word_array)); // assigns NN, JJ etc to mark parts of speech
	}
})


