loginCode = `
import "hashes/sha256/512bitPacked" as sha256packed

def main(private field a, private field b, private field c, private field d) -> field[2]:
    field[2] h = sha256packed([a, b, c, d])
    return h

`
module.exports = { loginCode }