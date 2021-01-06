(function() {
    const socket = io();

    socket.on('new-victim', function(host) {
        let item = document.createElement("li");
        item.textContent = host;
        document.getElementById('zombies').append(item);
    });

})();

const runAto = () => {
    alert("Running attack");
};