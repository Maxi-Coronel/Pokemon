function dark() {
    if ($(`#flexSwitchCheckDefault`).prop(`checked`)) {
        let modoDark = true;
        $("nav").removeClass("navbar-light");
        $("nav").removeClass("bg-light");
        $("nav").addClass("navbar-dark");
        $("nav").addClass("bg-dark");
        $("main").removeClass("light");
        $("main").addClass("dark");
        $(".fSig").removeClass("circulo--black");
        $(".fSig").addClass("circulo--white");
        $("#fAnt").removeClass("circulo--black");
        $("#fAnt").addClass("circulo--white");
        $("#fondo").removeClass("circulo--black");
        $("#fondo").addClass("circulo--white");
        $("footer").removeClass("footer--ligth");
        $("footer").addClass("footer--black");
        $("#aparece").attr("src", "./Multimedia/Img/portada22.jpg");
        sessionStorage.setItem('modoDark', modoDark);
    } else {
        let modoDark = false;
        $("nav").removeClass("navbar-dark");
        $("nav").removeClass("bg-dark");
        $("nav").addClass("navbar-light");
        $("nav").addClass("bg-light");
        $("main").removeClass("dark");
        $("main").addClass("light");
        $(".fSig").removeClass("circulo--white");
        $(".fSig").addClass("circulo--black");
        $("#fAnt").removeClass("circulo--white");
        $("#fAnt").addClass("circulo--black");
        $("#fondo").removeClass("circulo--white");
        $("#fondo").addClass("circulo--black");
        $("footer").removeClass("footer--black");
        $("footer").addClass("footer--ligth");
        $("#aparece").attr("src", "./Multimedia/Img/portada1.jpg");
        sessionStorage.setItem('modoDark', modoDark);
    }
}


let modoDark = JSON.parse(sessionStorage.getItem("modoDark"));
$(`#flexSwitchCheckDefault`).prop(`checked`, modoDark);

dark();


$(`#flexSwitchCheckDefault`).click(dark);