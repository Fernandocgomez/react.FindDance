class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :description
      t.string :date
      t.string :eventbriteId
      t.string :location
      t.string :dancing_type
      t.string :cost
      t.string :img
      t.string :organizer

      t.timestamps
    end
  end
end
