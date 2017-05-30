
$(document).ready(function() {
	fetchToys()

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

	function fetchPets(){
		$.ajax({
			url:'http://localhost:3000/api/v1/pets',
			success: displayPets
		})
	}

	function fetchsettings(){
			$.ajax({
				url:'http://localhost:3000/api/v1/settings',
				success: displaysettings
			})
		}



	// const toys = function(data){
	// 	$toys = $('#toys')
	// 	$toys.html = ""
	// 	data.forEach(function (toy){

	// 	})
	// }

