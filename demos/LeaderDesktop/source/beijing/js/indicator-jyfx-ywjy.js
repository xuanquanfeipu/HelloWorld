 var curNav="nav_2";
$(document).ready(function() {

	// 义务教育
	var Chart1 = function() {

		var yearList = [2011,2012,2013,2014,2015];

		var industry1DataList = [99.88,99.85,99.96,99.96,99.97];
		var industry2DataList = [100.65,96.4,99.48,100.59,101.15];
		var industry3DataList = [94.5,90.5,87.32,88.59,86.90];
		var industry1GrowthList = [83.37,79.22,75.95,85.48,86.42];

		var legenderList = ['适龄儿童入学率', '小学升学率', '初中升学率', '高中升学率'];

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
					data: legenderList,
					selected: unselectedLegenders
				},
				xAxis: [{
					type: 'category',
					axisLabel: {
						rotate: 0
					},
					splitLine: {
					  show: false
					},
					boundaryGap : true,
					data: years
				}],
				yAxis: [{
					type: 'value',
					name: '升学率(%)',
					axisLabel: {
						formatter: '{value}'
					},
					splitLine: {
					  show: false
					}
					
				}],
                //color:['#3a4aa9','#cb65bb','#fea412','#ffc928'],
				series: [{
					name: '适龄儿童入学率',
					type: 'bar',
					data: ind1List,
					//symbol: 'circle',
					//symbolSize : 0,
					tooltip: {
						formatter: "{b}(%)"
					},
					//itemStyle: {normal: {areaStyle: {type: 'default'},color: '#ffc928',lineStyle:{color:'#ffc928',width:0}}}
				}, {
					name: '小学升学率',
					type: 'bar',
					//symbol: 'circle',
					//symbolSize : 0,
					data: ind2List,
					tooltip: {
						formatter: "{b}(%)"
					},
					//itemStyle: {normal: {areaStyle: {type: 'default'},color: '#0fbd5c',lineStyle:{color:'#0fbd5c',width:0}}}
				}, {
					name: '初中升学率',
					type: 'bar',
					//symbol: 'circle',
					//symbolSize : 0,
					data: ind3List,
					tooltip: {
						formatter: "{b}(%)"
					},
					//itemStyle: {normal: {areaStyle: {type: 'default'},color: '#564fbe',lineStyle:{color:'#564fbe',width:0}}}
				}, {
					name: '高中升学率',
					type: 'bar',
					//symbol: 'circle',
					//symbolSize : 0,
					itemStyle: {normal: {areaStyle: {type: 'default'},color: '#21a0db',lineStyle:{color:'#21a0db',width:0}}},
					data: ind1GrwList
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
	
	var chart1 = new Chart1();

	$(window).resize(function() {
		chart1.chart.resize();
	});


	$("#c21-datatbl i.checked-btn, #c21-datatbl i.uncheck-btn").click(function() {		
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
});

