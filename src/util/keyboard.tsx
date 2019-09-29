export interface Key {
    value: any;
    isDown: boolean;
    isUp: boolean;
    press: Function;
    release: Function;
    downHandler: Function;
    upHandler: Function;
    unsubscribe: Function;
}

export const keyboard = (value: string): Key => {
    let key = {
        value: value,
        isDown: false,
        isUp: false,
        press: () => {},
        release: () => {},
        upHandler: (event: any) => {},
        downHandler: (event: any) => {},
        unsubscribe: () => {},
    } as Key;
    //The `downHandler`
    key.downHandler = (event: any) => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    key.upHandler = (event: any) => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    
    return key;
  }