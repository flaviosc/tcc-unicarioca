import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';
import UiImage from '../ui/UiImage';

const PANEL_DIALOG = 'panel1';
const BUTTON_KEY = 'button';
const END_GAME_SOUND = 'endsound';
const CLICK_SOUND = 'click';
const GIRL_PLAYER = 'girlplayer';
const BOY_PLAYER = 'boyplayer';
const BOY_PLAYER_ENDGAME = 'boyplayerend';
const GIRL_PLAYER_ENDGAME = 'girlplayerend'

const HEADER_LABEL = 
`Parabéns!`;

const BODY_LABEL = 
`Com a sua ajuda, conseguimos resolver todos os desafios!
 \nEspero que tenha se divertido, e até a próxima!`;

export default class EndGameModal extends Phaser.Scene {

    /**@type {string} */
    characterSelected;

    constructor() {
        super('end-game-modal');
    }

    init(data) {
        this.characterSelected = data.character;
    }

    preload() {
        this.load.image(GIRL_PLAYER_ENDGAME, 'assets/girl_player_endgame.png');
        this.load.image(BOY_PLAYER_ENDGAME, 'assets/boy_player_endgame.png');
        this.load.audio(END_GAME_SOUND, 'assets/audio/kids_cheering_sound.mp3');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
    
        const buttonSound = this.sound.add(CLICK_SOUND, { volume: 0.5 });

        this.container = this.add.container(width * 0.5, height * 0.5);
        const panel = this.add.nineslice(0, -10 , width * 0.8, height * 0.9, PANEL_DIALOG, 24).setOrigin(0.5);        
        this.container.add(panel);
                                  
        const headerText = new TextLabel(this, 0, -height * 0.3, HEADER_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width * 0.5 } }).setOrigin(0.5);

        const bodyText = new TextLabel(this, 0, 0, BODY_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '28px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width * 0.5 } }).setOrigin(0.5);

        const finalButton =  this.add.nineslice(0, height * 0.2, 190, 45, BUTTON_KEY, 0).setOrigin(0.5);    

        const buttonText = new TextLabel(this, 0, height * 0.2, 'Retornar ao início', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 })
                               .setOrigin(0.5);

        let finalImagePlayer;
        if(this.characterSelected == GIRL_PLAYER) {
            finalImagePlayer = new UiImage(this, 0, -height * 0.20, GIRL_PLAYER_ENDGAME)
            .setOrigin(0.5);
        } else if (this.characterSelected == BOY_PLAYER) {
            finalImagePlayer = new UiImage(this, 0, -height * 0.20, BOY_PLAYER_ENDGAME)
            .setOrigin(0.5);
        }

        finalButton.setInteractive()
                  .on('pointerdown', () => { this.restartGame(); })
                  .on('pointerover', () => { finalButton.setTint(0xfadcaa); buttonSound.play();  })
                  .on('pointerout', () => { finalButton.clearTint(); })

        this.container.add(headerText);
        this.container.add(finalImagePlayer);
        this.container.add(bodyText);
        this.container.add(finalButton);
        this.container.add(buttonText);

        this.sound.add(END_GAME_SOUND, { volume: 0.5 }).play();
    }

    restartGame() {   
        window.location.reload();
    }
}