import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BarChart } from 'components/BarChart';
import { DropDown } from 'components/DropDown';
import * as actionCreators from 'actions/survey';
import * as D3 from 'react-d3';
import { Header } from 'components/Header';

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
export class TeamAverage extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        dispatch: React.PropTypes.func,
        survey: React.PropTypes.object,
        surveyAction: React.PropTypes.object,
    };

    componentDidMount() {
    	
    };

    getTeamAverages = (event) => {
        this.props.surveyAction.fetchAverages({});
    };

	formatDataForBarChart(key) {
		let arr = [];
		if (!!this.props.survey.averages && this.props.survey.averages.length > 1) {
			for (var i in this.props.survey.averages) {
				let obj1 = this.props.survey.averages[i];
				arr.push({ label: obj1.ts, value: obj1[key] });
			}
		}
		return arr;
	};

    renderBarCharts() {
        if (!this.props.survey.averages || this.props.survey.averages.length < 2) {
            return <span />
        }
        return (
            <div className='row-fluid'>
                <div className='row-fluid'>
                    <BarChart title='Fun' color='#93B69A' id='funChart' width={800}
                        barChart={this.formatDataForBarChart('a1')} />
                </div>
                <div className='row-fluid'>
                    <BarChart title='Focus' color='#F78F20' id='focusChart'
                        barChart={this.formatDataForBarChart('a4')} />
                </div>
                <div className='row-fluid'>
                    <BarChart title='Performance' color='#1F5463' id='performanceChart'
                        barChart={this.formatDataForBarChart('a2')} />
                </div>
                <div className='row-fluid'>
                    <BarChart title='Planning' id='planningChart'
                        barChart={this.formatDataForBarChart('a3')} />
                </div>
            </div>
        )
    };

    render() {
        return (
            <section>
                <Header />
                <div className='container'>
                    <div className='row-fluid'>
                        <button ref="btnTeamAverages" className='btn btn-primary' onClick={this.getTeamAverages}>Load Team Averages</button> &nbsp;
                    </div>
                    {this.renderBarCharts()}
                </div>
            </section>
        );
    }
}
