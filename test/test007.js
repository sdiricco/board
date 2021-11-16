/**
 * test007.js
 *
 * scope of test:
 * Verify the functionallity of pinMode()/digitalWrite()
 * Connect the board, set pin 13 as output using pinMode()
 * then set the value to 1 using digitalWrite()
 *
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 *
 * description step:
 * - call <constructor()> of Board class
 * - listen on <error> event
 * - call <requestPort()> method
 * - call <connect(port.path)> method with port received by requestPort() method
 * - get <firmata> property
 * - get <connected> property
 */

const { Board, Firmata, Serialport } = require("../board");
const { wait } = require("./utils");

let main = async () => {
  try {
    console.log(`--- TEST START ---`);

    console.log("call <constructor()> of Board class");
    const board = new Board();

		console.log("listen on <error> event");
    board.on("error", (e) => {
      console.log(e);
    });

    console.log("call <requestPort()> method");
    let port = await board.requestPort();
    console.log(port);

    console.log(
      `call <connect(${port.path})> method with port received by requestPort() method`
    );
    const res = await board.connect(port.path);
    console.log(res);

    // console.log(board.pins)


    console.log(`call <pinMode(13, board.MODES.OUTPUT)> method`);
    await board.pinMode(13, board.MODES.OUTPUT);
    console.log(board.firmata.pending);

    console.log(`call <digitalWrite(13, board.HIGH)> method`);
    await board.digitalWrite(13, board.HIGH);
    console.log(board.firmata.pending);


		console.log("get <pins[13]> property");
		console.log(board.pins[13]);

     await board.reset();
    console.log(board.firmata.pending);
    // console.log(board.pins)

    console.log(`--- TEST PASSED: ${board.pins[13].value === board.HIGH} ---`);
    console.log(`--- TEST END ---`);
  } catch (e) {
    console.log(e.message);
  }
};

main();
