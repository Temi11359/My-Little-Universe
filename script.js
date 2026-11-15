
const welcomeScreen = document.getElementById("welcomeScreen");
const authScreen = document.getElementById("authScreen");
const homeScreen = document.getElementById("homeScreen");
const roomScreen = document.getElementById("roomScreen");

const enterButton = document.getElementById("enterButton");
const backButton = document.getElementById("backButton");

const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const signUpButton = document.getElementById("signUpButton");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const authMessage = document.getElementById("authMessage");

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

// OPEN ACCOUNT SCREEN

enterButton.addEventListener("click", function () {
    welcomeScreen.classList.add("hidden");
    authScreen.style.display = "block";
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

// CREATE ACCOUNT

signUpButton.addEventListener("click", async function () {
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
        email,
        password
    });

    if (error) {
        authMessage.textContent = error.message;
        return;
    }

    if (data.session) {
        authMessage.textContent = "Account created successfully!";
        authScreen.style.display = "none";
        homeScreen.classList.remove("hidden");
    } else {
        authMessage.textContent = "Account created! Check your email to confirm it.";
    }
});

// LOG IN

loginButton.addEventListener("click", async function () {
    const email = authEmail.value.trim();
    const password = authPassword.value;

    if (!email || !password) {
        authMessage.textContent = "Please enter your email and password.";
        return;
    }

    authMessage.textContent = "Logging in...";

    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        authMessage.textContent = error.message;
        return;
    }

    authMessage.textContent = "Welcome back!";
    authScreen.style.display = "none";
    homeScreen.classList.remove("hidden");
});

// LOG OUT

logoutButton.addEventListener("click", async function () {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert(error.message);
        return;
    }

    location.reload();
});

// CHECK EXISTING LOGIN SESSION

async function checkLogin() {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.error(error);
        return;
    }

    if (data.session) {
        welcomeScreen.classList.add("hidden");
        authScreen.style.display = "none";
        homeScreen.classList.remove("hidden");
    }
}

checkLogin();
