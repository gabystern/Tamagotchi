
$(document).ready(function() {
	fetchToys()
	fetchSettings()

	// let image = ""
	$(".img-check").click(function(){
		$(this).toggleClass("check");
		// image = this.src
	})
	
	$('#new_pet').on('submit', function(event){
		event.preventDefault()
		let values = $(this).serialize()
		console.log(image)
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
				let checkbox = `<input type="checkbox" id=${id}><label> ${name} </label> `
				// debugger
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
				let selectbox = `<option value=${location} id=${id}> ${location} </option> `
				$('.settings select').append(selectbox)
			})
		}
	})
}


