import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';
import UiImage from '../ui/UiImage';

const PANEL_DIALOG = 'panel1';
const PANEL_LEVEL = 'panel3';
const GIRL_PLAYER = 'girlplayer';
const BOY_PLAYER = 'boyplayer';

export default class LevelModal extends Phaser.Scene
{
  /** @type {number} **/
  gameLevel;

  constructor(){
    super('level-modal');
  }
  
  init(data) {
    this.gameLevel = data.gameLevel;
    this.characterSelected = data.characterSelected;
  }

  preload() {
    this.load.image(PANEL_LEVEL, 'assets/panel_3.png');
  }
    
  create()
  {
    const width = this.scale.width;
    const height = this.scale.height;    

    this.levelContainer = this.add.container(width + 400, height * 0.5);

    const panel = this.add.nineslice(0, 0, width * 0.4, height * 0.4, PANEL_DIALOG, 24).setOrigin(0.5);        
    this.levelContainer.add(panel); 
    
    let finalImagePlayer;
    if(this.characterSelected == GIRL_PLAYER) {
        finalImagePlayer = new UiImage(this, 0, -62, GIRL_PLAYER)
        .setOrigin(0.5);
        this.levelContainer.add(finalImagePlayer);

    } else if (this.characterSelected == BOY_PLAYER) {
        finalImagePlayer = new UiImage(this, 0, -62, BOY_PLAYER)
        .setOrigin(0.5);
        this.levelContainer.add(finalImagePlayer);

    }   

    if(this.gameLevel === 1) {
        const bodyTitle = new TextLabel(this, 0, -120, 'Nível 1', { fontFamily: 'Comic Sans MS', fontSize: '34px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width / 2 } })
        .setOrigin(0.5);    
        const bodyText = new TextLabel(this, 0, 60, 'Vamos ajudar nossos amiguinhos a reconhecer os sentimentos e emoções?', { fontFamily: 'Comic Sans MS', fontSize: '30px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: 400 } })
        .setOrigin(0.5);    

        this.levelContainer.add(bodyTitle);
        this.levelContainer.add(bodyText);
    }

    if(this.gameLevel === 2) {
        const bodyTitle = new TextLabel(this, 0, -120, 'Nível 2', { fontFamily: 'Comic Sans MS', fontSize: '34px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width / 2 } })
        .setOrigin(0.5);
        const bodyText = new TextLabel(this, 0, 60, 'Vamos ajudar nossos amiguinhos a solucionar os problemas?', { fontFamily: 'Comic Sans MS', fontSize: '30px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: 400 } })
        .setOrigin(0.5);   

        this.levelContainer.add(bodyTitle);
        this.levelContainer.add(bodyText);
    }

    if(this.gameLevel === 3) {
        const bodyTitle = new TextLabel(this, 0, -120, 'Nível 3', { fontFamily: 'Comic Sans MS', fontSize: '34px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width / 2 } })
        .setOrigin(0.5);    
        const bodyText = new TextLabel(this, 0, 70, 'Vamos ajudar nossos amiguinhos pensando como se estivessemos no lugar deles?', { fontFamily: 'Comic Sans MS', fontSize: '30px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: 400 } })
        .setOrigin(0.5);   

        this.levelContainer.add(bodyTitle);
        this.levelContainer.add(bodyText);
    }

    this.tweens.add({
        targets: this.levelContainer,
        x: width * 0.5,
        duration: 800,
        ease: Phaser.Math.Easing.Sine.InOut

    });  
    
    
    setTimeout(() => {
        this.tweens.add({
            targets: this.levelContainer,
            x: width + 400,
            duration: 800,
            ease: Phaser.Math.Easing.Sine.InOut
          });  
    }, 4000);
  }
}
