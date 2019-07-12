DB設計

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :member
- has_many :users,through:member

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|group_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|
|image|string||
|text|text||
|creted_at|timestamp|null: false|
|update_at|timestamp|null: false|

### Association
- belongs_to :user
- belongs_to :group

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|text|null: false|
|name|string|null: false|

### Association
- has_many :messages
- has_many :groups
