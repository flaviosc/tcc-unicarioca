import Phaser from 'phaser'
import SceneKeys from '../consts/SceneKeys'

export default class GameScene extends Phaser.Scene
{
	constructor()
	{
		super(SceneKeys.Game)
	}

	preload()
    {
         
    }
    
    create()
    {
        const width = this.scale.width;
        const height = this.scale.height;

        this.scene.get(SceneKeys.Background);
    }
}
