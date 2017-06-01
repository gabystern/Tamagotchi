class Pet{

	constructor(petObject){
		this.name = petObject.name
		this.image = petObject.image
		this.happiness = petObject.happiness
		this.intelligence = petObject.intelligence
		this.hunger = petObject.hunger
		this.sleepiness = petObject.sleepiness
		this.setting_id = petObject.setting_id
	}

	render(){
		this.showPet()
		this.petEat()
	}

	showPet(){
		return `<img src=${pet.image}><br><h3>${pet.name}</h3><img src=${pet.setting.image}>`
	}

	petEat(){

	}


}