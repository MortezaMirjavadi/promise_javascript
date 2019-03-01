// Simple code of promise in javascript
const thread = new Promise((resolve, reject) => {
    let a = 1 + 2;
    if (a === 2) {
        resolve("success");
    }
    else {
        reject("failed");
    }
});

thread.then((message) => {
    console.log("This is in the then " + message);
}).catch((message) => {
    console.log("This is in the catch " + message );
});

// Call webapi with promise and XMLHttpRequest in javascript
function callApi(method, url) {
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();
        http.open(method, url);
        http.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(http.response);
            } else {
                reject({
                    status: this.status,
                    statusText: http.statusText
                });
            }
        };
        http.onerror = function () {
            reject({
                status: this.status,
                statusText: http.statusText
            });
        };
        http.send();
    })
}

const userId = 1;
callApi("GET", `https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((data) => {
        const json = JSON.parse(data);
        console.log(json);
        return callApi("GET", "https://jsonplaceholder.typicode.com/posts");
    })
    .then((data) => {
        const json = JSON.parse(data);
        json.forEach(post => {
            if (post.userId === userId) {
                console.log(post);
            }
        })
    })
    .catch((error) => {
        console.log(error);
    });
