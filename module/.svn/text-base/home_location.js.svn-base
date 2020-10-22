/**
 * Created by Administrator on 2019/2/19 0019.
 */
/*签到申请列表*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
if(show_button(2131013)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-signature", {
    template:'#signature-template',
    data: function() {
        return {
            allData:[],
            totalCount:'0',
            mapShow: true, //显示无数据图片
            code:0,
            queryHomeList: $api.queryHomeList,
            queryPhoneLocationList: $api.queryPhoneLocationList,
            queryPhoneOperatorList:$api.queryPhoneOperatorList,
            queryLocationInfo:$api.queryLocationInfo,
            queryPhoneLocationInfo:$api.queryPhoneLocationInfo,
            queryPhoneOperatorInfo:$api.queryPhoneOperatorInfo,
            deleteLocation:$api.deleteLocation,
            deletePhoneLocation:$api.deletePhoneLocation,
            deletePhoneOperator:$api.deletePhoneOperator,
            queryIpLocationList:$api.queryIpLocationList,
            queryIpLocationInfo:$api.queryIpLocationInfo,
            deleteIpLocation:$api.deleteIpLocation,
            data1:{
                "province": "",
                "operator": "",
                "endTime": '',
                "startTime": '',
                "offset": 1,
                "pageSize": 10,
            },
            data2:{
                "province": "",
                "city": "",
                "operator": "",
                "netType": "",
                "telHead":'',
                "endTime": '',
                "startTime": '',
                "offset": 1,
                "pageSize": 10,
            },
            data3:{
                "operator": "",
                "telHead":'',
                "endTime": '',
                 "startTime": '',
                "offset": 1,
                "pageSize": 10,
            },
            data4:{
                "operator": "",
                "ipRaw":'',
                "endTime": '',
                "startTime": '',
                "location":'',
                "offset": 1,
                "pageSize": 10,
            },
            showNo:false
        };
    },
    mounted:function() {
        var $this = this;
        //setTimeout(() => {
        $this.addData($this.data1);
        layui.use(["form", "laypage"], function() {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //完整功能
            if($this.data1.offset !== 1 || $this.data1.pageSize !== 10){
                $this.page()
            }
            if($this.data2.offset !== 1 || $this.data2.pageSize !== 10){
                $this.page()
            }
            if($this.data3.offset !== 1 || $this.data3.pageSize !== 10){
                $this.page()
            }
            if($this.data4.offset !== 1 || $this.data4.pageSize !== 10){
                $this.page()
            }
            //监听提交
            form.on("submit(demo1)", function(data) {
                 console.log(data.field);
                $this.data1.operator = data.field.operator;
                $this.data1.province = data.field.province;
                $this.data1.endTime = data.field.endDate1;
                $this.data1.startTime = data.field.startDate1
                $this.data1.offset = 1;
                $this.data1.pageSize = 10;
                $this.addData($this.data1)
                return false;
            });
            form.on("submit(demo2)", function(data) {
                $this.data2.city = data.field.city;
                $this.data2.telHead = data.field.telHead;
                $this.data2.province = data.field.provinceTwo;
                $this.data2.endTime = data.field.endDate2;
                $this.data2.startTime = data.field.startDate2;
                $this.data2.offset = 1;
                $this.data2.pageSize = 10;
                $this.addDataA($this.data2)
                return false;
            });
            form.on("submit(demo3)", function(data) {
                $this.data3.telHead = data.field.telHeadTwo;
                $this.data3.operator = data.field.operatorTwo;
                $this.data3.endTime = data.field.endDate3;
                $this.data3.startTime = data.field.startDate3;
                $this.data3.offset = 1;
                $this.data3.pageSize = 10;
                $this.addDataB($this.data3)
                return false;
            });
            form.on("submit(demo4)", function(data) {
                $this.data4.operator = data.field.operatorThree;
                $this.data4.ipRaw = data.field.ipRaw;
                $this.data4.location = data.field.location;
                $this.data4.offset = 1;
                $this.data4.pageSize = 10;
                $this.addDataC($this.data4)
                return false;
            });

        });
        $('.table_tou h6').on('click', function () {
            $(this).addClass('addClass2').siblings().removeClass('addClass2')
            if ($(this).text() == '归属地') {
                $this.code = 0;
                $('.table_nav  form .list3').addClass('dn');
                $('.table_nav  form .list2').addClass('dn');
                $('.table_nav  form .list4').addClass('dn');
                $('.table_nav  form .list').removeClass('dn');
                $this.data1.offset = 1;
                $this.data1.pageSize = 10;
                $this.addData($this.data1)
            } else if ($(this).text() == '号段归属') {
                $this.code = 1
                $('.table_nav  form .list').addClass('dn');
                $('.table_nav  form .list3').addClass('dn');
                $('.table_nav  form .list4').addClass('dn');
                $('.table_nav  form .list2').removeClass('dn');
                $this.data2.offset = 1;
                $this.data2.pageSize = 10;
                $this.addDataA($this.data2);
            }else if($(this).text() == '运营商号段') {
                $this.code = 2
                $('.table_nav  form .list').addClass('dn')
                $('.table_nav  form .list2').addClass('dn');
                $('.table_nav  form .list4').addClass('dn');
                $('.table_nav  form .list3').removeClass('dn');
                $this.data3.offset = 1;
                $this.data3.pageSize = 10;
                $this.addDataB($this.data3);
            }else{
            	  $this.code = 3
                $('.table_nav  form .list').addClass('dn')
                $('.table_nav  form .list2').addClass('dn');
                $('.table_nav  form .list3').addClass('dn');
                $('.table_nav  form .list4').removeClass('dn')
                $this.data4.offset = 1;
                $this.data4.pageSize = 10;
                $this.addDataC($this.data4);
            }
            //$(document).ready(function () {
            //    var height = $('#rightTable').get(0).scrollHeight;
            //    // console.log(height)
            //    $('#leftMenu_Box').css('height', height)
            //});
        })
        // }, 100);
    },
    methods: {
        //分页
        page:function(){
            var $this =this;
            layui.use("laypage", function() {
                var laypage = layui.laypage;
                laypage.render({
                    elem: "page",
                    count: $this.totalCount,
                    layout: ["prev", "page", "next","limit","skip"],
                    limits:[10,30,50,100,1000],
                    groups: 5,
                    prev: "<",
                    next: ">",
                    jump: function(obj,first) {

                        if(first){
                            return
                        }else{
                            if($this.code == 0){
                                $this.data1.offset = obj.curr;
                                $this.data1.pageSize = obj.limit;
                                $this.addData($this.data1);
                            }else if($this.code == 1){
                                $this.data2.offset = obj.curr;
                                $this.data2.pageSize = obj.limit;
                                $this.addDataA($this.data2);
                            }else if($this.code == 2){
                                $this.data3.offset = obj.curr;
                                $this.data3.pageSize = obj.limit;
                                $this.addDataB($this.data3);
                            }else{
                            		$this.data4.offset = obj.curr;
                                $this.data4.pageSize = obj.limit;
                                $this.addDataC($this.data4);
                            }


                        }
                    }
                });
            });

        },
        //申请签名
        shade:function() {
            var $this = this;
            if($this.code == 0){
                $("#shade").fadeIn(300);
                $(".shade_con").fadeIn(300);
                var updata = {
                    Info:{
                        "province": "",
                        "operator": "中国移动",
                        "locationId": "",
                    },
                    node:0
                };
                //console.log(updata);
                // 将选中的ID放到触发器的盆子里，下面拿着用
                bus.$emit("getAa", updata);
            }else if($this.code == 1){
                $("#shade1").fadeIn(300);
                $(".shade_con1").fadeIn(300);
                var updata = {
                    Info:{
                        "province": "",
                        "operator": "中国移动",
                        "city":'',
                        "telHead":'',
                        "netType":'',
                        "ac":''
                    },
                    node:0
                };
                bus.$emit("getBb", updata);
            }else if($this.code == 2){
                $("#shade2").fadeIn(300);
                $(".shade_con2").fadeIn(300);
                var updata = {
                    Info:{
                        "operatorVector": "",
                        "operator": "中国移动",
                        "telHead":''
                    },
                    node:0
                };
                bus.$emit("getCc", updata);
            }else{
            	$("#shade2").fadeIn(300);
                $(".shade_con3").fadeIn(300);
                var updata = {
                    Info:{
                        "ipRaw": "",
                        "location": "",
                        "operator": "",
                    },
                    node:0
                };
                bus.$emit("getFf", updata);
            }

        },
        //导出
        importFile:function(){
            var $this =this;
            $this.data1.offset = 0;
            $this.data1.pageSize = 0;
            $this.data1.expTitle = '网关发送情况列表';
            $this.data1.exp = 'true';
            $.ajax({
                url : $this.networkSendList,
                type : 'post',
                contentType: 'application/json',
                data : JSON.stringify($this.data1),
                headers : {
                    "Authorization":id,
                },
                success : function(res){
                    setTimeout(function(){
                        derive(res.data.expTaskId)
                    },1000);
                },
                error : function(err){
                    layer.msg(err.message,{
                        icon:2,
                        time: 1300 //2秒关闭（如果不配置，默认是3秒）
                    });
                }
            });
        },
        //修改
        amend:function(obj) {
            var $this = this;
            if($this.code == 0){
                $("#shade").fadeIn(300);
                $(".shade_con").fadeIn(300);
                var updata = {
                    Info:obj,
                    node:1
                };
                //console.log(updata);
                // 将选中的ID放到触发器的盆子里，下面拿着用
                bus.$emit("getAa", updata);
            }else if($this.code == 1){
                $("#shade1").fadeIn(300);
                $(".shade_con1").fadeIn(300);
                var updata = {
                    Info:obj,
                    node:1
                };
                bus.$emit("getBb", updata);
            }else if($this.code == 2){
                $("#shade2").fadeIn(300);
                $(".shade_con2").fadeIn(300);
                var updata = {
                    Info:obj,
                    node:1
                };
                bus.$emit("getCc", updata);
            }else{
            	$("#shade2").fadeIn(300);
                $(".shade_con3").fadeIn(300);
                var updata = {
                    Info:obj,
                    node:1
                };
                bus.$emit("getFf", updata);
            }
        },
        ////删除
        del:function(val) {
            var $this = this;
            if($this.code == 0 ){
                layer.open({
                    content: '你确定要删除该归属地？'
                    ,shadeClose:true
                    ,btn: ['确定', '取消']
                    ,yes: function(index){
                        layer.close(index);
                        $.ajax({
                            url : $this.deleteLocation,
                            type : 'post',
                            async: false,
                            dataType: 'json',
                           // contentType: 'application/json',
                            data: {
                                "locationId": val,
                            },
                            headers: {
                                "Authorization": id,
                            },
                            success : function(data){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.addData($this.data1)
                                    }
                                });
                            },
                            error : function(err){
                                layer.open({
                                    content: err.message
                                    ,yes: function(index){
                                        layer.close(index);
                                    }
                                });
                            }
                        });

                    }
                    ,btn2: function(index, layero){
                        layer.close(index);
                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                });
            }
            if($this.code == 1 ){
                layer.open({
                    content: '你确定要删除该号段归属？'
                    ,shadeClose:true
                    ,btn: ['确定', '取消']
                    ,yes: function(index){
                        layer.close(index);
                        $.ajax({
                            url : $this.deletePhoneLocation,
                            type : 'post',
                            async: false,
                            dataType: 'json',
                            //contentType: 'application/json',
                            data: {
                                "telHead": val,
                            },
                            headers: {
                                "Authorization": id,
                            },
                            success : function(data){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.addDataA($this.data2)
                                    }
                                });
                            },
                            error : function(err){
                                layer.open({
                                    content: err.message
                                    ,yes: function(index){
                                        layer.close(index);
                                    }
                                });
                            }
                        });

                    }
                    ,btn2: function(index, layero){
                        layer.close(index);
                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                });
            }
            if($this.code == 2 ){
                layer.open({
                    content: '你确定要删除该运营商号段？'
                    ,shadeClose:true
                    ,btn: ['确定', '取消']
                    ,yes: function(index){
                        layer.close(index);
                        $.ajax({
                            url : $this.deletePhoneOperator,
                            type : 'post',
                            async: false,
                            dataType: 'json',
                            data: {
                                "telHead": val,
                            },
                            headers: {
                                "Authorization": id,
                            },
                            success : function(data){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.addDataB($this.data3)
                                    }
                                });
                            },
                            error : function(err){
                                layer.open({
                                    content: err.message
                                    ,yes: function(index){
                                        layer.close(index);
                                    }
                                });
                            }
                        });

                    }
                    ,btn2: function(index, layero){
                        layer.close(index);
                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                });
            }
            if($this.code == 3 ){
                layer.open({
                    content: '你确定要删除该IP归属地？'
                    ,shadeClose:true
                    ,btn: ['确定', '取消']
                    ,yes: function(index){
                        layer.close(index);
                        $.ajax({
                            url : $this.deleteIpLocation,
                            type : 'post',
                            async: false,
                            dataType: 'json',
                            data: {
                                "ipRaw": val,
                            },
                            headers: {
                                "Authorization": id,
                            },
                            success : function(data){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.addDataC($this.data4)
                                    }
                                });
                            },
                            error : function(err){
                                layer.open({
                                    content: err.message
                                    ,yes: function(index){
                                        layer.close(index);
                                    }
                                });
                            }
                        });

                    }
                    ,btn2: function(index, layero){
                        layer.close(index);
                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                });
            }
        },
        //添加数据
        addData:function(data){
            var $this = this;
            $.ajax({
                url : $this.queryHomeList,
                type : 'post',
                dataType : 'json',
                contentType: 'application/json',
                async: true,
                data : JSON.stringify(data),
                headers : {
                    "Authorization":id,
                },
                beforeSend: function () {
                    $("body").append(' <div id="load"> <img src="../../img/loading.gif" alt=""/> </div>');
                },
                complete: function (xhr) {
                    $("#load").remove();
                    // 获取相关Http Response header
					          if(xhr.getResponseHeader('Authorization') != null){
					            localStorage.setItem('id', xhr.getResponseHeader('Authorization'));
					          }
                },
                success : function(res){
                    // console.log(res);
                    $this.allData =[];
                    $this.totalCount = 0;
                    $("#load").remove();
                    if(res.statusCode == '401'){
                        // localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");
                    }else{
                        $this.allData = res.data.data;
                        if($this.allData.length == 0){
                            $this.showNo = true
                        }else{
                            $this.showNo = false
                        }
                        $this.totalCount = res.data.totalCount;
                        if(data.offset == 1 && data.pageSize == 10){
                            $this.page()
                        }
                        $(document).ready(function(){
                            var height = $('#rightTable').get(0).scrollHeight;
                            $('#leftMenu_Box').css('height', height)
                        });
                    }

                },
                error : function(err){
                    console.log(err);
                    $("#load").remove();
                }
            });
        },
        addDataA:function(data){
            var $this = this;
            $.ajax({
                url : $this.queryPhoneLocationList,
                type : 'post',
                dataType : 'json',
                contentType: 'application/json',
                async: true,
                data : JSON.stringify(data),
                headers : {
                    "Authorization":id,
                },
                beforeSend: function () {
                    $("body").append(' <div id="load"> <img src="../../img/loading.gif" alt=""/> </div>');
                },
                complete: function (xhr) {
                    $("#load").remove();
                    // 获取相关Http Response header
					          if(xhr.getResponseHeader('Authorization') != null){
					            localStorage.setItem('id', xhr.getResponseHeader('Authorization'));
					          }
                },
                success : function(res){
                    // console.log(res);
                    $this.allData =[];
                    $this.totalCount = 0;
                    $("#load").remove();
                    if(res.statusCode == '401'){
                        // localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");
                    }else{
                        if(res.data == null){
                            $this.showNo = true
                        }else{
                            $this.allData = res.data.data;
                            if($this.allData.length == 0 ){
                                $this.showNo = true
                            }else{
                                $this.showNo = false
                            }
                            $this.totalCount = res.data.totalCount;
                            if(data.offset == 1 && data.pageSize == 10){
                                $this.page()
                            }
                        }

                        $(document).ready(function(){
                            var height = $('#rightTable').get(0).scrollHeight;
                            $('#leftMenu_Box').css('height', height)
                        });
                    }

                },
                error : function(err){
                    console.log(err);
                    $("#load").remove();
                }
            });
        },
        addDataB:function(data){
            var $this = this;
            $.ajax({
                url : $this.queryPhoneOperatorList,
                type : 'post',
                dataType : 'json',
                contentType: 'application/json',
                async: true,
                data : JSON.stringify(data),
                headers : {
                    "Authorization":id,
                },
                beforeSend: function () {
                    $("body").append(' <div id="load"> <img src="../../img/loading.gif" alt=""/> </div>');
                },
                complete: function (xhr) {
                    $("#load").remove();
                    // 获取相关Http Response header
					          if(xhr.getResponseHeader('Authorization') != null){
					            localStorage.setItem('id', xhr.getResponseHeader('Authorization'));
					          }
                },
                success : function(res){
                    // console.log(res);
                    $this.allData =[];
                    $this.totalCount = 0;
                    $("#load").remove();
                    if(res.statusCode == '401'){
                        // localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");
                    }else{
                        if(res.data == null){
                            $this.showNo = true
                        }else{
                            $this.allData = res.data.data;
                            if($this.allData.length == 0 ){
                                $this.showNo = true
                            }else{
                                $this.showNo = false
                            }
                            $this.totalCount = res.data.totalCount;
                            if(data.offset == 1 && data.pageSize == 10){
                                $this.page()
                            }
                        }

                        $(document).ready(function(){
                            var height = $('#rightTable').get(0).scrollHeight;
                            $('#leftMenu_Box').css('height', height)
                        });
                    }

                },
                error : function(err){
                    console.log(err);
                    $("#load").remove();
                }
            });
        },
        addDataC:function(data){
            var $this = this;
            $.ajax({
                url : $this.queryIpLocationList,
                type : 'post',
                dataType : 'json',
                contentType: 'application/json',
                async: true,
                data : JSON.stringify(data),
                headers : {
                    "Authorization":id,
                },
                beforeSend: function () {
                    $("body").append(' <div id="load"> <img src="../../img/loading.gif" alt=""/> </div>');
                },
                complete: function (xhr) {
                    $("#load").remove();
                    // 获取相关Http Response header
					          if(xhr.getResponseHeader('Authorization') != null){
					            localStorage.setItem('id', xhr.getResponseHeader('Authorization'));
					          }
                },
                success : function(res){
                    // console.log(res);
                    $this.allData =[];
                    $this.totalCount = 0;
                    $("#load").remove();
                    if(res.statusCode == '401'){
                        // localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");
                    }else{
                        if(res.data == null){
                            $this.showNo = true
                        }else{
                            $this.allData = res.data.data;
                            if($this.allData.length == 0 ){
                                $this.showNo = true
                            }else{
                                $this.showNo = false
                            }
                            $this.totalCount = res.data.totalCount;
                            if(data.offset == 1 && data.pageSize == 10){
                                $this.page()
                            }
                        }

                        $(document).ready(function(){
                            var height = $('#rightTable').get(0).scrollHeight;
                            $('#leftMenu_Box').css('height', height)
                        });
                    }

                },
                error : function(err){
                    console.log(err);
                    $("#load").remove();
                }
            });
        }
    },
    filters: {
        limitTo: function (value) {
            if(value == ''|| value == null){
                return '-'
            }else{
                return value.substring(0,19)
            }

        }
    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getDd", function (updata) {
            //注意this指向问题
            $this.code = updata.code;
            if($this.code == 0){
                $this.data1.offset = 1;
                $this.data1.pageSize =10;
                $this.addData($this.data1)
            }else if($this.code == 1){
                $this.data2.offset = 1;
                $this.data2.pageSize =10;
                $this.addDataA($this.data2)
            }else if($this.code == 2){
                $this.data3.offset = 1;
                $this.data3.pageSize =10;
                $this.addDataB($this.data3)
            }else{
            	$this.data4.offset = 1;
                $this.data4.pageSize =10;
                $this.addDataC($this.data4)
            }
        });
    },
});
/*申请签名*/
Vue.component("v-rate", {
    template:'#rate-template',
    data: function() {
        return {
            createLocation: $api.createLocation,
            editLocation: $api.editLocation,
            mapShow: true, //显示无数据图片
            node:0,
            data1:{
                "province": "",
                "locationId": "",
                "operator": "",
            },
            info: {}
        };
    },
    mounted:function() {
        var $this = this;
        // setTimeout(() => {
        layui.use(["form", "laypage"], function() {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //监听提交
            form.on("submit(demo6)", function (data) {
                $this.data1.province = data.field.province;
                $this.data1.operator = data.field.operator;
                $this.data1.locationId = data.field.locationId;
                $.ajax({
                    url: $this.createLocation,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    async: false,
                    data: JSON.stringify($this.data1),
                    headers: {
                        "Authorization": id,
                    },
                    success: function (data) {
                        // console.log(data);
                        if (data.statusCode == '401') {
                            //localStorage.setItem('url', window.location.pathname)
                            window.open("../../login.html", "_self");
                        } else {
                            if(data.statusCode == 200){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
                                        var updata = {
                                            code:0,
                                        };
                                        bus.$emit("getDd", updata);
                                    }
                                });
                            }else{
                                layer.open({
                                    content:  data.message
                                    ,yes: function(index){
                                        layer.close(index);

                                    }
                                });
                            }
                        }

                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
                return false;
            });
            form.on("submit(demo7)", function (data) {
                $this.data1.locationId = $this.info.locationId
                $this.data1.province = data.field.province
                $this.data1.operator = data.field.operator
                $.ajax({
                    url: $this.editLocation,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    async: false,
                    data: JSON.stringify($this.data1),
                    headers: {
                        "Authorization": id,
                    },
                    success: function (data) {
                        // console.log(data);
                        if (data.statusCode == '401') {
                            //localStorage.setItem('url', window.location.pathname)
                            window.open("../../login.html", "_self");
                        } else {
                            if(data.statusCode == 200){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
                                        var updata = {
                                            code:0,
                                        };
                                        bus.$emit("getDd", updata);
                                    }
                                });
                            }else{
                                layer.open({
                                    content:  data.message
                                    ,yes: function(index){
                                        layer.close(index);

                                    }
                                });
                            }
                        }

                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
                return false;
            });
        });
        //}, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade").fadeOut(300);
            $(".shade_con").fadeOut(300);
        },

    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getAa", function(updata) {
            //注意this指向问题
            $this.node = updata.node;
            $this.info = updata.Info
            $("#eventLevelOne option[value='"+$this.info.operator+"']").prop("selected","selected");
            if($this.info.locationId == "") {
							$('.layui-inline .locationId').attr("disabled", false).css('background', ' #fff');
						} else {
							$('.layui-inline .locationId').attr("disabled", true).css('background', ' #ECECEC');
						}
            layui.use("form", function() {
                var form = layui.form;
                form.render();
            });
        });
    },
});

Vue.component("v-phone", {
    template:'#phone-template',
    data: function() {
        return {
            createPhoneLocation: $api.createPhoneLocation,
            editPhoneLocation: $api.editPhoneLocation,
            mapShow: true, //显示无数据图片
            node:0,
            data1:{
                "province": "",
                "operator": "",
                "city":'',
                "telHead":'',
                "netType":'',
                "ac":''
            },
            info: {

            }
        };
    },
    mounted:function() {
        var $this = this;
        // setTimeout(() => {
        layui.use(["form", "laypage"], function() {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //监听提交
            form.on("submit(demo8)", function (data) {
                data.field.netType ='';
                data.field.ac = '';
                $.ajax({
                    url: $this.createPhoneLocation,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    async: false,
                    data: JSON.stringify(data.field),
                    headers: {
                        "Authorization": id,
                    },
                    success: function (data) {
                        // console.log(data);
                        if (data.statusCode == '401') {
                            //localStorage.setItem('url', window.location.pathname)
                            window.open("../../login.html", "_self");
                        } else {
                            if(data.statusCode == 200){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
                                        var updata = {
                                            code:1,
                                        };
                                        bus.$emit("getDd", updata);
                                    }
                                });
                            }else{
                                layer.open({
                                    content:  data.message
                                    ,yes: function(index){
                                        layer.close(index);

                                    }
                                });
                            }
                        }

                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
                return false;
            });
            form.on("submit(demo9)", function (data) {
                data.field.netType ='';
                data.field.ac = '';
                data.field.telHead = $this.info.telHead;
                $.ajax({
                    url: $this.editPhoneLocation,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    async: false,
                    data: JSON.stringify(data.field),
                    headers: {
                        "Authorization": id,
                    },
                    success: function (data) {
                        // console.log(data);
                        if (data.statusCode == '401') {
                            //localStorage.setItem('url', window.location.pathname)
                            window.open("../../login.html", "_self");
                        } else {
                            if(data.statusCode == 200){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
                                        var updata = {
                                            code:1,
                                        };
                                        bus.$emit("getDd", updata);
                                    }
                                });
                            }else{
                                layer.open({
                                    content:  data.message
                                    ,yes: function(index){
                                        layer.close(index);

                                    }
                                });
                            }
                        }

                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
                return false;
            });
        });
        //}, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade1").fadeOut(300);
            $(".shade_con1").fadeOut(300);
        },

    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getBb", function(updata) {
            //注意this指向问题
            $this.node = updata.node;
            $this.info = updata.Info
            $("#eventLevelTwo option[value='"+$this.info.operator+"']").prop("selected","selected");
            if($this.info.telHead == "") {
							$('.layui-inline .telHead').attr("disabled", false).css('background', ' #fff');
						} else {
							$('.layui-inline .telHead').attr("disabled", true).css('background', ' #ECECEC');
						}
            layui.use("form", function() {
                var form = layui.form;
                form.render();
            });
        });
    },
});

Vue.component("v-operator", {
    template:'#operator-template',
    data: function() {
        return {
            editPhoneOperator: $api.editPhoneOperator,
            queryBadWordInfo: $api.queryBadWordInfo,
            createPhoneOperator: $api.createPhoneOperator,
            mapShow: true, //显示无数据图片
            node:0,
            info: {

            }
        };
    },
    mounted:function() {
        var $this = this;
        // setTimeout(() => {
        layui.use(["form", "laypage"], function() {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //监听提交
            form.on("submit(demo10)", function (data) {
                $.ajax({
                    url: $this.createPhoneOperator,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    async: false,
                    data: JSON.stringify(data.field),
                    headers: {
                        "Authorization": id,
                    },
                    success: function (data) {
                        // console.log(data);
                        if (data.statusCode == '401') {
                            //localStorage.setItem('url', window.location.pathname)
                            window.open("../../login.html", "_self");
                        } else {
                            if(data.statusCode == 200){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
                                        var updata = {
                                            code:2,
                                        };
                                        bus.$emit("getDd", updata);
                                    }
                                });
                            }else{
                                layer.open({
                                    content:  data.message
                                    ,yes: function(index){
                                        layer.close(index);

                                    }
                                });
                            }
                        }

                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
                return false;
            });
            form.on("submit(demo11)", function (data) {
                data.field.telHead = $this.info.telHead;
                $.ajax({
                    url: $this.editPhoneOperator,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    async: false,
                    data: JSON.stringify(data.field),
                    headers: {
                        "Authorization": id,
                    },
                    success: function (data) {
                        // console.log(data);
                        if (data.statusCode == '401') {
                            //localStorage.setItem('url', window.location.pathname)
                            window.open("../../login.html", "_self");
                        } else {
                            if(data.statusCode == 200){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
                                        var updata = {
                                            code:2,
                                        };
                                        bus.$emit("getDd", updata);
                                    }
                                });
                            }else{
                                layer.open({
                                    content:  data.message
                                    ,yes: function(index){
                                        layer.close(index);

                                    }
                                });
                            }
                        }

                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
                return false;
            });
        });
        //}, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade2").fadeOut(300);
            $(".shade_con2").fadeOut(300);
        },

    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getCc", function(updata) {
            //注意this指向问题
            $this.node = updata.node;
            $this.info = updata.Info
            $("#eventLevelThree option[value='"+$this.info.operator+"']").prop("selected","selected");
            if($this.info.telHead == "") {
							$('.layui-inline .telHeadTwo').attr("disabled", false).css('background', ' #fff');
						} else {
							$('.layui-inline .telHeadTwo').attr("disabled", true).css('background', ' #ECECEC');
						}
            layui.use("form", function() {
                var form = layui.form;
                form.render();
            });
        });
    },
});
Vue.component("v-ip", {
    template:'#ip-template',
    data: function() {
        return {
            createIpLocation: $api.createIpLocation,
            queryBadWordInfo: $api.queryBadWordInfo,
            editIpLocation: $api.editIpLocation,
            mapShow: true, //显示无数据图片
            node:0,
            info: {

            }
        };
    },
    mounted:function() {
        var $this = this;
        // setTimeout(() => {
        layui.use(["form", "laypage"], function() {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //监听提交
            form.on("submit(demo12)", function (data) {
                $.ajax({
                    url: $this.createIpLocation,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    async: false,
                    data: JSON.stringify(data.field),
                    headers: {
                        "Authorization": id,
                    },
                    success: function (data) {
                        // console.log(data);
                        if (data.statusCode == '401') {
                            //localStorage.setItem('url', window.location.pathname)
                            window.open("../../login.html", "_self");
                        } else {
                            if(data.statusCode == 200){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
                                        var updata = {
                                            code:3,
                                        };
                                        bus.$emit("getDd", updata);
                                    }
                                });
                            }else{
                                layer.open({
                                    content:  data.message
                                    ,yes: function(index){
                                        layer.close(index);

                                    }
                                });
                            }
                        }

                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
                return false;
            });
            form.on("submit(demo13)", function (data) {
                data.field.telHead = $this.info.telHead;
                $.ajax({
                    url: $this.editIpLocation,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    async: false,
                    data: JSON.stringify(data.field),
                    headers: {
                        "Authorization": id,
                    },
                    success: function (data) {
                        // console.log(data);
                        if (data.statusCode == '401') {
                            //localStorage.setItem('url', window.location.pathname)
                            window.open("../../login.html", "_self");
                        } else {
                            if(data.statusCode == 200){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
                                        var updata = {
                                            code:3,
                                        };
                                        bus.$emit("getDd", updata);
                                    }
                                });
                            }else{
                                layer.open({
                                    content:  data.message
                                    ,yes: function(index){
                                        layer.close(index);

                                    }
                                });
                            }
                        }

                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
                return false;
            });
        });
        //}, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade2").fadeOut(300);
            $(".shade_con3").fadeOut(300);
        },

    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getFf", function(updata) {
            //注意this指向问题
            $this.node = updata.node;
            $this.info = updata.Info
//          $("#eventLevelThree option[value='"+$this.info.operator+"']").prop("selected","selected");
            layui.use("form", function() {
                var form = layui.form;
                form.render();
            });
        });
    },
});