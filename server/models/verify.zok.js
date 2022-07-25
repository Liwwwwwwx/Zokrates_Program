verCode = `
import "hashes/sha256/512bitPacked" as sha256packed

def main(private field a, private field b, private field c, private field d, public field x1, public field x2)->field:
    field[2] h = sha256packed([a, b, c, d])
    field m = if h[0] == x1 && h[1] == x2 then 1 else 0 fi
    return m

`
module.exports = { verCode }