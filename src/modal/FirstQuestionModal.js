import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';

const QUESTION_LABEL = 'Como você está se sentindo hoje?';

export default class FirstQuestionModal extends Phaser.Scene {
    playerName;

    constructor() {
        super('first-question-modal');
    }

    init(config) {
        this.playerName = config.playerName;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
    
        this.container = this.add.container(width * 0.5, 200);
        const panel = this.add.nineslice(width * 0.1, height * 0.05, width * 0.8, height * 0.8, 'panel1', 24).setOrigin(0,0);

        const labelText = new TextLabel(this, width * 0.32, height * 0.2, QUESTION_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10 }).setOrigin(0,0)


        var inputText = this.add.rexInputText(width * 0.40, height * 0.4, 10, 10, {
            type: 'text',
            placeholder: 'Digite aqui...',
            fontSize: '16px',
            color: '#000',
            backgroundColor: '#e0d1b1',
            border: '2px solid',
            borderRadius: '10px',
            borderColor: '#000'
        })
        .resize(350, 50)
        .setOrigin(0);

        const buttonImage = this.add.image(width * 0.45, height * 0.58, 'button')
                            .setOrigin(0)
                            .setInteractive()
                            .on('pointerdown', () => { this.startGame() })
                            .on('pointerover', () => { buttonImage.setTint(0xfadcaa); })
                            .on('pointerout', () => { buttonImage.clearTint(); });

        const buttonText = new TextLabel(this, width * 0.48, height * 0.58, 'Iniciar', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 })

        this.add.existing(panel);
        this.add.existing(labelText);
        this.add.existing(inputText);
        this.add.existing(buttonText);
    }


    startGame() {
        this.scene.stop();
        this.scene.start('character-select-modal', { scene: 'first-question', playerName: this.playerName });
    }
}