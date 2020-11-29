import { Tesseract } from './Tesseract.js'
import { Plane } from './Plane.js'
import { Agent } from './Agent.js'

const Diagnostics = require('Diagnostics');

export class World {
    constructor(sceneObjects) {
        // Prepare tesseracts. 
        this.tesseracts = []; 
        this.setupTesseracts(sceneObjects); 

        // Prepare planes. 
        this.planes = [];
        this.setupPlanes(sceneObjects); 

        // Prepare agents. 
        this.agents = []; 
        this.setupAgents(sceneObjects);
    }

    update(snapshot) {
        this.agents.forEach(a => { 
            a.update(); 
        }); 

        this.tesseracts.forEach(t => {
            t.update(); 
        });
    }

    setupTesseracts(sceneObjects) {
        this.objs = sceneObjects['tesseracts'];
        this.objs.forEach(o => {
            let t = new Tesseract(o); 
            this.tesseracts.push(t); 
        }); 
    }

    setupPlanes(sceneObjects) {
        this.objs = sceneObjects['planes']; 
        this.objs.forEach(o => {
            let p = new Plane(o);
            this.planes.push(p); 
        }); 
    }

    setupAgents(sceneObjects) {
        this.objs = sceneObjects['runners']; 
        this.objs.forEach(o => {
            let a = new Agent(o, this.tesseracts, this.planes); 
            this.agents.push(a); 
        }); 
    }
}