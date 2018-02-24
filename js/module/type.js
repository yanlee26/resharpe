class TypeFn {
    isString (o, type) { 
        return Object.prototype.toString.call(o).slice(8, -1) === type
    }

    isEmpty (o) {
        let empty = ['', 0, null, undefined, false, NaN]
        return empty.contains(o)
    }

    phoneType () {
        let Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"]        
        let userAgentInfo = navigator.userAgent
        return Agents.find(item => userAgentInfo.includes(item))
    }

    isPC () { 
        let userAgentInfo = navigator.userAgent
        let Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"]
        return Agents.filter(item => userAgentInfo.includes(item)).length === 0
    }

    browserType() {
        let ua = window.navigator.userAgent, ret = "", modernUa = ua.split(" ")
        switch(true){
            case /Firefox/g.test(ua) : {
                ret = "Firefox|" + modernUa[modernUa.length - 1].split("/")[1]
                break
            }
            case /Opera/g.test(ua) : {
                ret = "Opera|" + modernUa[modernUa.length - 1].split("/")[1]
                break
            }
            case /Chrome/g.test(ua) : {
                ret = "Chrome|" + modernUa[modernUa.length - 2].split("/")[1]
                break
            }
            case /^apple\s+/i.test(navigator.vendor) : {
                ret = "Safair|" + modernUa[modernUa.length - 2].split("/")[1]
                break
            }
            case /MSIE/g.test(ua) : {
                ua = ua.split(";");
                ret = "IE|" + ua[1].split(" ")[2]
                break
            }
            default: return "未知浏览器"
        }
        
        return ret.split("|")
    }

    checkStr (str, type) {
        switch (type) {
            case 'phone':   
                return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
            case 'tel':    
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            case 'card':    
                return /^\d{15}|\d{18}$/.test(str);
            case 'pwd':    
                return /^[a-zA-Z]\w{5,17}$/.test(str)
            case 'postal':  
                return /[1-9]\d{5}(?!\d)/.test(str);
            case 'QQ':      
                return /^[1-9][0-9]{4,9}$/.test(str);
            case 'email':   
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            case 'money':   
                return /^\d*(?:\.\d{0,2})?$/.test(str);
            case 'URL':     
                return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
            case 'IP':     
                return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
            case 'date':    
                return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
            case 'number':  
                return /^[0-9]$/.test(str);
            case 'english': 
                return /^[a-zA-Z]+$/.test(str);
            case 'chinese': 
                return /^[\u4E00-\u9FA5]+$/.test(str);
            case 'lower':   
                return /^[a-z]+$/.test(str);
            case 'upper':  
                return /^[A-Z]+$/.test(str);
            case 'HTML':    
                return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
            default:
                return true;
        }
    }
}
