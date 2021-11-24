const path = require('path')

let wait = (t_ms) => {
    return new Promise(res => setTimeout(()=> res(true), t_ms))
}


class Test {
    constructor(file = undefined, message = undefined){
        let __name = "";
        let __message = "";

        if (file) {
            __name = path.basename(file, '.js');
        }
        if (message) {
            __message = message;
        }

        this.success = "\x1b[30m\x1b[42m%s\x1b[0m";
        this.error = "\x1b[30m\x1b[41m%s\x1b[0m";
        this.title =  "\x1b[30m\x1b[47m%s\x1b[0m";
        this.footer =  "\x1b[30m\x1b[47cm%s\x1b[0m";
        this.bg =  "\x1b[46m%s\x1b[0m";

        this.name = __name;
        this.message = __message;

        this.header();

    }

    header(){
        const title = `Test "${this.name}" start.`
        console.log("--- ".repeat(20));
        console.log(this.title, " " + title +  " ")
        console.log(this.title, " " + this.message + " ")
    }

    assert(condition){
        if (condition) {
            console.log(this.success, ` Test "${this.name}" passed \u{2714} `);
        }
        else{
            console.log(this.error, ` Test "${this.name}" failed \u{2716} `);
        }
        console.log('\n')

    }
}

module.exports = {wait, Test}