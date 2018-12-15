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
			data:[635.5,693.3,731.2,747.8,778],
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
			data:[615.5,623.3,701.2,717.8,738],
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
			data:[21.3,30.1,29.2,29.7,31.5],
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
			data:[12.9,23.6,26.4,32.4,38],
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

