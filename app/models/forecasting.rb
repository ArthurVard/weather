class Forecasting < ActiveRecord::Base
	serialize :data, JSON
	attr_accessor :name, :latitude, :longitude, :result

end
