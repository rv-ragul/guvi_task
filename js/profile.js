const currentUser = localStorage.getItem("guvi_user")
if (!currentUser) {
    location.pathname = "login.html"
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

const logout = () => {
    localStorage.removeItem("guvi_user")
    location.pathname = "login.html"
}

const updateProfile = () => {
    const realname = $("#realname").val().trim();
    const email = $("#email").val().trim();
    const dob = $("#dob").val().trim();
    const age = $("#age").val().trim();
    const contact = $("#contact").val().trim();

    $.ajax({
        url: "/php/profile.php",
        method: "POST",
        data: {
            username: currentUser,
            realname: realname,
            email: email,
            dob: dob,
            age: age,
            contact: contact
        },
        success: function(result) {
            if (result) {
                notify("Profile updated succcessfully!", "success")
            }
        },
        error: function(error) {
            notify(error, "error")
        }
    })

}

const getData = () => {
    $.ajax({
        url: "/php/profile.php",
        method: "GET",
        data: {
            username: currentUser,
        },
        success: function(result) {
            $("#realname").val(result["realname"])
            $("#email").val(result["email"])
            $("#dob").val(result["dob"])
            $("#age").val(result["age"])
            $("#contact").val(result["contact"])
        },
        error: function(error) {
            notify(error, "error")
        }
    })
}

addEventListener('DOMContentLoaded', () => {
    getData()
})

