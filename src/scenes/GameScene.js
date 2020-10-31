import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene
{
    /** @type {Phaser.Scene} */
    backgroundScene;
    
	constructor()
	{
		super("game-scene")
	}

	preload()
    {

    }
    
    create()
    {
        const width = this.scale.width;
        const height = this.scale.height;

        this.backgroundScene = this.scene.get('background-scene');
    }

    update() {

    }
}
