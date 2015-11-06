require 'forecastio/forecast'

class ForecastingsController < ApplicationController
  before_action :init_forecasting, only: [:index, :forecast]

  def forecast
    forecast = ForecastIO::Forecast.new
    if params[:search].present?
      placeId = params[:search]
      @forecasting.name = placeId

      temp = Forecasting.find_by(:geoname => placeId)
      if temp
        @forecasting = temp
      else
        @forecasting.result = forecast.for(placeId)
        @forecasting.save
      end
    elsif params[:lat].present? && params[:lng].present?
      lat = params[:lat]
      lng = params[:lng]
      @forecasting.name = "unknown"
      @forecasting.name = params[:name] if params[:name].present?

      temp = Forecasting.find_by(:latitude => lat, :longitude => lng)
      if temp
        @forecasting = temp
      else
        @forecasting.result = forecast.forecastBy(lat,lng)
        @forecasting.save
      end
      #weather for IP location or nothing to do 
    end

    def index
      @forecasting.name = "Yerevan, Armenia"
    end
      
    respond_to do |format|
      if request.xhr?
        format.js
      else
        format.html {redirect_to forecastings_path}
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_forecasting
      @forecasting = Forecasting.find(params[:id])
    end

     def init_forecasting
      @forecasting = Forecasting.new
      @forecasting.name = "Yerevan, Armenia"
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def forecasting_params
      params.require(:forecasting).permit(:data, :name, :latitude, :longitude)
    end
end
