const { verCode } = require('../models/verify.zok')
const { VerifierContract, TickTokenContract, InfoContract, BoardTokenContract, web3 } = require('../models/web3');
var crypto = require('crypto')
var proofobject = require('./proof.json')

var accounts = [
    '0x12F0AE57EaCe8330bA30a11D0df5486e125f24cF',
    '0xB31310982b75a2f2a0e903aC762778a128193D32'
]

// VerifierContract.methods.verifyTx(proofobject.proof, proofobject.inputs).call().then((res) => {
//     if (res) {
//       console.log("证明验证成功！");
//       console.log("TicketToken开始发送");
//       TickTokenContract.methods.transfer(accounts[1], 1000).send({ from: accounts[0] }).then((res) => {
//         console.log("TicketToken发送完成");
//         resject.send(JSON.stringify({
//           msg: '证明验证成功,成功发送TicketToken',
//           status: '200',
//         }))
//       })
//     } else {
//       console.log("证明验证失败");
//     }
//   })

let time = Math.floor(Date.now())
var time1 = Math.floor(Date.now())
var sum = 0
var info = '123'
while (time1 - time < 10000) {
    VerifierContract.methods.verifyTx(proofobject.proof, proofobject.inputs).call().then((res) => {
        if (res) {
          TickTokenContract.methods.transfer(accounts[1], 1000).send({ from: accounts[0] }).then((res) => {
          })
        } else {
        }
      })
    InfoContract.methods.setvalue(info, accounts[1]).send({ from: accounts[0] }).then(console.log("成功存放旅客加密的机票信息"))


    //授权转账
    TickTokenContract.methods.approve(accounts[0], 1000).send({ from: accounts[1] })

    //查询账户是否有TicketToken
    TickTokenContract.methods.transfer(accounts[0], 1000).send({ from: accounts[1] })
        .then(temp => {
            console.log("成功收回TicketToken")
        })
    BoardTokenContract.methods.transfer(accounts[1], 1).send({ from: accounts[0] })
        .then(temp => {
            console.log("Send BoardingToken successfully");
            res.send(JSON.stringify({
                msg: "已收回TicketToken,并发送BoardingToken!"
            }))
        }
        )

    InfoContract.methods.getvalue(accounts[1]).call().then(info => {
        console.log("机票加密信息:" + info);
    })

    //授权转账
    BoardTokenContract.methods.approve(accounts[0], 1000).send({ from: accounts[1] })
    console.log('转账授权成功');

    //查询账户是否有BoardingToken
    BoardTokenContract.methods.transfer(accounts[0], 1).send({ from: accounts[1] })
        .then(temp => {
            console.log('成功收回BoardingToken')
            InfoContract.methods.setvalue('', accounts[1]).send({ from: accounts[0] }).then(console.log("成功存放旅客加密的机票信息"))
        })
    sum = sum + 1
    time1 = Math.floor(Date.now())
}
console.log(time);
console.log(sum);