
const welcomeScreen = document.getElementById("welcomeScreen");
const homeScreen = document.getElementById("homeScreen");
const roomScreen = document.getElementById("roomScreen");

const enterButton = document.getElementById("enterButton");
const backButton = document.getElementById("backButton");

const roomCards = document.querySelectorAll(".room-card");
console.log("Room buttons found:", roomCards.length);

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

// ================================
// MY LITTLE UNIVERSE - AUTHENTICATION
// ================================

const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");

const signUpButton = document.getElementById("signUpButton");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");

const authMessage = document.getElementById("authMessage");

// CREATE ACCOUNT
if (signUpButton) {
    signUpButton.addEventListener("click", async () => {
        const email = authEmail.value.trim();
        const password = authPassword.value;

        if (!email || !password) {
            authMessage.textContent = "Please enter your email and password.";
            return;
        }

        if (password.length < 6) {
            authMessage.textContent = "Password must be at least 6 characters.";
            return;
        }

        authMessage.textContent = "Creating your account...";

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            authMessage.textContent = error.message;
            return;
        }

        authMessage.textContent = data.session
            ? "Account created successfully! Welcome!"
            : "Account created! Please check your email to confirm your account.";
    });
}

// LOG IN
if (loginButton) {
    loginButton.addEventListener("click", async () => {
        const email = authEmail.value.trim();
        const password = authPassword.value;

        if (!email || !password) {
            authMessage.textContent = "Please enter your email and password.";
            return;
        }

        authMessage.textContent = "Logging in...";

        const { error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            authMessage.textContent = error.message;
            return;
        }

        authMessage.textContent = "Welcome back!";
    });
}

// LOG OUT
if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            alert(error.message);
            return;
        }

        location.reload();
    });
}
