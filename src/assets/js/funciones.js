function finalizar(formClass) {
    var form = document.querySelector(formClass);
    var boton = form.querySelector('[type=submit]');
    var formElement = document.getElementById('contact-form');
    var formErro = 0;
    var requiredInputs = formElement.querySelectorAll('.required');
    var submitButton = document.querySelector(".form-cotacao [type='submit']");

    boton.disabled = true;

    // requiredInputs.forEach(function(input) {
    //     if (input.value === '') {
    //         formErro += 1;
    //         input.classList.add('ErrorFormIw');
    //     }
    // });
    
    // if (formErro == 0) {
    //     var formData = new FormData(form);
        
        document.querySelector("#contact-form input[type='submit']").disabled = true;
        document.querySelector('#contact-form .loader').style.display = 'block';

        // for (var pair of formData.entries()) {
        //     console.log('Key: ' + pair[0] + ', Value: ' + pair[1]);
        // }

        $.ajax({
            url: form.getAttribute('action'),
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $('form#contact-form button').prop('disabled', true);
                $('.form-contact-form').css('cursor', 'wait');
                $('form#contact-form .alert').addClass('alert-info');
                $('form#contact-form .alert strong').text('Enviando datos...');
            },
            success: function(response) {
                var form = document.querySelector('#contact-form');
                console.log(response)
    var submitButton = form.querySelector('input[type="submit"]');
    var loader = form.querySelector('.loader');
    submitButton.value = '  ENVIO EXITOSO!  ';
    loader.style.display = 'none';

    // salvaCookies();

    setTimeout(function() {
        window.location.href = 'https://queplan.ar/gracias/';
    }, 3000);
            },
            error: function() {
                console.log('Error al enviar el correo');
            }
        });
    }
// }

function cambiarValor(valor) {
    var input = document.getElementById('Operadora');
    input.value = valor;
  }
  