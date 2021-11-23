/**
 * test002.js
 *
 * scope of test:
 * Verify the functionallity of connect() method
 * passing a invalid port parameter
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

    console.log(`call <connect({port: "unknow" })> method with with invalid port`);
    const res = await board.connect({port: "unknow"});
    console.log(res);

  } catch (e) {
    console.log(e);
  }

  console.log("get <connected> property", board.connected);
  
  console.log(`--- TEST PASSED: ${!board.connected} ---`);
  console.log(`--- TEST END ---`);
};

main();
