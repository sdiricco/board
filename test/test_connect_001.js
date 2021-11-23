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


let main = async () => {
  try {
    console.log(`--- TEST START---`)
    console.log(`Verify the functionallity of connect() method in auto-connect mode`)

    const board = new Board();

    board.on("error", (e) => {
      console.log(e);
    });

    const res = await board.connect();
    console.log("result of connect():", res);

    console.log("<connected> property:", board.connected);

    console.log(`--- TEST PASSED: ${board.connected} ---`)
    console.log(`--- TEST END ---`)
    
  } catch (e) {
    console.log(e)
  }
}

main();