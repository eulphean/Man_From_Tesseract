// main.js
// Entry level file that sets up all the objects. 
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const Time = require('Time'); 

import { World } from './World.js'

var world;
// Use a wild card (*) to read the entire tree. 
// Array Hierarchy = Scene Viewer Hierarchy
Promise.all([
    Scene.root.findByPath('planeTracker/placer/Planes/*'),
    Scene.root.findByPath('planeTracker/placer/Tesseracts/*'),
    Scene.root.findByPath('planeTracker/placer/Runners/*'),
]).then(objects => {
    let sceneObjects = prepareSceneObjects(objects); 

    // Setup agents, octree, etc. 
    world = new World(sceneObjects); 

    Diagnostics.log('Setup complete -> Begin Update loop.'); 

    //Setup an update loop here. 
    const timeInterval = 15;
    Time.setIntervalWithSnapshot({
        // 'lastTargetX' : sceneObjects['camTarget'].transform.x,
        // 'lastTargetY' : sceneObjects['camTarget'].transform.y,
        // 'lastTargetZ' : sceneObjects['camTarget'].transform.z,
    }, (elapsedTime, snapshot) => {
        world.update(snapshot); 
    }, timeInterval);
});

function prepareSceneObjects(objects) {
    const a = {
        'planes' : objects[0],
        'tesseracts' : objects[1],
        'runners' : objects[2]
    }
    return a; 
}