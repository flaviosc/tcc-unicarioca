import Phaser, { Cameras } from 'phaser';

/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {number} count 
 * @param {string} texture 
 * @param {number} scrollFactor 
 */

const repeatBackgroundAssets = (scene, count, texture, scrollFactor) => {
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
	constructor()
	{
		super("background-scene");
	}

	preload()
    {
        this.load.image('sky', 'assets/sky.png'); 
        this.load.image('mountain', 'assets/mountains.png');
        this.load.image('plateau', 'assets/plateau.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('plants', 'assets/plant.png');

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    create()
    {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add.image(width * 0.5, height * 0.5, 'sky')
                .setScrollFactor(0);
   
        repeatBackgroundAssets(this, 3, 'mountain', 0.25);
        repeatBackgroundAssets(this, 3, 'plateau', 0.50);
        repeatBackgroundAssets(this, 5, 'ground', 1);
        repeatBackgroundAssets(this, 3, 'plants', 1.25);

        this.cameras.main.setBounds(0, 0, width * 10, height);
    }

    update() {
        const camera = this.cameras.main;
        const speed = 6;

        if(this.cursors.left.isDown){
            camera.scrollX -= speed; 
        } else if (this.cursors.right.isDown) {
            camera.scrollX += speed;
        }
    }
}
