$(document).on('turbolinks:load', function(){
 var search_list = $("#user-search-result ");
 function appendUser(user){
  var html=`
  <div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${user.name}</p>
  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
  </div>
  `
  // 上記で定義したid名の場所に表記
  search_list.append(html);
  }
  // 検索候補がない場合一致するユーザーはありませんと表記
  function appendErrMsgToHTML(msg) {
   var html = `<p>
                <div class='chat-group-user clearfix'>${ msg }</div>
               </p>`
  // 上記で定義したid名の場所に表記
  search_list.append(html);
  }


  var add_list = $(".chat-group-usersjs-add-user");
  // 追加ボタンを押した時の表記
  function appendAdd(id,user){
   var html = `
            <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-7'>
            <input name='group[user_ids][]' type='hidden' value=${id}>
            <p class='chat-group-user__name'>${user}</p>
            <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
             `
    // 上記で定義したid名の場所に表記
   add_list.append(html);
  }

  // 追加ボタンを押しイベントを発火させる
  $('#user-search-result').on('click', '.user-search-add', function(){
   // インクリメンタルサーチで取得したid,nameをこちらでも使用する
   var id = $(this).data('user-id');
   var user = $(this).data('user-name');
   appendAdd(id,user);
   // 親要素を消す
   $(this).parent().remove();
  });

  // 削除ボタンを押しイベントを発火させる
  $('.chat-group-usersjs-add-user').on('click', '.user-search-remove', function(){
   // 親要素の取得
   $(this).parent();
   // 取得した親要素を削除
   $('#chat-group-user-7').remove();
  });

  $("#user-search-field").on("keyup",function(){
   var input= $("#user-search-field").val();
   // もし入力欄の文字数が0ならば、emptyメソッドで消す。
   // そうでないならば、ajax通信を発火させる
   if (input.length== 0){
    $("#user-search-result ").empty();
   }
   else{
    $.ajax({
     url: '/users',
     type: "GET",
     data: {keyword:input},
     dataType: 'json',
    }) 
  
    .done(function(users) {
     $("#user-search-result ").empty();
     if (users.length !== 0) {
      users.forEach(function(user){
       // 上記でhtml型で定義（入力した値が一致した場合）
       appendUser(user);
      });
     }
     else{
      // 上記で定義（入力した値を一致しなかった場合）
      appendErrMsgToHTML("一致するユーザーはありません");
     }
    })
    .fail(function(){
     alert('ユーザー検索に失敗しました');
    })
   }
  });
});