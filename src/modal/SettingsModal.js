import Phaser from 'phaser';
import UiImage from '../ui/UiImage';
import TextLabel from '../ui/TextLabel';

const PANEL_FEEDBACK = 'panel2';
const CHECK_PANEL = 'checkpanel';
const SOUND_LABEL = 
`Som`;
const CLICK_SOUND = 'click';
const CHECK = 'checkmark';
const GAME_SOUNDTRACK = 'gamesoundtrack';

export default class SettingsModal extends Phaser.Scene
{

  isPlayAudio;

  constructor() {
    super('settings-modal');
    this.muteAudio = false;
  }

  preload() {
    this.load.image(CHECK_PANEL, 'assets/grey_box.png');
    this.load.image(CHECK, 'assets/green_checkmark.png');
  }
    
  create() {
      const width = this.scale.width;
      const height = this.scale.height;

      const camera = this.cameras.main;

      camera.setZoom(0.85);

      this.settingsContainer = this.add.container(0, 110).setScrollFactor(0);
      const settingsPanel = this.add.nineslice(0,0, 250, 50, PANEL_FEEDBACK, 24).setScrollFactor(0);
      const checkPanel = this.add.nineslice(10, 10, 30, 30, CHECK_PANEL, 0).setScrollFactor(0);
      this.checkmark = new UiImage(this, 25, 25, CHECK).setScrollFactor(0);
      const settingsText = new TextLabel(this, 60, 8, SOUND_LABEL, { fontSize: '35px', fill: '#000', fontStyle: 'bold' }).setScrollFactor(0);      


      this.settingsContainer.add(settingsPanel);
      this.settingsContainer.add(checkPanel);
      this.settingsContainer.add(this.checkmark);
      this.settingsContainer.add(settingsText);

      checkPanel.setInteractive()
                   .on('pointerdown', () => { this.toggleAudio(); this.sound.play(CLICK_SOUND); })
                   .on('pointerover', () => { checkPanel.setTint(0xd9d8d7); })
                   .on('pointerout', () => { checkPanel.clearTint(); })

      this.add.existing(this.settingsContainer);

  }

  toggleAudio() {
    this.muteAudio = !this.muteAudio;
    if(this.muteAudio == true) {
      this.checkmark.setVisible(false);
      this.sound.mute = true;
    } else {
      this.checkmark.setVisible(true);
      this.sound.mute = false;
    }
  }
}
