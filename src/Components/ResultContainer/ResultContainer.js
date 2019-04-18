import React  from 'react';
import Item from '../Item/Item';
import './ResultsContainer.scss'

function ResultsContainer(props) {
  const {isEmpty} = props,
        resultsContainsItems = props.itemList.length !== 0;
  return (
    <div className="ResultsContainer">
    {isEmpty ? (
      <div>no results. try a different search</div>
    ) : (
      <div>
        { (resultsContainsItems) ? (
          <React.Fragment>
            <div className="title">SEARCH Results:</div>
            {props.itemList.map( item => 
              <Item key={item.id} item={item} />
            )}
          </React.Fragment>
        ) : (
          <div>Please Enter query and click SEARCH. results appear here</div>
        )}
      </div>
    )}
    </div>
  )
}
export default ResultsContainer;


