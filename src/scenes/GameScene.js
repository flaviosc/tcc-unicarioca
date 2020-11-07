import Phaser, { Cameras } from 'phaser';

import ScoreLabel from '../ui/ScoreLabel';

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
const PANEL_1 = 'panel1';
const PANEL_2 = 'panel2';
const BUTTON = 'button';
const GREEN_CHECK = 'correct';

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

    let x = 0;

    for (let i = 0; i < count; ++i) {
        const textureBackground = scene.add.image(x, scene.scale.height, texture)
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
    initialScene; firstChallenge;

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

        this.load.spritesheet('girlplayer', 'assets/female_tilesheet.png', { frameWidth: 80, frameHeight: 111 });

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    create()
    {
        const width = this.scale.width;
        const height = this.scale.height;
        const totalWidth = width * 10;

        this.add.image(width * 0.5, height * 0.5, SKY)
                .setScrollFactor(0);
   
        repeatBackgroundAssets(this, totalWidth, MOUNTAIN, 0.25);
        repeatBackgroundAssets(this, totalWidth, PLATEAU, 0.50);

        const ground = this.createGround(height, GROUND);
        const grass = this.createGround(height - 90, GRASS);
        repeatBackgroundAssets(this, totalWidth, PLANTS, 1.25);

        this.scoreLabel = this.createScoreLabel(16, 16, 0).setScrollFactor(0);

        this.add.image(25, height * 0.8, SIGN)
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
        this.physics.world.setBounds(0, -height * 0.2, width * 2.8, height);

        
        //touch controls
        this.input.on('pointerdown', this.startJump, this);

        this.startModal = this.scene.get('start-modal');
        this.scene.launch('start-modal');
        this.scene.pause();
    }

    update() {

        if(this.cursors.left.isDown){
            this.player.setVelocityX(-300);
            this.player.anims.play('left', true);
            this.player.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
            this.player.anims.play('right', true);
            this.player.setFlipX(false);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        } 

        if(this.cursors.up.isDown) {
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
        const width = this.scale.width;
        const height = this.scale.height;

        const platforms = this.physics.add.staticGroup();
        
        platforms.create(450, height * 0.6, PLATFORM_LEFT);
        platforms.create(578, height * 0.6, PLATFORM_MIDDLE);
        platforms.create(706, height * 0.6, PLATFORM_RIGHT);

        platforms.create(920, height * 0.4, PLATFORM_LEFT);
        platforms.create(1048, height * 0.4, PLATFORM_MIDDLE);
        platforms.create(1176, height * 0.4, PLATFORM_RIGHT);

        platforms.create(1390, height * 0.2, PLATFORM_LEFT);
        platforms.create(1518, height * 0.2, PLATFORM_MIDDLE);
        platforms.create(1646, height * 0.2, PLATFORM_RIGHT);

        platforms.create(2000, height * 0.5, PLATFORM_LEFT);
        platforms.create(2128, height * 0.5, PLATFORM_MIDDLE);
        platforms.create(2256, height * 0.5, PLATFORM_RIGHT);

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
        let horizontalSpacing = 600;
        const crate = this.physics.add.group();
        for (let i = 0; i < 4; i++) {
            let crateObject = this.physics.add.image(horizontalSpacing, 50, CRATE)
            crateObject.name = `CRATE_${i}`
            crate.add(crateObject);

            horizontalSpacing += crateObject.width * 7;
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
    }

    createScoreLabel(x, y, text) {
        const style = { fontSize: '32px', fill: '#000' };
        const label = new ScoreLabel(this, x, y, text, style);
        this.add.existing(label);
        return label;
    }

    updateScore(points) {
        this.scoreLabel.add(points);
    }
}
