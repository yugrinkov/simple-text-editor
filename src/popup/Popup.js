import React, { Component } from "react";
import ControlPanel from "../control-panel/ControlPanel";
import "./Popup.css";

class Popup extends Component {
  onSynClick(event) {
    event.preventDefault();
    this.props.onSelectedSyn &&
      this.props.onSelectedSyn(event.target.innerText);
  }

  render() {
    const {
      popupCoordinates,
      selectedWord,
      onSelectedCommand,
      synonyms
    } = this.props;
    return (
      <div
        className="popup"
        style={{
          top: popupCoordinates[1],
          left: popupCoordinates[0]
        }}
      >
        <ControlPanel
          selectedWord={selectedWord}
          onSelectedCommand={onSelectedCommand}
        />
        {synonyms.length > 0 &&
          synonyms.map(syn => (
            <div key={syn.word}>
              <a onClick={this.onSynClick.bind(this)} href="/">
                {syn.word}
              </a>
            </div>
          ))}
      </div>
    );
  }
}

export default Popup;
