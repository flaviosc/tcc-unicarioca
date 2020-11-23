import Phaser, { Game } from 'phaser';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js';

import FeedbackAnswerModal from './modal/FeedbackAnswerModal';
import ChallengeModal from './modal/ChallengeModal';
import GameScene from './scenes/GameScene';
import StartModal from './modal/StartModal';
import InputNameModal from './modal/InputNameModal';
import MoodQuestionModal from './modal/MoodQuestionModal';
import HelpModal from './modal/HelpModal';
import CharacterSelectModal from './modal/CharacterSelectModal';
import RankingModal from './modal/RankingModal';
import EndGameModal from './modal/EndGameModal';
import SettingsModal from './modal/SettingsModal';

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
		HelpModal,
		ChallengeModal,
		FeedbackAnswerModal,
		EndGameModal,     
		RankingModal,
		SettingsModal
	]
}

export default new Phaser.Game(config)
