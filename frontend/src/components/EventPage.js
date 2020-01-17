import React from 'react';
import { Link } from 'react-router-dom'


class EventPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionArray: []

        };
    }

    componentDidMount() {
        this.setState({
            questionArray: this.props.history.location.state.questions
        })
    }

    renderComments = () => {
        return this.state.questionArray.map((question) => {
            return (
                <>
                    <p className='event-page-box-3-username'>{question.title}</p>
                    <ul>
                        {question.content}
                    </ul>
                </>
            )
        })

    }

    handelTextChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    postComment = (e) => {
        console.log(e)
        e.preventDefault()
        fetch('http://localhost:3000/questions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: this.state.content,
                event_id: this.props.history.location.state.id,
                user_id: localStorage.userId,
                title: localStorage.userName
            })
        })
            .then(res => res.json())
            .then(question => {
                this.setState({ questionArray: [...this.state.questionArray, question.question] })
            })
        e.target.reset()
        this.scrollToBottom()
    }




    render() {


        console.log(this.state)




        return (

            <div className='event-page-main-container'>

                <div className='event-page-box-1'>

                    <div className='event-page-img-box'>
                        <img className='event-page-img' alt='event' src={this.props.history.location.state.img}></img>
                    </div>

                    <div className='event-page-info-box'>

                        <div className='event-page-date-title-organizer-box'>

                            <div>
                                <h5>{this.props.history.location.state.date.split(' ')[1] + ' ' + this.props.history.location.state.date.split(' ')[2]}</h5>
                            </div>

                            <div>
                                <h2>{this.props.history.location.state.title}</h2>
                            </div>

                            <div>
                                <h5>by {this.props.history.location.state.organizer}</h5><br />
                            </div>

                        </div>

                        <div className='event-page-price-btn-box'>

                            <div>
                                <p style={{ color: 'rgb(168, 168, 168)', fontSize: '16px' }}>Price: {this.props.history.location.state.cost}</p>
                            </div>

                            <div className='event-page-btn-box'>
                                <button className='event-page-btn'>I am going!</button>
                            </div>

                        </div>

                    </div>

                </div>

                <div className='event-page-box-2'>

                    <div className='event-page-description-box'>

                        <div className='event-page-description-tilte'>
                            <h1>Description</h1>
                        </div>

                        <div className='event-page-description-content'>
                            <p>
                                {this.props.history.location.state.description}
                            </p>

                        </div>

                    </div>

                    <div className='event-page-date-location-box'>

                        <div className='event-page-date-box'>

                            <div className='event-page-date-tilte'>
                                <h3>Date</h3>
                            </div>

                            <div className='event-page-date-content'>
                                <p>{this.props.history.location.state.date}</p>
                            </div>

                        </div>

                        <div className='event-page-location-box'>

                            <div className='event-page-location-tilte'>
                                <h3>Location</h3>
                            </div>

                            <div className='event-page-location-content'>
                                <p>{this.props.history.location.state.location}</p>

                            </div>

                        </div>

                    </div>

                </div>




                <div className='event-page-box-3'>


                    <div className='event-page-box-3-conatainer'>



                        <div className='event-page-box-3-title'>
                            <h1>Ask A Question To The Community!</h1>
                        </div>

                        <div className='event-page-box-3-questions-box'>

                            <div className='event-page-box-3-questions-box-rendering'>

                                <div>

                                    {this.state.questionArray == 0 ? (
                                        <>
                                            <h1>No Questions Have Been Ask Yet! </h1>
                                        </>
                                    ) : (
                                            <>
                                                {this.renderComments()}


                                            </>

                                        )}



                                </div>
                                <div ref={(el) => { this.messagesEnd = el; }} style={{paddingBottom: '100px'}}>

                                </div>



                            </div>



                        </div>

                        <div className='event-page-box-3-questions-form-container'>



                            <form style={{ marginRight: '200px', marginLeft: '200px' }} onSubmit={(e) => this.postComment(e)}>

                                <div className='event-page-box-3-input-box'>
                                    <input className='event-page-box-3-input' type='text' name='content' onChange={(e) => { this.handelTextChange(e) }}></input >
                                </div>

                                {localStorage.showLoginBtn ? (<>
                                    <div className='event-page-box-3-btn-box'>
                                    <button className='event-page-box-3-btn' >Send!</button>
                                </div>
                                </>) : (<>
                                
                                    <div className='event-page-box-3-btn-box'>
                                    <Link className='event-page-box-3-btn-redirect' to='/login'>Please login to ask a question to the community!</Link>
                                    
                                     </div>

                                </>) }

                                

                            </form>





                        </div>

                    </div>


                </div>


            </div>

        );
    }
}

export default EventPage;