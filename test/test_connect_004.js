/**
 *
 * Scope of test:
 * Verify the functionallity of connect() method
 * when no board connected
 * 
 * Prerequisites:
 * - no board connected
 *
 * Description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <connect()> method. Autoconnect mode.
 * 
 * Asserts: 
 * - connected property
 * - error catched
 */

const{Board} = require('../index');
const { Test } = require("./utils");
const prompt = require('prompt');
prompt.start();
 

let main = async () => {

  const test = new Test(
    module.filename,
    "Verify the functionallity of connect() method when no board connected."
  );

  await prompt.get('Tester: disconnect the board and press Enter to continue the test');

  const board = new Board();
  let errorRaised = false;
  let errorMessage = "";

  try {

    board.on("error", (e)=> {
      console.log("error raised:", e)
    })

    console.log("connecting..");
    const res = await board.connect();
    console.log("connected");
    console.log("result of connect():", res);

  } catch (e) {
    if (e && e.includes("Connection Failed")) {
      errorMessage = e;
      errorRaised = true;
    }
    console.log("error catched:", e);
  }  

  test.assert(!board.connected, "connected property");
  test.assert(errorRaised, `error catched: ${errorMessage}`);
  test.end({exit: true});

};

main();
