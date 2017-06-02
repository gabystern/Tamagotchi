class Pet{

	constructor(petObject){
		this.id = petObject.id
		this.name = petObject.name
		this.image = petObject.image
		this.happiness = petObject.happiness
		this.intelligence = petObject.intelligence
		this.hunger = petObject.hunger
		this.sleepiness = petObject.sleepiness
		this.setting_id = petObject.setting_id
		this.setting = petObject.setting
		this.toys = petObject.toys
	}

	render(){
		let html = `
		<div class="show-pet">${this.showPetImage()} </div>
    <div class="show-pet-name">${this.showPetName()}</div>
    <center><div class="show-interact" id="${this.id}">${this.petEat()} ${this.petSleep()} ${this.petRead()} ${this.playGames()} </div></center>
    <div class="show-status" text-align="center">
      <ul></ul>
    </div>
		<center>Happiness Level : ${this.happiness} <br> <div class="progress"><div class="progress-bar happiness" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div> </div> <br></center>
		<center>Hunger Level : ${this.hunger} <br> <div class="progress"><div class="progress-bar hunger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div> </div> <br></center>
		<center>Intelligence Level : ${this.intelligence} <br> <div class="progress"><div class="progress-bar intelligence" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div> </div> <br></center>
		<center>Sleepiness Level: ${this.sleepiness} <br> <div class="progress"><div class="progress-bar sleepiness" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div> </div> <br></center>
		`
		return html
	}

	updateStats(){
		$('.progress-bar.happiness').css("width", ((`${this.happiness}`)*5)+"%");
		$('.progress-bar.hunger').css("width", ((`${this.hunger}`)*5)+"%");
		$('.progress-bar.intelligence').css("width", ((`${this.intelligence}`)*5)+"%");
		$('.progress-bar.sleepiness').css("width", ((`${this.sleepiness}`)*5)+"%");
		$("#pet").html(this.showPetBackground())
	}

	showPetImage(){
		return `<center><img src='${this.image}'></center>`
	}

	showPetName(){
		return `<center><h3>${this.name}<h3></center>`
	}

	showPetBackground(){
		$(".show-pet").css('backgroundImage', `url(${this.setting.image})`)
	}

	petEat(){
		return "<button type='submit' id='eat-button' value='Eat'><img src='http://www.i2clipart.com/cliparts/5/a/8/f/clipart-burger-5a8f.png'></button>"
	}

	petSleep(){
		return "<button type='submit' id='sleep-button' value='Sleep'><img src='https://cdn4.iconfinder.com/data/icons/emojis-flat-pixel-perfect/64/emoji-41-128.png'></button>"
	}

	petRead(){
		return "<button type='submit' id='read-button' value='Read'><img src='https://cdn0.iconfinder.com/data/icons/education-15/500/reader-128.png'></button>"
	}

	playRubiks(){
		for (var i = 0; i<this.toys.length; i++){
			if (this.toys[i].id === 1){
				return true
			}
		}
	}

		playJumpRope(){
			for (var i = 0; i<this.toys.length; i++){
				if (this.toys[i].id === 2){
					return true
				}
			}
		}

		playFidgetSpinner(){
			for (var i = 0; i<this.toys.length; i++){
				if (this.toys[i].id === 3){
					return true
				}
			}
		}


	playGames(){
		for (var i = 0; i<this.toys.length; i++){
			if (this.playRubiks()){
				return "<button type='submit' id='rubiks-cube-button' value='Rubik's Cube'><img src='https://cdn0.iconfinder.com/data/icons/rubik-s-cube-color/128/rubiks-cube-128.png'></button>"
			} else if (this.playJumpRope()){
				return "<button type='submit' id='jump-rope-button' value='Jump Rope'><img src='https://cdn2.iconfinder.com/data/icons/sports-fitness-line-vol-3/52/Skipping__jump__jumprope__childskipping__womanskipping__youngskipping__rope-128.png'></button>"
			} else if (this.playFidgetSpinner()){
				return "<button type='submit' id='fidget-spinner-button' value='Fidget Spinner'><img src='https://cdn4.iconfinder.com/data/icons/fidget-spinner-toy-1/100/spinner_fidget_toy-03-128.png'></button>"
			} else if (!this.playJumpRope()){
				return ""
			} else if (!this.playRubiks()){
				return ""
			} else if (!this.playFidgetSpinner()){
				return ""
			}
		}
	}

	dead(){
		return '<center><h1>Thanks for Nothing</h1><br><img src="https://68.media.tumblr.com/bd172c9b6928e5b148be37d5a13e739a/tumblr_o21bscL3FW1uf5cjoo1_400.gif"></center><input type="submit" id="play-button" value="Play Again"/>'
	}

}
