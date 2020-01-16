import React from 'react';
import style from './style';

export class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.isClicked ? 'clicked' : 'not clicked'}</h1>
        <button onClick={this.handleClick} className={style.button}>{this.props.text}</button>
      </div>
    );
  }

  handleClick = () => {
    this.setState({
      isClicked: true,
    });
  }
}
