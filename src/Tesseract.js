import * as SparkUtility from './SparkUtility'
const Diagnostics = require('Diagnostics'); 
import { DIRECTION } from './Agent'

export class Tesseract {
    constructor(object) {
        this.sceneObject = object; 
        this.position = SparkUtility.getLastPosition(object); 
        this.idx =  object.name.split('_')[1]; 
        // Note: Direction for tesseract. 
        this.direction = this.idx % 2 === 0 ? DIRECTION.DOWN : DIRECTION.UP; 

        this.startAngle = 0; 
        this.factor = Math.random(1)/500; 
    }

    update() {
        this.startAngle += this.factor; 
        // this.sceneObject.transform.rotationX = this.startAngle;
        // this.sceneObject.transform.rotationY = this.startAngle; 
        // this.sceneObject.transform.rotationZ = this.startAngle; 
    }

    getDirection() {
        return this.direction; 
    }

    getPosition() {
        return this.position.clone(); 
    }
}