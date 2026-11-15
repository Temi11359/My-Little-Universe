const enterButton = document.getElementById("enterButton");
const welcomeScreen = document.getElementById("welcomeScreen");
const homeScreen = document.getElementById("homeScreen");

enterButton.addEventListener("click", function () {
    welcomeScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
});
