import React, { Component } from 'react';
import styles from '../../charts/Charts.module.scss';
import { observer } from 'mobx-react';

@observer
class GridChart extends Component{

    render() {
        return (
            <div className={styles.chartCard + ' ' + styles.sameHeightColumn}>
                <div className={styles.chartHeader}>{this.props.title}</div>
                <div className={styles.chartBody}>
                    <div className={styles.gridContainer}>
                        {this.props.data.labels.map((item, index) => {
                            return (
                                <div key={`row-${index}`}>
                                    <div className={styles.libelle}>
                                        {item}
                                    </div>
                                    <div className={styles.tonnage}>
                                        {this.props.data.ton[index]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>            
        );
    }
}
export default GridChart;