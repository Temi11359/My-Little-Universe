
// GET OUR SCREEN ELEMENTS

const welcomeScreen = document.getElementById("welcomeScreen");
const homeScreen = document.getElementById("homeScreen");
const roomScreen = document.getElementById("roomScreen");

const enterButton = document.getElementById("enterButton");
const backButton = document.getElementById("backButton");


// ENTER THE UNIVERSE

enterButton.addEventListener("click", function() {

    welcomeScreen.classList.add("hidden");

    homeScreen.classList.remove("hidden");

});


// ROOM INFORMATION

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


// OPEN A ROOM

const roomCards = document.querySelectorAll(".room-card");

roomCards.forEach(function(card) {

    card.addEventListener("click", function() {

        const roomName = card.dataset.room;

        const selectedRoom = rooms[roomName];

        document.getElementById("roomIcon").textContent =
            selectedRoom.icon;

        document.getElementById("roomTitle").textContent =
            selectedRoom.title;

        document.getElementById("roomDescription").textContent =
            selectedRoom.description;

        homeScreen.classList.add("hidden");

        roomScreen.classList.remove("hidden");

    });

});


// RETURN HOME

backButton.addEventListener("click", function() {

    roomScreen.classList.add("hidden");

    homeScreen.classList.remove("hidden");

});
