import Phaser from 'phaser';

import TextLabel from '../ui/TextLabel';

const PANEL = 'panel1';

const BUTTON_KEY = 'button';
const SAD_CHILDREN_KEY = 'sadchildren';
const FEAR_CHILDREN_KEY = 'fearchildren';
const SAD_EMOTION_KEY = 'sademotion';
const HAPPY_EMOTION_KEY = 'happyemotion';
const ANGRY_EMOTION_KEY = 'angryemotion';
const FEAR_EMOTION_KEY = 'fearemotion';

const CHALLENGE_ONE_TEXT = 
`O nosso amiguinho da foto não parece estar muito bem...
Como você acha que ele está se sentindo?`;

const CHALLENGE_TWO_TEXT = 
`Este amiguinho viu algo que não gostou muito...
 Ele está se sentindo: `;


const POSITIVE_FEEDBACK_CHALLENGE_ONE = 
`Realmente, o nosso amiguinho está bem triste...
`;

const POSITIVE_FEEDBACK_CHALLENGE_TWO = 
`Ele tem muito medo de cachorros, e viu um enquanto andava pela rua...
`;

const NEGATIVE_FEEDBACK_CHALLENGE_ONE_1 =
`Repare novamente no nosso amiguinho. 
 Ele realmente está feliz?
`;

const NEGATIVE_FEEDBACK_CHALLENGE_ONE_2 = 
`Já vi outros amiguinhos com raiva, e esse nosso amiguinho não parece estar assim...  
 Tem certeza que ele está com raiva?
`;

const NEGATIVE_FEEDBACK_CHALLENGE_TWO_1 =
`Pela expressão que este amiguinho fez, ele não parece estar com raiva...
`

const NEGATIVE_FEEDBACK_CHALLENGE_TWO_2 =
`Não sei... Ele não parece estar triste...
`

const HAPPY_BUTTON_TEXT = 'Feliz';
const SAD_BUTTON_TEXT = 'Triste';
const ANGRY_BUTTON_TEXT = 'Com raiva';
const FEAR_BUTTON_TEXT = 'Com medo';


export default class ChallengeModal extends Phaser.Scene {

    /** @type {Phaser.GameObjects.Container} */
    container;

    /** @type {string} */
    challengeId;

    /** @type {number} */
    gameLevel;

    /** @type {string} */
    feedbackText;

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
        this.load.image(FEAR_CHILDREN_KEY, 'assets/fear_children.png');
        this.load.image(FEAR_EMOTION_KEY, 'assets/fear_icon.png')
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.container = this.add.container(width * 0.5, height * 0.5);
        const panel = this.add.nineslice(0, -10 , width * 0.8, height * 0.8, PANEL, 24).setOrigin(0.5);        
        this.container.add(panel);

        this.loadModalBody(width, height);

    }

    loadModalBody(width, height){
        switch (this.challengeId) {
            case 'CRATE_0':
                this.showChallengeOne(width, height);
            break;

            case 'CRATE_1':
                this.showChallengeTwo(width, height);
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
        const challengeImage = this.add.nineslice(0, -height * 0.20, 200, 280, SAD_CHILDREN_KEY, 24).setOrigin(0.5);    
        this.contentText = this.createContentText(0, 30, width, CHALLENGE_ONE_TEXT).setOrigin(0.5);    

        const buttonLeft = this.add.nineslice(-200, 160, 190, 45, BUTTON_KEY, 0).setOrigin(0.5);    
        const btnLeftText = this.createButtonText(-220, 160, HAPPY_BUTTON_TEXT).setOrigin(0.5);
        const btnLeftIcon = this.add.nineslice(-150, 160, 25, 25, HAPPY_EMOTION_KEY, 0).setOrigin(0.5);    
        
        const buttonMiddle = this.add.nineslice(0, 160, 190, 45, BUTTON_KEY, 0).setOrigin(0.5);    
        const btnMiddleText = this.createButtonText(-30, 160, SAD_BUTTON_TEXT).setOrigin(0.5);
        const btnMiddleIcon = this.add.nineslice(50, 160, 25, 25, SAD_EMOTION_KEY, 0).setOrigin(0.5);    

        const buttonRight =  this.add.nineslice(200, 160, 190, 45, BUTTON_KEY, 0).setOrigin(0.5);    
        const btnRightText = this.createButtonText(180, 160, ANGRY_BUTTON_TEXT).setOrigin(0.5);
        const btnRightIcon = this.add.nineslice(260, 160, 25, 25, ANGRY_EMOTION_KEY, 0).setOrigin(0.5);    

        this.container.add(challengeImage);
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
                  .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_CHALLENGE_ONE_1, this.showFeedbackModal(false, buttonLeft); buttonLeft.setTint(0xff0000)})
                  .on('pointerover', () => { buttonLeft.setTint(0xfadcaa); })
                  .on('pointerout', () => { buttonLeft.clearTint(); })
        buttonMiddle.setInteractive()
                    .on('pointerdown', () => { this.feedbackText = POSITIVE_FEEDBACK_CHALLENGE_ONE, this.showFeedbackModal(true, buttonMiddle); buttonMiddle.setTint(0xff00) })
                    .on('pointerover', () => { buttonMiddle.setTint(0xfadcaa); })
                    .on('pointerout', () => { buttonMiddle.clearTint(); })
        buttonRight.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_CHALLENGE_ONE_2, this.showFeedbackModal(false, buttonRight); buttonRight.setTint(0xff0000) })
                   .on('pointerover', () => { buttonRight.setTint(0xfadcaa); })
                   .on('pointerout', () => { buttonRight.clearTint(); })
    }

    showChallengeTwo(width, height) {
        const challengeImage = this.add.nineslice(0, -height * 0.20, 200, 280, FEAR_CHILDREN_KEY, 0).setOrigin(0.5);    
        this.contentText = this.createContentText(0, 30, width, CHALLENGE_TWO_TEXT).setOrigin(0.5);    

        const buttonLeft = this.add.nineslice(-200, 160, 190, 45, BUTTON_KEY, 0).setOrigin(0.5);    
        const btnLeftText = this.createButtonText(-220, 160, FEAR_BUTTON_TEXT).setOrigin(0.5);
        const btnLeftIcon = this.add.nineslice(-150, 160, 25, 25, FEAR_EMOTION_KEY, 0).setOrigin(0.5);    
        
        const buttonMiddle = this.add.nineslice(0, 160, 190, 45, BUTTON_KEY, 0).setOrigin(0.5);    
        const btnMiddleText = this.createButtonText(-30, 160, ANGRY_BUTTON_TEXT).setOrigin(0.5);
        const btnMiddleIcon = this.add.nineslice(50, 160, 25, 25, ANGRY_EMOTION_KEY, 0).setOrigin(0.5);    

        const buttonRight =  this.add.nineslice(200, 160, 190, 45, BUTTON_KEY, 0).setOrigin(0.5);    
        const btnRightText = this.createButtonText(180, 160, SAD_BUTTON_TEXT).setOrigin(0.5);
        const btnRightIcon = this.add.nineslice(260, 160, 25, 25, SAD_EMOTION_KEY, 0).setOrigin(0.5);    

        this.container.add(challengeImage);
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
                  .on('pointerdown', () => { this.feedbackText = POSITIVE_FEEDBACK_CHALLENGE_TWO, this.showFeedbackModal(true, buttonLeft); buttonLeft.setTint(0xff00)})
                  .on('pointerover', () => { buttonLeft.setTint(0xfadcaa); })
                  .on('pointerout', () => { buttonLeft.clearTint(); })
        buttonMiddle.setInteractive()
                    .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_CHALLENGE_TWO_1, this.showFeedbackModal(false, buttonMiddle); buttonMiddle.setTint(0xff0000) })
                    .on('pointerover', () => { buttonMiddle.setTint(0xfadcaa); })
                    .on('pointerout', () => { buttonMiddle.clearTint(); })
        buttonRight.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_CHALLENGE_TWO_2, this.showFeedbackModal(false, buttonRight); buttonRight.setTint(0xff0000) })
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

    showFeedbackModal(isCorrect, button) {
        const successFeedback = this.scene.get('feedback-answer-modal');
        this.scene.launch('feedback-answer-modal', { correctAnswer: isCorrect, feedbackText: this.feedbackText });
        this.scene.pause();
    }
}
