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
- has_many :members
- has_many :users,through:members
- has_many :messages


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|image|string||
|text|text||


### Association
- belongs_to :user
- belongs_to :group

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|text|null: false|
|name|string|null: false|

### Association

- has_many :members
- has_many :groups,through:members
- has_many :messages