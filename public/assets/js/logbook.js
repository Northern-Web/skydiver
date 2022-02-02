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
          <td><strong><a href="#" onclick="GetLogItemDetails(this)">${item.jumpnum}</a></strong></td>
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
      body: JSON.stringify({
        jumpdate:           $("#jumpdateInput").val(),
        aircraft:           $("#aircraftInput").val(),
        dropzone:           $("#dropzoneInput").val(),
        canopy:             $("#canopyInput").val(),
        altitude:           $("#altitudeInput").val(),
        freefalltime:       $("#freefalltimeInput").val(),
        jumptype:           $("#jumptypeInput").val(),
        emergencyprocedure: $("#emergencyprocedureInput").val(),
        twin:               $("#twinInput").val(),
        description:        $("#descriptionInput").val(),
        instructor:         $("#instructorInput").val(),
        remark:             $("#remarkInput").val(),
        license:            $("#instructorlicenseInput").val(),
        approved:           $("#approvedInput").val()
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Jump record added to database!");
      ClearJumpRegistration();

    });
  } catch (e) {
    console.log(e);
  }
}

function ClearLogbookTable() {
  $("#logbook-table > tbody").empty();
}

async function ClearJumpRegistration () {
  $("#jumpdateInput").val();
  $("#aircraftInput").val("");
  $("#dropzoneInput").val("");
  $("#canopyInput").val("");
  $("#altitudeInput").val("");
  $("#freefalltimeInput").val(0);
  $("#jumptypeInput").val("SL");
  $("#emergencyprocedureInput").val(0);
  $("#twinInput").val(0);
  $("#descriptionInput").val("");
  $("#instructorInput").val("");
  $("#remarkInput").val("");
  $("#instructorlicenseInput").val("");
  $("#approvedInput").val(0);
}

async function ShowRegistrationConfirmation (ms) {
  var start = new Date().getTime();
  var end = start;

  var confirmation = $("#registration-confirmation");
  confirmation.removeAttr("hidden");

  while(end < start + ms) {
    end = new Date().getTime();
  }

  confirmation.style.display = "none";

}

async function GetLogItemDetails(linkButton) {
  const jumpId = linkButton.parentNode.parentNode.cells[0].textContent;
  alert(jumpId);
}

$("#btn-add-jump-record").click(function () {
  AddLogbookItem();
});

$( document ).ready(function() {
    GetLogbookItems();
});
