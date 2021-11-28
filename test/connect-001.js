/**
 * 
 * Scope of test:
 * Verify the functionallity of connect() method
 * in auto-connect mode
 * 
 * Prerequisites:
 * - a board with a valid firmata.ino firmware connected
 * 
 * Description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <connect()> method with no parameters. auto-connect mode.
 * 
 * Asserts: 
 * - connected property
 * - result of connect() method
 * 
 */

const{Board} = require('../index');
const { Test } = require("./utils");

let main = async () => {

  const test = new Test(
    module.filename,
    "Verify the functionallity of connect() method in auto-connect mode"
  );

  const board = new Board();
  let __connect = false;

  try {

    board.on("error", (e) => {
      console.log("error raised:", e)
    });

    console.log("connecting..");
    __connect = await board.connect();
    console.log("connected");

  } catch (e) {
    console.log("error catched:", e);
  }

  test.assert(board.connected, "connected property");
  test.assert(__connect, "result of connect() method");
  test.end({exit: true});

}

main();