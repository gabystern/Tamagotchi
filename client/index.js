
$(document).ready(function() {

	fetchToys()
	fetchSettings()
	imageClick()
	submitPet()

})


function imageClick(){
	let image = ""
	$(".img-check").click(function(){
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
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/api/v1/pets',
		data: {pet:{name: `${name}`,
		setting_id: `${setting_id}`,
		image: `${image}`,
		happiness: 10,
		sleepiness: 10,
		intelligence: 10,
		hunger: 10,
		toy_ids: alltoys
		}}
		,
		success: function(data){
			$('#new-pet').hide()
			startTimer(data)
			showDetails(data)

		}
	})
  })
}


function startTimer(pet){
	let timer = setInterval(function(){
		$.ajax({
			type: 'PATCH',
			async: "false",
			url: `http://localhost:3000/api/v1/pets/${pet.id}/decrement`,
			success: function(data){
				console.log('its going donw')
				updateStats(data)
				if (itsDead(data)){
					clearInterval(timer)
				}
			}
		})
	}, 1000)
}



function itsDead(pet){
	if (pet.happiness < 0 || pet.happiness > 20 || pet.hunger < 0 ||pet.hunger > 20 || pet.sleepiness < 0 || pet.sleepiness > 20 || pet.intelligence < 0 || pet.intelligence > 20){
		alert("Your pet died")
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
	$.ajax({
		url:'http://localhost:3000/api/v1/toys',
		success: function(data){
			let toyNames = data.map(function(toy){
				let name = toy.name
				let id = toy.id
				let checkbox = `<input type="checkbox" name="toy" value="${toy.id}" ><label> ${name} </label> `
				$('.toys').append(checkbox)
			})
		}
	})
}

function fetchSettings(){
	$.ajax({
		url:'http://localhost:3000/api/v1/settings',
		success: function(data){
			let settings = data.map(function(setting){
				let location = setting.location
				let id = setting.id
				let selectbox = `<option value=${id} id="setting${id}" name="setting_id" > ${location} </option> `
				$('.settings select').append(selectbox)
			})
		}
	})



}


function showDetails(pet){
	$('.show-pet').append(`<img src=${pet.image}><br><h3>${pet.name}</h3>`)
	$('.show-pet').append(`<img src=${pet.setting.image}>`)

	petEat(pet)
	petSleep(pet)
	petPlay(pet)
	petRead(pet)
}

function petEat(pet){
	// $('.show-interact').append(`<input type="submit" id="eat-button" value="Eat"/>`)
	$('.show-interact').append("<button type='submit' id='eat-button' value='Eat'><img src='http://www.i2clipart.com/cliparts/5/a/8/f/clipart-burger-5a8f.png'></button>")
	$('#eat-button').click(function(event){
		event.preventDefault()
		$.ajax({
		  type: 'PATCH',
		  url: `http://localhost:3000/api/v1/pets/${pet.id}/feed`,
		  success: function(pet){
				console.log(`Pet has a hunger level of ${pet.hunger}`)
				updateStats(pet)
		  }
		})
	})
}

function petSleep(pet){
	$('.show-interact').append("<button type='submit' id='sleep-button' value='Sleep'><img src='https://cdn4.iconfinder.com/data/icons/emojis-flat-pixel-perfect/64/emoji-41-128.png'></button>")

	$('#sleep-button').click(function(event){
		event.preventDefault()
		$.ajax({
			type: 'PATCH',
			url: `http://localhost:3000/api/v1/pets/${pet.id}/sleep`,
			success: function(pet){
				console.log(`Pet has a sleepiness level of ${pet.sleepiness}`)
				updateStats(pet)
			}
		})
	})
}

function petRead(pet){
	$('.show-interact').append("<button type='submit' id='read-button' value='Read'><img src='https://cdn0.iconfinder.com/data/icons/education-15/500/reader-128.png'></button>")
	$('#read-button').click(function(event){
		event.preventDefault()
		$.ajax({
			type: 'PATCH',
			url: `http://localhost:3000/api/v1/pets/${pet.id}/read`,
			success: function(pet){
				console.log(`Pet has an intelligence level of ${pet.intelligence}`)
				updateStats(pet)
			}
		})
	})

}

function petPlay(pet){
	for (var i = 0; i<pet.toys.length; i++){
	if (pet.toys[i].id === 1){
		$('.show-interact').append("<button type='submit' id='rubiks-cube-button' value='Rubik's Cube'><img src='https://cdn0.iconfinder.com/data/icons/rubik-s-cube-color/128/rubiks-cube-128.png'></button>")
		$('#rubiks-cube-button').click(function(event){
			event.preventDefault()
			$.ajax({
				type: 'PATCH',
				url: `http://localhost:3000/api/v1/pets/${pet.id}/rubiks`,
				success: function(pet){
					updateStats(pet)
				}
			})
		})
	} else if (pet.toys[i].id === 2){
		$('.show-interact').append("<button type='submit' id='jump-rope-button' value='Jump Rope'><img src='https://cdn2.iconfinder.com/data/icons/sports-fitness-line-vol-3/52/Skipping__jump__jumprope__childskipping__womanskipping__youngskipping__rope-128.png'></button>")

		$('#jump-rope-button').click(function(event){
			event.preventDefault()
			$.ajax({
				type: 'PATCH',
				url: `http://localhost:3000/api/v1/pets/${pet.id}/jumprope`,
				success: function(pet){
					updateStats(pet)
				}
			})
		})
	} else if (pet.toys[i].id === 3) {
		$('.show-interact').append("<button type='submit' id='fidget-spinner-button' value='Fidget Spinner'><img src='https://cdn4.iconfinder.com/data/icons/fidget-spinner-toy-1/100/spinner_fidget_toy-03-128.png'></button>")
		$('#fidget-spinner-button').click(function(event){
			event.preventDefault()
			$.ajax({
				type: 'PATCH',
				url: `http://localhost:3000/api/v1/pets/${pet.id}/fidgetspinner`,
				success: function(pet){
					updateStats(pet)

				}
			})
		})
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
