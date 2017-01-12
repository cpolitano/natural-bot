"use strict";

const request = require("request");
const fs = require("fs");
const natural = require("natural");
// Naive Bayes algorithm
const classifier = new natural.BayesClassifier();
// other classifier option is Logistic Regression algorithm
// performs better than Bayes with a sufficiently large dataset
// takes longer to train
// const classifier = new natural.LogisticRegressionClassifer();

// Is it Romeo and Juliet, or is it the Iliad?
let rawDataShakespeare = "http://www.gutenberg.org/cache/epub/1112/pg1112.txt";
let rawDataHomer = "http://www.gutenberg.org/cache/epub/6130/pg6130.txt";
let training_data = [];
let test_data = [];

const saveData = (url, filename) => {
	request
	.get(url)
	.pipe(fs.createWriteStream(filename));
}

const formatTrainingData = (filename, label) => {
	fs.readFile(filename, "utf-8", (err, data) => {
		if (err) {
			console.log(err);
		}
		else {
			let rawText = data;
			let sentences = rawText.split(".");
			let training_data = sentences.splice(-500, 500).map(sentence => {
				let dataPoint = {text: sentence, label: label};
				console.log(dataPoint);
				return dataPoint;
			});
			// train(training_data);
		}
	});
}

const testClassifier = (test_data) => {
	console.log("\ntesting data\n");
	let numCorrect = 0;
	test_data.forEach(datum => {
		let guess = classifier.classify(datum.text);
		console.log(datum.text, " - Guess:", guess);
		console.log(classifier.getClassifications(datum.text));
		if (guess === datum.label) {
			numCorrect++;
		}
	});

	console.log("\ncorrect %:", numCorrect/test_data.length);
}


const loadTestData = () => {
	console.log("\nstart loading\n");

	fs.readFile("test_data.json", "utf-8", (err, data) => {
		if (err) {
			console.log(err);
		}
		else {
			let test_data = JSON.parse(data);
			testClassifier(test_data);
		}
	});
}

const train = (data) => {
	console.log("\nstart training\n");

	data.forEach((item) => {
		classifier.addDocument(item.text, item.label);
	});

	let start_time = new Date();
	classifier.train();
	let end_time = new Date();
	let training_time = (end_time - start_time)/1000.0;
	console.log("training time:", training_time, "seconds");
	// loadTestData();
}

saveData(rawDataShakespeare, "shakespeare.txt");
saveData(rawDataHomer, "homer.txt");

formatTrainingData("shakespeare.txt", "shakespeare");
formatTrainingData("homer.txt", "homer");

loadTestData();

