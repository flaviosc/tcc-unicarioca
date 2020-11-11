import Phaser from 'phaser';

const formatScore = (score, playerName) => `${playerName}: ${score}`;

export default class ScoreLabel extends Phaser.GameObjects.Text
{
    constructor(scene, x, y, score, playerName, style){
      super(scene, x, y, formatScore(score, playerName), style)
      this.score = score;
      this.playerName = playerName;
    }

    setScore(score){
      this.score = score;
      this.updateScoreText();
    }

    add(points){
      this.setScore(this.score + points);
    }

    updateScoreText(){
      this.setText(formatScore(this.score, this.playerName));
    }
}