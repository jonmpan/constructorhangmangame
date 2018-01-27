function Letter(a){
	this.letter = a;
	this.show = false;
	this.check = (query)=>{
		var letterLower = this.letter.toLowerCase();
		if(letterLower === query){
			this.show = true;
		}
	};
}

module.exports = {Letter:Letter}