class Api{

	createPet(name, setting_id, image, toys, alltoys){
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
	}


	timePet(pet){
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


	renderToys(){
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

	renderSettings(){
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


	feedPet(pet){
		$.ajax({
		  type: 'PATCH',
		  url: `http://localhost:3000/api/v1/pets/${pet.id}/feed`,
		  success: function(pet){
				console.log(`Pet has a hunger level of ${pet.hunger}`)
				updateStats(pet)
		  	}
		})
	}


	bedtimePet(pet){
		$.ajax({
			type: 'PATCH',
			url: `http://localhost:3000/api/v1/pets/${pet.id}/sleep`,
			success: function(pet){
				console.log(`Pet has a sleepiness level of ${pet.sleepiness}`)
				updateStats(pet)
			}
		})
	}

	playRubiks(pet){
		$.ajax({
			type: 'PATCH',
			url: `http://localhost:3000/api/v1/pets/${pet.id}/rubiks`,
			success: function(pet){
				console.log('they played with a rubiks cube')
			}
		})
	}

	readBook(pet){
		$.ajax({
			type: 'PATCH',
			url: `http://localhost:3000/api/v1/pets/${pet.id}/read`,
			success: function(pet){
				console.log(`Pet has an intelligence level of ${pet.intelligence}`)
				updateStats(pet)
			}
		})
	}

	jumpRope(pet){
		$.ajax({
			type: 'PATCH',
			url: `http://localhost:3000/api/v1/pets/${pet.id}/jumprope`,
			success: function(pet){
				console.log('they played with a jump rope')
				updateStats(pet)
			}
		})
	}

	spinFidget(pet){
		$.ajax({
			type: 'PATCH',
			url: `http://localhost:3000/api/v1/pets/${pet.id}/fidgetspinner`,
			success: function(pet){
				console.log('they played with a fidget spinner')
				updateStats(pet)
			}
		})
	}



}
