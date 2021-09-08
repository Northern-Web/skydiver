async function Signin () {
  const email    = $("#email").val();
  const password = $("#password").val();

  fetch("/api/users/authenticate", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email, password: password})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    window.location.replace(data.redirect);
  });
}

$("#btn-login").click(function () {
  Signin();
});
