
let racesData = '';
let classesData = '';
let traitsData = '';

let currentCharacter = '';

let chathistory = [];




document.addEventListener('DOMContentLoaded', function() {

    fetchData('https://www.dnd5eapi.co/api/races', data => racesData = data);
    fetchData('https://www.dnd5eapi.co/api/classes', data => classesData = data);
    fetchData('https://www.dnd5eapi.co/api/traits', data => traitsData = data);

    function fetchData(url, callback) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                callback(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});

let DNDSheetMessagesHistory = [
    [ "system", ("You're a helpful assistant that creates the beginnings of DND characters based on prompts. " +
        "You will provide a name, gender, a race, a class, and 3 traits. " +
        "Name and gender are randomly selected based on the given prompts. " +
        `Race is chosen based on the prompt using the following info: ${racesData}. ` +
        `Class is chosen based on the prompt using the following info: ${classesData}. ` +
        `3 traits are chosen based on the prompt using the following info: ${traitsData}. ` +
        "Give no extra information or comments except what was explained earlier. " +
        "If a DND sheet was already given by you earlier and you get more prompts, then refine the existing DND sheet based on the prompt and data given earlier. " +
        "Give your answers only in the format of the following example: Name: Kevin | Gender: Male | Race: Dwarf | Class: Knight | Traits: Trait1, Trait2, Trait3. " +
        "When reacting to an answer by a human, provide only DND character sheets and nothing else (for example, provide a character sheet when prompted with text like 'hello')." +
        "Your responses cannot be anything else other then the dnd character sheet. " +
        "give no more then one character sheet at a time")],
];

document.getElementById('submit').addEventListener('click', async function() {

    document.getElementById('submit').disabled = true;

    let inputDNDsheet = document.getElementById('prompt').value;

    DNDSheetMessagesHistory.push(["human", inputDNDsheet])

    try {
        const response = await fetch('http://localhost:3000/getResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: DNDSheetMessagesHistory.toString()})
        });

        if (!response.ok) {
            DNDSheetMessagesHistory.pop()

            throw new Error('Failed to fetch response from the server');
        }

        const data = await response.json();

        document.getElementById('response').textContent = data.response;
        DNDSheetMessagesHistory.push(["Ai", data.response])
        currentCharacter = data.response


    } catch (error) {
        console.error('Error:', error);
    } finally {
        document.getElementById('submit').disabled = false;
        console.log(DNDSheetMessagesHistory)

        chathistory = [
            ["system", `answer any following prompts as if you are a DND character that is as similar as described in the following data: ${currentCharacter}. use first person perspective, as if you are the character itself`]
        ];
    }
});

document.getElementById('characterReset').addEventListener('click', async function() {
    currentCharacter = '';
    DNDSheetMessagesHistory = [
        [ "system", ("You're a helpful assistant that creates the beginnings of DND characters based on prompts. " +
            "You will provide a name, gender, a race, a class, and 3 traits. " +
            "Name and gender are randomly selected based on the given prompts. " +
            "Race is chosen based on the prompt using the following info: ${racesData}. " +
            "Class is chosen based on the prompt using the following info: ${classesData}. " +
            "3 traits are chosen based on the prompt using the following info: ${traitsData}. " +
            "Give no extra information or comments except what was explained earlier. " +
            "If a DND sheet was already given by you earlier and you get more prompts, then refine the existing DND sheet based on the prompt and data given earlier. " +
            "Give your answers only in the format of the following example: Name: Kevin | Gender: Male | Race: Dwarf | Class: Knight | Traits: Trait1, Trait2, Trait3. " +
            "When reacting to an answer by a human, provide only DND character sheets and nothing else (for example, provide a character sheet when prompted with text like 'hello')." +
            "Your responses cannot be anything else other then the dnd character sheet. " +
            "give no more then one character sheet at a time")],
    ];
    document.getElementById('response').textContent = '';
});

document.getElementById('chatsubmit').addEventListener('click', async function() {

    document.getElementById('chatsubmit').disabled = true;

    let inputchat = document.getElementById('chatprompt').value;
    chathistory.push(["human", inputchat])

    try {
        const response = await fetch('http://localhost:3000/getResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: chathistory.toString()})
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response from the server');
        }

        const data = await response.json();

        document.getElementById('chatresponse').textContent = data.response;
        chathistory.push(["AI", data.response])

        console.log(chathistory)

    } catch (error) {
        console.error('Error:', error);
    } finally {
        document.getElementById('chatsubmit').disabled = false;
    }
});

// document.getElementById('chatsubmitANTHRO').addEventListener('click', async function() {
//
//     document.getElementById('chatsubmitANTHRO').disabled = true;
//
//     let inputchat = document.getElementById('chatprompt').value;
//     chathistory.push(["human", inputchat])
//
//     try {
//         const response = await fetch('http://localhost:3000/getResponseANTHRO', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ prompt: chathistory.toString()})
//         });
//
//         if (!response.ok) {
//             throw new Error('Failed to fetch response from the server');
//         }
//
//         const data = await response.json();
//
//         documentgetElementById('chatresponse').textContent = data.response;
//         chathistory.push(["AI", data.response])
//
//         console.log(chathistory)
//
//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         document.getElementById('chatsubmitANTHRO').disabled = false;
//     }
// });.