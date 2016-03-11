import React, { Component } from 'react';
import * as D3 from 'react-d3';


export class BarChart extends Component {

    static propTypes = {
        barChart: React.PropTypes.array,
        title: React.PropTypes.string,
        color: React.PropTypes.string,
        width: React.PropTypes.number,
        id: React.PropTypes.string,
    };

    initChart() {
        if (!!this.props.barChart && this.props.barChart.length > 1) {

            return ( <D3.BarChart
				data={this.props.barChart}
				width={this.props.width || 800}
				height={200}
				fill={this.props.color || '#3182bd'}
				title={this.props.title || 'Bar Chart'} />)
        } else {
            return
        }
    }

    render() {
        const chartStyle = {
            height: '250px',
            'margin-top': '30px',
        };
        const chartId = this.props.id || "barChart";
        return (
            <div id={chartId} ref={chartId} style={chartStyle}>
			{this.initChart()}
        	</div>
        );
    }
}
