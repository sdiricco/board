/**
 * 
 * scope of test:
 * Verify tthe autoconnect functionallity of connect()
 * method.
 * 
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 * 
 * description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <connect()> method with no parameters. autoconnect mode.
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

    console.log(`call <connect()> method with no parameters. autoconnect mode.`);
    const res = await board.connect();
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