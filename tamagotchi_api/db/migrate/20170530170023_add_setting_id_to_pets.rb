class AddSettingIdToPets < ActiveRecord::Migration[5.1]
  def change
    add_column :pets, :setting_id, :integer
  end
end
