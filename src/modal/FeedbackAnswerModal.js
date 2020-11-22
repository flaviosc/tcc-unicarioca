import Phaser from 'phaser';

import TextLabel from '../ui/TextLabel';

const PANEL_FEEDBACK = 'panel2';
const BUTTON_KEY = 'button';
const CORRECT = 'correct';
const INCORRECT = 'incorrect';
const SUCCESSTEXT = 
`Muito bem!`;

const BUTTONTEXT = `Continuar`;

const SUCCESS_SOUND = 'successsound';
const ERROR_SOUND = 'errorsound';
const QUESTION_SOUND = 'questionsound';

export default class FeedbackAnswerModal extends Phaser.Scene {

    /** @type {Phaser.GameObjects.Container} */
    container;

    /** @type {boolean} */
    correctAnswer;

    /** @type {string} */
    feedbackText;

    /** @type {boolean} */
    lastChallenge = false;

    successSound;
    errorSound; 

    constructor() {
        super('feedback-answer-modal');
        this.container = undefined;
    }

    init(data) {
        this.correctAnswer = data.correctAnswer;
        this.feedbackText = data.feedbackText;
        this.lastChallenge = data.lastChallenge;
        this.characterSelected = data.character;
        this.scenePoints = data.scenePoints;
    }

    preload() {
        this.load.image(CORRECT, 'assets/correct_check.png');
        this.load.image(INCORRECT, 'assets/incorrect_check.png');
        this.load.audio(ERROR_SOUND, 'assets/audio/error_sound.mp3');
        this.load.audio(SUCCESS_SOUND, 'assets/audio/success_sound.mp3');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.container = this.add.container(width * 0.5, height * 0.5);
        const panel = this.add.nineslice(0, -10 , width * 0.6, height * 0.4, PANEL_FEEDBACK, 24).setOrigin(0.5);        
        this.container.add(panel);

        this.loadModalBody(width);

    }    

    loadModalBody(width) {
        if(this.correctAnswer == true) {
            const successImage = this.add.nineslice(5, -110, 50, 50, CORRECT, 0).setOrigin(0.5);
            const defaultText = this.createText(0, -70, width, SUCCESSTEXT, '26px').setOrigin(0.5);
            const successText = this.createText(0, 5, width, this.feedbackText, '23px').setOrigin(0.5);

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

            this.successSound = this.sound.add(SUCCESS_SOUND).play();
            this.sound.stopByKey(QUESTION_SOUND);

        } else {
            const incorrectImage = this.add.nineslice(5, -110, 50, 50,  INCORRECT, 0).setOrigin(0.5);
            const incorrectText = this.createText(0, 0, width, this.feedbackText, '23px').setOrigin(0.5);

            this.container.add(incorrectImage);
            this.container.add(incorrectText);

            const okButton =  this.add.nineslice(0, 90, 190, 45, BUTTON_KEY, 0).setOrigin(0.5); 
            const buttonText = this.createText(0, 90, width, BUTTONTEXT, '20px').setOrigin(0.5);   
    
            this.container.add(okButton);
            this.container.add(buttonText);
    
            okButton.setInteractive()
                    .on('pointerdown', () => { this.returnToChallenge(); })
                    .on('pointerover', () => { okButton.setTint(0xfadcaa); })
                    .on('pointerout', () => { okButton.clearTint(); })

            this.errorSound = this.sound.add(ERROR_SOUND).play();
        }
    }

    createText(x, y, width, text, fontSize) {
        const style = { fontFamily: 'Comic Sans MS', fontSize: fontSize, fill: '#000', align: 'center', padding: 10, wordWrap: { width: width * 0.6 } };
        const label = new TextLabel(this, x, y, text, style);
        this.add.existing(label);
        return label;
    }

    returnToGameScene() {
        const gameScene = this.scene.get('game-scene');
        const challengeModal = this.scene.get('challenge-modal');
        const height = this.scale.height;

        if(this.lastChallenge == true) {
            gameScene.updateScore(this.scenePoints);
            challengeModal.questionSound.stop();
            challengeModal.hide(height);
            this.scene.start('end-game-modal', { scene: 'feedback-answer-modal', character: this.characterSelected });
            return;
        }

        challengeModal.scene.resume();
        challengeModal.hide(height);
        this.scene.stop();
        
        this.scene.resume('game-scene', { scene: 'feedback-answer-modal' });
        gameScene.resetCursors();
        gameScene.checkLevelGame();
        gameScene.updateScore(this.scenePoints);
        gameScene.gameSoundtrack.play();
    }

    returnToChallenge() {
        const challengeModal = this.scene.get('challenge-modal');
        challengeModal.scene.resume();
        this.scene.stop('feedback-answer-modal');
    }
}