// Add your code here
//函数节流
function throttle (fn, wait) {
    let _fn = fn,       // 保存需要被延迟的函数引用
        timer,          
        flags = true;   // 是否首次调用

    return function() {
        let args = arguments,
            self = this;

        if (flags) {    // 如果是第一次调用不用延迟，直接执行即可
            _fn.apply(self, args);
            flags = false;
            return flags;
        }
        // 如果定时器还在，说明上一次还没执行完，不往下执行
        if (timer) return false;
            
        timer = setTimeout(function() { // 延迟执行
            clearTimeout(timer);    // 清空上次的定时器
            timer = null;           // 销毁变量
            _fn.apply(self, args);
        }, wait);
    }
}

function timeChunk(data, fn, count = 1, wait) {
    let obj, timer;

    function start() {
        let len = Math.min(count, data.length);
        for (let i = 0; i < len; i++) {
            val = data.shift();     // 每次取出一个数据，传给fn当做值来用
            fn(val);
        }
    }

    return function() {
        timer = setInterval(function() {
            if (data.length === 0) {    // 如果数据为空了，就清空定时器
                return clearInterval(timer);
            }
            start();    
        }, wait);   // 分批执行的时间间隔
    }
}
// 理解去抖函数
var debounce = function (callback, delay, immediate) {
	var timeout, result;
	return function () {
		var callNow;
		if (timeout)
			clearTimeout(timeout);
		callNow = !timeout && immediate;
		if (callNow) {
			result = callback.apply(this, Array.prototype.slice.call(arguments, 0));
			timeout = {};
		}
		else {
			timeout = setTimeout(() => {
				callback.apply(this, Array.prototype.slice.call(arguments, 0));
			}, delay);
		}
	};
};
// deepClone
function deepCopy(obj, parent = null) {
    // 创建一个新对象
    let result = {};
    let keys = Object.keys(obj),
        key = null,
        temp= null,
        _parent = parent;
    // 该字段有父级则需要追溯该字段的父级
    while (_parent) {
        // 如果该字段引用了它的父级则为循环引用
        if (_parent.originalParent === obj) {
            // 循环引用直接返回同级的新对象
            return _parent.currentParent;
        }
        _parent = _parent.parent;
    }
    for (let i = 0; i < keys.length; i++) {
        key = keys[i];
        temp= obj[key];
        // 如果字段的值也是一个对象
        if (temp && typeof temp=== 'object') {
            // 递归执行深拷贝 将同级的待拷贝对象与新对象传递给 parent 方便追溯循环引用
            result[key] = DeepCopy(temp, {
                originalParent: obj,
                currentParent: result,
                parent: parent
            });

        } else {
            result[key] = temp;
        }
    }
    return result;
}
// 随机选出数组中指定个数的元素
function getRandomArrayElements(arr) {
  const count = Math.floor(Math.random() * (6 - 3 + 1) + 3)
  var shuffled = arr.slice(0),
    len = arr.length,
    min = len - count,
    index
  let temp = null
  // len=len-1 > min时，交换随机索引处元素与len处元素位置，需要取多少个元素随机交换多少次，保证了一定的随机性同时避免了重复交换
  while (len-- > min) {
    index = Math.floor((len + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[len]
    shuffled[len] = temp
  }
  return shuffled.slice(min)
}

// 2-1去除字符串空格
//去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
//ecDo.trim('  1235asd',1)
//result：1235asd
//这个方法有原生的方案代替，但是考虑到有时候开发PC站需要兼容IE8，所以就还是继续保留
trim: function (str, type) {
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}




