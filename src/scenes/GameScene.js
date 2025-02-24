import Phaser from 'phaser';
import UpdateLocalStorageData from '../util/UpdateLocalStorageData';
import UiImage from '../ui/UiImage';

import ScoreLabel from '../ui/ScoreLabel';
import SettingsModal from '../modal/SettingsModal';
import LevelModal from '../modal/LevelModal';

const SKY = 'sky';
const MOUNTAIN = 'mointains';
const PLATEAU = 'plateau';
const GROUND = 'ground';
const GRASS = 'grass';
const PLANTS = 'plants';

const PLATFORM_LEFT = 'platformleft';
const PLATFORM_MIDDLE = 'platformmiddle';
const PLATFORM_RIGHT = 'platformright';
const SIGN = 'sign_right';
const CRATE = 'crate';
const PANEL_FEEDBACK = 'panel2';
const BOX_SETTINGS = 'boxsettings';
const ICON_SETTINGS = 'iconsettings';
const ARROW_LEFT = 'arrowleft';
const ARROW_RIGHT = 'arrowright';
const BUTTON_JUMP = 'buttonjump';

const GIRL_PLAYER = 'girlplayer';
const BOY_PLAYER = 'boyplayer';

const GAME_SOUNDTRACK = 'gamesoundtrack';
const CLICK_SOUND = 'click';

/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {number} totalWidth 
 * @param {string} texture 
 * @param {number} scrollFactor 
 */

const repeatBackgroundAssets = (scene, totalWidth, texture, scrollFactor) => {
    const sourceWidth = scene.textures.get(texture).getSourceImage().width;    
    const count = Math.ceil(totalWidth / sourceWidth) * scrollFactor;

    let x = -110;

    for (let i = 0; i < count; ++i) {
        const textureBackground = scene.add.image(x, scene.scale.height + 180, texture)
        .setOrigin(0, 1)
        .setScrollFactor(scrollFactor);   

        x += textureBackground.width;
    }
}

export default class GameScene extends Phaser.Scene
{
    /** @type {Phaser.Physics.Arcade.StaticGroup} */
    platforms;

    /** @type {boolean} */
    isTouch; isRunningToLeft; isRunningToRight; isPlayerJump; isMenuOpen;

    characterSelected;

    groupOneChallenges;
    groupTwoChallenges;
    groupThreeChallenges;

    /** @type {number} */
    gameLevel = 1;

    /** @type {Phaser.Sound.BaseSound} */
    gameSoundtrack;
    /** @type {Phaser.Sound.BaseSound} */
    click;

    playerData;

	constructor()
	{
        super('game-scene');
        this.platforms = undefined;
        this.countLevelOneChallenges = 0;
        this.countLevelTwoChallenges = 0;
        this.countLevelThreeChallenges = 0;
        this.isMenuOpen = false;
        this.settingsScene = undefined;
    }
    
	preload()
    {
        this.load.image(SKY, 'assets/sky.png'); 
        this.load.image(MOUNTAIN, 'assets/mountains.png');
        this.load.image(PLATEAU, 'assets/plateau.png');
        this.load.image(GROUND, 'assets/ground_2.png');
        this.load.image(GRASS, 'assets/ground_3.png');
        this.load.image(PLANTS, 'assets/plant.png');

        this.load.image(PLATFORM_LEFT, 'assets/platform_left.png'); 
        this.load.image(PLATFORM_MIDDLE, 'assets/platform_middle.png');
        this.load.image(PLATFORM_RIGHT, 'assets/platform_right.png');
        this.load.image(SIGN, 'assets/sign.png');
        this.load.image(CRATE, 'assets/question_box.png');
        this.load.image(PANEL_FEEDBACK, 'assets/panel_2.png');
        this.load.image(BOX_SETTINGS, 'assets/grey_box.png');
        this.load.image(ICON_SETTINGS, 'assets/settings_icon.png');
        this.load.image(ARROW_LEFT, 'assets/arrow_left.png');
        this.load.image(ARROW_RIGHT, 'assets/arrow_right.png');
        this.load.image(BUTTON_JUMP, 'assets/button_jump.png');

        this.load.spritesheet(GIRL_PLAYER, 'assets/female_tilesheet.png', { frameWidth: 80, frameHeight: 111 });
        this.load.spritesheet(BOY_PLAYER, 'assets/player_tilesheet.png', { frameWidth: 80, frameHeight: 111 });
        this.load.audio(GAME_SOUNDTRACK, 'assets/audio/bensound-buddy.mp3');
        this.load.audio(CLICK_SOUND, 'assets/audio/click1.ogg');

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    create()
    {
        const width = this.scale.width;
        const height = this.scale.height;
        const totalWidth = width * 10;
        this.parent = new Phaser.Structs.Size(width, height);
        this.sizer = new Phaser.Structs.Size(width, height, Phaser.Structs.Size.FIT, this.parent);

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);

        this.updateCamera();
        
        this.scale.on('resize', this.resize, this);

        const sky = new UiImage(this, width * 0.5, height * 0.5, SKY)
                .setScrollFactor(0);
        
        this.add.existing(sky);
   
        repeatBackgroundAssets(this, totalWidth, MOUNTAIN, 0.25);
        repeatBackgroundAssets(this, totalWidth, PLATEAU, 0.50);

        this.ground = this.createGround(height + 150, GROUND);
        const grass = this.createGround(height + 60, GRASS);
        repeatBackgroundAssets(this, totalWidth, PLANTS, 1.25);


        const sign = new UiImage(this, 25, height - 10, SIGN)
                        .setOrigin(0, 1);

        this.add.existing(sign);
        
        this.platforms = this.createPlatforms();
        
        this.groupOneChallenges = this.createBoxChallenges(600, 0, 3);
        this.physics.add.collider(this.groupOneChallenges, this.platforms);
        this.physics.add.collider(this.groupOneChallenges, this.ground);

        this.cameras.main.setBounds(0, 0, width * 10, height);
        this.physics.world.setBounds(0, 0, width * 10, height);

        this.startModal = this.scene.get('start-modal');
        this.scene.launch('start-modal');

        this.events.on('resume', (scene, data) => {
            if(data.scene === 'character-select') {
                this.playerData = data.playerData;
                this.scoreLabel = this.createScoreLabel(16, 16, 0, this.playerData.playerName).setScrollFactor(0);
                this.settingsContainer = this.createSettingsButton(width);
                this.characterSelected = this.playerData.playerCharacter;
                this.player = this.createPlayer(this.characterSelected);
                this.physics.add.collider(this.player, this.ground);
                this.physics.add.collider(this.player, this.platforms);
                this.physics.add.overlap(this.player, this.groupOneChallenges, this.collectBox, null, this);
                this.cameras.main.startFollow(this.player, false, 0.1, 0.1);
                this.gameSoundtrack = this.sound.add(GAME_SOUNDTRACK, { loop: true, volume: 0.5 });
                this.gameSoundtrack.play();

                this.scene.add('level-modal', LevelModal , true, { gameLevel: this.gameLevel, characterSelected: this.characterSelected });
            }

            this.resetCursors();
        });
        //touch controls
        this.checkDevice();
        if(this.isTouch == true) {
            const pointer1 = this.input.addPointer();
            const pointer2 = this.input.addPointer();

            const arrowLeft = this.add.nineslice(0, height * 0.90, 40, 50, ARROW_LEFT, 0)
                    .setInteractive()
                    .on('pointerdown', () => { this.isRunningToLeft = true; })
                    .on('pointerup', () => { this.isRunningToLeft = false })
                    .setScrollFactor(0);
            
            const arrowRight = this.add.nineslice(width * 0.2, height * 0.90, 40, 50, ARROW_RIGHT, 0)
                    .setInteractive()
                    .on ('pointerdown', () => { this.isRunningToRight = true })
                    .on('pointerup', () => { this.isRunningToRight = false; })
                    .setScrollFactor(0);

            const buttonJump = this.add.nineslice(width * 0.8, height * 0.90, 40, 50, BUTTON_JUMP, 0)
                    .setInteractive()
                    .on ('pointerdown', () => { this.isPlayerJump = true })
                    .on('pointerup', () => { this.isPlayerJump = false; })
                    .setScrollFactor(0);

            this.cameras.main.setBounds(0, 0, width * 10, height);
            this.physics.world.setBounds(0, 0, width * 10, height);
        }

        this.settingsScene = this.scene.get('settings-modal');
        this.settingsScene.scene.start();

        this.scene.pause();
    }

    update() {
        if(this.cursors.left.isDown || this.isRunningToLeft){
            this.player.setVelocityX(-300);
            this.player.anims.play('left', true);
            this.player.setFlipX(true);
        } else if (this.cursors.right.isDown || this.isRunningToRight) {
            this.player.setVelocityX(300);
            this.player.anims.play('right', true);
            this.player.setFlipX(false);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        } 

        if(this.cursors.up.isDown || this.isPlayerJump) {
            this.startJump();
        }
    }

    startJump(){
        if(this.player.body.touching.down) {
            this.player.setVelocityY(-300);
        }
    }

    createGround(height, key) {
        let groundWidth = 0;
        const ground = this.physics.add.staticGroup().setOrigin(0, 0);
        
        for (let i = 0; i < 10; i++) {
            ground.create(groundWidth, height - 80, key);
            
            groundWidth += 1920;
        }        

        return ground;
    }

    createPlatforms() {
        const initialX = 450;
        const height = this.scale.height;

        const platforms = this.physics.add.staticGroup();
        
        platforms.create(initialX, height * 0.79, PLATFORM_LEFT);
        platforms.create(initialX + 128, height * 0.79, PLATFORM_MIDDLE);
        platforms.create(initialX + 256, height * 0.79, PLATFORM_RIGHT);

        platforms.create(initialX * 2.3, height * 0.6, PLATFORM_LEFT);
        platforms.create((initialX * 2.3) + 128, height * 0.6, PLATFORM_MIDDLE);
        platforms.create((initialX * 2.3) + 256, height * 0.6, PLATFORM_RIGHT);

        platforms.create((initialX * 3.5), height * 0.52, PLATFORM_LEFT);
        platforms.create((initialX * 3.5) + 128, height * 0.52, PLATFORM_MIDDLE);
        platforms.create((initialX * 3.5) + 256, height * 0.52, PLATFORM_RIGHT);

        platforms.create(initialX * 4.8, height * 0.4, PLATFORM_LEFT);
        platforms.create((initialX * 4.8) + 128, height * 0.4, PLATFORM_MIDDLE);
        platforms.create((initialX * 4.8) + 256, height * 0.4, PLATFORM_RIGHT);

        platforms.create(initialX * 6, height * 0.55, PLATFORM_LEFT);
        platforms.create((initialX * 6) + 128, height * 0.55, PLATFORM_MIDDLE);
        platforms.create((initialX * 6) + 256, height * 0.55, PLATFORM_RIGHT);

        platforms.create(initialX * 7.5, height * 0.4, PLATFORM_LEFT);
        platforms.create((initialX * 7.5) + 128, height * 0.4, PLATFORM_MIDDLE);
        platforms.create((initialX * 7.5) + 256, height * 0.4, PLATFORM_RIGHT);

        platforms.create(initialX * 8.6, height * 0.70, PLATFORM_LEFT);
        platforms.create((initialX * 8.6) + 128, height * 0.70, PLATFORM_MIDDLE);
        platforms.create((initialX * 8.6) + 256, height * 0.70, PLATFORM_RIGHT);

        platforms.create(initialX * 10, height * 0.70, PLATFORM_LEFT);
        platforms.create((initialX * 10) + 128, height * 0.70, PLATFORM_MIDDLE);
        platforms.create((initialX * 10) + 256, height * 0.70, PLATFORM_RIGHT);

        return platforms;
    }

    createPlayer(characterSelected) {
        const player = this.physics.add.sprite(110, 451, characterSelected);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(characterSelected, {frames: [ 0, 1 ]}),
            frameRate: 5,
            repeat: -1
        });
    
       this.anims.create({
            key: 'turn',
            frames: [{ key: characterSelected, frame: 23 }],
            frameRate: 20
       })
        
       
       this.anims.create({
         key: 'right',
         frames: this.anims.generateFrameNumbers(characterSelected, {frames: [ 0, 1 ]}),
         frameRate: 5,
         repeat: -1
       })
       
       return player;
    }

    createBoxChallenges(horizontalSpacing, index, step) {
        const crate = this.physics.add.group();
        for (let i = index; i < index + step; i++) {
            let crateObject = this.physics.add.image(horizontalSpacing, 50, CRATE)
            crateObject.name = `CRATE_${i}`
            crate.add(crateObject);

            horizontalSpacing += crateObject.width * 8.3;
        }
        

        crate.children.iterate((child) => {
                    child.body.gameObject.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        });
        
        return crate;
    }

    collectBox (player, box) {
        box.disableBody(true, true);
        this.showChallangeScene(box);
    }

    showChallangeScene(box) {
       let challangeScene = this.scene.get('challenge-modal');
       this.gameSoundtrack.pause();
       this.scene.launch('challenge-modal', { gameLevel: this.gameLevel, challengeId: box.name, character: this.characterSelected });
    }

    showLevelModal() {
        let challangeScene = this.scene.get('level-modal');
        this.scene.launch('level-modal', { gameLevel: this.gameLevel, characterSelected: this.characterSelected });
    }

    resetCursors() {
        this.cursors.left.reset();
        this.cursors.right.reset();
        this.cursors.up.reset();
        this.isRunningToLeft = false;
        this.isRunningToRight = false;
    }

    createScoreLabel(x, y, text, playerName) {
        const panel = this.add.nineslice(x - 5, y - 5, 350, 50, PANEL_FEEDBACK, 24).setScrollFactor(0);

        const style = { fontSize: '38px', fill: '#000', fontStyle: 'bold' };
        const label = new ScoreLabel(this, x, y, text, playerName, style);

        this.add.existing(panel);
        this.add.existing(label);
        return label;
    }

    createSettingsButton(width) {
        const settingsButtonContainer = this.add.container(width - 10, 0);
        const settingsBox = this.add.nineslice(0, 10, 50, 51, BOX_SETTINGS, 14)
                              .setScrollFactor(0);
        const settingsBoxIcon = new UiImage(this, 25, 35, ICON_SETTINGS)
                              .setScrollFactor(0);

        settingsButtonContainer.add(settingsBox);
        settingsButtonContainer.add(settingsBoxIcon);

        settingsBox.setInteractive()
                         .on('pointerdown', () => { this.toggleSettingsMenu(); })
                         .on('pointerover', () => { settingsBox.setTint(0xd9d8d7); this.sound.play(CLICK_SOUND);})
                         .on('pointerout', () => { settingsBox.clearTint(); })

        this.add.existing(settingsButtonContainer);
    }

    updateScore(points) {
        const addPoints = this.scoreLabel.add(points, this.playerData.playerName);
        this.updateLocalStorage(addPoints);
    }

    checkDevice() {
        if (this.sys.game.device.os.desktop){
            this.isTouch = false;
        }
        else{
            this.isTouch = true;
        }
    }

    checkLevelGame() {
        if(this.groupOneChallenges && this.groupTwoChallenges && this.groupThreeChallenges) {
            return;
        }

        if(this.groupTwoChallenges == undefined && this.groupOneChallenges.countActive(true) === 0) {
            this.gameLevel = 2;
            this.showLevelModal();

            this.groupTwoChallenges = this.createBoxChallenges(this.player.x + 400, 3, 3);
            this.physics.add.collider(this.groupTwoChallenges, this.platforms);
            this.physics.add.collider(this.groupTwoChallenges, this.ground);
            this.physics.add.overlap(this.player, this.groupTwoChallenges, this.collectBox, null, this);
        }

        if(this.groupTwoChallenges != undefined && this.groupTwoChallenges.countActive(true) === 0) {
            this.gameLevel = 3;
            this.showLevelModal();

            this.groupThreeChallenges = this.createBoxChallenges(this.player.x + 400, 6, 3);
            this.physics.add.collider(this.groupThreeChallenges, this.platforms);
            this.physics.add.collider(this.groupThreeChallenges, this.ground);
            this.physics.add.overlap(this.player, this.groupThreeChallenges, this.collectBox, null, this);
        }
    }

    updateLocalStorage(points) {  
        this.playerData.playerPoints = points;
        const updateData = new UpdateLocalStorageData(this.playerData).setData();
    }

    toggleSettingsMenu(){
        this.isMenuOpen = !this.isMenuOpen;

        if(this.isMenuOpen == true) {
            this.settingsScene.show();
        } else {
            this.settingsScene.hide();
        }
    }

    resize (gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;
    
        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);
    
        this.updateCamera();
    }

    updateCamera ()
    {
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        const camera = this.cameras.main;

        const zoom = this.getZoom();
        const offset = 120 * zoom;

        camera.setZoom(0.85);
        camera.centerOn(1400 / 2, (1200 / 2) + 120);
    }

    getZoom () {
        return this.cameras.main.zoom;
    }
}
