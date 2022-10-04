$(document).ready(function() {
    $(".myInfo_1").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#myInfo_1").addClass("selected")
    })
    $(".myInfo_2").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#myInfo_2").addClass("selected")
    })
    $(".myInfo_3").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#myInfo_3").addClass("selected")
    })
    $(".myInfo_4").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#myInfo_4").addClass("selected")
    })
    $(".myInfo_5").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#myInfo_5").addClass("selected")
    })
    $(".myInfo_6").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#myInfo_6").addClass("selected")
    })
    $(".myInfo_7").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#myInfo_7").addClass("selected")
    })
    $(".myInfo_8").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#myInfo_8").addClass("selected")
    })
    $(".myInfo_9").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#myInfo_9").addClass("selected")
    })
    $(".myInfo_10").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#myInfo_10").addClass("selected")
    })
    $(".myInfo_11").click(function() {
        $(".choosed").removeClass("choosed")
        $(this).children().addClass("choosed")
        $(".selected").removeClass("selected")
        $("#myInfo_11").addClass("selected")
    })
    $(".myInfo_1").click()

    var acc = document.getElementsByClassName("menu_title");
    var i;
    
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
});
