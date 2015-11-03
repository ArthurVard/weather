json.array!(@forecastings) do |forecasting|
  json.extract! forecasting, :id, :geoname_id, :data
  json.url forecasting_url(forecasting, format: :json)
end
