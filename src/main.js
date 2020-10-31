import Phaser, { Game } from 'phaser'
import BackgroundScene from './scenes/BackgroundScene'
import GameScene from './scenes/GameScene'


const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scale: {
		mode: Phaser.Scale.RESIZE,
		parent: 'game-scene',
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [BackgroundScene, GameScene]
}

export default new Phaser.Game(config)
