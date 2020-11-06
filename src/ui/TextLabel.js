import Phaser from 'phaser';

export default class ContentLabel extends Phaser.GameObjects.Text
{
    constructor(scene, x, y, contentText, style){
      super(scene, x, y, contentText, style)
      this.contentText = contentText;
    }

    setScore(contentText){
      this.contentText = contentText;
      this.updateContentLabel();
    }

    updateContentLabel(){
      this.setText(this.contentText);
    }
}