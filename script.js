const hamburger = document.querySelector('#hamburger-wrapper');
const dropdown = document.querySelector('#mobile-dropdown-content');

hamburger.addEventListener('click', () => {
    dropdown.style.display = dropdown.style.display === 'inline-block' ? 'none' : 'inline-block';
});



const emailInput = document.querySelector('#email');
const emailError = document.querySelector('.error_message');

emailInput.addEventListener('input', function () {
    const emailPattern = /^[^\s@]+@[^\s@]+/;

    if (emailPattern.test(emailInput.value) || emailInput.value == '') {
        emailError.style.display = 'none';
    } else {
        emailError.style.display = 'block';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let popUpContainer = document.querySelector(".pop-up-container");
    let submitBtn = document.getElementById("submitBtn");
    let disapproveBtn = document.getElementById("disapprove");
    let approveBtn = document.getElementById("approve");
    let myForm = document.getElementById("form");

    submitBtn.addEventListener("click", function (e) {
        // Check if all required fields are filled
        if (validateForm(myForm)) {
            // Prevent the default form submission
            e.preventDefault();

            // Display the confirmation pop-up
            popUpContainer.style.display = "flex";

            // Disapprove button click event
            disapproveBtn.addEventListener("keypress", function (e) {
                if (e.key === 'Enter' || e.key === ' '){
                    popUpContainer.style.display = "none";
                }
                
            });
            disapproveBtn.addEventListener("click", function () {
                popUpContainer.style.display = "none";
            });

            // Approve button click event
            approveBtn.addEventListener("click", function () {
                popUpContainer.style.display = "none";
                // Submit the form
                location.reload();
                window.scrollTo(0, 0);
            });
            approveBtn.addEventListener("keypress", function (e) {
                if (e.key === 'Enter' || e.key === ' '){
                    popUpContainer.style.display = "none";
                // Submit the form
                window.scrollTo(0, 0);
                location.reload();
                }
            
            });

            document.addEventListener("keydown", function (e) {
                if (e.key === 'Escape'){
                    popUpContainer.style.display = "none";
                }
            
            });

        }
    });

    function validateForm(form) {
        let requiredFields = form.querySelectorAll("[required]");
    
        for (let i = 0; i < requiredFields.length; i++) {
            if (requiredFields[i].type === "radio") {
                // Check if at least one radio button in the group is checked
                let radioGroup = form.querySelectorAll(`[name="${requiredFields[i].name}"]:checked`);
                if (radioGroup.length === 0) {
                    return false;
                }
            } else if (requiredFields[i].type === "email") {
                // Check if the email field is valid using a regular expression
                let emailRegex = /^[^\s@]+@[^\s@]+/;
                if (!emailRegex.test(requiredFields[i].value)) {
                    return false;
                }
            } else if (!requiredFields[i].value) {
                return false;
            }
        }
    
        return true;
    }
    
});

const popup = document.querySelector('.pop-up');
const approveButton = document.getElementById('approve');
const disapproveButton = document.getElementById('disapprove');
const confirmationMsg = document.getElementById('confirmationMsg');

popup.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        // Handle Tab key press
        event.preventDefault(); // Prevent default tab behavior

        // Determine the next focusable element within the popup
        const focusableElements = [confirmationMsg, disapproveButton, approveButton];
        const currentIndex = focusableElements.indexOf(document.activeElement);
        const nextIndex = (currentIndex + 1) % focusableElements.length;
        focusableElements[nextIndex].focus();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.querySelector('.audio');
    const transcriptionContainer = document.getElementById('transcription-dropdown');

    const transcriptionData = [
        { time: 0, text: '[♪ Soft piano starts playing in the background ♫]' },
        { time: 7, text: 'Hi, this is Martin, and I just had to share my amazing experience at Lisa\'s Music Lessons.' },
        { time: 14, text: 'From day one, Lisa\'s passion for music was contagious. Her teaching style? Simply brilliant!' },
        { time: 22, text: 'I\'ve not just learned to play an instrument; I\'ve discovered a whole new world of melodies and harmonies.' },
        { time: 28, text: 'The personalized attention and supportive environment make every lesson a musical journey.' },
        { time: 35, text: 'Thanks to Lisa, my musical journey is filled with joy and unforgettable tunes. Highly recommend!' },
        { time: 38, text: '[♪ Ending of soft piano ♫]' },
    ];

    audio.addEventListener('timeupdate', function () {
        const currentTime = audio.currentTime;

        // Find the transcription entry for the current time
        const currentEntry = transcriptionData.find(entry => currentTime >= entry.time && currentTime < entry.time + 5);

        // Display the transcription text
        if (currentEntry) {
            transcriptionContainer.innerHTML = `<p class="timestamp"><strong>[${formatTime(currentEntry.time)}]</strong></p>
                                               <p class="transcription-text">${currentEntry.text}</p>`;
        } else {
            transcriptionContainer.innerHTML = '';
        }
    });

    function formatTime(seconds) {
        const date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().substr(11, 8);
    }
});



