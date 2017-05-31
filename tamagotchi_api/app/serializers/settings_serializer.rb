class SettingsSerializer < ActiveModel::Serializer
  attributes :id, :location, :image
  has_many :pets, serializer: PetIndexSerializer
end
