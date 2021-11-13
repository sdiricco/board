const Firmata = require("firmata");
const Serialport = require("serialport");

let board = undefined;

let getDevices = async () => {
  const spList = await Serialport.list();
  const usbDevices = spList
    .map((device) => {
      return {
        name: device.manufacturer,
        port: device.path,
        device: device,
      };
    })
    .filter((el) => el.name);
  return usbDevices;
};

let connect = async (path) => {
  return new Promise((res, rej) => {
    try {
      board = new Firmata(path);
      res(true);
    } catch (e) {
      rej(e);
    }
  });
};

let connect2 = async (path) => {
  return new Promise((res, rej) => {
    board = new Firmata(
      new Serialport(
        path,
        {
          autoOpen: false,
        },
        (e) => {
            if (e) {
                rej(e)
            }
            res(true)
        }
      )
    );
  });
};

let open = async () => {
  return new Promise((resolve, reject) => {
    board.transport.open((e) => {
      console.log("Open error", e);
      e ? reject(e) : resolve(true);
    });
  });
};

let readyBoard = async () => {
  return new Promise((res, rej) => {
    board.on("ready", () => {
      res(true);
    });
  });
};

let wait = (t) => {
  return new Promise((res) => setTimeout(() => res(true), t));
};

let main = async () => {
  try {
    const usbDevices = await getDevices();
    console.log(usbDevices);
    const path = usbDevices[0].port;
    await connect(path)
    board.on("ready", ()=> {
        console.log("ready")
        console.log("disconnect the board, then reconnect")
    })
    // await wait(5000);
    // board.transport.close((e) => {
    //     console.log("port closed")
    // })
    await wait(10000);
    await connect(path)
    board.on("ready", ()=> {
        console.log("ready")
    })
    await wait(5000);

  } catch (e) {
    console.log(e.message);
  }
};

main();
