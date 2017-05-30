class PetIndexSerializer < ActiveModel::Serializer
  attributes :id, :name, :intelligence, :happiness, :hunger, :sleepiness, :image, :setting_id
end

