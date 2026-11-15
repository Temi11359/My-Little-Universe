
const welcomeScreen = document.getElementById("welcomeScreen");
const homeScreen = document.getElementById("homeScreen");
const roomScreen = document.getElementById("roomScreen");

const enterButton = document.getElementById("enterButton");
const backButton = document.getElementById("backButton");

const diaryArea = document.getElementById("diaryArea");
const comingSoon = document.querySelector(".coming-soon");

const rooms = {
    diary: {
        icon: "📖",
        title: "My Diary",
        description: "A safe space for all your thoughts and feelings."
    },
    memories: {
        icon: "📸",
        title: "My Memories",
        description: "A collection of moments worth remembering."
    },
    dreams: {
        icon: "🌷",
        title: "My Dreams",
        description: "Everything you're hoping and working for."
    },
    favourites: {
        icon: "💌",
        title: "Little Things",
        description: "All the little things that make you happy."
    }
};

enterButton.addEventListener("click", function() {
    welcomeScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
});

document.querySelectorAll(".room-card").forEach(function(card) {
    card.addEventListener("click", function() {
        const roomName = card.dataset.room;
        const selectedRoom = rooms[roomName];

        document.getElementById("roomIcon").textContent = selectedRoom.icon;
        document.getElementById("roomTitle").textContent = selectedRoom.title;
        document.getElementById("roomDescription").textContent = selectedRoom.description;

        homeScreen.classList.add("hidden");
        roomScreen.classList.remove("hidden");

        diaryArea.classList.add("hidden");
        comingSoon.classList.remove("hidden");

        if (roomName === "diary") {
            diaryArea.classList.remove("hidden");
            comingSoon.classList.add("hidden");
            displayEntries();
        }
    });
});

function getEntries() {
    return JSON.parse(localStorage.getItem("myDiaryEntries") || "[]");
}

document.getElementById("saveDiary").addEventListener("click", function() {
    const title = document.getElementById("diaryTitle").value.trim();
    const content = document.getElementById("diaryText").value.trim();
    const message = document.getElementById("diaryMessage");

    if (!title || !content) {
        message.textContent = "Please enter a title and your thoughts ♡";
        return;
    }

    const entries = getEntries();

    entries.unshift({
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("myDiaryEntries", JSON.stringify(entries));

    document.getElementById("diaryTitle").value = "";
    document.getElementById("diaryText").value = "";

    message.textContent = "Your entry has been saved! ♡";
    displayEntries();
});

function displayEntries() {
    const entries = getEntries();
    const container = document.getElementById("diaryEntries");

    container.innerHTML = "";

    if (entries.length === 0) {
        container.textContent = "Your diary is waiting for its first story ♡";
        return;
    }

    entries.forEach(function(entry) {
        const card = document.createElement("div");
        card.className = "diary-entry";

        const title = document.createElement("h4");
        title.textContent = entry.title;

        const date = document.createElement("small");
        date.textContent = entry.date;

        const content = document.createElement("p");
        content.textContent = entry.content;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-entry";
        deleteButton.textContent = "Delete entry";

        deleteButton.addEventListener("click", function() {
            deleteEntry(entry.id);
        });

        card.append(title, date, content, deleteButton);
        container.appendChild(card);
    });
}

function deleteEntry(id) {
    const entries = getEntries().filter(function(entry) {
        return entry.id !== id;
    });

    localStorage.setItem("myDiaryEntries", JSON.stringify(entries));
    displayEntries();
}

backButton.addEventListener("click", function() {
    roomScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
});
