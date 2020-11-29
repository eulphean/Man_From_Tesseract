import { Vector3 } from 'math-ds'
import * as SparkUtility from './SparkUtility.js'
const Diagnostics = require('Diagnostics'); 

// Based on this, I do position updates and calculate my angle of rotations
export const DIRECTION = {
    UP: 0, 
    DOWN: 1
}

export class Agent {
    constructor(object, tesseracts, planes) {
        // Main object
        this.sceneObject = object; 
        this.sceneObject.hidden = false; 

        // Store all tesseracts / planes. 
        // I could need them at any point of time. 
        this.tesseracts = tesseracts; 
        this.planes = planes; 

        // Current position. 
        this.position = SparkUtility.getLastPosition(object); 
        this.idx = this.sceneObject.name.split('_')[1]; 
        
        // Calculate target
        this.target = this.planes[this.idx].getPosition(); 

        // Current direction (fetch from Tesseract because that's where we start)
        this.curDirection = this.tesseracts[this.idx].getDirection(); 

        // Up and down velocities. 
        this.upVel = this.idx % 2 === 0 ? new Vector3(0, 0, -0.0025) : new Vector3(0, 0, -0.0015); 
        this.downVel = this.idx % 2 === 0 ? new Vector3(0, 0, 0.0025) : new Vector3(0, 0, 0.0015); 
        
        this.diff = new Vector3(0, 0, 0); 
    }

    update() {
        // Just move from initial position to final target. 
        this.seek(); 
        this.syncPosition(); 
    }

    seek() {
        if (this.curDirection === DIRECTION.UP) {
            this.position.add(this.upVel); 
        } else {
            this.position.add(this.downVel); 
        }

        this.diff.subVectors(this.position, this.target); 
        if (this.diff.length() < 0.01) {
            this.resetRunner(); 
        }
    }

    syncPosition() {
        SparkUtility.syncSceneObject(this.sceneObject, this.position);
    }

    resetRunner() {
        let length = this.tesseracts.length; 
        // Find a new random index, anything except the current index. 
        let randIdx = SparkUtility.random(0, length-1); 
        while (randIdx === this.idx) {
            randIdx = SparkUtility.random(0, length-1); 
        }

        // Choose the tesseract or plane as the starting position
        let t = this.tesseracts[randIdx];
        let p = this.planes[randIdx]; 
        let d = SparkUtility.random(0, 1); ; // 0 or 1 
        // Choose tesseract. 
        if (d === 0) {
            this.position = t.getPosition(); 
            this.target = p.getPosition(); 
            this.curDirection = t.getDirection(); 
        } else {
            this.position = p.getPosition();
            this.target = t.getPosition();
            this.curDirection = p.getDirection(); 
        }

        // Set the rotation of the agent. 
        if (this.curDirection === DIRECTION.UP) {
            this.sceneObject.transform.rotationY = 0; 
        } else {
            this.sceneObject.transform.rotationY = Math.PI; 
        }
    }
}