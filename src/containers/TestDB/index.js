import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.scss';
import { BarChart } from 'components/BarChart';
import * as actionCreators1 from 'actions/charts';
import * as actionCreators2 from 'actions/survey';
import { Header } from 'components/Header';


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

    submitData = (event) => {
    	
    };

    handleChange = (event) => {
		this.props.surveyAction.dumpCSV(event.target.value);
	};

    render() {
        const chartStyle = {
            height: '250px',
        };

        return (
            <section>
                <Header />
    			<div className='container'>
    			    <div className='row-fluid'>
    			        <h5>Enter the copied excel data </h5>
    			        <div>
    			            <textarea id='txtDataPayload' ref='txtDataPayload' onChange={this.handleChange} value={this.props.survey.csvDump} defaultValue='' />
    			        </div>
    			    </div>
    			    <div className='row-fluid'>
    			        <button ref="btnRenderSampleChart" className='btn btn-primary' onClick={this.renderSampleChart}>Sample Chart</button> &nbsp;
    			        <button ref="btnGet" className='btn btn-primary' onClick={this.renderSampleChart2}>Sample Chart2</button> &nbsp;
    			        <button ref="btnSubmitData" className='btn btn-success' onClick={this.submitData}>Submit</button>
    			    </div>
    			    <div className='row-fluid'>
    			        <BarChart barChart={this.props.charts.barChart} />
    			    </div>
    			</div>
            </section>
        );
    }
}
