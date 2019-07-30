class Api::MessagesController < ApplicationController
  def index
    #今いるグループの情報をパラムスの値を元にDBから取得。
    @group = Group.find(params[:group_id]) 
    #グループが所有しているメッセージの中から、params[:last_id]よりも大きいidがないかMessageから検索して、@messagesに代入。
    @messages = @group.messages.includes(:user).where('id > ?', params[:id]) 

  end
end