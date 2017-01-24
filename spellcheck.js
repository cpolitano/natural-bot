"use strict";

const request = require("request");
const fs = require("fs");
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

// Romeo and Juliet as corpus for spellcheck
let rawDataShakespeare = "http://www.gutenberg.org/cache/epub/1112/pg1112.txt";

const getData = (url) => {
	return new Promise((resolve) => {

		request
		.get(url)
		.pipe(fs.createWriteStream("shakespeare.txt"));

		resolve();
	});
}

getData(rawDataShakespeare)
.then(() => {
	console.log("\ndone fetching shakespeare\n");

	const text = fs.readFileSync("shakespeare.txt", "utf-8");
	const corpus = tokenizer.tokenize(text);
	const spellcheck = new natural.Spellcheck(corpus);

	console.log(spellcheck.isCorrect("delights"));
	// words that are 1 character away from incorrect word
	console.log(spellcheck.getCorrections("delites"));

	let sentence = "thay hade truble fiiding th thng".split(" ");

	sentence.forEach(word => {
		console.log(spellcheck.getCorrections(word)[0]);
	});
})
.catch(err => {
	console.log(err);
});

