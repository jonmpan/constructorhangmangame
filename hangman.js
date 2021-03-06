var fs = require('fs');
var inquirer = require('inquirer');
var asciify = require('asciify-image');
var options = {
	fit:    'box',
	width:  '100%',
	height: '100%'
}
var {Word} = require('./Word.js');
// var {kirbyGo} = require('./kirbyGo');
var guess = '';
var guesses = [];
var kirbyCount = 0;

// var youWinPic = ()=>{
// 	asciify('./yourewinner.jpg', options)
// 		.then(function (asciified) {
// 			console.log(asciified);
// 			var myVar = setTimeout(function(){
// 				console.log('The answer was: '+word.word);
// 				playAgain('win')},500);
// 		})
// 		.catch(function (err) {
// 			console.error(err);
// 	});
// }

// var youLosePic = ()=>{
// 	asciify('./gameover.jpg', options)
// 		.then(function (asciified) {
// 			console.log(asciified);
// 			var myVar = setTimeout(function(){
// 				console.log('The answer was: '+word.word);
// 				playAgain('lose')},500);
// 			})
// 		.catch(function (err) {
// 			console.error(err);
// 	});
// }

var youWinPic = ()=>{
	var myVar = setTimeout(function(){
		console.log(yourewinner);
		console.log('The answer was: '+word.word);
		playAgain('win')},500);
}

var youLosePic = ()=>{
	var myVar = setTimeout(function(){
		console.log(gameover);
		console.log('The answer was: '+word.word);
		playAgain('lose')},750);
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

var playAgain = (state)=>{
	// if(state === 'lose'){
	// console.log('The answer was: '+word.word);
	// }
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
	else if(word.score === word.letterCount && kirbyCount<2){
		console.log('You Win!');
		kirbyCount++;
		// animated();
		youWinPic();
	}
	else if(word.score === word.letterCount && kirbyCount>1){
		animated();
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

var asciify = require('asciify-image');
var animateThis = [];

//Try to use a promise on this to do the next thing instead of setTimeout delay
var animated = ()=>{
	timer = 0;
	delay = animateThis.length*100+1000;
	for (i = 0; i < animateThis.length; ++i) {
		setDelay(i);
	}
	function setDelay(i) {
		setTimeout(function(){
			process.stdout.write('\x1B[2J\x1B[0f');
			// console.log('GET READY TO HANGMAN!!!!');
			console.log(animateThis[i]);
		}, timer);
		timer += 100;
	}
	setTimeout(playAgain, delay);
}

var kirbyOptions = {
  fit:    'box',
  width:  '100%',
  height: '100%'
}

var kirbyGo = ()=>{
asciify('./kirbydance/1.png', kirbyOptions)
  .then(function (asciified) {
     var temp = asciified;
  })
  .then(()=>{
    asciify('./kirbydance/1.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
    }).then(()=>{
      asciify('./kirbydance/2.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
    }).then(()=>{
      asciify('./kirbydance/3.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
    }).then(()=>{
      asciify('./kirbydance/4.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/5.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/6.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/7.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/8.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/9.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/10.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/11.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/12.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/13.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/14.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/15.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/16.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/17.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/18.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/19.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/20.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/21.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/22.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/23.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/24.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/25.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/26.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/27.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/28.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/29.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/30.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/31.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/32.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/33.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/34.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./kirbydance/35.png', kirbyOptions)
      .then(function (asciified) {
         animateThis.push(asciified);
      }).then(()=>{
      asciify('./yourewinner.jpg', options)
      .then(function (asciified) {
         yourewinner = asciified;
      }).then(()=>{
      asciify('./gameover.jpg', options)
      .then(function (asciified) {
         gameover = asciified;
      }).then(()=>{
        chooseWord();
      })
    })
  })
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
}

var gameStart = ()=>{
	console.log('loading...');
	kirbyGo();
}

gameStart();

var setGuess = ()=>{
	guesses.push(guess);
	guessesDisplay = guesses.join(' ');
	word.guess(guess, guessesDisplay);
	checkGame();
}

// chooseWord();

module.exports = {
	chooseWord:chooseWord
};