import React, { Component } from 'react';
//import styles from './Doughnut.module.scss';
import styles from '../../charts/Charts.module.scss';
import { observer } from 'mobx-react';
import { Doughnut } from 'react-chartjs-2';


@observer
class DoughnutChart extends Component{

    render() {
        return (
            <div className={styles.chartCard + ' ' + styles.w100}>
                <div className={styles.chartHeader}>{this.props.title}</div>
                <div className={styles.chartBody}>
                    <div className={styles.columnLeft}>
                        <Doughnut data={this.props.data} options={this.props.option}/>
                    </div>
                    <div className={styles.columnRight}>
                        <div className={styles.gridContainer}>
                            {this.props.data.labels.map((item, index) => {
                                return (
                                    <div key={`row-${index}`}>
                                        <div className={styles.libelle}>
                                            {item}
                                        </div>
                                        <div className={styles.tonnage}>
                                            {this.props.data.datasets[0].data[index]}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>                  
                </div>
            </div>            
        );
    }

}
export default DoughnutChart;