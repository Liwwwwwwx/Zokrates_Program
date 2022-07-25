const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

var count = 10
const leaves = ['北京', '上海', 'MU3757', 'E3', '7:50', '9:30'].map(x => SHA256(x))
const tree = new MerkleTree(leaves, SHA256)
const root = tree.getRoot().toString('hex')


var arr = []
var time1 = Math.floor(Date.now());
for (j = 0; j < count; j++) {
    const leaves = ['北京', '上海', 'MU3757', 'E3', '7:50', '9:30'].map(x => SHA256(x))
    const tree = new MerkleTree(leaves, SHA256)
    const root = tree.getRoot().toString('hex')
    console.log(root);
    arr.push(root)
}
var time2 = Math.floor(Date.now());
console.log(count,'条数据使用merkle加密所需要的时间',time2-time1);

//console.log(arr);
var time1 = Math.floor(Date.now());
for (i = 0; i < count; i++) {
    if (arr[i] !== root) {
        console.log(arr[i]);
    }
}
var time2 = Math.floor(Date.now());
console.log(count,'条数据使用merkle验证所需要的时间',time2-time1);


// const badLeaves = ['a', 'x', 'c'].map(x => SHA256(x))
// const badTree = new MerkleTree(badLeaves, SHA256)
// const badLeaf = SHA256('x')
// const badProof = tree.getProof(badLeaf)
// console.log(tree.verify(badProof, leaf, root)) // falses



const NodeRSA = require('node-rsa');

const _pubKey = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAICZifH6EG/qZ4tNYdkTUI/+TMpMr/3r
ap6NM5Zqo0pEaTQWRVarR3njktB3ssfydQZESo+E0d3AIffhXrf1YiUCAwEAAQ==
-----END PUBLIC KEY-----`;

const _priKey = `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAICZifH6EG/qZ4tNYdkTUI/+TMpMr/3rap6NM5Zqo0pEaTQWRVar
R3njktB3ssfydQZESo+E0d3AIffhXrf1YiUCAwEAAQJAce6VZgoTsfNMFQBTpgwU
nd3AjqHucdm1tg6HG8YSMOKnsKi5YWr1nB7VOGgbN6UVIqMCphfbkglIA2A2ICQP
AQIhAPMVXuPOysQdI0qQ0gD5t79shLr5TSCnsQDN4QuN6CaFAiEAh27c3ebGy3s1
AtggAQvyQYUB4Gi/tr2ZamwlMh7+LyECIQCW/IgzEehKRhr8ntWCO5nRcdND28P3
a5F7AWYuahdvjQIgewYNw9S6iGRnBypkCA9eBH5Z8gu0+r7H+ZA7SYg1xYECIDKd
p6W2H0D+k/G4yazk0SSfNg7fNCZcdY8qMwTfciOO
-----END RSA PRIVATE KEY-----`;


//数据加密所需要的时间
// var msg = 'a' * 40
// var msg1 = 'a' * 160
// var publicKey = new NodeRSA(_pubKey);

// //非对称加密
// var time1= Math.floor(Date.now())
// for (i = 0; i < 10000; i++) {
//     var encrypted = publicKey.encrypt(msg1, 'base64');
// }
// var time2 = Math.floor(Date.now())
// console.log(time2-time1);

//Merkle树
// var time3 = Math.floor(Date.now())
// for (let i = 0; i < 1000000; i++) {
//     const leaves1 = [msg, msg, msg, msg].map(x => SHA256(x))
//     const tree2 = new MerkleTree(leaves1, SHA256)
//     const root3 = tree2.getRoot().toString('hex')
// }
// var time4 = Math.floor(Date.now())
// console.log(time4-time3);






// var msg = '北京+上海+MU3757+E3+7:50+9:30'
// var publicKey = new NodeRSA(_pubKey);
// const count = 1000000

// //非对称加密
// var time1= Math.floor(Date.now())
// for (i = 0; i < count; i++) {
//     var encrypted = publicKey.encrypt(msg, 'base64');
// }
// var time2 = Math.floor(Date.now())
// console.log(count,'条加密所需要的时间:',time2-time1);

// var privateKey = new NodeRSA(_priKey);
// var decrypted = privateKey.decrypt(encrypted, 'utf8');
// const info = decrypted.split("+")

// var time1 = Math.floor(Date.now())
// for (i = 0; i < count; i++) {
//     decrypted = privateKey.decrypt(encrypted, 'utf8');
//     const info = decrypted.split("+")
//     if(info[0] !== '北京' || info[1] !== '上海' || info[2] !== 'MU3757' || info[3] !== 'E3' || info[4] !== '7:50' || info[5] !== '9:30' ){
//         console.log(0);
//     }
// }
// var time2 = Math.floor(Date.now())
// console.log(count,'条验证所需要的时间:',time2-time1);




