class PetToy < ApplicationRecord
	belongs_to :pet
	belongs_to :toy
end
