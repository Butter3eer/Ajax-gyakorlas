const base_url = "https://retoolapi.dev/FF5oPF/WizardsAndWitches";

$(function () {
    WizardsAndWitchesListing();

    $("#newWizardsAndWitchesForm").submit(function (e) { 
        e.preventDefault();
        const name = $("#name").val();
        const patronus = $("#patronus").val();
        const profession = $("#profession").val();
        const house = $("#house").val();
        const wandCore = $("#wandCore").val();
        const WizardsAndWitches = {
            name: name,
            patronus: patronus,
            Profession: profession,
            house: house,
            "wand core": wandCore
        };
        $.post(base_url, WizardsAndWitches,
            function (data, textStatus, jqXHR) {
                if (textStatus === "success") {
                    $("#name").val("");
                    $("#patronus").val("");
                    $("#profession").val("");
                    WizardsAndWitchesListing();
                }
            },
            "json"
        );
    });
});

function WizardsAndWitchesListing() {
    $.get(base_url,
        function (data) {
            console.log(data);
            let html = "";
            data.forEach(WizardsAndWitches => {
                html += `<tr>
                <td class="text-center">${WizardsAndWitches.id}</td>
                <td class="text-center">${WizardsAndWitches.name}</td>
                <td class="text-center">${WizardsAndWitches.patronus}</td>
                <td class="text-center">${WizardsAndWitches.Profession}</td>
                <td class="text-center">${WizardsAndWitches.house}</td>
                <td class="text-center">${WizardsAndWitches["wand core"]}</td>
                <td class="text-center"><i onclick="deletePerson(${WizardsAndWitches.id})" class="fa-solid fa-delete-left"></i></td>
                </tr>`;
            })
            $("#tablazat").html(html);
        },
        "json"
    );
}