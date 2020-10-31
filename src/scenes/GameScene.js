import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene
{
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

        let teste = this.scene.get("background-scene");
        console.log(teste.scale);
    }
}
