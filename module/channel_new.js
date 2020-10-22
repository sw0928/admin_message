/**
 * Created by Administrator on 2019/7/4 0004.
 */
/**
 * Created by Administrator on 2019/6/21 0021.
 */
var UserName=null,IsmgName=null;
var id = $api.localStorageId;
var contactOfAccess = localStorage.getItem('loginName');
//组件通信
var bus = new Vue();
if(show_button(2121310)){
	
}else{
	window.open("../../login.html", "_self");
}
/*详单列表*/
Vue.component("v-order-list", {
    template: '#list-template',
    data: function() {
        return {
            queryChannelManagementList: $api.queryChannelManagementList,
            queryChannelManagementInfo: $api.queryChannelManagementInfo,
            deleteChannelManagement: $api.deleteChannelManagement,
            allData: [],
            data2:{
                "billTimeDown": '',
                "billTimeUp": '',
                "offset": 1,
                "pageSize": 10,
                "limitSendMarketing": "",
                "limitSendVerify": "",
                "limitSendProfession":'',
                "signWhether":'',
                "receIsSupport":'',
                "billBalanceUp":'',
                "billBalanceDown":'',
                "channelStatus":'',
                "channelCharacter":'',
                "channelSupportOperator":'',
                "contactOfAccess":'',
                "channelSmsMainNumber":'',
                "channelLocalProvince":'',
                "channelName":''
            },
            userData:UserName,
            ismgList:IsmgName,
            totalCount:'0',
            mapShow: false //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
        // setTimeout(() => {
        $this.addData($this.data2)
        layui.use(["form", "laypage"], function() {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //完整功能
            if($this.data2.offset !== 1 || $this.data2.pageSize !== 10){
                $this.page()
            }
            //监听提交
            form.on("submit(demo12)", function (data) {
                //console.log(data)
                $this.data2 = data.field
                $this.data2.offset = 1;
                $this.data2.pageSize = 10;
                $this.addData($this.data2);
                //$this.page()
                return false;
            });
        });
        // }, 50);
    },
    methods: {
        shade:function(){
            var $this = this;
            $("#shade").fadeIn(300);
            $(".shade_con").fadeIn(300);
            var updata = {
                Info:{
                    'contactOfAccess':contactOfAccess,
                    'channelLocalProvince':null,
                    'channelType':'短信',
                    'channelLocalOperator':'中国移动',
                    'channelSupportOperator':'中国移动',
                    'channelCharacter':'直连通道',
                    'channelStatus':'已开通',
                    'interProtocol':'SMGP34DC',
                    'billMethods':'提交计费',
                    'billType':'预付费',
                    'lmsSupport':'支持',
                    'lmsSignType':'最后一条',
                    'receIsSupport':'支持',
                    'receReportSupport':'支持',
                    'signType':'平台签名',
                    'signReplace':'抹去',
                    'signWhether':'否',
                    'codeChildType':'完全支持',
                    'limitArriveProv':'全国',
                    'limitEnableTime':'启用',
                    'limitSendProfession':'是',
                    'limitSendVerify':'是',
                    'limitSendMarketing':'是',
                    'limitPersonalAudit':'否',
                    'channelDisReason':null
                },
                code:'0'
            };
            bus.$emit("getAid", updata);
        },
        //修改
        amend:function(channelId) {
            var $this = this;
            $("#shade").fadeIn(300);
            $(".shade_con").fadeIn(300);
            $.ajax({
                url : $this.queryChannelManagementInfo,
                type : 'post',
                dataType : 'json',
                async: false,
                data :{
                    'channelId':channelId
                },
                headers : {
                    "Authorization":id,
                },
                success : function(data){
                     // console.log(data.data);
                    $this.Info = data.data;
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
        del:function(num) {
            var $this = this;
                layer.open({
                    content: '你确定要删除该通道信息？'
                    ,shadeClose:true
                    ,btn: ['确定', '取消']
                    ,yes: function(index){
                        layer.close(index);
                        $.ajax({
                            url : $this.deleteChannelManagement,
                            type : 'post',
                            async: false,
                            dataType: 'json',
                            data: {
                                "channelId":num
                            },
                            headers: {
                                "Authorization": id,
                            },
                            success : function(data){
                                layer.open({
                                    content: data.message
                                    ,yes: function(index){
                                        layer.close(index);
                                        $this.addData($this.data2)
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
        },
        page:function(){
            var $this = this;
            layui.use("laypage", function () {
                var laypage = layui.laypage;
                laypage.render({
                    elem: "page",
                    count: $this.totalCount,
                    layout: ["prev", "page", "next", "limit", "skip"],
                    limits:[10,30,50,100,1000],
                    groups: 5,
                    prev: "<",
                    next: ">",
                    jump: function (obj, first) {
                        // console.log(obj);
                        if (first) {
                            return
                        } else {
                            $this.data2.offset = obj.curr;
                            $this.data2.pageSize = obj.limit;
                            $this.addData($this.data2);

                        }
                    }
                });
            });

        },
        addData:function(data1){
            var $this = this;
            $.ajax({
                url: $this.queryChannelManagementList,
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                async: true,
                data: JSON.stringify(data1),
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
                    // console.log(data.data);
                    $("#load").remove();
                    $this.allData = [];
                    $this.totalCount = 0;
                    if (data.statusCode == '401') {
                        //localStorage.setItem('url', window.location.pathname)
                        window.open("../../login.html", "_self");

                    }else if(data.statusCode == '400'){
                        $this.mapShow = true
                        layer.msg(data.message,{
                            icon:2,
                            time: 1300 //2秒关闭（如果不配置，默认是3秒）
                        });
                    } else {

                        if(data.data.data.length == 0){
                            $this.mapShow = true
                        }else{
                            $this.mapShow = false

                        }
                        $this.allData = data.data.data
                        $this.totalCount = data.data.totalCount;
                        $(document).ready(function(){
                            var height = $('#rightTable').get(0).scrollHeight;
                            $('#leftMenu_Box').css('height', height)
                        });
                        if(data1.offset == 1 && data1.pageSize == 10){
                            $this.page()
                        }
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

        //接收器，接收上面的两个ID
        bus.$on("getCC", function(updata) {
            //注意this指向问题
            $this.addData($this.data2)
        });
    },
});
/*申请模版*/
Vue.component("v-template", {
    template: '#shade-template',
    data: function() {
        return {
            createChannelManagement:$api.createChannelManagement,
            editChannelManagement:$api.editChannelManagement,
            content:[],
            html:'',
            text:'',
            info:[],
            code:0,
            replenish:'',
            fileName:'',
            data1:[],
            showPrice:false,
            mapShow: true //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
        //   setTimeout(() => {
        layui.use(["form", "laypage"], function() {
            var form = layui.form;
            var laypage = layui.laypage;
            form.render();
            //监听提交
            $("#file").on("change",function (e) {
                var e = e || window.event;
                //获取 文件 个数 取消的时候使用
                var files = e.target.files;
                if(files.length>0){
                    // 获取文件名 并显示文件名
                    var fileName = files[0].name;
                    $this.fileName =fileName;
                }else{
                    //清空文件名
                    $("#file").val("");
                }
            });
            form.on('radio(sw_price)', function(data){
                //console.log(data.elem); //得到radio原始DOM对象
                //console.log(data.value); //被点击的radio的value值
                if(data.value == "其他"){
                    $this.showPrice = true
                }else{
                    $this.showPrice = false
                }
            });
            form.on("submit(demo7)", function(data) {
                //console.log(data.field)
                //console.log(JSON.stringify(data.field))
                $this.data1 = data.field
                $this.data1.channelDisReason = [];
                $("input:checkbox[name='channelDisReason']:checked").each(function() { // 遍历name=standard的多选框
                    $this.data1.channelDisReason.push($(this).val());
                });
                $this.data1.ismgId = '';
                $this.data1.operatorBalance = '';
                $.ajax({
                    url: $this.createChannelManagement,
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
            form.on("submit(demo8)", function(data) {
                //console.log(data.field)
                //console.log(JSON.stringify(data.field))
                $this.data1 = data.field
                $this.data1.channelDisReason = [];
                $("input:checkbox[name='channelDisReason']:checked").each(function() { // 遍历name=standard的多选框
                    $this.data1.channelDisReason.push($(this).val());
                });
                $this.data1.ismgId = '';
                $this.data1.operatorBalance = '';
                $.ajax({
                    url: $this.editChannelManagement,
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

        //}, 100);
    },
    methods: {
        shanchu:function(){
            var $this = this;
            $this.info = [];
            $("#shade").fadeOut(300);
            $(".shade_con").fadeOut(300);
        },
    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getAid", function(updata) {
            //注意this指向问题
            //  console.log(updata)
            $this.code = updata.code;
            $this.info = updata.Info;
            $('.layui-tab-title li').removeClass('layui-this');
            $('.sw_cc').addClass('layui-this');
            $('.layui-tab-item').removeClass('layui-show');
            $('.sw_ww').addClass('layui-show');
            var channelLocalProvince = document.getElementsByName("channelLocalProvince");
            var channelType = document.getElementsByName("channelType");
            var channelLocalOperator = document.getElementsByName("channelLocalOperator");
            var channelSupportOperator = document.getElementsByName("channelSupportOperator");
            var channelCharacter = document.getElementsByName("channelCharacter");
            var channelStatus = document.getElementsByName("channelStatus");
            var interProtocol = document.getElementsByName("interProtocol");
            var billMethods = document.getElementsByName("billMethods");
            var billType = document.getElementsByName("billType");
            var lmsSupport = document.getElementsByName("lmsSupport");
            var lmsSignType = document.getElementsByName("lmsSignType");
            var receIsSupport = document.getElementsByName("receIsSupport");
            var receReportSupport = document.getElementsByName("receReportSupport");
            var signType = document.getElementsByName("signType");
            var signReplace = document.getElementsByName("signReplace");
            var signWhether = document.getElementsByName("signWhether");
            var codeChildType = document.getElementsByName("codeChildType");
            var limitArriveProv = document.getElementsByName("limitArriveProv");
            var limitEnableTime = document.getElementsByName("limitEnableTime");
            var limitSendProfession = document.getElementsByName("limitSendProfession");
            var limitSendVerify = document.getElementsByName("limitSendVerify");
            var limitSendMarketing = document.getElementsByName("limitSendMarketing");
            var limitPersonalAudit = document.getElementsByName("limitPersonalAudit");
            if( $this.info.channelDisReason != null){
                var channelDisReason = $this.info.channelDisReason.split(",");
                //console.log(channelDisReason)
                $('[name="channelDisReason"]').prop('checked', false);
                for (var i = 0; i < channelDisReason.length; i++) {
                    //选中checkbox
                    //console.log(channelDisReason[i])
                    let chanelName = channelDisReason[i].trim();
                    $('[name="channelDisReason"][value="' + chanelName + '"]').prop('checked', true);
                };
            }else{
                    //选中checkbox
                    $('[name="channelDisReason"]').prop('checked', false);
            }

            if($this.info.channelLocalProvince != null){
                for (var i = 0; i < channelLocalProvince.length; i++) {
                    if( $this.info.channelLocalProvince == channelLocalProvince[i].value){
                        $(channelLocalProvince[i]).next().click();
                    }
                };
            }else{
                for (var i = 0; i < channelLocalProvince.length; i++) {
                    channelLocalProvince[i].checked = false;
                };
            }
            for (var i = 0; i < channelType.length; i++) {
                if( $this.info.channelType == channelType[i].value){
                    $(channelType[i]).next().click();
                }
            };
            for (var i = 0; i < channelLocalOperator.length; i++) {
                if( $this.info.channelLocalOperator == channelLocalOperator[i].value){
                    $(channelLocalOperator[i]).next().click();
                }
            };
            for (var i = 0; i < channelSupportOperator.length; i++) {
                if( $this.info.channelSupportOperator == channelSupportOperator[i].value){
                    $(channelSupportOperator[i]).next().click();
                }
            };
            for (var i = 0; i < channelCharacter.length; i++) {
                if( $this.info.channelCharacter == channelCharacter[i].value){
                    $(channelCharacter[i]).next().click();
                }
            };
            for (var i = 0; i < channelStatus.length; i++) {
                if( $this.info.channelStatus == channelStatus[i].value){
                    $(channelStatus[i]).next().click();
                }
            };
            for (var i = 0; i < interProtocol.length; i++) {
                if( $this.info.interProtocol == interProtocol[i].value){
                    $(interProtocol[i]).next().click();
                }
            };
            for (var i = 0; i < billMethods.length; i++) {
                if( $this.info.billMethods == billMethods[i].value){
                    $(billMethods[i]).next().click();
                }
            };
            for (var i = 0; i < billType.length; i++) {
                if( $this.info.billType == billType[i].value){
                    $(billType[i]).next().click();
                }
            };
            for (var i = 0; i < lmsSupport.length; i++) {
                if( $this.info.lmsSupport == lmsSupport[i].value){
                    $(lmsSupport[i]).next().click();
                }
            };
            for (var i = 0; i < lmsSignType.length; i++) {
                if( $this.info.lmsSignType == lmsSignType[i].value){
                    $(lmsSignType[i]).next().click();
                }
            };
            for (var i = 0; i < receIsSupport.length; i++) {
                if( $this.info.receIsSupport == receIsSupport[i].value){
                    $(receIsSupport[i]).next().click();
                }
            };
            for (var i = 0; i < receReportSupport.length; i++) {
                if( $this.info.receReportSupport == receReportSupport[i].value){
                    $(receReportSupport[i]).next().click();
                }
            };
            for (var i = 0; i < signType.length; i++) {
                if( $this.info.signType == signType[i].value){
                    $(signType[i]).next().click();
                }
            };
            for (var i = 0; i < signReplace.length; i++) {
                if( $this.info.signReplace == signReplace[i].value){
                    $(signReplace[i]).next().click();
                }
            };
            for (var i = 0; i < signWhether.length; i++) {
                if( $this.info.signWhether == signWhether[i].value){
                    $(signWhether[i]).next().click();
                }
            };
            for (var i = 0; i < codeChildType.length; i++) {
                if( $this.info.codeChildType == codeChildType[i].value){
                    $(codeChildType[i]).next().click();
                }
            };
            for (var i = 0; i < limitArriveProv.length; i++) {
                if( $this.info.limitArriveProv == limitArriveProv[i].value){
                    $(limitArriveProv[i]).next().click();
                }
            };
            for (var i = 0; i < limitEnableTime.length; i++) {
                if( $this.info.limitEnableTime == limitEnableTime[i].value){
                    $(limitEnableTime[i]).next().click();
                }
            };
            for (var i = 0; i < limitSendProfession.length; i++) {
                if( $this.info.limitSendProfession == limitSendProfession[i].value){
                    $(limitSendProfession[i]).next().click();
                }
            };
            for (var i = 0; i < limitSendVerify.length; i++) {
                if( $this.info.limitSendVerify == limitSendVerify[i].value){
                    $(limitSendVerify[i]).next().click();
                }
            };
            for (var i = 0; i < limitSendMarketing.length; i++) {
                if( $this.info.limitSendMarketing == limitSendMarketing[i].value){
                    $(limitSendMarketing[i]).next().click();
                }
            };
            for (var i = 0; i < limitPersonalAudit.length; i++) {
                if( $this.info.limitPersonalAudit == limitPersonalAudit[i].value){
                    $(limitPersonalAudit[i]).next().click();
                }
            };
            layui.use("form", function() {
                var form = layui.form;
                form.render();
            })
        });
    },
});
