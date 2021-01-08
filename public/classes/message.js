class Message {
    constructor(message) {
        this.user = localStorage.getItem("name");
        this.date = new Date();
        this.message = message;
        console.log(this);
    }

    post() {
        fetch("/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        }).then(location.reload());
    }
} 