import Phaser from 'phaser';

import TextLabel from '../ui/TextLabel';

const PANEL_DIALOG = 'panel1';

const BUTTON_KEY = 'button';
const CLICK_SOUND = 'click';
const BUTTON_SQUARE_KEY = 'buttonsquare';
const SAD_CHILDREN_IMAGE = 'sadchildren';
const FEAR_CHILDREN_IMAGE = 'fearchildren';
const HAPPY_CHILDREN_IMAGE = 'happychildren';
const KIDS_FIGHTING_IMAGE = 'kidsfighting'
const KIDS_FIGHTING_IMAGE_2 = 'kidsfighting2'
const SCREAMING_CHILDREN_IMAGE = 'screamingchildren';
const ALONE_CHILDREN_IMAGE = 'alonechildren';
const KIDS_BULLING_IMAGE = 'kidsbullying';
const QUESTION_SOUND = 'questionsound';

const SAD_EMOTION_KEY = 'sademotion';
const HAPPY_EMOTION_KEY = 'happyemotion';
const ANGRY_EMOTION_KEY = 'angryemotion';
const FEAR_EMOTION_KEY = 'fearemotion';
const DISGUSTED_EMOTION_KEY = 'disgustedemotion';
const BOY_WHEELCHAIR_IMAGE = 'boywheelchair';

const HAPPY_BUTTON_TEXT = 'Feliz';
const SAD_BUTTON_TEXT = 'Triste';
const ANGRY_BUTTON_TEXT = 'Com raiva';
const FEAR_BUTTON_TEXT = 'Com medo';
const DISGUSTED_BUTTON_TEXT = 'Com nojo';
const KIDS_FIGHTING_ANSWER_1 = 'Tomar o brinquedo de volta';
const KIDS_FIGHTING_ANSWER_2 = 'Empurrar o amiguinho';
const KIDS_FIGHTING_ANSWER_3 = 'Conversar e mostrar que não gostou da atitude';
const KIDS_FIGHTING_ANSWER_4 = 'Chamar o(a) professor(a)';
const KIDS_FIGHTING_ANSWER_5 = 'Bater no amiguinho';
const SCREAMING_CHILDREN_ANSWER_1 = 'Gritar até ganhar o carrinho';
const SCREAMING_CHILDREN_ANSWER_2 = 'Ouvir a mãe e conversar sobre isso em casa';
const SCREAMING_CHILDREN_ANSWER_3 = 'Pegar o brinquedo sem permissão'
const ALONE_CHILDREN_ANSWER_1 = 'Não fazer nada';
const ALONE_CHILDREN_ANSWER_2 = 'Dizer para os outros amigos ignorarem ela';
const ALONE_CHILDREN_ANSWER_3 = 'Perguntar se está tudo bem e chamar para brincar';
const BULLYING_ANSWER_1 = 'Conversar com ela e avisar a direção da escola';
const BULLYING_ANSWER_2 = 'Rir dela junto com Roberta';
const BOY_WHEELCHAIR_ANSWER_1 = 'Mostrar para os amigos e rir';
const BOY_WHEELCHAIR_ANSWER_2 = 'Oferecer ajuda e chamar adultos para ajudar';
const CHALLENGE_ONE_TEXT = 
`Julio não parece estar muito bem...
Como você acha que ele está se sentindo?`;

const CHALLENGE_TWO_TEXT = 
`Enquanto estava passando pela rua, Roberto se assustou com algo que viu...
 Ele está se sentindo: `;

const CHALLENGE_THREE_TEXT = 
`Matheus ficou sabendo que irá passar as férias na casa dos avós. Como 
 você acha que ele se sentiu? `;

const CHALLENGE_FOUR_TEXT = 
`Durante o horário do recreio, Victor e Benjamin decidiram brincar com o boneco de pelúcia. Victor disse que viu e pegou o boneco primeiro, mas Benjamin não aceitou e os dois começaram a disputar. 
 Benjamin acabou tomando o boneco da mão de Victor. O que Victor poderia ter feito?`;

const CHALLENGE_FIVE_TEXT = 
`Enquanto estavam brincando na escola, Roger puxou o cabelo da Camila. 
 Ela começou a chorar. O que Camila poderia fazer neste momento?`;

const CHALLENGE_SIX_TEXT = 
`Leonardo saiu com sua mãe para ir ao shopping. Ao passar pela loja de brinquedos, pediu a ela um carrinho que estava na vitrine. Como não 
 tinha dinheiro suficiente, ela não comprou. Leonardo, com raiva, começou a gritar e chorar pedindo o brinquedo. Como lidar com este sentimento?
`;

const CHALLENGE_SEVEN_TEXT = 
`Todos estavam brincando no pátio da escola, mas parece que a Roberta não está se divertindo muito...
  Como podemos ajudá-la?`;

const CHALLENGE_EIGHT_TEXT = 
`Todos os dias, ao chegar na escola, Roberta faz piadas sobre a aparência da Ana.
 Ana fica muito chateada. Como podemos ajudar?`;
 
const CHALLENGE_NINE_TEXT = 
`Martin precisa ir ao segundo andar da escola, mas o elevador está quebrado.
 Ele tentou usar a rampa de acesso, mas se deparou com alguns degraus e não consegue passar. 
 Ninguém parou para ajudar. O que fazer?`;


const POSITIVE_FEEDBACK_CHALLENGE_ONE = 
`Realmente, o nosso amiguinho está bem triste...
`;

const POSITIVE_FEEDBACK_CHALLENGE_TWO = 
`Ele tem muito medo de cachorros, 
 e viu um enquanto andava pela rua...`;

const POSITIVE_FEEDBACK_CHALLENGE_THREE = 
`Ele adora visitar os avós!
`;

const POSITIVE_FEEDBACK_CHALLENGE_FOUR = 
`Conversar é a melhor escolha!
 E você pode pedir ajuda a um adulto sempre
`;

const POSITIVE_FEEDBACK_CHALLENGE_FIVE = 
`O (A) professor(a) conversará com Roger sobre 
 esta atitude para que ele não faça mais isso 
`;

const POSITIVE_FEEDBACK_CHALLENGE_SIX = 
`É muito chato não ganhar o brinquedo, mas que tal
 juntar dinheiro em um cofrinho para comprar depois? 
`;

const POSITIVE_FEEDBACK_CHALLENGE_SEVEN = 
`As vezes a gente só precisa de alguém 
 que nos chame pra brincar! 
`;

const POSITIVE_FEEDBACK_CHALLENGE_EIGHT = 
`Os adultos conversarão com Roberta 
 para que ela não faça mais isso`;

const POSITIVE_FEEDBACK_BOY_WHEELCHAIR =
`Ajudar as pessoas é uma atitude muito legal!`;

const NEGATIVE_FEEDBACK_HAPPY =
`Repare novamente no nosso amiguinho. 
 Ele realmente está feliz?
`;

const NEGATIVE_FEEDBACK_ANGRY = 
`Tem certeza? Já vi outros amiguinhos com raiva, e esse
 não parece estar assim...`;

const NEGATIVE_FEEDBACK_SAD = 
`Não sei... 
Ele não parece estar triste...`;

const NEGATIVE_FEEDBACK_DISGUSTED = 
`Será mesmo que ele sentiu nojo?
 Não parece muito...
`;

const NEGATIVE_FEEDBACK_KIDS_FIGHTING_1 = 
`Não é legal tirar o brinquedo da mão dos amigos...`;

const NEGATIVE_FEEDBACK_KIDS_FIGHTING_2 = 
`O amiguinho pode se machucar, não faça isso!`;

const NEGATIVE_FEEDBACK_KIDS_FIGHTING_3 = 
`Brigar nunca é legal...`;

const NEGATIVE_FEEDBACK_SCREAMING_CHILDREN_1 =
`Não é legal gritar com ninguém...`;

const NEGATIVE_FEEDBACK_SCREAMING_CHILDREN_2 = 
`Não pode pegar algo que não é seu!`;

const NEGATIVE_FEEDBACK_ALONE_CHILDREN_1 =
`Tem certeza que é uma boa ideia deixá-la sozinha?`;

const NEGATIVE_FEEDBACK_ALONE_CHILDREN_2 = 
`Você gostaria que fizessem isso se fosse com você?`;

const NEGATIVE_FEEDBACK_BULLYING_1 = 
`Rir da aparência dos amigos não é nada legal...`;

const NEGATIVE_FEEDBACK_BOY_WHEELCHAIR_1 = 
`Não fazer nada? Tem certeza de que não pode ajudar?`;


export default class ChallengeModal extends Phaser.Scene {

    /** @type {Phaser.GameObjects.Container} */
    container;

    /** @type {string} */
    challengeId;

    /** @type {number} */
    gameLevel;
    scenePoints;
    attemptCounter;

    /** @type {string} */
    feedbackText;

    /** @type {boolean} */
    lastChallenge = false;

    questionSound;

    constructor() {
        super('challenge-modal');
        this.contentText = undefined;
        this.scenePoints = 0;
        this.attemptCounter = 0;
    }

    init(data) {
        this.gameLevel = data.gameLevel;
        this.challengeId = data.challengeId;
        this.charactedSelected = data.character;
    }

    preload() {
        this.load.image(SAD_CHILDREN_IMAGE, 'assets/sad_children.png');
        this.load.image(FEAR_CHILDREN_IMAGE, 'assets/fear_children.png');
        this.load.image(FEAR_EMOTION_KEY, 'assets/fear_icon.png')
        this.load.image(DISGUSTED_EMOTION_KEY, 'assets/disgusted_icon.png')
        this.load.image(HAPPY_CHILDREN_IMAGE, 'assets/happy_children.png');
        this.load.image(KIDS_FIGHTING_IMAGE, 'assets/kids_fighting.jpg');
        this.load.image(KIDS_FIGHTING_IMAGE_2, 'assets/kids_fighting_2.jpg');
        this.load.image(BUTTON_SQUARE_KEY, 'assets/button_square.png');
        this.load.image(SCREAMING_CHILDREN_IMAGE, 'assets/screaming_children.png');
        this.load.image(ALONE_CHILDREN_IMAGE, 'assets/alone_children.png');
        this.load.image(KIDS_BULLING_IMAGE, 'assets/kids_bulling.png');
        this.load.image(BOY_WHEELCHAIR_IMAGE, 'assets/boy_wheelchair.png');
        this.load.audio(QUESTION_SOUND, 'assets/audio/drum_loop.wav');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.container = this.add.container(width * 0.5, height + 20);
        const panel = this.add.nineslice(0, -10 , width * 0.8, height * 0.9, PANEL_DIALOG, 24).setOrigin(0.5);        
        this.container.add(panel);

        this.loadModalBody(width, height);

        this.questionSound = this.sound.add(QUESTION_SOUND, { loop: true, volume: 0.5 });
        this.questionSound.play();

        this.tweens.add({
            targets: this.container,
            y: height * 0.5,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        });  
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
                this.showChallengeThree(width, height);
            break;
        
            case 'CRATE_3':
                this.showChallengeFour(width, height);
            break;

            case 'CRATE_4':
                this.showChallengeFive(width, height);
            break;

            case 'CRATE_5':
                this.showChallengeSix(width, height);
            break;

            case 'CRATE_6':
                this.showChallengeSeven(width, height)
            break;
            
            case 'CRATE_7':
                this.showChallengeEight(width, height)
            break;
            
            case 'CRATE_8':
                this.showChallengeNine(width, height)
            break;

            default:
            break;
        }
    }

    showChallengeOne(width, height) {
        const challengeImage = this.add.nineslice(0, -height * 0.25, 180, 230, SAD_CHILDREN_IMAGE, 24).setOrigin(0.5);    
        this.contentText = this.createContentText(0, 0, width, CHALLENGE_ONE_TEXT, '26px').setOrigin(0.5);    

        const buttonLeft = this.add.nineslice(0, 140, 190, 45, BUTTON_KEY, 24).setOrigin(0.5);    
        const btnLeftText = this.createButtonText(-20, 140, HAPPY_BUTTON_TEXT).setOrigin(0.5);
        const btnLeftIcon = this.add.nineslice(40, 140, 25, 25, HAPPY_EMOTION_KEY, 0).setOrigin(0.5);    
        
        const buttonMiddle = this.add.nineslice(0, 200, 190, 45, BUTTON_KEY, 24).setOrigin(0.5);    
        const btnMiddleText = this.createButtonText(-20, 200, SAD_BUTTON_TEXT).setOrigin(0.5);
        const btnMiddleIcon = this.add.nineslice(40, 200, 25, 25, SAD_EMOTION_KEY, 0).setOrigin(0.5);    

        const buttonRight =  this.add.nineslice(0, 260, 190, 45, BUTTON_KEY, 24).setOrigin(0.5);    
        const btnRightText = this.createButtonText(-20, 260, ANGRY_BUTTON_TEXT).setOrigin(0.5);
        const btnRightIcon = this.add.nineslice(40, 260, 25, 25, ANGRY_EMOTION_KEY, 0).setOrigin(0.5);    

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
                  .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_HAPPY, this.showFeedbackModal(false); buttonLeft.setTint(0xff0000)})
                  .on('pointerover', () => { buttonLeft.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);  })
                  .on('pointerout', () => { buttonLeft.clearTint(); })
        buttonMiddle.setInteractive()
                    .on('pointerdown', () => { this.feedbackText = POSITIVE_FEEDBACK_CHALLENGE_ONE, this.showFeedbackModal(true); buttonMiddle.setTint(0xff00) })
                    .on('pointerover', () => { buttonMiddle.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                    .on('pointerout', () => { buttonMiddle.clearTint(); })
        buttonRight.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_ANGRY, this.showFeedbackModal(false); buttonRight.setTint(0xff0000) })
                   .on('pointerover', () => { buttonRight.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { buttonRight.clearTint(); })
    }

    showChallengeTwo(width, height) {
        const challengeImage = this.add.nineslice(0, -height * 0.30, 180, 210, FEAR_CHILDREN_IMAGE, 0).setOrigin(0.5);    
        this.contentText = this.createContentText(0, 0, width, CHALLENGE_TWO_TEXT,'26px').setOrigin(0.5);    

        const buttonLeft = this.add.nineslice(0, 140, 190, 45, BUTTON_KEY, 24).setOrigin(0.5);    
        const btnLeftText = this.createButtonText(-20, 140, FEAR_BUTTON_TEXT).setOrigin(0.5);
        const btnLeftIcon = this.add.nineslice(40, 140, 25, 25, FEAR_EMOTION_KEY, 0).setOrigin(0.5);    
        
        const buttonMiddle = this.add.nineslice(0, 200, 190, 45, BUTTON_KEY, 24).setOrigin(0.5);    
        const btnMiddleText = this.createButtonText(-20, 200, ANGRY_BUTTON_TEXT).setOrigin(0.5);
        const btnMiddleIcon = this.add.nineslice(40, 200, 25, 25, ANGRY_EMOTION_KEY, 0).setOrigin(0.5);    

        const buttonRight =  this.add.nineslice(0, 260, 190, 45, BUTTON_KEY, 24).setOrigin(0.5);    
        const btnRightText = this.createButtonText(-20, 260, SAD_BUTTON_TEXT).setOrigin(0.5);
        const btnRightIcon = this.add.nineslice(40, 260, 25, 25, SAD_EMOTION_KEY, 0).setOrigin(0.5);    

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
                  .on('pointerdown', () => { this.feedbackText = POSITIVE_FEEDBACK_CHALLENGE_TWO, this.showFeedbackModal(true); buttonLeft.setTint(0xff00)})
                  .on('pointerover', () => { buttonLeft.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                  .on('pointerout', () => { buttonLeft.clearTint(); })
        buttonMiddle.setInteractive()
                    .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_ANGRY, this.showFeedbackModal(false); buttonMiddle.setTint(0xff0000) })
                    .on('pointerover', () => { buttonMiddle.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                    .on('pointerout', () => { buttonMiddle.clearTint(); })
        buttonRight.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_SAD, this.showFeedbackModal(false); buttonRight.setTint(0xff0000) })
                   .on('pointerover', () => { buttonRight.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { buttonRight.clearTint(); })
    }

    showChallengeThree(width, height) {
        const challengeImage = this.add.nineslice(0, -height * 0.30, 180, 210, HAPPY_CHILDREN_IMAGE, 0).setOrigin(0.5);    
        this.contentText = this.createContentText(0, 0, width, CHALLENGE_THREE_TEXT, '26px').setOrigin(0.5);    

        const buttonLeft = this.add.nineslice(0, 140, 190, 45, BUTTON_KEY, 24).setOrigin(0.5);    
        const btnLeftText = this.createButtonText(-20, 140, ANGRY_BUTTON_TEXT).setOrigin(0.5);
        const btnLeftIcon = this.add.nineslice(40, 140, 25, 25, ANGRY_EMOTION_KEY, 0).setOrigin(0.5);    
        
        const buttonMiddle = this.add.nineslice(0, 200, 190, 45, BUTTON_KEY, 24).setOrigin(0.5);    
        const btnMiddleText = this.createButtonText(-20, 200, DISGUSTED_BUTTON_TEXT).setOrigin(0.5);
        const btnMiddleIcon = this.add.nineslice(40, 200, 25, 25, DISGUSTED_EMOTION_KEY, 0).setOrigin(0.5);    

        const buttonRight =  this.add.nineslice(0, 260, 190, 45, BUTTON_KEY, 24).setOrigin(0.5);    
        const btnRightText = this.createButtonText(-20, 260, HAPPY_BUTTON_TEXT).setOrigin(0.5);
        const btnRightIcon = this.add.nineslice(40, 260, 25, 25, HAPPY_EMOTION_KEY, 0).setOrigin(0.5);    

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
                  .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_ANGRY, this.showFeedbackModal(false); buttonLeft.setTint(0xff0000)})
                  .on('pointerover', () => { buttonLeft.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                  .on('pointerout', () => { buttonLeft.clearTint(); })
        buttonMiddle.setInteractive()
                    .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_DISGUSTED, this.showFeedbackModal(false); buttonMiddle.setTint(0xff0000) })
                    .on('pointerover', () => { buttonMiddle.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                    .on('pointerout', () => { buttonMiddle.clearTint(); })
        buttonRight.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = POSITIVE_FEEDBACK_CHALLENGE_THREE, this.showFeedbackModal(true); buttonRight.setTint(0xff00) })
                   .on('pointerover', () => { buttonRight.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { buttonRight.clearTint(); })
    }

    showChallengeFour(width, height) {
        const challengeImage = this.add.nineslice(0, -height * 0.32, 280, 180, KIDS_FIGHTING_IMAGE, 0).setOrigin(0.5);    
        this.contentText = this.createContentText(0, -17, width, CHALLENGE_FOUR_TEXT, '26px').setOrigin(0.5);    

        const firstOption = this.add.nineslice(0, 140, 400, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnLeftText = this.createButtonText(0, 140, KIDS_FIGHTING_ANSWER_1).setOrigin(0.5);    
        
        const secondOption = this.add.nineslice(0, 200, 400, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnMiddleText = this.createButtonText(0, 200, KIDS_FIGHTING_ANSWER_2).setOrigin(0.5);

        const thirdOption =  this.add.nineslice(0, 260, 400, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnRightText = this.createButtonText(0, 260, KIDS_FIGHTING_ANSWER_3).setOrigin(0.5);

        this.container.add(challengeImage);
        this.container.add(this.contentText);

        this.container.add(firstOption);
        this.container.add(btnLeftText);

        this.container.add(secondOption);
        this.container.add(btnMiddleText);

        this.container.add(thirdOption);
        this.container.add(btnRightText);

        firstOption.setInteractive()
                  .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_KIDS_FIGHTING_1, this.showFeedbackModal(false); firstOption.setTint(0xff0000)})
                  .on('pointerover', () => { firstOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                  .on('pointerout', () => { firstOption.clearTint(); })
        secondOption.setInteractive()
                    .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_KIDS_FIGHTING_2, this.showFeedbackModal(false); secondOption.setTint(0xff0000) })
                    .on('pointerover', () => { secondOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                    .on('pointerout', () => { secondOption.clearTint(); })
        thirdOption.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = POSITIVE_FEEDBACK_CHALLENGE_FOUR, this.showFeedbackModal(true); thirdOption.setTint(0xff00) })
                   .on('pointerover', () => { thirdOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { thirdOption.clearTint(); })
    }

    showChallengeFive(width, height) {
        const challengeImage = this.add.nineslice(0, -height * 0.25, 300, 210, KIDS_FIGHTING_IMAGE_2, 0).setOrigin(0.5);    
        this.contentText = this.createContentText(0, 10, width, CHALLENGE_FIVE_TEXT, '26px').setOrigin(0.5);    

        const firstOption = this.add.nineslice(0, 140, 400, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnLeftText = this.createButtonText(0, 140, KIDS_FIGHTING_ANSWER_5).setOrigin(0.5);
        
        const secondOption = this.add.nineslice(0, 200, 400, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnMiddleText = this.createButtonText(0, 200, KIDS_FIGHTING_ANSWER_4).setOrigin(0.5);

        const thirdOption =  this.add.nineslice(0, 260, 400, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnRightText = this.createButtonText(0, 260, KIDS_FIGHTING_ANSWER_2).setOrigin(0.5);

        this.container.add(challengeImage);
        this.container.add(this.contentText);

        this.container.add(firstOption);
        this.container.add(btnLeftText);

        this.container.add(secondOption);
        this.container.add(btnMiddleText);

        this.container.add(thirdOption);
        this.container.add(btnRightText);

        firstOption.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_KIDS_FIGHTING_3, this.showFeedbackModal(false); firstOption.setTint(0xff0000)})
                   .on('pointerover', () => { firstOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { firstOption.clearTint(); })
        secondOption.setInteractive()
                    .on('pointerdown', () => { this.feedbackText = POSITIVE_FEEDBACK_CHALLENGE_FIVE, this.showFeedbackModal(true); secondOption.setTint(0xff00) })
                    .on('pointerover', () => { secondOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                    .on('pointerout', () => { secondOption.clearTint(); })
        thirdOption.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_KIDS_FIGHTING_2, this.showFeedbackModal(false); thirdOption.setTint(0xff0000) })
                   .on('pointerover', () => { thirdOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { thirdOption.clearTint(); })
    }

    showChallengeSix(width, height) {
        const challengeImage = this.add.nineslice(0, -height * 0.30, 280, 230, SCREAMING_CHILDREN_IMAGE, 0).setOrigin(0.5);    
        this.contentText = this.createContentText(0, 5, width, CHALLENGE_SIX_TEXT, '26px', 600).setOrigin(0.5);    

        const firstOption = this.add.nineslice(0, 140, 490, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnLeftText = this.createButtonText(0, 140, SCREAMING_CHILDREN_ANSWER_1).setOrigin(0.5);
        
        const secondOption = this.add.nineslice(0, 200, 490, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnMiddleText = this.createButtonText(0, 200, SCREAMING_CHILDREN_ANSWER_2).setOrigin(0.5);

        const thirdOption =  this.add.nineslice(0, 260, 490, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnRightText = this.createButtonText(0, 260, SCREAMING_CHILDREN_ANSWER_3).setOrigin(0.5);

        this.container.add(challengeImage);
        this.container.add(this.contentText);

        this.container.add(firstOption);
        this.container.add(btnLeftText);

        this.container.add(secondOption);
        this.container.add(btnMiddleText);

        this.container.add(thirdOption);
        this.container.add(btnRightText);

        firstOption.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_SCREAMING_CHILDREN_1, this.showFeedbackModal(false); firstOption.setTint(0xff0000)})
                   .on('pointerover', () => { firstOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { firstOption.clearTint(); })
        secondOption.setInteractive()
                    .on('pointerdown', () => { this.feedbackText = POSITIVE_FEEDBACK_CHALLENGE_SIX, this.showFeedbackModal(true); secondOption.setTint(0xff00) })
                    .on('pointerover', () => { secondOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                    .on('pointerout', () => { secondOption.clearTint(); })
        thirdOption.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_SCREAMING_CHILDREN_2, this.showFeedbackModal(false); thirdOption.setTint(0xff0000) })
                   .on('pointerover', () => { thirdOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { thirdOption.clearTint(); })
    }

    showChallengeSeven(width, height) {
        const challengeImage = this.add.nineslice(0, -height * 0.25, 310, 300, ALONE_CHILDREN_IMAGE, 27).setOrigin(0.5);    
        this.contentText = this.createContentText(0, 30, width, CHALLENGE_SEVEN_TEXT, '26px', 600).setOrigin(0.5);    

        const firstOption = this.add.nineslice(0, 140, 440, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnLeftText = this.createButtonText(0, 140, ALONE_CHILDREN_ANSWER_1).setOrigin(0.5);
        
        const secondOption = this.add.nineslice(0, 200, 440, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnMiddleText = this.createButtonText(0, 200, ALONE_CHILDREN_ANSWER_2).setOrigin(0.5);

        const thirdOption =  this.add.nineslice(0, 260, 440, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnRightText = this.createButtonText(0, 260, ALONE_CHILDREN_ANSWER_3).setOrigin(0.5);

        this.container.add(challengeImage);
        this.container.add(this.contentText);

        this.container.add(firstOption);
        this.container.add(btnLeftText);

        this.container.add(secondOption);
        this.container.add(btnMiddleText);

        this.container.add(thirdOption);
        this.container.add(btnRightText);

        firstOption.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_ALONE_CHILDREN_1, this.showFeedbackModal(false); firstOption.setTint(0xff0000)})
                   .on('pointerover', () => { firstOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { firstOption.clearTint(); })
        secondOption.setInteractive()
                    .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_ALONE_CHILDREN_2, this.showFeedbackModal(false); secondOption.setTint(0xff0000) })
                    .on('pointerover', () => { secondOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                    .on('pointerout', () => { secondOption.clearTint(); })
        thirdOption.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = POSITIVE_FEEDBACK_CHALLENGE_SEVEN, this.showFeedbackModal(true); thirdOption.setTint(0xff00); })
                   .on('pointerover', () => { thirdOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { thirdOption.clearTint(); })
    }

    showChallengeEight(width, height) {
        const challengeImage = this.add.nineslice(0, -height * 0.25, 310, 300, KIDS_BULLING_IMAGE, 27).setOrigin(0.5);    
        this.contentText = this.createContentText(0, 30, width, CHALLENGE_EIGHT_TEXT, '26px', 600).setOrigin(0.5);    

        const firstOption = this.add.nineslice(0, 140, 440, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnLeftText = this.createButtonText(0, 140, BULLYING_ANSWER_2).setOrigin(0.5);
        
        const secondOption = this.add.nineslice(0, 200, 440, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnMiddleText = this.createButtonText(0, 200, BULLYING_ANSWER_1).setOrigin(0.5);

        const thirdOption =  this.add.nineslice(0, 260, 440, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnRightText = this.createButtonText(0, 260, ALONE_CHILDREN_ANSWER_1).setOrigin(0.5);

        this.container.add(challengeImage);
        this.container.add(this.contentText);

        this.container.add(firstOption);
        this.container.add(btnLeftText);

        this.container.add(secondOption);
        this.container.add(btnMiddleText);

        this.container.add(thirdOption);
        this.container.add(btnRightText);

        firstOption.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_BULLYING_1, this.showFeedbackModal(false); firstOption.setTint(0xff0000)})
                   .on('pointerover', () => { firstOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { firstOption.clearTint(); })
        secondOption.setInteractive()
                    .on('pointerdown', () => { this.feedbackText = POSITIVE_FEEDBACK_CHALLENGE_EIGHT, this.showFeedbackModal(true); secondOption.setTint(0xff00) })
                    .on('pointerover', () => { secondOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                    .on('pointerout', () => { secondOption.clearTint(); })
        thirdOption.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_ALONE_CHILDREN_2, this.showFeedbackModal(false); thirdOption.setTint(0xff0000); })
                   .on('pointerover', () => { thirdOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { thirdOption.clearTint(); })
    }

    showChallengeNine(width, height) {
        this.lastChallenge = true;

        const challengeImage = this.add.nineslice(0, -height * 0.25, 310, 300, BOY_WHEELCHAIR_IMAGE, 27).setOrigin(0.5);    
        this.contentText = this.createContentText(0, 25, width, CHALLENGE_NINE_TEXT, '26px', 700).setOrigin(0.5);    

        const firstOption = this.add.nineslice(0, 140, 440, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnLeftText = this.createButtonText(0, 140, BOY_WHEELCHAIR_ANSWER_1).setOrigin(0.5);
        
        const secondOption = this.add.nineslice(0, 200, 440, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnMiddleText = this.createButtonText(0, 200, BOY_WHEELCHAIR_ANSWER_2).setOrigin(0.5);

        const thirdOption =  this.add.nineslice(0, 260, 440, 48, BUTTON_SQUARE_KEY, 24).setOrigin(0.5);    
        const btnRightText = this.createButtonText(0, 260, ALONE_CHILDREN_ANSWER_1).setOrigin(0.5);

        this.container.add(challengeImage);
        this.container.add(this.contentText);

        this.container.add(firstOption);
        this.container.add(btnLeftText);

        this.container.add(secondOption);
        this.container.add(btnMiddleText);

        this.container.add(thirdOption);
        this.container.add(btnRightText);

        firstOption.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_ALONE_CHILDREN_2, this.showFeedbackModal(false); firstOption.setTint(0xff0000)})
                   .on('pointerover', () => { firstOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { firstOption.clearTint(); })
        secondOption.setInteractive()
                    .on('pointerdown', () => { this.feedbackText = POSITIVE_FEEDBACK_BOY_WHEELCHAIR, this.showFeedbackModal(true); secondOption.setTint(0xff00) })
                    .on('pointerover', () => { secondOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                    .on('pointerout', () => { secondOption.clearTint(); })
        thirdOption.setInteractive()
                   .on('pointerdown', () => { this.feedbackText = NEGATIVE_FEEDBACK_BOY_WHEELCHAIR_1, this.showFeedbackModal(false); thirdOption.setTint(0xff0000); })
                   .on('pointerover', () => { thirdOption.setTint(0xfadcaa); this.sound.play(CLICK_SOUND);})
                   .on('pointerout', () => { thirdOption.clearTint(); })
    }

    createContentText(x, y, width, text, fontSize, wordWrap,) {
        if(wordWrap == undefined) {
            wordWrap = width / 2;
        }

        if(fontSize == undefined) {
            fontSize = '23px';
        }
        const style = { fontFamily: 'Comic Sans MS', fontSize: fontSize, fill: '#000', align: 'center', padding: 10, wordWrap: { width: wordWrap } };
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

    updateAttemptCounter(isCorrectAnswer) {
        if(isCorrectAnswer == false) {
            this.attemptCounter++;
        } else {
            return;
        }
    }

    setScenePoints() {
        this.attemptCounter == 0 ? this.scenePoints = 10 : this.scenePoints = 5;
        this.attemptCounter = 0;
    }

    checkAnswer(isCorrectAnswer)  {
        this.updateAttemptCounter(isCorrectAnswer);
        if(isCorrectAnswer == true) {
            this.setScenePoints();
        }
    }

    showFeedbackModal(isCorrectAnswer) 
    {
        this.checkAnswer(isCorrectAnswer);
        this.scene.pause();
        this.scene.launch('feedback-answer-modal', { correctAnswer: isCorrectAnswer, feedbackText: this.feedbackText, lastChallenge: this.lastChallenge, character: this.charactedSelected, scenePoints: this.scenePoints });
    }

    hide(height) {
        this.tweens.add({
            targets: this.container,
            y: height * 1.5,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        });  
    }
}
