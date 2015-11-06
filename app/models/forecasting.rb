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

	def icon_color
		if current_summary.include? "Clear"
			"yellow"
		else
			"blue"
		end
	end

	def current_icon
		if data && data['currently'] 
			data['currently']['icon'] 
		end
	end

	def current_summary
		if data && data['currently'] 
			data['currently']['summary'] 
		end
	end


	def current_temperatureC
		if data && data['currently'] 
			(5.0/9.0 *(data['currently']['temperature'] - 32)).round
		end
	end
end
