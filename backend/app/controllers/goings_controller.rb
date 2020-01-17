class GoingsController < ApplicationController

    def create 
        going = Going.new(going_params)
        if going.valid? 
            going.save
            render json: {going: GoingSerializer.new(going)}, status: :created
        else
            render json: {error: "Failed to create going"}, status: :not_acceptable
        end
    end 

    private

    def going_params
        arams.permit(:event_id, :user_id)
    end

end
