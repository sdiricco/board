/**
 * test002.js
 *
 * scope of test:
 * Verify the functionallity of connect() method
 * when no board connected
 * 
 * prerequisites:
 * - no board connected
 *
 * description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <connect()> method. Autoconnect mode.
 * - get <firmata> property
 * - get <connected> property
 */

const{Board} = require('../index');

let main = async () => {
  let board = undefined;
  try {
    console.log(`--- TEST START ---`);

    console.log("call <constructor()> of Board class");
    board = new Board();

    console.log("listen on <error> event");
    board.on("error", (e)=> {
      console.log(e)
    })

    console.log(`call <connect()> method. Autoconnect mode.`);
    const res = await board.connect();
    console.log(res);

  } catch (e) {
    console.log(e);
  }

  console.log("get <firmata> property");
  console.log(board.firmata);

  console.log("get <connected> property");
  console.log(board.connected);
  
  console.log(`--- TEST PASSED: ${!board.connected} ---`);
  console.log(`--- TEST END ---`);
};

main();