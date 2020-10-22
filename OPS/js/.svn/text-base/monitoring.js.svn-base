$(function() {
	setTimeout(function() {
		$('#loader').hide();
		$(".scanboardWp").css("opacity", "1")
	}, 500);
	//数字翻滚
	var showOne = true;

	function show_num(aa, ele) {
		let n = aa;
		//alert(n);
		let sw_mm = String(n).length;
		if(sw_mm < 8) {
			for(let i = 0; i < 8 - sw_mm; i++) {
				n = '0' + n
			}
		}

		let sss = ele;
		let it = $("#" + sss + " i");
		let len = n.toString().length;
		if(it.length > len) {
			for(let j = len; j < it.length; j++) {
				it.eq(j).remove();
			}
		}
		for(let i = 0; i < len; i++) {
			let num = String(n).charAt(i);
			let y; //y轴位置 0  1   -38  2	
			y = num == 0 ? -622 : -parseInt(num - 1) * 69;
			$("#" + sss + " .span_li_0" + i).animate({
				backgroundPosition: '0px ' + String(y) + 'px'
			}, 'slow', 'swing', function() {});
		};
	}

	function totalNum(obj, speed) {
		var singalNum = 0;
		var timer;
		var totalNum = obj.attr('total');

		if(totalNum) {
			timer = setInterval(function() {
				singalNum += speed;
				if(singalNum >= totalNum) {
					singalNum = totalNum;
					clearInterval(timer);
				}
				obj.html(singalNum);
			}, 1);
		}
	}

	function getUrl(num) {
		let obj;
		$.ajax({
			url: "/icos/monitor/query",
			type: 'post',
			//dataType : 'json',
			//contentType: 'json',
			async: false,
			data: {
				code: num
			},
			headers: {
				"Authorization": localStorage.getItem('id'),
			},
			complete: function(xhr) {
				// 获取相关Http Response header
				if(xhr.getResponseHeader('Authorization') != null) {
					localStorage.setItem('id', xhr.getResponseHeader('Authorization'));
				}
			},
			success: function(res) {
				//console.log(res.data)         
				if(res.statusCode == '401') {
					window.open("./index.html", "_self");
				} else {
					obj = res.data;
				}
			},
			error: function(err) {
				console.log(err);
				//window.open("./index.html", "_self");
			}
		});
		return obj
	}
	var myChart4 = echarts.init(document.getElementById('myChart4'));
	var myChart3 = echarts.init(document.getElementById('myChart3'));
	var myChart2 = echarts.init(document.getElementById('myChart2'));
	//今日提交量
	function getNum() {
		let objNum = getUrl(10);
		let sw_cc = 1;
		show_num(Math.ceil(objNum.submitNum * sw_cc), 'sw-num1');
		//show_num_two(121111, 21211121, 'sw-num4');
	}
	//总体态势
	function daySendNum() {
		let allData = getUrl(11);
		//console.log(allData)
		var interText = doT.template($("#echarts_tep").text());
		$("#echarts_value").html(interText(allData));
		for(let i = 0; i < allData.length; i++) {
			let ele = $(".sw_col" + i)
			totalNum(ele, 2000);
		};
		let locations = [
			[140.8, 54],
			[140.8, 47],
			[140.8, 40],
			[140.8, 33],
			[140.8, 26],
			[140.8, 19]
		]
		var geoCoordMap = {
			"北京": [116.3979471, 39.9081726],
			"上海": [121.4692688, 31.2381763],
			"天津": [117.2523808, 39.1038561],
			"重庆": [106.548425, 29.5549144],
			"河北": [114.4897766, 38.0451279],
			"山西": [112.5223053, 37.8357424],
			"辽宁": [123.4116821, 41.7966156],
			"吉林": [125.3154297, 43.8925629],
			"黑龙江": [126.6433411, 45.7414932],
			"浙江": [120.1592484, 30.265995],
			"福建": [119.2978134, 26.0785904],
			"山东": [117.0056, 36.6670723],
			"河南": [113.6500473, 34.7570343],
			"湖北": [114.2919388, 30.5675144],
			"湖南": [112.9812698, 28.2008247],
			"广东": [113.2614288, 23.1189117],
			"海南": [110.3465118, 20.0317936],
			"四川": [104.0817566, 30.6610565],
			"贵州": [106.7113724, 26.5768738],
			"云南": [102.704567, 25.0438442],
			"江西": [115.8999176, 28.6759911],
			"陕西": [108.949028, 34.2616844],
			"青海": [101.7874527, 36.6094475],
			"甘肃": [103.7500534, 36.0680389],
			"广西": [108.3117676, 22.8065434],
			"新疆": [87.6061172, 43.7909393],
			"内蒙古": [111.6632996, 40.8209419],
			"西藏": [91.1320496, 29.657589],
			"宁夏": [106.2719421, 38.4680099],
			"台湾": [120.9581316, 23.8516062],
			"香港特别行政区": [114.139452, 22.391577],
			"澳门": [113.5678411, 22.167654],
			"安徽": [117.2757034, 31.8632545],
			"江苏": [118.7727814, 32.0476151],
		};

		for(i = 0; i < allData.length; i++) {
			allData[i].coords = [];
			allData[i].coords.push(geoCoordMap[allData[i].name])
			allData[i].coords.push(locations[i])
		};
		var convertData = function(data) {
			var res = [];
			for(var i = 0; i < data.length; i++) {
				var geoCoord = geoCoordMap[data[i].name];
				if(geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value)
					});
				}
			}
			return res;
		};
		var convertedData = [
			convertData(allData),
			convertData(allData.sort(function(a, b) {
				return b.value - a.value;
			}).slice(0, 6))
		];
		var series = [];
		for(i = 0; i < allData.length; i++) {
			let aa = convertedData[1][i]
			let arr = [];
			let bb = allData[i]
			let arr_two = [];
			arr.push(aa)
			arr_two.push(bb)
			let obj = {
				name: '位置',
				type: 'effectScatter',
				coordinateSystem: 'geo',
				data: [],
				symbolSize: function(val) {
					return Math.max(val[1] / 5, 18);
				},
				showEffectOn: 'render', //配置何时显示特效 'render' 绘制完成后显示特效, 'emphasis' 高亮（hover）的时候显示特效。
				rippleEffect: {
					color: "#00ffff", //颜色，涟漪的颜色，默认为散点的颜色。
				},
				hoverAnimation: true,
				label: {
					normal: {
						fontSize: 14,
						formatter: '{b}',
						position: 'bottom',
						height: 30,
						lineHeight: 30,
						show: false,
					}
				},
				itemStyle: {
					normal: {
						color: '#00ffff',
						shadowBlur: 10,
						shadowColor: '#333'
					}
				},
				zlevel: 1
			};
			let henanLines = {
				name: '',
				type: 'lines',
				coordinateSystem: 'geo',
				zlevel: 1,
				polyline: false, //是否是多段线
				large: true,
				effect: {
					show: true,
					period: 10,
					constantSpeed: 80,
					symbol: 'arrow', //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
					symbolSize: 10,
					trailLength: 0,
				},
				//					label: {
				//						show: true,
				//						backgroundColor: {
				//							image: './images/6.png',							
				//						},
				//						width:217,
				//						height:68,
				//						padding: [22, 0, 0, 20],
				//						formatter: function(params) {
				//							var paramsNameNumber = params.name + "\n" + "短信数" + params.data['value'];
				//							return '{a|' + paramsNameNumber + '}'
				//						},
				//						rich: {
				//							a: {
				//								color: '#fff',
				//								fontSize: 14,
				//								lineHeight: 30,
				//								align: 'left',
				//
				//							},
				//						}
				//					},
				lineStyle: {
					normal: {
						color: '#58B3CC',
						width: 2,
						opacity: 1,
						curveness: 0 //0.2 曲线   0 直线
					}
				},

				data: []
			};
			obj.data = arr;
			obj.name = allData[i].name;
			obj.rippleEffect.color = allData[i].delayState == '1' ? '#ffff0f' : allData[i].value == '2' ? '#ff1313' : '#11f511';
			obj.itemStyle.normal.color = allData[i].delayState == '1' ? '#ffff0f' : allData[i].value == '2' ? '#ff1313' : '#11f511';
			series.push(obj)
			henanLines.data = arr_two;
			henanLines.lineStyle.normal.color = allData[i].delayState == '1' ? '#0ff' : allData[i].value == '2' ? '#3499ff' : '#492999';
			series.push(henanLines)
		};
		myChart3.clear();
		let daySendNum = {
			animation: true,
			animationDuration: 1000,
			animationEasing: 'cubicInOut',
			animationDurationUpdate: 1000,
			animationEasingUpdate: 'cubicInOut',
			geo: {
				map: 'china',
				id: 11,
				z: 1,
				//top: '100',
				// left: '10',
				// right: '35%',
				center: [118, 37.51],
				zoom: 0.9,
				label: {
					normal: {
						show: false,
						fontSize: "14",
						color: "#fff"
					},
					emphasis: {
						show: false
					}
				},
				roam: false, //是否开启鼠标缩放和平移漫游
				itemStyle: {
					normal: {
						areaColor: '#1e408a',
						borderWidth: 1,
						borderColor: '#333'
					},
					emphasis: {
						areaColor: "#efc860",
					}
				},
				regions: [{
					name: '南海诸岛',
					value: 0,
					itemStyle: {
						normal: {
							opacity: 0,
							label: {
								show: false
							}
						}
					}
				}],
			},
			tooltip: {
				trigger: 'item'
			},

			xAxis: {
				type: 'value',
				scale: true,
				position: 'top',
				boundaryGap: false,
				splitLine: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					margin: 2,
					textStyle: {
						color: '#aaa'
					}
				},
			},
			yAxis: {
				type: 'category',
				//name: 'TOP 20',
				nameGap: 16,
				axisLine: {
					show: false,
					lineStyle: {
						color: '#ddd'
					}
				},
				axisTick: {
					show: false,
					lineStyle: {
						color: '#ddd'
					}
				},
				axisLabel: {
					interval: 0,
					textStyle: {
						color: '#ddd'
					}
				},
				data: []
			},
			series: series
		};
		myChart3.setOption(daySendNum);
	}
	//条数动画
	function daySendNum_amin() {
		let allData = getUrl(11);
		var interText = doT.template($("#echarts_tep").text());
		$("#echarts_value").html(interText(allData));
		for(let i = 0; i < allData.length; i++) {
			let ele = $(".sw_col" + i)
			totalNum(ele, 2000);
		};

	}
	//上月本月提交量
	function submit_num() {
		let objNum = getUrl(16);
		let myDate = new Date();
		let lastMonth, otherMonth;
		if(myDate.getMonth() == 0) {
			lastMonth = 12;
			otherMonth = 11
		} else if(myDate.getMonth() == 1) {
			lastMonth = 1;
			otherMonth = 12
		} else {
			lastMonth = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
			otherMonth = myDate.getMonth() - 1; //获取当前月份(0-11,0代表1月)
		}
		objNum.last = lastMonth;
		objNum.other = otherMonth
		var interText = doT.template($("#comparison").text());
		$(".sw_new").html(interText(objNum));
		//totalNum($('#totalNum'),1000);
	}
	//sms通道
	function alarm_time() {
		let objNum = getUrl(14);
		$("#FontScrollTwo").html('');
		if(objNum.length > 0) {
			var interText = doT.template($("#alarm_time").text());
			$("#FontScrollTwo").html(interText(objNum));
		} else {
			$("#FontScrollTwo").html('暂无数据');
		}
		if(objNum.length > 4) {
			//运单状态文字滚动		
			  $(document).ready(function(){
          $("#FontScrollTwo").autoScroll({
			      direction: 'up',                  
			      interval: 50,                     //interval、speed、distance都很小时，就形成了平滑滚动现象。
			      speed: 10,                        
			      distance: 1,                      
			      liHeight: 38,                                        
			      showNum: 4                        
			    });
        });	
	  }
		//console.log(objNum.length)
	}
	//sms用户
	function alarm_user() {
		let objNum = getUrl(15);
		$("#FontScroll").html('');
		var interText = doT.template($("#alarm_user").text());
		$("#FontScroll").html(interText(objNum.UserSuccessRate));
		var interTextTwo = doT.template($("#Stick_user").text());
		$("#Stick").html(interTextTwo(objNum.TopUserSuccessRate));
			if(objNum.UserSuccessRate.length > 2) {
				//运单状态文字滚动	
				$(document).ready(function(){
					$("#FontScroll").autoScroll({
		      direction: 'up',                  
		      interval: 50,                     //interval、speed、distance都很小时，就形成了平滑滚动现象。
		      speed: 10,                        
		      distance: 1,                      
		      liHeight: 38,                                        
		      showNum: 2                        
		    });
        });	
			}		
		//console.log(objNum.length)
	}
	//报警雷达
	function radar() {
		let objNum = getUrl(13);
		var interText = doT.template($("#infotmpl").text());
		$("#radar").html(interText(objNum));
		myChart4.clear();
		let radar = {
			//  color: ['#00c2ff', '#f9cf67', '#e92b77'],	
			backgroundColor: '#1f3254',
			//		"title": {
			//      "text": "报警雷达",
			//       x: "13%",
			//      textStyle: {
			//          color: '#fff',
			//          fontSize: '14'
			//      },       
			//  },
			radar: [{

				indicator: [{
						text: '磁盘',
						max: 100,
					},
					{
						text: '内存',
						max: 100,
					},
					{
						text: 'CPU',
						max: 100,
					},
					{
						text: '运行时间',
						max: 100,
					},
					{
						text: '进程',
						max: 100,
					}
				],

				textStyle: {
					color: 'red'
				},
				center: ['50%', '58%'],
				radius: 60,
				startAngle: 90,
				splitNumber: 3,
				nameGap: 2,
				orient: 'horizontal', // 图例列表的布局朝向,默认'horizontal'为横向,'vertical'为纵向.
				// shape: 'circle',
				// backgroundColor: {
				//     image:imgPath[0]
				// },
				name: {
					formatter: '{value}',
					textStyle: {
						fontSize: 14, //外圈标签字体大小
						color: '#fff' //外圈标签字体颜色
					}
				},
				splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
					show: true,
					areaStyle: { // 分隔区域的样式设置。
						color: ['#141c42', '#141c42'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
					}
				},
				// axisLabel:{//展示刻度
				//     show: true
				// },
				axisLine: { //指向外圈文本的分隔线样式
					lineStyle: {
						color: '#153269'
					}
				},
				splitLine: {
					lineStyle: {
						color: '#113865', // 分隔线颜色
						width: 1, // 分隔线线宽
					}
				}
			}, ],
			series: [{
				name: '雷达图',
				type: 'radar',
				itemStyle: {
					emphasis: {
						lineStyle: {
							width: 3
						}
					}
				},
				data: [{
					name: '',
					value: [objNum.diskUse, objNum.ram, objNum.cpu, 80, 80],
					areaStyle: {
						normal: { // 单项区域填充样式
							color: '#ff6699',
							// color: {
							//     type: 'linear',
							//     x: 0, //右
							//     y: 0, //下
							//     x2: 1, //左
							//     y2: 1, //上
							//     colorStops: [{
							//         offset: 0,
							//         color: '#f33daa'
							//     }, {
							//         offset: 0.5,
							//         color: 'rgba(0,0,0,0)'
							//     }, {
							//         offset: 1,
							//         color: '#f33daa'
							//     }],
							//     globalCoord: false
							// },
							opacity: 1 // 区域透明度
						}
					},
					symbolSize: 0.5, // 单个数据标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
					label: { // 单个拐点文本的样式设置                            
						normal: {
							// show: true,             // 单个拐点文本的样式设置。[ default: false ]
							position: 'top', // 标签的位置。[ default: top ]
							distance: 2, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
							color: '#6692e2', // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
							fontSize: 14, // 文字的字体大小
							formatter: function(params) {
								return params.value;
							}
						}
					},
					itemStyle: {
						normal: { //图形悬浮效果
							borderColor: '#00c2ff',
							borderWidth: 2.5
						}
					},
					// lineStyle: {
					//     normal: {
					//         opacity: 0.5// 图形透明度
					//     }
					// }
				}]
			}, ]
		};
		myChart4.setOption(radar);
	}
	//实时告警
	function alarm() {
		let objNum = getUrl(12);
		let dates = [],
			dataArr = [];
		for(i = 0; i < objNum.length; i++) {
			dates.push(objNum[i].time);
			dataArr.push(objNum[i].total)
		}
		myChart2.clear();
		let alarm = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},

			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top: '25%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				axisLabel: {
					color: '#fff'
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#19ba8b2b'
					}
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: true,
					lineStyle: {
						type: 'dashed',
						color: '#19ba8b2b'
					}
				},
				data: dates
			}],
			yAxis: [{
					type: 'value',
					name: '报警趋势',
					nameTextStyle: {
						color: '#fff'
					},
					axisLine: {
						lineStyle: {
							color: '#19ba8b2b'
						}
					},
					axisLabel: {
						formatter: '{value}',
						textStyle: {
							color: '#fff'
						}
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: true,
						lineStyle: {
							type: 'dashed',
							color: '#19ba8b2b'
						}
					},
				},
				{
					type: 'value',
					name: '单位:百次',
					nameTextStyle: {
						color: '#fff'
					},
					axisLine: {
						lineStyle: {
							color: '#19ba8b2b'
						}
					},
					axisTick: {
						show: false,
					},

				}
			],
			series: [{
				name: '',
				type: 'line',
				smooth: true,
				symbol: 'none',
				itemStyle: {
					normal: {
						color: '#94C9EC',
						lineStyle: {
							type: "dashed",
							color: "#94C9EC",
							width: 1
						},
						areaStyle: {
							//color: '#94C9EC'
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
								offset: 0,
								color: 'rgba(7,44,90,0.3)'
							}, {
								offset: 1,
								color: 'rgba(0,146,246,0.9)'
							}]),
						}
					}
				},
				data: dataArr
			}]
		};
		myChart2.setOption(alarm);
	}
	getNum()
	daySendNum()
	submit_num()
	radar()
	alarm()
	alarm_time()
	alarm_user()
	//顶部时间
	function getTime() {
		var myDate = new Date();
		var myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
		var myMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
		var myToday = myDate.getDate(); //获取当前日(1-31)
		var myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
		var myHour = myDate.getHours(); //获取当前小时数(0-23)
		var myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
		var mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
		var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
		var nowTime, sw_hours, sw_span;
		sw_hours = fillZero(myHour) + ':' + fillZero(myMinute);
		sw_span = week[myDay] + '<p>' + myYear + '年' + fillZero(myMonth) + '月' + fillZero(myToday) + '日' + '</p>';
		nowTime = '最后监测时间：' + '&nbsp;&nbsp;' + fillZero(myMonth) + '/' + fillZero(myToday) + '&nbsp;&nbsp;' + fillZero(myHour) + ':' + fillZero(myMinute);
		$('.sw_hours').html(sw_hours);
		$('.sw_span').html(sw_span);
		$('.topTime').html(nowTime);
	};

	function fillZero(str) {
		var realNum;
		if(str < 10) {
			realNum = '0' + str;
		} else {
			realNum = str;
		}
		return realNum;
	}
	getTime()
	setInterval(getTime, 1000);
	setInterval(function() {
		getNum()
	}, 1000);
	setInterval(function() {
		daySendNum_amin()
	}, 10000);
	setInterval(function() {
		submit_num()
		radar()
		alarm()
		alarm_time()
		alarm_user()
	}, 120000);
	$(window).resize(function() {
		myChart2.resize();
		myChart3.resize();
		myChart4.resize();
		try {

		} catch(err) {
			return false;
		}
	});
	$('.signOut').on('click', function() {
		window.open('./index.html', "_self");
	})
});