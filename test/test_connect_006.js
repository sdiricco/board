/**
 * test003.js
 *
 * scope of test:
 * While the board is connected, verify that
 * if a user disconnect it from the usb port,
 * raise an error.
 * Check also the internal status
 *
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 *
 * description step:
 * - Tester: Connect a board with a valid firmata firmware
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <requestPort()> method
 * - call <connect(${port.path})> method with port received by requestPort() method
 * - Tester: Disconnect the board. Wait 10000 ms..
 * - get <firmata> property
 * - get <connected> property
 */

const { Board } = require("../index");
const { Test } = require("./utils");
var prompt = require('prompt');

//
// Start the prompt
//
prompt.start();

let main = async () => {
  const test = new Test(
    module.filename,
    "Verify the functionallity of error event when the user disconnect a board already connected."
  );

  let board = undefined;
  let eventRaised = false;
  try {
    board = new Board();

    board.on("error", (e) => {
      if (e && e.type === 'CLOSE') {
        eventRaised = true;
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

  test.assert(!board.connected && eventRaised);
  process.exit();
};

main();
