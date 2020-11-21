import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';
import UiImage from '../ui/UiImage';
import UpdateLocalStorageData from '../util/UpdateLocalStorageData';

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
  
        const mainPanel = this.add.nineslice(0, -10 , width * 0.8, height * 0.9, PANEL_DIALOG, 24)
        .setOrigin(0.5); 

        const headerText = new TextLabel(this, 0, -height * 0.3, HEADER_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width / 2 } })
                                .setOrigin(0.5);

        const nameColumn = new TextLabel(this, -width * 0.3, -height * 0.2, 'Nome', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'center', padding: 10 }).setOrigin(0.5);
        const pointsColumn = new TextLabel(this, 0, -height * 0.2, 'Pontuação', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'center', padding: 10 }).setOrigin(0.5);
        const moodColumn = new TextLabel(this, width * 0.3, -height * 0.2, 'Como está se sentindo', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'center', padding: 10 }).setOrigin(0.5);

        const buttonImage = new UiImage(this, 0, height * 0.3, BUTTON_KEY)
                                .setOrigin(0.5)
                                .setInteractive()
                                .on('pointerdown', () => { this.returnToStartModal(); })
                                .on('pointerover', () => { buttonImage.setTint(0xfadcaa); })
                                .on('pointerout', () => { buttonImage.clearTint(); });

        const buttonText = new TextLabel(this, 0, height * 0.3, 'Retornar ao início', { fontFamily: 'Comic Sans MS', fontSize: '18px', fill: '#000', align: 'right', padding: 10 }).setOrigin(0.5);

        this.container.add(mainPanel);
        this.container.add(headerText);
        this.container.add(nameColumn);
        this.container.add(pointsColumn);
        this.container.add(moodColumn);
        this.container.add(buttonImage);
        this.container.add(buttonText);

        this.showRankingList(width, height);

    }

    showRankingList(width, height) {
        this.getGameHistory();
        let paddingHeight = -height * 0.1;

        if(this.gameHistory && this.gameHistory.length > 0) {

            this.gameHistory.forEach(playerData => {           
                const name = new TextLabel(this, -width * 0.3, paddingHeight, playerData.playerName, { fontSize: '25px', fill: '#000', fontStyle: 'bold' }).setOrigin(0.5);
                const points = new TextLabel(this, 0, paddingHeight, playerData.playerPoints, { fontSize: '25px', fill: '#000', fontStyle: 'bold' }).setOrigin(0.5);
                const mood = new TextLabel(this, width * 0.3, paddingHeight, playerData.playerMood, { fontSize: '25px', fill: '#000', fontStyle: 'bold' }).setOrigin(0.5);

                this.container.add(name);
                this.container.add(points);
                this.container.add(mood);

                paddingHeight += 50;
            });
        } else {
            const defaultLabel = new TextLabel(this, 0, 0, 'Sem dados para exibição no momento', { fontSize: '25px', fill: '#000', fontStyle: 'bold' }).setOrigin(0.5);
            this.container.add(defaultLabel);
        }
    }

    getGameHistory() {
        this.gameHistory = new UpdateLocalStorageData().getData();
    }

    returnToStartModal() {
        this.scene.stop();
        this.startModal = this.scene.get('start-modal');
        this.scene.start('start-modal', { scene: 'ranking-modal' });
    }
}