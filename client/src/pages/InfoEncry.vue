<template>
  <base-page index="0">
    <template slot="content">
      <div class="inputbox">
        <div class="input-suffix">
          <p>EID：</p>
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
        <div class="hashvalue">
          <el-button type="primary" round @click="GenerateHashValue1()"
            >生成机票散列值</el-button
          >
          <div class="hash hash1">{{ this.HashValue1 }}</div>
        </div>
        <div class="input-suffix">
          <p>旅客公钥：</p>
          <el-input v-model="PassengerInfo.PublicKey"> </el-input>
        </div>
        <div class="hashvalue">
          <el-button
            class="btn"
            type="primary"
            round
            @click="GenerateHashValue2()"
            >生成密文</el-button
          >
          <div class="hash hash2">{{ this.HashValue2 }}</div>
        </div>
        <div class="input-suffix">
          <p>旅客私钥：</p>
          <el-input v-model="PassengerInfo.PrivateKey" show-password> </el-input>
        </div>
        <div class="hashvalue">
          <el-button
            class="btn"
            type="primary"
            round
            @click="DecryptedHashValue2()"
            >获取机票信息</el-button
          >
          <div class="hash hash2">{{ this.Value }}</div>
        </div>
      </div>
    </template>
  </base-page>
</template>

<script>
import BasePage from "@/components/BasePage";
import request from "@/http/request.js";
import URL from "@/http/url.js";
export default {
  name: "InfoEncry",
  components: {
    "base-page": BasePage,
  },
  data() {
    return {
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
        PublicKey: "",
        PrivateKey:""
      },
      HashValue1: "",
      HashValue2: "",
      Value:""
    };
  },
  methods: {
    GenerateHashValue1() {
      return request({
        url: URL.login,
        method: "POST",
        data: {
          PublicKey: this.PassengerInfo.PublicKey,
          PassengerName: this.PassengerInfo.Name,
          Id: this.PassengerInfo.Id,
          ShipCode: this.PassengerInfo.ShipCode,
          DepartureCity: this.PassengerInfo.DepartureCity,
          ReachCity: this.PassengerInfo.ReachCity,
          FlightId: this.PassengerInfo.FlightId,
          DepartureTime: this.PassengerInfo.DepartureTime,
          ReachTime: this.PassengerInfo.ReachTime,
          BoardingGate: this.PassengerInfo.BoardingGate,
          SeatNumber: this.PassengerInfo.SeatNumber,
        },
      }).then((res) => {
        const output = res.data.data.output;
        const output1 = output.match(/"(\S*)"/)[1];
        const output2 = output.match(/"(\S*)"\n/)[1];
        this.HashValue1 = output1 + " , " + output2;
        console.log(this.HashValue1);
      });
    },
    GenerateHashValue2() {
      return request({
        url: URL.login + "/generatehashvalue2",
        method: "POST",
        data: {
          PublicKey: this.PassengerInfo.PublicKey,
          PassengerName: this.PassengerInfo.Name,
          Id: this.PassengerInfo.Id,
          ShipCode: this.PassengerInfo.ShipCode,
          DepartureCity: this.PassengerInfo.DepartureCity,
          ReachCity: this.PassengerInfo.ReachCity,
          FlightId: this.PassengerInfo.FlightId,
          DepartureTime: this.PassengerInfo.DepartureTime,
          ReachTime: this.PassengerInfo.ReachTime,
          BoardingGate: this.PassengerInfo.BoardingGate,
          SeatNumber: this.PassengerInfo.SeatNumber,
        },
      }).then((res) => {
        this.HashValue2 = res.data.hashvalue2;
        console.log(res);
      });
    },
    DecryptedHashValue2() {
      return request({
        url:URL.login + "/decrypted",
        method:"POST",
        data: {
          PrivateKey:this.PassengerInfo.PrivateKey,
          HashValue2:this.HashValue2
        }
      }).then(res => {
        this.Value = res.data.value
      })
    }
  },
};
</script>
<style>
.btn {
  height: 40px;
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