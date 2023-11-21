document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the Google Apps Script web app
    fetch('https://script.google.com/macros/s/AKfycbyzr8Ye42tkXVls6pPYdGrOu2aZJwZT4ca3d0E3LSbHC-qicCtqNXaXkyPe0Etg7BN--A/exec')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data (${response.status} ${response.statusText})`);
            }
            return response.json();
        })
        .then(data => {
            const carouselContainer = document.getElementById('image-carousel');
            const carouselIndicators = document.getElementById('carousel-indicators');
            let carouselHTML = '';

            data.forEach((event, index) => {
                if (event.eventName !== '' || event.eventDate !== '' || event.imageUrl !== '') {
                    const activeClass = index === 0 ? 'active' : '';

                    // Generate HTML for each carousel item
                    carouselHTML += `
                        <div class="carousel-item ${activeClass}">
                            <img src="${event.imageUrl}" alt="${event.eventName}" class="d-block w-100">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>${event.eventName}</h5>
                                <p>${event.eventDate}</p>
                            </div>
                        </div>
                    `;

                    // Generate indicators
                    const indicatorClass = index === 0 ? 'active' : '';
                    carouselIndicators.innerHTML += `<li data-target="#carousel-container" data-slide-to="${index}" class="${indicatorClass}"></li>`;
                }
            });

            carouselContainer.innerHTML = carouselHTML;

            // Initialize Bootstrap carousel
            $('.carousel').carousel();

            // Autoplay the carousel
            $('.carousel').carousel({
                interval: 1000, // Adjust the interval (in milliseconds) for autoscroll
                pause: 'hover', // Pause on hover
            });

            // Swipe support for touch devices
            $('.carousel').on('swipe', function (event, delta) {
                if (delta > 0) {
                    $(this).carousel('next');
                } else {
                    $(this).carousel('prev');
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error.message));
});
