/**
 * test002.js
 *
 * scope of test:
 * verify that when the board is disconnected,
 * the module raise an error during the connection
 * Check also the internal status of module
 * 
 * prerequisites:
 * - a board with a valid firmata.ino firmware disconnected or
 * - nothing connected
 *
 * description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <connect()> method with undefined port
 * - get <firmata> property
 * - get <connected> property
 */

const { Board, Firmata, Serialport } = require("../boardjs");
const {wait} = require("./utils")

let main = async () => {
  let board = undefined;
  try {
    console.log(`--- TEST START ---`);

    console.log("call <constructor()> of Board class");
    board = new Board();

    console.log("listen on <error> event");
    board.on("error", (e)=> {
      console.log(e)
    })

    console.log("call connect() with undefined port");
    const res = await board.connect();
    console.log(res);

  } catch (e) {
    console.log(e);
  }

  console.log("get <firmata> property");
  console.log(board.firmata);

  console.log("get <connected> property");
  console.log(board.connected);
  
  console.log(`--- TEST PASSED: ${!board.connected} ---`);
  console.log(`--- TEST END ---`);
};

main();
