import Phaser from 'phaser';

/** @type {string} */
const GIRL_PLAYER = 'girlplayer';

export default class GameScene extends Phaser.Scene
{
  /** @type {Phaser.Scene} */
  backgroundScene;

	constructor()
	{
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
	}

    
  create()
  {
    const width = this.scale.width;
    const height = this.scale.height;

    this.backgroundScene = this.scene.get('background-scene');
    
    this.physics.world.setBounds(0, 0, width * 10, height * 0.8);
    this.player = this.createPlayer();
    
    console.log(this.backgroundScene.data);

    this.cursors = this.input.keyboard.createCursorKeys();
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

    if((this.cursors.space.isDown) && this.cursors.space.isDown) {
     this.player.setVelocityY(-250);
    }
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
			key: 'turn',
			frames: [{ key: GIRL_PLAYER, frame: 4 }],
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
  

  // createStars() {
  //   const stars = this.physics.add.group({
  //     key: STAR_KEY,
  //     repeat: 11,
  //     setXY: { x:12, y: 0, stepX: 70 }
  //   })

  //   stars.children.iterate((child) => {
  //    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
  //  })
  //  return stars;
  // }
}
