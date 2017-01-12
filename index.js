"use strict";

const natural = require("natural");
const fs = require("fs");
// Naive Bayes algorithm
const classifier = new natural.BayesClassifer();
// other classifier option is Logistic Regression algorithm
// performs better than Bayes with a sufficiently large dataset
// takes longer to train
// const classifier = new natural.LogisticRegressionClassifer();

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
	loadTestData();
}

fs.readFile("training_data.json", "utf-8", (err, data) => {
	if (err) {
		console.log(err);
	}
	else {
		let training_data = JSON.parse(data);
		train(training_data);
	}
})


