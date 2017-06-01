
$(document).ready(function() {

	fetchToys()
	fetchSettings()
	imageClick()
	submitPet()

})


function imageClick(){
	let image = ""
	$(".img-check").click(function(){
		$('.img-check').not(this).removeClass('picked');
		$(this).toggleClass("picked");
	})
}


function submitPet(){

	$('#new-pet').submit(function(event){
	event.preventDefault()
	let name = $('#name').val()
	let setting_id = $('#setting-picked :selected').val();
	let image = $('.img-check.picked')[0].src
	let toys = $('#toy-picked :checked')
	let alltoys = []
	for (var i = 0; i<toys.length; i++){
    alltoys.push(toys[i].value)
	}
	let api = new Api()
	api.createPet(name, setting_id, image, toys, alltoys)
  })
}


function startTimer(pet){
	let api = new Api()
	api.timePet(pet)
}



function itsDead(pet){
	if (pet.happiness < 0 || pet.happiness > 21 || pet.hunger < 0 ||pet.hunger > 21 || pet.sleepiness < 0 || pet.sleepiness > 21 || pet.intelligence < 0 || pet.intelligence > 21){
		alert("Your pet died")
		debugger
		renderDead()
		return true
	}

}

function renderDead(){
	$('.container').html('<center><h1>Thanks for Nothing</h1><br><img src="https://68.media.tumblr.com/bd172c9b6928e5b148be37d5a13e739a/tumblr_o21bscL3FW1uf5cjoo1_400.gif"></center><input type="submit" id="play-button" value="Play Again"/>')
	$('#play-button').click(function(event){
		event.preventDefault()
		window.location.reload(true)

	})
}


function fetchToys(){
	let api = new Api()
	api.renderToys()
	
}

function fetchSettings(){
	let api = new Api()
	api.renderSettings()
}


function showDetails(pet){
	showPet(pet)
	petEat(pet)
	petSleep(pet)
	petPlay(pet)
	petRead(pet)
}

function showPet(pet){
	$('.show-pet').append(`<img src=${pet.image}><br><h3>${pet.name}</h3>`)
	$('.show-pet').append(`<img src=${pet.setting.image}>`)
}


function petEat(pet){
	$('.show-interact').append("<button type='submit' id='eat-button' value='Eat'><img src='http://www.i2clipart.com/cliparts/5/a/8/f/clipart-burger-5a8f.png'></button>")
	$('#eat-button').click(function(event){
		event.preventDefault()
		let api = new Api()
		api.feedPet(pet)
	})
}

function petSleep(pet){
	$('.show-interact').append("<button type='submit' id='sleep-button' value='Sleep'><img src='https://cdn4.iconfinder.com/data/icons/emojis-flat-pixel-perfect/64/emoji-41-128.png'></button>")

	$('#sleep-button').click(function(event){
		event.preventDefault()
		let api = new Api()
		api.bedtimePet(pet)
	})
}

function addRubiksBtn(pet){
	$('.show-interact').append("<button type='submit' id='rubiks-cube-button' value='Rubik's Cube'><img src='https://cdn0.iconfinder.com/data/icons/rubik-s-cube-color/128/rubiks-cube-128.png'></button>")
	$('#rubiks-cube-button').click(function(event){
		event.preventDefault()
		let api = new Api()
		api.playRubiks(pet)
	})
}	


function petRead(pet){
	$('.show-interact').append("<button type='submit' id='read-button' value='Read'><img src='https://cdn0.iconfinder.com/data/icons/education-15/500/reader-128.png'></button>")
	$('#read-button').click(function(event){
		event.preventDefault()
		let api = new Api()
		api.readBook(pet)
	})
}


function addJumpRopeBtn(pet){
$('.show-interact').append("<button type='submit' id='jump-rope-button' value='Jump Rope'><img src='https://cdn2.iconfinder.com/data/icons/sports-fitness-line-vol-3/52/Skipping__jump__jumprope__childskipping__womanskipping__youngskipping__rope-128.png'></button>")
$('#jump-rope-button').click(function(event){
		event.preventDefault()
		let api = new Api()
		api.jumpRope(pet)
	})
}


function addFidgetSpinBtn(pet){
	$('.show-interact').append("<button type='submit' id='fidget-spinner-button' value='Fidget Spinner'><img src='https://cdn4.iconfinder.com/data/icons/fidget-spinner-toy-1/100/spinner_fidget_toy-03-128.png'></button>")
	$('#fidget-spinner-button').click(function(event){
		event.preventDefault()
		let api = new Api()
		api.spinFidget(pet)
	})
}


function petPlay(pet){
	for (var i = 0; i<pet.toys.length; i++){
		if (pet.toys[i].id === 1){
			addRubiksBtn(pet)
		} else if (pet.toys[i].id === 2){
			addJumpRopeBtn(pet)
		} else if (pet.toys[i].id === 3) {
			addFidgetSpinBtn(pet)

		}
	}
	updateStats(pet)
	$('.show-pet').css('backgroundImage',`url(${pet.setting.image})`)
	$('.show-pet').html(`<center><img src=${pet.image}></center>`)
	$('.show-pet-name').html(`<h3><center>${pet.name}</center></h3>`)
}



function updateStats(pet){
	let happiness = `<center>Happiness Level : ${pet.happiness} <br> <div class="progress"><div class="progress-bar happiness" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div> </div> <br></center>`
	let hunger = `<center>Hunger Level : ${pet.hunger} <br> <div class="progress"><div class="progress-bar hunger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div> </div> <br></center>`
	let intelligence = `<center>Intelligence Level : ${pet.intelligence} <br> <div class="progress"><div class="progress-bar intelligence" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div> </div> <br></center>`
	let sleepiness = `<center>Sleepiness Level: ${pet.sleepiness} <br> <div class="progress"><div class="progress-bar sleepiness" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div> </div> <br></center>`
	let stats = [happiness, hunger, intelligence, sleepiness].join(' ')
	$('.show-status').html(stats)
	$('.progress-bar.happiness').css("width", ((`${pet.happiness}`)*5)+"%");
	$('.progress-bar.hunger').css("width", ((`${pet.hunger}`)*5)+"%");
	$('.progress-bar.intelligence').css("width", ((`${pet.intelligence}`)*5)+"%");
	$('.progress-bar.sleepiness').css("width", ((`${pet.sleepiness}`)*5)+"%");

}
