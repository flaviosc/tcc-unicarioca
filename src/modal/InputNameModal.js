import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';
import UiImage from '../ui/UiImage';

const LABEL_DEFAULT = 'Digite aqui...';
const PANEL_DIALOG = 'panel1';
const HEADER_LABEL = 'Digite o seu nome: ';

export default class InputNameModal extends Phaser.Scene {
    constructor() {
        super('input-name-modal');
    }

    preload() {

    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
    
        this.container = this.add.container(width * 0.5, height * 0.5);
        const panel = this.add.nineslice(0, -10 , width * 0.8, height * 0.9, PANEL_DIALOG, 24).setOrigin(0.5);        

        const labelText = new TextLabel(this, 0, -height * 0.3, HEADER_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width / 2 } }).setOrigin(0.5);


        var inputText = this.add.rexInputText(0, 0, 10, 10, {
            type: 'text',
            placeholder: 'Digite aqui...',
            fontSize: '16px',
            color: '#000',
            backgroundColor: '#e0d1b1',
            border: '2px solid',
            borderRadius: '10px',
            borderColor: '#000'
        })
        .resize(300, 50)
        .setOrigin(0.5)
        .on('textchange', (inputText) => {
            let text = this.checkNameLength(inputText.text);
            inputText.text = text;
        })
        .setOrigin(0.5);

        const buttonImage = new UiImage(this, 0, height * 0.2, 'button')
                            .setOrigin(0.5)
                            .setInteractive()
                            .on('pointerdown', () => { this.showMoodQuestionModal(inputText.text) })
                            .on('pointerover', () => { buttonImage.setTint(0xfadcaa); })
                            .on('pointerout', () => { buttonImage.clearTint(); });

        const buttonText = new TextLabel(this, 0, height * 0.2, 'Continuar', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 }).setOrigin(0.5)

        this.container.add(panel);
        this.container.add(labelText);
        this.container.add(inputText);
        this.container.add(buttonImage);
        this.container.add(buttonText);
    }

    checkNameLength(text) {
        if(text.length >= 10) {
            const trim = text.slice(0, 10);
            return trim;
        }

        return text;
    }

    showMoodQuestionModal(text) {
        if(text.length == 0 || text == LABEL_DEFAULT) {
            text = 'Pontuação';
        }
        this.scene.stop();
        this.scene.start('mood-question-modal', { playerName: text });
    }
}