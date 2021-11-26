/**
 * scope of test:
 * Verify the functionallity of connect() when the user 
 * disconnect the board, reconnect it and try a new connection.
 *
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 *
 * description step:
 * - Tester: Connect a board with a valid firmata firmware
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <connect()> method with no parameters. auto-connect mode.
 * - Tester: disconnect the board and press Enter to continue the test
 * - Tester: connect the board and press Enter to continue the test
 * - call <connect()> method with no parameters. auto-connect mode.
 * 
 * Assert: board.connected
 */

const { Board } = require("../index");
const { Test } = require("./utils");
const prompt = require('prompt');

let main = async () => {
  let board = undefined;
  let eventRaised = false;

  const test = new Test(
    module.filename,
    "Verify the functionallity of connect() when the user disconnect the board, reconnect it and try a new connection."
  );

  try {
    board = new Board();

    board.on("error", (e) => {
      if (e && e.type === "CLOSE") {
        eventRaised = true;
      }
      console.log("error event:", e);
    });

    console.log("connecting..");
    await board.connect();
    console.log("connected");
    await prompt.get(
      "Tester: disconnect the board and press Enter to continue the test"
    );
    await prompt.get(
      "Tester: connect the board and press Enter to continue the test"
    );

    console.log("connecting..");
    await board.connect();
    console.log("connected");

  } catch (e) {
    console.log("error catched:", e);
  }

  test.assert(board.connected);
  process.exit();
};

main();
