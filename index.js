const Firmata = require("firmata");
const EventEmitter = require("events");

const TIMEOUT_EXEC_PROM = 5;

let wait = (t_ms) => {
  return new Promise((res) => setTimeout(() => res(true), t_ms));
};

class Board extends EventEmitter {
  constructor() {
    super();
    this.firmata = undefined;

    this.__onDisconnect = this.__onDisconnect.bind(this);
    this.__onClose = this.__onClose.bind(this);
    this.__onError = this.__onError.bind(this);
    this.__connectBoard = this.__connectBoard.bind(this);
    this.__disconnectBoard = this.__disconnectBoard.bind(this);
    this.execProm = this.execProm.bind(this);
    this.requestPort = this.requestPort.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.pinMode = this.pinMode.bind(this);
    this.digitalWrite = this.digitalWrite.bind(this);
    this.digitalRead = this.digitalRead.bind(this);
  }

  get serialport() {
    if (this.firmata instanceof Firmata && this.firmata.transport) {
      return this.firmata.transport;
    }
    return undefined;
  }

  get connected() {
    if (!(this.firmata instanceof Firmata)) {
      return false;
    }
    return this.firmata.versionReceived && this.firmata.isReady;
  }

  get port() {
    if (this.serialport) {
      return this.serialport.path;
    }
    return undefined;
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
      details: `Check the hardware configuration`,
    });
  }

  __onClose() {
    this.firmata = undefined;
    this.emit("error", {
      type: "CLOSE",
      message: `Board disconnected.`,
      details: `Check the hardware configuration`,
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

  async __connectBoard(port, options) {
    return new Promise(async (res, rej) => {
      try {
        this.firmata = new Firmata(port, options);
        this.firmata.on("ready", () => {
          res(true);
        });
        this.firmata.on("error", (e) => {
          rej(e.message);
        });
      } catch (e) {
        this.firmata = undefined;
        rej("Check the hardware configuration");
      }
    });
  }

  async __disconnectBoard() {
    return new Promise((res, rej) => {
      if (!(this.firmata instanceof Firmata)) {
        res(true);
      }
      this.firmata.transport.close((e) => {
        this.firmata = undefined;
        e ? rej(e) : res(true);
      });
    });
  }

  async execProm(__function, timeout = TIMEOUT_EXEC_PROM) {
    return new Promise(async (res, rej) => {
      setTimeout(() => {
        rej("Timeout Expired");
        return;
      }, timeout);
      try {
        __function();
        this.firmata.flushDigitalPorts();
      } catch (e) {
        rej(e);
        return;
      }
      while (this.firmata.pending) {
        await wait(1);
      }
      res(true);
      return;
    });
  }

  async requestPort() {
    return new Promise((res, rej) => {
      Firmata.requestPort((e, port) => {
        e ? rej(e.message) : res(port);
      });
    });
  }

  async connect({ port = undefined, options = undefined } = {}) {
    try {
      //if already connected, connect() return true
      //only if is called in auto-connect mode (port = undefined)
      //or if the port is the same connected (port === this.port)
      if (this.connected) {
        if (port === undefined || port === this.port) {
          return true;
        }
        throw `Connection Failed. Already connected on ${this.port}`;
      }

      let __port = undefined;

      //connect to specified port or try auto-connect if port = undefined
      if (port === undefined) {
        //in auto-connect mode find a valid port
        const portInfo = await this.requestPort();
        __port = portInfo ? portInfo.path : undefined;
      } else {
        __port = port;
      }

      await this.__connectBoard(__port, options);

      this.firmata.on("disconnect", this.__onDisconnect);
      this.firmata.on("close", this.__onClose);
      this.firmata.on("error", this.__onError);
    } catch (e) {
      throw `Connection Failed. ${e}`;
    }
    return true;
  }

  async disconnect() {
    try {
      if (!(this.firmata instanceof Firmata)) {
        return true;
      }
      this.firmata.off("disconnect", this.__onDisconnect);
      this.firmata.off("close", this.__onClose);
      this.firmata.off("error", this.__onError);
      await this.__disconnectBoard();
    } catch (e) {
      throw `Disconnection Failed. ${e.message}`;
    }
  }

  async reset() {
    try {
      await this.execProm(() => {
        for (let pin = 0; pin < this.pins.length; pin++) {
          this.pinMode(pin, this.MODES.UNKOWN);
          this.digitalWrite(pin, this.LOW, true);
        }
      }, 50);
    } catch (e) {
      throw `reset failed. Details: ${e}`;
    }
  }

  async pinMode(pin, mode) {
    try {
      await this.execProm(() => {
        this.firmata.pinMode(pin, mode);
      });
    } catch (e) {
      throw new Error(`pinMode() failed. Details: ${e}`);
    }
  }

  async digitalWrite(pin, value, enqueue) {
    try {
      await this.execProm(() => {
        this.firmata.digitalWrite(pin, value, enqueue);
      });
    } catch (e) {
      throw new Error(`digitalWrite() failed. Details: ${e.message}`);
    }
  }

  digitalRead(pin) {
    if (this.pins && this.pins.length && pin < this.pins.length) {
      return this.pins[pin].value
    }
  }
}

module.exports = { Board, Firmata };
