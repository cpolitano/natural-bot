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




