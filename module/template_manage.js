/**
 * Created by Administrator on 2019/2/19 0019.
 */
/*订单列表*/
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
if(show_button(2131312)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-order-manage", {
    template:'#order-template',
    data: function () {
        return {
            sellerid: "",
            queryUserName: $api.queryUserName,
            userData: UserName,
            content:BizType,
            code: 0,
            allData:[],
            totalCount:'0',
            mapShow: true //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
       // setTimeout(() => {
            layui.use(["form", "laypage","upload"], function () {
                var form = layui.form;
                var laypage = layui.laypage;
                var upload = layui.upload;
                form.render();
                //完整功能
                laypage.render({
                    elem: "page",
                    count: 0,
                    layout: ["prev", "page", "next", "limit", "skip"],
                    limits:[10,30,50,100,1000],
                    groups: 5,
                    prev: "<",
                    next: ">",
                    jump: function (obj) {
                        //console.log(obj);
                    }
                });
                //监听提交
                form.on("submit(demo11)", function (data) {
                   // console.log(JSON.stringify(data.field));
                    return false;
                });
            });
            $('.table_tou h6').on('click', function () {
                $(this).addClass('addClass2').siblings().removeClass('addClass2')
                if ($(this).text() == '模板列表') {
                    $this.code = 0;
                    $('.table_nav  form .list2').addClass('dn')
                    $('.table_nav  form .list').removeClass('dn')
                } else if ($(this).text() == '二次审核模板') {
                    $this.code = 1
                    $('.table_nav  form .list').addClass('dn')
                    $('.table_nav  form .list2').removeClass('dn')

                }
                $(document).ready(function(){
                    var height = $('#rightTable').get(0).scrollHeight;
                    //console.log(height);
                    $('#leftMenu_Box').css('height',height)
                });
            })
      //  }, 100);
    },
    methods: {
        shade:function(){
            $("#shade").fadeIn(300);
            $(".shade_con").fadeIn(300);
        },
        shadeTwo:function(){
            $("#shade4").fadeIn(300);
            $("#shade4 .shade_con3").fadeIn(300);
            var updata = {
                code: 0,
                num:0
            };
            //console.log(updata);
            // 将选中的ID放到触发器的盆子里，下面拿着用
            bus.$emit("getCode", updata);
        },
        amend:function(){
            $("#shade1").fadeIn(300);
            $(".shade_con1").fadeIn(300);
        },
        amendTwo:function(){
            $("#shade4").fadeIn(300);
            $("#shade4 .shade_con3").fadeIn(300);
            var updata = {
                code: 0,
                num:1
            };
            //console.log(updata);
            // 将选中的ID放到触发器的盆子里，下面拿着用
            bus.$emit("getCode", updata);
        },
        shanchu:function(){
            $("#shade3").fadeOut(300);
            $(".shade_con3").fadeOut(300);
        },
        del:function(){
            $("#shade3").fadeIn(300);
            $(".tips2").fadeIn(300);
        },
        imports:function(){
            $("#shade3").fadeIn(300);
            $(".shade_con3").fadeIn(300);
        },
        importTwo:function(){
            $("#shade4").fadeIn(300);
            $("#shade4 .shade_con3").fadeIn(300);
            var updata = {
                code: 1,
                num:2
            };
            //console.log(updata);
            // 将选中的ID放到触发器的盆子里，下面拿着用
            bus.$emit("getCode", updata);

        },
        sw_btnsuss:function(){
            $(".tips_chid2").fadeIn(300);
            $(".tips2").fadeOut(300);
        },
        sw_btnwrong:function(){
            $("#shade3").fadeOut(300);
            $(".tips2").fadeOut(300);
        },
        sw_qued:function(){
            $("#shade3").fadeOut(300);
            $(".tips_chid2").fadeOut(300);
        }
    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getAid", function (updata) {
            //注意this指向问题
            $this.sellerid = updata.sellerid;
            $this.auctionid = updata.auctionid;
        });
    },
});
/*申请模版*/
Vue.component("v-template", {
    template:'#shade-template',
    data: function () {
        return {
            sellerid: "",
            url: $api.templateApply,
            repulse: $api.repulseTemplateApply,
            removeTemplate: $api.removeTemplate,
            againTemplate: $api.againTemplate,
            html: '',
            text: '',
            satus: '',
            code: 0,
            replenish: '',
            showData: {
                loginName: "",
                miguMobile: '',
                modWord: "",
                remark: '',
                templateSms: "",
                templateType: ""
            },
            mapShow: true //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
      //  setTimeout(() => {
            layui.use(["form", "laypage"], function () {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                window.editor = KindEditor.create('#editor_id', {
                    allowImageRemote: false,
                    items: [
                        'forecolor', 'removeformat'
                    ]
                });
                editor.html('');
                editor.sync();

                //监听提交
                form.on('radio(a)', function (data) {
                    //console.log(data.elem); //得到radio原始DOM对象
                    //console.log(data.value); //被点击的radio的value值
                    if (data.value == "是") {
                        $('.layui-inline .phone').attr("disabled", false).css('background', ' #fff');
                    } else {
                        $('.layui-inline .phone').attr("disabled", true).css('background', ' #ECECEC');
                        $('.layui-inline .phone').val('');
                    }
                });
                form.on("submit(demo6)", function (data) {
                    // console.log(data);
                    $this.html = editor.html();
                    $this.text = editor.text();
                    data.field.templateSms = $this.text;
                    data.field.modWord = $this.html;
                    //data.field.templateType = data.field.templateType * 1;
                    delete data.field.a;
                    if ($this.html == '') {
                        $this.mapShow = false
                    } else {
                        $this.mapShow = true
                        $.ajax({
                            url: $this.url,
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
                                //$this.allData = data.data.data;
                                // console.log($this.allData);
                                // $this.totalCount = data.data.totalCount
                            },
                            error: function (err) {
                                console.log(err);
                            }
                        });
                    }
                    $(".tips").fadeIn(500);
                    $(".shade_con").fadeOut(500);
                    return false;
                });

            });

      //  }, 100);
    },
    methods: {
        shanchu:function(){
            $("#shade").fadeOut(500);
            $(".shade_con").fadeOut(500);
        },
        submit:function(){
            var $this = this;
            layui.use("form", function () {
                var form = layui.form;
                form.on("submit(demo7)", function (data) {
                   // console.log(data);
                    $.ajax({
                        url: $this.repulse,
                        type: 'post',
                        dataType: 'json',
                        contentType: 'application/json',
                        async: false,
                        data: JSON.stringify({
                            "auditMark": data.field.replenish + ";" + data.field.con,
                            "templateId": $this.replenish
                        }),
                        headers: {
                            "Authorization": id,
                        },
                        success: function (data) {
                            // console.log(data);
                            window.open("../../html/workbench/template.html", "_self");
                            //$this.allData = data.data.data;
                            // console.log($this.allData);
                            // $this.totalCount = data.data.totalCount
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                    return false;
                });
            })

        },
        sw_btnsuss:function(){
            var $this = this;
            $("#shade").fadeOut(500);
            $(".tips").fadeOut(500);
            if ($this.mapShow == true) {
                window.open("../../html/workbench/template.html", "_self");
            }
        },
        quxiao:function(){
            $(".tips1").fadeOut(500);
            $(".shade_con").fadeIn(500);
        },
        sw_btnwrong:function(){
            $(".tips").fadeOut(500);
            $(".shade_con").fadeIn(500);
        },
        refuse:function(aa){
            var $this = this;
            $this.replenish = aa;
            //console.log(aa)
            layer.msg('你确定要拒绝么？', {
                time: 0 //不自动关闭
                , btn: ['确定', '取消']
                , yes: function (index) {
                    layer.close(index);
                    $(".shade_con").fadeOut(500);
                    $(".tips1").fadeIn(500);
                }
            });
        },
        remove:function(val){
            var $this = this;
            $.ajax({
                url: $this.removeTemplate,
                type: 'post',
                async: false,
                data: {
                    "templateId": val
                },
                headers: {
                    "Authorization": id,
                },
                success: function (data) {
                  //  console.log(data);
                    window.open("../../html/workbench/template.html", "_self");
                    //$this.allData = data.data.data;
                    // console.log($this.allData);
                    // $this.totalCount = data.data.totalCount
                },
                error: function (err) {
                    console.log(err);
                }
            });
        },
        again:function(val){
            var $this = this;
            layui.use("form", function () {
                var form = layui.form;
                form.on("submit(demo9)", function (data) {
                    $this.html = editor.html();
                    $this.text = editor.text();
                    data.field.templateSms = $this.text;
                    data.field.modWord = $this.html;
                    data.field.templateId = val;
                    delete data.field.a;
                    $.ajax({
                        url: $this.againTemplate,
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
                            window.open("../../html/workbench/template.html", "_self");
                            //$this.allData = data.data.data;
                            // console.log($this.allData);
                            // $this.totalCount = data.data.totalCount
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    });
                    return false;
                });
            })
        }
    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getAid", function (updata) {
            //注意this指向问题
          //  console.log(updata)
            $this.code = updata.code;
            $this.showData = updata.Info;
            $this.satus = updata.satus;
            editor.html($this.showData.modWord);
            // $("#eventLevel option").attr("selected",false);
            $("#eventLevel option[value='" + $this.showData.templateType + "']").prop("selected", "selected");
            layui.use("form", function () {
                var form = layui.form;
                form.render();
            })

        });
    },
});
//模板匹配
Vue.component("v-marry", {
    template:'#marry-template',
    data: function () {
        return {
            sellerid: "",
            url: $api.SPTarget,
            allData: [
                {
                    id: "10004",
                    username: "杜甫",
                    email: "xianxin@layui.com",
                    sex: "男",
                    city: "浙江杭州",
                    sign: "人生恰似一场修行",
                    experience: "116",
                    ip: "192.168.0.8",
                    logins: "108",
                    joinTime: "2016-10-14"
                },
                {
                    id: "10001",
                    username: "杜甫",
                    email: "xianxin@layui.com",
                    sex: "男",
                    city: "浙江杭州",
                    sign: "人生恰似一场修行",
                    experience: "116",
                    ip: "192.168.0.8",
                    logins: "108",
                    joinTime: "2016-10-14"
                },
                {
                    id: "10001",
                    username: "杜甫",
                    email: "xianxin@layui.com",
                    sex: "男",
                    city: "浙江杭州",
                    sign: "人生恰似一场修行",
                    experience: "116",
                    ip: "192.168.0.8",
                    logins: "108",
                    joinTime: "2016-10-14"
                },
                {
                    id: "10001",
                    username: "杜甫",
                    email: "xianxin@layui.com",
                    sex: "男",
                    city: "浙江杭州",
                    sign: "人生恰似一场修行",
                    experience: "116",
                    ip: "192.168.0.8",
                    logins: "108",
                    joinTime: "2016-10-14"
                }
            ],
            mapShow: true //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
        //setTimeout(() => {
            layui.use(["form", "laypage"], function () {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //完整功能
                laypage.render({
                    elem: "page1",
                    count: 100,
                    layout: ["prev", "page", "next", "limit", "skip"],
                    groups: 9,
                    prev: "<",
                    next: ">",
                    jump: function (obj) {
                        //console.log(obj);
                    }
                });
                //监听提交
                form.on("submit(demo9)", function (data) {
                   // console.log(data);
                    $(".shade_con1").fadeOut(500);
                    $("#shade1 .tips").fadeIn(500);
                    return false;
                });
            });
      //  }, 100);
    },
    methods: {
        shanchu:function(){
            $("#shade1").fadeOut(500);
            $(".shade_con1").fadeOut(500);
        },
        appoint:function(){
            $("#select").fadeIn(500);
            $(".shade_con2").fadeIn(500);
        },
        sw_btnwrong:function(){
            $("#shade1").fadeOut(500);
            $(".shade_con1").fadeOut(500);
        },
        sw_btnsuss:function(){
            $("#shade1").fadeOut(500);
            $("#shade1 .tips").fadeOut(500);
        }
    },
    created:function() {
        var $this = this;

        //接收器，接收上面的两个ID
        bus.$on("getAid", function (updata) {
            //注意this指向问题
            $this.sellerid = updata.sellerid;
            $this.auctionid = updata.auctionid;
        });
    },
});
//指定用户
Vue.component("v-select", {
    template:'#select-template',
    data: function () {
        return {
            sellerid: "",
            url: $api.SPTarget,
            mapShow: true //显示无数据图片
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
                form.on("submit(demo8)", function (data) {
                   // console.log(data);
                    return false;
                });
            });
      //  }, 100);
    },
    methods: {
        shanchu:function(){
            $("#select").fadeOut(500);
            $(".shade_con2").fadeOut(500);
        },
        moveRight:function(){
            var lists = $('#select .select_bor .leftSele p');
            var html;
            for (var i = 0; i < lists.length; i++) {
                var ele = lists[i];
                if ($(ele).attr('class') == 'addClass4') {
                    html = $(ele).html();
                    $(ele).remove();
                    break;
                }
            }
            if (html !== undefined) {
                html = '<p>' + html + '</p>';
                $('#select .select_bor .rightSele div').append(html);
            } else {
                layer.msg('请选择左边用户', {
                    icon: 2,
                    time: 1500 //2秒关闭（如果不配置，默认是3秒）
                });
            }

        },
        moveLeft:function(){
            var lists = $('#select .select_bor .rightSele p');
            var html;
            for (var i = 0; i < lists.length; i++) {
                var ele = lists[i];
                if ($(ele).attr('class') == 'addClass4') {
                    html = $(ele).html();
                    $(ele).remove();
                    break;
                }
            }
            if (html !== undefined) {
                html = '<p>' + html + '</p>';
                $('#select .select_bor .leftSele div').append(html)
            } else {
                layer.msg('请选择右边用户', {
                    icon: 2,
                    time: 1500 //2秒关闭（如果不配置，默认是3秒）
                });
            }

        },
        allRight:function(){
            var html = $('#select .select_bor .leftSele div').html();
            $('#select .select_bor .leftSele div p').remove();
            $('#select .select_bor .rightSele div').append(html)
        },
        allLeft:function(){
            var html = $('#select .select_bor .rightSele div').html();
            $('#select .select_bor .rightSele div p').remove();
            $('#select .select_bor .leftSele div').append(html)
        }
    },
    created:function() {
        var $this = this;

        //接收器，接收上面的两个ID
        bus.$on("getAid", function (updata) {
            //注意this指向问题
            $this.sellerid = updata.sellerid;
            $this.auctionid = updata.auctionid;
        });
    },
});
//新增模板
Vue.component("v-manage", {
    template:'#manage-template',
    data: function () {
        return {
            sellerid: "",
            url: $api.SPTarget,
            mapShow: true, //显示无数据图片
            code: 0,
            num:0,
            allData: [
                {
                    id: "10004",
                    username: "杜甫",
                    email: "xianxin@layui.com",
                    sex: "男",
                    city: "浙江杭州",
                    sign: "人生恰似一场修行",
                    experience: "116",
                    ip: "192.168.0.8",
                    logins: "108",
                    joinTime: "2016-10-14"
                }
            ]
        };
    },
    mounted:function() {
        var $this = this;
       // setTimeout(() => {
            layui.use(["form", "laypage"], function () {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //监听提交
                form.on("submit(demo6)", function (data) {

                    return false;
                });
                form.on("submit(demo7)", function (data) {

                    return false;
                });
            });
       // }, 100);
    },
    methods: {
        shanchu:function() {
            $("#shade4").fadeOut(500);
            $(".shade_con3").fadeOut(500);
        },
        sw_btnwrong:function(){
            $("#shade3").fadeOut(500);
            $(".shade_con3").fadeOut(500);
        }
    },
    created:function() {
        var $this = this;
        //接收器，接收上面的两个ID
        bus.$on("getCode", function (updata) {
            //注意this指向问题
            $this.code = updata.code;
            $this.num = updata.num;
           // console.log($this.num)
           // setTimeout(() => {
            setTimeout(function(){
                layui.use(["form", "laypage"], function () {
                    var form = layui.form;
                    var laypage = layui.laypage;
                    form.render();
                });
            }, 100);
         //   }, 50);
        });
    },
});
