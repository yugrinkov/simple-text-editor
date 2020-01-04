export default function getSynomyms(word) {
  return new Promise(function(resolve, reject) {
    if (!word) reject(new Error());
    window
      .fetch("https://api.datamuse.com/words?ml=" + word)
      .then(response => response.json())
      .then(words => {
        const synonyms = words.filter(
          word => word.tags && word.tags.indexOf("syn") !== -1
        );
        resolve(synonyms.slice(0, 3));
      });
  });
}
