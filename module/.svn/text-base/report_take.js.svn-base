/**
 * Created by Administrator on 2019/6/26 0026.
 */
/*订单列表*/
var id = $api.localStorageId;
var AlarmType=null,queryUser=null;
$.ajax({
    url : $api.queryAlarmType,
    type : 'post',
    async: false,
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
        "empId": '',
        "typeId": "",
    }),
    headers: {
        "Authorization": id,
    },
    success : function(data){
       // console.log(data.data);
        AlarmType = data.data.data;
        //console.log($this.userData);
        // $this.totalCount = data.data.totalCount
    },
    error : function(err){
        console.log(err);
    }
});
$.ajax({
    url : $api.queryUser,
    type : 'post',
    async: false,
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
        "empId": '',
        "msisdn": "",
        "empName": "",
        "isOnDuty": "",
    }),
    headers: {
        "Authorization": id,
    },
    success : function(data){
       // console.log(data.data);
        queryUser = data.data.data;
        //console.log($this.userData);
        // $this.totalCount = data.data.totalCount
    },
    error : function(err){
        console.log(err);
    }
});
//组件通信
var bus = new Vue();
if(show_button(2131612)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-complain", {
    template: '#right-template',
    data: function() {
        return {
            totalCount: "0",
            querySubscribeList: $api.querySubscribeList,
            queryAlarmType:$api.queryAlarmType,
            queryUser:$api.queryUser,
            deleteSubscribe:$api.deleteSubscribe,
            deleteAlarmType:$api.deleteAlarmType,
            deleteDutyUser:$api.deleteDutyUser,
            allData:[],
            content3:AlarmType,
            content4:queryUser,
            mapShow: true, //显示无数据图片
            data1:{
                "empId": '',
                "typeId": "",
                "offset": 1,
                "pageSize": 10,
            },
            data2:{
                "typeNameEn": '',
                "typeNameCn": "",
                "offset": 1,
                "pageSize": 10,
            },
            data3:{
                "empId": '',
                "msisdn": "",
                "empName": "",
                "isOnDuty": "",
                "offset": 1,
                "pageSize": 10,
            },
            code:0,
        };
    },
    mounted:function() {
        var $this = this;
        // setTimeout(() => {
        $this.addData($this.data1)
        layui.use(["form", "laypage"], function() {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            if($this.data1.offset !== 1 || $this.data1.pageSize !== 10){
                $this.page()
            }
            if($this.data2.offset !== 1 || $this.data2.pageSize !== 10){
                $this.page()
            }
            if($this.data3.offset !== 1 || $this.data3.pageSize !== 10){
                $this.page()
            }
            //监听提交
            form.on("submit(demo)", function(data) {
                // console.log(JSON.stringify(data.field));
                var text1 = $(".unlike1 .dropdown-selected1").val();
                if(text1 == ''){
                    $this.data1.typeId = ''
                }else{
                    if(verify_Type(AlarmType,$(".unlike1 .dropdown-selected1"),text1)){
                        $this.data1.typeId = $(".unlike1 .dropdown-selected1").attr('data');
                    }else{
                        layer.msg('请选择下拉框内容！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                }
                var text = $(".unlike2 .dropdown-selected1").val();
                if(text == ''){
                    $this.data1.empId = ''
                }else{
                    if(verify_queryUser(queryUser,$(".unlike2 .dropdown-selected1"),text)){
                        $this.data1.empId = $(".unlike2 .dropdown-selected1").attr('data');
                    }else{
                        layer.msg('请选择下拉框内容！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                }
                $this.data1.offset = 1;
                $this.data1.pageSize = 10;
                $this.addData($this.data1)
                return false;
            });
            form.on("submit(demo2)", function(data) {
                //console.log(JSON.stringify(data.field));
                $this.data2.typeNameEn = data.field.typeNameEn
                $this.data2.typeNameCn = data.field.typeNameCn
                $this.data2.offset = 1;
                $this.data2.pageSize = 10;
                $this.addDataA($this.data2)
                return false;
            });
            form.on("submit(demo3)", function(data) {
                // console.log(JSON.stringify(data.field));
                $this.data3.empName = data.field.empName
                $this.data3.isOnDuty = data.field.isOnDuty
                $this.data3.offset = 1;
                $this.data3.pageSize = 10;
                $this.addDataB($this.data3)
                return false;
            });
        });
        $('.table_tou h6').on('click', function () {
            $(this).addClass('addClass2').siblings().removeClass('addClass2');
            if($(this).text()=='告警订阅列表'){
                $this.code = 0;
                $('.table_nav  form .list').removeClass('dn')
                $('.table_nav  form .list2').addClass('dn')
                $('.table_nav  form .list3').addClass('dn')
                $this.data1.offset = 1;
                $this.data1.pageSize =10;
                $this.addData($this.data1)
            }else if($(this).text()=='告警类型'){
                $this.code = 1;
                $('.table_nav  form .list').addClass('dn')
                $('.table_nav  form .list2').removeClass('dn')
                $('.table_nav  form .list3').addClass('dn')
                $this.data2.offset = 1;
                $this.data2.pageSize =10;
                $this.addDataA($this.data2)
            }else{
                $this.code = 2;
                $('.table_nav  form .list').addClass('dn')
                $('.table_nav  form .list2').addClass('dn')
                $('.table_nav  form .list3').removeClass('dn')
                $this.data3.offset = 1;
                $this.data3.pageSize =10;
                $this.addDataB($this.data3)
            }

        })
        //}, 100);
    },
    methods: {
        del:function(val,num) {
            var $this = this;
            if($this.code == 0 ){
                layer.open({
                    content: '你确定要删除该告警订阅？'
                    ,shadeClose:true
                    ,btn: ['确定', '取消']
                    ,yes: function(index){
                        layer.close(index);
                        $.ajax({
                            url : $this.deleteSubscribe,
                            type : 'post',
                            async: false,
                            dataType: 'json',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                "empId": val,
                                "typeId":num
                            }),
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
                    content: '你确定要删除该告警类型？'
                    ,shadeClose:true
                    ,btn: ['确定', '取消']
                    ,yes: function(index){
                        layer.close(index);
                        $.ajax({
                            url : $this.deleteAlarmType,
                            type : 'post',
                            async: false,
                            dataType: 'json',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                "typeId": val,
                            }),
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
                    content: '你确定要删除该值班人员？'
                    ,shadeClose:true
                    ,btn: ['确定', '取消']
                    ,yes: function(index){
                        layer.close(index);
                        $.ajax({
                            url : $this.deleteDutyUser,
                            type : 'post',
                            async: false,
                            dataType: 'json',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                "empId": val,
                            }),
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
        },
        shade:function(){
            var $this = this;
            if($this.code == 0 ){
                $("#shade1").fadeIn(300);
                $(".shade_con1").fadeIn(300);
                var updata = {
                    node:0,
                    info:{
                        "empName":'',
                        "alarmTypeDesc":'',
                        "empId":'',
                        "alarmTypeId":'',
                        "alarmLevel":'',
                        "startTime":'',
                        "hourWindow":'',
                        "endTime":'',
                    }
                };
                bus.$emit("getAid", updata);
            }
            if($this.code == 1 ){
                $("#shade").fadeIn(300);
                $(".shade_con").fadeIn(300);
                var updata = {
                    node:0,
                    info:{
                        "typeNameEn":'',
                        "typeNameCn":'',
                    }
                };
                bus.$emit("getBid", updata);
            }
            if($this.code == 2 ){
                $("#shade3").fadeIn(300);
                $(".shade_con3").fadeIn(300);
                var updata = {
                    node:0,
                    info:{
                        "empId":'',
                        "msisdn":'',
                        "empName":'',
                        "isOnDuty":'0',
                    }
                };
                bus.$emit("getCid", updata);
            }

        },
        amend:function(obj){
            var $this = this;
            //console.log(obj)
            if($this.code == 0 ){
                $("#shade1").fadeIn(300);
                $(".shade_con1").fadeIn(300);
                var updata = {
                    node:1,
                    info:obj
                };
                bus.$emit("getAid", updata);
            }
            if($this.code == 1 ){
                $("#shade").fadeIn(300);
                $(".shade_con").fadeIn(300);
                var updata = {
                    node:1,
                    info:obj
                };
                bus.$emit("getBid", updata);
            }
            if($this.code == 2 ){
                $("#shade3").fadeIn(300);
                $(".shade_con3").fadeIn(300);
                var updata = {
                    node:1,
                    info:obj
                };
                bus.$emit("getCid", updata);
            }
        },
        page:function(){
            var $this = this;
            layui.use("laypage", function () {
                var laypage = layui.laypage;
                laypage.render({
                    elem: "page",
                    count: $this.totalCount,
                    layout: ["prev", "page", "next", "limit", "skip"],
                    limits:[10,50,100,1000],
                    groups: 5,
                    prev: "<",
                    next: ">",
                    jump: function (obj, first) {
                        //console.log(obj);
                        if (first) {
                            return
                        } else {
                            $this.data1.offset = obj.curr;
                            $this.data1.pageSize = obj.limit;
                            $this.data2.offset = obj.curr;
                            $this.data2.pageSize = obj.limit;
                            $this.data3.offset = obj.curr;
                            $this.data3.pageSize = obj.limit;
                            if($this.code == 0){
                                $this.addData($this.data1)
                            }else if($this.code == 1){
                                $this.addDataA($this.data2)
                            }else{
                                $this.addDataB($this.data3)
                            }
                        }
                    }
                });
            });

        },
        addData:function(data2){
            var $this = this;
            $.ajax({
                url: $this.querySubscribeList,
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                async: true,
                data: JSON.stringify(data2),
                headers: {
                    "Authorization": id,
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
                success: function (data) {
                    //  console.log(data);
                    $this.allData =[];
                    $this.totalCount = 0;
                    $("#load").remove();
                    if (data.statusCode == '401') {
                        // localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");

                    } else {
                        $this.allData = data.data.data;
                        $this.totalCount = data.data.totalCount;
                        if($this.allData.length == 0){
                            $this.mapShow = true
                        }else{
                            $this.mapShow = false
                        }
                        if(data2.offset == 1 && data2.pageSize == 10){
                            $this.page()
                        }
                        $(document).ready(function(){
                            var height = $('#rightTable').get(0).scrollHeight;
                            $('#leftMenu_Box').css('height', height)
                        });
                    }
                },
                error: function (err) {
                    console.log(err);
                    $("#load").remove();
                }
            });
        },
        addDataA:function(data2){
            var $this = this;
            $.ajax({
                url: $this.queryAlarmType,
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                async: true,
                data: JSON.stringify(data2),
                headers: {
                    "Authorization": id,
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
                success: function (data) {
                    //  console.log(data);
                    $this.allData =[];
                    $this.totalCount = 0;
                    $("#load").remove();
                    if (data.statusCode == '401') {
                        // localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");

                    } else {
                        $this.allData = data.data.data;
                        $this.totalCount = data.data.totalCount;
                        if($this.allData.length == 0){
                            $this.mapShow = true
                        }else{
                            $this.mapShow = false
                        }
                        if(data2.offset == 1 && data2.pageSize == 10){
                            $this.page()
                        }
                        $(document).ready(function(){
                            var height = $('#rightTable').get(0).scrollHeight;
                            $('#leftMenu_Box').css('height', height)
                        });
                    }
                },
                error: function (err) {
                    console.log(err);
                    $("#load").remove();
                }
            });
        },
        addDataB:function(data2){
            var $this = this;
            $.ajax({
                url: $this.queryUser,
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                async: true,
                data: JSON.stringify(data2),
                headers: {
                    "Authorization": id,
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
                success: function (data) {
                    //  console.log(data);
                    $this.allData =[];
                    $this.totalCount = 0;
                    $("#load").remove();
                    if (data.statusCode == '401') {
                        // localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");

                    } else {
                        $this.allData = data.data.data;
                        $this.totalCount = data.data.totalCount;
                        if($this.allData.length == 0){
                            $this.mapShow = true
                        }else{
                            $this.mapShow = false
                        }
                        if(data2.offset == 1 && data2.pageSize == 10){
                            $this.page()
                        }
                        $(document).ready(function(){
                            var height = $('#rightTable').get(0).scrollHeight;
                            $('#leftMenu_Box').css('height', height)
                        });
                    }
                },
                error: function (err) {
                    console.log(err);
                    $("#load").remove();
                }
            });
        },
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
        bus.$on("getCC", function (updata) {
            //注意this指向问题
            $this.code = updata.code;
             //console.log(updata)
           // $this.info = updata.info;
            // console.log($('input:radio[name=autoChange]'))
            if($this.code == 0){
                $this.data1.offset = 1;
                $this.data1.pageSize =10;
                $this.addData($this.data1)
            }else if($this.code == 1){
                $this.data2.offset = 1;
                $this.data2.pageSize =10;
                $this.addDataA($this.data2)
            }else{
                $this.data3.offset = 1;
                $this.data3.pageSize =10;
                $this.addDataB($this.data3)
            }
        });
    },
});
/*投诉审核详情*/
Vue.component("v-report", {
    template: '#report-template',
    data: function () {
        return {
            createSubscribe:$api.createSubscribe,
            updateSubscribe: $api.updateSubscribe,
            info: [],
            content3:AlarmType,
            content4:queryUser,
            data1:{
                "empId": '',
                "typeId": "",
                "alarmLevel":'',
                "startTime": '',
                "endTime":'',
            },
            mapShow: true, //显示无数据图片
            code: 0,
            node:0,
            templateId: '',
            allData: []
        };
    },
    mounted:function() {
        var $this = this;
        //setTimeout(() => {
        layui.use(["form", "laypage"], function () {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //监听提交
            form.on("submit(demo6)", function (data) {
                var text1 = $(".unlike3 .dropdown-selected1").val();
                if(text1 == ''){
                    $this.data1.typeId = ''
                }else{
                    if(verify_Type(AlarmType,$(".unlike3 .dropdown-selected1"),text1)){
                        $this.data1.typeId = $(".unlike3 .dropdown-selected1").attr('data');
                    }else{
                        layer.msg('请选择下拉框内容！',{
                            icon:2,
                            time: 2000 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                }
                var text = $(".unlike4 .dropdown-selected1").val();
                if(text == ''){
                    $this.data1.empId = ''
                }else{
                    if(verify_queryUser(queryUser,$(".unlike4 .dropdown-selected1"),text)){
                        $this.data1.empId = $(".unlike4 .dropdown-selected1").attr('data');
                    }else{
                        layer.msg('请选择下拉框内容！',{
                            icon:2,
                            time: 2000 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                }
                if(data.field.startTime == ''){
                    $this.data1.startTime = ''
                }else{
                    if( data.field.startTime >=0 && data.field.startTime <= 23){
                        $this.data1.startTime = data.field.startTime;
                    }else{
                        layer.msg('您输入的告警时间有误,不能大于23且不能小于0！',{
                            icon:2,
                            time: 3000 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                };
                if(data.field.endTime == ''){
                    $this.data1.endTime = ''
                }else{
                    if(data.field.endTime >=0 && data.field.endTime <= 23){
                        $this.data1.endTime = data.field.endTime
                    }else{
                        layer.msg('您输入的告警时间有误,不能大于23且不能小于0！',{
                            icon:2,
                            time: 3000 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                };
                $this.data1.alarmLevel = data.field.alarmLevel
                $.ajax({
                    url: $this.createSubscribe,
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
                                        $this.shanchu();
                                        var updata = {
                                            code:0,
                                        };
                                        bus.$emit("getCC", updata);
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
            form.on("submit(demo8)", function (data) {
                //var text1 = $(".unlike3 .dropdown-selected1").val();
                //if(text1 == ''){
                //    $this.data1.typeId = ''
                //}else{
                //    if(verify_Type(AlarmType,$(".unlike3 .dropdown-selected1"),text1)){
                //        $this.data1.typeId = $(".unlike3 .dropdown-selected1").attr('data');
                //    }else{
                //        layer.msg('请选择下拉框内容！',{
                //            icon:2,
                //            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                //        });
                //        return false;
                //    }
                //}
                //var text = $(".unlike4 .dropdown-selected1").val();
                //if(text == ''){
                //    $this.data1.empId = ''
                //}else{
                //    if(verify_queryUser(queryUser,$(".unlike4 .dropdown-selected1"),text)){
                //        $this.data1.empId = $(".unlike4 .dropdown-selected1").attr('data');
                //    }else{
                //        layer.msg('请选择下拉框内容！',{
                //            icon:2,
                //            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                //        });
                //        return false;
                //    }
                //}
                if(data.field.startTime == ''){
                    $this.data1.startTime = ''
                }else{
                    if(data.field.startTime >=0 && data.field.startTime <= 23){
                        $this.data1.startTime = data.field.startTime;
                    }else{
                        layer.msg('您输入的告警时间有误,不能大于23且不能小于0！',{
                            icon:2,
                            time: 3000 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                }
                if(data.field.endTime == ''){
                    $this.data1.endTime = ''
                }else{
                    if(data.field.endTime >=0 && data.field.endTime <= 23){
                        $this.data1.endTime = data.field.endTime
                    }else{
                        layer.msg('您输入的告警时间有误,不能大于23且不能小于0！',{
                            icon:2,
                            time: 3000 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                };
                $this.data1.typeId = $this.info.alarmTypeId
                $this.data1.empId = $this.info.empId
                $this.data1.alarmLevel = data.field.alarmLevel
                $.ajax({
                    url: $this.updateSubscribe,
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
                                        bus.$emit("getCC", updata);
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
        // }, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade1").fadeOut(300);
            $(".shade_con1").fadeOut(300);
        },
        sw_btnwrong:function(){
            $("#shade1").fadeOut(300);
            $(".shade_con1").fadeOut(300);
        },

    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getAid", function (updata) {
            //注意this指向问题
            //console.log(updata)
            $this.node = updata.node;
            $this.info = updata.info;
           // console.log($this.info)
            if($this.node == 0){
                $('.unlike3 .dropdown-selected1').attr("disabled", false ).css('background',' #fff');
                $('.unlike4 .dropdown-selected1').attr("disabled", false ).css('background',' #fff');
                $('.unlike3 .dropdown-selected1').val($this.info.alarmTypeDesc);
                $('.unlike4 .dropdown-selected1').val($this.info.empName);
                $this.info.startTime = '';
                $this.info.endTime = '';
            }else{
                $('.unlike3 .dropdown-selected1').attr("disabled", true ).css('background',' #ECECEC');
                $('.unlike4 .dropdown-selected1').attr("disabled", true ).css('background',' #ECECEC');
                $('.unlike3 .dropdown-selected1').val($this.info.alarmTypeDesc)
                $('.unlike4 .dropdown-selected1').val($this.info.empName)
                $this.info.startTime =$this.info.hourWindow ==''? '': $this.info.hourWindow.split('-')[0];
                $this.info.endTime =$this.info.hourWindow ==''? '': $this.info.hourWindow.split('-')[1];
            }

            // console.log($('input:radio[name=autoChange]'))
            layui.use("form", function() {
                var form = layui.form;
                form.render();
            })
        });
    },
});
Vue.component("v-import-two", {
    template: '#import',
    data: function () {
        return {
            createAlarmType:$api.createAlarmType,
            updateAlarmType: $api.updateAlarmType,
            info: [],
            mapShow: true, //显示无数据图片
            code: 0,
            node:0,
            templateId: '',
            allData: []
        };
    },
    mounted:function() {
        var $this = this;
        //setTimeout(() => {
        layui.use(["form", "laypage"], function () {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //监听提交
            form.on("submit(demo9)", function (data) {
                $.ajax({
                    url: $this.createAlarmType,
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
                            if(data.data == true){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
                                        var updata = {
                                            code:1,
                                        };
                                        bus.$emit("getCC", updata);
                                       // window.open("../../html/resource/report_take.html", "_self");
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
            form.on("submit(demo10)", function (data) {
                data.field.typeId = $this.info.typeId;
                $.ajax({
                    url: $this.updateAlarmType,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    async: false,
                    data: JSON.stringify(data.field),
                    headers: {
                        "Authorization": id,
                    },
                    success: function (data) {
                        //  console.log(data);
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
                                        bus.$emit("getCC", updata);
                                        //window.open("../../html/resource/report_take.html", "_self");
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
        // }, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade").fadeOut(300);
            $(".shade_con").fadeOut(300);
        },
        sw_btnwrong:function(){
            $("#shade").fadeOut(300);
            $(".shade_con").fadeOut(300);
        },

    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getBid", function (updata) {
            //注意this指向问题
            $this.node = updata.node;
            $this.info = updata.info;
           // console.log($this.info)
            // console.log($('input:radio[name=autoChange]'))
            layui.use("form", function() {
                var form = layui.form;
                form.render();
            })
        });
    },
});
Vue.component("v-import", {
    template: '#import-template',
    data: function () {
        return {
            createDutyUser:$api.createDutyUser,
            updateDutyUser: $api.updateDutyUser,
            info: [],
            mapShow: true, //显示无数据图片
            node:0,
            templateId: '',
            allData: []
        };
    },
    mounted:function() {
        var $this = this;
        //setTimeout(() => {
        layui.use(["form", "laypage"], function () {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //监听提交
            form.on("submit(demo11)", function (data) {
                if (data.field.msisdn !== '') {
                    var re = /^1(3|4|5|7|8)\d{9}$/;
                    if(!re.test(data.field.msisdn)){
                        layer.alert('手机号码不正确！', { icon: 2 });
                        return false;
                    }
                }
                $.ajax({
                    url: $this.createDutyUser,
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
                            if(data.data == true){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
                                        var updata = {
                                            code:2,
                                        };
                                        bus.$emit("getCC", updata);
                                        //window.open("../../html/resource/route_manage.html", "_self");
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
            form.on("submit(demo12)", function (data) {
                if (data.field.msisdn !== '') {
                    var re = /^1(3|4|5|7|8)\d{9}$/;
                    if(!re.test(data.field.msisdn)){
                        layer.alert('手机号码不正确！', { icon: 2 });
                        return false;
                    }
                }
                $.ajax({
                    url: $this.updateDutyUser,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    async: false,
                    data: JSON.stringify(data.field),
                    headers: {
                        "Authorization": id,
                    },
                    success: function (data) {
                        //  console.log(data);
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
                                        bus.$emit("getCC", updata);
                                       // window.open("../../html/resource/route_manage.html", "_self");
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
        // }, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade3").fadeOut(300);
            $(".shade_con3").fadeOut(300);
        },
        sw_btnwrong:function(){
            $("#shade3").fadeOut(300);
            $(".shade_con3").fadeOut(300);
        },

    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getCid", function (updata) {
            //注意this指向问题
            $this.node = updata.node;
            $this.info = updata.info;
            //console.log($this.info)
            // console.log($('input:radio[name=autoChange]'))
            $("#isOnDuty option[value='"+$this.info.isOnDuty+"']").prop("selected","selected");
            layui.use("form", function() {
                var form = layui.form;
                form.render();
            })
        });
    },
});