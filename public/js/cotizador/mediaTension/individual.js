var idPanel;
var idInversor;

$(document).ready(function(){
    var loader = $('#loader');

    readyLoader(loader);
    checkCheckBox();
    getDropDownListValues();
});

function readyLoader(loader){
    $(document)
    .ajaxStart(function(){
        loader.fadeIn();
    })
    .ajaxStop(function(){
        loader.fadeOut();
        $('#divResultCotIndv').css("display","");
    });
}

function checkCheckBox(){
    $('#chbEstructuras').click(function(){
        if($(this).prop("checked") == true){
            return true;
        }
    });
}

function getDropDownListValues(){
    idPanel = document.getElementById('optPaneles').value;
    idInversor = document.getElementById('optInversores').value; 

    if(idPanel != "-1"){
        $('#inpCantPaneles').prop("disabled", false);
    }else{
        $('#inpCantPaneles').prop("disabled", true);
    }

    if(idInversor != "-1"){
        $('#inpCantInversores').prop("disabled", false);
    }else{
        $('#inpCantInversores').prop("disabled", true);
    }
}

function validarValoresDropDownLists(idPanel, idInversor){
    if(idPanel == "-1" && idInversor == "-1"){
        alert('Favor de seleccionar al menos un inversor o un panel');
    }else{
        return true;
    }
}

function sendSingleQuotation(){
    var cantidadPaneles = document.getElementById('inpCantPaneles').value;
    var cantidadInversores = document.getElementById('inpCantInversores').value;

    if(validarValoresDropDownLists(idPanel, idInversor) == true){
        $.ajax({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            type: 'POST',
            url: '/enviarCotizIndiv',
            data: {
                "_token": $("meta[name='csrf-token']").attr('content'),
                "idPanel": idPanel,
                "idInversor": idInversor,
                "cantidadPaneles": cantidadPaneles,
                "cantidadInversores": cantidadInversores
            },
            dataType: 'json',
            error: function(){
                alert('Algo ha ido mal al intentar realizar una cotizacion_individual');
            }
        })
        .done(function(respuesta){
            respuesta = respuesta.message;
    
            console.log(respuesta);
    
            /*Vaciar datos de la cotizacion_individual en la tabla*/
            //Paneles
            $('#tdCantidadPanel').html(respuesta[0].paneles.cantidadPaneles);
            $('#tdPotenciaPanel').html(respuesta[0].paneles.potenciaPanel);
            $('#tdPotenciaReal').html(respuesta[0].paneles.potenciaReal);
            $('#tdPrecioModulo').html(respuesta[0].paneles.precioPorModulo + '$');
            $('#tdCostoTotalPanels').html(respuesta[0].paneles.costoTotalPaneles + '$');
    
            //Inversores
            $('#tdCantidadInversor').html(respuesta[0].inversores.numeroDeInversores);
            $('#tdPotenciaInversor').html(respuesta[0].inversores.potenciaInversor);
            $('#tdPotenciaMaxima').html(respuesta[0].inversores.potenciaMaximaInversor);
            $('#tdPotenciaNominal').html(respuesta[0].inversores.potenciaNominalInversor);
            $('#tdPorcentajeSD').html(respuesta[0].inversores.porcentajeSobreDimens + '%');
            $('#tdPotenciaPico').html(respuesta[0].inversores.potenciaPicoPorInversor);
            $('#tdPrecioInversor').html(respuesta[0].inversores.precioInversor + '$');
            $('#tdCostoTotalInv').html(respuesta[0].inversores.costoTotalInversores + '$');
    
            //Viaticos
            $('#tdCostoEstructuras').html(respuesta[0].viaticos_costos.costoDeEstructuras + '$');
            $('#tdNoCuadrillas').html(respuesta[0].viaticos_costos.noCuadrillas);
            $('#tdNoDias').html(respuesta[0].viaticos_costos.noDias);
            $('#tdNoDiasReales').html(respuesta[0].viaticos_costos.noDiasReales);
            $('#tdNoPersonasReq').html(respuesta[0].viaticos_costos.noPersonasRequeridas);
            $('#tdPagoPasaje').html(respuesta[0].viaticos_costos.pagoPasaje + '$');
            $('#tdPagoTotalComida').html(respuesta[0].viaticos_costos.pagoTotalComida + '$');
            $('#tdPagoTotalHospedaje').html(respuesta[0].viaticos_costos.pagoTotalHospedaje + '$');
            $('#tdPagoTotalPasaje').html(respuesta[0].viaticos_costos.pagoTotalPasaje + '$');
            $('#tdTotalViaticos').html(respuesta[0].totales.totalViaticosMT + '$');
    
            //Totales
            $('#tdCostoWatt').html(respuesta[0].totales.costForWatt + '$');
            $('#tdCostoTotalFletes').html(respuesta[0].totales.costoTotalFletes + '$');
            $('#tdManoObra').html(respuesta[0].totales.manoDeObra + '$');
            $('#tdMargen').html(respuesta[0].totales.margen);
            $('#tdTotalOtros').html(respuesta[0].totales.otrosTotal + '$');
            $('#tdPrecio').html(respuesta[0].totales.precio + '$');
            $('#tdPrecioMasIVA').html(respuesta[0].totales.precioMasIVA + '$');
            $('#tdTPIE').html(respuesta[0].totales.totalPanelesInversoresEstructuras + '$');
            $('#tdSubtotalOFPIE').html(respuesta[0].totales.subTotalOtrosFleteManoDeObraTPIE + '$');
            $('#tdTotalTodo').html(respuesta[0].totales.totalDeTodo + '$');
        });
    }
}

function coti_dollars(){
    document.getElementById('containerCI1').style.display = '';
    document.getElementById('containerCI2').style.display = 'none';
}

function coti_mxn(){
    document.getElementById('containerCI2').style.display = '';
    document.getElementById('containerCI1').style.display = 'none';
}