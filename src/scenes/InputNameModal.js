import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';

const LABEL_DEFAULT = 'Digite aqui...';

export default class InputNameModal extends Phaser.Scene {
    constructor() {
        super('input-name-modal');
    }

    preload() {

    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
    
        this.container = this.add.container(width * 0.5, 200);
        const panel = this.add.nineslice(width * 0.1, height * 0.05, width * 0.8, height * 0.8, 'panel1', 24).setOrigin(0,0);

        const labelText = new TextLabel(this, width * 0.38, height * 0.2, 'Digite o seu nome: ', { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10 })


        const text = this.add.text(width * 0.5, height * 0.5, LABEL_DEFAULT, { fixedWidth: 350, fixedHeight: 66, fontSize: '30px', fill: '#000' })
        text.setOrigin(0.5, 0.5)


        text.setInteractive().on('pointerdown', () => {
            text.text = '';
            this.rexUI.edit(text);
        })


        const buttonImage = this.add.image(width * 0.6, height * 0.45, 'button')
                            .setOrigin(0)
                            .setInteractive()
                            .on('pointerdown', () => { this.startGame(text) })
                            .on('pointerover', () => { buttonImage.setTint(0xfadcaa); })
                            .on('pointerout', () => { buttonImage.clearTint(); });

        const buttonText = new TextLabel(this, width * 0.64, height * 0.45, 'Iniciar', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 })

        this.add.existing(labelText);
        this.add.existing(text);
        this.add.existing(buttonText);
    }

    startGame(textObject) {
        let { text } = textObject;
        if(text.length == 0 || text == LABEL_DEFAULT) {
            text = 'Pontuação';
        }
        this.scene.stop();
        this.scene.resume('game-scene', { playerName: text });
    }
}