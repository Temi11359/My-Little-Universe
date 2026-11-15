
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
const memoryArea = document.getElementById("memoryArea");
const dreamsArea = document.getElementById("dreamsArea");
const favouritesArea = document.getElementById("favouritesArea");
const comingSoon = document.querySelector(".coming-soon");

const rooms = {
    diary: {
        icon: "📖",
        title: "My Diary",
        description: "A little space for my thoughts and feelings."
    },
    memories: {
        icon: "📸",
        title: "Memories",
        description: "Moments worth keeping."
    },
    dreams: {
        icon: "🌷",
        title: "My Dreams",
        description: "Plans and aspirations."
    },
    favourites: {
        icon: "🎀",
        title: "Little Things",
        description: "Everything I adore."
    }
};

// OPEN HOMEPAGE

enterButton.addEventListener("click", function () {
    welcomeScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
});

// HIDE ALL ROOM CONTENT

function hideAllRooms() {
    diaryArea.classList.add("hidden");
    memoryArea.classList.add("hidden");
    dreamsArea.classList.add("hidden");
    favouritesArea.classList.add("hidden");
    comingSoon.classList.add("hidden");
}

// OPEN A ROOM

roomCards.forEach(function (card) {
    card.addEventListener("click", function () {

        const selectedRoom = card.dataset.room;
        const room = rooms[selectedRoom];

        if (!room) return;

        hideAllRooms();

        roomIcon.textContent = room.icon;
        roomTitle.textContent = room.title;
        roomDescription.textContent = room.description;

        if (selectedRoom === "diary") {
            diaryArea.classList.remove("hidden");
        } else if (selectedRoom === "memories") {
            memoryArea.classList.remove("hidden");
        } else if (selectedRoom === "dreams") {
            dreamsArea.classList.remove("hidden");
        } else if (selectedRoom === "favourites") {
            favouritesArea.classList.remove("hidden");
        }

        homeScreen.classList.add("hidden");
        roomScreen.classList.remove("hidden");
    });
});

// GO BACK HOME

backButton.addEventListener("click", function () {
    roomScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
    hideAllRooms();
});
