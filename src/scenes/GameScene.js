import Phaser, { Cameras } from 'phaser';

import ScoreLabel from '../ui/ScoreLabel';

const GAME_WIDTH = 640;
const GAME_HEIGHT = 960;

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
const PANEL_2 = 'panel2';
const GREEN_CHECK = 'correct';
const ARROW_LEFT = 'arrowleft';
const ARROW_RIGHT = 'arrowright';
const BUTTON_JUMP = 'buttonjump';

const GIRL_PLAYER = 'girlplayer';

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

    /** @type {Phaser.Scene} */
    firstChallenge;

    /** @type {boolean} */
    isTouch; isRunningToLeft; isRunningToRight; isPlayerJump;

    playerName;

	constructor()
	{
        super('game-scene');
        this.platforms = undefined;
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
        this.load.image(PANEL_2, 'assets/panel_2.png');
        this.load.image(GREEN_CHECK, 'assets/green_checkmark.png');
        this.load.image(ARROW_LEFT, 'assets/arrow_left.png');
        this.load.image(ARROW_RIGHT, 'assets/arrow_right.png');
        this.load.image(BUTTON_JUMP, 'assets/button_jump.png');

        this.load.spritesheet('girlplayer', 'assets/female_tilesheet.png', { frameWidth: 80, frameHeight: 111 });

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

        this.add.image(width * 0.5, height * 0.5, SKY)
                .setScrollFactor(0);
   
        repeatBackgroundAssets(this, totalWidth, MOUNTAIN, 0.25);
        repeatBackgroundAssets(this, totalWidth, PLATEAU, 0.50);

        const ground = this.createGround(height + 150, GROUND);
        const grass = this.createGround(height + 60, GRASS);
        repeatBackgroundAssets(this, totalWidth, PLANTS, 1.25);

        // this.scoreLabel = this.createScoreLabel(16, 16, 0).setScrollFactor(0);

        this.add.image(25, height - 10, SIGN)
                .setOrigin(0, 1);
        
        this.platforms = this.createPlatforms();
        this.player = this.createPlayer();
        this.challenges = this.createBoxChallenges();
        this.physics.add.collider(this.player, ground);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.challenges, this.platforms);
        this.physics.add.collider(this.challenges, ground);
        this.physics.add.overlap(this.player, this.challenges, this.collectBox, null, this);

        this.cameras.main.setBounds(0, 0, width * 2.8, height);
        this.cameras.main.startFollow(this.player, false, 0.1, 0.1);
        this.physics.world.setBounds(0, 0, width * 2.8, height);

        
        //touch controls
        this.checkDevice();
        if(this.isTouch == true) {
            const pointer1 = this.input.addPointer();
            const pointer2 = this.input.addPointer();

            const arrowLeft = this.add.nineslice(width * 0.1, height * 0.82, 40, 50, ARROW_LEFT, 0)
                    .setInteractive()
                    .on('pointerdown', () => { this.isRunningToLeft = true; })
                    .on('pointerup', () => { this.isRunningToLeft = false })
                    .setScrollFactor(0);
            
            const arrowRight = this.add.nineslice(width * 0.3, height * 0.82, 40, 50, ARROW_RIGHT, 0)
                    .setInteractive()
                    .on ('pointerdown', () => { this.isRunningToRight = true })
                    .on('pointerup', () => { this.isRunningToRight = false; })
                    .setScrollFactor(0);

            const buttonJump = this.add.nineslice(width * 0.8, height * 0.82, 40, 50, BUTTON_JUMP, 0)
                    .setInteractive()
                    .on ('pointerdown', () => { this.isPlayerJump = true })
                    .on('pointerup', () => { this.isPlayerJump = false; })
                    .setScrollFactor(0);

            this.cameras.main.setBounds(0, 0, width * 10, height);
            this.cameras.main.startFollow(this.player, false, 0.1, 0.1);
            this.physics.world.setBounds(0, 0, width * 10, height);
        }

        
        this.startModal = this.scene.get('start-modal');
        this.scene.launch('start-modal');

        this.events.on('resume', (scene, data) => {
            if(this.playerName == undefined) {
                this.playerName = data.playerName;
                this.scoreLabel = this.createScoreLabel(16, 16, 0, this.playerName).setScrollFactor(0);
            }
        })

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
        let groundWidth = 450;
        const ground = this.physics.add.staticGroup().setOrigin(0, 0);
        
        for (let i = 0; i < 5; i++) {
            ground.create(groundWidth, height - 80, key);
            
            groundWidth += groundWidth;
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

        platforms.create(initialX * 2, height * 0.6, PLATFORM_LEFT);
        platforms.create((initialX * 2) + 128, height * 0.6, PLATFORM_MIDDLE);
        platforms.create((initialX * 2) + 256, height * 0.6, PLATFORM_RIGHT);

        platforms.create((initialX * 3.5), height * 0.52, PLATFORM_LEFT);
        platforms.create((initialX * 3.5) + 128, height * 0.52, PLATFORM_MIDDLE);
        platforms.create((initialX * 3.5) + 256, height * 0.52, PLATFORM_RIGHT);

        platforms.create(initialX * 4.8, height * 0.4, PLATFORM_LEFT);
        platforms.create((initialX * 4.8) + 128, height * 0.4, PLATFORM_MIDDLE);
        platforms.create((initialX * 4.8) + 256, height * 0.4, PLATFORM_RIGHT);

        platforms.create(initialX * 6, height * 0.55, PLATFORM_LEFT);
        platforms.create((initialX * 6) + 128, height * 0.55, PLATFORM_MIDDLE);
        platforms.create((initialX * 6) + 256, height * 0.55, PLATFORM_RIGHT);

        return platforms;
    }

    createPlayer() {
        const player = this.physics.add.sprite(110, 451, GIRL_PLAYER);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(GIRL_PLAYER, {frames: [ 0, 1 ]}),
            frameRate: 5,
            repeat: -1
        });
    
       this.anims.create({
            key: 'turn',
            frames: [{ key: GIRL_PLAYER, frame: 23 }],
            frameRate: 20
       })
        
       
       this.anims.create({
         key: 'right',
         frames: this.anims.generateFrameNumbers(GIRL_PLAYER, {frames: [ 0, 1 ]}),
         frameRate: 5,
         repeat: -1
       })
       
       return player;
    }

    createBoxChallenges() {
        let horizontalSpacing = 1000;
        const crate = this.physics.add.group();
        for (let i = 0; i < 3; i++) {
            let crateObject = this.physics.add.image(horizontalSpacing, 50, CRATE)
            crateObject.name = `CRATE_${i}`
            crate.add(crateObject);

            horizontalSpacing += crateObject.width * 11;
        }
        

        crate.children.iterate((child) => {
                    child.body.gameObject.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        });
        
        return crate;
    }

    collectBox (player, box) {
        box.disableBody(true, true);
        this.showChallangeScene(box.name);
    }

    showChallangeScene(boxName) {
       let challangeScene;
       switch (boxName) {
           case 'CRATE_0':
               challangeScene = this.scene.get('first-challenge-scene');
               this.scene.launch('first-challenge-scene');
               this.scene.pause();
            break;

            case 'CRATE_1':
               
            break;

            case 'CRATE_2':
               
            break;

            case 'CRATE_3':
               
            break;
       
           default:
               break;
       }
    }

    resetCursors() {
        this.cursors.left.reset();
        this.cursors.right.reset();
        this.cursors.up.reset();
        this.isRunningToLeft = false;
        this.isRunningToRight = false;
    }

    createScoreLabel(x, y, text, playerName) {
        const style = { fontSize: '32px', fill: '#000' };
        const label = new ScoreLabel(this, x, y, text, playerName, style);
        this.add.existing(label);
        return label;
    }

    updateScore(points) {
        this.scoreLabel.add(points);
    }

    checkDevice() {
        if (this.sys.game.device.os.desktop){
            console.log("desktop");
            this.isTouch = false;
        }
        else{
            console.log("mobile");
            this.isTouch = true;
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
