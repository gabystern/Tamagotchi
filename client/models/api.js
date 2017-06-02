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
			console.log('stop')
			$('#new-pet').hide()
			$('.jumbotron').hide()
			// let mypet = new Pet(data)
			startTimer(data)
			let pet = new Pet(data)
			$("#pet").html(pet.render())
			$("#pet").html(pet.showPetBackground())
			}
		})
	}


	timePet(pet){
		let counter = 0
		let timer = setInterval(function(){
		counter += 1
		$.ajax({
			type: 'PATCH',
			async: "false",
			url: `http://localhost:3000/api/v1/pets/${pet.id}/decrement`,
			success: function(data){
				console.log('its going donw')
				let pet = new Pet(data)
				$("#pet").html(pet.render())
				pet.updateStats()
				if (itsDead(pet)){

					clearInterval(timer)
					}
				}
			})
		}, 1000)

	}


	// access pet with ID - pass it the counter


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


	feedPet(id){
		debugger
		$.ajax({
		  type: 'PATCH',
		  url: `http://localhost:3000/api/v1/pets/${id}/feed`,
		  success: function(data){
				console.log(`Pet has a hunger level of ${data.hunger}`)
				let pet = new Pet(data)
				$("#pet").html(pet.render())
				pet.updateStats()
		  	}
		})
	}


	bedtimePet(id){
		$.ajax({
			type: 'PATCH',
			url: `http://localhost:3000/api/v1/pets/${id}/sleep`,
			success: function(data){
				console.log(`Pet has a sleepiness level of ${data.sleepiness}`)
				let pet = new Pet(data)
				$("#pet").html(pet.render())
				pet.updateStats()
			}
		})
	}

	playRubiks(id){
		$.ajax({
			type: 'PATCH',
			url: `http://localhost:3000/api/v1/pets/${id}/rubiks`,
			success: function(data){
				debugger
				console.log('they played with a rubiks cube')
				let pet = new Pet(data)
				$("#pet").html(pet.render())
				pet.updateStats()
			}
		})
	}

	readBook(id){
		$.ajax({
			type: 'PATCH',
			url: `http://localhost:3000/api/v1/pets/${id}/read`,
			success: function(data){
				console.log(`Pet has an intelligence level of ${data.intelligence}`)
				let pet = new Pet(data)
				$("#pet").html(pet.render())
				pet.updateStats()
			}
		})
	}

	jumpRope(id){
		$.ajax({
			type: 'PATCH',
			url: `http://localhost:3000/api/v1/pets/${id}/jumprope`,
			success: function(data){
				console.log('they played with a jump rope')
				let pet = new Pet(data)
				$("#pet").html(pet.render())
				pet.updateStats()
			}
		})
	}

	spinFidget(id){
		$.ajax({
			type: 'PATCH',
			url: `http://localhost:3000/api/v1/pets/${id}/fidgetspinner`,
			success: function(data){
				console.log('they played with a fidget spinner')
				let pet = new Pet(data)
				$("#pet").html(pet.render())
				pet.updateStats()
			}
		})
	}



}
