import Phaser, { Game } from 'phaser';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';

import CorrectAnswerScene from './scenes/CorrectAnswerScene';
import FirstChallengeScene from './scenes/FirstChallengeScene';
import GameScene from './scenes/GameScene';
import InitialScene from './scenes/InitialScene';


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
	plugins: {
		global: [ NineSlicePlugin.DefaultCfg ],
	},
	scene: [GameScene, InitialScene, FirstChallengeScene, CorrectAnswerScene]
}

export default new Phaser.Game(config)
