import Phaser from 'phaser';

import TextLabel from '../ui/TextLabel';

const PANEL_DIALOG = 'panel1';

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


const HEADER_LABEL = 'Escolha e clique em um dos personagens abaixo:';
const GIRL_PLAYER = 'girlplayer';
const BOY_PLAYER = 'boyplayer';

export default class ChallengeModal extends Phaser.Scene {

    /** @type {Phaser.GameObjects.Container} */
    container;

    /** @type {string} */
    challengeId;

    /** @type {number} */
    gameLevel;

    constructor() {
        super('challenge-modal');
        this.contentText = undefined;
    }

    init(data) {
        this.gameLevel = data.gameLevel;
        this.challengeId = data.challengeId;
    }

    preload() {
        this.load.image(SAD_CHILDREN_KEY, 'assets/sad_children.png');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        this.loadModalBody(width, height);

    }

    loadModalBody(width, height){
        switch (this.challengeId) {
            case 'CRATE_0':
                this.showChallengeOne(width, height);
            break;

            case 'CRATE_1':
                
            break;

            case 'CRATE_2':
                
            break;
        
            case 'CRATE_3':
                
            break;

            case 'CRATE_4':
                
            break;

            case 'CRATE_5':
                
            break;

            case 'CRATE_6':

            break;

            case 'CRATE_7':
                
            break;

            case 'CRATE_8':
                
            break;

            default:
            break;
        }
    }

    showChallengeOne(width, height) {
        const container = this.add.container(width * 0.5, height * 0.5);
        const panel = this.add.nineslice(0, -10 , width * 0.8, height * 0.8, 'panel1', 24).setOrigin(0.5);        

        
        const children = this.add.nineslice(0, -height * 0.25, 150, 200, SAD_CHILDREN_KEY, 24).setOrigin(0.5);    
        this.contentText = this.createContentText(0, 20, width, CHALLENGETEXT).setOrigin(0.5);    

        const buttonLeft = this.add.nineslice(-200, 150, 190, 45, BUTTON_KEY, 0).setOrigin(0.5);    
        const btnLeftText = this.createButtonText(-220, 150, BUTTONLEFTTEXT).setOrigin(0.5);
        const btnLeftIcon = this.add.nineslice(-150, 150, 25, 25, HAPPY_EMOTION_KEY, 0).setOrigin(0.5);    
        
        const buttonMiddle = this.add.nineslice(0, 150, 190, 45, BUTTON_KEY, 0).setOrigin(0.5);    
        const btnMiddleText = this.createButtonText(-30, 150, BUTTONMIDDLETEXT).setOrigin(0.5);
        const btnMiddleIcon = this.add.nineslice(50, 150, 25, 25, SAD_EMOTION_KEY, 0).setOrigin(0.5);    

        const buttonRight =  this.add.nineslice(200, 150, 190, 45, BUTTON_KEY, 0).setOrigin(0.5);    
        const btnRightText = this.createButtonText(180, 150, BUTTONRIGHTTEXT).setOrigin(0.5);
        const btnRightIcon = this.add.nineslice(260, 150, 25, 25, ANGRY_EMOTION_KEY, 0).setOrigin(0.5);    

        container.add(panel);
        container.add(children);
        container.add(this.contentText);

        container.add(buttonLeft);
        container.add(btnLeftText);
        container.add(btnLeftIcon);

        container.add(buttonMiddle);
        container.add(btnMiddleText);
        container.add(btnMiddleIcon);

        container.add(buttonRight);
        container.add(btnRightText);
        container.add(btnRightIcon);

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

    createImage(width, height, key) {
        let imageObject = this.add.image(width, height, key);
        return imageObject; 
    }

    createContentText(x, y, width, text) {
        const style = { fontFamily: 'Comic Sans MS', fontSize: '23px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width/2 } };
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
            const successFeedback = this.scene.get('correct-answer-modal');
            this.scene.launch('correct-answer-modal');
            this.scene.pause();

        } else {
            const successFeedback = this.scene.get('incorrect-answer-modal');
            this.scene.launch('incorrect-answer-modal');
            this.scene.pause();
        }
    }
}
