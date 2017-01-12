"use strict";

const natural = require("natural");

// Comparing string distance
const string1 = "cook";
const string2 = "cookie";
const string3 = "narwhal";

// Jaro Winkler
// outputs level of similarity from 0 to 1
// measures how many characters strings have in common
// weights characters at beginning more heavily
// best for short words, names, and deleting duplicates
let distance1 = natural.JaroWinklerDistance(string1, string2); // 0.93
let distance2 = natural.JaroWinklerDistance(string2, string3); // 0

console.log(distance1, distance2);

// Levenshtein
// minimum edits needed to turn one string into another
let distance3 = natural.LevenshteinDistance(string1, string2); // 2
let distance4 = natural.LevenshteinDistance(string2, string3); // 7

console.log(distance3, distance4);

// Dice Coefficient
// bigrams in common divided by total bigrams in the two strings
let distance5 = natural.DiceCoefficient(string1, string2); // 0.75
let distance6 = natural.DiceCoefficient(string2, string3); // 0

console.log(distance5, distance6);



