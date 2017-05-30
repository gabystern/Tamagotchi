class CreatePets < ActiveRecord::Migration[5.1]
  def change
    create_table :pets do |t|
      t.string :name
      t.integer :intelligence
      t.integer :happiness
      t.integer :hunger
      t.integer :sleepiness

      t.timestamps
    end
  end
end
