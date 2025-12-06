window.onload = async function () {
  const welcome = document.getElementById("welcome");

  try {
    const response = await fetch("/homePageUser");
    const username = await response.text();

    welcome.textContent = "Hello " + username + "!";
  } catch (err) {
    welcome.textContent = "Hello!";
  }
};
