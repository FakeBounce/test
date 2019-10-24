import React, { Component } from 'react';
import styles from '../../charts/Charts.module.scss';
import { observer } from 'mobx-react';
import { Bar } from 'react-chartjs-2';


@observer
class BarChart extends Component{

    render() {
        return (
            <div className={styles.chartCard + ' ' + styles.pullRight}>
                <div className={styles.chartHeader}>{this.props.title}</div>
                <div className={styles.chartBody}>
                    <Bar data={this.props.data} options={this.props.option}/>
                </div>
            </div>            
        );
    }

}
export default BarChart;