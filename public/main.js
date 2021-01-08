'use strict'
let time = 0;
main();
function main() {
	getName();
	reload();
}

function reload() {
	if (time % 300 == 0) {
		showMessages();
	}
	time++;
	requestAnimationFrame(reload);
}
function getName() {
	if (!localStorage.getItem("name")) {
		let name = prompt("What is your name?");
		localStorage.setItem("name", name);
	}
}

function showMessages() {
	fetch("/messages").then(res => res.json()).then(messages => {
		const chat = document.getElementById("chat");
		const ulLength = document.querySelectorAll("#chat li").length
		for (let i = ulLength; i < messages.length; i++) {
			let message = messages[i];
			let messageLi =
				`<li class="message">
					<div class="message-info">${message.user} - ${formatDate(message.date)}</div>
					<div class="message-body">${message.message}</div>
				</li>`;
			chat.insertAdjacentHTML("beforeend", messageLi);
		}
	});
}

function formatDate(dateString) {
	const date = new Date(dateString);
	return `${date.getHours()}:${date.getMinutes()}, ${date.getDate()}.${date.getMonth() + 1}`;
}

document.addEventListener("keydown", (e) => {
	if (e.key == "Enter") {
		new Message(document.getElementById("input").value).post();
	}
});