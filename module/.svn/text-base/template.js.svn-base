/*模版申请列表*/
var id = $api.localStorageId;
//var name1 = localStorage.getItem('loginName');
//组件通信
var bus = new Vue();
var UserName=null;
$.ajax({
  url : $api.queryUserName,
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
    UserName = data.data;
    //console.log($this.userData);
    // $this.totalCount = data.data.totalCount
  },
  error : function(err){
    console.log(err);
  }
});
if(show_button(21014)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-send-detail", {
  template: '#right-template',
  data: function() {
    return {
      sellerid: "",
      templateApplyList: $api.templateApplyList,
      templateApplyInfo:$api.templateApplyInfo,
      allData:null,
      mapShow: true,//显示无数据图片
      showNo:false,
      data1:{
        "loginName": '',
        "templateId":'',
        "offset": 1,
        "pageSize": 10,
        "review": '',
        "templateSms": ''
      },
      totalCount:'0'
    };
  },
  mounted: function() {
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
        //监听提交
        form.on("submit(demo5)", function(data) {
         // console.log(JSON.stringify(data.field));
          $this.data1.loginName = data.field.loginName;
          $this.data1.templateId = data.field.templateId;
          $this.data1.review = data.field.review;
          $this.data1.templateSms = data.field.templateSms.trim();
          $this.data1.offset = 1;
          $this.data1.pageSize = 10;
          $this.addData($this.data1);

          return false;
        });
      });
    //}, 100);
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
            //console.log(obj);
            $this.data1.offset = obj.curr;
            $this.data1.pageSize = obj.limit;
            if(first){
              return
            }else{
              $this.addData($this.data1);
            }
          }
        });
      });

    },
    shade:function(){
      $("#shade").fadeIn(300);
      $(".shade_con").fadeIn(300);
      var updata = {
        Info:{
         // loginName: name1,
          miguMobile: '',
          modWord: "",
          remark: '',
          templateSms: "",
          templateType:"",
          auditName:""
        },
        code:0
      };
      //console.log(updata);
      // 将选中的ID放到触发器的盆子里，下面拿着用
      bus.$emit("getAid", updata);
    },
    mapping:function(a){
      var $this = this;
      $("#shade").fadeIn(300);
      $(".shade_con").fadeIn(300);
      $this.info(a,2);
    },
    examine:function(a,satus){
      var $this = this;
      $("#shade").fadeIn(300);
      $(".shade_con").fadeIn(300);
      if(satus == '-1'|| satus == '2'){
        satus = '-1';
      }
      $this.info(a,1,satus)
    },
    addData:function(data){
      var $this = this;
      $.ajax({
        url : $this.templateApplyList,
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
          //console.log(data);
          $("#load").remove();
          $this.allData = [];
          $this.totalCount = 0;
          if(res.statusCode == '401'){
            //localStorage.setItem('url', window.location.pathname)
            window.open("../../login.html", "_self");
          }else if(res.statusCode == '400'){
            $this.showNo = true
            layer.msg(res.message,{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
          } else{
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
    info:function(val,num,satus){
      var $this = this;
      $.ajax({
        url : $this.templateApplyInfo,
        type : 'post',
        async: false,
        data :{
          'templateId':val
        },
        headers : {
          "Authorization":id,
        },
        success : function(data){
         // console.log(data);
          // $this.allData = data.data.data;
          //console.log($this.allData);
          // $this.totalCount = data.data.totalCount
          var updata = {
            Info: data.data,
            code:num,
            satus:satus
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
  },
  created:function() {
    var $this = this;

    //接收器，接收上面的两个ID
    //bus.$on("getAid", function(updata) {
    //  //注意this指向问题
    //  $this.sellerid = updata.sellerid;
    //  $this.auctionid = updata.auctionid;
    //});
  },
});
  /*申请模版*/
  Vue.component("v-template", {
    template: '#shade-template',
    data: function() {
      return {
        url: $api.templateApply,
        repulse:$api.repulseTemplateApply,
        removeTemplate:$api.removeTemplate,
        againTemplate:$api.againTemplate,
        html:'',
        text:'',
        satus:'',
        code:0,
        replenish:'',
        userData:UserName,
        showData:{
          loginName: "",
          miguMobile: '',
          modWord: "",
          remark: '',
          templateSms: "",
          templateType: ""
        },
        showNo:false,
        mapShow: true //显示无数据图片
      };
    },
    mounted:function() {
      var $this = this;
      //setTimeout(() => {
      window.editor = KindEditor.create('#editor_id',{
        allowImageRemote : false,
        items: [
          'forecolor', 'removeformat'
        ]
      });
      editor.html('');
      editor.sync();
      layui.use(["form", "laypage"], function() {
        var form = layui.form;
        var laypage = layui.laypage;
        form.render();
        //监听提交
        form.on('radio(a)', function(data){
          //console.log(data.elem); //得到radio原始DOM对象
          //console.log(data.value); //被点击的radio的value值
          if(data.value == "是"){
            $('.layui-inline .phone').attr("disabled", false ).css('background',' #fff');
          }else{
            $('.layui-inline .phone').attr("disabled", true ).css('background',' #ECECEC');
            $('.layui-inline .phone').val('');
          }
        });
        form.on("submit(demo6)", function(data) {
          var text = $('.unlike2 .dropdown-selected').val();
          $this.html = editor.html();
          $this.text = editor.text();
          data.field.templateSms = $this.text;
          data.field.modWord = $this.html;
          data.field.templateType = data.field.templateType * 1;
          delete data.field.a;
          if (text == '') {
            layer.msg('请选择申请人！',{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
            return false;
          }else{
            verify_user(UserName,$(".unlike2 .dropdown-selected"),text,dataA)
          }
          function dataA(){
            data.field.userId =  $('.unlike2 .dropdown-selected').attr('data');
            $.ajax({
              url : $this.url,
              type : 'post',
              dataType : 'json',
              contentType: 'application/json',
              async: false,
              data : JSON.stringify(data.field),
              headers :{
                "Authorization":id,
              },
              success : function(data){
                // console.log(data);
                if(data.data == true){
                  layer.open({
                    content: data.message
                    ,yes: function(index){
                      layer.close(index);
                      window.open("../../html/workbench/template.html", "_self");
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
              },
              error : function(err){
                console.log(err);
              }
            });
          }

          return false;
        });
        form.on("submit(demo10)", function(data) {
          //console.log(data);
          $.ajax({
            url : $this.repulse,
            type : 'post',
            dataType : 'json',
            contentType: 'application/json',
            async: false,
            data : JSON.stringify({
              "auditMark": data.field.replenish +";"+ data.field.con,
              "templateId": $this.replenish
            }),
            headers :{
              "Authorization":id,
            },
            success : function(data){
              if(data.data == true){
                layer.open({
                  content: data.message
                  ,yes: function(index){
                    layer.close(index);
                    window.open("../../html/workbench/template.html", "_self");
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
            },
            error : function(err){
              console.log(err);
            }
          });
          return false;
        });
      });
      // }, 100);
    },
    methods: {
      shanchu:function(){
        $("#shade").fadeOut(300);
        $(".shade_con").fadeOut(300);
      },
      close:function(){
        $("#shade").fadeOut(300);
        $(".shade_con").fadeOut(300);
      },
      matching:function(){
        $("#shade").fadeOut(300);
        $(".shade_con").fadeOut(300);
        $("#shade3").fadeIn(300);
        $(".shade_con3").fadeIn(300);
      },
      //submit(){
      //  var $this =this;
      //  layui.use("form", function() {
      //    var form = layui.form;
      //
      //  })
      //
      //},
      //sw_btnsuss(){
      //  var $this = this;
      //  $("#shade").fadeOut(300);
      //  $(".tips").fadeOut(300);
      //  if( $this.mapShow == true){
      //    window.open("../html/workbench/template.html", "_self");
      //  }
      //},
      quxiao:function(){
        $(".tips1").fadeOut(300);
        $(".shade_con").fadeIn(300);
      },
      //sw_btnwrong(){
      //  $(".tips").fadeOut(300);
      //  $(".shade_con").fadeIn(300);
      //},
      refuse:function(aa){
        var $this = this;
        $this.replenish = aa;
        //console.log(aa)
        $(".shade_con").fadeOut(300);
        $(".tips1").fadeIn(300);
        //layer.msg('你确定要拒绝么？', {
        //  time: 0 //不自动关闭
        //  ,btn: ['确定', '取消']
        //  ,yes: function(index){
        //    layer.close(index);
        //
        //  }
        //});
      },
      remove:function(val){
        var $this = this;
        $.ajax({
          url : $this.removeTemplate,
          type : 'post',
          async: false,
          data : {
            "templateId": val
          },
          headers :{
            "Authorization":id,
          },
          success : function(data){
            //console.log(data);
            layer.open({
              content: data.message
              ,yes: function(index){
                layer.close(index);
                window.open("../../html/workbench/template.html", "_self");
              }
            });
          },
          error : function(err){
            console.log(err);
          }
        });
      },
      again:function(val){
        var $this =this;
        layui.use("form", function() {
          var form = layui.form;
          form.on("submit(demo9)", function(data) {
            console.log(data)
            $this.html = editor.html();
            $this.text = editor.text();
            data.field.templateSms = $this.text;
            data.field.modWord = $this.html;
            data.field.templateId = val;
            data.field.templateType = data.field.templateType*1
            delete data.field.a;
            $.ajax({
              url : $this.againTemplate,
              type : 'post',
              dataType : 'json',
              contentType: 'application/json',
              async: false,
              data : JSON.stringify(data.field),
              headers :{
                "Authorization":id,
              },
              success : function(data){
                console.log(data);
                if(data.data == true){
                  layer.open({
                    content: data.message
                    ,yes: function(index){
                      layer.close(index);
                      window.open("../../html/workbench/template.html", "_self");
                    }
                  });
                }else{
                  layer.open({
                    content: data.message
                    ,yes: function(index){
                      layer.close(index);
                      //window.open("../html/workbench/template.html", "_self");
                    }
                  });
                }


              },
              error : function(err){
                console.log(err);
                layer.open({
                  content: '系统错误！'
                  ,yes: function(index){
                    layer.close(index);
                    //window.open("../html/workbench/template.html", "_self");
                  }
                });
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
      bus.$on("getAid", function(updata) {
        //注意this指向问题
        //console.log(updata)
        $this.code = updata.code;
        $this.showData = updata.Info;
        $this.satus = updata.satus;
        window.editor.html($this.showData.modWord);
        // $("#eventLevel option").attr("selected",false);
        $("#eventLevel option[value='"+$this.showData.templateType+"']").prop("selected","selected");
        $('.dropdown-selected').val($this.showData.loginName)
        $('.dropdown-selected').attr('data',$this.showData.userId);
        layui.use("form", function() {
          var form = layui.form;
          form.render();
        })

      });
    },
  });
//模板匹配
  Vue.component("v-marry", {
    template: '#marry-template',
    data: function() {
      return {
        auditTemplateApply:$api.auditTemplateApply,
        editTemplateOrder:$api.editTemplateOrder,
        queryBizType:$api.queryBizType,
        getTemplateNameAndContent:$api.getTemplateNameAndContent,
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
        Info:[],
        mapShow: true //显示无数据图片
      };
    },
    mounted:function() {
      var $this = this;
      //setTimeout(() => {
      layui.use(["form", "laypage"], function() {
        var form = layui.form;
        var laypage = layui.laypage;
        form.render();
        //完整功能
        //监听提交
        form.on("submit(demo7)", function(data) {
          console.log(data);
          $this.sw_btnwrong();
          return false;
        });
      });
      //}, 100);
    },
    methods: {
      shanchu:function(){
        $("#shade1").fadeOut(300);
        $(".shade_con1").fadeOut(300);
      },
      appoint:function(){
        $("#select").fadeIn(300);
        $(".shade_con2").fadeIn(300);
      },
      sw_btnwrong:function(){
        $("#shade1").fadeOut(300);
        $(".shade_con1").fadeOut(300);
      }
    },
    created:function() {
      var $this = this;

      //接收器，接收上面的两个ID
      bus.$on("getAid", function(updata) {
        //注意this指向问题
        $this.sellerid = updata.sellerid;
        $this.auctionid = updata.auctionid;
      });
    },
  });
//指定用户
  Vue.component("v-select", {
    template: '#select-template',
    data: function() {
      return {
        sellerid: "",
        url: $api.SPTarget,
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
        //监听提交
        form.on("submit(demo8)", function(data) {
          console.log(data);
          return false;
        });
      });
      // }, 100);
    },
    methods: {
      shanchu:function(){
        $("#select").fadeOut(300);
        $(".shade_con2").fadeOut(300);
      },
      moveRight:function(){
        var lists = $('#select .select_bor .leftSele p');
        var html;
        for (var i = 0; i < lists.length; i++) {
          var ele = lists[i];
          if($(ele).attr('class')=='addClass4'){
            html = $(ele).html();
            $(ele).remove();
            break;
          }
        }
        if( html !== undefined ){
          html = '<p>'+ html +'</p>';
          $('#select .select_bor .rightSele div').append(html);
        }else{
          layer.msg('请选择左边用户',{
            icon:2,
            time: 1300 //2秒关闭（如果不配置，默认是3秒）
          });
        }

      },
      moveLeft:function(){
        var lists = $('#select .select_bor .rightSele p');
        var html;
        for (var i = 0; i < lists.length; i++) {
          var ele = lists[i];
          if($(ele).attr('class')=='addClass4'){
            html = $(ele).html();
            $(ele).remove();
            break;
          }
        }
        if( html !== undefined ){
          html = '<p>'+ html +'</p>';
          $('#select .select_bor .leftSele div').append(html)
        }else{
          layer.msg('请选择右边用户', {
            icon:2,
            time: 1300 //2秒关闭（如果不配置，默认是3秒）
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
      bus.$on("getAid", function(updata) {
        //注意this指向问题
        $this.sellerid = updata.sellerid;
        $this.auctionid = updata.auctionid;
      });
    },
  });
//下单限速新增修改
  Vue.component("v-rate", {
    template: '#rate-template',
    data: function() {
      return {
        userData1: [],
        queryUserName: $api.queryUserName,
        auditTemplateApply:$api.auditTemplateApply,
        editTemplateOrder:$api.editTemplateOrder,
        queryBizType:$api.queryBizType,
        getTemplateNameAndContent:$api.getTemplateNameAndContent,
        content:[],
        // content1:['拒绝','先审后发','先发后审','接受'],
        // content2:['不可用','可用','测试'],
        Info:[],
        mapShow: true, //显示无数据图片
        code:0,
        templateId:'',
        showData:null,
      };
    },
    mounted:function() {
      var $this = this;
      //setTimeout(() => {
      layui.use(["form", "laypage"], function() {
        var form = layui.form;
        var laypage = layui.laypage;
        form.render();
        //监听提交
        form.on("submit(demo11)", function(data) {
          //console.log(data)
          var data2 = data
          data2.field.actionType = data2.field.actionType*1
          //
          data2.field.statusInt = data2.field.statusInt*1
          data2.field.mergeType = data2.field.mergeType*1
          data2.field.templateId =  $this.Info.templateId*1
          data2.field.taskCount =  $this.Info.taskCount*1
          data2.field.taskPeriod =  $this.Info.taskPeriod*1
          data2.field.z2a  =  1
          //console.log(data2.field.bizType)
          if (data2.field.bizType == '') {
            layer.msg('内容分类不能为空！',{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
            return false;
          }else{
            data2.field.bizType = data2.field.bizType*1
          }
          var reg = /^[0-9]*$/;
          if (!reg.test(data2.field.priority) || data2.field.priority == '') {
            layer.msg('优先级必填数字，不能为空！',{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
            return false;
          }
          var text = $(".dropdown1 .dropdown-selected1").val();
          if(text == ''){
            layer.msg('用户名不能为空！',{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
            return false;
          }else{
            verify_user(UserName,$(".dropdown1 .dropdown-selected1"),text,dataA)
            function dataA(){
              data2.field.userId = $(".dropdown1 .dropdown-selected1").attr('data');
              if(data2.field.userId != ''){
                $.ajax({
                  url : $this.auditTemplateApply,
                  type : 'post',
                  dataType : 'json',
                  contentType: 'application/json',
                  async: false,
                  data : JSON.stringify(data2.field),
                  headers : {
                    "Authorization":id,
                  },
                  success : function(data){
                  //  console.log(data);
                    if(data.data == true){
                      layer.open({
                        content: data.message
                        ,yes: function(index){
                          layer.close(index);
                          window.open("../../html/workbench/template.html", "_self");
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
                      window.open("../../login.html", "_self");
                    }
                  },
                  error : function(err){
                    console.log(err);
                  }
                });
              }
            }
          }
          return false;
        });
      });
      // }, 100);
    },
    methods: {
      shanchu:function() {
        $("#shade3").fadeOut(500);
        $(".shade_con3").fadeOut(500);
      },
      close:function(){
        $("#shade3").fadeOut(500);
        $(".shade_con3").fadeOut(500);
      },
    },
    created:function() {
      var $this = this;
      $.ajax({
        url : $this.queryBizType,
        type : 'post',
        async: false,
        data :{
        },
        headers : {
          "Authorization":id,
        },
        success : function(data){
          //console.log(data);
          $this.content = data.data;
          //console.log($this.userData);
          // $this.totalCount = data.data.totalCount
        },
        error : function(err){
          console.log(err);
        }
      });
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
          $this.userData1 = data.data;
          //console.log($this.userData);
          // $this.totalCount = data.data.totalCount
        },
        error : function(err){
          console.log(err);
        }
      });
      //接收器，接收上面的两个ID
      bus.$on("getAid", function(updata) {
        //注意this指向问题
        //console.log(updata)
        $this.code = updata.code;
        $this.Info = updata.Info;
        //console.log($this.Info)
        if($this.Info.modWord !== ''){
          $.ajax({
            url : $this.getTemplateNameAndContent,
            type : 'post',
            async: false,
            data :{
              'smsContent':$this.Info.modWord
            },
            headers : {
              "Authorization":id,
            },
            success : function(data){
              //console.log(data);
              $this.Info.templateName = data.data.templateName
              $this.Info.templateCotent = data.data.templateCotent
              // $this.userData1 = data.data;
              //console.log($this.userData);
              // $this.totalCount = data.data.totalCount
            },
            error : function(err){
              console.log(err);
            }
          });
        }

        //setTimeout(() => {
        $('.dropdown-selected1').val($this.Info.loginName)
        layui.use("form", function() {
          var form = layui.form;
          form.render();
        })
        // }, 50);
      });
    },
  });


