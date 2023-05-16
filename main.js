const base_url = "https://retoolapi.dev/ebGkcv/WizardsAndWitches";

$(function () {
    WizardsAndWitchesListing();

    $("#save").click(function (e) {
        e.preventDefault();
        const name = $("#name").val();
        const patronus = $("#patronus").val();
        const profession = $("#profession").val();
        const house = $("#house").val();
        const wandCore = $("#wandCore").val();
        const id = $("#personId").val();

        const WizardsAndWitches = {
            id: id,
            name: name,
            patronus: patronus,
            Profession: profession,
            house: house,
            "wand core": wandCore
        };
        $.ajax({
            type: "PUT",
            url: `${base_url}/${id}`,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(WizardsAndWitches),
            success: function (data, textStatus, jqXHR) {
                if (textStatus === "success") {
                    WizardsAndWitchesListing();
                }
            },
        });
    });

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
                <td class="text-center"><i onclick="WizardAndWitchesDelete(${WizardsAndWitches.id})" class="fa-solid fa-delete-left"></i></td>
                <td class="text-center"><i onclick="readWandW(${WizardsAndWitches.id})" class="fa-solid fa-arrows-rotate"></i></td>
                </tr>`;
            })
            $("#tablazat").html(html);
        },
        "json"
    );
}

function WizardAndWitchesDelete(Id){
    $.ajax({
        type: "DELETE",
        url: `${base_url}/${Id}`,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (textStatus === "success"){
                WizardsAndWitchesListing();
            };
        }
    });
}

function readWandW(Id) {
    $.get(`${base_url}/${Id}`,
        function (data, textStatus) {
            if (textStatus === "success") {
                $("#name").val(data.name);
                $("#patronus").val(data.patronus);
                $("#profession").val(data.Profession);
                $("#house").val(data.house);
                $("#wandCore").val(data["wand core"]);
                $("#personId").val(data.id);
            }
        },
        "json"
    );
}