class Toy < ApplicationRecord
	has_many :pet_toys
	has_many :pets, through: :pet_toys
end
