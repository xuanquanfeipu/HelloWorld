var curNav = "nav_5";
$(document).ready(function() {

	// 全市GDP及产业分布
	var Chart1 = function() {
		var yearList = [2011,2012,2013,2014,2015];
		var industry1DataList = [106520,114060,119150,140890,108070];
		var industry2DataList = [11200,11110,12080,12880,14580];
		var industry3DataList = [59200,60120,61120,64120,43760];
		var industry4DataList = [26000,31540,32660,46600,38760];
		var industry5DataList = [10120,11290,13290,17290,10970];
		var legenderList = ['总费用', '药品', '检查治疗','材料','其他'];
		this.getOption = function(years, unselectedLegenders) {
			if (!years) {
				years = yearList;
			}
			var ind1List = [];
			var ind2List = [];
			var ind3List = [];
			var ind4List = [];
			var ind5List = [];
			var ind1GrwList = [];
			var ind2GrwList = [];
			var ind3GrwList = [];			
			for (var i=0; i<years.length; i++) {
				var year = parseInt(years[i]);
				for (var j=0; j<yearList.length; j++) {
					if (yearList[j] == year) {
						ind1List.push(industry1DataList[j]);
						ind2List.push(industry2DataList[j]);
						ind3List.push(industry3DataList[j]);
						ind4List.push(industry4DataList[j]);
						ind5List.push(industry5DataList[j]);
					}
				}
			}
			if (!unselectedLegenders) {
				unselectedLegenders = {};
			}
			return {
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: legenderList,
					selected: unselectedLegenders
				},
				xAxis: [{
					type: 'category',
					axisLabel: {
						rotate: 0
					},
					data: years
				}],
				yAxis: [{
					type: 'value',
					name: '数量(万元)',
					axisLabel: {
						formatter: '{value}'
					}
				}],
				series: [{
					name: '总费用',
					type: 'bar',
					data: ind1List,
					tooltip: {
						formatter: "{b}(万元)"
					},
					itemStyle: {
						normal: {
							color: '#564fbe'
						}
					}
				}, {
					name: '药品',
					type: 'bar',
					data: ind2List,
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#ea1e63'
						}
					}
				}, {
					name: '检查治疗',
					type: 'bar',
					data: ind3List,
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#3bd8ab'
						}
					}
				}, {
					name: '材料',
					type: 'bar',
					data: ind4List,
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#2196f3'
						}
					}
				}, {
					name: '其他',
					type: 'bar',
					data: ind5List,
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#ff9801'
						}
					}
				}]
			};
		};

		this.updateChart = function() {
			var years = [];
			$("#c21-datatbl thead i.checked-btn").each(function() {
				years.push($(this).attr("year"));
			});
			years = years.reverse();

			var unselectedLegenders = {};
			$("#c21-datatbl tbody i.uncheck-btn").each(function() {
				var legenderName = $(this).attr("legender");
				unselectedLegenders[legenderName] = false;
			});
			var options = this.getOption(years, unselectedLegenders);
			this.chart.clear();
			this.chart.setOption(options);
		}

		this.chart = echarts.init(document.getElementById("chart1"));
		this.updateChart();
	};
	var chartData2 = [];
	var Chart2 = function() {
		this.getOption = function(type) {
		   var txt = $("#selectID").find("option:selected").text();
		   if(txt=='2012'){
              chartData2 = [ {value:11110, name:'药品'},{value:60120, name:'检查治疗'},{value:31540, name:'材料'},{value:11290, name:'其他'},];
		   } else if(txt=='2013'){
              chartData2 = [ {value:12080, name:'药品'},{value:61120, name:'检查治疗'},{value:32660, name:'材料'},{value:13290, name:'其他'},];
		   } else if(txt=='2014'){
              chartData2 = [ {value:12880, name:'药品'},{value:64120, name:'检查治疗'},{value:34660, name:'材料'},{value:17290, name:'其他'},];
		   } else if(txt=='2015'){
              chartData2 = [ {value:14580, name:'药品'},{value:43760, name:'检查治疗'},{value:38760, name:'材料'},{value:10970, name:'其他'},];
		   } else {
              chartData2 = [ {value:11200, name:'药品'},{value:59200, name:'检查治疗'},{value:26000, name:'材料'},{value:10120, name:'其他'},];
		   }
			return{
			        color: ['#ffc928','#4e99ff','#0c6bd9','#574fbe'],
		            tooltip : {
		              trigger: 'item',
		              formatter: "{a} <br/>{b} : {c} ({d}%)"
		            },
		            legend: {
		              orient: 'horizontal',
		              x: 'center',
		              y: '5',
		              data:['药品','检查治疗','材料','其他']
		            },
		            grid: {
		              left: '3%',
		              right: '5%',
		              top: '1%',
		              containLabel: true
		            },
		            series : [
		              {
		              	name:'支付金额占比（万元）',
		                type: 'pie',
		                radius : '50%',
		                center: ['50%', '45%'],
		                data:chartData2
		              }
		            ]
			};
			
		}

		this.chart = echarts.init(document.getElementById("chart2"));
		this.chart.setOption(this.getOption('year'));
	};
	
	var chart1 = new Chart1();
	var chart2 = new Chart2();

	$(window).resize(function() {
		chart1.chart.resize();
		chart2.chart.resize();
	});


	$("#c21-datatbl i.checked-btn, #c21-datatbl i.uncheck-btn").click(function(){		
		var self = $(this);		
		if (self.hasClass("checked-btn")) {
			self.removeClass("checked-btn").addClass("uncheck-btn");
		} else {
			self.removeClass("uncheck-btn").addClass("checked-btn");
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

	$("#selectID").change(function(){
		chart2 = new Chart2();
	}); 
});

