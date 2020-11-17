import Phaser from 'phaser';

const checkScorePlayerName = (score, playerName)  => {
  if(playerName == '' || playerName == LABEL_DEFAULT) {
    return `Pontuação: ${score}`;
  } else {
    return `${playerName}: ${score}`;
  }
}

const LABEL_DEFAULT = 'Digite aqui...';

export default class ScoreLabel extends Phaser.GameObjects.Text
{
    constructor(scene, x, y, score, playerName, style){
      super(scene, x, y, checkScorePlayerName(score, playerName), style)
      this.score = score;
    }

    setScore(score, playerName){
      this.score = score;
      this.updateScoreText(playerName);
    }

    add(points, playerName){
      const newScore = this.score + points;
      this.setScore(newScore, playerName);
      return newScore;
    }

    updateScoreText(playerName){
      this.setText(checkScorePlayerName(this.score, playerName));
    }
}