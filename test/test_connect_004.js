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
const { Test } = require("./utils");

let main = async () => {

  const test = new Test(
    module.filename,
    "Verify the functionallity of connect() method when no board connected"
  );

  const board = new Board();
  try {

    board.on("error", (e)=> {
      console.log("error event:", e)
    })

    const res = await board.connect();
    console.log("result of connect():", res);

    console.log("<connected> property:", board.connected);

  } catch (e) {
    console.log("error catched:", e);
  }  

  test.assert(!board.connected);
  process.exit()
};

main();
