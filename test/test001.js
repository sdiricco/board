/**
 * test001.js
 * 
 * scope of test:
 * Verify that when the board with a valid firmware is connected,
 * the module establish a connection to board.
 * Check also the internal status of module after connection
 * 
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 * 
 * description step:
 * - call <constructor()> of RelayJs class
 * - call <requestPort()> method
 * - call <connect(port.path)> method with port received by requestPort() method
 * - get <firmata> property
 * - get <connected> property
 */

const{RelayJs, Firmata, Serialport} = require('../relayjs');


let main = async () => {
  try {
    console.log(`--- TEST START ---`)

    console.log("call <constructor()> of RelayJs class")
    const relayjs = new RelayJs();

    console.log("call <requestPort()> method")
    let port = await relayjs.requestPort();
    console.log(port)

    console.log(`call <connect(${port.path})> method with port received by requestPort() method`);
    const res = await relayjs.connect(port.path);
    console.log(res);

    console.log("get <firmata> property");
    console.log(relayjs.firmata)

    console.log("get <connected> property");
    console.log(relayjs.connected)

    console.log(`--- TEST PASSED: ${relayjs.connected} ---`)
    console.log(`--- TEST END ---`)
  } catch (e) {
    console.log(e.message)
  }
}

main();