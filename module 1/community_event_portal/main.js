// Task 1: JavaScript Basics & Setup
// Log a welcome message to the console when the script starts executing.
console.log("Welcome to the Community Portal");
window.onload = function() {
  

    // Start the video banner slider when the page is loaded.
    startBannerSlider();
};

// --- Mock Data for Events (Task 3, 5, 6, 9) ---
// This array will simulate our event database.
let communityEvents = [];

// Task 5: Objects and Prototypes - Define Event class
// Defines a class for Event objects, encapsulating event properties and methods.
class Event {
    constructor(id, name, date, time, location, details, category, fee, availableSeats) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.time = time;
        this.location = location;
        this.details = details;
        this.category = category;
        this.fee = fee;
        this.availableSeats = availableSeats;
        this.registeredUsers = 0; // Initialize registered users for this event
    }

    // Task 5: Add checkAvailability() to prototype
    // Method to check if there are available seats for the event.
    checkAvailability() {
        return this.availableSeats > this.registeredUsers;
    }

    // Method to register a user for the event, decrementing available seats.
    register() {
        if (this.checkAvailability()) {
            this.registeredUsers++;
            this.availableSeats--; // Task 2: Use -- to manage seat count
            return true;
        }
        return false;
    }
}

// Task 9: Async JS, Promises, Async/Await - Fetch events from a mock API
// Simulates fetching event data from a backend API.
function fetchEvents() {
    // Simulate a network delay with setTimeout.
    return new Promise(resolve => {
        setTimeout(() => {
            // Mock data for events
            const mockEvents = [
                new Event('e001', 'Holi Festival', '2025-03-20', '10:00 - 15:00', 'Central Grounds', 'Festival of Colors, music, and fun for all ages.', 'festival', 100, 150),
                new Event('e002', 'Community Marathon', '2025-04-10', '07:00 - 12:00', 'City Loop Track', '5K and 10K runs for charity.', 'sports', 500, 200),
                new Event('e003', 'Street Food Festival', '2025-05-15', '16:00 - 22:00', 'Market Square', 'Taste diverse cuisines from local vendors.', 'food', 250, 300),
                new Event('e004', 'Children\'s Playdate', '2025-06-01', '10:00 - 13:00', 'Community Park', 'Games, storytelling, and activities for kids.', 'kids', 300, 80),
                new Event('e005', 'Neighborhood Cleanup', '2025-06-25', '09:00 - 12:00', 'Various Locations', 'Volunteer event to clean local parks and streets.', 'community', 0, 50),
                new Event('e006', 'Outdoor Yoga Session', '2025-07-10', '07:30 - 09:00', 'Riverside Meadow', 'Morning yoga session with professional instructors.', 'wellness', 200, 60),
                new Event('e007', 'Summer Music Fest', '2025-08-05', '18:00 - 23:00', 'Amphitheater', 'Live bands and local artists.', 'music', 400, 250),
                new Event('e008', 'Art Workshop', '2025-09-12', '14:00 - 17:00', 'Community Art Center', 'Learn painting and drawing techniques.', 'art', 150, 30)
            ];
            resolve(mockEvents);
        }, 1000); // Simulate 1 second delay
    });
}

// Function to initialize and display events
async function initializeEvents() {
    const eventContainer = document.getElementById('eventContainer');
    // Task 9: Show loading spinner
    eventContainer.innerHTML = '<p>Loading events...</p>';

    try {
        // Task 9: Use async/await to fetch events
        communityEvents = await fetchEvents();
        displayEvents(communityEvents); // Display all fetched events initially

        // Populate the registration form's event dropdown dynamically
        const eventSelect = document.getElementById('event');
        if (eventSelect) {
            // Clear existing options and add a default placeholder
            eventSelect.innerHTML = '<option value="">Select an event</option>';

            communityEvents.forEach(event => {
                // Only add events that are not in the past and have availability
                const eventDate = new Date(event.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Normalize today's date for comparison

                if (eventDate >= today && event.checkAvailability()) {
                    const option = document.createElement('option');
                    option.value = event.id; // Use event ID as the value
                    option.textContent = event.name; // Display event name
                    option.dataset.fee = event.fee; // Store fee in dataset
                    eventSelect.appendChild(option);
                }
            });
            // After populating, ensure the correct fee is shown if a preference was loaded
            // This also ensures if a default option was selected, its fee is shown.
            loadEventPreference();
        }


        // --- Search Input and Listener ---
        // Task 8: Use keydown to allow quick search by name (example implementation)
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search events by name...';
        searchInput.id = 'eventSearchInput';
        searchInput.className = 'p-2 border rounded-md mb-4 w-full max-w-md mx-auto block'; // Tailwind classes

        const locationButton = document.querySelector('button[onclick="getLocation()"]');
        if (locationButton && locationButton.parentNode) {
            locationButton.parentNode.insertBefore(searchInput, locationButton.nextSibling);
        } else {
            document.getElementById('events').prepend(searchInput); // Fallback if button not found
        }

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.toLowerCase();
                const filtered = communityEvents.filter(event =>
                    event.name.toLowerCase().includes(searchTerm) ||
                    event.details.toLowerCase().includes(searchTerm) ||
                    event.location.toLowerCase().includes(searchTerm)
                );
                displayEvents(filtered);
                console.log(`Searching for "${searchTerm}"`);
            }
        });

        // Task 6: Use .map() to format display cards (example for a specific scenario)
        const formattedEventNames = communityEvents.map(event => {
            // Task 10: Use template literals here as well
            return `Event: ${event.name} (${event.category.charAt(0).toUpperCase() + event.category.slice(1)})`;
        });
        console.log("Formatted Event Names (using .map()):", formattedEventNames);

    } catch (error) {
        console.error("Failed to fetch events:", error);
        eventContainer.innerHTML = '<p style="color: red;">Failed to load events. Please try again later.</p>';
    }
}

// Task 7: DOM Manipulation - Display all events dynamically
// Task 3: Loop through the event list and display using forEach()
function displayEvents(eventsToDisplay) {
    const eventContainer = document.getElementById('eventContainer');
    eventContainer.innerHTML = ''; // Clear previous events

    if (eventsToDisplay.length === 0) {
        eventContainer.innerHTML = '<p>No events found matching your criteria.</p>';
        return;
    }

    eventsToDisplay.forEach(event => {
        // Task 3: Use if-else to hide past or full events
        const eventDate = new Date(event.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date for comparison

        if (eventDate < today) {
            // console.log(`Event ${event.name} is in the past, not displaying.`);
            return; // Skip past events
        }

        if (!event.checkAvailability()) {
            // console.log(`Event ${event.name} is full, not displaying.`);
            return; // Skip full events
        }

        // Task 7: Create and append event cards using createElement()
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card p-4 border rounded-lg shadow-md mb-4'; // Tailwind classes for styling
        eventCard.setAttribute('data-event-id', event.id); // Add data attribute for easy access

        // Task 2: Concatenate event info using template literals
        // Task 10: Use destructuring to extract event details
        const { name, date, time, location, details, fee, availableSeats } = event;

        eventCard.innerHTML = `
            <h3 class="text-xl font-bold mb-2">${name}</h3>
            <p class="text-gray-700 mb-1">Date: ${date}</p>
            <p class="text-gray-700 mb-1">Time: ${time}</p>
            <p class="text-gray-700 mb-1">Location: ${location}</p>
            <p class="text-gray-600 mb-2">${details}</p>
            <p class="text-lg font-semibold">Fee: ₹${fee === 0 ? 'Free' : fee}</p>
            <p class="text-sm text-gray-500">Seats Available: ${availableSeats}</p>
            <button class="select-event-btn mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" data-event-id="${event.id}">Register for this Event</button>
        `;
        eventContainer.appendChild(eventCard);
    });

    // --- MODIFIED: Changed behavior of event card buttons ---
    // Now, clicking these buttons will populate the form and scroll to it.
    document.querySelectorAll('.select-event-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const eventId = e.target.dataset.eventId; // Get the event ID
            const eventSelect = document.getElementById('event');
            const registerSection = document.getElementById('register');

            // Set the selected event in the form
            if (eventSelect) {
                eventSelect.value = eventId; // Set value to event ID
                showFee(); // Update the displayed fee
                saveEventPreference(); // Save the preference
            }

            // Scroll to the registration form
            if (registerSection) {
                registerSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Task 4: Functions, Scope, Closures, Higher-Order Functions
// Closure to track total registrations for a category.
function createRegistrationTracker() {
    const categoryRegistrations = {}; // Private variable

    return function(category) {
        if (!categoryRegistrations[category]) {
            categoryRegistrations[category] = 0;
        }
        categoryRegistrations[category]++;
        console.log(`Total registrations for ${category} category: ${categoryRegistrations[category]}`);
    };
}
const trackCategoryRegistration = createRegistrationTracker();


// Task 4: Create registerUser()
// Task 3: Wrap registration logic in try-catch to handle errors
// Task 12: AJAX & Fetch API - Use fetch() to POST user data to a mock API
async function registerUser(event) {
    try {
        if (event.register()) { // Decrements available seats (Task 2)
            // Task 12: Simulate backend communication
            const registrationData = {
                eventId: event.id,
                eventName: event.name,
                userId: 'mockUser123', // In a real app, this would come from authentication
                registrationDate: new Date().toISOString()
            };

            // Show a loading indicator
            const regConfirmation = document.getElementById('Registrationconfirmation');
            regConfirmation.textContent = 'Registering...';
            regConfirmation.style.color = 'orange';

            // Simulate a delayed response for the fetch call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Changed from mockapi.example.com to JSONPlaceholder
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                const responseData = await response.json(); // Parse the JSON response
                console.log('Registration mock API response:', responseData);
                // Task 12: Show success message
                regConfirmation.textContent = `Successfully registered for ${event.name}! Remaining seats: ${event.availableSeats}`;
                regConfirmation.style.color = 'green';
                trackCategoryRegistration(event.category); // Use the closure
                // Task 7: Update UI when user registers
                updateEventCardUI(event);
            } else {
                // Task 12: Show failure message
                regConfirmation.textContent = `Failed to register for ${event.name}. Please try again. Status: ${response.status}`;
                regConfirmation.style.color = 'red';
                // Revert seat count if registration failed on server
                event.availableSeats++;
                event.registeredUsers--;
            }
        } else {
            const regConfirmation = document.getElementById('Registrationconfirmation');
            regConfirmation.textContent = `Sorry, ${event.name} is full or registration failed locally.`;
            regConfirmation.style.color = 'red';
        }
    } catch (error) {
        console.error("Error during registration:", error);
        const regConfirmation = document.getElementById('Registrationconfirmation');
        regConfirmation.textContent = "An error occurred during registration. Please try again.";
        regConfirmation.style.color = 'red';
    }
}

// Helper to update event card UI after registration
function updateEventCardUI(event) {
    const eventCard = document.querySelector(`.event-card[data-event-id="${event.id}"]`);
    if (eventCard) {
        const seatsElement = eventCard.querySelector('p:last-of-type'); // Assuming last p tag is seats
        if (seatsElement) {
            seatsElement.textContent = `Seats Available: ${event.availableSeats}`;
        }
        // Optionally disable button if event is full
        if (!event.checkAvailability()) {
            const registerBtn = eventCard.querySelector('.select-event-btn'); // Changed selector
            if (registerBtn) {
                registerBtn.disabled = true;
                registerBtn.textContent = 'Full';
                registerBtn.classList.remove('bg-blue-500', 'hover:bg-blue-700');
                registerBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
            }
        }
    }
}


// Task 4: Functions, Scope, Closures, Higher-Order Functions
// Task 6: Use .filter() to show only music events
// Task 4: Pass callbacks to filter functions for dynamic search
function filterEventsByCategory(category, callback) {
    // Task 10: Use spread operator to clone event list before filtering
    const filteredEvents = [...communityEvents].filter(event => {
        // If 'all' is selected, show all events
        if (category === 'all') {
            return true;
        }
        return event.category === category;
    });
    callback(filteredEvents); // Pass the filtered events to the callback
}

// Task 4: Create addEvent() - (Not directly used in current HTML, but good to define)
function addEvent(eventData) {
    // Task 6: Add new events using .push()
    const newEvent = new Event(
        `e${communityEvents.length + 1}`, // Simple ID generation
        eventData.name,
        eventData.date,
        eventData.time,
        eventData.location,
        eventData.details,
        eventData.category,
        eventData.fee,
        eventData.availableSeats
    );
    communityEvents.push(newEvent);
    displayEvents(communityEvents); // Re-display events to show the new one
    console.log(`Event "${newEvent.name}" added.`);
}


// --- Event Handling Functions (Task 8) ---

// Task 2: Use const for event name and date, let for seats (within a specific event context)
// This applies to the Event class properties.

// Function to show event fee dynamically (called by onchange in HTML)
function showFee() {
    const eventSelect = document.getElementById('event');
    // Ensure eventSelect and its options are valid before accessing dataset
    if (!eventSelect || eventSelect.selectedIndex === -1 || !eventSelect.options[eventSelect.selectedIndex]) {
        console.error("showFee: eventSelect element not found or no valid option selected.");
        document.getElementById('eventFee').textContent = `Event Fee: ₹0`; // Reset fee
        return;
    }
    const selectedOption = eventSelect.options[eventSelect.selectedIndex];
    // Task 10: Use default parameters (though not strictly needed here, demonstrates usage)
    const fee = parseFloat(selectedOption.dataset.fee || 0);
    document.getElementById('eventFee').textContent = `Event Fee: ₹${fee}`;
}

// Function to save event preference to local storage
function saveEventPreference() {
    const eventSelect = document.getElementById('event');
    const selectedEvent = eventSelect.value;
    localStorage.setItem('preferredEvent', selectedEvent);
    // Only update displayed preference if a valid option is selected (not the placeholder)
    if (selectedEvent) {
        document.getElementById('selectedEvent').textContent = `Your preferred event is: ${eventSelect.options[eventSelect.selectedIndex].textContent}`;
    } else {
        document.getElementById('selectedEvent').textContent = '';
    }
}

// Function to load event preference from local storage on page load
function loadEventPreference() {
    const preferredEventId = localStorage.getItem('preferredEvent');
    if (preferredEventId) {
        const eventSelect = document.getElementById('event');
        // Set the value only if the option exists
        if (Array.from(eventSelect.options).some(option => option.value === preferredEventId)) {
            eventSelect.value = preferredEventId;
            showFee(); // Update fee based on loaded preference
            // Get the text content from the selected option directly
            document.getElementById('selectedEvent').textContent = `Your preferred event is: ${eventSelect.options[eventSelect.selectedIndex].textContent}`;
        } else {
            // If preferred event ID doesn't exist (e.g., event in past, removed)
            console.warn(`Preferred event ID "${preferredEventId}" not found in current options.`);
            clearPreferences(); // Clear the invalid preference
        }
    }
}

// Function to clear saved preferences
function clearPreferences() {
    localStorage.removeItem('preferredEvent');
    const eventSelect = document.getElementById('event');
    if (eventSelect) {
        eventSelect.value = ''; // Reset to default "Select an event"
    }
    document.getElementById('selectedEvent').textContent = '';
    showFee(); // Reset fee to 0
    console.log("Event preferences cleared.");
}

// Task 11: Working with Forms - Prevent default form behavior and capture inputs
function showConfirmation(event) {
    // Task 11: Prevent default form behavior
    event.preventDefault();

    const form = event.target;
    // Task 11: Capture name, email, and selected event using form.elements
    const nameInput = form.elements['name'];
    const emailInput = form.elements['email'];
    const dateInput = form.elements['date'];
    const eventSelect = form.elements['event'];
    const messageInput = form.elements['message'];

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const date = dateInput.value;
    const selectedEventId = eventSelect.value; // Get the ID from the selected option
    const message = messageInput.value.trim();

    const confirmationMessage = document.getElementById('Registrationconfirmation');

    // Task 11: Validate inputs and show errors inline
    if (!name || !email || !date || !selectedEventId) { // Check if selectedEventId is empty
        confirmationMessage.textContent = "Please fill in all required fields and select an event.";
        confirmationMessage.style.color = 'red';
        return;
    }
    if (!isValidEmail(email)) {
        confirmationMessage.textContent = "Please enter a valid email address.";
        confirmationMessage.style.color = 'red';
        return;
    }

    // Task 3: Wrap registration logic in try-catch (already done in registerUser, but good to reiterate)
    try {
        // Find the event object to register using its ID
        const eventToRegister = communityEvents.find(e => e.id === selectedEventId);
        if (eventToRegister) {
            registerUser(eventToRegister); // Call the async registration function
        } else {
            confirmationMessage.textContent = "Selected event not found. Please select a valid event.";
            confirmationMessage.style.color = 'red';
        }
    } catch (error) {
        console.error("Form submission error:", error);
        confirmationMessage.textContent = "An unexpected error occurred. Please try again.";
        confirmationMessage.style.color = 'red';
    }

    // Clear the form after submission (optional, depending on UX)
    // form.reset();
}

// Basic email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Function to handle feedback form submission
function handleFeedback(event) {
    // Task 11: Prevent default form behavior
    event.preventDefault();
    const feedbackMessage = document.getElementById('feedbackMessage');
    const feedbackText = document.getElementById('feedback').value;

    if (feedbackText.trim() === '') {
        feedbackMessage.textContent = 'Please enter your feedback.';
        feedbackMessage.style.color = 'red';
        return;
    }

    // Task 12: Use fetch() to POST user data to a mock API
    // Simulate a POST request for feedback
    const feedbackPayload = {
        phone: document.getElementById('phone').value,
        feedback: feedbackText,
        timestamp: new Date().toISOString()
    };

    feedbackMessage.textContent = 'Submitting feedback...';
    feedbackMessage.style.color = 'orange';

    // Task 12: Use setTimeout() to simulate a delayed response
    setTimeout(() => {
        // Changed from mockapi.example.com to JSONPlaceholder
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackPayload),
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the JSON response
            } else {
                throw new Error(`Server responded with status: ${response.status}`);
            }
        })
        .then(responseData => {
            console.log('Feedback mock API response:', responseData);
            feedbackMessage.textContent = 'Thank you for your feedback!';
            feedbackMessage.style.color = 'green';
            document.getElementById('feedback').value = ''; // Clear textarea
            document.getElementById('phone').value = ''; // Clear phone
            document.getElementById('charCount').textContent = 'Characters: 0'; // Reset char count
        })
        .catch(error => {
            console.error('Error submitting feedback:', error);
            feedbackMessage.textContent = 'An error occurred. Please try again.';
            feedbackMessage.style.color = 'red';
        });
    }, 1000); // Simulate 1 second delay
}


// Function to validate phone number on blur
function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    const phonePattern = /^\d{10}$/; // Simple 10-digit pattern

    if (phoneInput.value.trim() === '') {
        phoneError.textContent = 'Phone number is required.';
        phoneError.style.color = 'red';
    } else if (!phonePattern.test(phoneInput.value)) {
        phoneError.textContent = 'Please enter a valid 10-digit phone number.';
        phoneError.style.color = 'red';
    } else {
        phoneError.textContent = ''; // Clear error
    }
}

// Function to count characters in feedback textarea
function countCharacters() {
    const feedbackTextarea = document.getElementById('feedback');
    const charCount = document.getElementById('charCount');
    charCount.textContent = `Characters: ${feedbackTextarea.value.length}`;
}

// Geolocation function for "Find Nearby Events"
function getLocation() {
    const locationOutput = document.getElementById('locationOutput');
    if (navigator.geolocation) {
        locationOutput.textContent = 'Locating...';
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                locationOutput.textContent = `Your location: Latitude ${latitude}, Longitude ${longitude}. Displaying events near you (mock data).`;
                // In a real application, you would use these coordinates to filter events.
                // For this exercise, we'll just display a message.
            },
            (error) => {
                let errorMessage = 'Unable to retrieve your location.';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "The request to get user location timed out.";
                        break;
                    case error.UNKNOWN_ERROR:
                        errorMessage = "An unknown error occurred.";
                        break;
                }
                locationOutput.textContent = `Error: ${errorMessage}`;
                console.error("Geolocation error:", error);
            }
        );
    } else {
        locationOutput.textContent = 'Geolocation is not supported by your browser.';
    }
}

// Image Enlarger function (Task 1) - called by ondblclick in HTML
function enlargeImage(event) {
    const img = event.target;
    // Toggle a class for styling (e.g., in CSS, .enlarged { transform: scale(1.5); })
    img.classList.toggle('enlarged');
    // For a more robust solution, you'd create a modal overlay
    console.log(`Image "${img.title}" double-clicked.`);
}

// Video Player Status (Task 1)
const promoVideo = document.getElementById('promoVideo');
const statusMessage = document.getElementById('statusMessage');

if (promoVideo) {
    promoVideo.addEventListener('play', () => {
        statusMessage.textContent = 'Video is playing.';
        statusMessage.style.color = 'blue';
    });

    promoVideo.addEventListener('pause', () => {
        statusMessage.textContent = 'Video is paused.';
        statusMessage.style.color = 'orange';
    });

    promoVideo.addEventListener('ended', () => {
        statusMessage.textContent = 'Video has ended.';
        statusMessage.style.color = 'green';
    });

    promoVideo.addEventListener('error', () => {
        statusMessage.textContent = 'Error loading video.';
        statusMessage.style.color = 'red';
    });
}

// Banner Slider (Task 1 - implied by HTML structure)
let bannerIndex = 0;
function startBannerSlider() {
    const bannerSlider = document.querySelector('.bannerSlider');
    if (!bannerSlider) return;

    const videos = bannerSlider.querySelectorAll('video');
    if (videos.length === 0) return;

    // Set initial position
    bannerSlider.style.transform = `translateX(-${bannerIndex * 100}%)`;

    setInterval(() => {
        bannerIndex++;
        if (bannerIndex >= videos.length) {
            bannerIndex = 0; // Loop back to the first video
        }
        bannerSlider.style.transform = `translateX(-${bannerIndex * 100}%)`;
    }, 5000); // Change video every 5 seconds
}


// --- DOMContentLoaded Listener ---
// Ensures the DOM is fully loaded before trying to access elements.
document.addEventListener('DOMContentLoaded', () => {
    // Initialize events
    initializeEvents(); // This now handles populating the dropdown

    // No longer calling loadEventPreference here directly after initializeEvents
    // as it's called within initializeEvents after dropdown population.

    // Attach event listeners for the form and other elements
    document.getElementById('eventForm').addEventListener('submit', showConfirmation);
    document.getElementById('event').addEventListener('change', showFee);
    document.getElementById('event').addEventListener('change', saveEventPreference);
    document.querySelector('#contact form').addEventListener('submit', handleFeedback);
    document.getElementById('phone').addEventListener('blur', validatePhone);
    document.getElementById('feedback').addEventListener('keyup', countCharacters);
    document.querySelector('button[onclick="getLocation()"]').addEventListener('click', getLocation);

    // Attach enlargeImage to all .eventCard images
    document.querySelectorAll('.eventCard').forEach(img => {
        img.addEventListener('dblclick', enlargeImage);
    });

    // Task 14: jQuery and JS Frameworks
    // Include jQuery CDN in HTML head for this to work:
    // <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    // Example of using jQuery for click events (if not using native JS listeners)
    // $('#registerBtn').on('click', function() { /* ... */ }); // If you had a specific #registerBtn

    // Example of using .fadeIn() and .fadeOut() for messages or elements
    // Let's make the promo message fade in after a delay using jQuery
    $('.promo-message').hide().delay(1000).fadeIn(1500);

    // Benefit of moving to frameworks like React or Vue:
    // Frameworks like React or Vue provide a component-based architecture,
    // efficient DOM updates (virtual DOM), state management, and a structured
    // way to build complex user interfaces, simplifying development and maintenance
    // for larger applications compared to vanilla JavaScript DOM manipulation.
});
