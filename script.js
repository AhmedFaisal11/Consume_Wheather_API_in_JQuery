$(document).ready(function () {
    $("input[id='cityRadio']").change(function () {
        $(this).parents("#apiDiv").find
        ("span").css("background", "none");
        $(this).parent().css("background", "#4CAF50");
    });

    $("#submit").click(function (e) {
        var validate = Validate();
        $("#message").html(validate);
        if (validate.length == 0) {
            $.post("http://api.openweathermap.org/data/2.5/weather?id=" + 
            $("input[id='cityRadio']:checked").val() + 
            "&appid=f29250f7cbbac0292ef8f7a19938aa63&units=metric",
            function (result, status, xhr) {
                var table = $("<table><tr><th>Weather Description</th></tr>");

                table.append("<tr><td>City:</td> <td>" + result["name"] + "</td></tr>");
                table.append("<tr><td>Country:</td> <td>" + result["sys"]["country"] + "</td></tr>");
                table.append("<tr><td>Wind:</td> <td>" + result["wind"]["speed"] + "Km/h</td></tr>");
                table.append("<tr><td>Current Temperature:</td> <td>" + result["main"]["temp"] + " °C</td></tr>");
                table.append("<tr><td>Humidity:</td> <td>" + result["main"]["humidity"] + "</td> </tr>");
                table.append("<tr><td>Weather:</td> <td>" + result["weather"][0]["description"] + "</td></tr>");
                $("#message").html(table);
            }
            ).fail(function (xhr, status, error) {
                alert("Result: " + status + " " + error + " " + 
                xhr.status + " " + xhr.statusText);
            });
        }
    });

    $(document).ajaxStart(function () {
        $("img").show();
    });

    $(document).ajaxStop(function () {
        $("img").hide();
    });

    function Validate() {
        var errorMessage = "";
        if ($("input[id='cityRadio']").is(":checked") == false) {
            errorMessage += "? Select City";
        }
        return errorMessage;
    }
});