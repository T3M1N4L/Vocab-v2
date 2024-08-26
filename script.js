$(document).ready(function() {
    // Load lesson buttons from JSON
    $.getJSON('lessons.json', function(data) {
        let lessonButtonsHtml = '';
        data.lessons.forEach(function(lesson) {
            lessonButtonsHtml += '<button class="lesson-button" data-lesson-id="' + lesson.id + '">' + lesson.name + '</button>';
        });
        $('#lessonButtons').html(lessonButtonsHtml);
    });

    // Handle button click to open popup
    $(document).on('click', '.lesson-button', function() {
        const lessonId = $(this).data('lesson-id');
        $.getJSON('lessons.json', function(data) {
            const lesson = data.lessons.find(l => l.id === lessonId);
            if (lesson) {
                let popupContent = '<div class="popup-header"><h2>' + lesson.name + '</h2></div>';
                popupContent += '<div class="popup-body">';
                popupContent += '<a href="' + lesson.quizlet + '" class="popup-button quizlet" target="_blank">Quizlet</a>';
                popupContent += '<a href="' + lesson.knowt + '" class="popup-button knowt" target="_blank">Knowt</a>';
                popupContent += '<a href="' + lesson.gimkit + '" class="popup-button gimkit" target="_blank">Gimkit</a>';
                popupContent += '<a href="' + lesson.blooket + '" class="popup-button blooket" target="_blank">Blooket</a>';
                popupContent += '</div>';

                $('#popup-body').html(popupContent);
                $('#popup').fadeIn();
            }
        });
    });

    // Close popup
    $('#closePopup').on('click', function() {
        $('#popup').fadeOut();
    });

    // Close popup when clicking outside of it
    $(window).on('click', function(event) {
        if ($(event.target).is('#popup')) {
            $('#popup').fadeOut();
        }
    });
});
