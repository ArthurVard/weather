require 'test_helper'

class ForecastingsControllerTest < ActionController::TestCase
  setup do
    @forecasting = forecastings(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:forecastings)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create forecasting" do
    assert_difference('Forecasting.count') do
      post :create, forecasting: { data: @forecasting.data, geoname_id: @forecasting.geoname_id }
    end

    assert_redirected_to forecasting_path(assigns(:forecasting))
  end

  test "should show forecasting" do
    get :show, id: @forecasting
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @forecasting
    assert_response :success
  end

  test "should update forecasting" do
    patch :update, id: @forecasting, forecasting: { data: @forecasting.data, geoname_id: @forecasting.geoname_id }
    assert_redirected_to forecasting_path(assigns(:forecasting))
  end

  test "should destroy forecasting" do
    assert_difference('Forecasting.count', -1) do
      delete :destroy, id: @forecasting
    end

    assert_redirected_to forecastings_path
  end
end
