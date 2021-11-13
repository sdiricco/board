const Firmata = require("firmata");
const Serialport = require("serialport");
const EventEmitter = require("events");

class RelayJs extends EventEmitter {
  constructor() {
    super();
    this.firmata = undefined;
  }

  get firmataInstance(){
    return this.firmata;
  }

  get serialportInstance(){
    if (! (this.firmata instanceof Firmata) ) {
      return undefined;
    }
    return this.firmata.transport
  }

  get connected(){
    if (! (this.firmata instanceof Firmata) ) {
      return false;
    }
    return this.firmata.versionReceived && this.firmata.isReady
  }

  async requestPort(){
    return new Promise((res, rej)=> {
      Firmata.requestPort((e, port) => {
        e ? rej(e) : res(port)
      })
    })
  }

  async connect(port) {
    return new Promise((res, rej) => {
      try {
        this.firmata = new Firmata(port);
        this.firmata.on("ready", ()=> {
          res(true)
        })
        this.firmata.on("disconnect", () => {
          this.firmata = undefined;
          this.emit("error", {
            type: "DISCONNECTED",
            message: `Board disconnected`,
            details: `details...`,
          });
        })
        this.firmata.on("close", ()=> {
          this.firmata = undefined;
          this.emit("error", {
            type: "CLOSE",
            message: `Board disconnected`,
            details: `details...`,
          });
        })
        this.firmata.on("error", (e)=> {
          this.firmata = undefined;
          this.emit("error", {
            type: "ERROR",
            message: `Error`,
            details: `${e.message}`,
          });
        })
      } catch (e) {
        this.firmata = undefined;
        this.emit("error", {
          type: "CONNECTION_FAILED",
          message: `Connection Failed. Check the hardware configuration`,
          details: e.message,
        });
        rej(`Connection Failed. Check the hardware configuration`);
      }
    });
  }
}

module.exports = {RelayJs, Firmata, Serialport}
