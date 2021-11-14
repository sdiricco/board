/**
 * test002.js
 *
 * scope of test:
 * verify that when the board is disconnected,
 * the module raise an error during the connection
 * Check also the internal status of module
 * 
 * prerequisites:
 * - a board with a valid firmata.ino firmware disconnected or
 * - nothing connected
 *
 * description step:
 * - call <constructor()> of RelayJs class
 * - listen on <error> event
 * - call <connect()> method with undefined port
 * - get <firmata> property
 * - get <connected> property
 */

const { RelayJs, Firmata, Serialport } = require("../relayjs");
const {wait} = require("./utils")

let main = async () => {
  let relayjs = undefined;
  try {
    console.log(`--- TEST START ---`);

    console.log("call <constructor()> of RelayJs class");
    relayjs = new RelayJs();

    console.log("listen on <error> event");
    relayjs.on("error", (e)=> {
      console.log(e)
    })

    console.log("call connect() with undefined port");
    const res = await relayjs.connect();
    console.log(res);

  } catch (e) {
    console.log(e.message);
  }

  console.log("wait 1000 ms");
  await wait(1000);

  console.log("get <firmata> property");
  console.log(relayjs.firmata);

  console.log("get <connected> property");
  console.log(relayjs.connected);
  
  console.log(`--- TEST PASSED: ${!relayjs.connected} ---`);
  console.log(`--- TEST END ---`);
};

main();
