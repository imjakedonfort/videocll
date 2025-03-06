const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

let conversationStep = 0;

const messages = [
    {
        type: 'system',
        text: 'Sistemul a fost pornit...'
    },
    {
        type: 'system',
        text: 'Bun venit! Vrei să începi conversația?'
    },
    {
        type: 'user',
        text: 'Da, sunt gata!'
    },
    {
        type: 'system',
        text: 'Bine! Te voi ghida printr-o serie de întrebări. Găsește răspunsul corect!'
    },
    {
        type: 'system',
        text: 'Ce crezi că este această temă?'
    },
    {
        type: 'options',
        text: 'A. Hacker \nB. Magic \nC. Artă'
    }
];

function appendMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(message.type);
    messageDiv.innerText = message.text;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function handleUserInput() {
    const inputText = userInput.value;
    if (inputText.trim() !== '') {
        appendMessage({
            type: 'user',
            text: inputText
        });

        userInput.value = '';
        setTimeout(() => {
            nextStep(inputText);
        }, 1000);
    }
}

function nextStep(inputText) {
    conversationStep++;

    if (conversationStep === 5) {
        appendMessage({
            type: 'system',
            text: messages[conversationStep].text
        });
    } else if (conversationStep === 6) {
        appendMessage({
            type: 'system',
            text: messages[conversationStep].text
        });

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');
        const options = messages[conversationStep].text.split('\n');
        options.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.innerText = option;
            optionButton.addEventListener('click', function() {
                appendMessage({
                    type: 'user',
                    text: option
                });
                setTimeout(() => {
                    conversationStep++;
                    nextStep('');
                }, 1000);
            });
            optionsDiv.appendChild(optionButton);
        });
        chatWindow.appendChild(optionsDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

setTimeout(() => {
    nextStep('');
}, 2000);
