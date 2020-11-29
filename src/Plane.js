import * as SparkUtility from './SparkUtility'
import { DIRECTION } from './Agent'

export class Plane {
    constructor(object) {
        this.position = SparkUtility.getLastPosition(object); 
        this.idx =  object.name.split('_')[1]; 
        // Note: Direction of plane is opposite of tesseract.
        this.direction = this.idx % 2 === 0 ? DIRECTION.UP : DIRECTION.DOWN; 
    }

    getPosition() {
        return this.position.clone();
    }

    getDirection() {
        return this.direction; 
    }
}