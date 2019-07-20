Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  # ユーザー情報編集機能を実装
  resources :users, only: [:edit, :update]
  # グループ機能の実装
  resources :groups, only: [:new, :create, :edit, :update] do
    # メッセージ送信機能の実装
    resources :messages, only: [:index, :create]
  end
end
