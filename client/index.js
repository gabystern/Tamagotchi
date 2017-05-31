
$(document).ready(function() {
	fetchToys()
	fetchSettings()

	let image = ""
	$(".img-check").click(function(){
		$(this).toggleClass("picked");
	})

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
				let id = data.id
				// $('#new-pet').reset()
				$('#new-pet').hide()
				showDetails(data)
			}
		})
	})
})

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

// function renderShowStatus(pet){
// 	let happiness = `<li> ${pet.happiness}</li>`
// 	$('.show-status').html(happiness)
// }

function showDetails(pet){

	// debugger
	console.log(pet.id)
	$('.show-pet').append(`<img src=${pet.image}><br><h3>${pet.name}</h3>`)
	$('.show-pet').append(`<img src=${pet.setting.image}>`)

	petEat(pet)
	petSleep(pet)
	petPlay(pet)
}

function petEat(pet){
	$('.show-interact').append(`<input type="submit" id="eat-button" value="Eat"/>`)
	$('#eat-button').click(function(event){
		event.preventDefault()
		$.ajax({
		  type: 'PATCH',
		  url: `http://localhost:3000/api/v1/pets/${pet.id}/feed`,
		  success: function(data){
				console.log(`Pet has a hunger level of ${data.hunger}`)
		  }
		})
	})
}

function petSleep(pet){
	$('.show-interact').append(`<input type="submit" id="sleep-button" value="Sleep"/>`)
	$('#sleep-button').click(function(event){
		event.preventDefault()
		$.ajax({
			type: 'PATCH',
			url: `http://localhost:3000/api/v1/pets/${pet.id}/sleep`,
			success: function(data){
				console.log(`Pet has a sleepiness level of ${data.sleepiness}`)
			}
		})
	})
}

function petPlay(pet){
	for (var i = 0; i<pet.toys.length; i++){
	if (pet.toys[i].id === 1){
		$('.show-interact').append(`<input type="submit" id="rubiks-cube-button" value="Play Rubik's Cube"/>`)
		$('#rubiks-cube-button').click(function(event){
			event.preventDefault()
			$.ajax({
				type: 'PATCH',
				url: `http://localhost:3000/api/v1/pets/${pet.id}/rubiks`,
				success: function(pet){
					console.log('they played with a rubiks cube')
				}
			})
		})
	} else if (pet.toys[i].id === 2){
		$('.show-interact').append(`<input type="submit" id="jump-rope-button" value="Play Jump Rope"/>`)
		$('#jump-rope-button').click(function(event){
			event.preventDefault()
			$.ajax({
				type: 'PATCH',
				url: `http://localhost:3000/api/v1/pets/${pet.id}/jumprope`,
				success: function(pet){
					console.log('they played with a jump rope')
				}
			})
		})
	} else if (pet.toys[i].id === 3) {
		$('.show-interact').append(`<input type="submit" id="fidget-spinner-button" value="Play Figet Spinner"/>`)
		$('#fidget-spinner-button').click(function(event){
			event.preventDefault()
			$.ajax({
				type: 'PATCH',
				url: `http://localhost:3000/api/v1/pets/${pet.id}/fidgetspinner`,
				success: function(pet){
					console.log('they played with a fidget spinner')
				}
			})
		})
	}
	}

	let happiness = `<li>Happiness Level : ${pet.happiness}</li>`
	let hunger = `<li>Hunger Level : ${pet.hunger}</li>`
	let intelligence = `<li>Intelligence Level : ${pet.intelligence}</li>`
	let sleepiness = `<li>Sleepiness Level: ${pet.sleepiness}</li>`
	$('.show-status').append(happiness, intelligence, hunger, sleepiness) 
	$('.show-pet').css('backgroundImage',`url(${pet.setting.image})`)
	$('.show-pet').html(`<center><img src=${pet.image}></center>`)
	$('.show-pet-name').html(`<h3><center>${pet.name}</center></h3>`)

}
