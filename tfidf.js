"use strict";
const natural = require("natural");
const tfidf = new natural.TfIdf();
// Term Frequency Inverse Document Frequency
// finds important words in text data
// calculated by number of times term appears in document multiplied by 
// the number of documents that contain the term divided by number of documents

const documents = [
	"Zarathustra, however, looked at the people and wondered. Then he spake thus:",
	"Man is a rope stretched between the animal and the Superman--a rope over an abyss.",
	"A dangerous crossing, a dangerous wayfaring, a dangerous looking-back, a dangerous trembling and halting.",
	"What is great in man is that he is a bridge and not a goal: what is lovable in man is that he is an OVER-GOING and a DOWN-GOING.",
	"I love those that know not how to live except as down-goers, for they are the over-goers.",
	"I love the great despisers, because they are the great adorers, and arrows of longing for the other shore.",
	"I love those who do not first seek a reason beyond the stars for going down and being sacrifices, but sacrifice themselves to the earth, that the earth of the Superman may hereafter arrive.",
	"I love him who liveth in order to know, and seeketh to know in order that the Superman may hereafter live. Thus seeketh he his own down-going.",
	"I love him who laboureth and inventeth, that he may build the house for the Superman, and prepare for him earth, animal, and plant: for thus seeketh he his own down-going.",
	"I love him who loveth his virtue: for virtue is the will to down-going, and an arrow of longing.",
	"I love him who reserveth no share of spirit for himself, but wanteth to be wholly the spirit of his virtue: thus walketh he as spirit over the bridge."
];

documents.forEach(doc => {
	tfidf.addDocument(doc);
})

tfidf.tfidfs("love spirit bridge", (docIndex, measure) => {
	console.log("Document", docIndex, ":", measure);
});

tfidf.listTerms(10).forEach((item) => {
	console.log(item.term, ":", item.tfidf);
});

// Trie
// case-sensitive, pass in false to make case-insensitive
const trie = new natural.Trie();

documents.forEach(doc => {
	trie.addString(doc);
});

console.log(trie.contains("Superman"));
console.log(trie.keysWithPrefix("Zarathustra"));
console.log(trie.findMatchesOnPath("Zarathustra"));




