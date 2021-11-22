# boardjs

Implementation of firmatajs library based on Promise syntax with helpful extra functions.

## Installation

```bash
npm i @sdiricco/boardjs
```

## Basic Usage

```javascript
const { Board } = require("@sdiricco/boardjs");

let main = async () => {
  try {
    const board = new Board();
    board.on("error", (e) => {
      console.log(e);
    });
    await board.connect();
  } catch (e) {
    console.log(e);
  }
};

main();
```
