
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
        dreamsArea.classlist.add("hidden");
        favouritesArea.classList.add("hidden");
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
        if (selectedRoom === "dreams") {
    dreamsArea.classList.remove("hidden");
    comingSoon.style.display = "none";
    displayDreams();
        }
        if (selectedRoom === "favourites") {
    favouritesArea.classList.remove("hidden");
    comingSoon.style.display = "none";
    displayFavourites();
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

// MY DREAMS ROOM

const dreamsArea = document.getElementById("dreamsArea");
const dreamTitle = document.getElementById("dreamTitle");
const dreamDescription = document.getElementById("dreamDescription");
const saveDream = document.getElementById("saveDream");
const dreamMessage = document.getElementById("dreamMessage");
const dreamEntries = document.getElementById("dreamEntries");


// GET SAVED DREAMS
function getDreams() {
    return JSON.parse(localStorage.getItem("myDreams")) || [];
}


// SAVE A DREAM
saveDream.addEventListener("click", function () {

    const title = dreamTitle.value.trim();
    const description = dreamDescription.value.trim();

    if (!title || !description) {
        dreamMessage.textContent = "Please fill in both fields.";
        return;
    }

    const dreams = getDreams();

    dreams.unshift({
        title: title,
        description: description,
        completed: false
    });

    localStorage.setItem("myDreams", JSON.stringify(dreams));

    dreamTitle.value = "";
    dreamDescription.value = "";

    dreamMessage.textContent = "Dream added successfully!";

    displayDreams();
});


// DISPLAY DREAMS
function displayDreams() {

    const dreams = getDreams();

    dreamEntries.innerHTML = "";

    if (dreams.length === 0) {
        dreamEntries.textContent = "Your dream board is waiting for you.";
        return;
    }

    dreams.forEach(function (dream, index) {

        const card = document.createElement("div");
        card.className = "diary-entry";

        const heading = document.createElement("h4");
        heading.textContent = dream.title;

        const description = document.createElement("p");
        description.textContent = dream.description;

        const status = document.createElement("p");
        status.textContent = dream.completed ? "Completed ✓" : "Still dreaming...";

        const button = document.createElement("button");
        button.textContent = dream.completed ? "Mark as unfinished" : "Mark as completed";

        button.addEventListener("click", function () {

            dreams[index].completed = !dreams[index].completed;

            localStorage.setItem("myDreams", JSON.stringify(dreams));

            displayDreams();
        });

        card.appendChild(heading);
        card.appendChild(description);
        card.appendChild(status);
        card.appendChild(button);

        dreamEntries.appendChild(card);
    });
}

// LITTLE THINGS ROOM

const favouritesArea = document.getElementById("favouritesArea");
const favouriteTitle = document.getElementById("favouriteTitle");
const favouriteCategory = document.getElementById("favouriteCategory");
const favouriteDescription = document.getElementById("favouriteDescription");
const saveFavourite = document.getElementById("saveFavourite");
const favouriteMessage = document.getElementById("favouriteMessage");
const favouriteEntries = document.getElementById("favouriteEntries");


// GET SAVED FAVOURITES
function getFavourites() {
    return JSON.parse(localStorage.getItem("myFavourites")) || [];
}


// SAVE A FAVOURITE
saveFavourite.addEventListener("click", function () {

    const title = favouriteTitle.value.trim();
    const category = favouriteCategory.value;
    const description = favouriteDescription.value.trim();

    if (!title || !category || !description) {
        favouriteMessage.textContent = "Please complete all the fields.";
        return;
    }

    const favourites = getFavourites();

    favourites.unshift({
        title: title,
        category: category,
        description: description
    });

    localStorage.setItem("myFavourites", JSON.stringify(favourites));

    favouriteTitle.value = "";
    favouriteCategory.value = "";
    favouriteDescription.value = "";

    favouriteMessage.textContent = "Added to your little collection!";

    displayFavourites();
});


// DISPLAY FAVOURITES
function displayFavourites() {

    const favourites = getFavourites();

    favouriteEntries.innerHTML = "";

    if (favourites.length === 0) {
        favouriteEntries.textContent = "Your collection is waiting for lovely things.";
        return;
    }

    favourites.forEach(function (item) {

        const card = document.createElement("div");
        card.className = "diary-entry";

        const heading = document.createElement("h4");
        heading.textContent = item.title;

        const category = document.createElement("small");
        category.textContent = item.category;

        const description = document.createElement("p");
        description.textContent = item.description;

        card.appendChild(heading);
        card.appendChild(category);
        card.appendChild(description);

        favouriteEntries.appendChild(card);
    });
}
