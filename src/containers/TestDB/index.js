import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.scss';

import { BarChart } from 'components/BarChart';

import * as actionCreators1 from 'actions/charts';
import * as actionCreators2 from 'actions/survey';


function mapStateToProps(state) {
	return { 
    	charts: state.charts,
    	survey: state.survey,
    };
}

function mapDispatchToProps(dispatch) {
	return { 
    	chartsAction : bindActionCreators(actionCreators1, dispatch),
    	surveyAction : bindActionCreators(actionCreators2, dispatch),
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class TestDB extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        dispatch: React.PropTypes.func,
        survey: React.PropTypes.object,
        charts: React.PropTypes.object,
        chartsAction: React.PropTypes.object,
        surveyAction: React.PropTypes.object,
    };

    componentDidMount() {
    	
    };

    renderSampleChart = (event) => {
        const sampleData = [
            { label: 45, value: 40 },
            { label: 40, value: 100 },
            { label: 50, value: 40 },
            { label: 75, value: 65 },
            { label: 100, value: 90 },
        ];
        this.props.chartsAction.addBarChartData(sampleData);
    };
    
    renderSampleChart2 = (event) => {
        const sampleData = [
            { label: 50, value: 40 },
            { label: 75, value: 65 },
            { label: 100, value: 90 },
        ];
        this.props.chartsAction.addBarChartData(sampleData);
    };

    getTeamAverages = (event) => {
        this.props.surveyAction.fetchAverages({});
    };

    submitData = (event) => {
    	
    };

    handleChange = (event) => {
		this.props.surveyAction.dumpCSV(event.target.value);
	};

	formatDataForBarChart(key) {
		let arr = [];
		if (!!this.props.survey.answers && this.props.survey.answers.length > 1) {
			for (var i in this.props.survey.answers) {
				let obj1 = this.props.survey.answers[i];
				arr.push({ label: obj1.ts, value: obj1[key] });
			}
		}
		return arr;
	};

    render() {
        const chartStyle = {
            height: '250px',
        };

        return (
			<div className='container'>
			    <div className='row-fluid'>
			        <h5>Enter the copied excel data </h5>
			        <div>
			            <textarea id='txtDataPayload' ref='txtDataPayload' onChange={this.handleChange} value={this.props.survey.csvDump} defaultValue='' />
			        </div>
			    </div>
			    <div className='row-fluid'>
			        <button ref="btnRenderSampleChart" className='btn btn-primary' onClick={this.renderSampleChart}>Sample Chart</button> &nbsp;
			        <button ref="btnTeamAverages" className='btn btn-primary' onClick={this.getTeamAverages}>Team Averages</button> &nbsp;
			        <button ref="btnGet" className='btn btn-primary' onClick={this.renderSampleChart2}>Sample Chart2</button> &nbsp;
			        <button ref="btnSubmitData" className='btn btn-success' onClick={this.submitData}>Submit</button>
			    </div>
			    <div className='row-fluid'>
			        <BarChart barChart={this.props.charts.barChart} />
			    </div>
			    <div className='row-fluid'>
			        <h3>Team Averages</h3>
			        <div className='row-fluid'>
			            <BarChart title='Fun' color='#93B69A' barChart={this.formatDataForBarChart( 'a1')} />
			        </div>
			        <div className='row-fluid'>
			            <BarChart title='Focus' color='#F78F20' barChart={this.formatDataForBarChart( 'a4')} />
			        </div>
			        <div className='row-fluid'>
			            <BarChart title='Performance' color='#1F5463' barChart={this.formatDataForBarChart( 'a2')} />
			        </div>
			        <div className='row-fluid'>
			            <BarChart title='Planning' barChart={this.formatDataForBarChart( 'a3')} />
			        </div>
			    </div>
			</div>
        );
    }
}
