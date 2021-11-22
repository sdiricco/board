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

    console.log("call <constructor()> of Board class")
    const board = new Board();

    console.log("listen on <error> event");
    board.on("error", (e) => {
      console.log(e);
    });

    console.log("call <requestPort()> method")
    let port = await board.requestPort();
    console.log(port)

    console.log(`call <connect({port: ${port.path}})> method with port received by requestPort() method`);
    const res = await board.connect({port: port.path});
    console.log(res);

    console.log("get <firmata> property");
    console.log(board.firmata)

    console.log("get <connected> property");
    console.log(board.connected)

    console.log(`--- TEST PASSED: ${board.connected} ---`)
    console.log(`--- TEST END ---`)
  } catch (e) {
    console.log(e)
  }
}

main();