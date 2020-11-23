import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';
import UiImage from '../ui/UiImage';
import UpdateLocalStorageData from '../util/UpdateLocalStorageData';

const PANEL_DIALOG = 'panel1';
const CLICK_SOUND = 'click';

const HEADER_LABEL = 'Como você está se sentindo hoje?\n Clique em uma das imagens abaixo:';
const SAD_EMOTION_KEY = 'sademotion';
const HAPPY_EMOTION_KEY = 'happyemotion';
const ANGRY_EMOTION_KEY = 'angryemotion';

export default class MoodQuestionModal extends Phaser.Scene {

    constructor() {
        super('mood-question-modal');
    }

    init(data) {
        this.playerData = data.playerData;
    }

    preload() {
        this.load.image(SAD_EMOTION_KEY, 'assets/sad_icon.png');
        this.load.image(HAPPY_EMOTION_KEY, 'assets/happy_icon.png');
        this.load.image(ANGRY_EMOTION_KEY, 'assets/angry_icon.png');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.container = this.add.container(width * 0.5, height * 0.5);
        const panel = this.add.nineslice(0, -10 , width * 0.8, height * 0.9, PANEL_DIALOG, 24).setOrigin(0.5);        

        const labelText = new TextLabel(this, 0, -height * 0.25, HEADER_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width * 0.8 } })
                          .setOrigin(0.5);

        const happyIcon = new UiImage(this, -width * 0.25, height * 0.1, HAPPY_EMOTION_KEY)
                              .setOrigin(0.5);

        happyIcon.displayWidth = 80;
        happyIcon.displayHeight = 80;
     

        const sadIcon = new UiImage(this, 0, height * 0.1, SAD_EMOTION_KEY)
                              .setOrigin(0.5);
                              
        sadIcon.displayWidth = 80;
        sadIcon.displayHeight = 80;

        const angryIcon = new UiImage(this, width * 0.25, height * 0.1, ANGRY_EMOTION_KEY)
                              .setOrigin(0.5);

        angryIcon.displayWidth = 80;
        angryIcon.displayHeight = 80;

        happyIcon.setInteractive()
                .on('pointerdown', () => { this.selectMood('Feliz')})
                .on('pointerover', () => { happyIcon.displayWidth = 100; happyIcon.displayHeight = 100; this.sound.play(CLICK_SOUND); })
                .on('pointerout', () => { happyIcon.displayWidth = 80; happyIcon.displayHeight = 80; })

        sadIcon.setInteractive()
                .on('pointerdown', () => { this.selectMood('Triste') })
                .on('pointerover', () => { sadIcon.displayWidth = 100; sadIcon.displayHeight = 100; this.sound.play(CLICK_SOUND); })
                .on('pointerout', () => { sadIcon.displayWidth = 80; sadIcon.displayHeight = 80; })

        angryIcon.setInteractive()
                .on('pointerdown', () => { this.selectMood('Com raiva') })
                .on('pointerover', () => { angryIcon.displayWidth = 100; angryIcon.displayHeight = 100; this.sound.play(CLICK_SOUND);})
                .on('pointerout', () => { angryIcon.displayWidth = 80; angryIcon.displayHeight = 80; })

        this.container.add(panel);
        this.container.add(labelText);
        this.container.add(happyIcon);
        this.container.add(sadIcon);
        this.container.add(angryIcon);
    }

    selectMood(mood) {
        this.updateLocalStorage(mood);
        this.scene.stop();
        this.scene.start('character-select-modal', { scene: 'first-question', playerData: this.playerData });
    }

    updateLocalStorage(mood) {  
        this.playerData.playerMood = mood;      
        const updateData = new UpdateLocalStorageData(this.playerData).setData();
    }
}