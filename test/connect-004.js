/**
 *
 * Scope of test:
 * Verify the functionallity of connect() method
 * in auto-connect mode calling it twice
 *
 * Prerequisites:
 * - a board with a valid firmata.ino firmware connected
 *
 * Description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <connect()> method. Autoconnect mode.
 * - call <connect()> method. Autoconnect mode.
 * 
 * Asserts: 
 * - connected property
 */

const { Board } = require("../index");
const { Test } = require("./utils");

let main = async () => {

  const test = new Test(
    module.filename,
    "Verify the functionallity of connect() method in auto-connect mode calling it twice"
  );

  const board = new Board();

  try {
    board.on("error", (e) => {
      console.log("error raised:", e);
    });

    let res = await board.connect();
    console.log("result of connect():", res);

    console.log("connecting..");
    res = await board.connect();
    console.log("connected");
    console.log("result of connect():", res);

  } catch (e) {
    console.log("error catched:", e);
  }

  test.assert(board.connected, "connected property");
  test.end({exit: true});

};

main();
