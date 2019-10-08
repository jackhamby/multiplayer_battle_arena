import * as PIXI from 'pixi.js'
import { Container } from '../types/app_state'


export const contain = (sprite: PIXI.Sprite, container: Container) => {
    // left collision
    if (sprite.x < container.x){
        return "left";
    }
    // right collision
    if ((sprite.x + sprite.width) > (container.x + container.width)){
        return "right";
    }
    // top collision
    if (sprite.y < container.y){
        return "top";
    }
    // bootm collision
    if ((sprite.y + sprite.height) > (container.y + container.height)){
        return "bottom";
    }
    return true;
}