import Phaser from 'phaser'

import GameScene from './scenes/GameScene'
import BackgroundScene from './scenes/BackgroundScene'

const config = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.RESIZE,
		parent: 'game-scene',
        width: 800,
        height: 600,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 100 }
		}
	},
	scene: [BackgroundScene, GameScene]
}

export default new Phaser.Game(config)
