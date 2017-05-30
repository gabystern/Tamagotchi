class Api::V1::SettingsController < ApplicationController

	def index
		@settings = Setting.all
		render json: @settings
	end



end