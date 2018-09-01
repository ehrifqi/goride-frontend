import React, { Component } from 'react'
import PropTypes from 'prop-types';

import SuggestionBox from '../../../components/list/SuggestionBox';

const MapInputs = props => {
  const { from, to, onInputChange, clearInput, onInputBlur, onInputFocus, isFromFocus, isToFocus, fromSuggestions, toSuggestions } = props;
  return (
    <div className="ui segment" style={{ border: '1.5px solid #27ae60', margin: '1rem 4rem' }}>
      <h3 className="ui header">Booking Details</h3>
      <div className="row">
        <div className="col-lg-6">
          {/* FROM INPUT BOX */}
          <div className="ui form">
            <div className="inline fields">
              <div className="fourteen wide field">
                <label htmlFor="from">From</label>
                <div className="ui action input">
                  <input type="text" name="from" placeholder="Search..." onChange={onInputChange} value={props.from} onFocus={onInputFocus} onBlur={onInputBlur} />
                  <button className="ui icon button negative" onClick={() => clearInput("from")} >
                    <i className="trash alternate outline icon"></i>
                  </button>
                </div>
                {isFromFocus &&
                  <section style={{ position: 'absolute', top: '40px', left: '42px' }}>
                    <SuggestionBox
                      suggestions={fromSuggestions}
                      iconClass="map marker alternate"
                    />
                  </section>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          {/* TO INPUT BOX */}
          <div className="ui form">
            <div className="inline fields">
              <div className="fourteen wide field" style={{ position: 'relative' }}>
                <label htmlFor="to">To</label>
                <div className="ui action input">
                  <input type="text" name="to" placeholder="Search..." onChange={onInputChange} value={to} onFocus={onInputFocus} onBlur={onInputBlur} />
                  <button className="ui icon button negative" onClick={() => clearInput("to")}>
                    <i className="trash alternate outline icon"></i>
                  </button>
                </div>
                {isToFocus &&
                  <section style={{ position: 'absolute', top: '40px', left: '25px' }}>
                    <SuggestionBox
                      suggestions={toSuggestions}
                      iconClass="map marker alternate"
                    />
                  </section>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="ui button green">Order</button>
    </div>
  )
}

MapInputs.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
  onInputBlur: PropTypes.func.isRequired,
  isFromFocus: PropTypes.bool.isRequired,
  isToFocus: PropTypes.bool.isRequired,
  fromSuggestions: PropTypes.array,
  toSuggestions: PropTypes.array
}

export default MapInputs