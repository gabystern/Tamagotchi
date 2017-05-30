class Api::V1::ToysController < ApplicationController

	def index
		@toys = Toy.all
		render json: @toys
	end



end