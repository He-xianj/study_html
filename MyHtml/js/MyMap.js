//============================================高德地图===============================================================================
//
// var map;
// function init(){
//     map = new AMap.Map('container', {
//         zoom:15,//级别
//         center: [112.473431,23.077706],//中心点坐标
//         resizeEnable: true, //是否监控地图容器尺寸变化
//         mapStyle: "amap://styles/whitesmoke"
//     });
//     AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],function(){//异步加载插件
//         var toolbar = new AMap.ToolBar();
//         map.addControl(toolbar);
//         var scale = new AMap.Scale();
//         map.addControl(scale);
//         var overView = new AMap.OverView();
//         map.addControl(overView); 
//     });
// }
// function setMapStyle(s) {
//   var styleName = "amap://styles/" + s;
//   map.setMapStyle(styleName);
// }
//===============================================================================================================================

//============================================百度地图===============================================================================
var map;
function init() {
    // 百度地图API功能
	map = new BMap.Map("map");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(112.473431,23.077706), 15);  // 初始化地图,设置中心点坐标和地图级别
    map.setMapStyleV2({     
        styleId: '3384eccd9af47604d5feb5fb53a8262a'
      });
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));
        //添加地图类型控件
    var overView = new BMap.OverviewMapControl();
    overView = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
    map.addControl(overView);	
    // 添加鹰眼  
    var Scale = new BMap.ScaleControl({anchor:BMAP_ANCHOR_TOP_LEFT});
    map.addControl(Scale);
    // 添加比例尺
    var navigation = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT});  //左上角，添加默认缩放平移控件
    map.addControl(navigation);
    // 添加平移
	map.setCurrentCity("肇兴");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

//------------------------------------------------------出行方式--------------------------------------------------------
function G(id) {
    return document.getElementById(id);
}
// 起点~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var aa = new BMap.Autocomplete(    //建立一个自动完成的对象
    {"input" : "t_a"
    ,"location" : map
});

aa.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
var str = "";
    var _value = e.fromitem.value;
    var value = "";
    if (e.fromitem.index > -1) {
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    }    
    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
    
    value = "";
    if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    }    
    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
    G("searchResultPanel").innerHTML = str;
});

var myValue;
aa.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
var _value = e.item.value;
    myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
    setPlace();
});
// 终点~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var bb = new BMap.Autocomplete(    //建立一个自动完成的对象
    {"input" : "t_b"
    ,"location" : map
});

bb.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
var str = "";
    var _value = e.fromitem.value;
    var value = "";
    if (e.fromitem.index > -1) {
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    }    
    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
    
    value = "";
    if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    }    
    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
    G("searchResultPanel").innerHTML = str;
});

var myValue;
bb.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
var _value = e.item.value;
    myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
    setPlace();
});

function setPlace(){
    map.clearOverlays();    //清除地图上所有覆盖物
    function myFun(){
        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
        map.centerAndZoom(pp, 18);
        map.addOverlay(new BMap.Marker(pp));    //添加标注
    }
    var local = new BMap.LocalSearch(map, { //智能搜索
      onSearchComplete: myFun
    });
    local.search(myValue);
}

//----------------------------------------------------------------------------------------------------------------------
}

//------------------------------------------------------个性化地图------------------------------------------------------
function setMapStyle(s){
    map.setMapStyleV2({     
        styleId: s
      });
}
//----------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------出行方式--------------------------------------------------------

function setgo(gogo){
    var start = document.getElementById("t_a").value;
    var end =document.getElementById("t_b").value;
    map.clearOverlays();    //清除地图上所有覆盖物
    switch(gogo){
        case 1:
            var transit = new BMap.TransitRoute(); 
            transit.setSearchCompleteCallback(function(results) { 
                if (transit.getStatus() == BMAP_STATUS_SUCCESS) { 
                    var firstPlan = results.getPlan(0); 
                    // 绘制步行线路 
                    for (var i = 0; i < firstPlan.getNumRoutes(); i++) { 
                        var walk = firstPlan.getRoute(i); 
                        if (walk.getDistance(false) > 0){ 
                        // 步行线路有可能为0 
                            map.addOverlay(new BMap.Polyline(walk.getPoints(), {lineColor: "green"})); 
                        } 
                    } 
                    // 绘制公交线路 
                    for (i = 0; i < firstPlan.getNumLines(); i++) { 
                        var line = firstPlan.getLine(i); 
                        map.addOverlay(new BMap.Polyline(line.getPoints())); 
                    }
                } 
            });
            transit.search(start, end);
            break;
        case 2:
            //步行
            var walking = new BMap.WalkingRoute(map, { renderOptions:{ map: map,  panel: "m-result", autoViewport: true}});
	        walking.search(start, end);
            break;
        case 3:
            //骑车
            var riding = new BMap.RidingRoute(map, { renderOptions: { map: map, panel: "m-result", autoViewport: true }});
            riding.search(start, end);
            break;
    }
}
//----------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------添加标记--------------------------------------------------------
function setMark(poi){
    
    switch(poi){
        case 11:
            var point = new BMap.Point(112.491224, 23.011914);//广里
            
            var t="<p>广东理工学院创办于1995年，是经教育部批准设立的全日制普通本科高等学校.“</p>"+
                  "<div id='ee'></div>";            
            var opts = {
                width : 200,     // 信息窗口宽度
                height: 100,     // 信息窗口高度
                title : "广东理工学院" , // 信息窗口标题
                enableMessage:true,//设置允许信息窗发送短息
              }
              var infoWindow = new BMap.InfoWindow(t, opts);  // 创建信息窗口对象
            break;
        case 22:
            var point = new BMap.Point(111.606002,22.777171);//罗定中学
            var t="学校占地面积300多亩，是罗定市占地面积最大的中学；现有97个教学班，初中、高中学生接近6000人。"+
                "<img style='float:right;margin:4px'src='./img/f2bd4811b912c8fcc675e4e3f3039245d78821d4.png' width='139' height='104' title='罗定中学城东学校'/>";
            var opts = {
                width : 300,     // 信息窗口宽度
                height: 200,     // 信息窗口高度
                title : "罗定中学城东学校" , // 信息窗口标题
                enableMessage:true,//设置允许信息窗发送短息
              }
              var infoWindow = new BMap.InfoWindow(t, opts);  // 创建信息窗口对象 
            break;
        case 33:
            var point = new BMap.Point(111.573421,22.792579);//罗定一中
            var t="<p>附城迎宾路</p>";
            var opts = {
                width : 200,     // 信息窗口宽度
                height: 100,     // 信息窗口高度
                title : "罗定第一中学" , // 信息窗口标题
                enableMessage:true,//设置允许信息窗发送短息
              }
              var infoWindow = new BMap.InfoWindow(t, opts);  // 创建信息窗口对象 
            break;
        case 44:
            var point = new BMap.Point(111.578636,22.786675);//附城小学
            var t="<p>广东云浮市罗定市附城镇</p>";
            var opts = {
                width : 200,     // 信息窗口宽度
                height: 100,     // 信息窗口高度
                title : "附城中心小学" , // 信息窗口标题
                enableMessage:true,//设置允许信息窗发送短息
              }
              var infoWindow = new BMap.InfoWindow(t, opts);  // 创建信息窗口对象 
            break;
        case 50:
            var point = new BMap.Point(113.941079,22.546103);
            var t="<iframe width = '600xp' height =' 400xp' frameborder = 'no' margin = '0' src = 'ech.html'/>";
            var opts = {
                width : 650,     // 信息窗口宽度
                height: 400,     // 信息窗口高度
                title : "tx" , // 信息窗口标题
                enableMessage:true,//设置允许信息窗发送短息
              }
              var infoWindow = new BMap.InfoWindow(t, opts);  // 创建信息窗口对象 
            break;
        case 55:
            map.clearOverlays();    //清除地图上所有覆盖物
            for(var i = 1; i <= 4; i++){
                setMark(i + i * 10);
            }
            return null;
            break;
        
    }
    
	map.centerAndZoom(point, 15);
	var marker = new BMap.Marker(point);  // 创建标注
	map.addOverlay(marker);               // 将标注添加到地图中
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画                    // 将标注添加到地图中 
    marker.addEventListener("click", function(){          
        map.openInfoWindow(infoWindow,point); //开启信息窗口
    });
}
//----------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------线--------------------------------------------------------
function ttd(){
    var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        scale: 0.6,//图标缩放大小
        strokeColor:'#fff',//设置矢量图标的线填充颜色
        strokeWeight: '2',//设置线宽
    });
    var icons = new BMap.IconSequence(sy, '10', '30');
    // 创建polyline对象
    var pois = [
        new BMap.Point(112.491224, 23.011914),
        new BMap.Point(111.606002,22.777171),
        new BMap.Point(111.573421,22.792579),
        new BMap.Point(111.578636,22.786675)
    ];
    var polyline =new BMap.Polyline(pois, {
       enableEditing: false,//是否启用线编辑，默认为false
       enableClicking: true,//是否响应点击事件，默认为true
       icons:[icons],
       strokeWeight:'8',//折线的宽度，以像素为单位
       strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
       strokeColor:"#18a45b" //折线颜色
    });
    
    map.addOverlay(polyline);          //增加折线
}
//----------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------路书--------------------------------------------------------
function olushu(){
    var lushu;
	// 实例化一个驾车导航用来生成路线
    var drv = new BMap.DrivingRoute('肇兴', {
        onSearchComplete: function(res) {
            if (drv.getStatus() == BMAP_STATUS_SUCCESS) {
                var plan = res.getPlan(0);
                var arrPois =[];
                for(var j=0;j<plan.getNumRoutes();j++){
                    var route = plan.getRoute(j);
                    arrPois= arrPois.concat(route.getPath());
                }
                map.addOverlay(new BMap.Polyline(arrPois, {strokeColor: '#111'}));
                map.setViewport(arrPois);

                lushu = new BMapLib.LuShu(map,arrPois,{
                defaultContent:"",
                autoView:true,//是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                icon  : new BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/car.png', new BMap.Size(52,26),{anchor : new BMap.Size(27, 13)}),
                speed: 9000,
                enableRotation:true,//是否设置marker随着道路的走向进行旋转
               });
               lushu.start();
            }
        }
    });
    var start=new BMap.Point(112.491224, 23.011914);
    var end=new BMap.Point(113.941079,22.546103);
    drv.search(start, end);
    
}
//----------------------------------------------------------------------------------------------------------------------
function ec(){
    
}

//===============================================================================================================================
