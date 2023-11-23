const profilePage = "http://localhost:8000/profile.html"

if (localStorage.getItem("guvi_user")) {
    location.href = profilePage
}

const notify = (msg, status) => {
    const element = document.querySelector("#notification")
    element.style.display = "none";
    const msgElement = element.querySelector("#message")
    msgElement.textContent = msg
    let bgColor;
    switch (status) {
        case "info":
            bgColor = "#93e7fb"
            msgElement.style.color = "black"
            break
        case "error":
            bgColor = "#f95959";
            break;
        case "warn":
            bgColor = "#efd7bb";
            break;
        case "success":
            bgColor = "#81cfd1"
            break
        default:
            bgColor = "#efd7bb";

    }
    msgElement.style.cssText += `background-color:${bgColor}`
    element.style.display = "flex";
    setTimeout(() => {
        element.style.display = "none";
    }, 5000)
}

const login = () => {
    const form = document.querySelector("form")
    const username = form.querySelector("[name=username]").value.trim();
    const password = form.querySelector("[name=password]").value.trim();

    if (!username || !password) {
        notify("All the fields are required!", "warn")
        return
    }

    $.ajax({
        url: "/php/login.php",
        method: "POST",
        data: {
            username: username,
            password: password
        },
        success: function(result) {
            notify(result, "success")
            if (result["success"]) {
                localStorage.setItem("guvi_user", username)
                location.href = profilePage
            }
        },
        error: function(error) {
            notify("Operation failed: " + error, "error")
        }
    })
};
