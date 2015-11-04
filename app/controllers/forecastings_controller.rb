require 'forecastio/forecast'

class ForecastingsController < ApplicationController
  before_action :set_forecasting, only: [:show, :edit, :update, :destroy]
  before_action :init_forecasting, only: [:index]

  # GET /forecastings
  # GET /forecastings.json
  def index
    @forecastings = Forecasting.all
  end

  # GET /forecastings/1
  # GET /forecastings/1.json
  def show
  end

  # GET /forecastings/new
  def new
    @forecasting = Forecasting.new
  end

  # GET /forecastings/1/edit
  def edit
  end

  # POST /forecastings
  # POST /forecastings.json
  def create
    @forecasting = Forecasting.new(forecasting_params)

    forecast = ForecastIO::Forecast.new
    result = forecast.for(@forecasting.name)
    #@forecasting.latitude = result['latitude']
    #@forecasting.longitude = result['longitude']
    @forecasting.data = result #["currently"]["summary"]

    respond_to do |format|
      if @forecasting.save
        format.html { redirect_to forecastings_url, notice: 'Forecasting was successfully created.' }
        format.json { render :show, status: :created, location: @forecasting }
      else
        format.html { render :new }
        format.json { render json: @forecasting.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /forecastings/1
  # PATCH/PUT /forecastings/1.json
  def update
    respond_to do |format|
      if @forecasting.update(forecasting_params)
        format.html { redirect_to @forecasting, notice: 'Forecasting was successfully updated.' }
        format.json { render :show, status: :ok, location: @forecasting }
      else
        format.html { render :edit }
        format.json { render json: @forecasting.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /forecastings/1
  # DELETE /forecastings/1.json
  def destroy
    @forecasting.destroy
    respond_to do |format|
      format.html { redirect_to forecastings_url, notice: 'Forecasting was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_forecasting
      @forecasting = Forecasting.find(params[:id])
    end

     def init_forecasting
      @forecasting = Forecasting.new
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def forecasting_params
      params.require(:forecasting).permit(:geoname_id, :data, :name, :latitude, :longitude)
    end
end
