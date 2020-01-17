import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            selectedDate: new Date(),
            allEvents: [],
            allTheSates: [],
            suggestions: [],
            searchText: '',
            filteredEvents: [],
        };
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/events')
            .then(res => res.json())
            .then(events => {
                this.setState({
                    allEvents: events
                })
            })

        this.getTheStates()
    }

    getTheStates = () => {
        fetch('http://localhost:3000/states')
            .then(res => res.json())
            .then(states => {
                this.setState({
                    allTheSates: states
                })
            })
    }

    // Search bar text input functions 
    onTextChanged = (e) => {
        const value = e.target.value
        let suggestions = []
        if (value.length > 1) {
            const regex = new RegExp(`^${value}`, 'i')
            suggestions = this.state.allTheSates.sort().filter(v => regex.test(v))
        }

        this.setState(() => ({ suggestions: suggestions, searchText: value }))
    }

    suggestionSelected(value) {
        this.setState(() => ({
            searchText: value,
            suggestions: []
        }))
    }

    renderSuggestions() {
        const { suggestions } = this.state
        if (suggestions.length === 0) {
            return null
        } else {
            return (
                <ul className='home-item-input-suggestions'>
                    {suggestions.map((state) => <li className='home-item-input-suggestions-li' onClick={() => this.suggestionSelected(state)}>{state}</li>)}
                </ul>
            )
        }
    }

    // end of Search bar text input functions 




    handleChangeDate = date => {
        this.setState({
            //   startDate: date.toString().split(' ').slice(1, 4).join(' ')
            startDate: date,
            selectedDate: date
        })
    }

    // search bar functionality

    search = (e) => {
        let filterArray = []
        let eventsFilterByDateAndCity = []
        let january = ''
        let february = ''
        let march = ''
        let april = ''
        let june = ''
        let july = ''
        let august = ''
        let september = ''
        let october = ''
        let november = ''
        let december = ''
        e.preventDefault()
        this.state.allEvents.forEach(event => {
            if (event.location.includes(this.state.searchText)) {
                filterArray.push(event)
            }
        })


        let dateSelected = this.state.selectedDate.toString().split(' ').slice(1, 4).join(' ')

        if (dateSelected.split(' ')[0] === 'Jan') {
            january = 'January ' + dateSelected.split(' ').slice(1).join(' ')
            filterArray.forEach(event => {
                if (event.date.includes(january)) {
                    eventsFilterByDateAndCity.push(event)
                }
            })
        }
        if (dateSelected.split(' ')[0] === 'Feb') {
            february = 'February ' + dateSelected.split(' ').slice(1).join(' ')
            filterArray.forEach(event => {
                if (event.date.includes(february)) {
                    eventsFilterByDateAndCity.push(event)
                }
            })
        }
        if (dateSelected.split(' ')[0] === 'Mar') {
            march = 'March ' + dateSelected.split(' ').slice(1).join(' ')
            filterArray.forEach(event => {
                if (event.date.includes(march)) {
                    eventsFilterByDateAndCity.push(event)
                }
            })
        }
        if (dateSelected.split(' ')[0] === 'Apr') {
            april = 'April ' + dateSelected.split(' ').slice(1).join(' ')
            filterArray.forEach(event => {
                if (event.date.includes(april)) {
                    eventsFilterByDateAndCity.push(event)
                }
            })
        }
        if (dateSelected.split(' ')[0] === 'Jun') {
            june = 'June ' + dateSelected.split(' ').slice(1).join(' ')
            filterArray.forEach(event => {
                if (event.date.includes(june)) {
                    eventsFilterByDateAndCity.push(event)
                }
            })
        }
        if (dateSelected.split(' ')[0] === 'Jul') {
            july = 'July ' + dateSelected.split(' ').slice(1).join(' ')
            filterArray.forEach(event => {
                if (event.date.includes(july)) {
                    eventsFilterByDateAndCity.push(event)
                }
            })
        }
        if (dateSelected.split(' ')[0] === 'Aug') {
            august = 'August ' + dateSelected.split(' ').slice(1).join(' ')
            filterArray.forEach(event => {
                if (event.date.includes(august)) {
                    eventsFilterByDateAndCity.push(event)
                }
            })
        }
        if (dateSelected.split(' ')[0] === 'Sep') {
            september = 'September ' + dateSelected.split(' ').slice(1).join(' ')
            filterArray.forEach(event => {
                if (event.date.includes(september)) {
                    eventsFilterByDateAndCity.push(event)
                }
            })
        }
        if (dateSelected.split(' ')[0] === 'Oct') {
            october = 'October ' + dateSelected.split(' ').slice(1).join(' ')
            filterArray.forEach(event => {
                if (event.date.includes(october)) {
                    eventsFilterByDateAndCity.push(event)
                }
            })

        }
        if (dateSelected.split(' ')[0] === 'Nov') {
            november = 'November ' + dateSelected.split(' ').slice(1).join(' ')
            filterArray.forEach(event => {
                if (event.date.includes(november)) {
                    eventsFilterByDateAndCity.push(event)
                }
            })

        }
        if (dateSelected.split(' ')[0] === 'Dec') {
            december = 'December ' + dateSelected.split(' ').slice(1).join(' ')
            filterArray.forEach(event => {
                if (event.date.includes(december)) {
                    eventsFilterByDateAndCity.push(event)
                }
            })
        }

        this.setState({
            filteredEvents: eventsFilterByDateAndCity
        }, () => this.props.history.history.push('/search-results', this.state))

    }




    render() {
        const { searchText } = this.state
        console.log(this)

        return (

            <div className='home-item'>
                <div className='home-item-child'>

                    {this.state.allEvents.length === 0 ? (
                        <>
                            <h1 className='home-item-h1'>Loading...</h1>
                            <div className="loader"></div>
                        </>
                    ) : (

                        <>
                            <h1 className='home-item-h1'>Find Dancing Socials Near You!</h1>
                            <form onSubmit={(e) => { this.search(e) }}>
                                <input className='home-item-input' placeholder='City' type='text' value={searchText} onChange={this.onTextChanged} />
                                <DatePicker className='home-item-input' selected={this.state.startDate} onChange={(date) => this.handleChangeDate(date)} />
                                <button className='home-item-btn'>Search!</button>
                            </form>
                            <div className='home-item-input-suggestions-box'>

                                {this.renderSuggestions()}

                            </div>
                        </>

                    )}

                </div>

            </div>

        );
    }
}

export default Home;

