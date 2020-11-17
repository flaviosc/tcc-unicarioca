import Phaser from 'phaser';

const formatScore = (score, playerName) => `${playerName}: ${score}`;

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

    setScore(score){
      this.score = score;
      this.updateScoreText();
    }

    add(points){
      this.setScore(this.score + points);
    }

    updateScoreText(){
      this.setText(formatScore(this.score));
    }
}