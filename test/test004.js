/**
 * test004.js
 *
 * scope of test:
 * While the board is connected, verify that
 * if a user disconnect it from the usb port,
 * raise an error and check the internal status.
 * Then connect again the board and check the
 * internal status again
 * 
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 *
 * description step:
 * - Tester: Connect a board with a valid firmata firmware
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <requestPort()> method
 * - call <connect(${port.path})> method with port received by requestPort() method
 * - Tester: Disconnect the board. Wait 10000 ms..
 * - get <firmata> property
 * - get <connected> property
 * - Tester: Connect the board. Wait 10000 ms..
 * - call <requestPort()> method
 * - call <connect(${port.path})> method with port received by requestPort() method
 * - get <firmata> property
 * - get <connected> property
 */

 const { Board, Firmata, Serialport } = require("../board");
 const {wait} = require("./utils")
 
 let main = async () => {
   let board = undefined;
   try {

     console.log(`--- TEST START ---`);

     console.log("call <constructor()> of Board class");
     board = new Board();

     console.log("listen on <error> event");
     board.on("error", (e)=> {
       console.log("Event log:", e)
     })

     console.log("call <requestPort()> method")
     let port = await board.requestPort();
     console.log(port)

     console.log(`call <connect(${port.path})> method with port received by requestPort() method`);
     let res = await board.connect(port.path);
     console.log(res);

     console.log("Tester: Disconnect the board. Wait 10000 ms..");
     await wait(10000);

     console.log("get <firmata> property");
     console.log(board.firmata);

     console.log("get <connected> property");
     console.log(board.connected);

     console.log("Tester: Connect the board. Wait 10000 ms..");
     await wait(10000);

     console.log("call <requestPort()> method")
     port = await board.requestPort();
     console.log(port)

     console.log(`call <connect(${port.path})> method with port received by requestPort() method`);
     res = await board.connect(port.path);
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
 