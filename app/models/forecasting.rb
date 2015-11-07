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

	def hour_summary
		if data && data['hourly'] 
			data['hourly']['summary'] 
		end
	end

	def next24_summary
		if data && data['daily'] 
			data['daily']['summary'] 
		end
	end


	def current_temperatureC
		if data && data['currently'] 
			(5.0/9.0 *(data['currently']['temperature'] - 32)).round
		end
	end

	def details
		html = '<table>'
		html << '<tbody>'
		if data && data['hourly']
			data['hourly']['data'].each do |d|
				html << '<tr>'
				html << '<td><span>'
				html << d['time'].to_s
				html << '</span></td>'
				# html << '<td><span>'
				# html << d['summary']
				# html << '</span></td>'
				html << '</tr>'
			end
        end 
       
		html << '</tbody>'
		html << '</table>'
		puts html
        html      
	end	
end
