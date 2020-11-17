import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';
import UiImage from '../ui/UiImage';

const PANEL_DIALOG = 'panel1';
const PANEL_FEEDBACK = 'panel2';
const GAME_HISTORY = 'gameHistory';
const BUTTON_KEY = 'button';

const HEADER_LABEL = 
`Ranking`;

export default class RankingModal extends Phaser.Scene {
    gameHistory;

    constructor() {
        super('ranking-modal');
    }


    create() {
        const width = this.scale.width;
        const height = this.scale.height;
    
        this.container = this.add.container(width * 0.5, height * 0.5);
        const panel = this.add.nineslice(0, -10 , width * 0.8, height * 0.9, PANEL_DIALOG, 24).
                                  setOrigin(0.5);  
                                  
        const headerText = new TextLabel(this, 0, -height * 0.3, HEADER_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width / 2 } }).setOrigin(0.5);

        const buttonImage = new UiImage(this, 0, height * 0.3, BUTTON_KEY)
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => { this.returnToStartModal(); })
        .on('pointerover', () => { buttonImage.setTint(0xfadcaa); })
        .on('pointerout', () => { buttonImage.clearTint(); });

        const buttonText = new TextLabel(this, 0, height * 0.3, 'Retornar ao início', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 }).setOrigin(0.5);

        this.container.add(panel);
        this.container.add(headerText);
        this.container.add(buttonImage);
        this.container.add(buttonText);

        this.showModalBody();

    }

    getLocalStorage() {
        this.gameHistory = localStorage.getItem(GAME_HISTORY);
    }

    showModalBody() {
        if(this.gameHistory && this.gameHistory.length > 0) {
            this.gameHistory.forEach(element => {
                const panel = this.add.nineslice(0, -20, 500, 50, PANEL_FEEDBACK, 24).setOrigin(0.5);
    
            });
        }
    }


    returnToStartModal() {
        this.scene.stop();
        this.startModal = this.scene.get('start-modal');
        this.scene.start('start-modal');
    }
}