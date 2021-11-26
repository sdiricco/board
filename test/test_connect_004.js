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

const prompt = require('prompt-sync')();
 

let main = async () => {

  const test = new Test(
    module.filename,
    "Verify the functionallity of connect() method when no board connected."
  );

  prompt('Tester: disconnect the board and press Enter to continue the test');
  console.log('ok')

  const board = new Board();
  let errorRaised = false;

  try {

    board.on("error", (e)=> {
      console.log("error event:", e)
    })

    console.log("connecting..");
    const res = await board.connect();
    console.log("connected");
    console.log("result of connect():", res);

  } catch (e) {
    if (e && e.includes("Connection Failed")) {
      errorRaised = true;
    }
    console.log("error catched:", e);
  }  

  test.assert(!board.connected && errorRaised);
  process.exit()
};

main();
