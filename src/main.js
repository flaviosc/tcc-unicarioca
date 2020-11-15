import Phaser, { Game } from 'phaser';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js';

import CorrectAnswerModal from './modal/CorrectAnswerModal';
import ChallengeModal from './modal/ChallengeModal';
import GameScene from './scenes/GameScene';
import StartModal from './modal/StartModal';
import InputNameModal from './modal/InputNameModal';
import MoodQuestionModal from './modal/MoodQuestionModal';
import StoryModal from './modal/StoryModal';
import CharacterSelectModal from './modal/CharacterSelectModal';

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
	scene: [
		GameScene,
		StartModal,
		InputNameModal,
		CharacterSelectModal,
		MoodQuestionModal,
		StoryModal,
		ChallengeModal,
		CorrectAnswerModal,
	]
}

export default new Phaser.Game(config)
