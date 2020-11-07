export default class ButtonImage extends Phaser.GameObjects.Image { 

    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        this.scene = scene;
    } 
}