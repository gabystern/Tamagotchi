class ToysSerializer < ActiveModel::Serializer
  attributes :id, :name
  belongs_to :pets
end
