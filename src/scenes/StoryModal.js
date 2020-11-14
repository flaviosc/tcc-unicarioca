import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';
import UiImage from '../ui/UiImage';

const FIRST_LABEL = 'Bem-vindo ao mundo de Aventuras e Sentimentos!';
const SECOND_LABEL = 
`Nesta aventura, precisarei de sua ajuda para resolver as surpresas
que encontraremos pelo caminho.
Conto com você!`;
const THIRD_LABEL = 
`Para se mover pelo jogo, utilize os cursores do teclado!`;

export default class StoryModal extends Phaser.Scene {
    playerName;

    constructor() {
        super('story-modal');
    }

    preload() {
        this.load.image('arrowkeys', 'assets/arrow_keys.png'); 
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
    
        this.container = this.add.container(width * 0.5, 200);
        const panel = this.add.nineslice(width * 0.1, height * 0.05, width * 0.8, height * 0.8, 'panel1', 24).setOrigin(0,0);

        const labelTextTitle = new TextLabel(this, width * 0.23, height * 0.1, FIRST_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: 750 } }).setOrigin(0,0);
        const labelTextBody = new TextLabel(this, width * 0.40, height * 0.3, SECOND_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '30px', fill: '#000', align: 'right', padding: 10, wordWrap: { width: 550 }}).setOrigin(0,0)

        const characterImage = new UiImage(this, width * 0.30, height * 0.35, 'girlplayer')
                            .setOrigin(0)
                            .setSize(500, 200);

        const buttonImage = this.add.image(width * 0.45, height * 0.70, 'button')
                            .setOrigin(0)
                            .setInteractive()
                            .on('pointerdown', () => { this.returnToGame() })
                            .on('pointerover', () => { buttonImage.setTint(0xfadcaa); })
                            .on('pointerout', () => { buttonImage.clearTint(); });

        if (this.sys.game.device.os.desktop){
            const labelTextHelp = new TextLabel(this, width * 0.40, height * 0.55, THIRD_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '30px', fill: '#000', align: 'right', padding: 10, wordWrap: { width: 550 }}).setOrigin(0,0);
            const arrowKeys = this.add.nineslice(width * 0.22, height * 0.49, 250, 200, 'arrowkeys', 24)
                                      .setOrigin(0);
                    
            this.add.existing(labelTextHelp);
            this.add.existing(arrowKeys);
        }

        const buttonText = new TextLabel(this, width * 0.48, height * 0.70, 'Vamos lá?', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 })

        this.add.existing(panel);
        this.add.existing(labelTextTitle);
        this.add.existing(labelTextBody);
        this.add.existing(characterImage);
        this.add.existing(buttonText);
    }


    returnToGame() {
        this.scene.stop();
        this.gameScene = this.scene.get('game-scene');
        this.scene.resume('game-scene', { scene: 'story-modal', playerName: this.playerName });
    }


}