/*签到申请列表*/
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
if(show_button(21015)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-signature", {
  template: '#signature-template',
  data: function() {
    return {
      url: $api.signatureList,
      delUrl:$api.removeSignature,
      signatureListExcelOut:$api.signatureListExcelOut,
      allData: null,
      data1:{
        "loginName": "",
        "offset": 1,
        "pageSize": 10,
        "review": "",
        "signName": ""
      },
      totalCount:'0',
      signId:'',
      review:'',
      mapShow: true, //显示无数据图片
      showNo:false,
      loginName:'',
      review:'',
      signName:''

    };
  },
  mounted:function() {
    var $this = this;
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
          $this.data1 = data.field;
          $this.data1.offset = 1;
          $this.data1.pageSize = 10;
          $this.addData($this.data1);
          return false;
        });
      });
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
    //添加数据
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
          }else{
            $this.allData = res.data.data;
            if($this.allData == ''){
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
              // console.log(height)
              $('#leftMenu_Box').css('height',height)
            });
          }

        },
        error : function(err){
          console.log(err);
          $("#load").remove();
        }
      });
    },
    //申请签名
    shade:function() {
      $("#shade").fadeIn(300);
      $(".shade_con").fadeIn(300);
    },
    //导出
    importFile:function(){
      var $this =this;
      $this.data1.offset = 0;
      $this.data1.pageSize = 0;
      $this.data1.expTitle = '签名列表';
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
    //修改
    amend:function(val,name,stauts) {
      $("#shade1").fadeIn(300);
      $(".shade_con1").fadeIn(300);
      $('#shade1 .tips1 .sw_btnsuss').attr('dataId',val);
      var updata = {
        name: name,
        status:stauts
      };
      //console.log(updata);
      // 将选中的ID放到触发器的盆子里，下面拿着用
      bus.$emit("getBb", updata);
    },
    //删除
    del:function(id,code) {
      var $this = this;
      $("#shade2").fadeIn(300);
      $(".tips2").fadeIn(300);
      $this.signId = id;
      $this.review = code;
    },
    //取消
    sw_btnwrong:function() {
      $("#shade2").fadeOut(300);
      $(".tips2").fadeOut(300);

    },
    //确定
    sw_btnsuss:function() {
      var $this = this;
      $(".tips2").fadeOut(300);
      if($this.review != '1'){
        $.ajax({
          url : $this.delUrl,
          type : 'post',
          async: false,
          data : {
            'signId':$this.signId
          },
          headers : {
            "Authorization":id,
          },
          success : function(data){
            //console.log(data);
            $this.mapShow = true
          },
          error : function(err){
            //console.log(err);

          }
        });
      }else{
        $this.mapShow = false
      }

      $(".tips_chid2").fadeIn(300);
    },
    //二级弹框确认
    sw_qued:function() {
      var $this = this;
      if($this.mapShow == false){
        $(".tips2").fadeOut(300);
        $(".tips_chid2").fadeOut(300);
        $("#shade2").fadeOut(300);
      }else{
        window.open("../../html/workbench/signature.html", "_self");
      }
    },
    //查看审核
    examine:function(val){
      $("#shade3").fadeIn(300);
      $(".shade_con3").fadeIn(300);
      var updata = {
        signId: val
      };
      bus.$emit("getAid", updata);
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
      $this.sellerid = updata.sellerid;
      $this.auctionid = updata.auctionid;

    });
  },
});
/*申请签名*/
Vue.component("v-template-signature", {
  template: '#shade-template',
  data: function() {
    return {
      url: $api.signatureApply,
      getTrade:$api.getTrade,
      field:null,
      data1:{
        "signName": "",
        "blocCustomerName": '',
        "blocTrade": '',
        "extensionNumber": "",
        "remark": ""
      },
      blocTrade:null,
      userData:UserName,
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
          //console.log(data);
          var reg = /^[0-9]*$/;
          if (!reg.test(data.field.extensionNumber)) {
            layer.msg('扩展号只能填写数字！',{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
            return false;
          }
          if (data.field.blocTrade == '') {
            layer.msg('未选择行业类别！',{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
            return false;
          }
          if (data.field.userId == '') {
            layer.msg('用户名不能为空！',{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
            return false;
          }else{
            var text = $(".unlike2 .dropdown-selected").val();
            verify_user(UserName,$(".unlike2 .dropdown-selected"),text,dataA)
          }
          function dataA(){
            data.field.userId = $(".unlike2 .dropdown-selected").attr('data')*1;
            $.ajax({
              url : $this.url,
              type : 'post',
              dataType : 'json',
              contentType: 'application/json',
              async: false,
              data : JSON.stringify(data.field),
              headers : {
                "Authorization":id,
              },
              success : function(data){
                if(data.statusCode == 200){
                  layer.open({
                    content: data.message
                    ,yes: function(index){
                      layer.close(index);
                      window.open("../../html/workbench/signature.html", "_self");
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
    //}, 100);
  },
  methods: {
    shanchu:function() {
    	var $this = this;
      $("#shade").fadeOut(300);
      $(".shade_con").fadeOut(300);
      $this.data1 = {
        "signName": "",
        "blocCustomerName": '',
        "blocTrade": '',
        "extensionNumber": "",
        "remark": ""
      };
      $("#blocTrade option[value='" + $this.data1.blocTrade + "']").prop("selected", "selected");
      $(".unlike2 .dropdown-selected").attr('data', '');
			$(".unlike2 .dropdown-selected").val('');
			layui.use(["form", "laypage"], function() {
				var form = layui.form;
				var laypage = layui.laypage;
				form.render();
			});
     // $(".tips_chid").fadeOut(300);
     // $(".tips").fadeOut(300);
    },
    //sw_btnsuss:function() {
    //  var $this = this;
    //  $(".tips_chid").fadeIn(300);
    //  $(".tips").fadeOut(300);
    //    if( $this.mapShow == true){
    //
    //    }else{
    //      return
    //    }
    //},
    //sw_qued:function() {
    //  var $this = this;
    //  //$(".tips").fadeOut(300);
    //  $(".tips_chid").fadeOut(300);
    //  //$("#shade").fadeIn(300);
    //  //$(".shade_con").fadeIn(300);
    //  if($this.mapShow == true){
    //    window.open("../../html/workbench/signature.html", "_self");
    //  }
    //},
    //sw_btnwrong:function() {
    //  $(".tips").fadeOut(300);
    //  $(".shade_con").fadeIn(300);
    //}
  },
  created:function() {
    var $this = this;
    $.ajax({
      url : $this.getTrade,
      type : 'get',
      dataType : 'json',
      contentType: 'application/json',
      async: false,
      headers : {
        "Authorization":id,
      },
      success : function(data){
        //console.log(data);
        $this.blocTrade = data.data;
        //console.log($this.blocTrade)
      },
      error : function(err){
        console.log(err);
      }
    });
    //接收器，接收上面的两个ID
    bus.$on("getAid", function(updata) {
      //注意this指向问题
      $this.sellerid = updata.sellerid;
      $this.auctionid = updata.auctionid;
    });
  },
});
//模板匹配
Vue.component("v-del", {
  template: '#del-template',
  data: function() {
    return {
      url: $api.editSignature,
      field:{
        modelType: "",
        review: "",
        signId:''
      },
      name:'',
      status:'',
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
        form.on("submit(demo9)", function(data) {
         // console.log(data);
          $(".tips1").fadeIn(300);
          //$(".shade_con1").fadeOut(100);
          $this.field.review = data.field.status;
          $this.field.modelType = data.field.user;
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
    sw_btnsuss:function() {
      var $this = this;
      $(".tips_chid1").fadeIn(300);
      var signId = $('#shade1 .tips1 .sw_btnsuss').attr('dataId');
      $this.field.signId = signId;
    //  console.log($this.field);
      $.ajax({
        url : $this.url,
        type : 'post',
        dataType : 'json',
        contentType: 'application/json',
        async: false,
        data : JSON.stringify( $this.field),
        headers : {
          "Authorization":id,
        },
        success : function(data){
        //  console.log(data);
        },
        error : function(err){
         // console.log(err);
        }
      });
    },
    sw_btnwrong:function() {
      //$("#shade1").fadeOut(300);
      //$(".shade_con1").fadeOut(300);
      $(".tips1").fadeOut(300);
    },
    sw_qued:function() {
     // $(".tips1").fadeOut(300);
     // $(".tips_chid1").fadeOut(300);
      //$("#shade1").fadeOut(300);
     // $(".shade_con1").fadeOut(300);
      window.open("../../html/workbench/signature.html", "_self");
    }
  },
  created:function() {
    var $this = this;

    //接收器，接收上面的两个ID
    bus.$on("getBb", function(updata) {
      //注意this指向问题
      $this.name = updata.name;
      $this.status = updata.status;
     // $(document).ready(function(){
        $("#eventLevel3 option[value='"+ $this.status +"']").prop("selected","selected");
        layui.use("form", function() {
          var form = layui.form;
          form.render();
        })
   //   })
      //setTimeout(() => {
      //
      //}, 100);
    });
  },
});
//签名详情
Vue.component("v-details", {
  template: '#details-template',
  data: function() {
    return {
      signId: "",
      srcId:'',
      signatureApplyInfo: $api.signatureApplyInfo,
      queryUsedIsmgName: $api.queryUsedIsmgName,
      querySignatueIsmg: $api.querySignatueIsmg,
      buildOrderTemplate: $api.buildOrderTemplate,
      addExtend: $api.addExtend,
      repulseSignatureApply: $api.repulseSignatureApply,
      auditSign: $api.auditSign,
      mapShow: true, //显示无数据图片
      allData: [],
      userData1:[],
      lis_a:null,
      dataId:'',
      content:['公司名称','签名长度','签名特殊符号','签名&&公司'],
      dataList:[],
      showAa:false,
      data1:{
        "ismgId": "",
        "ismgName": "",
        "offset": 1,
        "pageSize": 5
      },
      count:''
    };
  },
  mounted:function() {
    var $this = this;
    $this.addData($this.data1)
    $("body").click(function (e) {
      if (!$(e.target).closest(".unlike1 ul,.unlike1").length) {
        $('.unlike1 ul').addClass('dns');
        $('.unlike1 ul').html($this.lis_a)
       }
      });
   // setTimeout(() => {
      layui.use(["form", "laypage"], function() {
        var form = layui.form;
        var laypage = layui.laypage;
        form.render();
        //完整功能
        if($this.data1.offset !== 1 || $this.data1.pageSize !== 5){
          $this.page1()
        }
        form.on('checkbox(number)', function(data){
          var str =  $('#text5').val();
          if( data.value == 1){
            if(data.elem.checked == true){
              str = str + '请提供签名所对应的公司全称,'
              $('#text5').val(str)
            }else{
              var result = str.split("请提供签名所对应的公司全称,").join("");
              $('#text5').val(result)
            }
          }
          if( data.value == 2){
            if(data.elem.checked == true){
              str = str + '签名在3-8个字之间，请修改,'
              $('#text5').val(str)
            }else{
              var result = str.split("签名在3-8个字之间，请修改,").join("");
              $('#text5').val(result)
            }
          }
          if( data.value == 3){
            if(data.elem.checked == true){
              str = str + '签名中不能包含特殊符号,'
              $('#text5').val(str)
            }else{
              var result = str.split("签名中不能包含特殊符号,").join("");
              $('#text5').val(result)
            }
          }
          if( data.value == 4){
            if(data.elem.checked == true){
              str = str + '签名和对应的公司名称不符,'
              $('#text5').val(str)
            }else{
              var result = str.split("签名和对应的公司名称不符,").join("");
              $('#text5').val(result)
            }
          }
        });
      });
    //}, 100);
  },
  methods: {
    shanchu:function() {
      $("#shade3").hide();
      $(".shade_con3").hide();
      $('.unlike1 .dropdown-selected1').val('');
      $('.unlike1 .dropdown-selected1').attr('data','')
    },
    //分页
    page1:function(){
      var $this =this;
      layui.use("laypage", function() {
        var laypage = layui.laypage;
        laypage.render({
          elem: "page2",
          count: $this.count,
          layout: ["prev", "page", "next","skip"],
          groups: 4,
          prev: "<",
          next: ">",
          jump: function(obj,first) {
            $this.data1.offset = obj.curr;
            $this.data1.pageSize = 5;
            if(first){
              return
            }else{
              $this.addData($this.data1);

            }
          }
        });
      });

    },
    //添加数据
    addData:function(data){
      var $this = this;
      $.ajax({
        url : $this.querySignatueIsmg,
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
          if(res.statusCode == '401'){
            //localStorage.setItem('url', window.location.pathname)
            window.open("../../login.html", "_self");
          }else{
            $this.allData = res.data.data;
            if($this.allData == ''){
              $this.showAa = true
            }else{
              $this.showAa = false
            }
            $this.count = res.data.totalCount;
            if(data.offset == 1 && data.pageSize == 5){
              $this.page1()
            }

          }

        },
        error : function(err){
          console.log(err);
          $("#load").remove();
        }
      });
    },
    //添加到接单模版
    template:function(){
      var $this = this;
      $.ajax({
        url : $this.buildOrderTemplate,
        type : 'post',
        async: false,
        data :{
          'sigId':$this.signId,
        },
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
                window.open("../../html/workbench/signature.html", "_self");
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
    },
    //添加审核
    addAudit:function(){
      var $this = this;
      $.ajax({
        url : $this.auditSign,
        type : 'post',
        dataType : 'json',
        contentType: 'application/json',
        async: false,
        data :JSON.stringify({
          'sigid':$this.signId,
          'ismgId':$(".dropdown1 .dropdown-selected1").attr('data'),
          'srcId':$this.srcId,
        }),
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
                window.open("../../html/workbench/signature.html", "_self");
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
    },
    //添加签名扩展
    extend:function(){
      var $this = this;
      $.ajax({
        url : $this.addExtend,
        type : 'post',
        dataType : 'json',
        contentType: 'application/json',
        async: false,
        data :JSON.stringify({
          'sigid':$this.signId.toString(),
          'ismgId':$(".dropdown1 .dropdown-selected1").attr('data'),
          'srcId':$this.srcId,
        }),
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
                window.open("../../html/workbench/signature.html", "_self");
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
    },
    //拒绝
    reject:function(){
      var $this = this;
      $.ajax({
        url : $this.repulseSignatureApply,
        type : 'post',
        dataType : 'json',
        contentType: 'application/json',
        async: false,
        data :JSON.stringify({
          'cause':$('#text5').val(),
          'signatureId':$this.signId,
        }),
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
                window.open("../../html/workbench/signature.html", "_self");
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
    },
    //查询
    inquire:function(){
      var $this = this;
      var text = $(".unlike1 .dropdown-selected1").val()
      if(text == ''){
        layer.msg('请选择网关！',{
          icon:2,
          time: 1300 //2秒关闭（如果不配置，默认是3秒）
        });
        return false;
      }else{
        if(verify_ism($this.userData1,$(".unlike1 .dropdown-selected1"),text)){
          $this.data1.ismgId = $(".unlike1 .dropdown-selected1").attr('data');
          $this.addData($this.data1)
        }else{
          layer.msg('请选择下拉框内容！',{
            icon:2,
            time: 1300 //2秒关闭（如果不配置，默认是3秒）
          });
          return false;
        }

      }
      //function dataA(){
      //
      //
      //}

    },
    ismlist:function(){
      var $this = this;
      $.ajax({
        url : $this.queryUsedIsmgName,
        type : 'post',
        async: false,
        data :{
          'ismgName':null,
          'userId':$this.dataList.userId
        },
        headers : {
          "Authorization":id,
        },
        success : function(res){
           //console.log(res.data);
          $this.userData1 = res.data
          $this.$nextTick(function(){
            $this.lis_a = $('.unlike1 ul li');
          })
          //console.log($this.userData);
          // $this.totalCount = data.data.totalCount
        },
        error : function(err){
          console.log(err);
        }
      });
    },
    dakai:function(event) {
      event.stopPropagation();
      $('.unlike1 ul').removeClass('dns')
      var text = $('.unlike1 .dropdown-selected1').val();
      if (text == '') {
        $('.unlike1 ul li').removeClass('active')
      }
    },
    xuanze:function(event) {
      event.stopPropagation();
      var el = event.currentTarget;
      $('.unlike1 .dropdown-selected1').val($(el).find('a').text());
      $('.unlike1 .dropdown-selected1').attr('data',$(el).find('a').attr('data'))
      $(el).addClass('active');
      $(el).siblings().removeClass('active')
      $(el).parent().addClass('dns')
      return false;
    },
    show:function(event){
      var $this = this;
      event.stopPropagation();
      var el = event.currentTarget;
      $('.unlike1 ul').removeClass('dns')
      var aa =[];
      var text = $(el).val();
      var lis_a = $this.lis_a;
      var bb = [];
      if(event.keyCode == 8){
        if(text == ''){
          $('.unlike1 ul').html(lis_a);
          $(el).attr('data','')
        }
        for (var i=0;i<lis_a.length;i++)
        {
          if($(lis_a[i]).find('a').html().indexOf(text) > -1){
            bb.push(lis_a[i])
          }
        }
        $('.unlike1 ul').html(bb);

      }else{
        for (var i=0;i<lis_a.length;i++)
        {
          if($(lis_a[i]).find('a').html().indexOf(text) > -1){
            aa.push(lis_a[i])
          }
        }
        $('.unlike1 ul').html(aa)
      }
    }
  },
  created:function() {
    var $this = this;

    //接收器，接收上面的两个ID
    bus.$on("getAid", function(updata) {
      //注意this指向问题
      $this.signId = updata.signId;
      $.ajax({
        url : $this.signatureApplyInfo,
        type : 'post',
        async: false,
        data :{
          'signId':$this.signId
        },
        headers : {
          "Authorization":id,
        },
        success : function(data){
          $this.dataList = data.data
          $this.dataId = $this.dataList.userId
          //console.log($this.dataList);
          $("#eventLevel13 option[value='"+ $this.dataList.review +"']").prop("selected","selected");
          layui.use("form", function() {
            var form = layui.form;
            form.render();
          })
        },
        error : function(err){
          console.log(err);
        }
      });

    });
  },
  watch: {
    //事件监听
    dataId: function () {
      var $this = this;
        $this.ismlist()
        $this.data1.ismgId = '';
        $this.addData($this.data1)
    },
    deep:true
  }
});
