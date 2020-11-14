import Phaser from 'phaser';
import UiImage from '../ui/UiImage';
import TextLabel from '../ui/TextLabel';

const PANEL_DIALOG = 'panel1';
const BUTTON = 'button';

export default class StartModal extends Phaser.Scene

{
  /** @type {Phaser.Scene} */
  gameScene;

	constructor()
	{
    super('start-modal');
	}

  preload() {
    this.load.image(PANEL_DIALOG, 'assets/panel_1.png');
    this.load.image(BUTTON, 'assets/button.png');
  }
    
  create()
  {
    const width = this.scale.width;
    const height = this.scale.height;

    this.container = this.add.container(width * 0.5, 200);
    const panel = this.add.nineslice(width * 0.1, height * 0.05, width * 0.8, height * 0.8, PANEL_DIALOG, 24).setOrigin(0,0);

    const homeText = new TextLabel(this, width * 0.38, height * 0.2, 'Aventuras e Sentimentos', { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10 })

    const girlPlayer = new UiImage(this, width * 0.40, height * 0.35, 'girlplayer')
                            .setOrigin(0)
                            .setSize(500, 200);

    const boyPlayer = new UiImage(this, width * 0.50, height * 0.35, 'boyplayer')
                            .setOrigin(0)
                            .setSize(500, 200);

    const crate = new UiImage(this, width * 0.60, height * 0.39, 'crate')
                            .setOrigin(0)
                            .setSize(500, 200);


    const buttonImage = new UiImage(this, width * 0.45, height * 0.65, BUTTON)
                            .setOrigin(0)
                            .setInteractive()
                            .on('pointerdown', () => { this.showInputNameModal(); })
                            .on('pointerover', () => { buttonImage.setTint(0xfadcaa); })
                            .on('pointerout', () => { buttonImage.clearTint(); });
    
    const buttonText = new TextLabel(this, width * 0.49, height * 0.65, 'Jogar', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 })

    this.add.existing(panel);
    this.add.existing(homeText);
    this.add.existing(buttonImage);
    this.add.existing(girlPlayer);
    this.add.existing(boyPlayer);
    this.add.existing(crate);
    this.add.existing(buttonText);
  
  }

  showInputNameModal() {
    this.scene.stop();
    this.scene.start('input-name-modal');
  }
}
