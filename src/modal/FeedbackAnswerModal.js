import Phaser from 'phaser';

import TextLabel from '../ui/TextLabel';

const PANEL_FEEDBACK = 'panel2';
const BUTTON_KEY = 'button';
const CORRECT = 'correct';
const INCORRECT = 'incorrect';
const SUCCESSTEXT = 
`Muito bem!`;

const BUTTONTEXT = `Continuar`;
const SCENE_POINTS = 50;

export default class FeedbackAnswerModal extends Phaser.Scene {

    /** @type {Phaser.GameObjects.Container} */
    container;

    /** @type {boolean} */
    correctAnswer;

    /** @type {string} */
    feedbackText;

    constructor() {
        super('feedback-answer-modal');
        this.container = undefined;
    }

    init(data) {
        this.correctAnswer = data.correctAnswer;
        this.feedbackText = data.feedbackText;
    }

    preload() {
        this.load.image(CORRECT, 'assets/correct_check.png');
        this.load.image(INCORRECT, 'assets/incorrect_check.png');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.container = this.add.container(width * 0.5, height * 0.5);
        const panel = this.add.nineslice(0, -10 , width * 0.5, height * 0.4, PANEL_FEEDBACK, 24).setOrigin(0.5);        
        this.container.add(panel);

        this.loadModalBody(width);

    }    

    loadModalBody(width) {
        if(this.correctAnswer == true) {
            const successImage = this.add.nineslice(0, -100, 70, 70, CORRECT, 0).setOrigin(0.5);
            const defaultText = this.createText(0, -30, width, SUCCESSTEXT, '23px').setOrigin(0.5);
            const successText = this.createText(0, 40, width, this.feedbackText, '23px').setOrigin(0.5);

            this.container.add(successImage);
            this.container.add(defaultText);
            this.container.add(successText);

            const okButton =  this.add.nineslice(0, 90, 190, 45, BUTTON_KEY, 0).setOrigin(0.5); 
            const buttonText = this.createText(0, 90, width, BUTTONTEXT, '20px').setOrigin(0.5);   
    
            this.container.add(okButton);
            this.container.add(buttonText);
    
            okButton.setInteractive()
                    .on('pointerdown', () => { this.returnToGameScene(); })
                    .on('pointerover', () => { okButton.setTint(0xfadcaa); })
                    .on('pointerout', () => { okButton.clearTint(); })
        } else {
            const incorrectImage = this.add.nineslice(0, -100, 70, 70, INCORRECT, 0).setOrigin(0.5);
            const incorrectText = this.createText(0, 15, width, this.feedbackText, '20px').setOrigin(0.5);

            this.container.add(incorrectImage);
            this.container.add(incorrectText);

            const okButton =  this.add.nineslice(0, 90, 190, 45, BUTTON_KEY, 0).setOrigin(0.5); 
            const buttonText = this.createText(0, 90, width, BUTTONTEXT, '23px').setOrigin(0.5);   
    
            this.container.add(okButton);
            this.container.add(buttonText);
    
            okButton.setInteractive()
                    .on('pointerdown', () => { this.returnToChallenge(); })
                    .on('pointerover', () => { okButton.setTint(0xfadcaa); })
                    .on('pointerout', () => { okButton.clearTint(); })
        }
    }

    createText(x, y, width, text, fontSize) {
        const style = { fontFamily: 'Comic Sans MS', fontSize: fontSize, fill: '#000', align: 'center', padding: 10, wordWrap: { width: width/3 } };
        const label = new TextLabel(this, x, y, text, style);
        this.add.existing(label);
        return label;
    }

    returnToGameScene() {
        this.scene.stop('challenge-modal');
        this.scene.stop();
        const gameScene = this.scene.get('game-scene');
        this.scene.resume('game-scene', { scene: 'correct-answer' });
        gameScene.resetCursors();
        gameScene.checkLevelGame();
        gameScene.updateScore(SCENE_POINTS);
    }

    returnToChallenge() {
        this.scene.stop();
        const gameScene = this.scene.get('challenge-modal');
        this.scene.resume('challenge-modal');
    }
}