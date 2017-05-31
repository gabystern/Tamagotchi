class ToysSerializer < ActiveModel::Serializer
  attributes :id, :name, :image
  belongs_to :pets
end
