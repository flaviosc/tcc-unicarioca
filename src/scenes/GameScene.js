import Phaser from 'phaser';
import ScoreLabel from '../ui/ScoreLabel';

const GROUND_KEY = 'ground';
const DUDE_KEY = 'dude';
const GIRL_PLAYER = 'girlplayer'
const STAR_KEY = 'star';
const LEFT_PLATFORM = 'leftplatform';
const MIDDLE_PLATFORM = 'middleplatform';
const RIGHT_PLATFORM = 'rightplatform';

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 750;

export default class GameScene extends Phaser.Scene {
  backgroundScene;

	constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.scoreLabel = undefined;
    this.layer = undefined;
	}

  create() {
    const width = this.scale.gameSize.width;
    const height = this.scale.gameSize.height;
    this.parent = new Phaser.Structs.Size(width, height);
    this.sizer = new Phaser.Structs.Size(GAME_WIDTH, GAME_HEIGHT, Phaser.Structs.Size.FIT, this.parent);

    this.parent.setSize(width, height);
    this.sizer.setSize(width, height);
      
    this.backgroundScene = this.scene.get('background-scene');
    this.updateCamera();
    
    this.scale.on('resize', this.resize, this);
         
    this.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    const platforms = this.createPlatforms();
    this.player = this.createPlayer();
    const stars = this.createStars();
    this.scoreLabel = this.createScoreLabel(16, 16, 0);

    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(this.player, stars, this.collectStar, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.pointer = this.input.activePointer;

  }

   update() {
     if(this.cursors.left.isDown) {
       this.player.setVelocityX(-160);
       this.player.anims.play('left', true);
     } else if(this.cursors.right.isDown) {
       this.player.setVelocityX(160);
       this.player.anims.play('right', true);
     } else {
       this.player.setVelocityX(0);
       this.player.anims.play('turn');
     }

     if(this.cursors.up.isDown && this.player.body.touching.down) {
       this.player.setVelocityX(-330);
     }

     if(this.cursors.space.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-250);
     }
   }

   createPlatforms() {
     const platforms = this.physics.add.staticGroup();

     platforms.create(65, 750, LEFT_PLATFORM);
     platforms.create(192, 750, MIDDLE_PLATFORM);
     platforms.create(319, 750, RIGHT_PLATFORM);

     platforms.create(520, 520, LEFT_PLATFORM);
     platforms.create(647, 520, MIDDLE_PLATFORM);
     platforms.create(774, 520, RIGHT_PLATFORM);
    
     platforms.create(770, 320, LEFT_PLATFORM);
     platforms.create(880, 320, RIGHT_PLATFORM);

     platforms.create(65, 170, LEFT_PLATFORM);
     platforms.create(192, 170, MIDDLE_PLATFORM);
     platforms.create(319, 170, RIGHT_PLATFORM);
     return platforms;
   }

   createPlayer() {
     const player = this.physics.add.sprite(100, 450, GIRL_PLAYER);
     player.setBounce(0.2);
     player.setCollideWorldBounds(true);

     this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(GIRL_PLAYER, {frames: [ 0, 2 ]}),
      frameRate: 5,
      repeat: -1
     });

     this.anims.create({
			key: 'spacebar',
			frames: [{ key: GIRL_PLAYER, frame: 8 }],
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

   createStars() {
     const stars = this.physics.add.group({
       key: STAR_KEY,
       repeat: 11,
       setXY: { x:12, y: 0, stepX: 70 }
     })

     stars.children.iterate((child) => {
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })
    return stars;
   }

   collectStar(player, star) {
     star.disableBody(true, true);
     this.scoreLabel.add(10);
   }

   createScoreLabel(x, y, score) {
     const style = { fontSize: '32px', fill: '#000' };
     const label = new ScoreLabel(this, x, y, score, style);
     this.add.existing(label);
     return label;
   }

   resize (gameSize) {
    const width = gameSize.width;
    const height = gameSize.height;

    this.parent.setSize(width, height);
    this.sizer.setSize(width, height);

    this.updateCamera();
   }

   updateCamera () {
    const camera = this.cameras.main;

    const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
    const y = 0;
    const scaleX = this.sizer.width / GAME_WIDTH;
    const scaleY = this.sizer.height / GAME_HEIGHT;

    camera.setViewport(x, y, this.sizer.width, this.sizer.height);
    camera.setZoom(Math.max(scaleX, scaleY));
    camera.centerOn(GAME_WIDTH / 2, GAME_HEIGHT / 2);

    this.backgroundScene.updateCamera();
   }

   getZoom () {
    return this.cameras.main.zoom;
   }
}
