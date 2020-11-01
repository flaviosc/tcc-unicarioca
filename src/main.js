import Phaser, { Game } from 'phaser'
import GameScene from './scenes/GameScene'
import InitialScene from './scenes/InitialScene'


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
			gravity: { y: 300 }
		}
	},
	scene: [GameScene, InitialScene]
}

export default new Phaser.Game(config)
