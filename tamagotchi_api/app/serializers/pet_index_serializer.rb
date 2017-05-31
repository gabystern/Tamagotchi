class PetIndexSerializer < ActiveModel::Serializer
  attributes :id, :name, :intelligence, :happiness, :hunger, :sleepiness, :image, :setting_id
  has_many :toys, serializer: ToysSerializer
end
