import React, { Component } from 'react';
import { BarChart } from 'react-d3';


export class BarChartWrapper extends Component {

    static propTypes = {
        barChart: React.PropTypes.array,
        title: React.PropTypes.string,
        color: React.PropTypes.string,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        id: React.PropTypes.string,
        yAxisTickCount: React.PropTypes.number,
    };

    componentDidMount() {

    };

    initChart() {
        if (!!this.props.barChart && this.props.barChart[0].values.length > 1) {
            return ( <BarChart
				data={this.props.barChart}
				width={this.props.width || 800}
				height={this.props.height || 200}
				fill={this.props.color || '#3182bd'}
                yAxisTickCount={this.props.yAxisTickCount || 5}
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
