# CSS 使用技巧
- 文字
	1. 水平居中
	`text-aligh:center`
	2. 垂直居中
	`div{height:35px;line-height:35px}//1/n容器高度`
- 容器
	1. 水平居中
	`div{width:760px;margin:0 auto}`
	2. 垂直居中
	`
	.outer{
		position:relative;
		height:480px;
	}
	.inner{
	position:absolute;
	top:50%;
	height:240px;
	margin-top:-120px;
	//然后，将小容器定位为absolute，再将它的左上角沿y轴下移50%，最后将它margin-top上移本身高度的50%即可。
	}
	`
- 图片宽度自适应
	`img{max-width:100%}`
- 3D按钮
	`
	button {
　　　　background: #888;
　　　　border: 1px solid;
　　　　border-color: #999 #777 #777 #999;
　　}
	`
- font属性

`
body { 
　　　　font-family: Arial, Helvetica, sans-serif; 
　　　　font-size: 13px; 
　　　　font-weight: normal; 
　　　　font-variant: small-caps; 
　　　　font-style: italic; 
　　　　line-height: 150%; 
　　}
body { 
　　　　font: italic small-caps normal 13px/150% Arial, Helvetica, sans-serif; 
　　}
`
- link状态设置顺序
	`
	a:link 
　　a:visited 
　　a:hover 
　　a:active
	`
- IE条件注释
`<!--[if IE]> 
　　　　<link rel="stylesheet" type="text/css" href="ie-stylesheet.css" /> 
　　< ![endif]-->`

- CSS 优先级
`
　　行内样式 > id样式 > class样式 > 标签名样式

`
- font-size基准
`
　　body {font-size:62.5%;}
//浏览器的缺省字体大小是16px，你可以先将基准字体大小设为10px：
`
- Text-transform和Font Variant
`
p {text-transform: uppercase} 
　　p {text-transform: lowercase} 
　　p {text-transform: capitalize}
`
- reset
`

`
- 图片列表
`
ul {list-style: none}
　　ul li { 
　　　　background-image: url("path-to-your-image"); 
　　　　background-repeat: none; 
　　　　background-position: 0 0.5em; 
　　}
`
- 三角形
`
.triangle { 
　　　　border-color: transparent transparent green transparent;
　　　　border-style: solid; 
　　　　border-width: 0px 300px 300px 300px; 
　　　　height: 0px; 
　　　　width: 0px; 
　　}
`
- 禁止自动换行
`p { white-space:nowrap; }`
- 用图片替换文字---有时我们需要在标题栏中使用图片，但是又必须保证搜索引擎能够读到标题
`h1 { 
　　　　text-indent:-9999px; 
　　　　background:url("h1-image.jpg") no-repeat; 
　　　　width:200px; 
　　　　height:50px; 
　　}`
- 焦点突出
`　　input:focus { border: 2px solid green; }
`
- CSS 提示框
`
　　<a class="tooltip" href="#">链接文字 <span>提示文字</span></a>
a.tooltip {position: relative} 
　　a.tooltip span {display:none; padding:5px; width:200px;} 
　　a:hover {background:#fff;} /*background-color is a must for IE6*/ 
　　a.tooltip:hover span{display:inline; position:absolute;}
`
- 固定位置
`
body{ margin:0;padding:100px 0 0 0;}
　　div#header{
　　　　position:absolute;
　　　　top:0;
　　　　left:0;
　　　　width:100%;
　　　　height:<length>;
　　}
　　@media screen{
　　　　body>div#header{position: fixed;}
　　}
　　* html body{overflow:hidden;}
　　* html div#content{height:100%;overflow:auto;}
`
- 图片预加载
[预加载](https://perishablepress.com/3-ways-preload-images-css-javascript-ajax/)
- CSS选择器
[CSS选择器](http://www.ruanyifeng.com/blog/2009/03/css_selectors.html)
- 背景图定位
[定位](http://www.ruanyifeng.com/blog/2008/05/css_background_image_positioning.html)



























