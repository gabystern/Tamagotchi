
$(document).ready(function() {
	fetchToys()
	fetchSettings()

	let image = ""
	$(".img-check").click(function(){
		$(this).toggleClass("picked");
		image = this.src
	})

	$('#new-pet').submit(function(event){
		event.preventDefault()
		debugger
		let name = $('#name').val()

		// $("#setting2").text()
		// $("#setting2").val()
		console.log( $( this ).serialize() )
	})
})

function fetchToys(){
	$.ajax({
		url:'http://localhost:3000/api/v1/toys',
		success: function(data){
			let toyNames = data.map(function(toy){
				let name = toy.name
				let id = toy.id
				let checkbox = `<input type="checkbox" id="toy${id}" name="toy" value=${name} ><label> ${name} </label> `
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
				let selectbox = `<option value=${id} id="setting${id}" name="setting_id" > ${location} </option> `
				$('.settings select').append(selectbox)
			})
		}
	})
}
