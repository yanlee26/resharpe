class JsCompress {
	constructor (type = 'image/jpeg') {
	  this.type = type
	}
 
	urltoImage (url, fn) {
	  var img = new Image()
	  img.src = url
	  img.onload = function () {
		fn(img)
	  }
	}
 
	imagetoCanvas (image) {
	  var cvs = document.createElement('canvas')
	  var ctx = cvs.getContext('2d')
	  cvs.width = image.width
	  cvs.height = image.height
	  ctx.drawImage(image, 0, 0, cvs.width, cvs.height)
	  return cvs
	}
 
	canvasResizetoFile (canvas, quality, fn) {
	  canvas.toBlob(function (blob) {
		fn(blob)
	  }, this.type, quality)
	}
 
	canvasResizetoDataURL (canvas, quality) {
	  return canvas.toDataURL(this.type, quality)
	}
 
	filetoDataURL (file, fn) {
	  var reader = new FileReader()
	  reader.readAsDataURL(file)
	  reader.onloadend = (e) => {
		fn(e.target.result)
	  }
	}
 
	dataURLtoImage (dataurl, fn) {
	  var img = new Image()
	  img.src = dataurl
	  img.onload = () => {
		fn(img)
	  }
	}
 
	dataURLtoFile (dataurl) {
	  var arr = dataurl.split(',')
	  var mime = arr[0].match(/:(.*?);/)[1]
	  var bstr = atob(arr[1])
	  var n = bstr.length
	  var u8arr = new Uint8Array(n)
	  while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	  }
	  return new Blob([u8arr], {type: mime})
	}
 
	fileResizetoFile (file, quality, fn) {
	  this.filetoDataURL(file, dataurl => {
		this.dataURLtoImage(dataurl, image => {
		  this.canvasResizetoFile(this.imagetoCanvas(image), quality, fn)
		})
	  })
	}
}