require 'httpclient'

module ForecastIO
	class Forecast
		FORECASTAPI_HOST = 'https://api.forecast.io'
		FORECASTAPI_KEY = '6f333db4f6d826d486cd960d64c5db2f'

		GEOAPI_HOST = "https://maps.googleapis.com/maps/api/geocode"
		GEOAPI_KEY = "AIzaSyB9nQf4Dr7J9AUYRvUw7lmHxSzH-mMZoXc"

		
		attr_reader :api_key, :host, :geo_host, :geo_api_key

		def initialize
			@host = FORECASTAPI_HOST
			@api_key = FORECASTAPI_KEY
			@geo_host = GEOAPI_HOST
			@geo_api_key = GEOAPI_KEY
		end

		def for (placeId="yerevan", options={})
			#TODO: get latitude, longitute by city/state or postal code
			# placeId = "Yerevan"
			#lat = "40.1791857";
			#long = "44.499102900000025";
			safe_params = {'address'=>placeId}.to_query
			geo_query = "#{geo_host}/json?#{safe_params}"
			puts geo_query
			geoInfo = getJson geo_query

			if geoInfo["results"].empty?
				#TODO: handle nicely
				#raise "empty result"
			else
				lat = geoInfo["results"][0]["geometry"]["location"]["lat"]
				lng = geoInfo["results"][0]["geometry"]["location"]["lng"]
				forecastBy(lat,lng)
			end
		end

		def forecastBy(latitude, longitute)
	    	query_url = "#{host}/forecast/#{api_key}/#{latitude},#{longitute}"
			getJson query_url
	    end

		#for testing purpose
		def byLatLong (lat,long)
			getBy(lat,long)
		end		

		# Build or get an HTTP client.
	    def http
	      @http ||= HTTPClient.new
	    end

	    # Set an HTTP client.
	    #
	    # @param httpclinet to be used.
	    def http=(httpclinet)
	      @http= httpclinet
	    end

	    private

	    

	    def get path
	      http.get path
	    end

	    def getJson path
	      response = get path
	      #response.status == 200
	      	JSON.parse(response.body)
	    end
	end
end