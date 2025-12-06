async function postDetails(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const div = document.getElementById("response");

  try {
    const response = await fetch("/signup/fetch", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });

    const text = await response.text()
    if (text === "OK") {
      window.location.href = "/homepage";
    } else {
      div.textContent = text;
    }
  } catch (error) {
    console.log("error")
  }
}