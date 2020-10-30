import Phaser from 'phaser';

export default class BackgroundScene extends Phaser.Scene {
    gameScene;
    
    constructor() {
        super('background-scene');
    }

    preload(){
        // this.load.image('bigsky', 'assets/bigsky.png');
        this.load.image('bg2', 'assets/background2.png');
        // this.load.image('ground', 'assets/platform.png');
        this.load.image('leftplatform', 'assets/1.png');
        this.load.image('middleplatform', 'assets/2.png');
        this.load.image('rightplatform', 'assets/3.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('girlplayer', 'assets/female_tilesheet.png', { frameWidth: 80, frameHeight: 100 });
    }

    create(){
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;
        const backgroundSky = this.add.image(150, 345, 'bg2').setOrigin(0, 0);

        this.gameScene = this.scene.get('game-scene');
        this.scene.launch('game-scene');
    }

    updateCamera ()
    {
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        const camera = this.cameras.main;

        const zoom = this.gameScene.getZoom();
        const offset = 120 * zoom;

        camera.setZoom(zoom);
        camera.centerOn(1400 / 2, (1200 / 2) + 120);
    }
}