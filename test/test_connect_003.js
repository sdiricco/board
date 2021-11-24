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
 * - get <firmata> property
 * - get <connected> property
 */

const{Board} = require('../index');
const { Test } = require("./utils");

let main = async () => {

  const test = new Test(
    module.filename,
    "Verify the functionallity of connect() method passing an invalid port parameter"
  );

  const board = new Board();

  try {
    board.on("error", (e)=> {
      console.log("error event:", e)
    })

    const res = await board.connect({port: "unknow"});
    console.log("result of connect():", res);

    console.log("<connected> property: ", board.connected);

  } catch (e) {
    console.log("error catched:", e);
  }

  test.assert(!board.connected)
  process.exit()
  
};

main();
