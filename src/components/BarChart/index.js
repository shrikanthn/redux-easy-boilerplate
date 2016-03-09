import React, { Component } from 'react';
import * as D3 from 'react-d3';


export class BarChart extends Component {

    static propTypes = {
        barChart: React.PropTypes.array,
    };

    initChart() {
        if (!!this.props.barChart && this.props.barChart.length > 1) {
            return ( <D3.BarChart
				data={this.props.barChart}
				width={400}
				height={200}
				fill={'#3182bd'}
				title='Bar Chart' />)
        } else {
            return
        }
    }

    render() {
        const chartStyle = {
            height: '250px',
        };
        return (
            <div id="myfirstchart" ref="myfirstchart" style={chartStyle}>
			{this.initChart()}
        	</div>
        );
    }
}
