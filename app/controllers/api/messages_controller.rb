class Api::MessagesController < ApplicationController
  def index
    #今いるグループの情報をパラムスの値を元にDBから取得。
    #グループが所有しているメッセージの中から、params[:last_id]よりも大きいidがないかMessageから検索して、@messagesに代入。
    @messages = Message.includes(:user).where('id > ? AND group_id = ?', params[:id], params[:group_id])
    
  end
end