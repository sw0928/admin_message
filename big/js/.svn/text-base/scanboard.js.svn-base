$(function() {
	//页面淡入效果
	$(".animsition").animsition({
		inClass: 'fade-in',
		outClass: 'fade-out',
		inDuration: 300,
		outDuration: 1000,
		// e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
		loading: false,
		loadingParentElement: 'body', //animsition wrapper element
		loadingClass: 'animsition-loading',
		unSupportCss: ['animation-duration',
			'-webkit-animation-duration',
			'-o-animation-duration'
		],
		//"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
		//The default setting is to disable the "animsition" in a browser that does not support "animation-duration".

		overlay: false,

		overlayClass: 'animsition-overlay-slide',
		overlayParentElement: 'body'
	});
	document.onreadystatechange = subSomething;

	function subSomething() {
		if(document.readyState == "complete") {
			$('#loader').hide();
		}
	}
	//数字翻滚
	var showOne = true;
	function show_num(aa, ele) {
		let n = aa;
		//alert(n);
		let sw_mm = String(n).length;
		if( sw_mm < 7){
			for(let i = 0; i < 7-sw_mm; i++) {
				n = '0' + n 
			}
		}		
		let sss = ele;
		let it = $("#" + sss + " i");		
		let len = n.toString().length;	
		if(it.length > len){
				for(let j = len; j < it.length; j++) {
					it.eq(j).remove();
				}
			}
		for(let i = 0; i < len; i++) {
			if(it.length <= i) {
				$("#" + sss).append("<i class='span_li_0" + i + "' style='background-Position: 0px -622px;'></i>");
			}
			let num = String(n).charAt(i);
			let y; //y轴位置 0  1   -38  2
//			if(num == 's'){
//				y = -722;
//			}else{
//			  
//			}			
			y = num == 0 ? -622 : -parseInt(num - 1) * 69;
			$("#" + sss + " .span_li_0" + i).animate({
				backgroundPosition: '0px ' + String(y) + 'px'
			}, 'slow', 'swing', function() {});
		};	
	}

	function show_num_two(aa,bb,ele) {
		let n = aa;
		//alert(n);
		let sw_bb = String(n).length;
		let sw_num = String(bb).length;
		if( sw_bb < 6){
			for(let i = 0; i < 6-sw_bb; i++) {
				n = '0' + n 
			};
			sw_bb = String(n).length
		}
		if(sw_bb < sw_num && sw_num > 6){
			for(let i = 0; i < sw_num - sw_bb; i++) {
				n = '0' + n 
			}
		}
		let sss = ele;
		let it = $("#" + sss + " i");
		let len = String(n).length;
		if(it.length > len){
				for(let j = len; j < it.length; j++) {
					it.eq(j).remove();
				}
			}
		for(let i = 0; i < len; i++) {
			if(it.length <= i) {
				$("#" + sss).append("<i class='span_li_0" + i + "' style='background-Position: 0px -342px;'></i>");
			}
			let num = String(n).charAt(i);
			let x; //y轴位置 0  1   -38  2
//			if(num == 's'){
//				x = -422;
//			}else{
//			  
//			}	
			x = num == 0 ? -342 : -parseInt(num - 1) * 38;
			$("#" + sss + " .span_li_0" + i).animate({
				backgroundPosition: '0px ' + String(x) + 'px'
			}, 'slow', 'swing', function() {});
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
				"Authorization": sessionStorage.getItem('id'),
			},
			complete: function(xhr) {
				// 获取相关Http Response header
				if(xhr.getResponseHeader('Authorization') != null) {
					sessionStorage.setItem('id', xhr.getResponseHeader('Authorization'));
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
				if(err.readyState == 0){
					window.open("./index.html", "_self");
				}				
			}
		});
		return obj
	}
	var myChart5 = echarts.init(document.getElementById('myChart5'));
	var myChart2 = echarts.init(document.getElementById('myChart2'));
	var myChart1 = echarts.init(document.getElementById('myChart1'));
	var myChart3 = echarts.init(document.getElementById('myChart3'));
	var myChart4 = echarts.init(document.getElementById('myChart4'));
	//成功失败提交量
	function getNum() {
		let objNum = getUrl(1);	
		//let sw_cc = 1;
		show_num(Math.ceil(objNum.submitNumByMonth), 'sw-num1');
		show_num_two(Math.ceil(objNum.submitNumByDay), Math.ceil(objNum.submitNumByDay), 'sw-num2');
		show_num_two(Math.ceil(objNum.successNum), Math.ceil(objNum.submitNumByDay), 'sw-num3');
		show_num_two(Math.ceil(objNum.failNum), Math.ceil(objNum.submitNumByDay), 'sw-num4');
		//show_num_two(121111, 21211121, 'sw-num4');
	}
	//用户发送量排名前6
	function daySendNum() {
		let objNum = getUrl(2);
		let SendNum = [];
		myChart3.clear();
		for (let i = 0; i < objNum.userName.length; i++) { 
    	let arr = {
    		name : '',
    		type : 'bar',
    		barWidth : 50,
    	  data : [],
    	  label : {
					normal: {
						show: true,
						rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'inside',
            distance: 15,
				 		formatter: function(params) {
				 			return params.value
				 		},						
					}
				}
    	};
    	arr.name = objNum.userName[i];
    	arr.data.push(objNum.submitNum[i]);    	
    	SendNum.push(arr)
   };
		
		let daySendNum = {
			tooltip: {
				trigger: 'axis',
			},
			legend: {
        data:objNum.userName,
        left:'16%',
        formatter:'{a|{name}}',  
        textStyle:{
          color:'#fff',
          fontWeight:'bold',
          rich:{                           
                a: {                                
                    width: 90,                             
                },
            }
        }
      },
			grid: {
				top: '20%',
				left: '2%',
				width: '98%',
				height: '80%',
				containLabel: true
			},
			xAxis: {
				data: [''],
				axisLabel: {
					show: true,
					textStyle: {
						fontSize: '12px',
						color: '#fff',
					}
				},
				axisLine: {
					lineStyle: {
						color: '#fff',
						width: 1,
					}
				}
			},
			yAxis: [{
				type: 'value',
				//name: '万',
				axisLabel: {
					show: true,
					textStyle: {
						fontSize: '12px',
						color: '#fff',
					}
				},
				axisLine: {
					lineStyle: {
						color: '#fff',
						width: 1,
					}
				},
				splitLine: {
					show: false,
				}
			}],
			series: SendNum
		};
		myChart3.setOption(daySendNum);
		//console.log(objNum)
	}
	//7天全平台发送量
	function hebdomadNum() {
		let objNum = getUrl(3);
		let hebdomad = [];
		myChart4.clear();
		for (i = 0; i < objNum.vestDate.length; i++) { 
			let strong = objNum.vestDate[i].substring(5)
			 hebdomad.push(strong)
 	}	
 	let sw_bb = [];
   	for (i = 0; i < objNum.successNum.length; i++) { 			
			sw_bb.push(objNum.successNum[i])
   	}	
		let hebdomadNum = {
			tooltip: {
				trigger: 'axis',
			},
			grid: {
				top: '16%',
				left: '2%',
				width: '96%',
				height: '80%',
				containLabel: true
			},
			xAxis: {
				data: hebdomad,
				axisLabel: {
					show: true,
					textStyle: {
						fontSize: '12px',
						color: '#fff',
					}
				},
				axisLine: {
					lineStyle: {
						color: '#fff',
						width: 1,
					}
				}
			},
			yAxis: [{
					type: 'value',
					name: '万',
					axisLabel: {
						show: true,
//						formatter: function(value) {
//							return(value / 10000).toFixed(2)
//						},
						textStyle: {
							fontSize: '12px',
							color: '#fff',
						}
					},
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: 1,
						}
					},
					splitLine: {
						show: false,
					}
				},
				{
					type: 'value',
					name: '百分比',
					axisLabel: {
						show: true,
						formatter: function(value) {
							return (value * 100).toFixed(0)
						},
						textStyle: {
							fontSize: '12px',
							color: '#fff',
						}
					},
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: 1,
						}
					},
					splitLine: {
						show: false,
					}
				}
			],
			series: [{
					name: '成功量',
					type: 'bar',
					//barWidth: 50,
				//	data: objNum.successNum,
					data: sw_bb,
					label: {
						normal: {
							show: true,
							formatter: function(params) {
								return (params.value * 1).toFixed(1)
							},
						},
					},
					itemStyle: {
						normal: {
							barBorderRadius: [1, 1, 1, 1],
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1, [{
									offset: 0,
									color: '#3876cd'
								},
								{
									offset: 0.5,
									color: '#45b4e7'
								},
								{
									offset: 1,
									color: '#54ffff'
								}
								]
							),
						},
					},
				},
				{
					name: '成功率',
					type: 'line',
					yAxisIndex: 1,
					data: objNum.successRate,
					// 显示数值
					itemStyle: {
						normal: {
							label: {
								show: true,
								position: 'inside',
								formatter: function(params) {
									return (params.value * 100).toFixed(2)
								}
							},
							barBorderRadius: [1, 1, 1, 1],
							color: '#f40000'
						},
					},
				}
			]
		};
		myChart4.setOption(hebdomadNum);

	}
	//当天发送量前6通道
	function dayAisle() {
		let objNum = getUrl(4);
		let aisle = [];
		myChart1.clear();
		for ( let i = 0; i < objNum.netWorkName.length; i++) { 
    	let arr = {
    		name : '',
    		type : 'bar',
    		barWidth : 50,
    	  data : [],
    	  label : {
					normal: {
						show: true,
						rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'inside',
            distance: 15,
				 		formatter: function(params) {
				 			return params.value
				 		},						
					}
				}
    	};
    	arr.name = objNum.netWorkName[i];
    	arr.data.push(objNum.sendNum[i])    	
    	aisle.push(arr)
   };
		//console.log(aisle)		
		let dayAisle = {
			tooltip: {
				trigger: 'axis',			
			},
			legend: {
        data:objNum.netWorkName,
        left:'16%',
        formatter:'{a|{name}}',  
        textStyle:{
          color:'#fff',
          fontWeight:'bold',
          rich:{                           
                a: {                                
                    width: 160,                             
                },
            }
        }
      },
			grid: {
				top: '30%',
				left: '2%',
				width: '98%',
				height: '70%',
				containLabel: true
			},
			xAxis: {
				data: [''],
				axisLabel: {
					show: true,
					textStyle: {
						fontSize: '12px',
						color: '#fff',
					}
				},
				axisLine: {
					lineStyle: {
						color: '#fff',
						width: 1,
					}
				}
			},

			yAxis: {
				type: 'value',
				//name: '万',
				axisLabel: {
					show: true,
					textStyle: {
						fontSize: '12px',
						color: '#fff',
					}
				},
				axisLine: {
					lineStyle: {
						color: '#fff',
						width: 1,
					}
				},
				splitLine: {
					show: false,
				}
			},

			series: aisle
		};
		myChart1.setOption(dayAisle);
	}
	//3大运营商
	function operator() {
		let objNum = getUrl(5);
		myChart5.clear();
		var optionB = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [{
				name: '运营商占比',
				type: 'pie',
				radius: '90%',
				center: ['50%', '52%'],
				data: [{
						value: objNum.ydNum,
						name: '移动',

					},
					{
						value: objNum.ltNum,
						name: '联通',

					},
					{
						value: objNum.dxNum,
						name: '电信',

					}
				],
				label: {
					normal: {
						formatter: '{b} : {c}',
						position: 'inside'
					}
				},
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}],
			color: ['#9966ff', '#669900', '#3366ff']
		};
		myChart5.setOption(optionB);
	}
	//告警
	function alarm() {
		let objNum = getUrl(6);
		if(objNum.length > 0){
			var interText = doT.template($("#alarm").text());
			$("#FontScroll").html(interText(objNum));
		}else{
			$("#FontScroll").html('暂无数据');
		}			
			if(objNum.length > 5){
				//运单状态文字滚动		
			$('#FontScroll').FontScroll({
				time: 3000,
				num: 1
			});
			}				
		//console.log(objNum)
	}
	//表空间及队列
	function interspace() {
		let objNum = getUrl(7);
		var interText = doT.template($("#interspace").text());
		$(".sw_interspace").html(interText(objNum));	
		let lengths = objNum.length;
		lengths = (100/lengths) + '%'
		$('.sw_interspace .progress').css({'height': lengths})
		setTimeout(function() {			
			$('.sw_interspace .progress').each(function(i, ele) {
				let PG = $(ele).attr('progress');
				let PGNum = parseInt(PG);
				let zero = 0;
				let speed = 50;
				let timer;
				$(ele).find('h4').html(zero + '%');
				if(PGNum < 30) {
					$(ele).find('.progressBar span').addClass('bg-green');
					$(ele).find('h3 i').addClass('color-green');
				} else if(PGNum >= 30 && PGNum < 70) {
					$(ele).find('.progressBar span').addClass('bg-yellow');
					$(ele).find('h3 i').addClass('color-yellow');
				} else if(PGNum >= 70 && PGNum < 100) {
					$(ele).find('.progressBar span').addClass('bg-red');
					$(ele).find('h3 i').addClass('color-red');
				} else {
					$(ele).find('.progressBar span').addClass('bg-red');
					$(ele).find('h3 i').addClass('color-red');
				}
				$(ele).find('.progressBar span').animate({
					width: PG
				}, PGNum * speed);
				timer = setInterval(function() {
					$(ele).find('h4').html(zero + '%');
					if(zero == PGNum) {
						clearInterval(timer);
					}
					zero++;
				}, 50);
			});			
	}, 50);
	}
	//重点通道
	function emphasisAisle() {
		let objNum = getUrl(8);
		if(objNum.length > 0){
			var interText = doT.template($("#emphasisAisle").text());
			$("#FontScrollTwo").html(interText(objNum));
		}else{
			$("#FontScrollTwo").html('暂无数据');
		}
//		if(objNum.length > 5){
			//运单状态文字滚动		
//			$('#FontScrollTwo').FontScroll({
//				time: 3000,
//				num: 1
//			});
//		}
		//console.log(objNum.length)
	}
	//速度
	function speed() {
		let objNum = getUrl(9);
		if(objNum == null){
			 objNum.sendSpeed = 0
			 objNum.upSpeed = 0
			 objNum.reciveSpeed = 0
		}
		//速率
		let speed = {
			//		backgroundColor: 'rgba(0,0,0,0.3)',
			tooltip: {
				formatter: "{a} <br/>{c} {b}"
			},
	
			series: [
			{
					name: '接单速率',
					type: 'gauge',
					min: 0,
					max: 1000,
					splitNumber: 10,
					radius: '100%',
					center: ['50%', '55%'],
					axisLine: { // 坐标轴线
						lineStyle: { // 属性lineStyle控制线条样式
							color: [
								[0.09, 'lime'],
								[0.82, '#1e90ff'],
								[1, '#ff4500']
							],
							width: 3,
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					axisLabel: { // 坐标轴小标记
						textStyle: { // 属性lineStyle控制线条样式
							fontWeight: 'bolder',
							color: '#fff',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					axisTick: { // 坐标轴小标记
						length: 10, // 属性length控制线长
						lineStyle: { // 属性lineStyle控制线条样式
							color: 'auto',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					splitLine: { // 分隔线
						length: 15, // 属性length控制线长
						lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
							width: 3,
							color: '#fff',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					pointer: { // 分隔线
						shadowColor: '#fff', //默认透明
						shadowBlur: 5
					},
					title: {
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder',
							fontSize: 20,
							fontStyle: 'italic',
							color: '#fff',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					detail: {
						offsetCenter: [-10, '50%'], // x, y，单位px
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder',
							fontSize: '18px',
							color: '#00deff'
						}
					},
					data: [{
						value: objNum.reciveSpeed,
						//name: 'km/h'
					}]
				},
				{
					name: '上行速率',
					type: 'gauge',
					center: ['18%', '50%'], // 默认全局居中
					radius: '70%',
					min: 0,
					max: 1000,
					splitNumber: 10,
					axisLine: { // 坐标轴线
						lineStyle: { // 属性lineStyle控制线条样式
							color: [
								[0.29, 'lime'],
								[0.86, '#1e90ff'],
								[1, '#ff4500']
							],
							width: 2,
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					axisLabel: { // 坐标轴小标记
						textStyle: { // 属性lineStyle控制线条样式
							fontWeight: 'bolder',
							color: '#fff',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					axisTick: { // 坐标轴小标记
						length: 10, // 属性length控制线长
						lineStyle: { // 属性lineStyle控制线条样式
							color: 'auto',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					splitLine: { // 分隔线
						length: 15, // 属性length控制线长
						lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
							width: 3,
							color: '#fff',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					pointer: {
						width: 5,
						shadowColor: '#fff', //默认透明
						shadowBlur: 5
					},
					title: {
						offsetCenter: [0, '-30%'], // x, y，单位px
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder',
							fontStyle: 'italic',
							color: '#fff',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					detail: {
						//backgroundColor: 'rgba(30,144,255,0.8)',
						// borderWidth: 1,         
						offsetCenter: [0, '50%'], // x, y，单位px
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder',
							fontSize: '14px',
							color: '#00deff'
						}
					},
					data: [{
						value: objNum.upSpeed,
						//name: 'kh/min'
					}]
				},
				{
					name: '下行速率',
					type: 'gauge',
					center: ['82%', '50%'], // 默认全局居中
					radius: '70%',
					min: 0,
					max: 1000,
					splitNumber: 10,
					axisLine: { // 坐标轴线
						lineStyle: { // 属性lineStyle控制线条样式
							color: [
								[0.29, 'lime'],
								[0.86, '#1e90ff'],
								[1, '#ff4500']
							],
							width: 2,
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					axisLabel: { // 坐标轴小标记
						textStyle: { // 属性lineStyle控制线条样式
							fontWeight: 'bolder',
							color: '#fff',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					axisTick: { // 坐标轴小标记
						length: 10, // 属性length控制线长
						lineStyle: { // 属性lineStyle控制线条样式
							color: 'auto',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					splitLine: { // 分隔线
						length: 15, // 属性length控制线长
						lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
							width: 3,
							color: '#fff',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					pointer: {
						width: 5,
						shadowColor: '#fff', //默认透明
						shadowBlur: 5
					},
					title: {
						offsetCenter: [0, '-30%'], // x, y，单位px
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder',
							fontStyle: 'italic',
							color: '#fff',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					detail: {
						//backgroundColor: 'rgba(30,144,255,0.8)',
						// borderWidth: 1,               
						offsetCenter: [0, '50%'], // x, y，单位px
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder',
							fontSize: '14px',
							color: '#00deff'
						}
					},
					data: [{
						value: objNum.sendSpeed,
						//name: 'hh/min'
					}]
				},
			]
		};
		myChart2.setOption(speed);	
		//console.log(objNum)
	}
	getNum()
	daySendNum()
	hebdomadNum()
	dayAisle()
	operator()
	alarm()
	interspace()
	emphasisAisle()
	speed()
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
		var nowTime;

		nowTime = myYear + '-' + fillZero(myMonth) + '-' + fillZero(myToday) + '&nbsp;&nbsp;' + week[myDay] + '&nbsp;&nbsp;' + fillZero(myHour) + ':' + fillZero(myMinute) + ':' + fillZero(mySecond);
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
	setInterval(getTime, 1000);

//	function totalNum(obj, speed) {
//		var singalNum = 0;
//		var timer;
//		var totalNum = obj.attr('total');
//
//		if(totalNum) {
//			timer = setInterval(function() {
//				singalNum += speed;
//				if(singalNum >= totalNum) {
//					singalNum = totalNum;
//					clearInterval(timer);
//				}
//				obj.html(singalNum);
//			}, 1);
//		}
//	}

		setInterval(function(){	
			getNum()
			emphasisAisle()
			speed()			
		},1000);
		
		setInterval(function(){				
			operator()
			interspace()
			alarm()			
		},118500);
		
		setInterval(function(){				
			daySendNum()
			hebdomadNum()
			dayAisle()			
		},295000);
	$(window).resize(function() {
		myChart1.resize();
		myChart2.resize();
		myChart3.resize();
		myChart4.resize();
		myChart5.resize();
		try {
//			summaryPie1.resize();
//			summaryPie2.resize();
//			summaryPie3.resize();
//			summaryBar.resize();
//			summaryLine.resize();
		} catch(err) {
			return false;
		}
	});

	/***************2018-01-03增加js****************/

	//车辆状态滚动条样式
//	$('.stateUl').niceScroll({
//		cursorcolor: "#045978", //#CC0071 光标颜色
//		cursoropacitymax: 0.6, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
//		touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
//		cursorwidth: "4px", //像素光标的宽度
//		cursorborder: "0", // 	游标边框css定义
//		cursorborderradius: "4px", //以像素为光标边界半径
//		autohidemode: false //是否隐藏滚动条
//	});

	//车辆信息工作时间表
	//模拟数据
//	function Schedule() {
//		var Item = $('.dataBox');
//		var Size = Item.eq(0).width();
//		var oDay = 24 * 60;
//
//		function getMin(timeStr) {
//			var timeArray = timeStr.split(":");
//			var Min = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
//			return Min;
//		}
//
//		//在时间轴上添加工作时间数据
//		Item.each(function(i, ele) {
//			var ItemData = carData[i];
//
//			function addData(obj, dataParam) {
//				for(var j = 0; j < dataParam.length; j++) {
//					var pos, wid, workCeil, sDate, sStart, sEnd, sConsume;
//					pos = getMin(dataParam[j].start) / oDay * 100 + '%';
//					wid = (getMin(dataParam[j].end) - getMin(dataParam[j].start)) / oDay * 100 + '%';
//					sDate = ItemData.dateLable;
//					sStart = dataParam[j].start;
//					sEnd = dataParam[j].end;
//					sConsume = getMin(dataParam[j].end) - getMin(dataParam[j].start);
//					workCeil = '<span style="width: ' + wid + ';left: ' + pos + '" sDate="' + sDate + '" sStart="' + sStart + '" sEnd="' + sEnd + '" sConsume="' + sConsume + '"></span>';
//					obj.append(workCeil);
//				}
//			}
//			addData($(ele).find('.workTime'), ItemData.data.workTime);
//			addData($(ele).find('.standard'), ItemData.data.standard);
//		});
//
//		//添加总用时与总单数
//		var Total = $('.totalItem');
//		Total.each(function(i, ele) {
//			var ItemData = carData[i].data.workTime;
//			var timeUsed = 0;
//			for(var j = 0; j < ItemData.length; j++) {
//				timeUsed += getMin(ItemData[j].end) - getMin(ItemData[j].start);
//			}
//			var realHour = Math.floor(timeUsed / 60);
//			$(ele).find('span').eq(0).html(realHour + ':' + (timeUsed - realHour * 60));
//			$(ele).find('span').eq(1).html(ItemData.length);
//		});
//	};
//	Schedule();

	//鼠标移入运单显示信息框
//	$('.workTime').on('mouseenter', 'span', function(ev) {
//		var x = ev.clientX;
//		var y = ev.clientY;
//		var sDate, sStart, sEnd, sConsume, infos, sHour, sMin;
//		sDate = $(this).attr("sDate");
//		sStart = $(this).attr("sStart");
//		sEnd = $(this).attr("sEnd");
//		sConsume = $(this).attr("sConsume");
//		sHour = Math.floor(sConsume / 60);
//		sMin = sConsume - sHour * 60;
//
//		infos = '<div class="workTimeInfo" style="left:' + x + 'px;top:' + y + 'px"><p>日期：' + sDate + '</p><p>开始时间：' + sStart + '</p><p>结束时间：' + sEnd + '</p><p>总用时：' + sHour + '小时' + sMin + '分钟</p></div>';
//		$('body').append(infos);
//	});
//	$('.workTime').on('mouseout', function() {
//		$('.workTimeInfo').remove();
//	});
	$('.signOut').on('click', function() {
		window.open('./index.html', "_self");
	})

	//车辆信息弹出框的显示隐藏效果
	//  $('.infoBtn').on('click',function(){
	//		$('.filterbg').show();
	//		$('.carInfo').show();
	//		$('.carInfo').width('3px');
	//		$('.carInfo').animate({height: '76%'},400,function(){
	//			$('.carInfo').animate({width: '82%'},400);
	//		});
	//		setTimeout(function(){
	//			$('.infoBox').show();
	//			$('.carClose').css('display','block');
	//		},800);
	//		
	//	});
	//	$('.carClose').on('click',function(){
	//		$('.carClose').css('display','none');
	//		$('.infoBox').hide();
	//		
	//		$('.carInfo').animate({width: '3px'},400,function(){
	//			$('.carInfo').animate({height: 0},400);
	//		});
	//		setTimeout(function(){
	//			$('.filterbg').hide();
	//			$('.carInfo').hide();
	//			$('.carInfo').width(0);
	//		},800);
	//	});
});