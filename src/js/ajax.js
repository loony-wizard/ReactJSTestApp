function makeAjaxRequest(url, method = "GET", body = "") {

	return new Promise((resolve, reject) => {

		const xhr = new XMLHttpRequest();
		xhr.open(method, url, true);
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onload = function() {
			if (this.status === 200) {
				resolve(this.response);
			} else {
				const error = new Error(this.statusText);
				error.code = this.code;
				reject(error);
			}
		}

		xhr.onerror = function() {
			reject(new Error("Errors with Network"))
		}

		xhr.send(body);

	});

}

export default makeAjaxRequest;