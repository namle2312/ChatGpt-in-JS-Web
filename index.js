const API_KEY = 'your-api';
const API_URL = "https://api.openai.com/v1/chat/completions";

const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");



const generate = async () => {

    generateBtn.disabled = true;
    resultText.innerText = "Generating...";

    if (!promptInput.value) {
        alert("Please enter a prompt.");
        return;
    }
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: promptInput.value }],
                max_tokens: 100,
            }),

        });

        const data = await response.json();

        console.log("Data: ", data.choices[0].message.content);
        resultText.innerHTML = data.choices[0].message.content;
    } catch (error) {
        resultText.innerText = "Error occured while generating."
        console.log("Error ne: ", error);

    } finally {
        generate.disabled = false;
    }
}


generateBtn.addEventListener('click', generate);
promptInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        generate();
    }
});
