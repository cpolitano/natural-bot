"use strict";
const natural = require("natural");

natural.BayesClassifier.load("classifier.json", null, (err, classifier) => {
	if (err) {
		console.log(err);
	}
	else {
		let testSentence = "These violent delights have violent ends. And in their triumph die, like fire and powder, Which, as they kiss, consume.";
		console.log(classifier.classify(testSentence));
	}
});

