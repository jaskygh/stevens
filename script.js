function targetChange() {
    var id = $("input[name=targetNumber]:checked").val();

    $(".dynamic").each(function() {
        $(this).removeClass("background-yellow");
        $(this).removeClass("background-green");
        if (id == this.id) {
            $(this).addClass("background-green");
            $(this).val("");
            $(this).prop("disabled", true);
            $(this).prop('title', 'This number will be calculated after enter all other green boxes');
        } else {
            $(this).addClass("background-yellow");
            $(this).prop("disabled", false);
            $(this).prop('title', 'Enter number to calculate the number for the purple box');
        }
    });

}


function numberChange() {


    var cp = $("#cp").toNumber();
    var upc = $("#upc").toNumber();
    var rp = $("#rp").toNumber();
    var gmpercentage = $("#gmpercentage").toNumber() / 100;

    if (upc != 0) {
        $("#out_up").val(round(cp / upc));
        $("#out_gmunit").val(round(rp - (cp / upc)));
    }


    switch ($("input[name=targetNumber]:checked").val()) {

        case 'cp': {
            //rp, margin, upc are dynamic
            var newCP = getCP(cp, gmpercentage, upc, rp);
            $("#cp").val(newCP);
            $("#out_up").val(getUP(newCP, upc));
            $("#out_gmunit").val(getGmUnit(newCP, upc, rp));

            return;
        }
        case 'rp': {
            var newRP = getRP(cp, gmpercentage, upc);

            $("#rp").val(newRP);
            $("#out_gmunit").val(getGmUnit(cp, upc, newRP));
            return;
        }

        case 'gmpercentage': {

            var newGmpercentage = getPercentage(cp, upc, rp);
            $("#gmpercentage").val(newGmpercentage * 100);
        }

    }

}

function round(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function getCP(cp, percentage, upc, rp) {
    return round((1 - percentage) * upc * rp);
}

function getUP(cp, upc) {
    return round(cp / upc);
}

function getRP(cp, percentage, upc) {
    return round(cp / ((1 - percentage) * upc));
}

function getPercentage(cp, upc, rp) {
    return round(((cp / (upc * rp)) - 1) * -1);
}

function getGmUnit(cp, upc, rp) {
    return round(rp - (cp / upc));
}


jQuery.fn.extend({
    toNumber: function() {
        return this.val().trim().length === 0 || parseFloat(this.val()) === "NaN" ? 0 : this.val();
    }
});

// Clear Inputs - Reload page by pressing 'C'
document.addEventListener('keydown', function(event) {
  // Check if the pressed key's code is 81 (Q key)
  if (event.keyCode === 81) {
    var inputFields = document.querySelectorAll('input[type="number"]');
    // Reset the values of each input field
    inputFields.forEach(function (input) {
        input.value = '';
    });
  }
});
