const sendBtn = document.getElementById("send-button");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

function addMessage(sender, text) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", async() => {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage("user", text);
    userInput.value = "";
    
    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({message: text})
    });

    const data = await response.json();
    addMessage("bot", data.reply);
});

userInput.addEventListener("keydown", (event) => {
   
    if(event.key === "Enter" && !event.shiftKey){
        event.preventDefault();
        sendBtn.click();
    }
});