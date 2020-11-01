import Phaser, { Cameras } from 'phaser';

const SKY = 'sky';
const MOUNTAIN = 'mointains';
const PLATEAU = 'plateau';
const GROUND = 'ground';
const PLANTS = 'plants';

const PLATFORM_LEFT = 'platformleft';
const PLATFORM_MIDDLE = 'platformmiddle';
const PLATFORM_RIGHT = 'platformright';

/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {number} totalWidth 
 * @param {string} texture 
 * @param {number} scrollFactor 
 */

const repeatBackgroundAssets = (scene, totalWidth, texture, scrollFactor) => {
    const sourceWidth = scene.textures.get(texture).getSourceImage().width;    
    const count = Math.ceil(totalWidth / sourceWidth) * scrollFactor;

    let x = 0;

    for (let i = 0; i < count; ++i) {
        const textureBackground = scene.add.image(x, scene.scale.height, texture)
        .setOrigin(0, 1)
        .setScrollFactor(scrollFactor);   

        x += textureBackground.width;
    }
}


export default class BackgroundScene extends Phaser.Scene
{
    /** @type {Phaser.Physics.Arcade.StaticGroup} */
    platforms;

	constructor()
	{
        super('background-scene');
        this.platforms = null;
	}

	preload()
    {
        this.load.image(SKY, 'assets/sky.png'); 
        this.load.image(MOUNTAIN, 'assets/mountains.png');
        this.load.image(PLATEAU, 'assets/plateau.png');
        this.load.image(GROUND, 'assets/ground.png');
        this.load.image(PLANTS, 'assets/plant.png');

        this.load.image(PLATFORM_LEFT, 'assets/platform_left.png'); 
        this.load.image(PLATFORM_MIDDLE, 'assets/platform_middle.png');
        this.load.image(PLATFORM_RIGHT, 'assets/platform_right.png');

        this.load.spritesheet('girlplayer', 'assets/female_tilesheet.png', { frameWidth: 80, frameHeight: 100 });

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    create()
    {
        const width = this.scale.width;
        const height = this.scale.height;
        const totalWidth = width * 10;

        this.add.image(width * 0.5, height * 0.5, SKY)
                .setScrollFactor(0);
   
        repeatBackgroundAssets(this, totalWidth, MOUNTAIN, 0.25);
        repeatBackgroundAssets(this, totalWidth, PLATEAU, 0.50);
        repeatBackgroundAssets(this, totalWidth, GROUND, 1);
        repeatBackgroundAssets(this, totalWidth, PLANTS, 1.25);
        
        this.platforms = this.createPlatforms();

        this.cameras.main.setBounds(0, 0, width * 10, height);

        this.gameScene = this.scene.get('game-scene');
        this.scene.launch('game-scene');
    }

    update() {
        const camera = this.cameras.main;
        const speed = 3;

        if(this.cursors.left.isDown){
            camera.scrollX -= speed; 
        } else if (this.cursors.right.isDown) {
            camera.scrollX += speed;
        }
    }

    createPlatforms() {
        const width = this.scale.width;
        const height = this.scale.height;

        const platforms = this.physics.add.staticGroup();
        
        platforms.create(450, height * 0.6, PLATFORM_LEFT);
        platforms.create(578, height * 0.6, PLATFORM_MIDDLE);
        platforms.create(706, height * 0.6, PLATFORM_RIGHT);

        platforms.create(920, height * 0.4, PLATFORM_LEFT);
        platforms.create(1048, height * 0.4, PLATFORM_MIDDLE);
        platforms.create(1176, height * 0.4, PLATFORM_RIGHT);

        platforms.create(1390, height * 0.2, PLATFORM_LEFT);
        platforms.create(1518, height * 0.2, PLATFORM_MIDDLE);
        platforms.create(1646, height * 0.2, PLATFORM_RIGHT);

        return platforms;
    }
}
