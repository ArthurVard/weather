class Forecasting < ActiveRecord::Base
	serialize :data, JSON

	def name 
		geoname
	end
	def name= str
		self.geoname= str
	end

	def result
		data
	end

	def result= res
		self.data= res
		self.latitude= data['latitude']
		self.longitude= data['longitude']
	end	
end
