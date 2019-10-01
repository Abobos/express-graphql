// #Find the missing letter

// Write a method that takes an array of consecutive (increasing) letters as input and that returns the missing letter in the array.

// You will always get an valid array. And it will be always exactly one letter be missing. The length of the array will always be at least 2.
// The array will always contain letters in only one case.

// Example:

// ['a','b','c','d','f'] -> 'e' ['O','Q','R','S'] -> 'P'

// ["a","b","c","d","f"] -> "e"
// ["O","Q","R","S"] -> "P"
// (Use the English alphabet with 26 letters!)

// Have fun coding it and please don't forget to vote and rank this kata! :-)

// I have also created other katas. Take a look if you enjoyed this kata!

function findMissingLetter(array) {
  let alphabets = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];

  if (/[A-Z]/.test(array[0]))
    alphabets = alphabets.map(alphabet => alphabet.toUpperCase());

  const firstAlphabet = array[0];
  const lastAlphabet = array[array.length - 1];

  const startingPositon = alphabets.indexOf(firstAlphabet);
  const lastPositon = alphabets.indexOf(lastAlphabet);

  let missingLetter = "";
  let j = 0;

  for (let i = startingPositon; i < lastPositon; i++) {
    if (alphabets[i] !== array[j]) {
      missingLetter = alphabets[i];
      break;
    }
    ++j;
  }
  return missingLetter;
}

// Your website is divided vertically in sections, and each can be of different size (height).
// You need to establish the section index (starting at 0) you are at, given the scrollY and sizes of all sections.
// Sections start with 0, so if first section is 200 high, it takes 0-199 "pixels" and second starts at 200.

// Example:
// getSectionIdFromScroll( 300, [300,200,400,600,100] )

// will output number 1 as it's the second section.

// getSectionIdFromScroll( 1600, [300,200,400,600,100] )

// will output number -1 as it's past last section.

// Given the scrollY integer (always non-negative) and an array of non-negative integers (with at least one element), calculate the index (starting at 0) or -1 if scrollY falls beyond last section (indication of an error).

// return an index of section or -1 if past last section
// scrollY is a positive integer and sizes is an array of positive integers

function getSectionIdFromScroll(scrollY, sizes) {

  
}
