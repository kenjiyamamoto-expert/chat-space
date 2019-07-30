$(function(){
 $('.new_message').on('submit',function(e){
   e.preventDefault();
   var formData= new FormData(this);
   var url= $(this).attr('action');

  $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
  })

  // サーバーから値が正しく返ってきた場合
  .done(function(message){
    // buildMessageの結果(html)が反映される
   var html= buildMessage(message);
   $('.message').append(html);
   // 送信ボタンを押したらテキスト欄が空になる
   $('#message_content').val('');
   //データ受け取り後画面最下部までスクロール
   $('html').animate({ scrollTop: $('html')[0].scrollHeight});
   return false;
  })
  // 正しく返ってこなかった場合
  .fail(function(){
   alert('エラー');
  })
  // submitのコールバック関数で返り値をfalseにすると連続送信が可能になる
  return false;
 });

 function buildMessage(message){
  // テンプレートリテラルを用いてappendしたい情報を記載
  // 三項演算子を使い、画像データが投稿されない場合は空欄を表示
  var images= message.image_url ? message.image_url : '';
  // 上記で定義したimagesをhtml内に記述
  var html= `<div class="message" data-message-id="${message.id}">
             <div class="upper-message">
             <div class="upper-message__user-name">
             ${message.user_name}
             </div>
             <div class="upper-message__date">
             ${message.created_at}
             </div>
             </div>
             <div class="lower-message">
             <p class="lower-message__content">
             ${message.content}
             </p>
             <img class="lower-message__image" 
             src= '${images}'>
             </div>
             </div>
             `
  return html;
  }

  var reloadMessages = function() {
   //今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
   if (window.location.href.match(/\/groups\/\d+\/messages/)){
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");

    // console.log(last_message_id )
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
       //追加するHTMLの入れ物を作る
      var insertHTML = '';
      // messages（配列データ）がある場合以下の処理を行う
      if(messages.length != 0){
       //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
       messages.forEach(function (message) {
        //メッセージが入ったHTMLを取得
        insertHTML = buildMessage(message);
        //メッセージを追加
        $('.messages').append(insertHTML);
       })
       // 新しく追加されたメッセージの分だけメッセージ表示部分を上にスクロール
       $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
 };
//  //5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
 setInterval(reloadMessages, 5000);
});