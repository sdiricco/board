/**
 * 
 * scope of test:
 * Verify the functionallity of connect() method
 * in auto-connect mode
 * 
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 * 
 * description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <connect()> method with no parameters. auto-connect mode.
 * - get <firmata> property
 * - get <connected> property
 */

const{Board} = require('../index');
const { Test } = require("./utils");

let main = async () => {

  const test = new Test(
    module.filename,
    "Verify the functionallity of connect() method in auto-connect mode"
  );

  const board = new Board();

  try {

    board.on("error", (e) => {
      console.log("error event:", e)
    });

    const res = await board.connect();
    console.log("result of connect():", res);

    console.log("<connected> property:", board.connected);
    
  } catch (e) {
    console.log("error catched:", e);
  }

  test.assert(board.connected);
  process.exit()
}

main();