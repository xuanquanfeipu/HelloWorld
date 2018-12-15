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
          data:["养老保险", "医疗保险", "工伤保险", "生育保险", "失业保险"],
          selected: {
            "生育保险": false,
            "失业保险": false
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
			name: '数量：万人',
            type : 'value',
            splitLine: {
              show: false
            }
          }
        ],
        series : [
          {
            name:'养老保险',
            type:'bar',
            data:[3125.4,4168,4407,4417.2,4440],
            itemStyle: {
              normal: {
                color: '#FFC928'
              }
            }
          },
          {
            name:'医疗保险',
            type:'bar',
            data:[1941.2,2341.9,2316.2,2300.7,2662.4],
            itemStyle: {
              normal: {
                color: '#EA1E63'
              }
            }
          },
          {
            name:'工伤保险',
            type:'bar',
            data:[635.5,693.8,731.2,748,778],
            itemStyle: {
              normal: {
                color: '#2196F3'
              }
            }
          },
          {
            name:'生育保险',
            type:'bar',
            data:[538.8,546,536,537.6,544],
            itemStyle: {
              normal: {
                color: '#574FBE'
              }
            }
          },
          {
            name:'失业保险',
            type:'bar',
            data:[429.7,449.9,461.7,509.5,521],
            itemStyle: {
              normal: {
                color: '#0FBD5C'
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
	    legend: {
          data:['收入总额'],
          show: false
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: 30,
          left: -15,
          right: 15,
          bottom: -10,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data:[2011,2012,2013,2014,2015],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#FFFFFF'
            }
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 1500,
          name: '　　亿元',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#FFFFFF'
            }
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name:'收入总额',
            type:'line',
            data:[432.5,992.5,1132.5,1282.5,1432.5],
            itemStyle: {
              normal: {
                color: '#FFFFFF'
              }
            },
            symbolSize: 8
          }
        ]
		}
}
		this.chart = echarts.init(document.getElementById("chart2"));
		this.chart.setOption(this.getOption('year'));

		var ins = this;


	};

	// 全市GDP市州排行
	var Chart3 = function() {
		this.getOption = function(type) {
			return {
				legend: {
				  data:['增长率'],
				  show: false
				},
				tooltip: {
				  trigger: 'axis'
				},
				grid: {
				  top: 30,
				  left: -15,
				  right: 15,
				  bottom: -10,
				  containLabel: true
				},
				xAxis: {
				  type: 'category',
				  boundaryGap: false,
				  data:[2011,2012,2013,2014,2015],
				  splitLine: {
					show: false
				  },
				  axisLine: {
					lineStyle: {
					  color: '#FFFFFF'
					}
				  },
				  axisLabel: {
					show: false
				  },
				  axisTick: {
					show: false
				  }
				},
				yAxis: {
				  type: 'value',
				  min: 0,
				  max: 1500,
				  name: '　亿元',
				  splitLine: {
					show: false
				  },
				  axisLine: {
					lineStyle: {
					  color: '#FFFFFF'
					}
				  },
				  axisLabel: {
					show: false
				  },
				  axisTick: {
					show: false
				  }
				},
				series: [
				  {
					name:'增长率',
					type:'line',
					data:[206.2,896.2,1106.2,1206.2,1306.2],
					itemStyle: {
					  normal: {
						color: '#FFFFFF'
					  }
					},
					symbolSize: 8
				  }
				]
				}

		}

		this.chart = echarts.init(document.getElementById("chart3"));
		this.chart.setOption(this.getOption('year'));
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
          data:["养老保险", "医疗保险", "工伤保险", "生育保险", "失业保险"],
          selected: {
            "生育保险": false,
            "失业保险": false
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
			name: '亿元',
            splitLine: {
              show: false
            }
          }
        ],
        series : [
          {
            name:'养老保险',
            type:'bar',
            data:[541.6,607.8,733.7,811,910],
            itemStyle: {
              normal: {
                color: '#FFC928'
              }
            }
          },
          {
            name:'医疗保险',
            type:'bar',
            data:[146.1,184,188.4,191.7,228.6],
            itemStyle: {
              normal: {
                color: '#EA1E63'
              }
            }
          },
          {
            name:'工伤保险',
            type:'bar',
            data:[21.3,30.1,29.2,29.7,31.5],
            itemStyle: {
              normal: {
                color: '#2196F3'
              }
            }
          },
          {
            name:'生育保险',
            type:'bar',
            data:[5.6,7.3,8.6,10.2,11.8],
            itemStyle: {
              normal: {
                color: '#574FBE'
              }
            }
          },
          {
            name:'失业保险',
            type:'bar',
            data:[17.7,22.3,26.2,28.6,26.5],
            itemStyle: {
              normal: {
                color: '#0FBD5C'
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
        legend: {left: 'right',
          data:["养老保险", "医疗保险", "工伤保险", "生育保险", "失业保险"],
          selected: {
            "生育保险": false,
            "失业保险": false
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
			name: '亿元',
            splitLine: {
              show: false
            }
          }
        ],
        series : [
          {
            name:'养老保险',
            type:'bar',
            data:[416.6,502.8,622.1,730,849],
            itemStyle: {
              normal: {
                color: '#FFC928'
              }
            }
          },
          {
            name:'医疗保险',
            type:'bar',
            data:[127.7,158.8,189.2,220.9,259.5],
            itemStyle: {
              normal: {
                color: '#EA1E63'
              }
            }
          },
          {
            name:'工伤保险',
            type:'bar',
            data:[12.9,23.6,26.4,32.4,38],
            itemStyle: {
              normal: {
                color: '#2196F3'
              }
            }
          },
          {
            name:'生育保险',
            type:'bar',
            data:[3.4,4.2,5.6,6.4,8.7],
            itemStyle: {
              normal: {
                color: '#574FBE'
              }
            }
          },
          {
            name:'失业保险',
            type:'bar',
            data:[7.3,8.6,8.8,11.3,12.7],
            itemStyle: {
              normal: {
                color: '#0FBD5C'
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
	new Chart3();
	new Chart4();
		new Chart5();
});

