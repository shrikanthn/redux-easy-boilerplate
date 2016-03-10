import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as D3 from 'react-d3';
import * as actionCreators from 'actions/survey';


function mapStateToProps(state) {
	return { 
		survey: state.survey,
    };
}

function mapDispatchToProps(dispatch) {
	return { 
		surveyAction : bindActionCreators(actionCreators, dispatch),
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class DropDown extends Component {

    static propTypes: {
        id: React.PropTypes.string.isRequired,
        labelField: React.PropTypes.string,
        survey: React.PropTypes.object,
        surveyAction: React.PropTypes.object,
        valueField: React.PropTypes.string,
        labelField: React.PropTypes.string,
    };

    getOptionItems() {
    	const self = this;
    	return self.props.survey.answer_count_per_survey.map(function(option) {
          return( 
          	<option key={option[self.props.valueField]} value={option[self.props.valueField]}>
            	{option[self.props.labelField]}
        	</option>
        	)
        })
    };

    render() {
    	if (this.props.survey.answer_count_per_survey.length < 2) {
    		return <div />
    	}
        return (
            <select id={this.props.id} 
                    className='form-control' 
                    onChange={this.handleChange} >
                {this.getOptionItems()}
            </select>
        )
    };

    handleChange(e) {
        if (this.props.onChange) {
            var change = {
              oldValue: this.state.selected,
              newValue: e.target.value
            }
            this.props.onChange(change);
        }
        alert(e.target.value);
    };
};