<template>
  <base-page index="2">
    <template slot="content">
      <div class="inputbox">
        <div class="input-suffix">
          <el-button class="btn" type="primary" round @click="VerifyProof()"
            >验证证明</el-button
          >
          <el-input type="textarea" placeholder="请输入证明" v-model="proof">
          </el-input>
        </div>
        <div class="input-suffix">
          <div>待加密的机票信息</div>
        </div>
        <div class="input-suffix">
          <p>EID:</p>
          <el-input v-model="PassengerInfo.Id"> </el-input>
        </div>
        <div class="input-suffix">
          <p>舱位代码：</p>
          <el-input v-model="PassengerInfo.ShipCode"> </el-input>
        </div>
        <div class="input-suffix">
          <p>出发城市：</p>
          <el-input v-model="PassengerInfo.DepartureCity"> </el-input>
        </div>
        <div class="input-suffix">
          <p>降落城市：</p>
          <el-input v-model="PassengerInfo.ReachCity"> </el-input>
        </div>
        <div class="input-suffix">
          <p>航班号：</p>
          <el-input v-model="PassengerInfo.FlightId"> </el-input>
        </div>
        <div class="input-suffix">
          <p>起飞时间：</p>
          <el-input v-model="PassengerInfo.DepartureTime"> </el-input>
        </div>
        <div class="input-suffix">
          <p>降落时间：</p>
          <el-input v-model="PassengerInfo.ReachTime"> </el-input>
        </div>
        <div class="input-suffix">
          <p>登机口：</p>
          <el-input v-model="PassengerInfo.BoardingGate"> </el-input>
        </div>
        <div class="input-suffix">
          <p>座位号：</p>
          <el-input v-model="PassengerInfo.SeatNumber"> </el-input>
        </div>
        <div class="input-suffix">
          <p>机场公钥：</p>
          <el-input
            type="textarea"
            placeholder="请输入机场公钥"
            v-model="PublicKey"
          >
          </el-input>
        </div>
        <div class="hashvalue">
          <el-button class="btn" type="primary" round @click="EncryptInfo()"
            >加密机票信息</el-button
          >
          <el-input
            type="textarea"
            placeholder="加密后的机票信息"
            v-model="encryptinfo"
          >
          </el-input>
        </div>
        <div class="input-suffix">
          <p>机场私钥：</p>
          <el-input placeholder="请输入机场私钥" v-model="PrivateKey" show-password> </el-input>
        </div>
        <div class="hashvalue">
          <el-button class="btn" type="primary" round @click="DecryptInfo()"
            >解密机票信息</el-button
          >
          <el-input
            type="textarea"
            placeholder="解密后的机票信息"
            v-model="info"
          >
          </el-input>
        </div>
      </div>
    </template>
  </base-page>
</template>

<script>
import BasePage from "@/components/BasePage";
import request from "@/http/request.js";
import URL from "@/http/url.js";
import JSEncrypt from "jsencrypt";
export default {
  name: "VerifyProof",
  components: {
    "base-page": BasePage,
  },
  data() {
    return {
      proof: "",
      PassengerInfo: {
        Id: "0X1234",
        ShipCode: "F",
        DepartureCity: "北京",
        ReachCity: "上海",
        FlightId: "MU3757",
        DepartureTime: "7:30",
        ReachTime: "9:20",
        BoardingGate: "A4",
        SeatNumber: "E5",
      },
      PublicKey: "",
      PrivateKey: "",
      encryptinfo: "",
      info: "",
    };
  },
  methods: {
    VerifyProof() {
      return request({
        url: URL.proof + "/verifyProof",
        method: "POST",
        data: {
          proof: this.proof,
        },
      }).then((res) => {
        alert(res.data.msg)
      });
    },
    EncryptInfo() {
      const PassengerInfo =
        this.PassengerInfo.Id +
        this.PassengerInfo.ShipCode +
        this.PassengerInfo.DepartureCity +
        this.PassengerInfo.ReachCity +
        this.PassengerInfo.FlightId +
        this.PassengerInfo.DepartureTime +
        this.PassengerInfo.ReachTime +
        this.PassengerInfo.BoardingGate +
        this.PassengerInfo.SeatNumber;
      const pubKey = this.PublicKey;
      const encryptor = new JSEncrypt();
      encryptor.setPublicKey(pubKey);
      const EncryptPassengerInfo = encryptor.encrypt(PassengerInfo, "base64");
      console.log(EncryptPassengerInfo);
      this.encryptinfo = EncryptPassengerInfo;
      return request({
        url: URL.proof + "/verifyTicToken",
        method: "POST",
        data: {
          EncryptPassengerInfo: EncryptPassengerInfo,
        },
      }).then((res) => {
        console.log(res);
      });
    },
    DecryptInfo() {
      const decrypt = new JSEncrypt();
      const priKey = this.PrivateKey;
      decrypt.setPrivateKey(priKey);
      return request({
        url: URL.proof + "/verifyBoardToken",
      }).then((res) => {
        this.info = decrypt.decrypt(res.data.info);
      });
    },
  },
};
</script>
<style>
.btn {
  height: 35px;
  margin-right: 20px;
}
.el-textarea {
  margin-left: 20px;
}
.hash2 {
  height: 120px;
}
.hash {
  width: 1200px;
  line-height: 40px;
  background-color: white;
  border: 1px solid rgb(80, 77, 77);
  margin-left: 20px;
  border-radius: 5px;
  white-space: pre-line;
  word-break: break-all;
  word-wrap: break-word;
}
.hashvalue {
  width: 100%;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.inputbox {
  width: 1200px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
}
.input-suffix {
  margin-top: 15px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
}
.input-suffix p {
  width: 120px;
  height: 40px;
  line-height: 40px;
}
</style>