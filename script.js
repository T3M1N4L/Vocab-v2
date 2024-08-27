$(document).ready(function() {
    // Load lesson buttons from JSON
    $.getJSON('lessons.json', function(data) {
        let lessonButtonsHtml = '';
        data.lessons.forEach(function(lesson) {
            lessonButtonsHtml += `<button class="lesson-button" data-lesson-id="${lesson.id}">Lesson ${lesson.id}</button>`;
        });
        $('#lessonButtons').html(lessonButtonsHtml);
    }).fail(function() {
        console.error("Failed to load lessons.json");
    });

    // Handle button click to open popup
    $(document).on('click', '.lesson-button', function() {
        const lessonId = String($(this).data('lesson-id'));

        $.getJSON('lessons.json', function(data) {
            const lesson = data.lessons.find(l => String(l.id) === lessonId);
            if (lesson) {
                // Create popup HTML
                const popupHtml = `
                <div id="popup" class="popup">
                    <div class="popup-content">
                        <span class="close-btn">&times;</span>
                        <div class="popup-header">
                            <img src="https://raw.githubusercontent.com/T3M1N4L/T3M1N4L/main/images/XOsX.gif" class="popup-image" alt="Lesson Image">
                            <h2>Lesson ${lesson.id}</h2>
                        </div>
                        <div class="popup-body">
                            <a href="${lesson.quizlet}" class="popup-button quizlet" target="_blank">Quizlet</a>
                            <a href="${lesson.knowt}" class="popup-button knowt" target="_blank">Knowt</a>
                            <a href="${lesson.gimkit}" class="popup-button gimkit" target="_blank">Gimkit</a>
                            <a href="${lesson.blooket}" class="popup-button blooket" target="_blank">Blooket</a>
                        </div>
                    </div>
                </div>`;

                // Append popup HTML and backdrop layer to body
                $('body').append('<div class="backdrop"></div>'); // Add backdrop layer
                $('body').append(popupHtml);
                
                // Show the popup and backdrop with animation
                $('.backdrop').fadeTo(300, 1); // Ensure the backdrop fades in
                $('#popup').removeClass('hide').addClass('show'); // Trigger popup animation
            } else {
                console.error("Lesson not found:", lessonId);
            }
        }).fail(function() {
            console.error("Failed to load lessons.json");
        });
    });

    // Close popup
    $(document).on('click', '.close-btn', function() {
        $('#popup').removeClass('show').addClass('hide'); // Trigger popup hide animation
        $('.backdrop').fadeTo(300, 0, function() {
            $(this).remove(); // Remove backdrop layer after fade-out
        });
        setTimeout(function() {
            $('#popup').remove(); // Remove popup element after fade-out
        }, 300); // Match the animation duration
    });

    // Close popup when clicking outside of it
    $(window).on('click', function(event) {
        if ($(event.target).is('.backdrop')) {
            $('#popup').removeClass('show').addClass('hide'); // Trigger popup hide animation
            $('.backdrop').fadeTo(300, 0, function() {
                $(this).remove(); // Remove backdrop layer after fade-out
            });
            setTimeout(function() {
                $('#popup').remove(); // Remove popup element after fade-out
            }, 300); // Match the animation duration
        }
    });
});
