import { Vector3 } from 'math-ds'
const Patches = require('Patches');
const Reactive = require('Reactive'); 

const getLastPosition = (sceneObject) => {
    // Acquire current agent position. 
    let posX = sceneObject.transform.x.pinLastValue(); 
    let posY = sceneObject.transform.y.pinLastValue(); 
    let posZ = sceneObject.transform.z.pinLastValue(); 
    return new Vector3(posX, posY, posZ);
}

const syncSceneObject = (sceneObject, targetVector) => {
    sceneObject.transform.x = targetVector.x; 
    sceneObject.transform.y = targetVector.y;
    sceneObject.transform.z = targetVector.z; 
}

const syncSceneObjectWorld = (sceneObject, targetVector) => {
    sceneObject.worldTransform.x = targetVector.x;
    sceneObject.worldTransform.y = targetVector.y;
    sceneObject.worldTransform.z = targetVector.z;  
}

const random = (min, max, isDecimal = false) => {
    if (isDecimal) {
        return (Math.random() * (max - min) + min).toFixed(3);
    } else {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export {
    getLastPosition,
    syncSceneObject,
    syncSceneObjectWorld,
    random
}