import Phaser from 'phaser';
import UiImage from '../ui/UiImage';
import TextLabel from '../ui/TextLabel';

const PANEL_DIALOG = 'panel1';
const GIRL_PLAYER = 'girlplayer';
const BOY_PLAYER = 'boyplayer';
const CRATE = 'crate'; 
const BUTTON_KEY = 'button';
const CLICK_SOUND = 'click';

const HEADER_LABEL = 
`Bem-vindo(a) a 
Jornada dos Sentimentos!`;

const BODY_LABEL = 
`Nesta aventura, precisarei de sua ajuda para resolver as surpresas que encontraremos pelo caminho.
Conto com você!`;


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
    this.load.image(BUTTON_KEY, 'assets/button.png');
  }
    
  create()
  {
    const width = this.scale.width;
    const height = this.scale.height;    

    this.container = this.add.container(width * 0.5, height  + 10);
    const panel = this.add.nineslice(0, -10 , width * 0.8, height * 0.9, PANEL_DIALOG, 24).setOrigin(0.5);        

    const homeText = new TextLabel(this, 0, -height * 0.3, HEADER_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width / 2 } })
    .setOrigin(0.5);

    const labelTextBody = new TextLabel(this, 0, height * 0.05, BODY_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '28px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width / 2  }})
    .setOrigin(0.5);

    const girlPlayer = new UiImage(this, -width * 0.18, -height * 0.15, GIRL_PLAYER)
                            .setOrigin(0.5);

    const boyPlayer = new UiImage(this, 0, -height * 0.15, BOY_PLAYER)
                            .setOrigin(0.5);

    const crate = new UiImage(this, width * 0.18, -height * 0.15, CRATE)
                            .setOrigin(0.5);


    const buttonImage = new UiImage(this, 0, height * 0.2, BUTTON_KEY)
                            .setOrigin(0.5)
                            .setInteractive()
                            .on('pointerdown', () => { this.showInputNameModal(); })
                            .on('pointerover', () => { buttonImage.setTint(0xfadcaa); this.sound.play(CLICK_SOUND); })
                            .on('pointerout', () => { buttonImage.clearTint(); });

    const buttonText = new TextLabel(this, 0, height * 0.2, 'Jogar', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 }).setOrigin(0.5);
    

    const buttonRankingImage = new UiImage(this, 0, height * 0.27, BUTTON_KEY)
                            .setOrigin(0.5)
                            .setInteractive()
                            .on('pointerdown', () => { this.showRankingModal(); })
                            .on('pointerover', () => { buttonRankingImage.setTint(0xfadcaa); this.sound.play(CLICK_SOUND); })
                            .on('pointerout', () => { buttonRankingImage.clearTint(); });
    
    const buttonRankingText = new TextLabel(this, 0, height * 0.27, 'Ranking', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 }).setOrigin(0.5);

    const buttonHelpImage = new UiImage(this, 0, height * 0.34, BUTTON_KEY)
    .setOrigin(0.5)
    .setInteractive()
    .on('pointerdown', () => { this.showHelp(); })
    .on('pointerover', () => { buttonHelpImage.setTint(0xfadcaa); this.sound.play(CLICK_SOUND); })
    .on('pointerout', () => { buttonHelpImage.clearTint(); });

    const buttonHelpText = new TextLabel(this, 0, height * 0.34, 'Instruções', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 }).setOrigin(0.5);

    this.container.add(panel);
    this.container.add(homeText);
    this.container.add(labelTextBody);
    this.container.add(buttonImage);
    this.container.add(buttonText);
    this.container.add(girlPlayer);
    this.container.add(boyPlayer);
    this.container.add(crate);
    this.container.add(buttonRankingImage);
    this.container.add(buttonRankingText);
    this.container.add(buttonHelpImage);
    this.container.add(buttonHelpText);

    this.tweens.add({
      targets: this.container,
      y: height * 0.5,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut
    });  
  }


  showInputNameModal() {
    this.scene.stop();
    this.scene.start('input-name-modal');
  }

  showRankingModal() {
    this.scene.stop();
    this.scene.start('ranking-modal');
  }

  showHelp() {
    this.scene.stop();
    this.scene.start('help-modal');
  }
}
