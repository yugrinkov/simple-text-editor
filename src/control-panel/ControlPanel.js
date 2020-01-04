import React, { Component } from "react";
import "./ControlPanel.css";

class ControlPanel extends Component {
  onClickHandler(event) {
    const command = event.target.getAttribute("data-command");
    this.props.onSelectedCommand(command);
  }

  generateClassList(rule) {
    let classes = `format-action ${rule} `;
    let formatClasses =
      this.props.selectedWord &&
      this.props.selectedWord.rules &&
      this.props.selectedWord.rules.indexOf(rule) !== -1
        ? "active"
        : "";
    return classes.concat(formatClasses);
  }

  render() {
    return (
      <div className="control-panel">
        <div className="format-actions">
          <button
            onClick={this.onClickHandler.bind(this)}
            className={this.generateClassList("bold")}
            data-command="bold"
            type="button"
          >
            B
          </button>
          <button
            onClick={this.onClickHandler.bind(this)}
            className={this.generateClassList("italic")}
            data-command="italic"
            type="button"
          >
            I
          </button>
          <button
            onClick={this.onClickHandler.bind(this)}
            className={this.generateClassList("underline")}
            data-command="underline"
            type="button"
          >
            U
          </button>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
