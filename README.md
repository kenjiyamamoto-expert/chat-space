DB設計

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## chatsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|chat_id|integer|null: false, foreign_key: true|
|image|text||
|text|text||
|creted_at|timestamp|null: false|
|update_at|timestamp|null: false|

### Association
- belongs_to :user
- belongs_to :group

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false,primary key:true|
|email|text|null: false|
|encrypted_password|text|null: false|

### Association
- has_many :chats
- belongs_to :group
