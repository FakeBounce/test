import React, { Component } from 'react';
//import styles from './Doughnut.module.scss';
import styles from '../../charts/Charts.module.scss';
import { observer } from 'mobx-react';
import { HorizontalBar } from 'react-chartjs-2';


@observer
class HorizontalBarChart extends Component{

    render() {
        return (
            <div className={styles.chartCard}>
                <div className={styles.chartHeader}>{this.props.title}</div>
                <div className={styles.chartBody}>
                    <HorizontalBar data={this.props.data} options={this.props.option}/>
                </div>
            </div>            
        );
    }

}
export default HorizontalBarChart;