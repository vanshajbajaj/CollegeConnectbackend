// get compatibility score
function getCompatibilityScore(userInterests, selfInterests) {
  let score = 0;
  for (let i = 0; i < userInterests.length; i++) {
    const selfInterest = selfInterests.find(
      (interest) =>
        interest.question.toString() === userInterests[i].question.toString()
    );
    if (selfInterest) {
      if (selfInterest.option === userInterests[i].option) {
        score++;
      }
    }
  }

  return Math.round((score / userInterests.length) * 100);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports = {
  getCompatibilityScore,
  shuffleArray,
};
