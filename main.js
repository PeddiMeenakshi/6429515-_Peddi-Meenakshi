let slideIndex = 0;
let slides = document.querySelector(".bannerSlider");
function autoSlide() {
    slideIndex = (slideIndex + 1) % slides.children.length;
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}

setInterval(autoSlide, 5000); // Switch every 5 sec
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            showPosition, handleError, { enableHighAccuracy: true, timeout: 10000 }
        );
    } else {
        document.getElementById("locationOutput").textContent = "Geolocation is not supported by your browser.";
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById("locationOutput").textContent = `Your coordinates: Latitude ${latitude}, Longitude ${longitude}`;
}

function handleError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("locationOutput").textContent = "Location access denied.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("locationOutput").textContent = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("locationOutput").textContent = "Request timed out.";
            break;
        default:
            document.getElementById("locationOutput").textContent = "An unknown error occurred.";
    }
}

// Save event preference in localStorage
function saveEventPreference() {
    const selectedEvent = document.getElementById("event").value;
    localStorage.setItem("preferredEvent", selectedEvent);
    displayPreference();
}
// Retrieve & pre-select the stored event on page reload
function loadEventPreference() {
    const savedEvent = localStorage.getItem("preferredEvent");
    if (savedEvent) {
        document.getElementById("event").value = savedEvent;
        displayPreference();
    }
}

// Show selected preference
function displayPreference() {
    const savedEvent = localStorage.getItem("preferredEvent");
    document.getElementById("selectedEvent").textContent = savedEvent ? `Your preferred event is: ${savedEvent}` : "";
}
// Save preference when form is submitted
function showConfirmation(event) {
    event.preventDefault(); // Prevent form from actually submitting
    const name = document.getElementById("name").value;
    const selectedEvent = document.getElementById("event").value;
    localStorage.setItem("preferredEvent", selectedEvent); // Ensure preference is stored
    document.getElementById("Registrationconfirmation").textContent =
        `Thank you, ${name}! You have successfully registered for the ${selectedEvent}.`;
    formSubmitted = true;
}

// Clear localStorage and sessionStorage
function clearPreferences() {
    localStorage.removeItem("preferredEvent");
    sessionStorage.clear();
    document.getElementById("selectedEvent").textContent = "Preferences cleared!";
}

// Load preference when page loads
window.onload = loadEventPreference;
let formSubmitted = false; // Flag to track submission
// Display message when video is ready
document.getElementById('promoVideo').oncanplay = function () {
    document.getElementById('statusMessage').textContent = 'Video ready to play';
};

// Warn user before leaving with unsaved form data
window.onbeforeunload = function (event) {
    if (!formSubmitted) {  // Only warn if form hasn't been submitted
        let form = document.getElementById('eventForm');
        if (form.querySelector('input[type="text"]').value ||
            form.querySelector('input[type="email"]').value) {
            return "You have unsaved changes. Are you sure you want to leave?";
        }
    }
};
// Dynamically show event fee
function showFee() {
    const eventDropdown = document.getElementById("event");
    const selectedOption = eventDropdown.options[eventDropdown.selectedIndex];
    const fee = selectedOption.getAttribute("data-fee");
    document.getElementById("eventFee").textContent = `Event Fee: ₹${fee}`;
}

// Show registration confirmation
function showConfirmation(event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById("name").value;
    const eventType = document.getElementById("event").value;
    const confirmationMsg = `Thank you, ${name}! You have successfully registered for the ${eventType}.`;
    document.getElementById("Registrationconfirmation").textContent = confirmationMsg;
    formSubmitted = true;//mark form as submitted
}
function enlargeImage(event) {
    event.target.style.transform = "scale(1.5)";
    event.target.style.transition = "transform 0.3s ease-in-out";
}

function validatePhone() {
    const phoneInput = document.getElementById("phone").value;
    const errorMsg = document.getElementById("phoneError");
    if (!/^\d{10}$/.test(phoneInput)) {
        errorMsg.textContent = "Invalid phone number! Must be 10 digits.";
    } else {
        errorMsg.textContent = "";
    }
}

function countCharacters() {
    const textArea = document.getElementById("feedback").value;
    document.getElementById("charCount").textContent = `Characters: ${textArea.length}/200`;
}

function handleFeedback(event) {
    event.preventDefault(); // Prevent page reload
    const feedbackText = document.getElementById("feedback").value;
    const messageElement = document.getElementById("feedbackMessage");

    if (feedbackText.trim().length > 0) {
        messageElement.textContent = "Thank you for your feedback!";
    } else {
        messageElement.textContent = "Please enter your feedback before submitting.";
        messageElement.style.color = "red";
    }
}