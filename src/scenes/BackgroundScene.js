import Phaser from 'phaser';

export default class BackgroundScene extends Phaser.Scene
{
	constructor()
	{
		super("background-scene");
	}

	preload()
    {
        this.load.image('background', 'assets/background.png');   
    }
    
    create()
    {
        const background = this.add.image(300, 300, 'background').setOrigin(0, 0);
    }
}
