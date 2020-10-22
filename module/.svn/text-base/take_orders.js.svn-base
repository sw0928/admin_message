/**
 * Created by addistrator on 2019/2/17 0017.
 */
/*接单模板*/
var id = $api.localStorageId;
var UserName=null,BizType=null;
$.ajax({
    url: $api.queryUserName,
    type: 'post',
    async: false,
    data: {
        'loginName': ""
    },
    headers: {
        "Authorization": id,
    },
    success: function (data) {
        //console.log(data);
        UserName = data.data;
    },
    error: function (err) {
        console.log(err);
    }
});
$.ajax({
    url : $api.queryBizType,
    type : 'post',
    async: false,
    data :{
    },
    headers : {
        "Authorization":id,
    },
    success : function(data){
        // console.log(data);
        BizType = data.data;
    },
    error : function(err){
        console.log(err);
    }
});
//组件通信
var bus = new Vue();
Vue.component("v-order-fail", {
    template: '#order-template',
    data: function() {
        return {
            TemplateOrderList: $api.TemplateOrderList,
            queryUserName:$api.queryUserName,
            queryBizType:$api.queryBizType,
            removeTemplateOrder:$api.removeTemplateOrder,
            batchRemoveTemplateOrder:$api.batchRemoveTemplateOrder,
            templateOrderListExcelOut:$api.templateOrderListExcelOut,
            data1:{
                "actionType": [],
                "bizType": [],
                "expression": "",
                "expressionSize": "",
                "mergeType": "",
                "msgContent": "",
                "offset": 1,
                "pageSize": 10,
                "priority": "",
                "statusInt": [],
                "templateId": "",
                "templateName": "",
                "userId": "",
                "z2a": ""
            },
            totalCount:'0',
            userData:UserName,
            delName:'',
            templateId:'',
            Info:[],
            url: $api.orderFailList,
            allData:[],
            content:BizType,
            content1:['拒绝','先审后发','先发后审','接受'],
            content2:['不可用','可用','测试'],
            showNo:false,
            mapShow: true //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
       // setTimeout(() => {
            if(window.location.search.split('=')[1] !== undefined){
                $this.data1.templateId = window.location.search.split('=')[1];
                $("input[name='templateId']").val(window.location.search.split('=')[1])
                $this.addData($this.data1)
            }else{
                $this.addData($this.data1)
            }

            layui.use(["form", "laypage"], function() {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //完整功能
                if($this.data1.offset !== 1 || $this.data1.pageSize !== 10){
                    $this.page()
                }
                //监听提交
                form.on("submit(demo)", function(data) {
                    //console.log(data.typeof($this.data1.statusInt));
                    $this.data1 = data.field;
                    $this.data1.msgContent = $this.data1.msgContent.trim();
                    $this.data1.expression = $this.data1.expression.trim();
                    var text = $(".dropdown .dropdown-selected").val();
                    if (text == '') {
                        $this.data1.userId = ''
                    } else {
                        if(verify_user1($this.userData,$(".dropdown .dropdown-selected"),text)){
                            $this.data1.userId =  $(".dropdown .dropdown-selected").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    $this.data1.actionType = []
                    $this.data1.bizType = []
                    $this.data1.statusInt = []
                    $("input:checkbox[name='actionType']:checked").each(function() { // 遍历name=standard的多选框
                        $this.data1.actionType.push($(this).val()*1);
                    });
                    //$this.data1.actionType = $this.data1.actionType.slice(0,$this.data1.actionType.length-1);
                    $("input:checkbox[name='bizType']:checked").each(function() { // 遍历name=standard的多选框
                        $this.data1.bizType.push($(this).val()*1);
                    });
                    //$this.data1.bizType = $this.data1.bizType.slice(0,$this.data1.bizType.length-1);
                    $("input:checkbox[name='statusInt']:checked").each(function() { // 遍历name=standard的多选框
                        $this.data1.statusInt.push($(this).val()*1);
                    });
                    //$this.data1.statusInt = $this.data1.statusInt.slice(0,$this.data1.statusInt.length-1);
                    //console.log($this.data1)
                    $this.data1.offset = 1;
                    $this.data1.pageSize = 10;
                    $this.addData($this.data1)
                    //$this.page()
                    return false;
                });
                form.on("submit(demo2)", function(data) {
                    var checks = $('td form input.radio');
                    var Array = []
                    $.each(checks,function(i,n){
                        if(checks[i].checked == true){
                            Array.push($(checks[i]).attr('data') * 1)
                        }
                    });
                    Array = Array.join(',')
                    layer.open({
                        content: '你确定要删除选中模板？'
                        ,shadeClose:true
                        ,btn: ['确定', '取消']
                        ,yes: function(index){
                            layer.close(index);
                            $.ajax({
                                url : $this.batchRemoveTemplateOrder,
                                type : 'post',
                                dataType : 'json',
                              //  contentType: 'application/json',
                                async: false,
                                data: {
                                    "templateOrderIdArray":Array
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
                    return false;
                });
            });
     //   }, 100);
    },
    methods: {
        shade:function(){
            $("#shade3").fadeIn(300);
            $(".shade_con3").fadeIn(300);
            var updata = {
                Info:{
                    "actionType": '',
                    "bizType": '',
                    "expireTime": "",
                    "expression": "",
                    "mergeType": '',
                    "msgContent": "",
                    "priority":'',
                    "statusInt":'',
                    "taskCount":'',
                    "taskPeriod": '',
                    "templateName": "",
                    "userName": '',
                    "userId": '',
                    "z2a": ''
                },
                code:0
            };
            bus.$emit("getAid", updata);
        },
        test:function(templateId){
            localStorage.setItem('templateId',templateId );
            window.open("../../html/resource/test_send.html", "_self");
        },
        importFile:function(){
            var $this =this;
            $this.data1.offset = 0;
            $this.data1.pageSize = 0;
            $this.data1.expTitle = '接单模板';
            $this.data1.exp = 'true';
            $.ajax({
                url : $this.TemplateOrderList,
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
        amend:function(templateId) {
            var $this = this;
            $("#shade3").fadeIn(300);
            $(".shade_con3").fadeIn(300);
            $.ajax({
                url : $this.TemplateOrderList,
                type : 'post',
                dataType : 'json',
                contentType: 'application/json',
                async: false,
                data :JSON.stringify({
                    'templateId':templateId
                }),
                headers : {
                    "Authorization":id,
                },
                success : function(data){
                  //  console.log(data);
                    $this.Info = data.data.data[0];
                    var updata = {
                        Info: $this.Info,
                        code:'1'
                    };
                    //console.log(updata);
                    // 将选中的ID放到触发器的盆子里，下面拿着用
                    bus.$emit("getAid", updata);
                },
                error : function(err){
                    console.log(err);
                }
            });
        },
        del:function(templateName,templateId) {
            var $this = this;
            $this.delName = templateName
            $this.templateId = templateId
            $("#shade2").fadeIn(300);
            $(".tips2").fadeIn(300);
        },
        shanchu:function(){
            $("#shade2").fadeOut(300);
            $(".shade_con1").fadeOut(300);
        },
        edit:function(){
            $("#shade").fadeIn(300);
            $(".shade_con").fadeIn(300);
            var checkss = $('td form input.radio');
            var sw_arr = []
            $.each(checkss,function(i,n){
                if(checkss[i].checked == true){
                    sw_arr.push($(checkss[i]).attr('data') * 1)
                }
            });
            sw_arr = sw_arr.join(',')
            var updata = {
                Info: sw_arr,
            };
            //console.log(updata);
            // 将选中的ID放到触发器的盆子里，下面拿着用
            bus.$emit("getBid", updata);
        },
        imports:function(){
            $("#shade1").fadeIn(300);
            $(".shade_con1").fadeIn(300);
        },
        sw_btnsuss:function() {
            var $this =this;
            $(".tips_chid2").fadeIn(500);
            $.ajax({
                url : $this.removeTemplateOrder,
                type : 'post',
                async: false,
                data :{
                    'templateOrderId':$this.templateId
                },
                headers : {
                    "Authorization":id,
                },
                success : function(data){
                  //  console.log(data);

                },
                error : function(err){
                    console.log(err);
                }
            });
        },
        sw_btnwrong:function() {
            $("#shade2").fadeOut(500);
            $(".tips2").fadeOut(500);
        },
        sw_qued:function() {
            var $this = this;
            $("#shade2").fadeOut(300);
            $(".tips_chid2").fadeOut(300);
            $this.addData($this.data1)
            //window.open("../../html/resource/take_orders.html", "_self");
        },
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
                        //console.log(obj);
                        $this.data1.offset = obj.curr;
                        $this.data1.pageSize = obj.limit;
                        if(first){
                            return
                        }else{
                            $this.addData($this.data1);
                            $("th form input[name='全选']")[0].checked = false;
                            var checks = $('td form input.radio');
                            $.each(checks,function(i,n){
                                checks[i].checked = false;
                            });
                        }
                    }
                });
            });

        },
        radio:function(event){
            var checks = $('td form input.radio');
            for (var i = 0; i < checks.length; i++) {
                //console.log(checks[i].checked)
                if( checks[i].checked == false){
                    $("th form input[name='全选']")[0].checked = false;
                }

            }
            layui.use(["form"], function() {
                var form = layui.form;
                form.render();
            })
        },
        check_all:function(event){
            var el = event.currentTarget;
            // console.log($(el).find("input[name='全选']")[0].checked == true);
            var checks = $('td form input.radio');
            if($(el).find("input[name='全选']")[0].checked == true ){
                $.each(checks,function(i,n){
                    checks[i].checked = true
                });
            }else{
                $.each(checks,function(i,n){
                    checks[i].checked = false
                });
            }
            layui.use(["form"], function() {
                var form = layui.form;
                form.render();
            })
        },
        //添加数据
        addData:function(data){
            var $this = this;
            $.ajax({
                url : $this.TemplateOrderList,
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
                    $("#load").remove();
                    if(res.statusCode == '401'){
                       // localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");
                    }else{
                        $this.allData = res.data.data;
                        if($this.allData == ''){
                            $this.showNo = true
                        }else{
                            $this.showNo = false
                        }
                         $this.totalCount = res.data.totalCount
                        if(data.offset == 1 && data.pageSize == 10){
                            $this.page()
                        }
                        $(document).ready(function(){
                            $("th form input[name='全选']")[0].checked = false;
                            var checks = $('td form input.radio');
                            $.each(checks,function(i,n){
                                checks[i].checked = false;
                            });
                            layui.use(["form"], function() {
                                var form = layui.form;
                                form.render();
                            })
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
        bus.$on("getCc", function(updata) {
            //注意this指向问题
            //$this.data1 = {
            //    "actionType": [],
            //        "bizType": [],
            //        "expression": "",
            //        "expressionSize": "",
            //        "mergeType": "",
            //        "msgContent": "",
            //        "offset": 1,
            //        "pageSize": 10,
            //        "priority": "",
            //        "statusInt": [],
            //        "templateId": "",
            //        "templateName": "",
            //        "userId": "",
            //        "z2a": ""
            //};
            $this.addData($this.data1)
            layui.use(["form", "laypage"], function() {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
            });
        });

    },
});
//下单限速新增修改
Vue.component("v-rate", {
    template: '#rate-template',
    data: function() {
        return {
            userData1: UserName,
            createTemplateOrder:$api.createTemplateOrder,
            editTemplateOrder:$api.editTemplateOrder,
            content:BizType,
           // content1:['拒绝','先审后发','先发后审','接受'],
           // content2:['不可用','可用','测试'],
            Info:[],
            mapShow: true, //显示无数据图片
            code:0,
            templateId:'',
            allData: []
        };
    },
    mounted:function() {
        var $this = this;
      //  setTimeout(() => {
            layui.use(["form", "laypage"], function() {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //监听提交
                form.on("submit(demo6)", function(data) {
                    var text = $(".unlike2 .dropdown-selected1").val();
                    if (text == '') {
                        data.field.userId = ''
                    } else {
                        if(verify_user1($this.userData1,$(".unlike2 .dropdown-selected1"),text)){
                            data.field.userId =  $(".unlike2 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    data.field.actionType = data.field.actionType*1
                    data.field.bizType = data.field.bizType*1
                    data.field.statusInt = data.field.statusInt*1
                    data.field.mergeType = data.field.mergeType*1
                    if (data.field.bizType == '') {
                        layer.msg('内容分类不能为空！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }else{
                        data.field.bizType = data.field.bizType*1
                    }
                    var reg = /^[0-9]*$/;
                    if (!reg.test(data.field.priority) || data.field.priority == '') {
                        layer.msg('优先级必填数字，不能为空！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }else{
                        data.field.priority  = data.field.priority*1
                    }
                    $.ajax({
                        url : $this.createTemplateOrder,
                        type : 'post',
                        dataType : 'json',
                        contentType: 'application/json',
                        async: false,
                        data : JSON.stringify(data.field),
                        headers : {
                            "Authorization":id,
                        },
                        success : function(data){
                         //   console.log(data);
                            if(data.data == true){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        window.open("../../html/resource/take_orders.html", "_self");
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
                            if(data.statusCode == '401'){
                                //localStorage.setItem('url', window.location.pathname)
                                window.open("../../login.html", "_self");
                            }
                        },
                        error : function(err){
                            console.log(err);
                        }
                    });
                    return false;
                });
                form.on("submit(demo8)", function(data) {
                    var text = $(".unlike2 .dropdown-selected1").val();
                    if (text == '') {
                        data.field.userId = ''
                    } else {
                        if(verify_user1($this.userData1,$(".unlike2 .dropdown-selected1"),text)){
                            data.field.userId =  $(".unlike2 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    data.field.actionType = data.field.actionType*1
                    data.field.bizType = data.field.bizType*1
                    data.field.statusInt = data.field.statusInt*1
                    data.field.mergeType = data.field.mergeType*1
                    data.field.templateId = $this.templateId*1
                    data.field.priority  = data.field.priority*1
                    //data.field.taskCount  = data.field.taskCount*1
                    //data.field.taskPeriod  = data.field.taskPeriod*1
                  //  console.log(data);
                    $.ajax({
                        url : $this.editTemplateOrder,
                        type : 'post',
                        dataType : 'json',
                        contentType: 'application/json',
                        async: false,
                        data : JSON.stringify(data.field),
                        headers : {
                            "Authorization":id,
                        },
                        success : function(data){
                          // console.log(data);
                            if(data.data == true){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        window.open("../../html/resource/take_orders.html", "_self");
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
                            if(data.statusCode == '401'){
                                //localStorage.setItem('url', window.location.pathname)
                                window.open("../../login.html", "_self");
                            }

                        },
                        error : function(err){
                            console.log(err);
                        }
                    });
                    return false;
                });
            });
      //  }, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade3").fadeOut(500);
            $(".shade_con3").fadeOut(500);
        },
        sw_btnwrong:function(){
            $("#shade3").fadeOut(500);
            $(".shade_con3").fadeOut(500);
        },
        change_business:function(){
         //   setTimeout(() => {
                $("#eventLevel option[value='16']").prop("selected","selected");
                $("input.yxj").val('120')
                layui.use("form", function() {
                    var form = layui.form;
                    form.render();
                })
           // }, 50);

        },
        change_Hang:function(){
          //  setTimeout(() => {
                $("#eventLevel option[value='15']").prop("selected","selected");
                $("input.yxj").val('200')
                layui.use("form", function() {
                    var form = layui.form;
                    form.render();
                })
          //  }, 50);
        }
    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getAid", function(updata) {
            //注意this指向问题
            $this.code = updata.code;
            $this.Info = updata.Info;
            $this.templateId = updata.Info.templateId
           // console.log($this.Info)
          //  setTimeout(() => {
                $("#eventLevel option[value='"+$this.Info.bizType+"']").prop("selected","selected");
                $("#eventLevelTwo option[value='"+$this.Info.actionType+"']").prop("selected","selected");
                $("#eventLevelThree option[value='"+$this.Info.statusInt+"']").prop("selected","selected");
                $("#eventLevelHour option[value='"+$this.Info.mergeType+"']").prop("selected","selected");
                $('.dropdown-selected1').val($this.Info.loginName)
                layui.use("form", function() {
                    var form = layui.form;
                    form.render();
                })
           // }, 50);
        });
    },
});
//下单限速新增修改
Vue.component("v-import", {
    template: '#import-template',
    data: function() {
        return {
            fileId: "",
            importModel: $api.importModel,
            submitModel: $api.submitModel,
            mapShow: true, //显示无数据图片
            code:0,
            //content1:['拒绝','先审后发','先发后审','接受'],
           // content2:['不可用','可用','测试'],
            data2:{
                "mergeType": '',
                "taskPeriod": '',
                "taskCount": "",
                "statusInt": "",
                "actionType": "",
                "bizType": "",
                "priority": "",
                "expireTime": "",
                "fileId": "",
                "userId": "",
                "z2a": ""
            },
            userData:UserName,
            content:BizType,
        };
    },
    mounted:function() {
        var $this = this;
      //  setTimeout(() => {
            layui.use(["form", "upload"], function() {
                var form = layui.form;
                var upload = layui.upload;
                form.render();
                //执行实例
                $("#file").on("change",function (e) {
                    var e = e || window.event;
                    //获取 文件 个数 取消的时候使用
                    var files = e.target.files;
                   // console.log(files)
                    if(files.length>0){
                        // 获取文件名 并显示文件名
                        var fileName = files[0];
                        var myform = new FormData();
                        myform.append('multipartFile', fileName);
                        $.ajax({
                            url: $this.importModel,
                            type: "POST",
                            data: myform,
                            dataType:'json',
                            async: false,
                            cache: false,
                            headers: {
                                "Authorization": id,
                            },
                            contentType: false,
                            processData: false,
                            success: function (res) {
                               // console.log(res)
                                if (res.statusCode == 200) {
                                    layer.open({
                                        content: res.data.message
                                        ,yes: function(index){
                                            layer.close(index);
                                           // $("#file").val("");
                                            $this.fileId =res.data.fileId;
                                        }
                                    });
                                } else {
                                    layer.open({
                                        content: res.message
                                        ,yes: function(index){
                                            layer.close(index);
                                            $("#file").val("");
                                            $this.fileId ='';
                                        }
                                    });
                                }
                            },
                            error: function (data) {
                            }
                        })
                    }else{
                        //清空文件名
                        $("#file").val("");
                    }
                });
                //监听提交
                form.on("submit(demo7)", function(data) {
                    $this.data2 = data.field;
                    var text = $(".unlike1 .dropdown-selected1").val();
                    if(text == ''){
                        layer.msg('请选择下拉框内容！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }else{
                        if(verify_user1(UserName,$(".unlike1 .dropdown-selected1"),text)){
                            $this.data2.userId = $(".unlike1 .dropdown-selected1").attr('data');
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }
                    }
                    if($this.fileId == ''){
                        layer.msg('请导入文件！',{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                        return false;
                    }
                    $this.data2.fileId = $this.fileId
                    $.ajax({
                        url: $this.submitModel,
                        type: 'post',
                        dataType: 'json',
                        contentType: 'application/json',
                        async: false,
                        data: JSON.stringify($this.data2),
                        headers: {
                            "Authorization": id,
                        },
                        success: function (res) {
                            //  console.log(data);
                            if(res.statusCode == '200'){
                                layer.open({
                                    content: res.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.shanchu()
                                        var updata = {
                                            cc:'1'
                                        };
                                        bus.$emit("getCc", updata);
                                        //window.open("../../html/resource/route_list.html", "_self");
                                    }
                                });
                            }else if(res.statusCode == '401'){
                                window.open("../../login.html", "_self");
                            }else{
                                layer.open({
                                    content:  res.message
                                    ,yes: function(index){
                                        layer.close(index);
                                    }
                                });
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                    return false;
                });
            });
      //  }, 100);
    },
    methods: {
        shanchu:function() {
            var $this = this;
            $("#shade1").fadeOut(500);
            $(".shade_con1").fadeOut(500);
            $("#file").val("");
            $(".unlike1 .dropdown-selected1").attr('data','');
            $(".unlike1 .dropdown-selected1").val('');
            $("#bizType option[value='']").prop("selected","selected");
            $("#actionType option[value='4']").prop("selected","selected");
            $("#statusInt option[value='1']").prop("selected","selected");
            $("#mergeType option[value='1']").prop("selected","selected");
            $this.fileId ='';
            $this.data2 = {
                "taskPeriod": '',
                "taskCount": "",
                "priority": "",
                "expireTime": "",
                "fileId": "",
                "userId": "",
                "z2a": ""
            };
            setTimeout(function(){
                layui.use(["form", "laypage"], function() {
                    var form = layui.form;
                    var laypage = layui.laypage;
                    form.render();
                });
            }, 50);

        },
        sw_btnwrong:function(){
            $("#shade1").fadeOut(500);
            $(".shade_con1").fadeOut(500);
        }
    },
    created:function() {
        var $this = this;

        //接收器，接收上面的两个ID
        bus.$on("getAid", function(updata) {
            //注意this指向问题
            $this.code = updata.code;
          //  setTimeout(() => {
                layui.use(["form", "laypage"], function() {
                    var form = layui.form;
                    var laypage = layui.laypage;
                    form.render();
                });
           // }, 50);
        });
    },
});

Vue.component("v-edit", {
    template: '#edit-template',
    data: function() {
        return {
            batchEditTemplateOrder: $api.batchEditTemplateOrder,
            mapShow: true, //显示无数据图片
            //content1:['拒绝','先审后发','先发后审','接受'],
            // content2:['不可用','可用','测试'],
            data2:{
                "templateIdStr": '',
                "statusInt": "",
                "actionType": "",
                "bizType": "",
                "priority": "",
            },
            idStr:'',
            userData:UserName,
            content:BizType,
        };
    },
    mounted:function() {
        var $this = this;
        //  setTimeout(() => {
        layui.use(["form", "upload"], function() {
            var form = layui.form;
            var upload = layui.upload;
            form.render();
            //监听提交
            form.on("submit(demo1)", function(data) {
                $this.data2 = data.field;
                $this.data2.templateIdStr = $this.idStr;
                $.ajax({
                    url: $this.batchEditTemplateOrder,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    async: false,
                    data: JSON.stringify($this.data2),
                    headers: {
                        "Authorization": id,
                    },
                    success: function (res) {
                        //  console.log(data);
                        if(res.statusCode == '200'){
                            layer.open({
                                content: res.message
                                ,yes: function(index){
                                    layer.close(index);
                                    $this.shanchu()
                                    var updata = {
                                        cc:'1'
                                    };
                                    bus.$emit("getCc", updata);
                                    //window.open("../../html/resource/route_list.html", "_self");
                                }
                            });
                        }else if(res.statusCode == '401'){
                            window.open("../../login.html", "_self");
                        }else{
                            layer.open({
                                content:  res.message
                                ,yes: function(index){
                                    layer.close(index);
                                }
                            });
                        }
                    },
                    error: function (err) {
                        layer.open({
                            content: err.message
                            ,yes: function(index){
                                layer.close(index);
                            }
                        });
                    }
                });
                return false;
            });
        });
        //  }, 100);
    },
    methods: {
        shanchu:function() {
            var $this = this;
            $("#shade").fadeOut(300);
            $(".shade_con").fadeOut(300);
            $("#sw_bizType option[value='']").prop("selected","selected");
            $("#sw_actionType option[value='4']").prop("selected","selected");
            $("#sw_statusInt option[value='1']").prop("selected","selected");
            $this.data2 = {
                "templateIdStr": '',
                "statusInt": "",
                "actionType": "",
                "bizType": "",
                "priority": "",
            };
            setTimeout(function(){
                layui.use(["form", "laypage"], function() {
                    var form = layui.form;
                    var laypage = layui.laypage;
                    form.render();
                });
            }, 50);

        },
    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getBid", function(updata) {
            //注意this指向问题
            $this.idStr = updata.Info;
        });
    },
});