json.image_url @message.image.url
json.content @message.content
json.created_at @message.created_at
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id