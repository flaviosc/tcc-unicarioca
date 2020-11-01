import Phaser, { Game } from 'phaser'
import FirstChallengeScene from './scenes/FirstChallengeScene'
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
	scene: [GameScene, InitialScene, FirstChallengeScene]
}

export default new Phaser.Game(config)
