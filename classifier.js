"use strict";

const natural = require("natural");

// Naive Bayes Classifier
const classifier = new natural.BayesClassifier();

// divide data into training and test data
// ~75% of data should be training, 25% test
const trainingData = [
    {text: 'RE: Canadian drugs now on sale', label: 'spam'}, 
    {text: 'Earn more from home', label: 'spam'},
    {text: 'Information now available!!!', label: 'spam'},
    {text: 'Earn easy cash', label: 'spam'},
    {text: 'Your business trip is confirmed for Monday the 4th', label: 'notspam'},
    {text: 'Project planning - next steps', label: 'notspam'},
    {text:'Birthday party next weekend', label: 'notspam'},
    {text: 'Drinks on Monday?', label: 'notspam'}
];

const testData = [
    {text: 'Drugs for cheap', label: 'spam'},
    {text: 'Next deadline due Monday', label: 'notspam'},
    {text: 'Meet me at home?', label: 'notspam'},
    {text: 'Hang out with someone near you', label: 'spam'}
];

trainingData.forEach(datum => {
	classifier.addDocument(datum.text, datum.label);
});

classifier.train();

testData.forEach(datum => {
	let guess = classifier.classify(datum.text);
	console.log(datum.text, " - Guess:", guess);
	console.log(classifier.getClassifications(datum.text));
});




