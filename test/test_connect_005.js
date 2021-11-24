/**
 * test002.js
 *
 * scope of test:
 * Verify the functionallity of connect() method
 * in auto-connect mode calling it twice
 *
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 *
 * description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <connect()> method. Autoconnect mode.
 * - call <connect()> method. Autoconnect mode.
 * - get <firmata> property
 * - get <connected> property
 */

const { Board } = require("../index");
const { assert, Test } = require("./utils");

let main = async () => {

  const test = new Test(
    module.filename,
    "Verify the functionallity of connect() method in auto-connect mode calling it twice"
  );

  const board = new Board();

  try {
    board.on("error", (e) => {
      console.log(e);
    });

    let res = await board.connect();
    console.log("result of connect():", res);

    res = await board.connect();
    console.log("result of connect():", res);

    console.log("<connected> property:", board.connected);
  } catch (e) {
    console.log(e);
  }

  test.assert(board.connected);
  process.exit();
};

main();
