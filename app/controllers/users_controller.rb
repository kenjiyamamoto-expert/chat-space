class UsersController < ApplicationController
  # ユーザー検索の実装
  def index
    # 入力したキーワードをもとにユーザーを検索（ただし、自分は表示されない）
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(name: current_user.name)
    respond_to do |format|
      format.html
      format.json
    end
  end
  
  # ユーザー情報編集機能を実装
  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
