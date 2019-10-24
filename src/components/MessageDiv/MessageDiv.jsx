import React from 'react';

const MessageDiv = (props) => {
  if (props.showElement) {
    return (
      <div className={props.styles}>
        {props.children}
      </div>
    );
  } else {
    return (<div />);
  }
};

export default MessageDiv;