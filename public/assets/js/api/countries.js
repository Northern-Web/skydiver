async function GetCountries () {
  try {
    fetch("/api/countries")
    .then(response => response.json())
    .then(data => {

      for (let item of data) {
        $('#countryInput').append($('<option>', {
          value: item.country_code,
          text:  item.country_name
        }));
      }
    });
  } catch (e) {
    console.log(e);
  }
}

$( document ).ready(function() {
    GetCountries();
});
