<template>
  <base-page index="1">
    <template slot="content">
      <div class="inputbox">
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
          <p>Output-1:</p>
          <el-input v-model="PassengerInfo.Output1"> </el-input>
        </div>
        <div class="input-suffix">
          <p>Output-2:</p>
          <el-input v-model="PassengerInfo.Output2"> </el-input>
        </div>
        <div class="hashvalue">
          <el-button
            class="btn"
            type="primary"
            round
            @click="GenerateHashProof()"
            >生成证明</el-button
          >
          <el-input type="textarea" autosize placeholder="" v-model="proof">
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
export default {
  name: "Proof",
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
        Output1: "94558398230828510463023417299970890224",
        Output2: "305890065125882483301744961357524233366",
      },
      proof: "",
    };
  },
  methods: {
    GenerateHashProof() {
      return request({
        url: URL.proof,
        method: "POST",
        data: {
          PublicKey: this.PassengerInfo.PublicKey,
          Id: this.PassengerInfo.Id,
          ShipCode: this.PassengerInfo.ShipCode,
          DepartureCity: this.PassengerInfo.DepartureCity,
          ReachCity: this.PassengerInfo.ReachCity,
          FlightId: this.PassengerInfo.FlightId,
          DepartureTime: this.PassengerInfo.DepartureTime,
          ReachTime: this.PassengerInfo.ReachTime,
          BoardingGate: this.PassengerInfo.BoardingGate,
          SeatNumber: this.PassengerInfo.SeatNumber,
          OutPut1: this.PassengerInfo.Output1,
          OutPut2: this.PassengerInfo.Output2,
        },
      }).then((res) => {
        const temp = res.data.output.match(/"(\S*)"/)[1];
        console.log(JSON.stringify(res.data.proof));
        if (temp == "1") {
          console.log(res.data.proof);
          this.proof = JSON.stringify(res.data.proof);
        } else {
          alert("请输入匹配的信息");
        }
      });
    },
  },
};
</script>
<style>
.container {
  height: 1000px;
}
.hash {
  line-height: 40px;
  background-color: white;
  border: 1px solid rgb(80, 77, 77);
  margin-left: 20px;
  border-radius: 5px;
  white-space: pre-line;
}
.hashvalue {
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