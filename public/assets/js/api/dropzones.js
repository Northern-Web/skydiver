

$('#countryInput').on('change', function() {
  PopulateDropzones();
});

async function PopulateDropzones(){
  $("#dropzoneInput").empty();
  const countryCode = $("#countryInput").val();

  try {
    fetch(`/api/dropzones/${countryCode}`)
    .then(response => response.json())
    .then(data => {

      for (let item of data) {
        $('#dropzoneInput').append($('<option>', {
          value: item.name,
          text:  item.name
        }));
      }
    });
  } catch (e) {
    console.log(e);
  }

}
