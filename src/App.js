import React, { Component } from "react";
import "./App.css";
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import Popup from "./popup/Popup";
import OutsideAlerter from "./popup/OutsideAlerter";
import getMockText from "./text.service";
import getSynonyms from "./synonyms.service";
import TextModel from "./classes/TextModel";

class App extends Component {
  state = {
    text: "",
    words: [],
    selectedWord: {},
    selectedWordPosition: null,
    showPopup: false,
    popupCoordinates: [0, 0],
    synonyms: []
  };

  async getText() {
    const text = await getMockText();
    return text;
  }

  async fetchSynonyms(word) {
    const synonyms = await getSynonyms(word);
    this.setState({ synonyms });
  }

  initText(text) {
    const textModel = new TextModel(text);
    const words = textModel.initialize().getWordsCollection();
    this.setState({ words });
  }

  getActualSelectedWordModel(position) {
    return new TextModel().getWordModel(position);
  }

  getActualWordsCollection(selectedWordPosition, command) {
    return new TextModel()
      .setWordModelRules(selectedWordPosition, command)
      .getWordsCollection();
  }

  onSelectedCommand(command) {
    const { selectedWordPosition } = this.state;
    const words = this.getActualWordsCollection(selectedWordPosition, command);
    const selectedWord = this.getActualSelectedWordModel(selectedWordPosition);

    this.setState({ words, selectedWord });
  }

  async onSelectedWord(wordPosition, event) {
    const popupOffset = 20;
    const selectedWord = this.getActualSelectedWordModel(wordPosition);
    this.fetchSynonyms(selectedWord.text);

    this.setState({
      selectedWord,
      selectedWordPosition: wordPosition,
      popupCoordinates: [
        event.clientX + popupOffset,
        event.clientY + popupOffset
      ],
      showPopup: true,
      synonyms: []
    });
  }

  onSelectedSyn(synWord) {
    const words = new TextModel()
      .setWordModelText(this.state.selectedWordPosition, synWord)
      .getWordsCollection();

    this.setState({ words });
  }

  resetSelection() {
    this.setState({
      showPopup: false,
      selectedWord: {}
    });
  }

  async componentDidMount() {
    const text = await getMockText();
    this.initText(text);
  }

  render() {
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <ControlPanel
            selectedWord={this.state.selectedWord}
            onSelectedCommand={this.onSelectedCommand.bind(this)}
          />
          <FileZone
            words={this.state.words}
            selectedWord={this.state.selectedWord}
            onSelectedWord={this.onSelectedWord.bind(this)}
          />
          {this.state.showPopup && (
            <OutsideAlerter callback={this.resetSelection.bind(this)}>
              <Popup
                popupCoordinates={this.state.popupCoordinates}
                selectedWord={this.state.selectedWord}
                onSelectedCommand={this.onSelectedCommand.bind(this)}
                onSelectedSyn={this.onSelectedSyn.bind(this)}
                synonyms={this.state.synonyms}
              />
            </OutsideAlerter>
          )}
        </main>
      </div>
    );
  }
}

export default App;
