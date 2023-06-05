
(function (jQuery) {

jQuery(document).ready(function(){

// jQuery.validator.addMethod("numbersPhone", function (value) {
// 	// após o DDD, eu pedo os 4 primeiros numeros do telefone
// 	var numbersFiltered = value.substring(0,4);
// 	console.log(numbersFiltered)
// 	if ( numbersFiltered === '0000' ) { return false; } else { return true;	};
// }, "Telefone Inválido");

// jQuery("#form").validate({

// rules:{
// idCapitas:{required: true},
// poseeOS:{required: true},
// nome:{required: true},
// email:{required: true,email: true},
// ddd:{required: true,rangelength: [2,3]},
//telefone:{required: true,minlength: 9, numbersPhone: true}
// telefone:{required: true,minlength: 9}
// },

// messages:{
// idCapitas:{required: "Seleccione una opción"},
// poseeOS:{required: "Seleccione una opción"},
// nome:{required: "El campo Nombre es necesario"},
// email:{required: "O campo EMAIL é obrigatório",email: "Informe um EMAIL válido"},
// ddd:{required: "O campo DDD é obrigatório"},
// telefone:{required: "O campo TELEFONE é obrigatório"}
// },

// });

jQuery(".bandeiras img").click(function(){
var srcImagem = jQuery(this).attr("src");
var idOperadpra = jQuery(this).attr("data-id-operadora");
jQuery('.recebe-img img').remove();
jQuery('.recebe-img').append('<img src="'+srcImagem+'">').attr('id', jQuery(this).data("classe-operadora"));
jQuery(".campo-operadora").val(idOperadpra);
jQuery(".plano-selecionado").fadeIn();
});


// TIPO DO PLANO
jQuery(".hijos_num").hide();
jQuery(".campo-edad").hide();
jQuery(".campo-edad-pareja").hide();
jQuery(".edad-varios").hide();
jQuery(".edad-solo").hide();
jQuery(".sueldo").hide();
jQuery(".monotributo").hide();
jQuery(".possui-plano").hide();
jQuery(".possui-cnpj").hide();


jQuery('.btn-vos').click(function() {
jQuery(".tipo-de-plano b").removeClass('ativa');
jQuery(this).addClass('ativa');
jQuery(".tipo-de-plano p").addClass('ok');
jQuery('input:radio[name=idCapitas]')[0].checked = true;
jQuery(".hijos_num").fadeOut();
jQuery("#idCapitas-error").fadeOut();

jQuery(".edad-varios").fadeOut();

jQuery(".campo-edad").fadeIn(function() {
    jQuery('html, body').animate({
        scrollTop: jQuery(".campo-edad").offset().top - (jQuery(window).height() / 2)
      }, 1000);    
    });
    
jQuery(".edad-solo").fadeIn();
jQuery(".campo-edad-pareja").fadeOut();




});

jQuery('.btn-pareja').click(function() {
jQuery(".tipo-de-plano b").removeClass('ativa');
jQuery(this).addClass('ativa');
jQuery(".tipo-de-plano p").addClass('ok');
jQuery('input:radio[name=idCapitas]')[1].checked = true;
jQuery(".hijos_num").fadeOut();
jQuery("#idCapitas-error").fadeOut();

jQuery(".edad-varios").fadeIn();

jQuery(".campo-edad").fadeIn(function() {
    jQuery('html, body').animate({
        scrollTop: jQuery(".campo-edad").offset().top - (jQuery(window).height() / 2)
      }, 1000);
});    jQuery(".edad-solo").fadeOut();

jQuery(".campo-edad-pareja").fadeIn();


});

jQuery('.btn-vosehijo').click(function() {
jQuery(".tipo-de-plano b").removeClass('ativa');
jQuery(this).addClass('ativa');
jQuery(".tipo-de-plano p").addClass('ok');
jQuery('input:radio[name=idCapitas]')[2].checked = true;
jQuery(".hijos_num").fadeIn();
jQuery("#idCapitas-error").fadeOut();
jQuery(".edad-varios").fadeIn();
jQuery(".campo-edad").fadeIn(function() {
    jQuery('html, body').animate({
        scrollTop: jQuery(".campo-edad").offset().top - (jQuery(window).height() / 2)
      }, 1000);
});jQuery(".edad-solo").fadeOut();

jQuery(".campo-edad-pareja").fadeOut();



});

jQuery('.btn-parejaehijo').click(function() {
jQuery(".tipo-de-plano b").removeClass('ativa');
jQuery(this).addClass('ativa');
jQuery(".tipo-de-plano p").addClass('ok');
jQuery('input:radio[name=idCapitas]')[3].checked = true;
jQuery(".hijos_num").fadeIn();
jQuery("#idCapitas-error").fadeOut();
jQuery(".edad-varios").fadeIn();
jQuery(".campo-edad").fadeIn(function() {
    jQuery('html, body').animate({
        scrollTop: jQuery(".campo-edad").offset().top - (jQuery(window).height() / 2)
      }, 1000);
});jQuery(".edad-solo").fadeOut();

jQuery(".campo-edad-pareja").fadeIn();



});
jQuery('.campo-edad').on('input', function() {
jQuery(".possui-plano").fadeIn();
    var edad = jQuery(this).val();
    console.log('Edad: ' + edad);
    // Realizar más acciones aquí
  });
  

// SE POSSUI OPERADORA
//jQuery(".operadora").hide();
jQuery('.btn-con-os').click(function() {
jQuery(".possui-plano b").removeClass('ativa');
jQuery(this).addClass('ativa');
jQuery(".possui-plano p").addClass('ok');
jQuery('input:radio[name=poseeOS]')[0].checked = true;
//jQuery(".operadora").fadeIn();
jQuery("#poseeOS-error").fadeOut();
jQuery(".possui-cnpj").fadeIn();
});
jQuery('.btn-sin-os').click(function() {
jQuery(".possui-plano b").removeClass('ativa');
jQuery(this).addClass('ativa');
jQuery(".possui-plano p").addClass('ok');
jQuery('input:radio[name=poseeOS]')[1].checked = true;
//jQuery(".operadora").fadeOut();
jQuery("#poseeOS-error").fadeOut();
jQuery(".possui-cnpj").fadeOut();
jQuery(".monotributo").fadeOut();
jQuery(".sueldo").fadeOut();

jQuery(".sueldo").hide();
jQuery(".monotributo").hide();
jQuery(".possui-cnpj b").removeClass('ativa');
jQuery(".possui-cnpj p").removeClass('ok');


});

// SE POSSUI CNPJ

jQuery('.btn-rel-os').click(function() {
jQuery(".possui-cnpj b").removeClass('ativa');
jQuery(this).addClass('ativa');
jQuery(".possui-cnpj p").addClass('ok');
jQuery('input:radio[name=cualOS]')[0].checked = true;
jQuery("#cualOS-error").fadeOut();
jQuery(".sueldo").fadeIn();
jQuery(".monotributo").fadeOut();
jQuery(".datos-contacto").fadeIn();

});

jQuery('.btn-mon-os').click(function() {
jQuery(".possui-cnpj b").removeClass('ativa');
jQuery(this).addClass('ativa');
jQuery(".possui-cnpj p").addClass('ok');
jQuery('input:radio[name=cualOS]')[1].checked = true;
jQuery("#cualOS-error").fadeOut();
jQuery(".sueldo").fadeOut();
jQuery(".monotributo").fadeIn();
jQuery(".datos-contacto").fadeIn();

});
// AO CARREGAR A PÁGINA, VERIFICA SE TEM NA URL "INDIVIDUAL", "FAMILIAR" OU "EMPRESARIAL".
var url = window.location.href;
if(url.indexOf('btn-vos') > -1){
jQuery(".tipo-de-plano b").removeClass('ativa');
jQuery(".btn-vos").addClass('ativa');
jQuery(".tipo-de-plano p").addClass('ok');
jQuery('input:radio[name=idCapitas]')[0].checked = true;
jQuery(".possui-cnpj").hide();
jQuery(".possui-cnpj p").removeClass('ok');
jQuery("#idCapitas").fadeOut();
}

if(url.indexOf('btn-pareja') > -1){
jQuery(".tipo-de-plano b, .possui-cnpj b").removeClass('ativa');
jQuery(".btn-pareja").addClass('ativa');
jQuery(".tipo-de-plano p").addClass('ok');
jQuery('input:radio[name=idCapitas]')[1].checked = true;
jQuery(".possui-cnpj").fadeIn();
jQuery("#idCapitas-error").fadeOut();
}

if(url.indexOf('btn-vosehijo') > -1){
jQuery(".tipo-de-plano b").removeClass('ativa');
jQuery(".btn-vosehijo").addClass('ativa');
jQuery(".tipo-de-plano p").addClass('ok');
jQuery('input:radio[name=idCapitas]')[2].checked = true;
jQuery(".possui-cnpj").hide();
jQuery(".possui-cnpj p").removeClass('ok');
jQuery("#idCapitas-error").fadeOut();
}

if(url.indexOf('btn-parejaehijo') > -1){
    jQuery(".tipo-de-plano b").removeClass('ativa');
    jQuery(".btn-parejaehijo").addClass('ativa');
    jQuery(".tipo-de-plano p").addClass('ok');
    jQuery('input:radio[name=idCapitas]')[3].checked = true;
    jQuery(".possui-cnpj").hide();
    jQuery(".possui-cnpj p").removeClass('ok');
    jQuery("#idCapitas-error").fadeOut();
    }
    
    jQuery(window).load(function (){

        if(jQuery(window).width() >=950) {
            jQuery('.bandeiras img').click(function(){
                jQuery("html, body").animate({ scrollTop: jQuery(".form-cotacao").offset().top - 120 }, 1000);
            });
        } else{
            jQuery('.bandeiras img').click(function(){
                jQuery("html, body").animate({ scrollTop: jQuery(".form-cotacao").offset().top }, 1000);
            });

           

            jQuery('.btn-sin-os').click(function(){jQuery("html, body").animate({ scrollTop: jQuery(this).offset().top - 65 }, 1000);});
            jQuery('.btn-con-os').click(function(){jQuery("html, body").animate({ scrollTop: jQuery(this).offset().top - 65 }, 1000);});
           
            jQuery('.btn-rel-os').click(function(){jQuery("html, body").animate({ scrollTop: jQuery(this).offset().top - 65 }, 1000);});
            jQuery('.btn-mon-os').click(function(){jQuery("html, body").animate({ scrollTop: jQuery(this).offset().top - 65 }, 1000);});


// jQuery('.sueldo').on('input', function() {

//     jQuery("html, body").animate({ scrollTop: jQuery(this).offset().top - 45 }, 1000);
   
// });
            
            // function() {
            //     jQuery('html, body').animate({
            //         scrollTop: jQuery(".campo-edad").offset().top - (jQuery(window).height() / 2)
            //       }, 1000);
            // }
            jQuery('.Name').focus(function(){jQuery("html, body").animate({ scrollTop: jQuery(this).offset().top - 45 }, 1000);});
            jQuery('.email').focus(function(){jQuery("html, body").animate({ scrollTop: jQuery(this).offset().top - 45 }, 1000);});
            jQuery('.Prefijo').focus(function(){jQuery("html, body").animate({ scrollTop: jQuery(this).offset().top - 45 }, 1000);});
            jQuery('.Telefone').focus(function(){jQuery("html, body").animate({ scrollTop: jQuery(this).offset().top - 45 }, 1000);});


            jQuery('.Name, .email, .Pefijo, .Telefone').focus(function(){
                jQuery(".margin-rodape").addClass("remove-altura-margin-rodape");
                jQuery(".telefones-rodape").addClass("remove-telefone-rodape");
            });

            jQuery('.Name, .email, .Prefijo, .Telefone').blur(function(){
                jQuery(".margin-rodape").removeClass("remove-altura-margin-rodape");
                jQuery(".telefones-rodape").removeClass("remove-telefone-rodape");
            });

        }

    });




    
    // jQuery(".campo-edad").fadeIn(function() {
    //     document.querySelector(".campo-edad").scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // });
    
    
    // jQuery(".campo-edad").fadeIn(function() {
    //     jQuery('html, body').animate({
    //         scrollTop: jQuery(".campo-edad").offset().top - (jQuery(window).height() / 2)
    //       }, 1000);
    // });



















// MÁSCARAS
// jQuery("#ddd").mask("900");
// jQuery("#Telefone").mask("90000-0000", {reverse: true});
// jQuery("#cpf").mask("000.000.000-00");
// jQuery("#cnpj").mask("00.000.000/0000-00");


function salvaCookies(){
setCookie('data_lead_operadora', jQuery('.campo-operadora').val(), 3);
setCookie('data_lead_tipo', jQuery('input[name=idCapitas]:checked').val(), 3);
setCookie('data_lead_possui_cnpj', jQuery('input[name=poseeOS]:checked').val(), 3);
setCookie('data_lead_possui_plano', jQuery('input[name=poseeOS]:checked').val(), 3);
setCookie('data_lead_quantidade_pessoas', jQuery('select[name=qntPessoas] option').filter(':selected').val(), 3);
setCookie('data_lead_name', jQuery('.campo-nome').val(), 3);
setCookie('data_lead_email', jQuery('.campo-email').val(), 3);
setCookie('data_lead_ddd', jQuery('.campo-ddd').val(), 3);
setCookie('data_lead_telefone', jQuery('.campo-telefone').val(), 3);
setCookie('data_lead_telefone_com_ddd', "("+jQuery('.campo-ddd').val()+") " + jQuery('.campo-telefone').val(), 3);
function setCookie(name, value, days) {
var d = new Date;
d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}
}


});


}(window.jQuery || window.jQuery));


                
                
                