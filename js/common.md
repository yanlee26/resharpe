# JS经典案例 
### 图片轮播jquery
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>图片轮播</title>
	<style>
		body,div,span,img,a{margin:0;padding: 0;text-decoration: none;}
		#container{position: relative;width: 400px;height: 450px;overflow: hidden;margin: 20px auto;border:3px solid red;}
		#list{width: 2800px;height: 450px;position: absolute;z-index: 1;}
		#list img{width: 400px;height: 450px;float: left;}
		#buttons{position: absolute;float: left;width: 100px;height: 10px;bottom:50px;left:175px;z-index: 2;}
		#buttons span{float:left;height: 10px;width: 10px;margin-right: 5px;cursor: pointer;border:1px solid #000;border-radius: 50%;background: #ccc;z-index: 2;}
		#buttons .on{background: red;}
		.arrow{cursor: pointer; display: none;position:absolute;height: 30px;width: 30px;top:175px;font-size: 25px;line-height: 25px;text-align:center;color: #ccc;z-index: 2;background-color: RGBA(0,0,0,.3);}
		.arrow:hover{background-color: RGBA(0,0,0,.6);}
		#container:hover .arrow{display: block;}
		#prev{left: 25px;}
		#next{right: 25px;}
	</style>
	<script>
		window.onload=function () {//页面加载调用
			var container=document.getElementById('container');
			var list=document.getElementById('list');
			var buttons=document.getElementById('buttons').getElementsByTagName('span');
			var prev=document.getElementById('prev');
			var next=document.getElementById('next');
			var index=1;//用于索引当前按钮
			var len=5;//图片数量
			var animated = false;//判断切换是否进行
			var interval = 3000;//自动播放计时器3s
			var timer;//定时器
			 function animate (offset) {//动画切换
			 	animated=true;//切换进行中
			 	var time=300;//位移总时间
			 	var inteval=10;//位移时间间隔
			 	var times=time/inteval;//位移次数
                var speed = offset/times;//位移速度
			 	var left= parseInt(list.style.left)+offset;//目标值


			 	var go=function () {
			 		//这两种情况表示还在切换中
                    if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                        list.style.left = parseInt(list.style.left) + speed + 'px';
                        setTimeout(go, inteval);//继续执行切换go()函数  
                    }
                    else {
                        list.style.left = left+ 'px';
		                if(left<-400*len){
		                	list.style.left="-400px";
		                }
		                if(left>-400){
		                	list.style.left=-400*len+"px";
		                }
                        animated = false;//切换完成 
                    }
                }
                go();
			 	}
                
           
           //用于为按钮添加样式
		    function showButton() {     
		       //先找出原来有.on类的按钮，并移除其类
		        for (var i = 0; i < buttons.length ; i++) {  
		                  if( buttons[i].className == 'on'){
		                buttons[i].className = '';     
		                           break;
		            }
		        }        
		        //为当前按钮添加类，索引下标从0开始，故需减1
		        buttons[index - 1].className = 'on';
		    }

//自动播放
            function play() {
                timer = setTimeout(function () {
                    next.onclick();
                    play();
                }, interval);
            }
            //清除定时器
            function stop() {
                clearTimeout(timer);
            }
//右点击
           next.onclick = function () {
           		if (animated) {//如果切换还在进行，则直接结束，直到切换完成
                    return;
                }
           		if(index==5){
           			index=1;
           			}
           			else{
           				index+=1;
           			}           		
                animate(-400);
                showButton();
            }
 //左点击          
            prev.onclick = function () {
    			if (animated) {//如果切换还在进行，则直接结束，直到切换完成
    	         return;
        	     }
            	if(index==1){
            		index=5;
            		}
            		else{
            			index-=1;
            		}
            	
                animate(400);
                showButton(); 
                }
               
            //通过循环为按钮添加点击事件
            for (var i=0;i<buttons.length;i++) {
            	buttons[i].onclick=function() {
            		if (animated) {//如果切换还在进行，则直接结束，直到切换完成
	    	         return;
	        	     }
                  	//当继续点击按钮时不切换
                  	if(this.className=='on'){
                  		return;
                  	}
                  	//通过获取按钮的标签自定义属性index，得到索引值，再计算差值
                  	var myIndex=parseInt(this.getAttribute('index'));
                  	//真正的偏移量
                  	var offset=-400*(myIndex-index);
                  	animate(offset);
                  	//将点击按钮的index属性置为当前
                  	index=myIndex;
                  	showButton();
                  }  
              } 
	//父容器的移入移出事件
            container.onmouseover = stop;
            container.onmouseout = play;
            play();//自动播放
	}

	</script>
</head>
<body>
	<div id="container">
		<div id='list' style='left: -400px'>
			<img src="img/5.jpg" alt="">
			<img src="img/1.jpg" alt="">
			<img src="img/2.jpg" alt="">
			<img src="img/3.jpg" alt="">
			<img src="img/4.jpg" alt="">
			<img src="img/5.jpg" alt="">
			<img src="img/1.jpg" alt="">
		</div>
		<div id='buttons'>
			<span index='1' class="on"></span>
			<span index='2'></span>
			<span index='3'></span>
			<span index='4'></span>
			<span index='5'></span>
		</div>
		<a href="javascript:;" id='prev' class="arrow">&lt;</a>
		<a href="javascript:;" id='next' class="arrow">&gt;</a>		
	</div>
</body>
</html>```

### 瀑布流js
```

```