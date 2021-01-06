(function() {
    // set submit listener
    document.getElementById("form").addEventListener("submit", function(e) {
        e.preventDefault();
        attemptLogin();
    });
})();

const attemptLogin = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    axios
        .post(
            "http://127.0.0.1:3002/authenticate",
            JSON.stringify({ username: username, password: password }), {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => {
            // I know probably not what you want to see (I hope to improve security of the site later)
            window.location.href = "http://localhost:3002/admin.html";
        })
        .catch((err) => {
            // display and error
            document.getElementById("error").setAttribute("class", "d-block text-danger text-center");
            console.log(err);
        });
};