import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BarChart } from 'components/BarChart';
import { DropDown } from 'components/DropDown';
import * as actionCreators from 'actions/survey';
import * as D3 from 'react-d3';
import { Header } from 'components/Header';
import './style.scss';

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
export class SurveyResults extends Component {
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

    setCurrentSprint(obj) {
        if (!!obj && !!obj.newValue) {
            this.props.surveyAction.setCurrentSprint(obj.newValue);
            this.props.surveyAction.receiveAnswers(obj.newValue, [{ a1:0, a2:0, a3:0, a4:0, ts:0}]);
        }
    };

    renderDropDown() {
        return (
            <div className='col-md-4'>
                <div className='col-md-3'>
                    <label>Current Survey</label>
                </div>
                <div className='col-md-7'>
                    <DropDown id='myDropdown'
                        labelField='survey_date'
                        valueField='survey_date'
                        onChange={this.setCurrentSprint.bind(this)} />
                </div>
            </div>
        )
    };

    getCurrentSurveyAnswers = (event) => {
        this.props.surveyAction.fetchAnswerForSurvey(this.props.survey.currentSprint);
    };

    processDataForLineChart() {
        let data = [];
        for (let i in this.props.survey.answers) {
            let obj1 = this.props.survey.answers[i];
            data.push({
                name: "person" + i,
                values: [
                    { x: 10, y: obj1.a1 },
                    { x: 20, y: obj1.a2 },
                    { x: 30, y: obj1.a3 },
                    { x: 40, y: obj1.a4 },
                 ]
            });
        }
        return data;
    };

    renderCurrentSurveyChart() {
        if (!this.props.survey.answers || this.props.survey.answers.length < 2) {
            return <span />
        }
        return (
            <div className='row-fluid' id='currentSprintPerformance'>
                <h3>Sprint Performance for {this.props.survey.currentSprint}</h3>
                <div className='row-fluid'>
                    <D3.LineChart
                      legend={true}
                      data={this.processDataForLineChart()}
                      width={800}
                      height={300}
                      title=""
                    />
                </div>
                <div className='row-fluid'>
                    <table id='tblLegend'>
                        <tbody>
                        <tr>
                            <td>10 = fun</td>
                            <td>20 = personal performance</td>
                            <td>30 = planning</td>
                            <td>40 = focus</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    };

    formatDataForBarChart(obj) {
        let arr = [];
        arr.push({ label: 'fun', value: obj.a1 });
        arr.push({ label: 'perf', value: obj.a2 });
        arr.push({ label: 'plan', value: obj.a3 });
        arr.push({ label: 'focus', value: obj.a4 });
        arr.push({ label: 'scale', value: 10 });
        return arr;
    };

    getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    renderIndividualBarChart(color, title, data, width) {
        return (
            <div className='col-md-4'>
                <BarChart title={title} color={color} id={title} width={width} 
                    barChart={data} />
            </div>
        )
    };

    renderBarCharts() {
        if (!!this.props.survey.answers && this.props.survey.answers.length < 2) {
            return <span />
        }
        let index = 0;
        let self = this;
        const width = 300;
        return this.props.survey.answers.map(function(answer) {
            return self.renderIndividualBarChart(
                self.getRandomColor(), 
                ('Person' + index++),
                self.formatDataForBarChart(answer),
                width
            )
        })
    };

    render() {
        return (
            <section>
                <Header />
                <div className='container'>
                    <div className='row-fluid'>
                        <button ref="btnTeamAverages" className='btn btn-success' onClick={this.getCurrentSurveyAnswers}>Individual Answers</button>
                        {this.renderDropDown()}
                    </div>
                    {this.renderCurrentSurveyChart()}
                    <div className='row-fluid'> {this.renderBarCharts()} </div>
                </div>
            </section>
        );
    }
}
