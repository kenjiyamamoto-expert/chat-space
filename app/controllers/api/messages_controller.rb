class Api::MessagesController < ApplicationController
  def index
    #グループが所有しているメッセージの中から、group_idが一致した物をDBから取得し、かつparams[:last_id]よりも大きいidがないかMessageから検索して、@messagesに代入。
    @messages = Message.includes(:user).where('id > ? AND group_id = ?', params[:id], params[:group_id])
  end
end