
// GET THE HTML ELEMENTS
const welcomeScreen = document.getElementById("welcomeScreen");
const homeScreen = document.getElementById("homeScreen");
const roomScreen = document.getElementById("roomScreen");

const enterButton = document.getElementById("enterButton");
const backButton = document.getElementById("backButton");

const roomCards = document.querySelectorAll(".room-card");

const roomIcon = document.getElementById("roomIcon");
const roomTitle = document.getElementById("roomTitle");
const roomDescription = document.getElementById("roomDescription");

const diaryArea = document.getElementById("diaryArea");
const diaryTitle = document.getElementById("diaryTitle");
const diaryText = document.getElementById("diaryText");
const saveDiary = document.getElementById("saveDiary");
const diaryMessage = document.getElementById("diaryMessage");
const diaryEntries = document.getElementById("diaryEntries");

const comingSoon = document.querySelector(".coming-soon");


// ROOM INFORMATION
const rooms = {
    diary: {
        icon: "📖",
        title: "My Diary",
        description: "A safe little space for my thoughts and feelings."
    },

    memories: {
        icon: "📸",
        title: "My Memories",
        description: "Little moments I never want to forget."
    },

    dreams: {
        icon: "🌷",
        title: "My Dreams",
        description: "Everything I hope to become and achieve."
    },

    favourites: {
        icon: "♡",
        title: "Little Things",
        description: "All the little things that make me happy."
    }
};


// ENTER THE HOMEPAGE
enterButton.addEventListener("click", function () {
    welcomeScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
});


// OPEN A ROOM
roomCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const selectedRoom = card.dataset.room;
        const room = rooms[selectedRoom];

        if (!room) return;

        homeScreen.classList.add("hidden");
        roomScreen.classList.remove("hidden");

        roomIcon.textContent = room.icon;
        roomTitle.textContent = room.title;
        roomDescription.textContent = room.description;

        diaryArea.classList.add("hidden");
        memoryArea.classList.add("hidden");
        comingSoon.classList.remove("hidden");

        if (selectedRoom === "diary") {
            diaryArea.classList.remove("hidden");
            comingSoon.classList.add("hidden");
            displayDiaryEntries();
        }
if (selectedRoom === "memories") {
    memoryArea.classList.remove("hidden");
    comingSoon.classList.add("hidden");
    displayMemories();
}
    });

});


// GO BACK TO HOMEPAGE
backButton.addEventListener("click", function () {
    roomScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
});


// GET SAVED DIARY ENTRIES
function getDiaryEntries() {
    return JSON.parse(localStorage.getItem("myDiaryEntries")) || [];
}


// SAVE A DIARY ENTRY
saveDiary.addEventListener("click", function () {

    const title = diaryTitle.value.trim();
    const content = diaryText.value.trim();

    if (!title || !content) {
        diaryMessage.textContent = "Please add a title and your thoughts first.";
        return;
    }

    const entries = getDiaryEntries();

    const newEntry = {
        title: title,
        content: content,
        date: new Date().toLocaleDateString()
    };

    entries.unshift(newEntry);

    localStorage.setItem("myDiaryEntries", JSON.stringify(entries));

    diaryTitle.value = "";
    diaryText.value = "";

    diaryMessage.textContent = "Your entry has been saved! ♡";

    displayDiaryEntries();

});


// DISPLAY PREVIOUS DIARY ENTRIES
function displayDiaryEntries() {

    const entries = getDiaryEntries();

    diaryEntries.innerHTML = "";

    if (entries.length === 0) {
        diaryEntries.textContent = "Your diary is waiting for its first story.";
        return;
    }

    entries.forEach(function (entry) {

        const entryCard = document.createElement("div");
        entryCard.className = "diary-entry";

        const heading = document.createElement("h4");
        heading.textContent = entry.title;

        const date = document.createElement("small");
        date.textContent = entry.date;

        const paragraph = document.createElement("p");
        paragraph.textContent = entry.content;

        entryCard.appendChild(heading);
        entryCard.appendChild(date);
        entryCard.appendChild(paragraph);

        diaryEntries.appendChild(entryCard);

    });

}

// MEMORIES ROOM
const memoryArea = document.getElementById("memoryArea");
const memoryTitle = document.getElementById("memoryTitle");
const memoryText = document.getElementById("memoryText");
const saveMemory = document.getElementById("saveMemory");
const memoryMessage = document.getElementById("memoryMessage");
const memoryEntries = document.getElementById("memoryEntries");


// GET SAVED MEMORIES
function getMemories() {
    return JSON.parse(localStorage.getItem("myMemories")) || [];
}


// SAVE A MEMORY
saveMemory.addEventListener("click", function () {

    const title = memoryTitle.value.trim();
    const content = memoryText.value.trim();

    if (!title || !content) {
        memoryMessage.textContent = "Please fill in both fields first.";
        return;
    }

    const memories = getMemories();

    memories.unshift({
        title: title,
        content: content,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("myMemories", JSON.stringify(memories));

    memoryTitle.value = "";
    memoryText.value = "";

    memoryMessage.textContent = "Memory saved successfully!";

    displayMemories();
});


// DISPLAY SAVED MEMORIES
function displayMemories() {

    const memories = getMemories();

    memoryEntries.innerHTML = "";

    if (memories.length === 0) {
        memoryEntries.textContent = "No memories saved yet.";
        return;
    }

    memories.forEach(function (memory) {

        const card = document.createElement("div");
        card.className = "diary-entry";

        const heading = document.createElement("h4");
        heading.textContent = memory.title;

        const date = document.createElement("small");
        date.textContent = memory.date;

        const paragraph = document.createElement("p");
        paragraph.textContent = memory.content;

        card.appendChild(heading);
        card.appendChild(date);
        card.appendChild(paragraph);

        memoryEntries.appendChild(card);
    });
}
