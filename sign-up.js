const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const btn = document.querySelector(".sign-up");
btn.onclick = async function () {
  if (emailInput.value === "" || passwordInput.value === "") {
    return;
  }
  let user = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  // console.log(user);
  emailInput.value = "";
  passwordInput.value = "";
  // const headers = {};
  // for (let i = 0; i < 500; i++) {
  //   headers[`my-header-${i}`] = `value-${i}`;
  // }

  const response = await fetch("http://localhost:8000/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // ...headers,
    },
    body: JSON.stringify(user),
  });
  const responseObj = await response.json();
  if (responseObj.success) {
    window.location.href = "http://localhost:8000/index.html";
  } else {
    // document.querySelector(".error").classList.add("hidden");
    document.querySelector(".error").classList.remove("hidden");
    console.log(responseObj.msg);
  }
  console.log(responseObj);
};
