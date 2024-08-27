$(document).ready(function() {
    // Load lesson buttons from JSON
    $.getJSON('lessons.json', function(data) {
        console.log("Data loaded:", data); // Debugging line
        let lessonButtonsHtml = '';
        data.lessons.forEach(function(lesson) {
            lessonButtonsHtml += '<button class="lesson-button" data-lesson-id="' + lesson.id + '">' + lesson.name + '</button>';
        });
        $('#lessonButtons').html(lessonButtonsHtml);
    }).fail(function() {
        console.error("Failed to load lessons.json");
    });

    // Handle button click to open popup
    $(document).on('click', '.lesson-button', function() {
        const lessonId = String($(this).data('lesson-id')); // Convert ID to string
        console.log("Lesson button clicked. ID:", lessonId); // Debugging line

        $.getJSON('lessons.json', function(data) {
            console.log("Data on button click:", data); // Debugging line
            const lesson = data.lessons.find(l => String(l.id) === lessonId); // Convert ID to string
            console.log("Lesson found:", lesson); // Debugging line
            if (lesson) {
                // Create popup HTML
                let popupHtml = `
                <div id="popup" class="popup">
                    <div class="popup-content">
                        <span class="close-btn">&times;</span>
                        <div class="popup-header">
                            <h2>${lesson.name}</h2>
                        </div>
                        <div class="popup-body">
                            <a href="${lesson.quizlet}" class="popup-button quizlet" target="_blank">Quizlet</a>
                            <a href="${lesson.knowt}" class="popup-button knowt" target="_blank">Knowt</a>
                            <a href="${lesson.gimkit}" class="popup-button gimkit" target="_blank">Gimkit</a>
                            <a href="${lesson.blooket}" class="popup-button blooket" target="_blank">Blooket</a>
                        </div>
                    </div>
                </div>`;

                // Append popup HTML to body
                $('body').append(popupHtml);
                
                // Show the popup with animation
                $('#popup').removeClass('hide').addClass('show'); // Apply show class to start animation
            } else {
                console.error("Lesson not found:", lessonId);
            }
        }).fail(function() {
            console.error("Failed to load lessons.json");
        });
    });

    // Close popup
    $(document).on('click', '.close-btn', function() {
        $('#popup').removeClass('show').addClass('hide'); // Apply hide class to start animation
        // Remove the popup element after fading out
        setTimeout(function() {
            $('#popup').remove();
        }, 400); // Match the animation duration
    });

    // Close popup when clicking outside of it
    $(window).on('click', function(event) {
        if ($(event.target).is('#popup')) {
            $('#popup').removeClass('show').addClass('hide'); // Apply hide class to start animation
            // Remove the popup element after fading out
            setTimeout(function() {
                $('#popup').remove();
            }, 400); // Match the animation duration
        }
    });
});
