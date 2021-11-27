const { Board } = require("../index");

let main = async () => {
  try {
    const board = new Board();
    board.on("error", (e) => {
      console.log(e);
    });
    console.log("connecting.. ");
    await board.connect();
    console.log("board connected:", board.connected);

    console.log("pinMode()");
    await board.pinMode(13, board.MODES.OUTPUT);
    console.log("digitalWrite()");
    await board.digitalWrite(13, board.HIGH)

    const pin13 = board.pins[13].value;
    console.log(pin13)

  } catch (e) {
    console.log(e);
  }
  process.exit();
};

main();