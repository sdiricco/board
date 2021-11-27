# boardjs

Implementation of firmatajs library based on Promise syntax with helpful extra functions.

## Installation

- Upload [StandardFirmata.ino](https://github.com/firmata/arduino/blob/master/examples/StandardFirmata/StandardFirmata.ino) to your Arduino board using [Arduino IDE](https://www.arduino.cc/en/software).

- Install the library:
```bash
npm i @sdiricco/boardjs
```

### Compilation problems

Firmata use [Node SerialPort](https://serialport.io/) to communicate with the usb boards and sometimes you may run into compilation problems. See [SerialPort - Compilation Problems](https://serialport.io/docs/guide-installation#compilation-problems)

## Basic Usage

Connect the board with a valid StandardFirmata.ino and run following script.

```javascript
const { Board } = require("@sdiricco/boardjs");

let main = async () => {
  try {
    const board = new Board();
    board.on("error", (e) => {
      console.log(e);
    });
    console.log("connecting.. ");
    await board.connect();
    console.log("board connected:", board.connected);

    console.log("pinMode()");
    await board.pinMode(13, board.MODES.OUTPUT);
    console.log("digitalWrite()");
    await board.digitalWrite(13, board.HIGH)

    const pin13 = board.pins[13].value;
    console.log(pin13)

  } catch (e) {
    console.log(e);
  }
  process.exit();
};

main();
```
