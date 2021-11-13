let wait = (t_ms) => {
    return new Promise(res => setTimeout(()=> res(true), t_ms))
}
module.exports = {wait}