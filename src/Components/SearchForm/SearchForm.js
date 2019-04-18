import React  from 'react';
import ReactQueryParams from 'react-query-params';
import './SearchForm.scss';
export default class SearchForm extends ReactQueryParams {
  constructor(props){
    super(props);
    // we can get inital input field values from our query params
    const { q, stars, license, fork } = this.queryParams;
    // we are using controlled inputs therefore we have to
    // set state to a string (not the falsy we get from queryParams plugin) 
    this.state = {
      q  : (q) ? q : '',
      stars: (stars) ? stars : '',
      license: (license) ? license : '',
      fork : (fork) ? true : false
    }
  }
  handleForkToggle  = () => this.setState({fork: !this.state.fork});
  handleUpdate = e => this.setState({[e.target.name]:e.target.value});
  formSubmit = e => {    
    e.preventDefault();
    // a simple validation, no blank fields
    for (const key in this.state ) {
        const val = (this.state[key]);
        if (val.length === 0) {
          alert('no blank fields');
          return
        }
    }
    // create a data object to update query params
    // AND send API request
    const formData = {
      q: this.state.q,
      stars: this.state.stars,
      license: this.state.license,
      fork: this.state.fork
    };
    this.setQueryParams(formData);
    this.props.handleFormSubmit(formData);
  }
  render() {
    return (
      <div className="SearchForm">
        <div className="title"><span>Even Financial</span> <span>GitHub Repository Search</span></div>
        <form onSubmit={this.formSubmit}>
          <div className="inputWrapper">
            <div>
              <div>
                <label>Text</label>
                <input onChange={this.handleUpdate} name="q" type="text" value={this.state.q}/>
              </div>
              <div>
                <label>License</label>
                <select onChange={this.handleUpdate} name="license" value={this.state.license}>
                  <option>apache-2.0</option>
                  <option>gpl</option>
                  <option>mit</option>
                </select>
              </div>
            </div>
            <div></div>
            <div>
              <div>
                <label>Stars</label>
                <input onChange={this.handleUpdate} name="stars" type="text" value={decodeURI(this.state.stars)}/>
              </div>
              <div>
                <label>Include Forked</label>
                <input type="checkbox" onChange={this.handleForkToggle} checked={this.state.fork}></input>
              </div>
            </div>
          </div>
          <div className="buttonWrapper">
            <button disabled={this.props.disableBtn}>search</button>
          </div>
          
        </form>
      </div>
    )
  }
}


