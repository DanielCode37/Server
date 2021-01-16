'use strict'
let time = 0;
main();
function main() {
	getName();
	// reload();
	showMessages();
	showChatList();
}

// function reload() {
// 	if (time % 300 == 0) {
// 		showMessages();
// 	}
// 	time++;
// 	requestAnimationFrame(reload);
// }

function getName() {
	if (!localStorage.getItem("name")) {
		let name = prompt("What is your name?");
		localStorage.setItem("name", name);
	}
}

function showMessages() {
	fetch(`/get${location.pathname}`)
		.then(res => res.json())
		.then(messages => {
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

function showChatList() {
	const list = document.getElementById("chat-list");
	fetch("/get/*")
		.then(res => res.json)
		.then(chats => {
			if (Array.isArray(chats)) {
				for (let chat of chats) {
					const chatLi =
						`<li class="chat-list-item">
						<div>${chat}</div>
					</li>`
				}
			}
			else {
				console.log(chats);
				throw "chats not of type Array";
			}
		});
}
function formatDate(dateString) {
	const date = new Date(dateString);
	return `${date.getHours()}:${date.getMinutes()}, ${date.getDate()}.${date.getMonth() + 1}`;
}

function postMessage() {
	fetch("/", {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user: localStorage.getItem("name"),
			date: new Date(),
			message: document.getElementById("input").value
		})
	}).then(location.reload());
}

document.addEventListener("keydown", (e) => {
	if (e.key == "Enter") {
		postMessage();
	}
});