async function postDetails(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const div = document.getElementById("response");

  try {
    const response = await fetch("/signin/fetch", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ username }),
    });
    const text = await response.text()
    if (text === "OK") {
      window.location.href = "/signup";
    } else {
      div.textContent = text; 
    }
  } catch (error) {
    console.log("error")
  }
}