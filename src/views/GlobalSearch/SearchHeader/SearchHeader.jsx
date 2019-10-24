import React, { Component } from 'react';
import styles from './SearchHeader.module.scss';



class SearchHeader extends Component {
  render() {
    const { text, searchView, show } = this.props;
    return (
      <p hidden={show || false} className={styles.SearchHeader}>{text} <span>{searchView}</span></p>
    );
  }
}

export default SearchHeader;
