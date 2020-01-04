import React, { Component } from "react";
import "./FileZone.css";

class FileZone extends Component {
  onDoubleClickHandler = event => {
    const selectedWordPosition = +event.target.getAttribute("data-position");
    this.props.onSelectedWord &&
      this.props.onSelectedWord(selectedWordPosition, event);
  };

  generateClassList = (rules = []) => {
    return rules.map(rule => rule).join(" ");
  };

  renderWord(word, index) {
    return (
      <React.Fragment>
        <span
          className={this.generateClassList(word.rules)}
          onDoubleClick={this.onDoubleClickHandler.bind(this)}
          data-position={index}
        >
          {word.text}
        </span>
        <span>{word.specialChars}</span>
        <span>&nbsp;</span>
      </React.Fragment>
    );
  }

  render() {
    const { words = [] } = this.props;

    return (
      <div id="file-zone">
        <div id="file">
          {words.map((word, index) => (
            <React.Fragment key={index + word.text}>
              {this.renderWord(word, index)}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default FileZone;
