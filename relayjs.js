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

  get port(){
    if (! (this.firmata instanceof Firmata) ) {
      return undefined;
    }
    return this.firmata.path;
  }

  async requestPort(){
    return new Promise((res, rej)=> {
      Firmata.requestPort((e, port) => {
        e ? rej(e) : res(port)
      })
    })
  }

  __onDisconnect(){
    this.firmata = undefined;
    this.emit("error", {
      type: "DISCONNECTED",
      message: `Board disconnected`,
      details: `details...`,
    });
  }

  __onClose(){
    this.firmata = undefined;
    this.emit("error", {
      type: "CLOSE",
      message: `Board disconnected`,
      details: `details...`,
    });
  }

  __onError(e){
    this.firmata = undefined;
    this.emit("error", {
      type: "ERROR",
      message: `Error`,
      details: `${e.message}`,
    });
  }

  async connect(port, options) {
    return new Promise((res, rej) => {
      try {
        this.firmata = new Firmata(port, options);
        this.firmata.on("ready", ()=> {
          res(true)
        })
        this.firmata.on("disconnect", this.__onDisconnect)
        this.firmata.on("close", this.__onClose)
        this.firmata.on("error", this.__onError)
      } catch (e) {
        this.firmata = undefined;
        rej(`Connection Failed. Check the hardware configuration`);
      }
    });
  }

  async disconnect() {
    return new Promise((res, rej) => {
      if(! (this.firmata instanceof Firmata)){
        res(true);
      }
      this.firmata.off("disconnect", this.__onDisconnect)
      this.firmata.off("close", this.__onClose)
      this.firmata.off("error", this.__onError)
      this.firmata.transport.close((e) => {
        this.firmata = undefined;
        e ? rej(e) : res(true);
      });
    });
  }

}

module.exports = {RelayJs, Firmata, Serialport}
