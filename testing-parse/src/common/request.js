let getData = function(url, requestData = {}) {
    let request = new XMLHttpRequest();

    if (!request) {
        throw new Error('Could not initialize XMLHttpRequest object!');
    }

    return new Promise((resolve, reject) => {
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                let responseObject = JSON.parse(request.responseText);

                if (request.status === 200) {
                    resolve(responseObject);
                    return;
                }

                reject(responseObject);
            }
        };

        request.open('POST', url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(requestData));
    });
};

export {getData};
