import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';
import UiImage from '../ui/UiImage';

const PANEL_DIALOG = 'panel1';
const BUTTON_KEY = 'button';
const CLICK_SOUND = 'click';
const ARROW_KEYS_IMAGE = 'arrowkeys';
const CRATE = 'crate'; 

const HEADER_LABEL = 
`Instruções`;

const BODY_LABEL_1 = 
`Para jogar, utilize as setas do teclado para mover o personagem até as caixas que surgirão ao longo do caminho.
`;

const BODY_LABEL_2 = 
`Ao se aproximar de uma caixa, um desafio será exibido na tela. Ao escolher a resposta certa, o desafio é concluído.
`;

const BUTTON_TEXT = 'Retornar ao início';

export default class HelpModal extends Phaser.Scene {
    characterSelected;

    constructor() {
        super('help-modal');
    }
    preload() {
        this.load.image(ARROW_KEYS_IMAGE, 'assets/arrow_keys.png'); 
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        const buttonSound = this.sound.add(CLICK_SOUND, { volume: 0.5 });
    
        this.container = this.add.container(width * 0.5, height * 0.5);
        const panel = this.add.nineslice(0, -10 , width * 0.8, height * 0.9, PANEL_DIALOG, 24).
                                  setOrigin(0.5);        

        const labelTextTitle = new TextLabel(this, 0, -height * 0.35, HEADER_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width * 0.7 } })
                                  .setOrigin(0.5);


        const buttonImage = new UiImage(this, 0, height * 0.35, BUTTON_KEY)
                            .setOrigin(0.5)
                            .setInteractive()
                            .on('pointerdown', () => { this.returnToStartModal() })
                            .on('pointerover', () => { buttonImage.setTint(0xfadcaa); buttonSound.play(); })
                            .on('pointerout', () => { buttonImage.clearTint(); });


        const buttonText = new TextLabel(this, 0, height * 0.35, BUTTON_TEXT, { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 })
                               .setOrigin(0.5);

        const labelTextBody1 = new TextLabel(this, width * 0.05, -height * 0.1, BODY_LABEL_1, { fontFamily: 'Comic Sans MS', fontSize: '28px', fill: '#000', align: 'right', padding: 10, wordWrap: { width: width / 3  }})
                               .setOrigin(0.5);

        const arrowKeysImage = new UiImage(this, -width * 0.20, -height * 0.1, ARROW_KEYS_IMAGE)
        .setOrigin(0.5)

        const labelTextBody2 = new TextLabel(this, width * 0.05, height * 0.18, BODY_LABEL_2, { fontFamily: 'Comic Sans MS', fontSize: '28px', fill: '#000', align: 'right', padding: 10, wordWrap: { width: width / 3  }})
        .setOrigin(0.5);

        const crate = new UiImage(this, -width * 0.20, height * 0.18, CRATE)
                            .setOrigin(0.5);

        arrowKeysImage.displayWidth = 250;
        arrowKeysImage.displayHeight = 180;

        this.container.add(panel);
        this.container.add(labelTextTitle);
        this.container.add(labelTextBody1);
        this.container.add(labelTextBody2);
        this.container.add(arrowKeysImage);
        this.container.add(crate);
        this.container.add(buttonImage);
        this.container.add(buttonText);
    }

    returnToStartModal() {
        this.scene.stop();
        this.startModal = this.scene.get('start-modal');
        this.scene.start('start-modal');
    }
}