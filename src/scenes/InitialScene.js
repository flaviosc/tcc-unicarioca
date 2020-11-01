import Phaser from 'phaser';

/** @type {string} */
const GIRL_PLAYER = 'girlplayer';

export default class GameScene extends Phaser.Scene
{
  /** @type {Phaser.Scene} */
  gameScene;

	constructor()
	{
    super('initial-scene');
	}

    
  create()
  {
    const width = this.scale.width;
    const height = this.scale.height;

    this.gameScene = this.scene.get('game-scene');
    this
  }

  update() {

  }
}
