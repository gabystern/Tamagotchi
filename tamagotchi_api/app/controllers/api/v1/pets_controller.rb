class Api::V1::PetsController < ApplicationController


	def create
		@pet = Pet.create(pet_params)
		render json: @pet
	end

	def index
		@pets = Pet.all
		render json: @pets, each_serializer: Api::V1::PetIndexSerializer
	end

	private

	def pet_params
		params.require(:pet).permit(:name, :intelligence, :happiness, :hunger, :sleepiness, :image, :setting_id)
	end


end