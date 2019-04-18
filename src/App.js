import React, {Component} from 'react';
import './App.scss';
import SearchForm from './Components/SearchForm/SearchForm';
import ResultsContainer from './Components/ResultContainer/ResultContainer';

// This App component is our single source of truth(TM) for our API data
// Our fetched API data is stored here in state: [itemList]
export default class App extends Component {
  constructor(){
    super();
    this.state = {
      isDisabled : false,
      itemList : [],
      total_count : false
    }
  }
  handleFormSubmit = (queryData) => {
    // build a string compatable with the github search API
    // EXAMPLE: ?q=react+stars:>200+license:gpl+fork:true
    let queryString = `?q=${queryData.q}+stars:${queryData.stars}+license:${queryData.license}`;        
    if (queryData.fork) queryString += '+fork:true';
    this.setState({isDisabled : true, total_count:false}, ()=> {
      const API_URL = 'https://api.github.com/search/repositories';
      fetch(API_URL + queryString)
        .then(response => response.json())
        .then(payload => {
          const state = {isDisabled:false};
          // CATCH and Alert any errors from API
          if (payload.errors) {
            payload.errors.map(error=>alert(error.message));
          } else {
            state.itemList = payload.items;
            state.total_count = payload.total_count
          }
          this.setState(state);
        })
    });
  }
 render() {
   return (
    <div className="App">
      <header>
        <div className="logo">even</div>
      </header>
        <SearchForm 
          handleFormSubmit={this.handleFormSubmit}
          disableBtn={this.state.isDisabled} />
        <div className="container">
          { this.state.isDisabled ? (
            <div className="loadingMessage">loading...</div>
          ):(
            <ResultsContainer 
              isEmpty={this.state.total_count === 0} 
              itemList={this.state.itemList} />
          )}
        </div>
    </div>
   )
 }
}



