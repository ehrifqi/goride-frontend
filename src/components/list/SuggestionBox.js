import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './SuggetionBox.css';

const SuggestionBox = props => {
  const mapSuggestionsToBox = () => {
    const { suggestions } = props;

    if (suggestions !== undefined) {
      return suggestions.map(suggestion => {
        return (
          <div className="item" key={suggestion.id}>
            <i className={`large ${props.iconClass} middle aligned icon`}></i>
            <div className="content">
              <a className="header">{suggestion.header}</a>
              <div className="description">{suggestion.description}</div>
            </div>
          </div>
        )
      });
    }
  }

  if (props.suggestions !== undefined) {
    return (
      <div className="ui relaxed divided list">
        {mapSuggestionsToBox()}
      </div>
    )
  }
  else{
    return (
      <div></div>
    )
  }
}

SuggestionBox.propTypes = {
  suggestions: PropTypes.array,
  iconClass: PropTypes.string.isRequired 
  //[{header, description, id}]
}

export default SuggestionBox;