var express = require('express')
var router = express.Router()
const { initialize } = require('zokrates-js/node')
const { verCode } = require('../models/verify.zok')
const { VerifierContract, TickTokenContract, InfoContract, BoardTokenContract, web3 } = require('../models/web3');
var crypto = require('crypto')
var proofobject = require('./proof.json')

var accounts = [
  '0x12F0AE57EaCe8330bA30a11D0df5486e125f24cF',
  '0xB31310982b75a2f2a0e903aC762778a128193D32'
]

initialize().then((zokratesProvider) => {
  var a =  Math.floor(Date.now())

  //compilation
  const artifacts = zokratesProvider.compile(verCode);

  //run setup
  const keypair = zokratesProvider.setup(artifacts.program);
  var b = Math.floor(Date.now())-a
  console.log("verify结束部署：" + b)

  router.post('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    //console.log(req.body)

    //获取机票信息的output
    var OutPut1 = req.body.OutPut1
    var OutPut2 = req.body.OutPut2
    //机票信息
    const id = req.body.Id; //旅客身份证号
    const shipcode = req.body.ShipCode;
    const departurecity = req.body.DepartureCity;
    const reachcity = req.body.ReachCity;
    const filghtid = req.body.FlightId;
    const departuretime = req.body.DepartureTime;
    const reachtime = req.body.ReachTime;
    const boardinggate = req.body.BoardingGate;
    const seatnumber = req.body.SeatNumber;
    const passengerInfo = id + shipcode + departurecity + reachcity + filghtid + departuretime + reachtime + boardinggate + seatnumber//用户信息
    //用户信息
    //console.log(passengerInfo);
    var hash_str = crypto.createHash('sha256').update(passengerInfo).digest('hex').toUpperCase();

    var [num1, num2, num3, num4] = [parseInt("0x" + hash_str.slice(0, 16)), parseInt("0x" + hash_str.slice(16, 32)), parseInt("0x" + hash_str.slice(32, 48)), parseInt("0x" + hash_str.slice(48, 64))]
    num1 = num1.toString()
    num2 = num2.toString()
    num3 = num3.toString()
    num4 = num4.toString()
    OutPut1 = OutPut1.toString()
    OutPut2 = OutPut2.toString()

    //computation
    const { witness, output } = zokratesProvider.computeWitness(artifacts, [num1, num2, num3, num4, OutPut1, OutPut2])

    const temp = output.match(/"(\S*)"/)[1]
    if (temp == '1') {
      // generate proof
      const time1 = Math.floor(Date.now())
      const proof = zokratesProvider.generateProof(artifacts.program, witness, keypair.pk)
      const time2 = Math.floor(Date.now()) - time1
      console.log("proof结束时间:" + time2)
      res.send(JSON.stringify({
        proof: proof,
        output: output,
        status: '200',
      }))

    } else {
      res.send(JSON.stringify({
        output: output,
        status: '300',
        msg: '信息不匹配'
      }))
    }

  })

  router.post('/verifyProof', function (req, resject) {
    resject.header('Access-Control-Allow-Origin', '*');
    const x = req.body.proof
    console.log(x);
    
    var time3 = Math.floor(Date.now())
    VerifierContract.methods.verifyTx(proofobject.proof, proofobject.inputs).call().then((res) => {
      if (res) {
        console.log("证明验证成功！");
        console.log("TicketToken开始发送");
        TickTokenContract.methods.transfer(accounts[1], 1000).send({ from: accounts[0] }).then((res) => {
          console.log("TicketToken发送完成");
          resject.send(JSON.stringify({
            msg: '证明验证成功,成功发送TicketToken',
            status: '200',
          }))
        })
        var time4 = Math.floor(Date.now()) - time3
        console.log("验证耗时："+time4)
      } else {
        console.log("证明验证失败");
      }
    })

  })

  router.post('/verifyTicToken', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    const info = req.body.EncryptPassengerInfo
    console.log(info);

    var time7 = Math.floor(Date.now())
    //存放到对应用户地址下
    InfoContract.methods.setvalue(info, accounts[1]).send({ from: accounts[0] }).then(console.log("成功存放旅客加密的机票信息"))


    //授权转账
    TickTokenContract.methods.approve(accounts[0], 1000).send({ from: accounts[1] })

    //查询账户是否有TicketToken
    TickTokenContract.methods.balanceOf(accounts[1]).call().then(Ticket_token_count => {
      console.log(Ticket_token_count);
      if (Ticket_token_count >= 1000) {
        console.log("收回TicketToken");
        TickTokenContract.methods.transfer(accounts[0], 1000).send({ from: accounts[1] })
          .then(temp=>{
            console.log("成功收回TicketToken")
          })
        BoardTokenContract.methods.transfer(accounts[1], 1000).send({ from: accounts[0] })
          .then(temp => {
            console.log("Send BoardingToken successfully");
            res.send(JSON.stringify({
              msg: "已收回TicketToken,并发送BoardingToken!"
            }))
          }
          )
        var time8 = Math.floor(Date.now()) -time7
        console.log('安检环节耗时'+ time8);
      }
    })
  })

  router.get('/verifyBoardToken', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var time9 = Math.floor(Date.now())
    //获取对应地址的信息
    InfoContract.methods.getvalue(accounts[1]).call().then(info => {
      console.log("机票加密信息:" + info);
      res.send(JSON.stringify({
        info: info,
        status: '200'
      }))
    })

    //授权转账
    BoardTokenContract.methods.approve(accounts[0], 1000).send({ from: accounts[1] })
    console.log('转账授权成功');

    //查询账户是否有BoardingToken
    BoardTokenContract.methods.balanceOf(accounts[1]).call().then(Board_token_count => {
      if (Board_token_count >= 1000) {
        console.log("收回BoardingToken");
        BoardTokenContract.methods.transfer(accounts[0], 1000).send({ from: accounts[1] })
          .then(temp=>{
            console.log('成功收回BoardingToken')
            InfoContract.methods.setvalue('', accounts[1]).send({ from: accounts[0] }).then(console.log("成功存放旅客加密的机票信息"))
          })
        var time10 = Math.floor(Date.now())-time9
        console.log("登机环节耗时："+time10);
      } else {
        console.log('没有BoardingToken');
      }
    })



  })

})

module.exports = router;