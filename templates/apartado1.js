var apartado1= document.querySelector(".apartado1");
var conf_apriori=document.querySelector(".conf_apriori");

function configuracion_apriori(){
    apartado1.innerHTML= "";
    let parametros= document.createElement("div");
    let text= `
    <form class="row g-3">
        <div class="col-2">
            <label for="soporte-input" class="form-label">Soporte</label>
            <input type="number" class="form-control" id="soporte-input" step="0.0001" placeholder="Del 0 al 1" min="0.0001" max="1">
        </div>
        <div class="col-2">
            <label for="confianza-input" class="form-label">Confianza</label>
            <input type="number" class="form-control" id="confianza-input" step="0.01" placeholder="Del 0 al 1" min="0.01" max="1">
        </div>
        <div class="col-2">
            <label for="elevacion-input" class="form-label">Elevación</label>
            <input type="number" class="form-control" id="elevacion-input" step="0.1" placeholder="Mayor a 0" min="0.1">
        </div>
        <div class="col-2">
            <button onclick=boton_hecho() id="boton_apriori" type="button" class="btn btn-primary mb-3">Hecho</button>
        </div>
    </form>`    
    conf_apriori.innerHTML= text;
}


function boton_hecho(){
    let soporte= document.querySelector("#soporte-input");
    let confianza= document.querySelector("#confianza-input");
    let elevacion= document.querySelector("#elevacion-input");
    if(soporte.value.length==0){
       alert("Ingrese un valor para Soporte");
    }
    else if (confianza.value.length==0){
        alert("Ingrese un valor para Confianza");
    }
    else if(elevacion.value.length==0){
        alert("Ingrese un valor para Elevacion ");
    }
    else{
        apriori(parseFloat(soporte.value), parseFloat(confianza.value), parseFloat(elevacion.value));
    }
    
}





function apriori(soporte, confianza, elevacion){

    eel.apriori(soporte, confianza, elevacion)(function(data){
        let mensaje= document.createElement("div");
        
        let text= `<div class= accordion id="accordionExample">
        `;
        for(i=0; i<data.length; i++){
             text=text+
             `<div class="accordion-item">
             <h2 class="accordion-header" id="heading`+i+`">
               <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse`+i+`" aria-expanded="true" aria-controls="collapse`+i+`"> 
               Regla `+
                i+":  "+data[i][0]+" ===> "+data[i][1]+
               `</button>
             </h2>
             <div id="collapse`+i+`" class="accordion-collapse collapse" aria-labelledby= "heading`+i+`" data-bs-parent="#accordionExample">
               <div class="accordion-body">
                 <strong> Soporte: `+data[i][2]+`<br> 
                 Confianza: `+ data[i][3]+` <br> 
                 Elevación: `+data[i][4]+`</strong> 
               </div>
             </div>
             </div>
             `;  

        }
        text= text+"</div>";
        mensaje.innerHTML= text;
        apartado1.appendChild(mensaje);
    });

}