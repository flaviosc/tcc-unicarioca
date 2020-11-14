import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';
import UiImage from '../ui/UiImage';

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
    
        this.container = this.add.container(width * 0.5, 200);
        const panel = this.add.nineslice(width * 0.1, height * 0.05, width * 0.8, height * 0.8, 'panel1', 24).setOrigin(0,0);

        const labelText = new TextLabel(this, width * 0.32, height * 0.2, HEADER_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: 500 } }).setOrigin(0,0)

        const girlPlayer = new UiImage(this, width * 0.40, height * 0.40, GIRL_PLAYER)
                                .setOrigin(0)
                                .setSize(500, 200)
                                .setInteractive()
                                .on('pointerdown', () => { this.startGame(GIRL_PLAYER) })
                                .on('pointerover', () => { girlPlayer.setTint(0xf4e7d0); })
                                .on('pointerout', () => { girlPlayer.clearTint(); });;

        const boyPlayer = new UiImage(this, width * 0.60, height * 0.40, BOY_PLAYER)
                                .setOrigin(0)
                                .setSize(500, 200)
                                .setInteractive()
                                .on('pointerdown', () => { this.startGame(BOY_PLAYER) })
                                .on('pointerover', () => { boyPlayer.setTint(0xf4e7d0); })
                                .on('pointerout', () => { boyPlayer.clearTint(); });

        this.add.existing(panel);
        this.add.existing(girlPlayer);
        this.add.existing(boyPlayer);
        this.add.existing(labelText);
    }


    startGame(character) {
        console.log(character);
        this.scene.stop();
        this.scene.resume('game-scene', { scene: 'character-select', playerName: this.playerName, characterSelected: character });
    }
}