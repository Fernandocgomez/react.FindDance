class Event < ApplicationRecord
    has_many :questions
    has_many :goings
end
