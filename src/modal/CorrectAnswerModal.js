import Phaser from 'phaser';

import TextLabel from '../ui/TextLabel';

const SUCCESSTEXT = 
`Muito bem!`;

const BUTTONTEXT = `Continuar`;

const SCENE_POINTS = 100;

export default class CorrectAnswerModal extends Phaser.Scene {

    /** @type {Phaser.GameObjects.Container} */
    container;

    /** @type {Phaser.GameObjects.Text} */
    successText;

    constructor() {
        super('correct-answer-modal');
        this.container = undefined;
        this.successText = undefined;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.container = this.add.container(300, 400);
        const successPanel = this.add.nineslice(width * 0.16, -height * 0.25, 400, height * 0.3, 'panel2', 24).setOrigin(0,0);
        this.successText = this.createSuccessText(width * 0.25, -height * 0.20, SUCCESSTEXT);
        const successImage = this.add.nineslice(width * 0.28, -height * 0.12, 48, 46, 'correct', 0).setOrigin(0,0);
        const okButton = this.add.image(width * 0.29, height * 0.01, 'button');
        const buttonText = this.createSuccessText(width * 0.25, -height * 0.02, BUTTONTEXT);

        this.container.add(successPanel);
        this.container.add(this.successText);
        this.container.add(successImage);
        this.container.add(okButton);
        this.container.add(buttonText);

        okButton.setInteractive()
                  .on('pointerdown', () => { this.returnToGameScene(); })
                  .on('pointerover', () => { okButton.setTint(0xfadcaa); })
                  .on('pointerout', () => { okButton.clearTint(); })

    }    

    createSuccessText(x, y, text) {
        const style = { fontFamily: 'Comic Sans MS', fontSize: '23px', fill: '#000', align: 'center', padding: 10 };
        const label = new TextLabel(this, x, y, text, style);
        this.add.existing(label);
        return label;
    }

    returnToGameScene() {
        this.scene.stop('challenge-scene');
        this.scene.stop();
        const gameScene = this.scene.get('game-scene');
        this.scene.resume('game-scene', { scene: 'correct-answer' });
        gameScene.resetCursors();
        gameScene.updateScore(SCENE_POINTS);
    }
}