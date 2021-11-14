/**
 * test001.js
 *
 * scope of test:
 * Verify that when the board with a valid firmware is connected,
 * the module establish a connection to board.
 * Check also the internal status of module after connection
 *
 * prerequisites:
 * - a board with a valid firmata.ino firmware connected
 *
 * description step:
 * - call <constructor()> of Board class
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

    console.log("call <requestPort()> method");
    let port = await board.requestPort();
    console.log(port);

    console.log(
      `call <connect(${port.path})> method with port received by requestPort() method`
    );
    const res = await board.connect(port.path);
    console.log(res);

    console.log(`call <pinMode(13, board.MODES.OUTPUT)> method`);
    await board.pinMode(13, board.MODES.OUTPUT);
    console.log(`call <digitalWrite(13, board.HIGH)> method`);
    await board.digitalWrite(13, board.HIGH);

		console.log(board.firmata);

		console.log("wait 5000..");
		await wait(5000);

		console.log('call reset() method');
		await board.reset();

		console.log(board.firmata);


    console.log(`--- TEST PASSED: ${board.connected} ---`);
    console.log(`--- TEST END ---`);
  } catch (e) {
    console.log(e);
  }
};

main();
