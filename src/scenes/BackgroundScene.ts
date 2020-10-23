import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';

export default class BackgroundScene extends Phaser.Scene
{
	constructor()
	{
		super(SceneKeys.Background);
	}

	preload()
    {
        this.load.image('background', 'assets/background.png');   
    }
    
    create()
    {
        const background = this.add.image(100, 300, 'background').setOrigin(0, 0);
    }
}
