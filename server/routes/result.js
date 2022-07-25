option = {
    color:['black','black'],
    xAxis: {
      type: 'category',
      data: [1,2,3,4,5,6,7,8,9,10 ],
      name:'数据量/十万',
    },
    legend: {
      show: true,
      data:['非对称加密','Merkle加密']
    },
    yAxis: {
      type: 'value',
      name:'时间/毫秒',
      axisLine: {
        show: true
      }
    },
    series: [
      {
        data: [3563, 7323, 11304, 15325, 19228, 21241,25044,28438,32624,37805],
        type: 'line',
        smooth: true,
        symbol: "circle",
         symbolSize: 6,
         name:'非对称加密'
      },
      {
        data: [10047,19925,31750,41589,48090,58310,68532,77134,87541,97082],
        type: 'line',
        smooth: true,
        symbol: "roundRect",
        symbolSize: 6,
        name:'Merkle加密'
      }
    ]
  };