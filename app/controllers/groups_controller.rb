class GroupsController < ApplicationController

  def index
  end
  
  # グループの新規作成画面
  def new
    @group = Group.new
    # 現在ログイン中のユーザーを、新規作成したグループに追加
    @group.users << current_user
  end

  # グループを保存する処理
  def create
    @group = Group.new(group_params)
    # グループを作成しているかで分岐
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      # HTTPリクエストを送らず、該当するビューだけを表示(エラーメッセージ)
      render :new
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end

  def edit
  end

  def update
  end

end
