var curNav="nav_3";
$(document).ready(function() {	

	// 全市GDP及产业分布
	var Chart1 = function() {
		this.getOption = function() {
					return {
				
		  legend: {  /* 图例定义区域 */
          x : 'center',
          y : 'top',
          data:["参保人数", "缴费人数"]
        },
        color: ['#FFC928', '#81C500'],  /* 图例颜色设置 */
        grid: {
          left: '3%',
          right: '3%',
          bottom: '5%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
			data : [2011,2012,2013,2014,2015],
            axisLabel : {
              show : true,
              textStyle : {
                color : '#000000'
              }
            },
            axisTick : {
              show : false
            },
            splitLine : {
              show : true,
              lineStyle : {
                color : '#dadde5'
              }
            }
          }
        ],
        yAxis : [
          {
            name : '数量：万人',
            nameTextStyle : {
              color : '#000000'
            },
            type : 'value',
            axisLabel : {
              show : true,
              textStyle : {
                color : '#000000'
              }
            },
            axisTick : {
              show : false
            },
            splitLine : {
              show : false
            }
          }
        ],
        series : [
          {
            name:'参保人数',
            type:'bar',
			data:[415.6,449.9,461.7,509.5,521.2],
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            }
          },
          {
            name:'缴费人数',
            type:'bar',
			data:[405.6,419.9,431.7,489.5,501.2],
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            }
          }
        ]
			};
		}
		
		this.chart = echarts.init(document.getElementById("chart1"));
		this.chart.setOption(this.getOption());
	}

	
	

	
		// 全市GDP行业排行
	var Chart4 = function() {

		this.getOption = function(type) {
				return {
				
		  legend: {  /* 图例定义区域 */
          x : 'center',
          y : 'top',
          data:["收入", "支出"]
        },
         color: ['#2196F3', '#EA1E63'],  /* 图例颜色设置 */
        grid: {
          left: '3%',
          right: '3%',
          bottom: '5%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
			data : [2011,2012,2013,2014,2015],
            axisLabel : {
              show : true,
              textStyle : {
                color : '#000000'
              }
            },
            axisTick : {
              show : false
            },
            splitLine : {
              show : true,
              lineStyle : {
                color : '#dadde5'
              }
            }
          }
        ],
        yAxis : [
          {
            name : '数量：亿元',
            nameTextStyle : {
              color : '#000000'
            },
            type : 'value',
            axisLabel : {
              show : true,
              textStyle : {
                color : '#000000'
              }
            },
            axisTick : {
              show : false
            },
            splitLine : {
              show : false
            }
          }
        ],
        series : [
          {
            name:'收入',
            type:'bar',
			data:[17.7,22.3,26.2,28.6,26.5],
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            }
          },
          {
            name:'支出',
            type:'bar',
			data:[7.3,8.6,8.8,11.3,12.7],
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            }
          }
        ]
			};
			
		}

		this.chart = echarts.init(document.getElementById("chart4"));
		this.chart.setOption(this.getOption());
	};

	new Chart1();
	new Chart4();
});

