class AddImageToToys < ActiveRecord::Migration[5.1]
  def change
    add_column :toys, :image, :string
  end
end
