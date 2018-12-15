var curNav="nav_0";
$(document).ready(function() {
   var dataList1 = [{value:3343.52, name:'农、林、牧、渔'},
				    {value:1879.26, name:'批发和零售'},
					{value:12724.69, name:'工业'},
					{value:1132.4, name:'交通运输、仓储和\n邮政'},
					{value:900.25, name:'房地产\n'},
					{value:150.54, name:'水利、环境和公共设施\n管理'},
					{value:433.91, name:'教育'},
					{value:877.75, name:'公共管理、社会\n保障和社会组织'},					
					{value:8109.19, name:'其他\n'}];
					
   var dataList2 = [{value:3070.34, name:'农、林、牧、渔'},
				    {value:1752.71, name:'批发和零售'},
					{value:12460.13, name:'工业'},
					{value:1108.96, name:'交通运输、仓储和\n邮政'},
					{value:824.32, name:'房地产\n'},
					{value:129.33, name:'水利、环境和公共设施\n管理'},
					{value:794.96, name:'教育'},
					{value:1480.46, name:'公共管理、社会\n保障和社会组织'},
					{value:6463.12, name:'其他\n'}];
 var unselectedLegenders = {};
	// 行业GDP占比
	var Chart1 = function() {
		

	    var chanshulist={'水利、环境和公共设施\n管理':false,'教育':false,'公共管理、社会\n保障和社会组织':false,'其他\n':false};
		this.getOption = function(years, unselectedLegenders) {

		
		     /*var timeList = null;
		     
			 if($('#check2014').is(':checked')) 
			 {timeList = dataList2;
             }else{
				timeList = dataList1; 
			 }*/
			 if (!years) {
				years = dataList1;
			}
			if (!unselectedLegenders) {
				unselectedLegenders = {};
			}	
			
			return {
				
				    tooltip : {
								trigger: 'item',
								formatter: "{a} <br/>{b} : {c} ({d}%)"
							},
					color:['#ffdb4b','#6c6fef','#e64053','#47c668','#4e99ff','#ff9743','#9bd134','#35c3d8','#ff50bb'],
					legend: {
						    orient: 'vertical',
							left: 'right',
						    data : ['农、林、牧、渔', '批发和零售', '工业', '交通运输、仓储和\n邮政', '房地产\n', '水利、环境和公共设施\n管理', '教育','公共管理、社会\n保障和社会组织','其他\n'],
					        selected: unselectedLegenders,
					},
					series : [
						{
							name: '行业分析',
							type: 'pie',
							radius : '55%',
							center: ['40%', '50%'],
							data:years,
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							},
							itemStyle: {
								normal: {
									label:{ 
										show: true, 
			//	                            position:'inside',
										formatter: '{b} : {c} ({d}%)' 
									}
								},
								labelLine :{show:true}
							}
						}
					]
			};
		};

		
		this.updateChart = function() {
			var years = [];
			
			
			//years=dataList1;
			var yyear=$("input[name=payMethod]:checked").val();
			 if(yyear=="2014")
				 {
					 years = dataList2;
				 }else{
					 years = dataList1; 
				 }
			
			
			//years = years.reverse();

			//var unselectedLegenders = {};
			$("#c21-datatbl tbody i.uncheck-btn").each(function() {
				var legenderName = $(this).attr("legender");
				
				unselectedLegenders[legenderName] = false;
			});
			unselectedLegenders['水利、环境和公共设施\n管理'] = false;
			unselectedLegenders['教育'] = false;
			unselectedLegenders['公共管理、社会\n保障和社会组织'] = false;
			unselectedLegenders['其他\n'] = false;
			var options = this.getOption(years, unselectedLegenders);
			this.chart.clear();console.log(options);
			this.chart.setOption(options);
		}

		this.chart = echarts.init(document.getElementById("chart1"));
		this.updateChart();
		
	
		//this.chart = echarts.init(document.getElementById("chart1"));
		
			 
		//this.chart.setOption(this.getOption());
	};
	
			 $(":radio").click(function(){
							
							var year=$(this).val();
							 var yyear=$("input[name=payMethod]:checked").val();//alert(yyear);
							 if(year=="2014")
								 {
									 years = dataList2;
								 }else{
									 years = dataList1; 
								 }
								chart1.updateChart();
							// $("#chart1").updateChart();
						 });
		
	$("#c21-datatbl i.checked-btn, #c21-datatbl i.uncheck-btn").click(function() {	
		var self = $(this);		
		if (self.hasClass("checked-btn")) {
			self.removeClass("checked-btn").addClass("uncheck-btn");
			var legenderName = $(this).attr("legender");
				unselectedLegenders['批发和零售'] = false;
		} else {
			self.removeClass("uncheck-btn").addClass("checked-btn");
			var legenderName = $(this).attr("legender");
			unselectedLegenders['批发和零售'] = true;
		}

		if (self.attr("id") == 'cbxall') {
			if (self.hasClass("checked-btn")) {
				$("#c21-datatbl i.uncheck-btn").removeClass("uncheck-btn").addClass("checked-btn");				
			} else {
				return;
			}
		} 
		
		chart1.updateChart();
	});
			 
		// 单行业GDP发展情况
	var Chart2 = function() {

		this.getOption = function(type) {

			return {
				
				tooltip: {
					trigger: 'axis',
					formatter: '{b0}<br/>GDP总量：{c0}亿元<br/>GDP增长率：{c1}%'
				},
				legend: {
					data: ['总量', '增长率'],
					// textStyle: {
					//				color: '#8c94b3'
					//			}
				},
			    grid: {
			        left: 40,
			        right: 40,
			        bottom: 70
			    },
				xAxis: [{
					type: 'category',
					axisLabel: {
						rotate: 0,
						//textStyle : { color : '#8c94b3' }
					},
					splitLine: {
		            	show: false
		            },
		            axisTick: {
				        show: false
				    },
					 data : ['2011', '2012', '2013', '2014', '2015']
				}],
				yAxis: [{
					type: 'value',
					name: '数量：亿元',
					axisLabel: {
						formatter: '{value}',
						//textStyle : { color : '#8c94b3' }
					},
					splitLine: {
		            	show: false
		            },
		            axisTick: {
				        show: false
				    }
				}, {
					type: 'value',
					name: '增长率(%)',
					axisLabel: {
						formatter: '{value} %',
						//textStyle : { color : '#8c94b3' }
					},
					splitLine: {
		            	show: false
		            },
		            axisTick: {
				        show: false
				    }
				}],
				series: [{
					name: '总量',
					type: 'bar',
					 data:[2087.5,2504.1,2743.6,3070.34,3342.52],
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#ffb644'
						}
					}
				}, {
					name: '增长率',
					type: 'line',
					yAxisIndex: 1,
					 data:[16.8, 19.5, 9.5, 11.9, 8.8],
					itemStyle: {
						normal: {
							color: '#5154da'
						}
					}
				}]
    
    
			};
		};

		this.chart = echarts.init(document.getElementById("chart2"));
		this.chart.setOption(this.getOption());
	};
	
	var chart1 = new Chart1();
	var chart2 = new Chart2();

	$(window).resize(function() {
		chart1.chart.resize();
	});
	
	
});

