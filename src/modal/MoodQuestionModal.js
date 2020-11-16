import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';

const QUESTION_LABEL = 'Como você está se sentindo hoje?\n Clique em uma das imagens abaixo:';
const SAD_EMOTION_KEY = 'sademotion';
const HAPPY_EMOTION_KEY = 'happyemotion';
const ANGRY_EMOTION_KEY = 'angryemotion';

export default class MoodQuestionModal extends Phaser.Scene {
    playerName;

    constructor() {
        super('mood-question-modal');
    }

    init(config) {
        this.playerName = config.playerName;
    }

    preload() {
        this.load.image(SAD_EMOTION_KEY, 'assets/sad_icon.png');
        this.load.image(HAPPY_EMOTION_KEY, 'assets/happy_icon.png');
        this.load.image(ANGRY_EMOTION_KEY, 'assets/angry_icon.png');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
    
        this.container = this.add.container(width * 0.5, 200);
        const panel = this.add.nineslice(width * 0.1, height * 0.05, width * 0.8, height * 0.8, 'panel1', 24).setOrigin(0,0);

        const labelText = new TextLabel(this, width * 0.32, height * 0.2, QUESTION_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: 550 } }).setOrigin(0,0)

        const happyIcon = this.add.nineslice(width * 0.3, 400, 50, 50, HAPPY_EMOTION_KEY, 0).setOrigin(0,0);
        const sadIcon = this.add.nineslice(width * 0.5, 400, 50, 50, SAD_EMOTION_KEY, 0).setOrigin(0,0);
        const angryIcon = this.add.nineslice(width * 0.7, 400, 50, 50, ANGRY_EMOTION_KEY, 0).setOrigin(0,0);

        happyIcon.setInteractive()
                .on('pointerdown', () => { this.selectCharacter()})
                .on('pointerover', () => { happyIcon.setTint(0xfadcaa); })
                .on('pointerout', () => { happyIcon.clearTint(); })

        sadIcon.setInteractive()
                .on('pointerdown', () => { this.selectCharacter() })
                .on('pointerover', () => { sadIcon.setTint(0xfadcaa); })
                .on('pointerout', () => { sadIcon.clearTint(); })

        angryIcon.setInteractive()
                .on('pointerdown', () => { this.selectCharacter() })
                .on('pointerover', () => { angryIcon.setTint(0xfadcaa); })
                .on('pointerout', () => { angryIcon.clearTint(); })

        this.add.existing(panel);
        this.add.existing(labelText);
        this.add.existing(happyIcon);
        this.add.existing(sadIcon);
        this.add.existing(angryIcon);
    }

    selectCharacter() {
        this.scene.stop();
        this.scene.start('character-select-modal', { scene: 'first-question', playerName: this.playerName });
    }
}