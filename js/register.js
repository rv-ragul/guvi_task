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

const register = () => {
    const form = document.querySelector("form")
    const username = form.querySelector("[name=username]").value.trim();
    const password = form.querySelector("[name=password]").value.trim();
    const confirmPassword = form.querySelector("[name=confirmPassword]").value.trim();

    if (!username || !password) {
        notify("All the fields are required!", "warn")
        return
    }
    if (password !== confirmPassword) {
        notify("Passwords don't match", "warn");
        return
    }

    $.ajax({
        url: "/php/register.php",
        method: "POST",
        data: {
            username: username,
            password: password
        },
        success: function(result) {
            notify(result, "success")
            if (result["success"]) {
                location.href = "http://localhost:8000/login.html"
            }
        },
        error: function(result) {
            notify("Couldn't perform the request: " + result, "error");
        }
    })
};
