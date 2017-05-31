
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
	let happiness = `<li>Happiness Level : ${pet.happiness}</li>`
	let hunger = `<li>Hunger Level : ${pet.hunger}</li>`
	let intelligence = `<li>Intelligence Level : ${pet.intelligence}</li>`
	let sleepiness = `<li>Sleepiness Level: ${pet.sleepiness}</li>`
	$('.show-status').append(happiness, intelligence, hunger, sleepiness) 
	$('.show-pet').css('backgroundImage',`url(${pet.setting.image})`)
	$('.show-pet').html(`<center><img src=${pet.image}></center>`)
	$('.show-pet-name').html(`<h3><center>${pet.name}</center></h3>`)

}
