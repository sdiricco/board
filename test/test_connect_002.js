/**
 * 
 * scope of test:
 * Verify the functionallity of connect() method
 * passing a valid port
 * 
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 * 
 * description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <requestPort()> method
 * - call <connect({port: port.path})> method with port received by requestPort() method
 * - get <firmata> property
 * - get <connected> property
 */

const{Board} = require('../index');


let main = async () => {
  try {
    console.log(`--- TEST START ---`)
    console.log(`Verify the functionallity of connect() method passing a valid port`)

    const board = new Board();

    board.on("error", (e) => {
      console.log(e);
    });

    let port = await board.requestPort();
    console.log("result of requestPort():", port)

    const res = await board.connect({port: port.path});
    console.log("result of connect():", res);

    console.log("<connected> property:", board.connected);

    console.log(`--- TEST PASSED: ${board.connected} ---`)
    console.log(`--- TEST END ---`)
  } catch (e) {
    console.log(e)
  }
}

main();