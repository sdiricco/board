/**
 *
 * Scope of test:
 * Verify the functionallity of error event when
 * the user disconnect a board already connected.
 *
 * Prerequisites:
 * - a board with a valid firmata.ino firmware connected
 *
 * Description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <connect()> method with no parameters. auto-connect mode.
 * - Tester: disconnect the board and press Enter to continue the test
 * 
 * Asserts: 
 * - connected property
 * - error catched
 */

const { Board } = require("../index");
const { Test, prompt } = require("./utils");


let main = async () => {
  const test = new Test(
    module.filename,
    "Verify the functionallity of error event when the user disconnect a board already connected."
  );

  let board = undefined;
  let errorRaised = false;
  let errorMessage = "";

  try {
    board = new Board();

    board.on("error", (e) => {
      if (e && e.type === 'CLOSE') {
        errorMessage = e.message
        errorRaised = true;
      }
      console.log("error event:", e);
    });

    console.log("connecting..");
    await board.connect();
    console.log("connected");

    await prompt.get('Tester: disconnect the board and press Enter to continue the test');
  } catch (e) {
    console.log("error catched:", e);
  }

  test.assert(!board.connected, "connected property");
  test.assert(errorRaised, `error raised: ${errorMessage}`);
  test.end({exit: true});
};

main();
