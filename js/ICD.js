/**
 * ICD Library v1.0.0
 *
 * Includes select.js, event.js, animate.js
 *
 * Copyright 2014 ICD Foundation
 * Author 	XXXXXXX
 * Tel 		XXXXXX
 * Email 	XXXXXX
 *
 * Date: 2014-11-30
 */
(function(window) {
	var ICD = function(str) {
		if (typeof str == 'function') {
			window.onload = str;
		} else {
			return new ICD.init(str);
		}
	}
	ICD.init = function(str) {
		var sel = '',
			result = [],
			context = [],
			arr = [],
			that = this;
		that.length = 0;
		if (!str) {
			return that;
		}
		if (typeof str === 'string') {
			var group = str.split(',');
			for (var g = 0, glen = group.length; g < glen; g++) {
				var select = group[g].replace(/^\s*|\s*$/g, '').split(' ');
				context = [];
				for (var s = 0, slen = select.length; s < slen; s++) {
					sel = select[s];
					arr = [];
					if (sel.indexOf('#') >= 0) {
						if (context.length) {
							for (var c = 0, clen = context.length; c < clen; c++) {
								pushArr($id(sel.slice(sel.indexOf('#') + 1), context[c]), arr);
							}
						} else {
							pushArr($id(sel.slice(sel.indexOf('#') + 1)), arr);
						}
						context = arr;
					} else if (sel.indexOf('.') >= 0) {
						if (context.length) {
							for (var c = 0, clen = context.length; c < clen; c++) {
								pushArr($class(sel.slice(sel.indexOf('.') + 1), context[c]), arr);
							}
						} else {
							pushArr($class(sel.slice(sel.indexOf('.') + 1)), arr);
						}
						context = arr;
					} else {
						if (context.length) {
							for (var c = 0, clen = context.length; c < clen; c++) {
								pushArr($tag(sel, context[c]), arr);
							}
						} else {
							pushArr($tag(sel), arr);
						}
						context = arr;
					}
				}
				pushArr(context, result, true);
			};
		} else if (str.nodeType) {
			that[0] = str;
			that.length++;
		}

		function pushArr(doms, arr, isResult) {
			for (var k = 0, domsLen = doms.length; k < domsLen; k++) {
				if (isResult) {
					that[that.length] = doms[k];
					that.length++;
				}
				arr.push(doms[k]);
			}
		}

		function $id(id, context) {
			if (!context) {
				var arr = [];
				arr.push(document.getElementById(id));
				return arr;
			} else {
				var dom = context.getElementsByTagName('*'),
					arr = [];
				for (var i = 0, len = dom.length; i < len; i++) {
					if (dom[i].id && dom[i].id.indexOf(id) >= 0) {
						arr.push(dom[i]);
					}
				}
				return arr
			}
		}

		function $tag(tag, context) {
			if (context) {
				return context.getElementsByTagName(tag);
			} else {
				return document.getElementsByTagName(tag);
			}
		}

		function $class(className, context) {
			if (context) {
				if (context.getElementsByClassName) {
					return context.getElementsByClassName(className);
				}
			} else {
				if (document.getElementsByClassName) {
					return document.getElementsByClassName(className);
				}
			}
			var arr = [];
			if (context) {
				var dom = context.getElementsByTagName('*');
			} else {
				var dom = document.getElementsByTagName('*');
			}
			for (var i = 0, len = dom.length; i < len; i++) {
				if (dom[i].className && dom[i].className.indexOf(className) >= 0) {
					arr.push(dom[i]);
				}
			}
			return arr
		}
		return that;
	}
	ICD.extend = function() {
			var key, arg = arguments,
				i = 1,
				len = arg.length,
				target = null;
			if (len === 0) {
				return;
			} else if (len === 1) {
				target = ICD.init.prototype;
				i--;
			} else {
				target = arg[0];
			}

			for (; i < len; i++) {
				for (key in arg[i]) {
					target[key] = arg[i][key];
				}
			}
			return target;
		}
		//全局静态属性
	ICD.init.prototype = {
		version: '1.0.0'
	};
	// ICD.init.constructor = ICD;

	ICD.extend({
		// 添加事件
		on: function(type, fn) {
				if (this.length == 0) {
					return this;
				};
				var i = this.length - 1;
				if (document.addEventListener) {
					for (; i >= 0; i--) {
						this[i].addEventListener(type, fn, false);
					}
				} else if (document.attachEvent) {
					function addEvent(dom) {
						dom.attachEvent('on' + type, function() {
							fn.call(dom);
						});
					}
					for (; i >= 0; i--) {
						// IE 下this为window，此解决办法事件不能移除，解决办法详见jQuery un方法
						addEvent(this[i]);
					}
				} else {
					for (; i >= 0; i--) {
						this[i]['on' + type] = fn;
					}
				}
				return this;
			}
			// 解除事件
			,
		un: function(type, fn) {
			if (this.length == 0) {
				return this;
			};
			var i = this.length - 1;
			if (document.removeEventListener) {
				for (; i >= 0; i--) {
					this[i].removeEventListener(type, fn);
				}
			} else if (document.detachEvent) {
				for (; i >= 0; i--) {
					this[i].detachEvent(type, fn);
				}
			} else {
				for (; i >= 0; i--) {
					this[i]['on' + type] = null;
				}
			}
			return this;
		}
	});
	ICD.extend(ICD, {
		// 获取事件对象
		getEvent: function(event) {
				return event ? event : window.event;
			}
			// 获取元素
			,
		getTarget: function(event) {
			var event = this.getEvent(event);
			return event.target || event.srcElement;
		},
		getICDTarget: function(event) {
				var event = this.getEvent(event);
				return ICD(event.target || event.srcElement);
			}
			// 阻止冒泡以及捕获
			,
		stopPropagation: function(event) {
				var event = this.getEvent(event);
				if (event.stopPropagation) {
					event.stopPropagation();
				} else {
					event.cancelBubble = true;
				}
			}
			// 阻止默认行为
			,
		preventDefault: function(event) {
			var event = this.getEvent(event);
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		getDetail: function(event) {
			var event = this.getEvent(event);
			if (event.wheelDelta) {
				return event.wheelDelta;
			} else {
				return -event.detail * 40;
			}
		}
	});

	//公共方法
	ICD.extend(ICD, {
		camelCase: function(str) {
			return str.replace(/\-(\w)/g, function(all, letter) {
				return letter.toUpperCase();
			});
		},
		trim: function(str) {
			return str.replace(/^\s+|\s+$/g, '')
		},
		formateString: function(str, data) {
			return str.replace(/@\((\w+)\)/g, function(match, key) {
				return typeof data[key] === "undefined" ? '' : data[key]
			});
		}
	});

	//元素模块
	ICD.extend({
		css: function() {
			var arg = arguments,
				len = arg.length;
			if (this.length < 1) {
				return this;
			}
			if (len === 1) {
				if (typeof arg[0] === 'string') {
					if (this[0].currentStyle) {
						return this[0].currentStyle[arg[0]];
					} else {
						return getComputedStyle(this[0], false)[arg[0]];
					}
				} else if (typeof arg[0] === 'object') {
					for (var i in arg[0]) {
						for (var j = this.length - 1; j >= 0; j--) {
							this[j].style[ICD.camelCase(i)] = arg[0][i];
						}
					}
				}
			} else if (len === 2) {
				for (var j = this.length - 1; j >= 0; j--) {
					this[j].style[ICD.camelCase(arg[0])] = arg[1];
				}
			}
			return this;
		},
		attr: function() {
			var arg = arguments,
				len = arg.length;
			if (this.length < 1) {
				return this;
			}
			if (len === 1) {
				if (typeof arg[0] === 'string') {
					return this[0].getAttribute(arg[0]);
				} else if (typeof arg[0] === 'object') {
					for (var i in arg[0]) {
						for (var j = this.length - 1; j >= 0; j--) {
							this[j].setAttribute(i, arg[0][i]);
						}
					}
				}
			} else if (len === 2) {
				for (var j = this.length - 1; j >= 0; j--) {
					this[j].setAttribute(arg[0], arg[1]);
				}
			}
			return this;
		},
		html: function() {
			var arg = arguments,
				len = arg.length;
			if (this.length < 1) {
				return this;
			}
			if (len === 0) {
				return this[0].innerHTML;
			} else if (len === 1) {
				for (var i = this.length - 1; i >= 0; i--) {
					this[i].innerHTML = arg[0];
				}
			} else if (len === 2 && arg[1]) {
				for (var i = this.length - 1; i >= 0; i--) {
					this[i].innerHTML += arg[0];
				}
			}
			return this;
		},
		hasClass: function(val) {
			if (!this[0]) {
				return;
			}
			var value = ICD.trim(val);
			return this[0].className.indexOf(value) >= 0 ? true : false;
		},
		addClass: function(val) {
			var value = ICD.trim(val),
				str = '';
			for (var i = 0, len = this.length; i < len; i++) {
				str = this[i].className;
				if (str.indexOf(value) < 0) {
					this[i].className += ' ' + value;
				}
			}
			return this;
		},
		removeClass: function(val) {
			var value = ICD.trim(val);
			for (var i = 0, len = this.length; i < len; i++) {
				this[i].className = ICD.trim(this[i].className.replace(value, ''));
			}
			return this;
		},
		toggleClass: function(val) {
			var value = ICD.trim(val);
			for (var i = 0, len = this.length; i < len; i++) {
				if (this[0].className.indexOf(value) >= 0) {
					this[i].className = this[i].className.replace(value, '');
				} else {
					this[i].className += ' ' + value;
				}
			}
			return this;
		}
	});

	//操作模块
	ICD.extend(ICD, {
		create: function(type, value) {
			var dom = document.createElement(type);
			return ICD().add(dom).attr(value);
		},
		directChildren: function(dom, tag) {
			var result = [],
				children,
				tag = tag;
			if (typeof dom == 'string') {
				dom = ICD.init(dom);
			}
			if (dom.length) {
				for (var i = 0, len = dom.length; i < len; i++) {
					getDom(dom[i].children);
				}
			} else {
				getDom(dom.children);
			}

			function getDom(doms) {
				for (var c = 0, clen = doms.length; c < clen; c++) {
					if (doms[c].tagName.toLowerCase() == tag.toLowerCase()) {
						result.push(doms[c]);
					}
				}
			}
			return ICD(result);
		}
	})
	ICD.extend({
		add: function(dom) {
			this[this.length] = dom;
			this.length++;
			return this;
		},
		append: function(child) {
			var doms = ICD(child);
			for (var i = 0; i < doms.length; i++) {
				for (var j = this.length - 1; j >= 0; j--) {
					this[j].appendChild(doms[i]);
				}
			}
		},
		appendTo: function(parent) {
			var doms = ICD(parent);
			for (var i = 0; i < doms.length; i++) {
				for (var j = this.length - 1; j >= 0; j--) {
					doms[i].appendChild(this[j]);
				}
			}
		},
		get: function(num) {
			return this[num] ? this[num] : null;
		},
		eq: function(num) {
			return ICD(this.get(num));
		}
	})

	// 动画模块
	var _requestAnimateFrame = (function(w, r) {
			var _lastTime = 0;
			return w['r' + r] || w['webkitR' + r] || w['mozR' + r] || w['msR' + r] || w['oR' + r] || function(callback, element) {
				var _currTime = +new Date(),
					_timeToCall = Math.max(0, 16 - (_currTime - _lastTime)),
					_newTime = _currTime + _timeToCall,
					id = w.setTimeout(function() {
						callback(_newTime);
					}, _timeToCall);
				_lastTime = _newTime;
				return id;
			};
		})(window, 'equestAnimationFrame'),

		_cancelAnimateFrame = (function(w, c) {
			return w['c' + c] || w['webkitC' + c] || w['mozC' + c] || w['msC' + c] || w['oC' + c] || function(t) {
				clearTimeout(t);
			};
		})(window, 'ancelAnimationFrame'),

		_setIntervalFram = function(callback, interval) {
			var id = setInterval(callback, interval);
			return id;
		},

		_clearIntervalFram = function(id) {
			clearInterval(id);
		};

	var Animate = function(interval) {
		this._timer = 0;
		this._queen = [];
		this._interval = interval || false;
	}
	Animate.prototype = {
		easing: {
			def: function(t, b, c, d) {
				return (c - b) * t / d + b
			},
			linear: function(t, b, c, d) {
				return this.def(t, b, c, d);
			}
		},
		_run: function() {
			if (this._timer) return;
			this._reset();
		},
		_clear: function() {
			!this._interval ? _cancelAnimateFrame(this._timer) : _clearIntervalFram(this._timer);
			this._timer = 0;
		},
		_reset: function() {
			this._clear();
			this._go();
		},
		_go: function() {
			var that = this;
			that._timer = !this._interval ? _requestAnimateFrame(function() {
				that._loop();
			}) : _setIntervalFram(function() {
				that._loop();
			}, that._interval);
		},
		_loop: function() {
			if (this._queen.length === 0) {
				this._clear();
				return;
			}
			var now = +new Date(),
				i = this._queen.length - 1,
				instance = null;
			for (; i >= 0; i--) {
				instance = this._queen[i];
				instance.passed = now - instance.time;
				if (instance.passed < 0)
					continue;
				if (instance.passed >= instance.duration) {
					instance.passed = instance.duration;
					instance.tween = instance.to;
					this._execute(instance);
					this._destory(instance);
				} else {
					this._bufferExec(instance);
				}
				instance = null;
			}!this._interval && this._go();
		},
		_execute: function(instance) {
			try {
				instance.main(instance.dom, instance.args);
			} catch (e) {

			}
		},
		_bufferExec: function(instance) {
			instance.tween = typeof instance.step === 'undefined' ?
				this.easing[instance.type](instance.passed, instance.from, instance.to, instance.duration) :
				instance.step;
			this._execute(instance);
		},
		_adaptInstance: function(instance) {
			var opinion = ICD.extend({}, {
				from: 0,
				to: 1,
				type: 'def',
				duration: 400,
				args: null,
				dom: null,
				main: function() {},
				time: +new Date(),
				end: function() {}
			});
			if (instance.type && !(instance.type in this.easing))
				instance.type = 'def';
			for (var key in opinion) {
				if (typeof instance[key] === 'undefined')
					instance[key] = opinion[key];
			}

			return instance;
		},
		_addInstance: function(instance, shouldReset) {
			var obj = this._adaptInstance(instance),
				pos = this._getIndex(obj);
			if (pos < 0) {
				this._queen.push(obj);
			} else {
				if (shouldReset) {
					this._queen[pos].time = +new Date()
				}
			}
		},
		_getIndex: function(instance) {
			var i = this._queen.length - 1;
			for (; i >= 0; i--) {
				if (this._queen[i] === instance) {
					return i
				}
			}
			return -1;
		},
		_destory: function(instance) {
			var that = this;
			that._queen.splice(that._getIndex(instance), 1);
			instance.end(instance.dom, instance.args);
			for (var key in instance) {
				delete instance[key];
			}
			instance = null;
		},
		add: function(param, shouldReset) {
			if (!param)
				return;
			var tostring = Object.prototype.toString;
			if (tostring.call(param) === "[object Array]") {
				for (var i = 0, len = param.length; i < len; i++) {
					tostring.call(param[i]) === "[object Object]" &&
						this._addInstance(param[i], shouldReset);
				}
			} else if (tostring.call(param) === "[object Object]") {
				this._addInstance(param, shouldReset);
			}
			this._run();
			return this;
		},
		stop: function() {
			this._clear();
			return this;
		},
		begin: function() {
			if (typeof arguments[0] === 'boolean' && arguments[0]) {
				this._run();
			} else if (typeof arguments[0] === 'object') {
				var pos = this._getIndex(this._adaptInstance(arguments[0]));
				if (pos >= 0) {
					this._queen[pos].time += getNewTime(this._queen[pos].time, this._queen[pos].passed);
				}
				this._run();
			} else {
				var i = this._queen.length - 1;
				for (; i >= 0; i--) {
					this._queen[i].time += getNewTime(this._queen[i].time, this._queen[i].passed);
				}
				this._run();
			}

			function getNewTime(queenTime, passTime) {
				return +new Date() - queenTime - (!!passTime ? +passTime : 0);
			}
			return this;
		},
		clear: function() {
			this._clear();
			var i = this._queen.length - 1;
			for (; i >= 0; i--) {
				this._destory(this._queen[i]);
			}
			return this;
		},
		remove: function(instance) {
			this._destory(this._adaptInstance(instance));
			return this;
		},
		changeInterval: function(interval) {
				this._clear();
				if (typeof interval === 'number') {
					this._interval = interval;
				} else if (typeof interval === 'boolean' && !interval) {
					this._interval = interval;
				} else if (!interval) {
					this._interval = !!interval;
				}
				this._go();
				return this;
			}
			// number, object, string, boolean 
			,
		create: function() {
			var len = arguments.length,
				_num = null,
				cout = 1;
			if (typeof arguments[0] === "number") {
				_num = arguments[0];
			} else {
				cont = 0;
			}
			if (len > cout) {
				if (typeof arguments[cout] === "object") {
					arguments[cout][arguments[cout + 1] && typeof arguments[cout + 1] === "string" ? arguments[cout + 1] : 'animate'] = new Animate(_num);
					if ((arguments[cout + 1] && typeof arguments[cout + 1] === "boolean") ||
						(arguments[cout + 2] && typeof arguments[cout + 2] === "boolean")) {
						delete w.animate;
					}
				} else if (typeof arguments[cout] === "string") {
					if (typeof arguments[cout] === "boolean") {
						return new Animate(_num);
					} else {
						try {
							if (arguments[cout] in w)
								return;
						} catch (e) {}
						w[arguments[cout]] = new Animate(_num);
						delete w.animate;
					}
				} else {
					return new Animate(_num);
				}
			} else {
				if (_num) {
					w.animate = new Animate(_num);
				} else {
					return new Animate();
				}
			}
			return this;
		}
	}
	ICD.extend(ICD, {
		animate: new Animate()
	});
	ICD.extend({
		tween: ICD.animate.create(),
		animate: function(obj) {
			obj.dom = this;
			this.tween.add(obj);
			return this;
		}
	});

	ICD.noConflict = function(library) {
		if (library) {
			window.$ = library;
		} else {
			window.$ = null;
			delete window.$;
		}
		return ICD;
	}

	window.ICD = window.$ = ICD;
})(window);

// 算法扩展
ICD.extend(ICD.animate.easing, {
	swing: function(t, b, c, d) {
		return this.easeOutQuad(t, b, c, d);
	},
	easeInQuad: function(t, b, c, d) {
		return c * (t /= d) * t + b;
	},
	easeOutQuad: function(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	easeInOutQuad: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInCubic: function(t, b, c, d) {
		return c * (t /= d) * t * t + b;
	},
	easeOutCubic: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},
	easeInOutCubic: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t + 2) + b;
	},
	easeInQuart: function(t, b, c, d) {
		return c * (t /= d) * t * t * t + b;
	},
	easeOutQuart: function(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeInOutQuart: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	easeInQuint: function(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b;
	},
	easeOutQuint: function(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	easeInOutQuint: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	},
	easeInSine: function(t, b, c, d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	},
	easeOutSine: function(t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	},
	easeInOutSine: function(t, b, c, d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	},
	easeInExpo: function(t, b, c, d) {
		return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	},
	easeOutExpo: function(t, b, c, d) {
		return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},
	easeInOutExpo: function(t, b, c, d) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function(t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},
	easeOutCirc: function(t, b, c, d) {
		return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	},
	easeInOutCirc: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	},
	easeInElastic: function(t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	easeOutElastic: function(t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	easeInOutElastic: function(t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d / 2) == 2) return b + c;
		if (!p) p = d * (.3 * 1.5);
		if (a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else var s = p / (2 * Math.PI) * Math.asin(c / a);
		if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	},
	easeInBack: function(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	easeOutBack: function(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	easeInOutBack: function(t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	easeInBounce: function(t, b, c, d) {
		return c - this.easeOutBounce(d - t, 0, c, d) + b;
	},
	easeOutBounce: function(t, b, c, d) {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
		}
	},
	easeInOutBounce: function(t, b, c, d) {
		if (t < d / 2) return this.easeInBounce(t * 2, 0, c, d) * .5 + b;
		return this.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	}
});