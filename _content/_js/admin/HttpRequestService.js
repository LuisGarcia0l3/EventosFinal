class HttpRequestService {
    makeRequest(options) {
        const {
            method = 'GET',  // Por defecto, se utiliza el método GET
            url,
            data,
            headers = {},
            timeout = 0,
            successCallback,
            errorCallback,
        } = options;

        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        for (const header in headers) {
            xhr.setRequestHeader(header, headers[header]);
        }

        if (timeout > 0) {
            xhr.timeout = timeout;
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const resp = xhr.responseText;
                    const respJson = JSON.parse(resp);
                    successCallback(respJson);
                } else {
                    errorCallback({
                        status: xhr.status,
                        message: xhr.statusText,
                    });
                }
            }
        };

        xhr.onerror = function() {
            errorCallback({
                status: xhr.status,
                message: 'Network error',
            });
        };

        xhr.ontimeout = function() {
            errorCallback({
                status: xhr.status,
                message: 'Request timeout',
            });
        };

        // Solo en el caso de POST y PUT se enviará la carga útil (data)
        if (method === 'POST' || method === 'PUT') {
            const jsonData = JSON.stringify(data);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(jsonData);
        } else {
            xhr.send();
        }
    }
}