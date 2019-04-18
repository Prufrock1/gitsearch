import React  from 'react';
import './Item.scss';

function Item(props){
  const {full_name, description, fork, stargazers_count,license, html_url} = props.item;
  console.log(props.item);
  return (
    <div className="Item">
      <div className="col1">
        <b><a href={html_url}>{full_name}</a></b>
        <div>{description}</div> 
        {fork && <div className="forkedBadge">forked</div>}
      </div>
      <div className="col2">
        <span>Stars:</span>
        <span><b>{stargazers_count}</b></span>
      </div>
      <div className="col3">
        <span>License:</span>
        <span><b>{license.name}</b></span>
      </div>
    </div>  
  )
}

export default Item;


