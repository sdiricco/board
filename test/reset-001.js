/**
 * Scope of test:
 * Verify the functionallity of reset() method
 *
 * Prerequisites:
 * - a board with a valid firmata.ino firmware connected
 *
 * Description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <connect()> method with no parameters. auto-connect mode.
 * - call <reset()> method
 * 
 * Asserts: 
 * - connected property
 */

 const { Board } = require("../index");
 const { Test, prompt } = require("./utils");
 
 let main = async () => {
   let board = undefined;
   let eventRaised = false;
 
   const test = new Test(
     module.filename,
     "Verify the functionallity of reset() method."
   );
 
   try {
     board = new Board();
 
     board.on("error", (e) => {
       console.log("error event:", e);
     });
 
     console.log("connecting..");
     await board.connect();
     console.log("connected");
 
     await board.reset();
     console.log(board.pins)
 
   } catch (e) {
     console.log("error catched:", e);
   }
 
   test.assert(board.connected);;
   test.end({exit: true});
 
 };
 
 main();
 