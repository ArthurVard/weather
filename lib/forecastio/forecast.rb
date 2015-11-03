require 'httpclient'

module ForecastIO
	class Forecast
		HOST = 'https://api.forecast.io'
		API_KEY = '6f333db4f6d826d486cd960d64c5db2f'
		attr_reader :api_key, :host

		def initialize
			@host = HOST
			@api_key = API_KEY
		end

		def for (placeId="yerevan", options={})
			#TODO: get latitude, longitute by city/state or postal code
			# placeId = "Yerevan"
			lat = "40.1791857";
			long = "44.499102900000025";

			query_url = "#{host}/forecast/#{api_key}/#{lat},#{long}"
			response = get query_url
			JSON.parse(response.body)
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
	end
end