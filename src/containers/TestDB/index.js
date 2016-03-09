import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.scss';

import { BarChart } from 'components/BarChart';

import * as actionCreators from 'actions/charts';


@connect(
    state => state.charts,
    dispatch => bindActionCreators(actionCreators, dispatch)
)
export class TestDB extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        dispatch: React.PropTypes.func,
        addBarChartData: React.PropTypes.func,
    };

    renderSampleChart = (event) => {
        const sampleData = [
            { label: 45, value: 40 },
            { label: 40, value: 100 },
            { label: 50, value: 40 },
            { label: 75, value: 65 },
            { label: 100, value: 90 },
        ];
        this.props.addBarChartData(sampleData);
    };
    
    renderSampleChart2 = (event) => {
        const sampleData = [
            { label: 50, value: 40 },
            { label: 75, value: 65 },
            { label: 100, value: 90 },
        ];
        this.props.addBarChartData(sampleData);
    };

    submitData = (event) => {

    	alert('test');

    };

    render() {
        const chartStyle = {
            height: '250px',
        };

        return (
            <div className='container'>
	            <div className='row-fluid'>	            	
		        	<h5>Enter the copied excel data </h5>
		            <div> <textarea id='txtDataPayload' value='' defaultValue=''></textarea> </div>
		        </div>
		        <div className='row-fluid'>
		            <button ref="btnRenderSampleChart" className='btn btn-primary' onClick={this.renderSampleChart}>Sample Chart</button> &nbsp;
		            <button ref="btnRenderSampleChart" className='btn btn-primary' onClick={this.renderSampleChart2}>Sample Chart2</button>  &nbsp;
		            <button ref="btnSubmitData" className='btn btn-success' onClick={this.submitData}>Submit</button>
		        </div>
		        <div className='row-fluid'>
		         	<BarChart {...this.props} />
		        </div>
            </div>
        );
    }
}
