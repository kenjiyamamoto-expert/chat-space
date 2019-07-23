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
 });


  function buildMessage(message){
    // テンプレートリテラルを用いてappendしたい情報を記載

    var images=(
    message.image ? message.image:''
    );
    var html= `<div class="message">
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${message.name}
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
});