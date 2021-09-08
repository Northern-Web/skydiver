async function GetLogbookItems () {
  try {
    ClearLogbookTable();
    fetch("/api/logitems")
    .then(response => response.json())
    .then(data => {

      for (let item of data) {
        const date = new Date(item.jumpdate);
        $("#logbook-table").find("tbody").append(`
          <tr>
          <td hidden>${item.jumpid}</td>
          <td>${item.jumpnum}</td>
          <td>${date.getDate()}.${date.getMonth()}.${date.getFullYear()}</td>
          <td>${item.aircraft}</td>
          <td>${item.dropzone}</td>
          <td>${item.canopy}</td>
          <td>${item.altitude}</td>
          <td>${item.jumptype}</td>
          <td class="${(item.approved) ? "text-success": "text-danger" }">${(item.approved) ? "<i class=\"material-icons\">done</i>" : "<i class=\"material-icons\">error</i>"}</td>
          </tr>
          `);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

async function AddLogbookItem () {
  try {
    fetch("/api/logitems", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //body: JSON.stringify({email: email, password: password})
    })
    .then(response => response.json())
    .then(data => {


    });
  } catch (e) {

  } finally {

  }
}

function ClearLogbookTable() {
  $("#logbook-table > tbody").empty();
}

$( document ).ready(function() {
    GetLogbookItems();
});
