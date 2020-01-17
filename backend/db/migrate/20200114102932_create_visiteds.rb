class CreateVisiteds < ActiveRecord::Migration[6.0]
  def change
    create_table :visiteds do |t|
      t.string :url

      t.timestamps
    end
  end
end
