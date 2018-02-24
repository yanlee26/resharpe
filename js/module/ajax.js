class FetchAjax {
	// 'https://davidwalsh.name/demo/arsenal.json'
	json (url, success, fail) {
		let request = new Request(url, {
			method: 'GET', 
			mode: 'cors', 
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'text/plain'
			})
		})
		fetch(request)
			.then(response => response.json())
			.then(success)
			.catch(fail)
	}
	// '/next/page'
	text (url, success, fail) {
		fetch(url)
			.then(response => response.text())
			.then(success)
			.catch(fail)
	}
	// 'https://davidwalsh.name/flowers.jpg'
	blob (url, success, fail) {
		fetch(url)
			.then(response => response.blob())
			.then(success)
			.catch(fail)
	}
	// 'https://davidwalsh.name/submit'
	formData (url, dom) {
		fetch(url, {
			method: 'post',
			body: new FormData(dom)
		})
	}

	formjson (url, json) {
		fetch(url, {
			method: 'post',
			body: JSON.stringify(json)
		})
	}
}