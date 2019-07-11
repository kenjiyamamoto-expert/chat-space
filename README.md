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
|user_id|integer|null: false, foreign_key: true|
|chat_id|integer|null: false, foreign_key: true|
|image|text|null: false|
|text|text|null: false|
|creted_at|timestamp|null: false|
|update_at|timestamp|null: false|

### Association
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|email|text|null: false|
|encrypted_password|text|null: false|

### Association
has_many :chats
