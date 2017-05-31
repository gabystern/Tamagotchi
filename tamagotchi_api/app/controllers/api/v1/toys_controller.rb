class Api::V1::ToysController < ApplicationController

	def index
		@toys = Toy.all
		render json: @toys
	end

	# def show
	# 	toy = Toy.find_by(id: params[:id])
	# 	render json: toy, each_serializer: ToysSerializer
	# end

	# def play
	# 	toy = Toy.find_by(id: params[:id])
	# 	pet = Pet.find_by(id: params[:id])
	# 	pet.happiness = pet.happiness + 2
	# 	pet.sleepiness = pet.sleepiness + 2
	# end

end
