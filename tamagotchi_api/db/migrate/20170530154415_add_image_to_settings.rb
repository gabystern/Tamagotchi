class AddImageToSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :settings, :image, :string
  end
end
