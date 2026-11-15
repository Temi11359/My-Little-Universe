
// ======================================
// MY LITTLE UNIVERSE
// Clean JavaScript
// ======================================


// 1. GET HTML ELEMENTS

const welcomeScreen = document.getElementById("welcomeScreen");
const homeScreen = document.getElementById("homeScreen");
const roomScreen = document.getElementById("roomScreen");

const enterButton = document.getElementById("enterButton");
const backButton = document.getElementById("backButton");

const roomCards = document.querySelectorAll(".room-card");

const roomIcon = document.getElementById("roomIcon");
const roomTitle = document.getElementById("roomTitle");
const roomDescription = document.getElementById("roomDescription");

const comingSoon = document.querySelector(".coming-soon");


// Room sections

const diaryArea = document.getElementById("diaryArea");
const memoryArea = document.getElementById("memoryArea");
const dreamsArea = document.getElementById("dreamsArea");
const favouritesArea = document.getElementById("favouritesArea");


// Diary elements

const diaryTitle = document.getElementById("diaryTitle");
const diaryText = document.getElementById("diaryText");
const saveDiary = document.getElementById("saveDiary");
const diaryMessage = document.getElementById("diaryMessage");
const diaryEntries = document.getElementById("diaryEntries");


// Memories elements

const memoryTitle = document.getElementById("memoryTitle");
const memoryText = document.getElementById("memoryText");
const saveMemory = document.getElementById("saveMemory");
const memoryMessage = document.getElementById("memoryMessage");
const memoryEntries = document.getElementById("memoryEntries");


// Dreams elements

const dreamTitle = document.getElementById("dreamTitle");
const dreamDescription = document.getElementById("dreamDescription");
const saveDream = document.getElementById("saveDream");
const dreamMessage = document.getElementById("dreamMessage");
const dreamsEntries = document.getElementById("dreamsEntries");


// Favourites elements

const favouriteTitle = document.getElementById("favouriteTitle");
const favouriteCategory = document.getElementById("favouriteCategory");
const favouriteDescription = document.getElementById("favouriteDescription");
const saveFavourite = document.getElementById("saveFavourite");
const favouriteMessage = document.getElementById("favouriteMessage");
const favouriteEntries = document.getElementById("favouriteEntries");


// ======================================
// 2. ROOM INFORMATION
// ======================================

const rooms = {
    diary: {
        icon: "📔",
        title: "My Diary",
        description: "A little space for all my thoughts and feelings."
    },

    memories: {
        icon: "📸",
        title: "My Memories",
        description: "Little moments I never want to forget."
    },

    dreams: {
        icon: "🌷",
        title: "My Dreams",
        description: "All the things I hope to achieve someday."
    },

    favourites: {
        icon: "🎀",
        title: "My Little Things",
        description: "Everything I love, all in one place."
    }
};


// ======================================
// 3. WELCOME SCREEN
// ======================================

if (enterButton) {
    enterButton.addEventListener("click", function () {
        welcomeScreen.classList.add("hidden");
        homeScreen.classList.remove("hidden");
    });
}


// ======================================
// 4. OPEN AND CLOSE ROOMS
// ======================================

function hideAllRooms() {
    diaryArea.classList.add("hidden");
    memoryArea.classList.add("hidden");
    dreamsArea.classList.add("hidden");
    favouritesArea.classList.add("hidden");

    if (comingSoon) {
        comingSoon.classList.add("hidden");
    }
}


roomCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const selectedRoom = card.dataset.room;

        hideAllRooms();

        const room = rooms[selectedRoom];

        if (!room) return;

        roomIcon.textContent = room.icon;
        roomTitle.textContent = room.title;
        roomDescription.textContent = room.description;

        homeScreen.classList.add("hidden");
        roomScreen.classList.remove("hidden");

        if (selectedRoom === "diary") {
            diaryArea.classList.remove("hidden");
            displayDiaryEntries();
        }

        else if (selectedRoom === "memories") {
            memoryArea.classList.remove("hidden");
            displayMemories();
        }

        else if (selectedRoom === "dreams") {
            dreamsArea.classList.remove("hidden");
            displayDreams();
        }

        else if (selectedRoom === "favourites") {
            favouritesArea.classList.remove("hidden");
            displayFavourites();
        }

        else if (comingSoon) {
            comingSoon.classList.remove("hidden");
        }

    });

});


if (backButton) {
    backButton.addEventListener("click", function () {
        roomScreen.classList.add("hidden");
        homeScreen.classList.remove("hidden");
        hideAllRooms();
    });
}


// ======================================
// 5. STORAGE FUNCTIONS
// ======================================

function getEntries(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
        return [];
    }
}


function saveEntries(key, entries) {
    localStorage.setItem(key, JSON.stringify(entries));
}


function createEntry(title, description, extra = "") {

    const card = document.createElement("div");
    card.className = "entry-card";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const content = document.createElement("p");
    content.textContent = description;

    const date = document.createElement("small");
    date.textContent = new Date().toLocaleDateString();

    card.appendChild(heading);
    card.appendChild(content);

    if (extra) {
        const extraText = document.createElement("small");
        extraText.textContent = extra;
        card.appendChild(extraText);
    }

    card.appendChild(date);

    return card;
}


// ======================================
// 6. DIARY
// ======================================

function displayDiaryEntries() {

    const entries = getEntries("myDiary");

    diaryEntries.innerHTML = "";

    entries.forEach(function (entry) {
        diaryEntries.appendChild(
            createEntry(entry.title, entry.text)
        );
    });

}


if (saveDiary) {
    saveDiary.addEventListener("click", function () {

        const title = diaryTitle.value.trim();
        const text = diaryText.value.trim();

        if (!title || !text) {
            diaryMessage.textContent = "Please fill in both fields.";
            return;
        }

        const entries = getEntries("myDiary");

        entries.unshift({
            title: title,
            text: text
        });

        saveEntries("myDiary", entries);

        diaryTitle.value = "";
        diaryText.value = "";

        diaryMessage.textContent = "Your diary entry has been saved 💗";

        displayDiaryEntries();

    });
}


// ======================================
// 7. MEMORIES
// ======================================

function displayMemories() {

    const entries = getEntries("myMemories");

    memoryEntries.innerHTML = "";

    entries.forEach(function (entry) {
        memoryEntries.appendChild(
            createEntry(entry.title, entry.text)
        );
    });

}


if (saveMemory) {
    saveMemory.addEventListener("click", function () {

        const title = memoryTitle.value.trim();
        const text = memoryText.value.trim();

        if (!title || !text) {
            memoryMessage.textContent = "Please fill in both fields.";
            return;
        }

        const entries = getEntries("myMemories");

        entries.unshift({
            title: title,
            text: text
        });

        saveEntries("myMemories", entries);

        memoryTitle.value = "";
        memoryText.value = "";

        memoryMessage.textContent = "Memory saved successfully 📸";

        displayMemories();

    });
}


// ======================================
// 8. DREAMS
// ======================================

function displayDreams() {

    const entries = getEntries("myDreams");

    dreamsEntries.innerHTML = "";

    entries.forEach(function (entry, index) {

        const card = createEntry(
            entry.title,
            entry.description,
            entry.completed ? "Completed ✨" : "Still dreaming..."
        );

        const button = document.createElement("button");

        button.textContent = entry.completed
            ? "Mark as unfinished"
            : "Mark as completed";

        button.addEventListener("click", function () {

            const updatedEntries = getEntries("myDreams");

            updatedEntries[index].completed =
                !updatedEntries[index].completed;

            saveEntries("myDreams", updatedEntries);

            displayDreams();

        });

        card.appendChild(button);
        dreamsEntries.appendChild(card);

    });

}


if (saveDream) {
    saveDream.addEventListener("click", function () {

        const title = dreamTitle.value.trim();
        const description = dreamDescription.value.trim();

        if (!title || !description) {
            dreamMessage.textContent = "Please fill in both fields.";
            return;
        }

        const entries = getEntries("myDreams");

        entries.unshift({
            title: title,
            description: description,
            completed: false
        });

        saveEntries("myDreams", entries);

        dreamTitle.value = "";
        dreamDescription.value = "";

        dreamMessage.textContent = "Dream added to your list 🌷";

        displayDreams();

    });
}


// ======================================
// 9. FAVOURITES
// ======================================

function displayFavourites() {

    const entries = getEntries("myFavourites");

    favouriteEntries.innerHTML = "";

    entries.forEach(function (entry) {

        favouriteEntries.appendChild(
            createEntry(
                entry.title,
                entry.description,
                entry.category
            )
        );

    });

}


if (saveFavourite) {
    saveFavourite.addEventListener("click", function () {

        const title = favouriteTitle.value.trim();
        const category = favouriteCategory.value.trim();
        const description = favouriteDescription.value.trim();

        if (!title || !category || !description) {
            favouriteMessage.textContent = "Please fill in all fields.";
            return;
        }

        const entries = getEntries("myFavourites");

        entries.unshift({
            title: title,
            category: category,
            description: description
        });

        saveEntries("myFavourites", entries);

        favouriteTitle.value = "";
        favouriteCategory.value = "";
        favouriteDescription.value = "";

        favouriteMessage.textContent = "Added to your little collection 🎀";

        displayFavourites();

    });
}


// ======================================
// END OF MY LITTLE UNIVERSE
// ======================================
