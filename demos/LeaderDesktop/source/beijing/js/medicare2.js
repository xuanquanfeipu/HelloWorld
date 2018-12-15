var curNav = "nav_5";
$(document).ready(function() {

	// 全市GDP及产业分布
	var Chart1 = function() {
		var yearList = [2010,2011,2012,2013,2014,2015];
		var industry1DataList = [61600,63150,71290,75600,82220,86020];
		var industry2DataList = [24260,25260,28510.6,30240,32880.8,34400.8];
		var industry3DataList = [36960,37890,42770.4,45360,49330.4,51610.2];
		var industry1GrowthList = [14.37,15.22,7.95,6.48,6.42,8.89];
		var legenderList = ['次均费用', '自费费用', '医保费用'];
		this.getOption = function(years, unselectedLegenders) {
			if (!years) {
				years = yearList;
			}
			var ind1List = [];
			var ind2List = [];
			var ind3List = [];
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
						ind1GrwList.push(industry1GrowthList[j]);
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
					data: ['次均费用', '自费费用', '医保费用'],
					selected: unselectedLegenders
				},
				  grid: {
		              left: '3%',
		              right: '5%',
		             
		              containLabel: true
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
					name: '次均费用',
					type: 'bar',
					data: ind1List,
					tooltip: {
						formatter: "{b}(万元)"
					},
					itemStyle: {
						normal: {
							color: '#fb5e6e'
						}
					}
				}, {
					name: '自费费用',
					type: 'bar',
					data: ind2List,
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#0c6bd8'
						}
					}
				}, {
					name: '医保费用',
					type: 'bar',
					data: ind3List,
					tooltip: {
						formatter: "{b}(亿元)"
					},
					itemStyle: {
						normal: {
							color: '#5650bd'
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
			var sj = 0;
		   if(txt=='2012'){
		   	   sj = 0.4;
		   } else if(txt=='2013'){
               sj = 0.4;
		   } else if(txt=='2014'){
               sj = 0.5;
		   } else if(txt=='2015'){
               sj = 0.6;
		   } else {
               sj = 0.4;
           }
           chartData2 = [ {value:sj, name:'医保占比'},{value:(1-sj), name:'自费占比'}];
			return{
			       color: ['#fb5e6e','#02BFF6'],
		            tooltip : {
		              trigger: 'item',
		              formatter: "{a} <br/>{b} : {c} ({d}%)"
		            },
		            legend: {
		              orient: 'horizontal',
		              x: 'center',
		              y: '5',
		              data:['医保占比','自费占比']
		            },
		            grid: {
		              left: '3%',
		              right: '5%',
		              top: '1%',
		              containLabel: true
		            },
		            series : [
		              {
		                name: '医保占比',
		                type: 'pie',
		                radius : '50%',
		                center: ['50%', '45%'],
		                data:chartData2,
		                itemStyle : {
		                  emphasis : {
		                    label : {
		                      show : true,
		                      position : 'center',
		                      textStyle : {
		                        fontSize : '12',
		                      }
		                    }
		                  }
		                },
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

