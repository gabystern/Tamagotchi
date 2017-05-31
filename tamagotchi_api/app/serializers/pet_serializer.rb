class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :intelligence, :happiness, :hunger, :sleepiness, :image, :setting_id
  has_many :toys, serializer: PetToysSerializer
  belongs_to :setting, serializer: PetSettingSerializer
end
