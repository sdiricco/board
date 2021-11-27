/**
 *
 * scope of test:
 * Verify the functionallity of connect() method
 * passing a valid port
 *
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 *
 * description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <requestPort()> method
 * - call <connect({port: port.path})> method with port received by requestPort() method
 * 
 * Asserts: 
 * - connected property
 * - result of connect() method
 */

const { Board } = require("../index");
const { Test } = require("./utils");

let main = async () => {
  const test = new Test(
    module.filename,
    "Verify the functionallity of connect() method passing a valid port"
  );

  const board = new Board();
  let __connect = false;
  try {
    board.on("error", (e) => {
      console.log("error raised:", e);
    });

    let port = await board.requestPort();
    console.log("result of requestPort():", port);

    console.log("connecting..");
    __connect = await board.connect({ port: port.path });
    console.log("connected");

  } catch (e) {
    console.log("error catched:", e);
  }

  test.assert(board.connected, "connected property");
  test.assert(__connect, "result of connect() method");
  test.end({exit: true});

};

main();
