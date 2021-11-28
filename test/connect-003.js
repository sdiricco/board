/**
 * test002.js
 *
 * scope of test:
 * Verify the functionallity of connect() method
 * passing an invalid port parameter
 * 
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 *
 * description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <connect({port: "unknow"})> method with with invalid port
 * 
 * Asserts: 
 * - connected property
 * - error catched
 */

const{Board} = require('../index');
const { Test } = require("./utils");

let main = async () => {

  const test = new Test(
    module.filename,
    "Verify the functionallity of connect() method passing an invalid port parameter"
  );

  const board = new Board();
  let errorRaised = false;
  let errorMessage = ""

  try {
    board.on("error", (e)=> {
      console.log("error raised:", e)
    })

    console.log("connecting..");
    const res = await board.connect({port: "unknow"});
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
