/**
 * test006.js
 *
 * scope of test:
 * Verify the functionallity of autoConnect() method.
 * Connect the board with autoConnect() and check the
 * internal status
 *
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 *
 * description step:
 * - Tester: Connect a board with a valid firmata firmware
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <autoConnect()> method
 * - get <firmata> property
 * - get <connected> property
 */

 const { Board, Firmata, Serialport } = require("../boardjs");
 const { wait } = require("./utils");
 
 let main = async () => {
   let board = undefined;
   try {
     console.log(`--- TEST START ---`);
 
     console.log("call <constructor()> of Board class");
     board = new Board();
 
     console.log("listen on <error> event");
     board.on("error", (e) => {
       console.log(e);
     });
 
     console.log(
       `call <autoConnect()> method`
     );
     let res = await board.autoConnect();
     console.log(res);
 
     console.log("get <firmata> property");
     console.log(board.firmata);
 
     console.log("get <connected> property");
     console.log(board.connected);
 
     console.log(`--- TEST PASSED: ${board.connected} ---`);
     console.log(`--- TEST END ---`);
   } catch (e) {
     console.log(e.message);
   }
 };
 
 main();
 