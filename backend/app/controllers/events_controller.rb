class EventsController < ApplicationController

    skip_before_action :check_authentication, only: [:index, :get_states]

    def index 
        events = Event.all
        # render :json => restaurants.to_json(:include => { :menus => {:include =>:items} })
        render :json => events.to_json(:include => [:goings, :questions])
    end

    def get_states 
        events = Event.all.map { |event| event.location.split(" ")[-3..-2][0]}
        eventsCities = events.uniq

        # render :json => restaurants.to_json(:include => { :menus => {:include =>:items} })
        render :json => eventsCities.to_json()
    end

    def show 
        event = Event.find_by(id: params[:id])
        # render :json => menu.to_json( :include => [:items] )
    end

    private 

    def event_params
        params.permit(:title, :description, :time, :location, :dancing_type, :cost, :img, :organizer, :going)
    end





end
