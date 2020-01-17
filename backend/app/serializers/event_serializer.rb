class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :date, :time, :location, :dancing_type, :cost, :img, :organizer
end
