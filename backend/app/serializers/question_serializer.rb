class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :event_id, :user_id
end
