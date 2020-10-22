/**
 * Created by addistrator on 2019/2/17 0017.
 */
/*接单模板*/
var id = $api.localStorageId;
//组件通信
var bus = new Vue();
if(show_button(21315)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-order-fail", {
    template: '#order-template',
    data: function() {
        return {
            queryUserName:$api.queryUserName,
            TemplateOrderList: $api.TemplateOrderList,
            testSendMsg: $api.testSendMsg,
            userData:[],
            Info:[],
            message:'',
            mapShow: true //显示无数据图片
        };
    },
    mounted:function() {
        var $this = this;
      //  setTimeout(() => {
            layui.use(["form", "laypage"], function() {
                var form = layui.form;
                var laypage = layui.laypage;
                form.render();
                //完整功能
                //监听提交
                form.on("submit(demo)", function(data) {
                  //  console.log(data)
                    var text = $(".dropdown .dropdown-selected").val();
                    if (text == '') {
                        data.field.userid = ''
                        $this.Info.loginName = ''
                    } else {
                        if(verify_user1($this.userData,$(".dropdown .dropdown-selected"),text)){
                            data.field.userid = $(".dropdown .dropdown-selected").attr('data');
                            $this.Info.loginName = text
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }

                    }
                    if (data.field.phone !== '') {
                        var re = /^1\d{10}$/;
                        if(!re.test(data.field.phone)){
                            layer.alert('手机号码不正确！', { icon: 2 });
                            return false;
                        }
                    }
                    data.field.doType = 0;
                   // console.log($this.Info)
                    $.ajax({
                        url : $this.testSendMsg,
                        type : 'post',
                        dataType : 'json',
                        contentType: 'application/json',
                        async: false,
                        data : JSON.stringify(data.field),
                        headers : {
                            "Authorization":id,
                        },
                        success : function(res){
                            //console.log(res)
                            if(res.statusCode == '401'){
                                //localStorage.setItem('url', window.location.pathname)
                                window.open("../../login.html", "_self");
                            }else if(res.statusCode == '400'){
                                layer.open({
                                    content:  res.message
                                    ,yes: function(index){
                                        layer.close(index);
                                    }
                                });
                            }
                            $this.message = res.data
                        },
                        error : function(err){
                            console.log(err);
                        }
                    });
                    return false;
                });
                form.on("submit(demo1)", function(data) {
                    var text = $(".dropdown .dropdown-selected").val();
                    if (text == '') {
                        data.field.userid = ''
                        $this.Info.loginName = ''
                    } else {
                        if(verify_user1($this.userData,$(".dropdown .dropdown-selected"),text)){
                            data.field.userid = $(".dropdown .dropdown-selected").attr('data');
                            $this.Info.loginName = text
                        }else{
                            layer.msg('请选择下拉框内容！',{
                                icon:2,
                                time: 1300 //2秒关闭（如果不配置，默认是3秒）
                            });
                            return false;
                        }
                    }
                    if (data.field.phone !== '') {
                        var re = /^1\d{10}$/;
                        if(!re.test(data.field.phone)){
                            layer.alert('手机号码不正确！', { icon: 2 });
                            return false;
                        }
                    }

                    data.field.doType = 1;
                    $.ajax({
                        url : $this.testSendMsg,
                        type : 'post',
                        dataType : 'json',
                        contentType: 'application/json',
                        async: false,
                        data : JSON.stringify(data.field),
                        headers : {
                            "Authorization":id,
                        },
                        success : function(res){
                            //console.log(res)
                            if(res.statusCode == '401'){
                                //localStorage.setItem('url', window.location.pathname)
                                window.open("../../login.html", "_self");
                            }else{
                                $this.message = res.data
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

    },
    created:function() {
        var $this = this;
        $.ajax({
            url : $this.queryUserName,
            type : 'post',
            async: false,
            data :{
                'loginName':""
            },
            headers : {
                "Authorization":id,
            },
            success : function(data){
                //console.log(data);
                $this.userData = data.data;
                //console.log($this.userData);
                // $this.totalCount = data.data.totalCount
            },
            error : function(err){
                console.log(err);
            }
        });
        if(localStorage.getItem('templateId') == undefined){
            return
        }else{
            $.ajax({
                url : $this.TemplateOrderList,
                type : 'post',
                dataType : 'json',
                contentType: 'application/json',
                async: false,
                data :JSON.stringify({
                    'templateId':localStorage.getItem('templateId')
                }),
                headers : {
                    "Authorization":id,
                },
                success : function(data){
                    //console.log(data);
                    $this.Info = data.data.data[0];
                    $(".dropdown .dropdown-selected").attr('data',$this.Info.userId);
                    localStorage.removeItem("templateId");
                },
                error : function(err){
                    console.log(err);
                }
            });
        };

    },
});


