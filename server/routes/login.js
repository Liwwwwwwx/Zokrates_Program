var express = require('express');
var router = express.Router();
const { initialize } = require('zokrates-js/node')
const { loginCode } = require('../models/login.zok');
const NodeRSA = require('node-rsa')
var crypto = require('crypto');

initialize().then((zokratesProvider) => {
  var time1 =  Math.floor(Date.now())
  // compilation
  const artifacts = zokratesProvider.compile(loginCode);

  // run setup
  const keypair = zokratesProvider.setup(artifacts.program);
  var time2 = Math.floor(Date.now()) - time1 
  console.log("散列值zok部署时间：" + time2)

  /* GET home page. */
  router.post('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var time3 =  Math.floor(Date.now())
    console.log(req.body)
    const id = req.body.Id; //旅客身份证号
    const shipcode = req.body.ShipCode;
    const departurecity = req.body.DepartureCity;
    const reachcity = req.body.ReachCity;
    const filghtid = req.body.FlightId;
    const departuretime = req.body.DepartureTime;
    const reachtime = req.body.ReachTime;
    const boardinggate = req.body.BoardingGate;
    const seatnumber = req.body.SeatNumber;
    const str = id + shipcode + departurecity + reachcity + filghtid + departuretime + reachtime + boardinggate + seatnumber//用户信息
    console.log(str);
    var hash_str = crypto.createHash('sha256').update(str).digest('hex').toUpperCase();

    var [num1, num2, num3, num4] = [parseInt("0x" + hash_str.slice(0, 16)), parseInt("0x" + hash_str.slice(16, 32)), parseInt("0x" + hash_str.slice(32, 48)), parseInt("0x" + hash_str.slice(48, 64))]
    num1 = num1.toString()
    num2 = num2.toString()
    num3 = num3.toString()
    num4 = num4.toString()
    console.log(num1, num2, num3, num4)
    // computation
    const { witness, output } = zokratesProvider.computeWitness(artifacts, [num1, num2, num3, num4]);
    var time4 = Math.floor(Date.now()) - time3
    console.log("散列值生成时间" + time4)

    // generate proof
    const proof = zokratesProvider.generateProof(artifacts.program, witness, keypair.pk);
    res.send(JSON.stringify({
      data: {
        proof: proof,
        output: output
      },
      status: '200',
    }))
  });

});
router.post('/generatehashvalue2', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  const _pubKey = req.body.PublicKey; //用户公钥
  const id = req.body.Id; //旅客身份证号
  const shipcode = req.body.ShipCode;
  const departurecity = req.body.DepartureCity;
  const reachcity = req.body.ReachCity;
  const filghtid = req.body.FlightId;
  const departuretime = req.body.DepartureTime;
  const reachtime = req.body.ReachTime;
  const boardinggate = req.body.BoardingGate;
  const seatnumber = req.body.SeatNumber;
  const passengerInfo = id + ',' + shipcode + ',' + departurecity + ',' + reachcity + ',' + filghtid + ',' + departuretime + ',' + reachtime + ',' + boardinggate + ',' + seatnumber//用户信息
  console.log(passengerInfo);
  var time5 = Math.floor(Date.now())
  const publicKey = new NodeRSA(_pubKey);
  const hashvalue2 = publicKey.encrypt(passengerInfo, 'base64')
  var time6 = Math.floor(Date.now()) - time5
  console.log("机票信息加密耗时：" + time6);
  res.send(JSON.stringify({
    hashvalue2: hashvalue2,
    status: '200',
  }))
})

router.post('/decrypted', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  const _priKey = req.body.PrivateKey; //用户私钥
  const HashValue = req.body.HashValue2;
  var privateKey = new NodeRSA(_priKey);
  value = privateKey.decrypt(HashValue, 'utf8');
  console.log(value);
  res.send(JSON.stringify({
    value: value,
    status: '200',
  }))
})
module.exports = router;
