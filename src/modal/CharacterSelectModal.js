import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';
import UiImage from '../ui/UiImage';

const PANEL_DIALOG = 'panel1';

const HEADER_LABEL = 'Escolha e clique em um dos personagens abaixo:';
const GIRL_PLAYER = 'girlplayer';
const BOY_PLAYER = 'boyplayer';

export default class CharacterSelectModal extends Phaser.Scene {
    playerName;

    constructor() {
        super('character-select-modal');
    }

    init(config) {
        this.playerName = config.playerName;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
    
        this.container = this.add.container(width * 0.5, height * 0.5);
        const panel = this.add.nineslice(0, -10 , width * 0.8, height * 0.9, PANEL_DIALOG, 24).setOrigin(0.5);        

        const labelText = new TextLabel(this, 0, -height * 0.25, HEADER_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width / 2 } }).setOrigin(0.5)

        const girlPlayer = new UiImage(this, -width * 0.15, 0, GIRL_PLAYER)
                                .setOrigin(0.5)
                                .setSize(500, 200)
                                .setInteractive()
                                .on('pointerdown', () => { this.startGame(GIRL_PLAYER) })
                                .on('pointerover', () => { girlPlayer.setTint(0xf4e7d0); })
                                .on('pointerout', () => { girlPlayer.clearTint(); });;

        const boyPlayer = new UiImage(this, width * 0.1, 0, BOY_PLAYER)
                                .setOrigin(0.5)
                                .setSize(500, 200)
                                .setInteractive()
                                .on('pointerdown', () => { this.startGame(BOY_PLAYER) })
                                .on('pointerover', () => { boyPlayer.setTint(0xf4e7d0); })
                                .on('pointerout', () => { boyPlayer.clearTint(); });

        this.container.add(panel);
        this.container.add(girlPlayer);
        this.container.add(boyPlayer);
        this.container.add(labelText);
    }


    startGame(character) {
        console.log(character);
        this.scene.stop();
        this.scene.resume('game-scene', { scene: 'character-select', playerName: this.playerName, characterSelected: character });
    }
}