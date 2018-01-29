var fs = require('fs');
var inquirer = require('inquirer');
var asciify = require('asciify-image');
var {Word} = require('./Word.js');
var guess = '';
var guesses = [];

var options = {
	fit:    'box',
	width:  '100%',
	height: '100%'
}

var youWinPic = ()=>{
	asciify('./yourewinner.jpg', options)
		.then(function (asciified) {
			console.log(asciified);
			var myVar = setTimeout(playAgain,1500);
		})
	.catch(function (err) {
		console.error(err);
	});
}

var youLosePic = ()=>{
	asciify('./gameover.jpg', options)
		.then(function (asciified) {
		console.log(asciified);
		var myVar = setTimeout(playAgain,1500);
		})
	.catch(function (err) {
		console.error(err);
	});
}

var chooseWord = ()=>{
	fs.readFile('words.txt', 'utf8', (err, data)=>{
		guess = '';
		guesses = [];
		guessesDisplay = '';
		var wordsArray = data.split(',');
		var random = Math.floor((Math.random()*wordsArray.length));
		word = new Word(wordsArray[random]);
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
		type: 'input',
		name: 'choice',
		message: 'Play again?(y/n)'
	}
	]).then((response)=>{
		if(response.choice === 'y' || response.choice === 'Y'){
			chooseWord();
		}
		else if(response.choice === 'n' || response.choice === 'N'){
			console.log('Thanks for playing!');
		}
		else{
			playAgain();
		}
	})
}


var checkGame = ()=>{
	if(word.lives === 0){
		console.log('You Lose!');
		youLosePic();
	}
	else if(word.score === word.letterCount){
		console.log('You Win!');
		youWinPic();
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
					}
				});
			}
		}
		else{
			notValid = true;
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