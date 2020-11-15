import Phaser from 'phaser';

import TextLabel from '../ui/TextLabel';

const PANEL_FEEDBACK = 'panel2';
const BUTTON_KEY = 'button';
const SUCCESSTEXT = 
`Muito bem!`;
const BUTTONTEXT = `Continuar`;
const SCENE_POINTS = 50;

export default class CorrectAnswerModal extends Phaser.Scene {

    /** @type {Phaser.GameObjects.Container} */
    container;

    constructor() {
        super('correct-answer-modal');
        this.container = undefined;
    }

    init(data) {
        this.feedbackText = data.feedbackText;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.container = this.add.container(width * 0.5, height * 0.5);
        const panel = this.add.nineslice(0, -10 , width * 0.5, height * 0.4, PANEL_FEEDBACK, 24).setOrigin(0.5);        
        this.container.add(panel);

        this.loadModalBody(width);
        // this.container = this.add.container(300, 400);
        // const successPanel = this.add.nineslice(width * 0.16, -height * 0.25, 400, height * 0.3, 'panel2', 24).setOrigin(0,0);
        // this.successText = this.createSuccessText(width * 0.25, -height * 0.20, SUCCESSTEXT);
        // const successImage = this.add.nineslice(width * 0.28, -height * 0.12, 48, 46, 'correct', 0).setOrigin(0,0);
        // const okButton = this.add.image(width * 0.29, height * 0.01, 'button');
        // const buttonText = this.createSuccessText(width * 0.25, -height * 0.02, BUTTONTEXT);

        // this.container.add(successPanel);
        // this.container.add(this.successText);
        // this.container.add(successImage);
        // this.container.add(okButton);
        // this.container.add(buttonText);

        // okButton.setInteractive()
        //           .on('pointerdown', () => { this.returnToGameScene(); })
        //           .on('pointerover', () => { okButton.setTint(0xfadcaa); })
        //           .on('pointerout', () => { okButton.clearTint(); })

    }    

    loadModalBody(width) {
        const successImage = this.add.nineslice(0, -100, 48, 46, 'correct', 0).setOrigin(0.5);
        const defaultText = this.createText(0, -30, width, SUCCESSTEXT).setOrigin(0.5);
        const successText = this.createText(0, 40, width, this.feedbackText).setOrigin(0.5);
        const okButton =  this.add.nineslice(0, 90, 190, 45, BUTTON_KEY, 0).setOrigin(0.5); 
        const buttonText = this.createText(0, 90, width, BUTTONTEXT).setOrigin(0.5);   

        this.container.add(successImage);
        this.container.add(defaultText);
        this.container.add(successText);
        this.container.add(okButton);
        this.container.add(buttonText);

        okButton.setInteractive()
                .on('pointerdown', () => { this.returnToGameScene(); })
                .on('pointerover', () => { okButton.setTint(0xfadcaa); })
                .on('pointerout', () => { okButton.clearTint(); })
    }

    createText(x, y, width, text) {
        const style = { fontFamily: 'Comic Sans MS', fontSize: '23px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width/3 } };
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
}