class QuestionsController < ApplicationController

    skip_before_action :check_authentication, only: [:index]

    def index
        questions = Question.all
        render :json => questions.to_json()
    end

    def show 
        question = Question.find_by(id: params[:id])
        # render :json => question.to_json( :include => [:items] )
    end

    def create 
        question = Question.new(question_params)
        if question.valid? 
            question.save
            render json: {question: QuestionSerializer.new(question)}, status: :created
        else
            render json: {error: "Failed to create question"}, status: :not_acceptable
        end
    end

    def update 
        question = Question.find(params[:id])
        question.update(question_params)
        render json: {question: QuestionSerializer.new(question), message: "question was edited"}
    end

    def destroy
        question = Question.find(params[:id])
        question.destroy
    end


    private 

    def question_params
        params.permit(:title, :content, :event_id, :user_id)
    end

end
