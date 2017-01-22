"use strict";

const request = require("request");
const fs = require("fs");
const natural = require("natural");
const es = require("event-stream");

// instantiate classifier
const classifier = new natural.BayesClassifier();

// Is it Romeo and Juliet, or is it the Iliad?
let rawDataShakespeare = "http://www.gutenberg.org/cache/epub/1112/pg1112.txt";
let rawDataHomer = "http://www.gutenberg.org/cache/epub/6130/pg6130.txt";
let training_data = [];
let test_data = [];

const prepareData = (url, label) => {
	return new Promise((resolve) => {
		let counter = 0;

		console.log("requesting", label);

		request
		.get(url)
		.pipe(es.split())
		.pipe(es.map(function (line, cb) {
			counter++;
			// add to training data
			if (counter > 200 && counter < 1500 && line !== "") {
				let data = {text: line, label: label};
				training_data.push(data);
				cb();
			}
			// add to test data
			else if (counter > 1500 && counter < 2000 && line !== "") {
				let data = {text: line, label: label};
				test_data.push(data);
				cb();
			}
			else if (counter === 2000) {
				resolve();
			}
			// discard data
			else {
				cb();
			}
		}));

	});
}

const testClassifier = (test_data) => {
	console.log("\ntesting data\n");
	let numCorrect = 0;
	test_data.forEach(datum => {
		let guess = classifier.classify(datum.text);
		// console.log(datum.text, " - Guess:", guess);
		// console.log(classifier.getClassifications(datum.text));
		if (guess === datum.label) {
			numCorrect++;
		}
	});

	console.log("\ncorrect %:", numCorrect/test_data.length);
	saveClassifier(classifier);
}

const saveClassifier = (classifier) => {
	classifier.save("classifier.json", (err, classifier) => {
		if (err) {
			console.log(err);
		}
		else {
			console.log("classifier saved");
		}
	})
}

const train = (data) => {
	return new Promise((resolve) => {
		console.log("\nstart training\n");

		data.forEach((item) => {
			classifier.addDocument(item.text, item.label);
		});

		let start_time = new Date();
		classifier.train();
		let end_time = new Date();
		let training_time = (end_time - start_time)/1000.0;
		console.log("training time:", training_time, "seconds");

		resolve();
	});
	
}

prepareData(rawDataShakespeare, "shakespeare")
.then(() => {
	console.log("\ndone processing shakespeare\n");

	prepareData(rawDataHomer, "homer")
	.then(() => {
		console.log("\ndone processing homer\n");
		console.log("\ntraining data sample:\n", training_data.slice(0, 2));
		console.log("\ntest data sample:\n", test_data.slice(0, 2));

		train(training_data)
		.then(() => {
			// feed test data into classifier
			testClassifier(test_data);
		})
		.catch(err => {
			console.log(err);
		});
	})
	.catch(err => {
		console.log(err);
	});
})
.catch(err => {
	console.log(err);
});

