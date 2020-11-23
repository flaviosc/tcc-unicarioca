import Phaser from 'phaser';
import TextLabel from '../ui/TextLabel';
import UiImage from '../ui/UiImage';
import UpdateLocalStorageData from '../util/UpdateLocalStorageData';

const PANEL_DIALOG = 'panel1';
const CLICK_SOUND = 'click';

const HEADER_LABEL = 'Escolha e clique em um dos personagens abaixo:';
const GIRL_PLAYER = 'girlplayer';
const BOY_PLAYER = 'boyplayer';

export default class CharacterSelectModal extends Phaser.Scene {

    constructor() {
        super('character-select-modal');
    }

    init(data) {
        this.playerData = data.playerData;
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
    
        this.container = this.add.container(width * 0.5, height * 0.5);
        const panel = this.add.nineslice(0, -10 , width * 0.8, height * 0.9, PANEL_DIALOG, 24).setOrigin(0.5);        

        const labelText = new TextLabel(this, 0, -height * 0.25, HEADER_LABEL, { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#000', align: 'center', padding: 10, wordWrap: { width: width / 2 } }).setOrigin(0.5)

        const girlPlayer = new UiImage(this, -width * 0.15, 0, GIRL_PLAYER)
                                .setOrigin(0.5)
                                .setInteractive()
                                .on('pointerdown', () => { this.startGame(GIRL_PLAYER) })
                                .on('pointerover', () => { girlPlayer.setTint(0xf4e7d0); girlPlayer.displayWidth = 90; girlPlayer.displayHeight = 120; this.sound.play(CLICK_SOUND); })
                                .on('pointerout', () => { girlPlayer.clearTint(); girlPlayer.displayWidth = 80; girlPlayer.displayHeight = 110;});;

        const boyPlayer = new UiImage(this, width * 0.1, 0, BOY_PLAYER)
                                .setOrigin(0.5)
                                .setInteractive()
                                .on('pointerdown', () => { this.startGame(BOY_PLAYER); })
                                .on('pointerover', () => { boyPlayer.setTint(0xf4e7d0); boyPlayer.displayWidth = 90; boyPlayer.displayHeight = 120; this.sound.play(CLICK_SOUND);})
                                .on('pointerout', () => { boyPlayer.clearTint(); boyPlayer.displayWidth = 80; boyPlayer.displayHeight = 110; });

        this.container.add(panel);
        this.container.add(girlPlayer);
        this.container.add(boyPlayer);
        this.container.add(labelText);
    }

    startGame(character) {
        this.updateLocalStorage(character);
        this.scene.stop();
        this.scene.resume('game-scene', { scene: 'character-select', playerData: this.playerData });
    }

    updateLocalStorage(character) {  
        console.log(character);
        this.playerData.playerCharacter = character;      
        const updateData = new UpdateLocalStorageData(this.playerData).setData();
    }
}