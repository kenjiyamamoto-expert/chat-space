class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # 未ログイン時はログインページに遷移する
  before_action :authenticate_user!

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
#  追加のパラメーター(nameカラム)を許可
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
