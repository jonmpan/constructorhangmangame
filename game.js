var fs = require('fs');
var inquirer = require('inquirer');
var {Word} = require('./Word.js');
var guess = '';
var guesses = [];
// var guessesDisplay = guesses.join(' ');

var chooseWord = ()=>{
	fs.readFile('words.txt', 'utf8', (err, data)=>{
		guess = '';
		guesses = [];
		guessesDisplay = '';
		var wordsArray = data.split(',');
		var random = Math.floor((Math.random()*wordsArray.length));
		word = new Word(wordsArray[random]);
		// console.log('word: '+word.word);
		word.setLetters();
		word.updateDisplayText();
		word.updateDisplay('');
		checkGame();
	})
}

function allLetter(inputtxt){
	var letters = /^[A-Za-z]+$/;
	if(inputtxt.match(letters)){
		return true;
	}
	else{
		return false;
	}
}

var playAgain = ()=>{
	inquirer.prompt([
	{
		type: 'list',
		choices: ['Yes', 'No'],
		name: 'choice',
		message: 'Play again?'
	}
	]).then((response)=>{
		if(response.choice === 'Yes'){
			chooseWord();
		}
		else{
			console.log('Thanks for playing!');
		}
	})
}

var checkGame = ()=>{
	if(word.lives === 0){
		console.log('You Lose!');
		playAgain();
	}
	else if(word.score === word.letterCount){
		console.log('You Win!');
		playAgain();
	}
	else{
		inquireGuess();
	}
}

var inquireGuess = ()=>{
	inquirer.prompt([
	{
		type: 'input',
		name: 'guess',
		message: 'Guess a letter!'
	}
	]).then((response)=>{
		guess = response.guess.toLowerCase();
		alreadyGuessed = false;
		notValid = false;
		if(allLetter(guess) && guess.length === 1){
			if(guesses.length>0){
				guesses.forEach((data)=>{
					if(guess === data){
						alreadyGuessed = true;
						// console.log('Already Guessed!');
					}
				});
			}
		}
		else{
			notValid = true;
			// console.log('Please input a single letter!');
		}
		if(!alreadyGuessed && !notValid){
			setGuess();
		}
		else{
			var custom = 'Please input a single unguessed letter!';
			word.updateDisplayText();
			word.updateDisplay(guessesDisplay, custom);
			checkGame();
		}
	})
}

var setGuess = ()=>{
	guesses.push(guess);
	guessesDisplay = guesses.join(' ');
	word.guess(guess, guessesDisplay);
	checkGame();
}

chooseWord();