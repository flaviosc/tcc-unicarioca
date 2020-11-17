import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';
import UiImage from '../ui/UiImage';

const PANEL_DIALOG = 'panel1';
const BUTTON = 'button';
const ARROW_KEYS_IMAGE = 'arrowkeys';
const ARROW_LEFT = 'arrowleft';
const ARROW_RIGHT = 'arrowright';
const BUTTON_JUMP = 'buttonjump';

const HEADER_LABEL = 
`Bem-vindo ao mundo de 
 Aventuras e Sentimentos!`;

const BODY_LABEL = 
`Nesta aventura, precisarei de sua ajuda para resolver as surpresas que encontraremos pelo caminho.
Conto com você!`;

const DESKTOP_LABEL = 
`Para se mover pelo jogo, utilize os cursores do teclado!`;

const MOBILE_LABEL = 
`Para se mover pelo jogo utilize os botões!`;

const BUTTON_TEXT = 'Vamos lá?';

export default class StoryModal extends Phaser.Scene {
    playerName;
    characterSelected;

    constructor() {
        super('story-modal');
    }

    init(data) {
        this.characterSelected = data.characterSelected;
    }

    preload() {
        this.load.image(ARROW_KEYS_IMAGE, 'assets/arrow_keys.png'); 
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
    
        this.container = this.add.container(width * 0.5, height * 0.5);
        const panel = this.add.nineslice(0, -10 , width * 0.8, height * 0.9, PANEL_DIALOG, 24).
                                  setOrigin(0.5);        

        const labelTextTitle = new TextLabel(this, 0, -height * 0.30, HEADER_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width * 0.7 } })
                                  .setOrigin(0.5);


        const buttonImage = new UiImage(this, 0, height * 0.3, BUTTON)
                            .setOrigin(0.5)
                            .setInteractive()
                            .on('pointerdown', () => { this.returnToGame() })
                            .on('pointerover', () => { buttonImage.setTint(0xfadcaa); })
                            .on('pointerout', () => { buttonImage.clearTint(); });


        const buttonText = new TextLabel(this, 0, height * 0.3, BUTTON_TEXT, { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 })
                               .setOrigin(0.5);

        this.container.add(panel);
        this.container.add(labelTextTitle);
        this.container.add(buttonImage);
        this.container.add(buttonText);

        this.showCommandsHelp(width, height);
    }

    showCommandsHelp(width, height) {
        if (this.sys.game.device.os.desktop){
            const labelTextBody = new TextLabel(this, width * 0.05, -height * 0.1, BODY_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '28px', fill: '#000', align: 'right', padding: 10, wordWrap: { width: width / 3  }})
                                  .setOrigin(0.5);

            const characterImage = new UiImage(this, -width * 0.20, -height * 0.1, this.characterSelected)
                                  .setOrigin(0.5)
                                  .setSize(500, 200);

            const labelTextHelp = new TextLabel(this, width * 0.05, height * 0.1, DESKTOP_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '30px', fill: '#000', align: 'right', padding: 10, wordWrap: { width: width / 3 }})
                                      .setOrigin(0.5);
            const arrowKeys = new UiImage(this, -width * 0.20, height * 0.1, ARROW_KEYS_IMAGE)
                                      .setOrigin(0.5);

            arrowKeys.displayWidth = 250;
            arrowKeys.displayHeight = 180;
            
            this.container.add(labelTextBody);
            this.container.add(characterImage);
            this.container.add(labelTextHelp);
            this.container.add(arrowKeys);

        } else {
            const labelTextBody = new TextLabel(this, 0, 0, BODY_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '28px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width * 0.7 }})
                                  .setOrigin(0.5);

            const labelTextHelp = new TextLabel(this, 0, height * 0.2, MOBILE_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '26px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width * 0.7 } })
                                      .setOrigin(0.5);
            
            this.container.add(labelTextBody);
            this.container.add(labelTextHelp)
        }
    }


    returnToGame() {
        this.scene.stop();
        this.gameScene = this.scene.get('game-scene');
        this.scene.resume('game-scene', { scene: 'story-modal', playerName: this.playerName });
    }
}