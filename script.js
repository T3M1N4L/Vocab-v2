$(document).ready(function () {
    // Load lesson buttons from JSON
    $.getJSON("lessons.json", function (data) {
      console.log("Lessons data successfully loaded:", data);
      
      let lessonButtonsHtml = "";
      data.lessons.forEach(function (lesson) {
        lessonButtonsHtml += `<button class="lesson-button" data-lesson-id="${lesson.id}">Lesson ${lesson.id}</button>`;
      });
      $("#lessonButtons").html(lessonButtonsHtml);
    }).fail(function () {
      console.error("Failed to load lessons.json");
    });
  
    // Handle button click to open popup
    $(document).on("click", ".lesson-button", function () {
      const lessonId = String($(this).data("lesson-id"));
      console.log("Lesson button clicked. Lesson ID:", lessonId);
  
      $.getJSON("lessons.json", function (data) {
        const lesson = data.lessons.find((l) => String(l.id) === lessonId);
        if (lesson) {
          console.log("Lesson found:", lesson);
  
          // Create popup HTML
          const popupHtml = `
                  <div id="popup" class="popup hide">
                      <div class="popup-content">
                          <span class="close-btn">&times;</span>
                          <div class="popup-header">
                              <img src="./ducky.gif" class="popup-image" alt="Lesson Image">
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
          $("body").append('<div class="backdrop"></div>'); // Add backdrop layer
          $("body").append(popupHtml);
  
          // Show the popup and backdrop with animation
          $(".backdrop").removeClass("hide").addClass("show"); // Trigger blur-in animation
          $("#popup").removeClass("hide").addClass("show"); // Trigger popup animation
          console.log("Popup and backdrop shown.");
        } else {
          console.error("Lesson not found:", lessonId);
        }
      }).fail(function () {
        console.error("Failed to load lessons.json");
      });
    });
  
    // Close popup
    $(document).on("click", ".close-btn", function () {
      $("#popup").removeClass("show").addClass("hide"); // Trigger popup hide animation
      $(".backdrop").removeClass("show").addClass("hide"); // Trigger blur-out animation
      setTimeout(function () {
        $(".backdrop").remove(); // Remove backdrop layer after fade-out
        $("#popup").remove(); // Remove popup element after fade-out
        console.log("Popup and backdrop removed.");
      }, 300); // Match the animation duration
    });
  
    // Close popup when clicking outside of it
    $(window).on("click", function (event) {
      if ($(event.target).is(".backdrop")) {
        $("#popup").removeClass("show").addClass("hide"); // Trigger popup hide animation
        $(".backdrop").removeClass("show").addClass("hide"); // Trigger blur-out animation
        setTimeout(function () {
          $(".backdrop").remove(); // Remove backdrop layer after fade-out
          $("#popup").remove(); // Remove popup element after fade-out
          console.log("Popup and backdrop removed by clicking outside.");
        }, 300); // Match the animation duration
      }
    });
  
    // Variable to track the typed characters
    let typedString = '';
  
    // Function to check the typed string
    function checkTypedString() {
      if (typedString === 'eruda') {
        console.log("Code 'eruda' typed. Initializing Eruda...");
  
        // Create and append the script to load Eruda
        const script1 = document.createElement('script');
        script1.src = 'https://cdn.jsdelivr.net/npm/eruda';
        script1.onload = function() {
          // Create and append another script to initialize Eruda
          const script2 = document.createElement('script');
          script2.text = `
              eruda.init({
                  defaults: {
                      displaySize: 30,
                      transparency: 0.8,
                      theme: "AMOLED"
                  }
              });
          `;
          document.body.appendChild(script2);
          console.log("Eruda initialized.");
        };
        document.body.appendChild(script1);
  
        // Clear the typed string after injection
        typedString = '';
      }
    }
  
    // Event listener for key presses
    document.addEventListener('keypress', function(event) {
      // Append the pressed key to the typed string
      typedString += event.key;
      console.log("Current typed string:", typedString);
  
      // If the length of typedString exceeds "eruda", slice it to the last 5 characters
      if (typedString.length > 5) {
        typedString = typedString.slice(-5);
      }
  
      // Check if the typed string matches "eruda"
      checkTypedString();
    });
  });
  