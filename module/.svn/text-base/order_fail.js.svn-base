/*下单失败*/
var id = $api.localStorageId;
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
 //左侧菜单组件实例化
Vue.component("v-order-fail", {
  template: '#right-template',
  data: function() {
    return {
      url: $api.orderFailList,
      queryUserName:$api.queryUserName,
      orderFailListExcelOut:$api.orderFailListExcelOut,
      data1:{
        "content": "",
        "endDate": getDay(0)+' 23:59:59',
        "startDate": getDay(0)+' 00:00:00',
        "errorCode": "",
        "offset": 1,
        "pageSize": 10,
        "phone": "",
        "userName": ""
      },
      totalCount:'0',
      allData: [],
      userData:UserName,
      mapShow: false //显示无数据图片
    };
  },
  mounted:function(){
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
      form.on("submit(demo)", function(data) {
        var text = $(".dropdown .dropdown-selected").val();
        if(text == ''){
          $this.data1.userName = ''
        }else{
         verify_user(UserName,$(".dropdown .dropdown-selected"),text)
          $this.data1.userName = $(".dropdown .dropdown-selected").attr('data')
        }
        $this.data1.startDate = data.field.startDate;
        $this.data1.endDate = data.field.endDate;
        $this.data1.phone = data.field.phone;
        $this.data1.content = data.field.content.trim();
        $this.data1.errorCode = data.field.errorCode;
        delete $this.data1.exp;
        delete $this.data1.expTitle;
        $this.data1.offset = 1;
        $this.data1.pageSize = 10;
        $this.addData($this.data1);
        return false;
      });
    });
    //}, 100);
  },
  methods: {
    del:function() {

    },
    importFile:function(){
      var $this =this;
      $this.data1.offset = 0;
      $this.data1.pageSize = 0;
      $this.data1.expTitle = '下单失败';
      $this.data1.exp = 'true';
      $.ajax({
        url : $this.url,
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
    shade:function(){
      $("#shade").fadeIn(300);
      $(".shade_con").fadeIn(300);
      var updata = {
        obj: {
          "endDate": getDay(0)+' 23:59:59',
          "startDate": getDay(0)+' 00:00:00',
          "errorCode": "",
          "offset": 1,
          "pageSize": 10,
         // "msisdn": "",
          "userId": ""
        }
      };
      //console.log(updata);
      // 将选中的ID放到触发器的盆子里，下面拿着用
      bus.$emit("getBb", updata);
    },
    page: function(){
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
            //console.log(obj);
            if (first) {
              return
            } else {
              $this.data1.offset = obj.curr;
              $this.data1.pageSize = obj.limit;
              $this.addData($this.data1);

            }
          }
        });
      });

    },
    mapping: function(login,word){
      $("#shade1").fadeIn(300);
      $(".shade_con1").fadeIn(300);
      var updata = {
        Info:{
           loginName: login,
          modWord: word,
        }
      };
      //console.log(updata);
      // 将选中的ID放到触发器的盆子里，下面拿着用
      bus.$emit("getAid", updata);
    },
    addData:function(data){
      var $this = this;
      $.ajax({
        url : $this.url,
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
        complete: function () {
          $("#load").remove();
        },
        success : function(res){
         // console.log(res);
          $("#load").remove();
          $this.allData = [];
          $this.totalCount = 0;
          if (res.statusCode == '401') {
            window.open("../../login.html", "_self");
          }else if(res.statusCode == '400'){
            $this.mapShow = true
            layer.msg(res.message,{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
          }  else {
            $this.allData = res.data.data;
            if($this.allData == ''){
              $this.mapShow = true
            }else{
              $this.mapShow = false
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
    bus.$on("getAid", function(updata) {
      //注意this指向问题
      $this.sellerid = updata.sellerid;
      $this.auctionid = updata.auctionid;
    });

  },
});
/*查询统计*/
Vue.component("v-tong-ji", {
  template: '#tong-template',
  data: function() {
    return {
      userData:UserName,
      orderFailTotalList: $api.orderFailTotalList,
      orderFailTotalListExcelOut: $api.orderFailTotalListExcelOut,
      allData1: [],
      data1:{
        "endDate": getDay(0)+' 23:59:59',
        "startDate": getDay(0)+' 00:00:00',
        "errorCode": "",
        "offset": 1,
        "pageSize": 10,
     //   "msisdn": "",
        "userId": ""
      },
      mapShow1: false //显示无数据图片
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

      //监听提交
      form.on("submit(demo4)", function(data) {
        var text = $(".unlike1 .dropdown-selected1").val();
        $this.data1 = data.field;
        if(text == ''){
          $this.data1.userId = ''
        }else{
          verify_user(UserName,$(".unlike1 .dropdown-selected1"),text)
          $this.data1.userId = $(".unlike1 .dropdown-selected1").attr('data')
        }
        $this.data1.offset = 1;
        $this.data1.pageSize = 10;
        $this.addData($this.data1);
        return false;
      });
    });
    // }, 100);
  },
  methods: {
    shanchu:function(){
      var $this =this;
      $("#shade").fadeOut(300);
      $(".shade_con").fadeOut(300);
    },
    //导出
    importFileT:function(){
      var $this =this;
      $this.data1.offset = 0;
      $this.data1.pageSize = 0;
      $this.data1.expTitle = '查询统计';
      $this.data1.exp = 'true';
      $.ajax({
        url : $this.orderFailTotalList,
        type : 'post',
        contentType: 'application/json',
        data : JSON.stringify($this.data1),
        headers : {
          "Authorization":id,
        },
        success : function(res){
         // console.log(res.data.expTaskId)
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
    addData:function(data){
      var $this = this;
      $.ajax({
        url : $this.orderFailTotalList,
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
           //console.log(res);
          $("#load").remove();
          if (res.statusCode == '401') {
            window.open("../../login.html", "_self");
          } else {
            $this.allData1 = res.data.data;
            if($this.allData1 == ''){
              $this.mapShow1 = true
            }else{
              $this.mapShow1 = false
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
  created:function() {
    var $this = this;
    //接收器，接收上面的两个ID
    bus.$on("getBb", function(updata) {
      //注意this指向问题
      $(".unlike1 .dropdown-selected1").val('');
      $this.data1 = updata.obj;
      $this.addData($this.data1);
    });
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
        var text = $('.unlike3 .dropdown-selected').val();
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
          verify_user(UserName,$(".unlike3 .dropdown-selected"),text,dataA)
        }
        function dataA(){
          data.field.userId =  $('.unlike3 .dropdown-selected').attr('data');
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
    });
    // }, 100);
  },
  methods: {
    shanchu:function(){
      $("#shade1").fadeOut(300);
      $(".shade_con1").fadeOut(300);
    },
    quxiao:function(){
      $(".tips1").fadeOut(300);
      $(".shade_con").fadeIn(300);
    },
  },
  created:function() {
    var $this = this;
    //接收器，接收上面的两个ID
    bus.$on("getAid", function(updata) {
      //注意this指向问题
      console.log(updata)
      $this.showData = updata.Info;
      window.editor.html($this.showData.modWord);
      $.ajax({
        url : $api.queryUserName,
        type : 'post',
        async: false,
        data :{
          'loginName':$this.showData.loginName
        },
        headers : {
          "Authorization":id,
        },
        success : function(data){
          $this.showData.userId = data.data[0].userId
        },
        error : function(err){
          console.log(err);
        }
      });
      $('.unlike3 .dropdown-selected').val($this.showData.loginName)
      $('.unlike3 .dropdown-selected').attr('data',$this.showData.userId);
      layui.use("form", function() {
        var form = layui.form;
        form.render();
      })

    });
  },
});