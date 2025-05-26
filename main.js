console.log("Welcome to the Community Portal");
window.onload = function() {
    alert("Page is fully loaded!");
};
const eventName = "Marathon";
const eventDate = "June 15, 2025";
let availableSeats = 500;
const eventDetails = `Event: ${eventName}\nDate: ${eventDate}\nAvailable Seats: ${availableSeats}`;
console.log(eventDetails);
function registerAttendee() {
    if (availableSeats > 0) {
        availableSeats--;
        console.log(`Registration successful! Seats remaining: ${availableSeats}`);
    } else {
        console.log("Sorry, no seats available.");
    }
}