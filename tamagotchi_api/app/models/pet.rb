class Pet < ApplicationRecord
	has_many :pet_toys
	has_many :toys, through: :pet_toys
	belongs_to :setting
end
