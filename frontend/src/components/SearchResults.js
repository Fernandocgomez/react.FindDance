import React from 'react';
import DatePicker from "react-datepicker";




class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            selectedDate: new Date(),
            suggestions: [],
            allEvents: [],
            searchText: '',
            filteredEvents: [],
            allTheSates: [],
            newSearch: false,
            danceTypeFilterKeyword: '',
            danceTypeFilterProps: [],
            danceTypeFilter: [],
            sortBySwich: false,
            sortByPriceKeyword: '',
            allEventsProps: []

        };
    }

    // Component Did Mount 

    componentDidMount() {

        this.setState({
            allEvents: this.props.history.location.state.allEvents,
            allTheSates: this.props.history.location.state.allTheSates,
            allEventsProps: this.props.history.location.state.filteredEvents
        })

    }

    // Component Did Mount End 


    // Search bar text input functions 
    handleChangeDate = date => {
        this.setState({
            startDate: date,
            selectedDate: date
        })
    }

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



    // Search bar text input functions  end

    // Render functions Begining

    renderCard = (filteredEventsProps) => {
        return filteredEventsProps.map(singlEvent => {
            return (
                <div className='search-results-item-results-and-sort-by-container-results'>
                    <div className='search-results-item-results-and-sort-by-container-img'>
                        <img className='search-results-item-results-and-sort-by-container-img-size' src={singlEvent.img} alt='event' ></img>
                    </div>

                    <div className='search-results-item-results-and-sort-by-container-content-container'>
                        <div className='search-results-item-results-and-sort-by-container-content-text'>
                            <h1>{singlEvent.title}</h1>
                            <p style={{ width: '95%' }}>{singlEvent.description.substring(0, 250)}</p>
                        </div>
                        <div className='search-results-item-results-and-sort-by-container-content-conteiner-btn-price'>
                            <div className='search-results-item-results-and-sort-by-container-content-conteiner-price'>
                                <p style={{ color: '#a8a8a8' }}>Price: {singlEvent.cost}</p>
                            </div>
                            <div className='search-results-item-results-and-sort-by-container-content-conteiner-btn'>
                                <button className='search-results-item-btn-card' onClick={() => this.clickOnCard(singlEvent)}>Find out More!</button>
                            </div>
                        </div>

                    </div>
                </div>
            )
        })
    }

    renderCardNewSearch = (filterEvents) => {
        // return this.state.filteredEvents.map(event => {
        return filterEvents.map(singlEvent => {
            return (
                <div className='search-results-item-results-and-sort-by-container-results'>
                    <div className='search-results-item-results-and-sort-by-container-img'>
                        <img className='search-results-item-results-and-sort-by-container-img-size' src={singlEvent.img} alt='event' ></img>
                    </div>

                    <div className='search-results-item-results-and-sort-by-container-content-container'>
                        <div className='search-results-item-results-and-sort-by-container-content-text'>
                            <h1>{singlEvent.title}</h1>
                            <p style={{ width: '95%' }}>{singlEvent.description.substring(0, 250)}</p>
                        </div>
                        <div className='search-results-item-results-and-sort-by-container-content-conteiner-btn-price'>
                            <div className='search-results-item-results-and-sort-by-container-content-conteiner-price'>
                                <p style={{ color: '#a8a8a8' }}>Price: {singlEvent.cost}</p>
                            </div>
                            <div className='search-results-item-results-and-sort-by-container-content-conteiner-btn'>
                                <button className='search-results-item-btn-card' onClick={() => this.clickOnCard(singlEvent)}>Find out More!</button>
                            </div>
                        </div>

                    </div>
                </div>
            )
        })
    }

    renderSuggestions() {
        const { suggestions } = this.state
        if (suggestions.length === 0) {
            return null
        } else {
            return (
                <ul className='search-results-item-input-suggestions'>
                    {suggestions.map((state) => <li className='search-results-item-input-suggestions-li' onClick={() => this.suggestionSelected(state)}>{state}</li>)}
                </ul>
            )
        }
    }

    // Render Function End

    // search function begining

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
            filteredEvents: eventsFilterByDateAndCity,
            newSearch: true,
            sortBySwich: false
        })

    }

    // Search Functions End

    // Sort by type functions

    sortByType = () => {
        console.log('sortByType trigered')
        let sortEventsProps = []
        let sortEvents = []


        this.state.allEventsProps.map((event) => {
            if (event.dancing_type == `${this.state.danceTypeFilterKeyword}`) {
                sortEventsProps.push(event)
            }



        }, this.setState({
            danceTypeFilterProps: sortEventsProps,
            sortBySwich: true

        }))

        this.state.filteredEvents.map((event) => {
            if (event.dancing_type == `${this.state.danceTypeFilterKeyword}`) {
                sortEvents.push(event)
            }
        }, this.setState({
            danceTypeFilter: sortEvents,
            sortBySwich: true

        }))





    }

    sortByPriceFree = () => {
        let freeArrayFilteredEvents = []
        let freeArrayFilteredEventsProps = []
        let freedanceTypeFilterProps = []
        let freedanceTypeFilter = []
        let filteredEventsProps = this.state.allEventsProps

        this.state.filteredEvents.forEach((event) => {
            if (event.cost === 'Free') {
                freeArrayFilteredEvents.push(event)
            }
            if (event.cost === '$0') {
                freeArrayFilteredEvents.push(event)
            }

        }, this.setState({
            filteredEvents: freeArrayFilteredEvents
        }))

        filteredEventsProps.forEach((event) => {
            if (event.cost === 'Free') {
                freeArrayFilteredEventsProps.push(event)
            }
            if (event.cost === '$0') {
                freeArrayFilteredEventsProps.push(event)
            }

        }, this.setState({
            allEventsProps: freeArrayFilteredEventsProps
        }))



        this.state.danceTypeFilterProps.forEach((event) => {
            if (event.cost === 'Free') {
                freedanceTypeFilterProps.push(event)
            }
            if (event.cost === '$0') {
                freedanceTypeFilterProps.push(event)
            }

        }, this.setState({
            danceTypeFilterProps: freedanceTypeFilterProps
        }))


        this.state.danceTypeFilter.forEach((event) => {
            if (event.cost === 'Free') {
                freedanceTypeFilter.push(event)
            }
            if (event.cost === '$0') {
                freedanceTypeFilter.push(event)
            }

        }, this.setState({
            danceTypeFilter: freedanceTypeFilter
        }))



    }



    sortByPricePaid = () => {
        let freeArrayFilteredEvents = []
        let freeArrayFilteredEventsProps = []
        let freedanceTypeFilterProps = []
        let freedanceTypeFilter = []
        let filteredEventsProps = this.state.allEventsProps

        console.log('sortByPaid has been triggered')

        this.state.filteredEvents.forEach((event) => {
            if (event.cost !== 'Free') {

                freeArrayFilteredEvents.push(event)
            }

        }, this.setState({
            filteredEvents: freeArrayFilteredEvents
        }))

        filteredEventsProps.forEach((event) => {
            if(event.cost !== 'Free'){
                freeArrayFilteredEventsProps.push(event)
            }
             

        }, this.setState({
            allEventsProps: freeArrayFilteredEventsProps
        }))



        this.state.danceTypeFilterProps.forEach((event) => {
            if(event.cost !== 'Free'){
                freedanceTypeFilterProps.push(event)
            }
            

        }, this.setState({
            danceTypeFilterProps: freedanceTypeFilterProps
        }))


        this.state.danceTypeFilter.forEach((event) => {
            if(event.cost !== 'Free'){
                freedanceTypeFilter.push(event)
            }
            

        }, this.setState({
            danceTypeFilter: freedanceTypeFilter
        }))



    }


    // Sort by type functions end

    // Click on card function

    clickOnCard = (singlEvent) => {

        this.props.history.history.push('/event-page', singlEvent)

    }
    
    
    
    // Click on card function end



    render() {




        console.log(this.props)
        console.log(this.state)
        const { searchText } = this.state
        let filteredEventsVar = this.state.filteredEvents
        let filteredEventsProps = this.state.allEventsProps
        let danceTypeFilterProps = this.state.danceTypeFilterProps
        let danceTypeFilter = this.state.danceTypeFilter
       


        return (

            <div className='search-results-item'>
                <div className='search-results-item-child'>

                    {/* working on this area */}


                    <form className='search-results-item-child-form' onSubmit={(e) => { this.search(e) }}>
                        <input className='search-results-item-input' placeholder='City' type='text' value={searchText} onChange={this.onTextChanged} />
                        <DatePicker className='search-results-item-input' selected={this.state.startDate} onChange={(date) => this.handleChangeDate(date)} />
                        <button className='search-results-item-btn'>Search!</button>
                    </form>

                    {/* working on this area */}

                    <div className='search-results-item-input-suggestions-box'>

                        {this.renderSuggestions()}

                    </div>

                    <div className='search-results-item-results-and-sort-by-container'>

                        <div className='search-results-item-results-and-sort-by-container-sort-by'>

                            <div className='search-results-divider'>
                                <h3>Sort by</h3>
                            </div>

                            <div className='search-results-type-of-dance'>
                                <h4 style={{ marginBottom: '20px', marginTop: '10px' }}>Type of dance</h4>
                                <div>
                                    <input className="search-results-input" type="radio" value="all" name="gender" onChange={() => { this.setState({ sortBySwich: false }) }} />
                                    <span className='search-results-label'> Show All </span>
                                    <br />
                                    <input className="search-results-input" type="radio" value="salsa" name="gender" onChange={() => { this.setState({ danceTypeFilterKeyword: 'salsa' }, () => { this.sortByType() }) }} />
                                    <span className='search-results-label'> Salsa </span>
                                    <br />
                                    <input className="search-results-input" type="radio" value="bachata" name="gender" onChange={() => { this.setState({ danceTypeFilterKeyword: 'bachata' }, () => { this.sortByType() }) }} />
                                    <span className='search-results-label'> Bachata </span>
                                    <br />
                                    <input className="search-results-input" type="radio" value="merengue" name="gender" onChange={() => { this.setState({ danceTypeFilterKeyword: 'merengue' }, () => { this.sortByType() }) }} />
                                    <span className='search-results-label'> Merengue</span>
                                    <br />
                                    <input className="search-results-input" type="radio" value="tango" name="gender" onChange={() => { this.setState({ danceTypeFilterKeyword: 'tango' }, () => { this.sortByType() }) }} />
                                    <span className='search-results-label'> Tango </span>
                                    <br />
                                    <input className="search-results-input" type="radio" value="ballroom" name="gender" onChange={() => { this.setState({ danceTypeFilterKeyword: 'ballroom' }, () => { this.sortByType() }) }} />
                                    <span className='search-results-label'> Ballroom </span>
                                    <br />
                                    <input className="search-results-input" type="radio" value="cumbia" name="gender" onChange={() => { this.setState({ danceTypeFilterKeyword: 'cumbia' }, () => { this.sortByType() }) }} />
                                    <span className='search-results-label'> Cumbia </span>
                                    <br />
                                    <input className="search-results-input" type="radio" value="cumbia" name="gender" onChange={() => { this.setState({ danceTypeFilterKeyword: 'general' }, () => { this.sortByType() }) }} />
                                    <span className='search-results-label'> Other Styles </span>
                                </div>
                            </div>


                            <div className='search-results-divider'>

                            </div>

                            <div className='search-results-type-of-dance'>
                                <h4 style={{ marginBottom: '20px', marginTop: '10px' }}>Price</h4>
                                <input className="search-results-input" type="radio" value="Free" name="cost" onChange={() => { this.setState({ sortByPriceKeyword: 'Free' }, () => { this.sortByPriceFree() }) }} />
                                <span className='search-results-label'> Free </span>
                                <br />
                                <input className="search-results-input" type="radio" value="Paid" name="cost" onChange={() => { this.setState({ sortByPriceKeyword: 'Paid' }, () => { this.sortByPricePaid() }) }} />
                                <span className='search-results-label'> Paid </span>

                            </div>

                        </div>


                        <div className="search-results-item-results-and-sort-by-container-results-main">





                            {this.state.newSearch ? (
                                <>



                                    {!this.state.sortBySwich ? (
                                        <>
                                            {this.renderCardNewSearch(filteredEventsVar)}
                                        </>

                                    ) : (


                                            <>
                                                {this.renderCardNewSearch(danceTypeFilter)}
                                            </>

                                        )}


                                </>
                            ) : (

                                    <>
                                        {!this.state.sortBySwich ? (
                                            <>
                                                {this.renderCard(filteredEventsProps)}
                                            </>

                                        ) : (


                                                <>
                                                    {this.renderCard(danceTypeFilterProps)}
                                                </>

                                            )}
                                    </>

                                )}



                        </div>

                    </div>
                </div>



            </div>

        );
    }
}

export default SearchResults;