Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  # ユーザー情報編集機能とユーザー検索機能(index)を実装
  resources :users, only: [:index,:edit, :update]

  # グループ機能の実装
  resources :groups, only: [:new, :create, :edit, :update] do
    # メッセージ送信機能の実装
    resources :messages, only: [:index, :create]

    # 自動更新に必要なAPIアクションのルーティングを実装
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end
