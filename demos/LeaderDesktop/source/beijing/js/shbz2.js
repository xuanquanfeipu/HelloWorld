var curNav="nav_3";
$(document).ready(function() {	

	// 全市GDP及产业分布
	var Chart1 = function() {
		this.getOption = function() {
					return {
				
		tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data:["参保人数", "缴费人数", "退休人数"]
        },
        grid: {
          top: 30,
          left: 35,
          right: 35,
          bottom: 20,
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : [2011,2012,2013,2014,2015],
            splitLine: {
              show: false
            }
          }
        ],
        yAxis : [
          {
			name: '数量：万人',
            type : 'value',
            splitLine: {
              show: false
            }
          }
        ],
        series : [
          {
            name:'参保人数',
            type:'bar',
            data:[988.2,1048.1,1091.7,1118.9,1160.7],
            itemStyle: {
              normal: {
                color: '#FFC928'
              }
            }
          },
          {
            name:'缴费人数',
            type:'bar',
          
			data:[710.3,747.6,762.2,769.8,791],
            itemStyle: {
              normal: {
                color: '#EA1E63'
              }
            }
          },
          {
            name:'退休人数',
            type:'bar',
            data:[277.9,300.5,329.5,349,369],
            itemStyle: {
              normal: {
                color: '#2196F3'
              }
            }
          }
        ]
			};
		}
		
		this.chart = echarts.init(document.getElementById("chart1"));
		this.chart.setOption(this.getOption());
	}

	// 全市GDP发展情况
	var Chart2 = function() {
		this.getOption = function(type) {

		return {
        // tooltip: {
        //   trigger: 'axis',
        //    axisPointer: {
        //    type: 'shadow'
        //    }
        // },
        legend: {
          data: ['收入', '支出'],
          right: 0
        },
        grid: {
          top: 30,
          left: -115,
          right: 60,
          bottom: -20,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          show: false
        },
        yAxis: {
          type: 'category',
          data: ['城镇企业职工基本养老保险','机关事业单位养老保险','城乡居民社会养老保险'],
          show: false
        },
        series: [
          {
            name: '收入',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#574FBE'
              }
            },
            data: [33.4,112,779],
            barGap: 0.1,
            barWidth: 16
          },
          {
            name: '支出',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#FFA311'
              }
            },
            data: [95.9,132.2,717.2],
            barGap: 0.1,
            barWidth: 16
          }
        ]
      };
}
		this.chart = echarts.init(document.getElementById("chart2"));
		this.chart.setOption(this.getOption('year'));

		var ins = this;

		
	};
	

	
		// 全市GDP行业排行
	var Chart4 = function() {

		this.getOption = function(type) {
			return {
				
		tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {left: 'right',
          data:["参保人数", "在职职工数", "离退休人数"]
        },
        grid: {
          top: 30,
          left: 35,
          right: 35,
          bottom: 20,
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : [2011,2012,2013,2014,2015],
            splitLine: {
              show: false
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
			name: '数量：万人',
            splitLine: {
              show: false
            }
          }
        ],
        series : [
          {
            name:'参保人数',
            type:'bar',
            data:[210.6,213.1,215.4,218,220.6],
            itemStyle: {
              normal: {
                color: '#FFC928'
              }
            }
          },
          {
            name:'在职职工数',
            type:'bar',
            data:[156.1,156.4,156.5,156.5,156.6],
            itemStyle: {
              normal: {
                color: '#0FBD5C'
              }
            }
          },
          {
            name:'离退休人数',
            type:'bar',
            data:[54.4,56.7,58.9,61.5,64.1],
            itemStyle: {
              normal: {
                color: '#574FBE'
              }
            }
          }
        ]
			};
			
		}

		this.chart = echarts.init(document.getElementById("chart4"));
		this.chart.setOption(this.getOption());
	};
	var Chart5 = function() {

		this.getOption = function(type) {
			return {
				
		tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        
        grid: {
          top: 30,
          left: 35,
          right: 35,
          bottom: 20,
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : [2011,2012,2013,2014,2015],
            splitLine: {
              show: false
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
			name: '数量：万人',
            splitLine: {
              show: false
            }
          }
        ],
        series : [
          {
             name:'参保人数',
            type:'bar',
            data:[2137.2,3120.3,3316,3298.3,3280.1],
            itemStyle: {
              normal: {
                color: '#FFC928'
              }
            }
          }
        ]
			};
			
		}

		this.chart = echarts.init(document.getElementById("chart5"));
		this.chart.setOption(this.getOption());
	};
	new Chart1();
	new Chart2();

	new Chart4();
		new Chart5();
});

