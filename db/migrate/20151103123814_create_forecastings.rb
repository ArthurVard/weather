class CreateForecastings < ActiveRecord::Migration
  def change
    create_table :forecastings do |t|
      t.string :geoname_id
      t.text :data

      t.timestamps
    end
  end
end
