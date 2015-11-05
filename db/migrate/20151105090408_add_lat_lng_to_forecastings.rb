class AddLatLngToForecastings < ActiveRecord::Migration
  def change
    add_column :forecastings, :latitude, :float
    add_column :forecastings, :longitude, :float
    add_column :forecastings, :geoname, :string
    remove_column :forecastings, :geoname_id
  end
end
