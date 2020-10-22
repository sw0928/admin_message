/*导入投诉号码列表*/
var id = $api.localStorageId;
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
if(show_button(21016)){
	
}else{
	window.open("../../login.html", "_self");
}
Vue.component("v-complain", {
  template: '#complain-template',
  data: function() {
    return {
      totalCount:'0',
      complainPhoneList: $api.complainPhoneList,
      removeComplaint: $api.removeComplaint,
      content3:IsmgName,
      allData:[],
      data1:{
        "offset": 1,
        "pageSize": 10,
        "endDate": getDay(0)+' 23:59:59',
        "ismgId": "",
        "startDate": getDay(0)+' 00:00:00'
      },
      fileName:'',
      fileId:'',
      mapShow: true //显示无数据图片
    };
  },
  mounted:function() {
    var $this = this;
    //setTimeout(() => {
      $this.addData($this.data1);
      layui.use(["form", "laypage","upload"], function() {
        var form = layui.form;
        var laypage = layui.laypage;
        var upload = layui.upload
        form.render();
        //完整功能
        if($this.data1.offset !== 1 || $this.data1.pageSize !== 10){
          $this.page()
        }
        //执行实例
         //监听提交
         form.on("submit(demo)", function(data) {
          //console.log(JSON.stringify(data.field));
           $this.data1 = data.field
           var text1 = $(".unlike3 .dropdown-selected1").val();
           if(text1 == ''){
             $this.data1.ismgId = ''
           }else{
             if(verify_ism(IsmgName,$(".unlike3 .dropdown-selected1"),text1)){
               $this.data1.ismgId = $(".unlike3 .dropdown-selected1").attr('data');
             }else{
               layer.msg('请选择下拉框内容！',{
                 icon:2,
                 time: 1300 //2秒关闭（如果不配置，默认是3秒）
               });
               return false;
             }
           }
          // $this.data1.complaiContent = data.field.complaiContent.trim();
           $this.data1.offset = 1;
           $this.data1.pageSize = 10;
           $this.addData($this.data1)
          return false;
        });
        $("#file").on("change",function (e) {
          var e = e || window.event;
          //获取 文件 个数 取消的时候使用
          var files = e.target.files;
          if(files.length>0){
            // 获取文件名 并显示文件名
            console.log(files[0]);
            var fileName = files[0].name;
            $this.fileName =fileName;
            $this.fileId = files[0]
           // console.log(files[0])
            $("#file").val("");
          }else{
            //清空文件名
            $("#file").val("");
            $this.fileName ='';
            $this.fileId = '';
          }
        });
        form.on("submit(demo7)", function(data) {
          //console.log(JSON.stringify(data.field));
          var text = $(".unlike2 .dropdown-selected").val();
          if(text == ''){
            layer.msg('请选择下拉框内容！',{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
            return false;
          }else{
            if(verify_ism(IsmgName,$(".unlike2 .dropdown-selected"),text)){
              var ismgId = $(".unlike2 .dropdown-selected").attr('data');
            }else{
              layer.msg('请选择下拉框内容！',{
                icon:2,
                time: 1300 //2秒关闭（如果不配置，默认是3秒）
              });
              return false;
            }
          }
          if($this.fileName == ''){
            layer.msg('请导入文件！',{
              icon:2,
              time: 1300 //2秒关闭（如果不配置，默认是3秒）
            });
            return false;
          }
          var myform = new FormData();
          myform.append('multipartFile', $this.fileId);
          myform.append('ismgId',ismgId);
          $.ajax({
            url: "/icos/complain/importComplain",
            type: "POST",
            data: myform,
            async: false,
            dataType: "json",
            headers: {
              "Authorization": id,
            },
            contentType: false,
            processData: false,
            success: function (res) {
              if (res.statusCode == 200) {
                layer.open({
                  content: res.message
                  ,yes: function(index){
                    layer.close(index);
                    $this.shanchu();
                    $this.addData($this.data1);
                    $("#file").val("");
                  }
                });
              } else {
                layer.open({
                  content: res.message
                  ,yes: function(index){
                    layer.close(index);
                    $("#file").val("");
                    $this.fileName ='';
                    $this.fileId = '';
                  }
                });
              }
            },
            error: function (data) {

            }
          })
          return false;
        });
      });
   // }, 100);
  },
  methods: {
    del:function(val) {
      var $this =this;
      layer.open({
        content: '你确定要删除该导入的投诉号码？'
        ,shadeClose:true
        ,btn: ['确定', '取消']
        ,yes: function(index){
          layer.close(index);
          $.ajax({
            url : $this.removeComplaint,
            type : 'post',
            async: false,
            data: {
              "complaintId": val,
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
    },
    sw_btnsuss:function() {
      $(".tips_chid2").fadeIn(300);
    },
    sw_btnwrong:function() {
      $("#shade2").fadeOut(300);
      $(".tips2").fadeOut(300);
    },
    sw_qued:function() {
      $("#shade2").fadeOut(300);
      $(".tips_chid2").fadeOut(300);
      $(".tips2").fadeOut(300);
    },
    complain:function(){
      $("#shade2").fadeIn(300);
      $(".shade_con1").fadeIn(300);
    },
    shanchu:function(){
      var $this = this;
      $("#shade2").fadeOut(300);
      $(".shade_con1").fadeOut(300);
      $(".unlike2 .dropdown-selected").val('')
      $(".unlike2 .dropdown-selected").attr('data','')
      $this.fileName ='';
      $this.fileId = '';
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
              $this.addData($this.data1);
            }
          }
        });
      });

    },
    addData:function(data1){
      var $this = this;
      $.ajax({
        url : $this.complainPhoneList,
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
          } else {
            $this.allData = data.data.data;
            $this.totalCount = data.data.totalCount;
            if($this.allData.length == 0){
              $this.mapShow = true
            }else{
              $this.mapShow = false
            }
            if(data1.offset == 1 && data1.pageSize == 10){
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
