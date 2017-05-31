
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
		// toys[0].value -> get's first toy that is checked
		let alltoys = toys.map(function(toy){ return toy.value })
		// let toys = toysArray.map(function(toy){
		// 	return toy.value()
		// })

		console.log(name)
		console.log(setting_id)
		console.log(image)
		console.log(alltoys)
		debugger
	})
})

function fetchToys(){
	$.ajax({
		url:'http://localhost:3000/api/v1/toys',
		success: function(data){
			let toyNames = data.map(function(toy){
				let name = toy.name
				let id = toy.id
				let checkbox = `<input type="checkbox" name="toy" value="${toy.name}" ><label> ${name} </label> `
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
