const Firmata = require("firmata");
const Serialport = require("serialport");
const EventEmitter = require("events");

class Board extends EventEmitter {
  constructor() {
    super();
    this.firmata = undefined;

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.__onDisconnect = this.__onDisconnect.bind(this);
    this.__onClose = this.__onClose.bind(this);
    this.__onError = this.__onError.bind(this);
  }

  get serialport() {
    if (
      !(this.firmata instanceof Firmata) &&
      !(this.firmata.transport instanceof Serialport)
    ) {
      return undefined;
    }
    return this.firmata.transport;
  }

  get connected() {
    if (!(this.firmata instanceof Firmata)) {
      return false;
    }
    return this.firmata.versionReceived && this.firmata.isReady;
  }

  get port() {
    return this.serialport.path;
  }

  get pins() {
    if (!(this.firmata instanceof Firmata)) {
      return undefined;
    }
    return this.firmata.pins;
  }

  get MODES() {
    if (!(this.firmata instanceof Firmata)) {
      return undefined;
    }
    return this.firmata.MODES;
  }

  get HIGH() {
    if (!(this.firmata instanceof Firmata)) {
      return undefined;
    }
    return this.firmata.HIGH;
  }

  get LOW() {
    if (!(this.firmata instanceof Firmata)) {
      return undefined;
    }
    return this.firmata.LOW;
  }

  __onDisconnect() {
    this.firmata = undefined;
    this.emit("error", {
      type: "DISCONNECTED",
      message: `Board disconnected`,
      details: `details...`,
    });
  }

  __onClose() {
    this.firmata = undefined;
    this.emit("error", {
      type: "CLOSE",
      message: `Board disconnected. Check the hardware configuration`,
      details: `details...`,
    });
  }

  __onError(e) {
    this.firmata = undefined;
    this.emit("error", {
      type: "ERROR",
      message: `Error`,
      details: `${e.message}`,
    });
  }

  async requestPort() {
    return new Promise((res, rej) => {
      Firmata.requestPort((e, port) => {
        e ? rej(e) : res(port);
      });
    });
  }

  async connect(port, options) {
    return new Promise((res, rej) => {
      try {
        this.firmata = new Firmata(port, options);
        this.firmata.on("ready", () => {
          res(true);
        });
        this.firmata.on("disconnect", this.__onDisconnect);
        this.firmata.on("close", this.__onClose);
        this.firmata.on("error", this.__onError);
      } catch (e) {
        this.firmata = undefined;
        rej("Connection Failed. Check the hardware configuration");
      }
    });
  }

  async disconnect() {
    return new Promise((res, rej) => {
      if (!(this.firmata instanceof Firmata)) {
        res(true);
      }
      this.firmata.off("disconnect", this.__onDisconnect);
      this.firmata.off("close", this.__onClose);
      this.firmata.off("error", this.__onError);
      this.firmata.transport.close((e) => {
        this.firmata = undefined;
        e ? rej(e) : res(true);
      });
    });
  }

  pinMode(pin, mode) {
    try {
      this.firmata.pinMode(pin, mode);
    } catch (e) {
      throw `pinMode() failed. Details: ${e.message}`;
    }
  }

  digitalWrite(pin, value) {
    try {
      this.firmata.digitalWrite(pin, value);
    } catch (e) {
      throw `digitalWrite() failed. Details: ${e.message}`;
    }
  }

}

module.exports = { Board, Firmata, Serialport };
