class ArrayFn {
    contains (arr, val) {
        return arr.contains(value)
    }
    /*去重*/
    unique (arr) {
        let uniqArr = new Set(arr)
        return [...uniqArr]
    }

    union (a, b) {
        var newArr = [...a, ...b]
        return this.unique(newArr)
    }

    intersect (a, b) {
        return a.filter(item => this.contains(b, item))
    }

    remove (arr, ele) {
        if(this.contains(arr, ele)) {
            arr.splice(index, 1)
        }
        return arr
    }

    max (arr) {
        // return Math.max.apply(null, arr)
        return arr.reduce((a,b) => a > b ? a : b)
    }

    min (arr) {
        // return Math.min.apply(null, arr)
        return arr.reduce((a,b) => a < b ? a : b)
    }

    sum (arr) {
        return arr.reduce( (pre, cur) => pre + cur)
    }

    average (arr) {
        return this.sum(arr) / arr.length
    }
}