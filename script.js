function saveText() {
    // Get the value of the textarea element
    var userInput = document.getElementById("myTextarea").value;
  
    // Store the user input in local storage
    localStorage.setItem("userText", userInput);
  }
  

  function showText() {
    // Get the stored user input from local storage
    var storedText = localStorage.getItem("userText");
  
    // If there is stored text, display it on the website
    if (storedText) {
      document.getElementById("bottom").innerHTML = storedText;
    }
  }
