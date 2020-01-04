export default class TextModel {
  constructor(text) {
    if (!TextModel.instance) {
      this.wordsCollection = [];
      this.text = text;
      TextModel.instance = this;
    }

    return TextModel.instance;
  }

  initialize() {
    this.buildWordsCollection();

    return this;
  }

  buildWordsCollection() {
    const words = this.getWords();

    this.wordsCollection = words.map(word => {
      const matchSpecialChars = word.match(/\W+/);
      let text = word;
      let specialChars;

      if (matchSpecialChars) {
        text = word.slice(0, word.length - 1);
        specialChars = matchSpecialChars[0];
      }

      return {
        text,
        specialChars,
        rules: []
      };
    });
  }

  getWordModel(wordPosition) {
    return this.wordsCollection[wordPosition];
  }

  setWordModelRules(wordPosition, command) {
    const targetWordModel = this.getWordModel(wordPosition);
    if (targetWordModel) {
      this.wordsCollection[wordPosition] = {
        ...this.wordsCollection[wordPosition],
        rules: this.getUpdatedWordRules(targetWordModel.rules, command)
      };
    }

    return this;
  }

  getSynonymWordModelsForReplacement(chunks, rules) {
    let models = [];
    for (let i = 0; i < chunks.length; i++) {
      models.push({
        text: chunks[i],
        rules
      });
    }
    return models;
  }

  setWordModelText(wordPosition, word) {
    const targetWordModel = this.getWordModel(wordPosition);

    if (targetWordModel) {
      const synonymChunks = word.split(" ");
      const wordLength = synonymChunks.length;

      if (wordLength > 1) {
        const synonymsWords = this.getSynonymWordModelsForReplacement(
          synonymChunks,
          targetWordModel.rules
        );
        this.wordsCollection.splice(wordPosition, 1, ...synonymsWords);
      } else {
        this.wordsCollection[wordPosition] = {
          ...this.wordsCollection[wordPosition],
          text: word
        };
      }
    }

    return this;
  }

  getUpdatedWordRules(rules, command) {
    let result = [...rules];
    const indexOf = rules.indexOf(command);
    if (indexOf !== -1) {
      result.splice(indexOf, 1);
    } else {
      result = [...result, command];
    }
    return result;
  }

  getWords() {
    return this.text && this.text.split(" ");
  }

  getWordsCollection() {
    return this.wordsCollection;
  }
}
