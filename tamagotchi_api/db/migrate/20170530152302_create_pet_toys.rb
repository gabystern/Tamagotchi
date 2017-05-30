class CreatePetToys < ActiveRecord::Migration[5.1]
  def change
    create_table :pet_toys do |t|
      t.integer :pet_id
      t.integer :toy_id

      t.timestamps
    end
  end
end
