class UsersController < ApplicationController

    skip_before_action :check_authentication, only: [:create]
    
    def show 
        user = User.find_by(id: params[:id])
        # render :json => user.to_json( :include => [:items] )
        render :json => user.to_json()
    end

    def create 
        user = User.new(user_params)
        if user.valid? 
            user.save
            render json: {user: UserSerializer.new(user)}, status: :created
        else
            render json: {error: "Failed to create user"}, status: :not_acceptable
        end
    end

    def update 
        user = User.find(params[:id])
        user.update(user_params)
        render json: {user: UserSerializer.new(user), message: "user was edited"}
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
    end


    private 

    def user_params
        params.permit(:username, :password, :email)
    end
end
