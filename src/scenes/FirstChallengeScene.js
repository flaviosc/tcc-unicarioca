import Phaser from 'phaser';

import TextLabel from '../ui/TextLabel';

const BUTTON_KEY = 'button';
const SAD_CHILDREN_KEY = 'sadchildren';
const SAD_EMOTION_KEY = 'sademotion';
const HAPPY_EMOTION_KEY = 'happyemotion';
const ANGRY_EMOTION_KEY = 'angryemotion';

const CHALLENGETEXT = 
`O nosso amiguinho da foto não parece estar muito bem...
Como você acha que ele está se sentindo?`;

const BUTTONLEFTTEXT = 'Feliz';
const BUTTONMIDDLETEXT = 'Triste';
const BUTTONRIGHTTEXT = 'Com raiva';

export default class FirstChallengeScene extends Phaser.Scene {

    /** @type {Phaser.GameObjects.Container} */
    container;

    constructor() {
        super('first-challenge-scene');
        this.contentText = undefined;
    }

    preload() {
        this.load.image(SAD_CHILDREN_KEY, 'assets/sad_children.png');
        this.load.image(SAD_EMOTION_KEY, 'assets/sad.png');
        this.load.image(HAPPY_EMOTION_KEY, 'assets/happy.png');
        this.load.image(ANGRY_EMOTION_KEY, 'assets/angry.png');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.container = this.add.container(width * 0.5, 200);
        const panel = this.add.nineslice(-width * 0.28, -height * 0.2, width * 0.5, height * 0.8, 'panel1', 24).setOrigin(0,0);
        
        const children = this.add.nineslice(-width * 0.07, -height * 0.1, 150, 200, SAD_CHILDREN_KEY, 24).setOrigin(0,0);
        this.contentText = this.createContentText(-width * 0.22, height * 0.2, CHALLENGETEXT).setOrigin(0,0);
        
        const buttonLeft = this.createImage(-width * 0.25, 360, BUTTON_KEY).setOrigin(0);
        const btnLeftText = this.createButtonText(-width * 0.20, 363, BUTTONLEFTTEXT);
        const btnLeftIcon = this.add.nineslice(-width * 0.22, 370, 25, 25, HAPPY_EMOTION_KEY, 0).setOrigin(0,0);
        
        const buttonMiddle = this.createImage(-width * 0.10, 360, BUTTON_KEY).setOrigin(0);
        const btnMiddleText = this.createButtonText(-width * 0.05, 360, BUTTONMIDDLETEXT);
        const btnMiddleIcon = this.add.nineslice(-width * 0.07, 370, 25, 25, SAD_EMOTION_KEY, 0).setOrigin(0,0);

        const buttonRight = this.createImage(width * 0.05, 360, BUTTON_KEY).setOrigin(0);
        const btnRightText = this.createButtonText(width * 0.09, 360, BUTTONRIGHTTEXT);
        const btnRightIcon = this.add.nineslice(width * 0.07, 370, 25, 25, ANGRY_EMOTION_KEY, 0).setOrigin(0);

        this.container.add(panel);
        this.container.add(children);
        this.container.add(this.contentText);

        this.container.add(buttonLeft);
        this.container.add(btnLeftText);
        this.container.add(btnLeftIcon);

        this.container.add(buttonMiddle);
        this.container.add(btnMiddleText);
        this.container.add(btnMiddleIcon);

        this.container.add(buttonRight);
        this.container.add(btnRightText);
        this.container.add(btnRightIcon);

        buttonLeft.setInteractive()
                  .on('pointerdown', () => { this.checkAnswer(false, buttonLeft); buttonLeft.setTint(0xff0000)})
                  .on('pointerover', () => { buttonLeft.setTint(0xfadcaa); })
                  .on('pointerout', () => { buttonLeft.clearTint(); })
        buttonMiddle.setInteractive()
                    .on('pointerdown', () => { this.checkAnswer(true, buttonMiddle); buttonMiddle.setTint(0xff00) })
                    .on('pointerover', () => { buttonMiddle.setTint(0xfadcaa); })
                    .on('pointerout', () => { buttonMiddle.clearTint(); })
        buttonRight.setInteractive()
                   .on('pointerdown', () => { this.checkAnswer(false, buttonRight); buttonRight.setTint(0xff0000) })
                   .on('pointerover', () => { buttonRight.setTint(0xfadcaa); })
                   .on('pointerout', () => { buttonRight.clearTint(); })
    }

    update() {
    }

    createImage(width, height, key) {
        let imageObject = this.add.image(width, height, key);
        return imageObject;
    }

    createContentText(x, y, text) {
        const style = { fontFamily: 'Comic Sans MS', fontSize: '23px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: 450 } };
        const label = new TextLabel(this, x, y, text, style);
        this.add.existing(label);
        return label;
    }

    createButtonText(x, y, text) {
        const style = { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 };
        const label = new TextLabel(this, x, y, text, style);
        this.add.existing(label);
        return label;
    }

    checkAnswer(isCorrect, button) {
        if(isCorrect == true) {
            const successScene = this.scene.get('correct-answer-scene');
            this.scene.launch('correct-answer-scene');
            this.scene.pause();

        } else {
            setTimeout(() => {
                button.clearTint();
            }, 500);
        }
    }
}
