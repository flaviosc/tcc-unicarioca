import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';
import UiImage from '../ui/UiImage';
import UpdateLocalStorageData from '../util/UpdateLocalStorageData';

const PANEL_DIALOG = 'panel1';
const HEADER_LABEL = 'Digite o seu nome: ';

const CLICK_SOUND = 'click';

export default class InputNameModal extends Phaser.Scene {

    constructor() {
        super('input-name-modal');
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
        .setOrigin(0.5)
        .setFocus();

        const buttonImage = new UiImage(this, 0, height * 0.2, 'button')
                            .setOrigin(0.5)
                            .setInteractive()
                            .on('pointerdown', () => { this.checkNameExists(inputText.text), this.sound })
                            .on('pointerover', () => { buttonImage.setTint(0xfadcaa); this.sound.play(CLICK_SOUND); })
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


    checkNameExists(text) {
        if(text.length == 0 || text === '') {
            const labelText = new TextLabel(this, 0, 45, 'Por favor, digite seu nome!', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: 400 } }).setOrigin(0.5);
            this.container.add(labelText);
        } else {
            this.showMoodQuestionModal(text);
        }
        return true;
    }
    
    showMoodQuestionModal(text) {
        const playerData = this.updateLocalStorage(text);

        this.scene.stop();
        this.scene.start('mood-question-modal', { playerName: text, playerData: playerData });
    }

    updateLocalStorage(text) {          
        const gameHistory = {
           id: this.generateId(),
           playerName: text,
           playerCharacter: '',
           playerMood: '',
           playerPoints: 0
        };

        const updateData = new UpdateLocalStorageData(gameHistory);
        updateData.setData();

        return gameHistory;
    }

    generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}