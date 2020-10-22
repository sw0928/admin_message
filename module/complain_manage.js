/*订单列表*/
var id = $api.localStorageId;
var accountType = localStorage.getItem('accountType');
var IsmgName=null;
$.ajax({
  url : $api.queryIsmgName,
  type : 'post',
  async: false,
  data :{
    'ismgName':""
  },
  headers : {
    "Authorization":id,
  },
  success : function(data){
    //console.log(data);
    IsmgName = data.data;
    //console.log($this.userData);
    // $this.totalCount = data.data.totalCount
  },
  error : function(err){
    console.log(err);
  }
});
//组件通信
var bus = new Vue();
if(show_button(21017)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-complain", {
  template: '#right-template',
  data: function() {
    return {
      totalCount: "0",
      complainProbabilityList: $api.complainProbabilityList,
      complainContentList:$api.complainContentList,
      cheackComplainList:$api.cheackComplainList,
      complaintHisTableList:$api.complaintHisTableList,
      complaintHisMobileNo:$api.complaintHisMobileNo,
      allData:[],
      content3:IsmgName,
      loginType:accountType,
      mapShow: true, //显示无数据图片
      data1:{
        "complainContent": '',
        "complainDate": getDay(0),
        "gateway": "",
        "importEndDate": getDay(0),
        "importStartDate": getDay(0),
        "offset": 1,
        "pageSize": 10,
        "status": '',
        "sendMobile":''
      },
      code:0
    };
  },
  mounted:function() {
    var $this = this;
   // setTimeout(() => {
      $this.addData($this.complainProbabilityList,$this.data1)
      layui.use(["form", "laypage"], function() {
        var form = layui.form;
        var laypage = layui.laypage;
        form.render();
        if($this.data1.offset !== 1 || $this.data1.pageSize !== 10){
          $this.page()
        }
         //监听提交
         form.on("submit(demo)", function(data) {
         // console.log(JSON.stringify(data.field));
           $this.data1 = data.field
           var text1 = $(".unlike3 .dropdown-selected1").val();
           if(text1 == '' || text1 == undefined){
             $this.data1.gateway = ''
           }else{
             if(verify_ism(IsmgName,$(".unlike3 .dropdown-selected1"),text1)){
               $this.data1.gateway = $(".unlike3 .dropdown-selected1").attr('data');
             }else{
               layer.msg('请选择下拉框内容！',{
                 icon:2,
                 time: 1300 //2秒关闭（如果不配置，默认是3秒）
               });
               return false;
             }
           }
           $this.data1.complainContent = data.field.complainContent.trim();
           $this.data1.sendMobile = data.field.sendMobile.trim();
           $this.data1.offset = 1;
           $this.data1.pageSize = 10;
           if( $this.code == 0){
             $this.addData($this.complainProbabilityList,$this.data1)
           }else if( $this.code == 1){
             $this.addData($this.complainContentList,$this.data1)
           }else{
             $this.addData($this.cheackComplainList,$this.data1)
           }
          return false;
        });
      });
      $('.table_tou h6').on('click', function () {
        $(this).addClass('addClass2').siblings().removeClass('addClass2');
        $this.reset();
        if($(this).text()=='投诉率'){
          $this.code = 0;
          $('.table_nav  form .list').addClass('dn')
          $('.table_nav  form .list2').addClass('dn');
          $this.addData($this.complainProbabilityList,$this.data1)
        }else if($(this).text()=='投诉内容'){
          $this.code = 1;
          $('.table_nav  form .list').removeClass('dn')
          $('.table_nav  form .list2').addClass('dn');
          $this.addData($this.complainContentList,$this.data1)
        }else{
          $this.code = 2;
          $('.table_nav  form .list').addClass('dn')
          $('.table_nav  form .list2').removeClass('dn');
          $this.addData($this.cheackComplainList,$this.data1)
        }

      })
    //}, 100);
  },
  methods: {
    del:function(val) {
      var $this = this;
      $("#shade").fadeIn(300);
      $(".shade_con").fadeIn(300);
      $.ajax({
        url : $this.complaintHisTableList,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        async: false,
        data :JSON.stringify({
          'complaintId':val,
          "sendPort": '',
          "sendContent": "",
          "offset": 1,
          "pageSize": 3,
          "sendMobile": ''
        }),
        headers : {
          "Authorization":id,
        },
        success : function(data){
         // console.log(data);
          var updata = {
            info:data.data.data
          };
          bus.$emit("getAid", updata);
          //console.log($this.userData);
          // $this.totalCount = data.data.totalCount
        },
        error : function(err){
          console.log(err);
        }
      });
    },
    complain:function(val){
      var $this = this;
      $("#shade3").fadeIn(300);
      $(".shade_con3").fadeIn(300);
      $.ajax({
        url : $this.complaintHisMobileNo,
        type : 'post',
        async: false,
        data :{
          'complaintId':val
        },
        headers : {
          "Authorization":id,
        },
        success : function(data){
         // console.log(data);
          var updata = {
            info:data.data,
            id:val
          };
          bus.$emit("getDD", updata);
          //console.log($this.userData);
          // $this.totalCount = data.data.totalCount
        },
        error : function(err){
          console.log(err);
        }
      });
    },
    //回复默认
    reset:function(){
     var $this = this;
      $this.data1 = {
        "complainContent": '',
        "complainDate": getDay(0),
        "gateway": "",
        "importEndDate": getDay(0),
        "importStartDate": getDay(0),
        "offset": 1,
        "pageSize": 10,
        "status": ''
      };
      $("#eventLevel option[value='" + $this.data1.status + "']").prop("selected", "selected");
      $(".unlike3 .dropdown-selected1").val('');
      layui.use("form", function() {
        var form = layui.form;
        form.render();
      })
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
              if($this.code == 0){
                $this.addData($this.complainProbabilityList,$this.data1);
              }else if($this.code == 1){
                $this.addData($this.complainContentList,$this.data1);
              }else{
                $this.addData($this.cheackComplainList,$this.data1);
              }
            }
          }
        });
      });

    },
    addData:function(url,data2){
      var $this = this;
      $.ajax({
        url: url,
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

          }else if(data.statusCode == '400'){
            $this.mapShow = true
            layer.msg(data.message,{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
          }  else {
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
    bus.$on("getCC", function(updata) {
      //注意this指向问题
      $this.addData($this.cheackComplainList,$this.data1)
    });
  },
});
/*投诉审核详情*/
Vue.component("v-look-reply", {
  template: '#reply-template',
  data: function() {
    return {
      allData1: [],
      complaintHisTableList:$api.complaintHisTableList,
      data1:{
        "sendPort": '',
        "sendContent": "",
        "offset": 1,
        "pageSize": 3,
        "sendMobile": ''
      },
      complaintId:'',
      totalCount:'0',
      mapShow: true //显示无数据图片
    };
  },
  mounted:function() {
    var $this = this;
   // setTimeout(() => {
      layui.use(["form", "laypage"], function() {
        var form = layui.form;
        var laypage = layui.laypage;
        form.render();
        //完整功能
        if($this.data1.offset !== 1 || $this.data1.pageSize !== 3){
          $this.page()
        }
        //监听提交
        form.on("submit(demo14)", function(data) {
          $this.data1 = data.field;
          $this.data1.complaintId = $this.complaintId;
          $this.data1.offset = 1;
          $this.data1.pageSize = 3;
          $this.addData($this.data1)
          return false;
        });
      });
   // }, 100);
  },
  methods: {
    shanchu:function(){
      $("#shade").fadeOut(500);
      $(".shade_con").fadeOut(500);
    },
    page:function(){
      var $this = this;
      layui.use("laypage", function () {
        var laypage = layui.laypage;
        laypage.render({
          elem: "page1",
          count: $this.totalCount,
          layout: ["prev", "page", "next", "skip"],
          limit:3,
          groups: 3,
          prev: "<",
          next: ">",
          jump: function (obj, first) {
            //console.log(obj);
            if (first) {
              return
            } else {
              $this.data1.complaintId = $this.complaintId;
              $this.data1.offset = obj.curr;
              $this.data1.pageSize = obj.limit;
              $this.addData($this.data1)
            }
          }
        });
      });

    },
    addData:function(data2){
      var $this = this;
      $.ajax({
        url: $this.complaintHisTableList,
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
        complete: function () {
          $("#load").remove();
        },
        success: function (data) {
          //  console.log(data);
          $this.allData1 =[];
          $this.totalCount = 0;
          $("#load").remove();
          if (data.statusCode == '401') {
            // localStorage.setItem('url', window.location.pathname)
            window.open("../../login.html", "_self");

          } else {
            $this.allData1 = data.data.data.data;
            $this.totalCount = data.data.data.totalCount;
            if($this.allData1.length == 0){
              $this.mapShow = true
            }else{
              $this.mapShow = false
            }
            if(data2.offset == 1 && data2.pageSize == 3){
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
    bus.$on("getAid", function(updata) {
      //注意this指向问题
      $this.data1 = {
        "sendPort": '',
        "sendContent": "",
        "offset": 1,
        "pageSize": 3,
        "sendMobile": ''
      },
      $this.allData1 = updata.info.data;
      //console.log(updata.info.totalCount)
      //console.log(updata.info.data.length)  
      $this.totalCount = updata.info.totalCount;
      if($this.allData1.length == 0){
        $this.mapShow = true
      }else{
        $this.mapShow = false;
        $this.complaintId = $this.allData1[0].complaintId
      }
      $this.page()
     // console.log($this.allData)
    });
  },
});
/*申请签名*/
Vue.component("v-template-signature", {
  template: '#signature-template',
  data: function() {
    return {
      auditComplaint: $api.auditComplaint,
      data1:{
        "complaintId":'',
        "msisdn":'',
        "msisdnType":'0',
        "wbnLevel":''
      },
      blocTrade:null,
      mapShow: true //显示无数据图片
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
        form.on("submit(demo6)", function(data) {
         // console.log(data);
            $this.data1.msisdnType = data.field.msisdnType;
            $this.data1.wbnLevel = data.field.wbnLevel
            $(".tips").fadeIn(300);
            $(".shade_con3").fadeOut(300);
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
    sw_btnsuss:function() {
      var $this = this;
     // $(".tips_chid").fadeIn(300);
        $.ajax({
          url : $this.auditComplaint,
          type : 'post',
          dataType : 'json',
          contentType: 'application/json',
          async: false,
          data : JSON.stringify( $this.data1),
          headers : {
            "Authorization":id,
          },
          success : function(data){
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
                      $(".tips").fadeOut(300);
                      $("#shade3").fadeOut(300);
                      $(".shade_con3").fadeIn(300);
                    var updata = {
                      code:1,
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
          error : function(err){
            console.log(err);
          }
        });
    },
    //sw_qued:function() {
    //  var $this = this;
    //  $(".tips").fadeOut(300);
    //  $(".tips_chid").fadeOut(300);
    //  $("#shade3").fadeOut(300);
    //  //$(".shade_con3").fadeIn(300);
    //  //if($this.mapShow == true){
    //  //  window.open("/admin/html/workbench/signature.html", "_self");
    //  //}
    //},
    sw_btnwrong:function() {
      $(".tips").fadeOut(300);
      $(".shade_con3").fadeIn(300);
    },
    refuse:function(){
      var $this = this;
      $("#shade3").fadeOut(300);
      $(".shade_con3").fadeIn(300);
      $this.data1.wbnLevel = ''
      $this.data1.msisdnType = '0'
      $("#wbnLevel option[value='"+$this.data1.wbnLevel+"']").prop("selected","selected");
      $("#msisdnType option[value='"+$this.data1.msisdnType+"']").prop("selected","selected");
      layui.use("form", function() {
        var form = layui.form;
        form.render();
      })
    }
  },
  created:function() {
    var $this = this;
    //接收器，接收上面的两个ID
    bus.$on("getDD", function(updata) {
      //注意this指向问题
      $this.data1.wbnLevel = ''
      $this.data1.msisdnType = '0'
      $("#wbnLevel option[value='"+$this.data1.wbnLevel+"']").prop("selected","selected");
      $("#msisdnType option[value='"+$this.data1.msisdnType+"']").prop("selected","selected");
      layui.use("form", function() {
        var form = layui.form;
        form.render();
      })
      $this.data1.msisdn = updata.info;
      $this.data1.complaintId = updata.id;
      //console.log($this.msisdn)
    });
  },
});