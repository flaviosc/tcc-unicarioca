import Phaser, { Game } from 'phaser';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js';

import CorrectAnswerScene from './scenes/CorrectAnswerScene';
import FirstChallengeScene from './scenes/FirstChallengeScene';
import GameScene from './scenes/GameScene';
import StartModal from './scenes/StartModal';
import InputNameModal from './scenes/InputNameModal';


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
	dom: {
		createContainer: true
	},
	plugins: {
        scene: [{
            key: 'rexUI',
            plugin: RexUIPlugin,
            mapping: 'rexUI'
        }],
		global: [ 
			NineSlicePlugin.DefaultCfg,
			{
				key: 'rexInputTextPlugin',
				plugin: InputTextPlugin,
				start: true
			},
		],
	},
	scene: [GameScene, StartModal, InputNameModal, FirstChallengeScene, CorrectAnswerScene]
}

export default new Phaser.Game(config)
