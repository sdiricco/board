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
const { Test } = require("./utils");

let main = async () => {

  const test = new Test(
    module.filename,
    "Verify the functionallity of connect() method passing a valid port"
  );

  const board = new Board();

  try {
    board.on("error", (e) => {
      console.log("error event:", e)
    });

    let port = await board.requestPort();
    console.log("result of requestPort():", port)

    const res = await board.connect({port: port.path});
    console.log("result of connect():", res);

    console.log("<connected> property:", board.connected);

  } catch (e) {
    console.log("error catched:", e);
  }

  test.assert(board.connected)
  process.exit();
}

main();