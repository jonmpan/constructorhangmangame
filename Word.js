var {Letter} = require('./Letter.js');

function Word(query){
	this.word = query;
	this.lettersArray = [];
	this.letterCount = 0;
	this.checkCounter = 0;
	this.score = 0;
	this.lives = 6;
	this.display = '';

	this.setLetters = ()=>{
		var tempArray = this.word.split('');
		for (var i = 0; i<tempArray.length; i++){
			var letter = new Letter(tempArray[i]);
			this.lettersArray.push(letter);
			if(tempArray[i] !== ' '){
				this.letterCount++;
			}
		};
	};

	this.checkLetters = (guess)=>{
		this.score = 0;
		this.checkCounter = 0;
		for(var i = 0; i < word.lettersArray.length; i++){
			word.lettersArray[i].check(guess);
			if(word.lettersArray[i].show){
				this.score++;
			}
			if(word.lettersArray[i].letter != ' ' && guess != word.lettersArray[i].letter.toLowerCase()){
				this.checkCounter++;
			};
		};
	};

	this.updateDisplayText = ()=>{
		this.displayText = '';
		for(var i =0; i<this.lettersArray.length; i++){
			if(this.lettersArray[i].show && this.lettersArray[i].letter != ' '){
				this.displayText += this.lettersArray[i].letter+' ';
			}
			else if(!this.lettersArray[i].show && this.lettersArray[i].letter != ' '){
				this.displayText += '_ ';
			}
			else{
				this.displayText += '  ';
			}
		}
	};

	this.updateGame = (guesses)=>{
		if(this.checkCounter === this.letterCount){
			this.lives--;
		}
	}

	this.updateDisplay = (guesses, custom)=>{
		process.stdout.write('\033c');
		console.log('');
		console.log(this.displayText);
		console.log('');
		if(custom){
			console.log(custom);
		}
		else{
			if(this.checkCounter === this.letterCount){
				console.log('Incorrect!');
			}
			else{
				console.log('Go Go Go!');
			}
		}
		console.log('Lives: '+this.lives);
		console.log('Guesses: '+guesses);
	}
	this.guess = (guess, guesses)=>{
		this.checkLetters(guess);
		this.updateDisplayText();
		this.updateGame(guesses);
		this.updateDisplay(guesses);
	};
};

module.exports = {
	Word:Word
};