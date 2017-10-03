var rozdzialy = [50, 40, 27, 36, 34, 24, 21, 4, 31, 24, 22, 25, 29, 36, 10, 13, 10, 42, 150, 31, 12, 8, 66, 52, 5, 48, 12, 14, 3, 9, 1, 4, 7, 3, 3, 3, 2, 14, 4, 28, 16, 24, 21, 28, 16, 16, 13, 6, 6, 4, 4, 5, 3, 6, 4, 3, 1, 13, 5, 5, 3, 5, 1, 1, 1, 22];
var ksiega;
var rozdzial;
var $index;
var h;
var th;

var nazwyksiag = [

         "Księga Rodzaju",
         "Księga Wyjścia",
         "Księga Kapłańska",
         "Księga Liczb",
         "Księga Powtórzonego Prawa",
         "Księga Jozuego",
         "Księga Sędziów",
         "Księga Rut",
         "I Księga Samuela",
         "II Księga Samuela",
         "I Księga Królewska",
         "II Księga Królewska",
         "I Księga Kronik",
         "II Księga Kronik",
         "Księga Ezdrasza",
         "Księga Nehemiasza",
         "Księga Estery",
         "Księga Hioba",
         "Księga Psalmów",
         "Księga Przysłów",
         "Księga Kaznodziei",
         "Pieśni nad Pieśniami",
         "Księga Izajasza",
         "Księga Jeremiasza",
         "Księga Lamentacji",
         "Księga Ezechiela",
         "Księga Daniela",
         "Księga Ozeasza",
         "Księga Joela",
         "Księga Amosa",
         "Księga Abdiasza",
         "Księga Jonasza",
         "Księga Micheasza",
         "Księga Nahuma",
         "Księga Habakuka",
         "Księga Sofoniasza",
         "Księga Aggeusza",
         "Księga Zachariasza",
         "Księga Malachiasza",
         "Ewangelia Mateusza",
         "Ewangelia Marka",
         "Ewangelia Łukasza",
         "Ewangelia Jana",
         "Dzieje Apostolskie",
         "List do Rzymian",
         "I List do Koryntian",
         "II List do Koryntian",
         "List do Galacjan",
         "List do Efezjan",
         "List do Filipian",
         "List do Kolosan",
         "I List do Tesaloniczan",
         "II List do Tesaloniczan",
         "I List do Tymoteusza",
         "II List do Tymoteusza",
         "List do Tytusa",
         "List do Filemona",
         "List do Hebrajczyków",
         "List Jakuba",
         "I List Piotra",
         "II List Piotra",
         "I List Jana",
         "II List Jana",
         "II List Jana",
         "List Judy",
         "Księga Objawienia"
];

function zmienh() {
    th = $(".title").height();
    h = window.innerHeight + 20;
    $(".ksiegi").css("height", h);
    $(".rozdzialy").css("height", h);
    $(".tekst").css("height", h - th - 20 - 20);

}


$(document).ready(function () {

    window.onresize = function (event) {
        var h = window.innerHeight + 20;
        $(".ksiegi").css("height", h);
        $(".rozdzialy").css("height", h);
        $(".tekst").css("min-height", h);
        console.log("poslzoch");
    };

    zmienh();

    for (var x = 0; x < 66; x++) {
        $(".ksiegi ul").append("<li>" + nazwyksiag[x] + "</li>")
    }


    var czy1 = 0;


    $(".rozdzialy").hide();


    $(".ksiegi ul").on("click", "li", function () {
        zmienh();
        $index = $(".ksiegi ul li").index(this);
        $(".title h1").html(nazwyksiag[$index] + " - 1");

        $(".ksiegi ul li ").css("background-color", "rgba(0,0,0,0.2)");
        $(this).css("background-color", "rgba(0,0,0,0.5)");

        $(".rozdzialy").show(500);

        ksiega = $index + 1;
        $(".rozdzialy ul").empty();
        for (var x = 0; x < rozdzialy[$index]; x++) {
            $(".rozdzialy ul").append("<li>" + (x + 1) + "</li>")
        }
        if (czy1 === 1) {
            $(".rozdzialy").hide();
            $(".rozdzialy").show(400);
        } else czy1 = 1;

        $("html, body").animate({
            scrollTop: 0
        }, "medium");



        $.ajax({
            url: "biblie/UBG/" + ksiega + "/" + 1 + ".txt",
            dataType: "text",
            success: function (data) {

                $(".tekst").empty();
                var wersety = data.split('\n');
                wersety.forEach(function (werset, i) {
                    var nrwersetu = i + 1;
                    $(".tekst").append("<div class='werset' id='" + ksiega + "/" + rozdzial + "/" + nrwersetu + "'>" + werset + "</div>")
                });
            }

        });

        $(".rozdzialy ul li:first ").css("background-color", "rgba(0,0,0,0.5)");




        return false;
    });



    $(".rozdzialy ul").on("click", "li", function () {
        zmienh();
        $(".rozdzialy ul li ").css("background-color", "rgba(0,0,0,0.2)");
        $(this).css("background-color", "rgba(0,0,0,0.5)");


        rozdzial = $(".rozdzialy ul li").index(this) + 1;

        $(".title h1").html(nazwyksiag[$index] + " - " + rozdzial);



        $.ajax({
            url: "biblie/UBG/" + ksiega + "/" + rozdzial + ".txt",
            dataType: "text",
            success: function (data) {

                $(".tekst").empty();
                var wersety = data.split('\n');
                wersety.forEach(function (werset, i) {
                    var nrwersetu = i + 1;
                    $(".tekst").append("<div class='werset' id='" + ksiega + "/" + rozdzial + "/" + nrwersetu + "'>" + werset + "</div>")
                });
            }
        });



    });

});