
//定义一个对象 - 名字是$
var $$ = function () {
};
//第二种写法
$$.prototype = {
    $id: function (str) {
        return document.getElementById(str)
    },
    $tag: function (tag) {
        return document.getElementsByTagName(tag)
    },
    //去除左边空格
    ltrim: function (str) {
        return str.replace(/(^\s*)/g, '');
    },
    //去除右边空格
    rtrim: function (str) {
        return str.replace(/(\s*$)/g, '');
    },
    //去除空格
    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //ajax - 前面我们学习的
    myAjax: function (URL, fn) {
        var xhr = createXHR();	//返回了一个对象，这个对象IE6兼容。
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    fn(xhr.responseText);
                } else {
                    alert("错误的文件！");
                }
            }
        };
        xhr.open("get", URL, true);
        xhr.send();

        //闭包形式，因为这个函数只服务于ajax函数，所以放在里面
        function createXHR() {
            //本函数来自于《JavaScript高级程序设计 第3版》第21章
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                if (typeof arguments.callee.activeXString != "string") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                            "MSXML2.XMLHttp"
                        ],
                        i, len;

                    for (i = 0, len = versions.length; i < len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (ex) {
                            //skip
                        }
                    }
                }

                return new ActiveXObject(arguments.callee.activeXString);
            } else {
                throw new Error("No XHR object available.");
            }
        }
    },
    //tab
    tab: function (id) {
        //如何获取某个父元素下面的子元素
        var box = document.getElementById(id);
        var spans = box.getElementsByTagName('span');
        var lis = box.getElementsByTagName('li');


        //两步走
        //第一步: 先把上半部分实现
        //群体绑定事件  -- 对所有的span绑定事件
        //群体绑定事件
        for (var i = 0; i < spans.length; i++) {
            //相亲法则  -- 给男一号一个代号  --  怎么给 -- 自定义属性
            spans[i].index = i;
            spans[i].onmouseover = function () {
                //排他思想 --  将所有的span置为默认状态  --- 然后再将当前鼠标移上的span置为class -- select
                for (var i = 0; i < spans.length; i++) {
                    spans[i].className = '';
                    lis[i].className = '';
                }
                this.className = 'select';
                lis[this.index].className = 'select';
            }
        }

    },
    //简单的数据绑定formateString
    formateString: function (str, data) {
        return str.replace(/@\((\w+)\)/g, function (match, key) {
            return typeof data[key] === "undefined" ? '' : data[key]
        });
    },
    //给一个对象扩充功能
    extendMany: function () {
        var key, i = 0, len = arguments.length, target = null, copy;
        if (len === 0) {
            return;
        } else if (len === 1) {
            target = this;
        } else {
            i++;
            target = arguments[0];
        }
        for (; i < len; i++) {
            for (key in arguments[i]) {
                copy = arguments[i][key];
                target[key] = copy;
            }
        }
        return target;
    },
    extend: function (tar, source) {
        //遍历对象
        for (var i in source) {
            tar[i] = source[i];
        }
        return tar;
    },
    //随机数
    random: function (begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    },
    //数据类型检测
    isNumber: function (val) {
        return typeof val === 'number' && isFinite(val)
    },
    isBoolean: function (val) {
        return typeof val === "boolean";
    },
    isString: function (val) {
        return typeof val === "string";
    },
    isUndefined: function (val) {
        return typeof val === "undefined";
    },
    isObj: function (str) {
        if (str === null || typeof str === 'undefined') {
            return false;
        }
        return typeof str === 'object';
    },
    isNull: function (val) {
        return val === null;
    },
    isArray: function (arr) {
        if (arr === null || typeof arr === 'undefined') {
            return false;
        }
        return arr.constructor === Array;
    }
}
//在框架中实例化，这样外面使用的使用就不用实例化了
$$ = new $$();

//·â×°Ñ¡Ôñ¿ò¼Ü
$$.extend($$, {
    //idÑ¡ÔñÆ÷
    $id: function(id) {
        return document.getElementById(id);
    },
    //tagÑ¡ÔñÆ÷
    $tag: function(tag, context) {
        if (typeof context == 'string') {
            context = $$.$id(context);
        }

        if (context) {
            return context.getElementsByTagName(tag);
        } else {
            return document.getElementsByTagName(tag);
        }
    },
    //classÑ¡ÔñÆ÷
    $class: function(className, context) {
        var i = 0,
            len, dom = [],
            arr = [];
        //Èç¹û´«µÝ¹ýÀ´µÄÊÇ×Ö·û´® £¬Ôò×ª»¯³ÉÔªËØ¶ÔÏó
        if ($$.isString(context)) {
            context = document.getElementById(context);
        } else {
            context = document;
        }
        //        Èç¹û¼æÈÝgetElementsByClassName
        if (context.getElementsByClassName) {
            return context.getElementsByClassName(className);
        } else {
            //Èç¹ûä¯ÀÀÆ÷²»Ö§³Ö
            dom = context.getElementsByTagName('*');

            for (i; len = dom.length, i < len; i++) {
                if (dom[i].className) {
                    arr.push(dom[i]);
                }
            }
        }
        return arr;
    },
    //·Ö×éÑ¡ÔñÆ÷
    $group: function(content) {
        var result = [],
            doms = [];
        var arr = $$.trim(content).split(',');
        //alert(arr.length);
        for (var i = 0, len = arr.length; i < len; i++) {
            var item = $$.trim(arr[i])
            var first = item.charAt(0)
            var index = item.indexOf(first)
            if (first === '.') {
                doms = $$.$class(item.slice(index + 1))
                //Ã¿´ÎÑ­»·½«doms±£´æÔÚreultÖÐ
                //result.push(doms);//´íÎóÀ´Ô´

                //ÏÝÚå1½â¾ö ·â×°ÖØ¸´µÄ´úÂë³Éº¯Êý
                pushArray(doms, result)

            } else if (first === '#') {
                doms = [$$.$id(item.slice(index + 1))] //ÏÝÚå£ºÖ®Ç°ÎÒÃÇ¶¨ÒåµÄdomsÊÇÊý×é£¬µ«ÊÇ$id»ñÈ¡µÄ²»ÊÇÊý×é£¬¶øÊÇµ¥¸öÔªËØ
                //·â×°ÖØ¸´µÄ´úÂë³Éº¯Êý
                pushArray(doms, result)
            } else {
                doms = $$.$tag(item)
                pushArray(doms, result)
            }
        }
        return result;

        //·â×°ÖØ¸´µÄ´úÂë
        function pushArray(doms, result) {
            for (var j = 0, domlen = doms.length; j < domlen; j++) {
                result.push(doms[j])
            }
        }
    },
    //²ã´ÎÑ¡ÔñÆ÷
    $cengci: function(select) {
        //¸ö¸ö»÷ÆÆ·¨Ôò -- Ñ°ÕÒ»÷ÆÆµã
        var sel = $$.trim(select).split(' ');
        var result = [];
        var context = [];
        for (var i = 0, len = sel.length; i < len; i++) {
            result = [];
            var item = $$.trim(sel[i]);
            var first = sel[i].charAt(0)
            var index = item.indexOf(first)
            if (first === '#') {
                //Èç¹ûÊÇ#£¬ÕÒµ½¸ÃÔªËØ£¬
                pushArray([$$.$id(item.slice(index + 1))]);
                context = result;
            } else if (first === '.') {
                //Èç¹ûÊÇ.
                //Èç¹ûÊÇ.
                //ÕÒµ½contextÖÐËùÓÐµÄclassÎª¡¾s-1¡¿µÄÔªËØ --contextÊÇ¸ö¼¯ºÏ
                if (context.length) {
                    for (var j = 0, contextLen = context.length; j < contextLen; j++) {
                        pushArray($$.$class(item.slice(index + 1), context[j]));
                    }
                } else {
                    pushArray($$.$class(item.slice(index + 1)));
                }
                context = result;
            } else {
                //Èç¹ûÊÇ±êÇ©
                //±éÀú¸¸Ç×£¬ÕÒµ½¸¸Ç×ÖÐµÄÔªËØ==¸¸Ç×¶¼´æÔÚcontextÖÐ
                if (context.length) {
                    for (var j = 0, contextLen = context.length; j < contextLen; j++) {
                        pushArray($$.$tag(item, context[j]));
                    }
                } else {
                    pushArray($$.$tag(item));
                }
                context = result;
            }
        }

        return context;

        //·â×°ÖØ¸´µÄ´úÂë
        function pushArray(doms) {
            for (var j = 0, domlen = doms.length; j < domlen; j++) {
                result.push(doms[j])
            }
        }
    },
    //¶à×é+²ã´Î
    $select: function(str) {
        var result = [];
        var item = $$.trim(str).split(',');
        for (var i = 0, glen = item.length; i < glen; i++) {
            var select = $$.trim(item[i]);
            var context = [];
            context = $$.$cengci(select);
            pushArray(context);

        };
        return result;

        //·â×°ÖØ¸´µÄ´úÂë
        function pushArray(doms) {
            for (var j = 0, domlen = doms.length; j < domlen; j++) {
                result.push(doms[j])
            }
        }
    },
    //html5ÊµÏÖµÄÑ¡ÔñÆ÷
    $all: function(selector, context) {
        context = context || document;
        return context.querySelectorAll(selector);
    },
})

//·â×°css¿ò¼Ü
$$.extend($$, {
    //ÑùÊ½
    css: function(context, key, value) {
        console.log('dfdfd')
        var dom = $$.isString(context) ? $$.$all(context) : context;
        //Èç¹ûÊÇÊý×é
        if (dom.length) {
            //ÏÈ¹Ç¼Ü¹Ç¼Ü -- Èç¹ûÊÇ»ñÈ¡Ä£Ê½ -- Èç¹ûÊÇÉèÖÃÄ£Ê½
            //Èç¹ûvalue²»Îª¿Õ£¬Ôò±íÊ¾ÉèÖÃ
            if (value) {
                for (var i = dom.length - 1; i >= 0; i--) {
                    setStyle(dom[i], key, value);
                }
                //            Èç¹ûvalueÎª¿Õ£¬Ôò±íÊ¾»ñÈ¡
            } else {
                return getStyle(dom[0]);
            }
            //Èç¹û²»ÊÇÊý×é
        } else {
            if (value) {
                setStyle(dom, key, value);
            } else {
                return getStyle(dom);
            }
        }

        function getStyle(dom) {
            if (dom.currentStyle) {
                return dom.currentStyle[key];
            } else {
                return getComputedStyle(dom, null)[key];
            }
        }

        function setStyle(dom, key, value) {
            dom.style[key] = value;
        }
    },
    cssNum: function(context, key) {
        return parseFloat($$.css(context, key))
    },
    //ÏÔÊ¾
    show: function(content) {
        var doms = $$.$all(content)
        for (var i = 0, len = doms.length; i < len; i++) {
            $$.css(doms[i], 'display', 'block');
        }
    },
    //Òþ²ØºÍÏÔÊ¾ÔªËØ
    hide: function(content) {
        var doms = $$.$all(content)
        for (var i = 0, len = doms.length; i < len; i++) {
            $$.css(doms[i], 'display', 'none');
        }
    },
    //ÔªËØ¸ß¶È¿í¶È¸ÅÊö
    //¼ÆËã·½Ê½£ºclientHeight clientWidth innerWidth innerHeight
    //ÔªËØµÄÊµ¼Ê¸ß¶È+border£¬Ò²²»°üº¬¹ö¶¯Ìõ
    Width: function(id) {
        return $$.$id(id).clientWidth
    },
    Height: function(id) {
        return $$.$id(id).clientHeight
    },


    //ÔªËØµÄ¹ö¶¯¸ß¶ÈºÍ¿í¶È
    //µ±ÔªËØ³öÏÖ¹ö¶¯ÌõÊ±ºò£¬ÕâÀïµÄ¸ß¶ÈÓÐÁ½ÖÖ£º¿ÉÊÓÇøÓòµÄ¸ß¶È Êµ¼Ê¸ß¶È£¨¿ÉÊÓ¸ß¶È+²»¿É¼ûµÄ¸ß¶È£©
    //¼ÆËã·½Ê½ scrollwidth
    scrollWidth: function(id) {
        return $$.$id(id).scrollWidth
    },
    scrollHeight: function(id) {
        return $$.$id(id).scrollHeight
    },


    //ÔªËØ¹ö¶¯µÄÊ±ºò Èç¹û³öÏÖ¹ö¶¯Ìõ Ïà¶ÔÓÚ×óÉÏ½ÇµÄÆ«ÒÆÁ¿
    //¼ÆËã·½Ê½ scrollTop scrollLeft
    scrollTop: function(id) {
        return $$.$id(id).scrollTop
    },
    scrollLeft: function(id) {
        return $$.$id(id).scrollLeft
    },

    //»ñÈ¡ÆÁÄ»µÄ¸ß¶ÈºÍ¿í¶È
    screenHeight: function() {
        return window.screen.height
    },
    screenWidth: function() {
        return window.screen.width
    },


    //ÎÄµµÊÓ¿ÚµÄ¸ß¶ÈºÍ¿í¶È
    wWidth: function() {
        return document.documentElement.clientWidth
    },
    wHeight: function() {
        return document.documentElement.clientHeight
    },
    //ÎÄµµ¹ö¶¯ÇøÓòµÄÕûÌåµÄ¸ßºÍ¿í
    wScrollHeight: function() {
        return document.body.scrollHeight
    },
    wScrollWidth: function() {
        return document.body.scrollWidth
    },
    //»ñÈ¡¹ö¶¯ÌõÏà¶ÔÓÚÆä¶¥²¿µÄÆ«ÒÆ
    wScrollTop: function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        return scrollTop
    },
    //»ñÈ¡¹ö¶¯ÌõÏà¶ÔÓÚÆä×ó±ßµÄÆ«ÒÆ
    wScrollLeft: function() {
        var scrollLeft = document.body.scrollLeft || (document.documentElement && document.documentElement.scrollLeft);
        return scrollLeft
    }
})

//·â×°ÊôÐÔ¿ò¼Ü
$$.extend($$, {
    //ÊôÐÔ²Ù×÷£¬»ñÈ¡ÊôÐÔµÄÖµ£¬ÉèÖÃÊôÐÔµÄÖµ at tr£¨'test','target','_blank'£©
    attr: function(content, key, value) {
        var dom = $$.$all(content);
        //        Èç¹ûÊÇÊý×é  ±ÈÈçtag
        if (dom.length) {
            if (value) {
                for (var i = 0, len = dom.length; i < len; i++) {
                    dom[i].setAttribute(key, value);
                }
            } else {
                return dom[0].getAttribute(key);
            }
            //            Èç¹ûÊÇµ¥¸öÔªËØ  ±ÈÈçid
        } else {
            if (value) {
                dom.setAttribute(key, value);
            } else {
                return dom.getAttribute(key);
            }
        }
    },
    //¶¯Ì¬Ìí¼ÓºÍÒÆ³ýclass
    addClass: function(context, name) {
        var doms = $$.$all(context);
        //Èç¹û»ñÈ¡µÄÊÇ¼¯ºÏ
        if (doms.length) {
            for (var i = 0, len = doms.length; i < len; i++) {
                addName(doms[i]);
            }
            //Èç¹û»ñÈ¡µÄ²»ÊÇ¼¯ºÏ
        } else {
            addName(doms);
        }

        function addName(dom) {
            dom.className = dom.className + ' ' + name;
        }
    },
    removeClass: function(context, name) {
        var doms = $$.$all(context);
        if (doms.length) {
            for (var i = 0, len = doms.length; i < len; i++) {
                removeName(doms[i]);
            }
        } else {
            removeName(doms);
        }

        function removeName(dom) {
            dom.className = dom.className.replace(name, '');
        }
    },
    //ÅÐ¶ÏÊÇ·ñÓÐ
    hasClass: function(context, name) {
        var doms = $$.$all(context)
        var flag = true;
        for (var i = 0, len = doms.length; i < len; i++) {
            flag = flag && check(doms[i], name)
        }

        return flag;
        //ÅÐ¶¨µ¥¸öÔªËØ
        function check(element, name) {
            return -1 < (" " + element.className + " ").indexOf(" " + name + " ")
        }
    },
    //»ñÈ¡
    getClass: function(id) {
        var doms = $$.$all(id)
        return $$.trim(doms[0].className).split(" ")
    }
})

//ÄÚÈÝ¿ò¼Ü
$$.extend($$, {
    //innerHTMLµÄº¯Êý°æ±¾
    html: function(context, value) {
        var doms = $$.$all(context);
        //ÉèÖÃ
        if (value) {
            for (var i = 0, len = doms.length; i < len; i++) {
                doms[i].innerHTML = value;
            }
        } else {
            return doms[0].innerHTML
        }
    }
})
$$.extend($$, {
    /*绑定事件*/
    on: function (id, type, fn) {
        //var dom = document.getElementById(id);
        var dom = $$.isString(id) ? document.getElementById(id) : id;
        //如果支持
        //W3C版本 --火狐 谷歌 等大多数浏览器
        //如果你想检测对象是否支持某个属性，方法，可以通过这种方式
        if (dom.addEventListener) {
            dom.addEventListener(type, fn, false);
        } else if (dom.attachEvent) {
            //如果支持 --IE
            dom.attachEvent('on' + type, fn);
        }
    },
    /*解除事件*/
    un: function (id, type, fn) {
        //var dom = document.getElementById(id);
        var dom = $$.isString(id) ? document.getElementById(id) : id;
        if (dom.removeEventListener) {
            dom.removeEventListener(type, fn);
        } else if (dom.detachEvent) {
            dom.detachEvent(type, fn);
        }

    },
    /*点击*/
    click: function (id, fn) {
        this.on(id, 'click', fn);
    },
    /*鼠标移上*/
    mouseover: function (id, fn) {
        this.on(id, 'mouseover', fn);
    },
    /*鼠标离开*/
    mouseout: function (id, fn) {
        this.on(id, 'mouseout', fn);
    },
    /*悬浮*/
    hover: function (id, fnOver, fnOut) {
        if (fnOver) {
            this.on(id, "mouseover", fnOver);
        }
        if (fnOut) {
            this.on(id, "mouseout", fnOut);
        }
    },
    //事件委托
    delegate: function (pid, eventType, selector, fn) {
        //参数处理
        var parent = $$.$id(pid);

        function handle(e) {
            var target = $$.GetTarget(e);
            if (target.nodeName.toLowerCase() === selector || target.id === selector || target.className.indexOf(selector) != -1) {
                // 在事件冒泡的时候，回以此遍历每个子孙后代，如果找到对应的元素，则执行如下函数
                // 为什么使用call，因为call可以改变this指向
                // 大家还记得，函数中的this默认指向window，而我们希望指向当前dom元素本身
                fn.call(target);
            }
        }

        //当我们给父亲元素绑定一个事件，他的执行顺序：先捕获到目标元素，然后事件再冒泡
        //这里是是给元素对象绑定一个事件
        parent[eventType] = handle;
    },
    //事件基础
    getEvent: function (event) {
        return event ? event : window.event;
    },
    //获取目标
    GetTarget: function (event) {
        var e = $$.getEvent(event);
        return e.target || e.srcElement;
    },
    //组织默认行为
    preventDefault: function (event) {
        var event = $$.getEvent(event);
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    //阻止冒泡
    stopPropagation: function (event) {
        var event = $$.getEvent(event);
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
})
//·â×°DOM¿ò¼Ü -- ·ÅÔÚºóÃæ
$$.extend($$, {
    //Ñ¡Ôñ
    eq: function() {},
    first: function() {},
    last: function() {},
    //ÔªËØµÄ²åÈëºÍÉ¾³ý ¿ËÂ¡
    append: function() {},
    empty: function() {},
    remove: function() {},
    clone: function() {}
});

//·â×°json¿ò¼Ü
$$.extend($$, {
    //½«json×ª»»³É×Ö·û´®
    sjson: function(json) {
        return JSON.stringify(json);
    },
    //½«×Ö·û´®×ª³Éjson
    json: function(str) {
        return eval(str);
    }
})

//»º´æ¿ò¼Ü - ÄÚ´æÆª
$$.cache = {
    data: [],
    get: function(key) {
        console.log('111')
        var value = null;
        console.log(this.data)
        for (var i = 0, len = this.data.length; i < len; i++) {
            var item = this.data[i]
            if (key == item.key) {
                value = item.value;
            }
        }
        console.log('get' + value)
        return value;
    },
    add: function(key, value) {
        var json = { key: key, value: value };
        this.data.push(json);
    },
    delete: function(key) {
        var status = false;
        for (var i = 0, len = this.data.length; i < len; i++) {
            var item = this.data[i]
            // Ñ­»·Êý×éÔªËØ
            if (item.key.trim() == key) {
                this.data.splice(i, 1); //¿ªÊ¼Î»ÖÃ,É¾³ý¸öÊý
                status = true;
                break;
            }
        }
        return status;
    },
    update: function(key, value) {
        var status = false;
        // Ñ­»·Êý×éÔªËØ
        for (var i = 0, len = this.data.length; i < len; i++) {
            var item = this.data[i]
            if (item.key.trim() === key.trim()) {
                item.value = value.trim();
                status = true;
                break;
            }
        }
        return status;
    },
    isExist: function(key) {
        for (var i = 0, len = this.data.length; i < len; i++) {
            var item = this.data[i]
            if (key === item.key) {
                return true;
            } else {
                return false;
            }
        }
    }
}

//cookie¿ò¼Ü
$$.cookie = {
    //ÉèÖÃcoolie
    setCookie: function(name, value, days, path) {
        var name = escape(name);
        var value = escape(value);
        var expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        path = path == "" ? "" : ";path=" + path;
        _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
        document.cookie = name + "=" + value + _expires + path;
    },
    //»ñÈ¡cookieÖµ
    getCookie: function(name) {
        var name = escape(name);
        //¶ÁcookieÊôÐÔ£¬Õâ½«·µ»ØÎÄµµµÄËùÓÐcookie
        var allcookies = document.cookie;

        //²éÕÒÃûÎªnameµÄcookieµÄ¿ªÊ¼Î»ÖÃ
        name += "=";
        var pos = allcookies.indexOf(name);
        //Èç¹ûÕÒµ½ÁË¾ßÓÐ¸ÃÃû×ÖµÄcookie£¬ÄÇÃ´ÌáÈ¡²¢Ê¹ÓÃËüµÄÖµ
        if (pos != -1) { //Èç¹ûposÖµÎª-1ÔòËµÃ÷ËÑË÷"version="Ê§°Ü
            var start = pos + name.length; //cookieÖµ¿ªÊ¼µÄÎ»ÖÃ
            var end = allcookies.indexOf(";", start); //´ÓcookieÖµ¿ªÊ¼µÄÎ»ÖÃÆðËÑË÷µÚÒ»¸ö";"µÄÎ»ÖÃ,¼´cookieÖµ½áÎ²µÄÎ»ÖÃ
            if (end == -1) end = allcookies.length; //Èç¹ûendÖµÎª-1ËµÃ÷cookieÁÐ±íÀïÖ»ÓÐÒ»¸öcookie
            var value = allcookies.substring(start, end); //ÌáÈ¡cookieµÄÖµ
            return unescape(value); //¶ÔËü½âÂë
        } else return ""; //ËÑË÷Ê§°Ü£¬·µ»Ø¿Õ×Ö·û´®
    },
    //É¾³ýcookie
    deleteCookie: function(name, path) {
        var name = escape(name);
        var expires = new Date(0);
        path = path == "" ? "" : ";path=" + path;
        document.cookie = name + "=" + ";expires=" + expires.toUTCString() + path;
    }
}

//±¾µØ´æ´¢¿ò¼Ü
$$.store = (function() {
    var api = {},
        win = window,
        doc = win.document,
        localStorageName = 'localStorage',
        globalStorageName = 'globalStorage',
        storage;

    api.set = function(key, value) {};
    api.get = function(key) {};
    api.remove = function(key) {};
    api.clear = function() {};

    if (localStorageName in win && win[localStorageName]) {
        storage = win[localStorageName];
        api.set = function(key, val) { storage.setItem(key, val) };
        api.get = function(key) {
            return storage.getItem(key) };
        api.remove = function(key) { storage.removeItem(key) };
        api.clear = function() { storage.clear() };

    } else if (globalStorageName in win && win[globalStorageName]) {
        storage = win[globalStorageName][win.location.hostname];
        api.set = function(key, val) { storage[key] = val };
        api.get = function(key) {
            return storage[key] && storage[key].value };
        api.remove = function(key) { delete storage[key] };
        api.clear = function() {
            for (var key in storage) { delete storage[key] } };

    } else if (doc.documentElement.addBehavior) {
        function getStorage() {
            if (storage) {
                return storage }
            storage = doc.body.appendChild(doc.createElement('div'));
            storage.style.display = 'none';
            // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
            // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
            storage.addBehavior('#default#userData');
            storage.load(localStorageName);
            return storage;
        }
        api.set = function(key, val) {
            var storage = getStorage();
            storage.setAttribute(key, val);
            storage.save(localStorageName);
        };
        api.get = function(key) {
            var storage = getStorage();
            return storage.getAttribute(key);
        };
        api.remove = function(key) {
            var storage = getStorage();
            storage.removeAttribute(key);
            storage.save(localStorageName);
        }
        api.clear = function() {
            var storage = getStorage();
            var attributes = storage.XMLDocument.documentElement.attributes;;
            storage.load(localStorageName);
            for (var i = 0, attr; attr = attributes[i]; i++) {
                storage.removeAttribute(attr.name);
            }
            storage.save(localStorageName);
        }
    }
    return api;
})();
var store = (function () {
    var api               = {},
        win               = window,
        doc               = win.document,
        localStorageName  = 'localStorage',
        globalStorageName = 'globalStorage',
        storage;

    api.set    = function (key, value) {};
    api.get    = function (key)        {};
    api.remove = function (key)        {};
    api.clear  = function ()           {};

    if (localStorageName in win && win[localStorageName]) {
        storage    = win[localStorageName];
        api.set    = function (key, val) { storage.setItem(key, val) };
        api.get    = function (key)      { return storage.getItem(key) };
        api.remove = function (key)      { storage.removeItem(key) };
        api.clear  = function ()         { storage.clear() };

    } else if (globalStorageName in win && win[globalStorageName]) {
        storage    = win[globalStorageName][win.location.hostname];
        api.set    = function (key, val) { storage[key] = val };
        api.get    = function (key)      { return storage[key] && storage[key].value };
        api.remove = function (key)      { delete storage[key] };
        api.clear  = function ()         { for (var key in storage ) { delete storage[key] } };

    } else if (doc.documentElement.addBehavior) {
        function getStorage() {
            if (storage) { return storage }
            storage = doc.body.appendChild(doc.createElement('div'));
            storage.style.display = 'none';
            // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
            // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
            storage.addBehavior('#default#userData');
            storage.load(localStorageName);
            return storage;
        }
        api.set = function (key, val) {
            var storage = getStorage();
            storage.setAttribute(key, val);
            storage.save(localStorageName);
        };
        api.get = function (key) {
            var storage = getStorage();
            return storage.getAttribute(key);
        };
        api.remove = function (key) {
            var storage = getStorage();
            storage.removeAttribute(key);
            storage.save(localStorageName);
        }
        api.clear = function () {
            var storage = getStorage();
            var attributes = storage.XMLDocument.documentElement.attributes;;
            storage.load(localStorageName);
            for (var i=0, attr; attr = attributes[i]; i++) {
                storage.removeAttribute(attr.name);
            }
            storage.save(localStorageName);
        }
    }
    return api;
})();

//给函数扩展方法
Function.prototype.before = function( func ) {
    var __self = this;
    return function() {
        if ( func.apply( this, arguments ) === false ) {
            return false;
        }
        return __self.apply( this, arguments );
    }
}

Function.prototype.after = function( func ) {
    var __self = this;
    return function() {
        var ret = __self.apply( this, arguments );
        if( ret === false) {
            return false;
        }
        func.apply( this, arguments );
        return ret;
    }
}