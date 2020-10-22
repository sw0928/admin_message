
	//提示
	$(".tip-btn-tip").on('click', function() {
		//从这里 开始
		$(".tip-tip-box").fadeIn();
		$(".tip-tip-box-nei").animate({
			opacity: "1"
		}, function() {
			$(".tip-tip-box-nei").animate({
				opacity: "1"
			}, 1500, function() {
				$(".tip-tip-box-nei").animate({
					opacity: "0"
				}, 1000)
				$(".tip-success-bg").hide()
			})
		})
		//到这里 结束
	})
	//关闭弹出框
	$(".closes").on('click', function() {
		$('.eject').animate({
			top: "-100%",
		}, function() {
			$('.eject').hide();
		})
		$('.bg100').fadeOut();
	})
	
	//错误提示
	function errors() {
		//从这里 开始
		$(".tip-errors-bg").fadeIn();
		$(".tip-errors-bg .tip-tip-box-nei").animate({
			opacity: "1"
		}, function() {
			$(".tip-errors-bg .tip-tip-box-nei").animate({
				opacity: "1"
			}, 2000, function() {
				$(".tip-errors-bg .tip-tip-box-nei").animate({
					opacity: "0"
				}, 1000)
				$(".tip-errors-bg").hide()
			})
		})
		//到这里 结束	
	}
	//正确提示

	function success() {
		//从这里 开始
		$(".tip-success-bg").fadeIn();
		$(".tip-success-bg .tip-tip-box-nei").animate({
			opacity: "1"
		}, function() {
			$(".tip-success-bg .tip-tip-box-nei").animate({
				opacity: "1"
			}, 2000, function() {
				$(".tip-success-bg .tip-tip-box-nei").animate({
					opacity: "0"
				}, 1000)
				$(".tip-success-bg").hide()
			})
		})
		//到这里 结束	
	}
	//yonghu

	//表单选中 check
	$(".input-check").on('click',function() {
		//alert("fsd")
		$(this).toggleClass("checked");
	})
	$(".one").on('click',function() {
		//alert("fsd")
		$(".two").toggle();
	})
	function serializeFormJSON(obj){
			var o = {};
			var a = obj;
			$.each(a, function () {
				if (o[this.name]) {
					if (!o[this.name].push) {
						o[this.name] = [o[this.name]];
					}
					o[this.name].push(this.value || '');
				} else {
					o[this.name] = this.value || '';
				}
			});
			return o;
	}
	function total(a,b,c,d){
		var total = a;
		var selected = b;
		var uls =  c ;
		var ds =  d ;
		selected.click(function(event){
			event.stopPropagation();
			$('.layui-inline ul').addClass('dns');
			uls.removeClass('dns')
			var text = selected.val();
			if(text == ''){
				total.removeClass('active')
			}
		})

		selected.keyup(function(event){
			event.stopPropagation();
			uls.removeClass('dns')
			var aa =[];
			var text = selected.val();
			var lis_a = total;
			for (var i=0;i<lis_a.length;i++)
			{
				if($(lis_a[i]).find('a').html().indexOf(text) > -1){
					aa.push(lis_a[i])
				}
			}
			uls.html(aa)
		})
		selected.keyup(function(event){
			event.stopPropagation();
			var bb = [];
			if(event.keyCode == 8){
				var text = selected.val();
				if(text == ''){
					uls.html(total);
					$(this).attr('data','')
				}
				for (var i=0;i<total.length;i++)
				{
					if($(total[i]).find('a').html().indexOf(text) > -1){
						bb.push(total[i])
					}
				}
				uls.html(bb);

			}
		});
		ds.on("click", "ul li ", function (event) {
			event.stopPropagation();
			selected.val($(this).find('a').text());
			selected.attr('data',$(this).find('a').attr('data'))
			$(this).addClass('active');
			$(this).siblings().removeClass('active')
			$(this).parent().addClass('dns')
			return false;
		})
		// 点击除按钮和弹框之外任意地方隐藏表情
//            $("body").click(function (e) {
//                if (!$(e.target).closest(".unlike4 ul,.unlike4").length) {
//                    uls.addClass('dns')
//                }
//            });
		$(document).click(function(event){
			uls.addClass('dns');
			uls.html(total);
		});
	}
	//校验用户内容是否一致
	function verify_user(arr,input,text,back){
		var yes = false,data_show = true,userId = '';
		for (var i=0;i<arr.length;i++)
		{
			if(arr[i].loginName == text){
				yes = true;
				userId = arr[i].userId
			}
		}
		if(!yes){
			input.attr('data','')
			input.val('')
			return data_show = false;
		}else{
			input.attr('data',userId)
			return data_show = true;
			if(back != null){
				back()
			}
		}
	};
	function verify_ism(arr,input,text,back){
		var yes = false,data_show = true,ismgId = '';
		for (var i=0;i<arr.length;i++)
		{
			if(arr[i].ismgName == text){
				yes = true;
				ismgId = arr[i].ismgId
			}
		}
		if(!yes){
			input.attr('data','')
			input.val('')
			return data_show = false;
			//layer.open({
			//    content:  '请选择下拉框内容！'
			//    ,yes: function(index){
			//        layer.close(index);
			//        input.val('');
			//        input.attr('data','')
			//        return false;
			//    }
			//});
		}else{
			input.attr('data',ismgId)
			return data_show = true;
			if(back != null){
				back()
			}
		}
	};
	//权限
	function workbench(){
		var authorities = sessionStorage.getItem('authorities');
		if (authorities == null) {
			location.href = "index.html"
		}else{
			var lis = JSON.parse(authorities);
			var left_a = $('.left_a');
			var left = [];
			for (var i = 0; i < lis.length; i++) {
				if (lis[i].roleId.toString().length == 5 && lis[i].roleId.toString().substring(0, 3) == '210') {
					left.push(lis[i])
				}
			}
			for (var i = 0; i < left_a.length; i++) {
				var bb = false
				for (var j = 0; j < left.length; j++) {
					if ($(left_a[i]).data('value') == left[j].roleId) {
						bb = true
					}
				}
				if(bb == false){
					$(left_a[i]).hide()
				}
			}
		}

	}