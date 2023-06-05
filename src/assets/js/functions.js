(function ($) {


// .READY
$(document).ready(function (){

    if (window.navigator.userAgent.indexOf("Mac") != -1) {
        $(".barra-rodape-mobile").addClass("dispositivo-ios");
      }
    $(".abre-menu-mobile").click(function(){
        $(".fundo-preto").fadeIn();
        $("#header #nav").addClass("ativa-menu");
    });

    $(".fundo-preto").click(function(){
        $(".fundo-preto").fadeOut();
        $("#header #nav").removeClass("ativa-menu");
    });

    $('<div class="abre-sub-menu"></div>').insertAfter('#header #nav li.menu-item-has-children .sub-menu');

    $(".abre-sub-menu").click(function(){
        $(this).closest("#header #nav ul li.menu-item-has-children").toggleClass('fundo-ativo');
        $(this).siblings(".sub-menu").toggleClass('ativa-sub-menu');
    });

    $(".abre-busca-mobile").click(function(){
        $(this).toggleClass("ativa-btn");
        $(".formulario-busca").toggleClass("ativa-busca");
    });



    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
          $(".barra-rodape-mobile").css({ "bottom": "0px" });
        } else {
          $(".barra-rodape-mobile").css({ "bottom": "-140px" });
        }
      });
 // Capturar el envío del formulario de búsqueda
//  $('#searchform').submit(function (event) {
    // event.preventDefault();
     // Evitar que se envíe el formulario por defecto

    // Obtener el término de búsqueda ingresado por el usuario
    // var searchTermino = $('#s').val();

    // Realizar acciones de búsqueda según el término ingresado
    // Por ejemplo, redireccionar a una página de resultados de búsqueda
    // window.location.href = 'https://queplan.ar/?s=' + searchTermino;
//   });
});

// .LOAD
$(window).load(function (){

    
    
      
      

    if($(window).width() >=950) {
        var alturaTopo = $("#header").outerHeight();

        var alturaSidebar = $("#sidebar").outerHeight();
        var alturaConteudoInicial = $(".single #wrapper article").outerHeight();

        if(alturaConteudoInicial > alturaSidebar){$(".single #sidebar").css({"height": alturaConteudo});}
        if(alturaConteudoInicial < alturaSidebar){$(".single #wrapper article").css({"height": alturaSidebar});}

        var alturaConteudo = $(".single #wrapper article").outerHeight();

        var alturaCompartilhamento = $(".box-compartilhamento").outerHeight();

        var alturaTitulo = $(".titulo-do-post").outerHeight();
        var alturaBreadcrumbs = $("#breadcrumbs").outerHeight();
        var alturaBusca = $("#search-3").outerHeight();
        var alturaCategorias = $("#categories-3").outerHeight();
        var alturaBanner = $("#text-2").outerHeight();
        var alturaFormulario = $(".form-whats-sidebar").outerHeight();

        // CALCULO PARA DEIXAR ABSOLUTO O BOX COMPARTILHAMENTO
        var calculoCompartilhamento = (alturaConteudo + alturaTopo - alturaCompartilhamento - 15);

        // CALCULO PARA FIXAR O FORMULARIO
        var calculoFormularioFixo = (alturaTitulo + alturaBreadcrumbs + alturaBusca + alturaCategorias +  alturaBanner + 92);

        var calculoFormularioAbsoluto = (alturaConteudo + alturaTopo - alturaFormulario - 15);

        $(window).scroll(function (){

            // TOPO
            if ($(this).scrollTop() > alturaTopo){
                $("#header").addClass("fixa-topo");
                $("body").css({"padding-top": alturaTopo});
            }else {
                $("#header").removeClass("fixa-topo");
                $("body").css({"padding-top": "0px"});
            }


            // FORMULARIO
            if ($(this).scrollTop() > calculoFormularioFixo){
                $(".form-whats-sidebar").addClass("fixa-form-whats-sidebar").css({"top": alturaTopo});
            }else {
                $(".form-whats-sidebar").removeClass("fixa-form-whats-sidebar").css({"top": "0"});
            }

            if ($(this).scrollTop() > calculoFormularioAbsoluto){
                $(".form-whats-sidebar").addClass("form-whats-sidebar-absolute");

            }else {
                $(".form-whats-sidebar").removeClass("form-whats-sidebar-absolute");
            }



            // COMPARTILHAMENTO
            if ($(this).scrollTop() > alturaTopo){
                $(".box-compartilhamento").addClass("fixa-box-compartilhamento").css({"top": alturaTopo});
            }else {
                $(".box-compartilhamento").removeClass("fixa-box-compartilhamento").css({"top": "0"});
            }

            if ($(this).scrollTop() > calculoCompartilhamento){
                $(".box-compartilhamento").addClass("box-compartilhamento-absolute");

            }else {
                $(".box-compartilhamento").removeClass("box-compartilhamento-absolute");
            }

        });

        $(".page-template-page-operadora .banner-desktop, .page-template-page-operadora .banner-desktop a").click(function(){$("html, body").animate({ scrollTop: $(".form-cotacao").offset().top -150 }, 1000); return false;});
        $(".page-template-page-simulador .banner-desktop, .page-template-page-simulador .banner-desktop a").click(function(){$("html, body").animate({ scrollTop: $("#wrapper .passo-bandeiras").offset().top -180 }, 1000); return false;});
        $(".page-id-81 .banner-desktop, .page-id-81 .banner-desktop a").click(function(){$("html, body").animate({ scrollTop: $(".lista-tipo-4 h4").offset().top -180 }, 1000); return false;});

    }

    if($(window).width() <= 949){
        $(".page-template-page-operadora .banner-mobile").click(function(){$("html, body").animate({ scrollTop: $(".form-cotacao").offset().top -10 }, 1000); return false;});
        $(".page-template-page-simulador .banner-mobile").click(function(){$("html, body").animate({ scrollTop: $("#wrapper .passo-bandeiras").offset().top -10 }, 1000); return false;});
        $(".page-id-81 .banner-mobile, .page-id-81 .banner-mobile a").click(function(){$("html, body").animate({ scrollTop: $(".lista-tipo-4 h4").offset().top -10 }, 1000); return false;});
    }

    $(window).resize(function(){
        if($(window).width() >=950) {
            var alturaTopo = $("#header").outerHeight();
            $(window).scroll(function (){
                if ($(this).scrollTop() > alturaTopo){
                    $("#header").addClass("fixa-topo");
                    $("body").css({"padding-top": alturaTopo});
                }else {
                    $("#header").removeClass("fixa-topo");
                    $("body").css({"padding-top": "0px"});
                }
            });
        }
    });

    $(window).scroll(function(){
        var sticky = $('.sticky'),
            scroll = $(window).scrollTop();
      
        if (scroll >= 100) sticky.addClass('fixed');
        else sticky.removeClass('fixed');
      }); 

});

}(window.jQuery || window.jQuery));
