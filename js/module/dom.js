class DomFn {

    $ (selector){ 
        return document.querySlector(selector)
    } 

    $$ (selector){ 
        return document.querySlectorAll(selector)
    } 

    hasClass (ele, name) {
        return ele.classList.contains(name)
    }

    addClass (ele, name) {
        return ele.classList.add(name)
    }

    removeClass (ele, name) {
        return ele.classList.remove(name)
    }

    toggleClass (ele, name) {
        return ele.classList.toggle(name)
    }

    replaceClass (ele, oldName, newName) {
        return ele.classList.replace(oldName, newName)
    }

    siblings (ele) {
        let chid = ele.parentNode.children
        return children.filter(item => item !== ele)
    }

    getFinalStyle (ele, styleName){
        return  window.getComputedStyle(ele,null).getPropertyValue(styleName)
    }
}