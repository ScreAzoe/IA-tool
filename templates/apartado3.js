var divClustering= document.querySelector(".clustering-conf");
var divJerarquico= document.querySelector(".jerarquico")
var columnas_file= []
var columnas_selec=[]

function configuracion_cluster(){
    divJerarquico.innerHTML="";
    divClustering.innerHTML="";
    eel.configuracion_cluster()(function(columnas){
        imprime_datos(columnas)
        columnas_file= columnas;
    });
}

function imprime_datos(columnas){
    let caja= document.createElement("div");
    let text= `<h3>Selección de características: </h3><p><div class= "container">
    <form >`;
    //Meter en ciclo para acceder a todas las columnas
    for(i=0; i<columnas.length; i++){
       text+= `
        <div class="form-check form-check-inline col">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox`+i+`" value="`+columnas[i]+`">
        <label class="form-check-label" for="inlineCheckbox`+i+`">`+columnas[i]+`</label>
      </div>
      `;
    }
    text+=`
    <div>
        <br>
        <label for="num-cluster-input" class="form-label"># de Clústeres: </label>
        <input type="number" class="form-control" id="num-cluster-input" step="1" placeholder="Del 0 al 10" min="0" max="10">
        <span>
        <button onclick=configuracion_boton() id="btn_conf" type="button" class="btn btn-primary">Hecho</button>
        </span>
    </div>`;
    text+= `</form>
    </div>`;
    caja.innerHTML= text;
    divClustering.appendChild(caja);   
}

function configuracion_boton(){
    divJerarquico.innerHTML="";
    let num_cluster= document.querySelector("#num-cluster-input");
    let check_input= []
    let caracteristicas_selec= []
    for(i=0; i<columnas_file.length; i++){
        check_input.push(document.querySelector("#inlineCheckbox"+i)); 
    }
    for(i=0; i<check_input.length; i++){
        if(check_input[i].checked){
            caracteristicas_selec.push(check_input[i].value)
        }
    }
    columnas_selec=caracteristicas_selec;
    if(caracteristicas_selec.length<2){
        alert("Seleccione más características para realizar el análisis");
    }
    else if(num_cluster.value.length==0){
        alert("Ingrese el número de clústeres a generar");
    }
    else{
        eel.clustering_jerarquico(parseFloat(num_cluster.value), caracteristicas_selec)(function(centroide){
            let caja= document.createElement("div")
            let mensaje= `
            <br>
            <hr align="right" size="10" width="100%">
            <br>
            <h3 style="color:blue;"> Jerarquico </h3>
            `;
            caja.innerHTML= mensaje;
            divJerarquico.appendChild(caja);
            imprimeTablaC(centroide, "jerarquico");
        });
        eel.clustering_particional(caracteristicas_selec)(function(centroideP){
            let caja= document.createElement("div")
            let mensaje= `
            <br>
            <hr align="right" size="10" width="100%">
            <br>
            <h3 style="color:blue;"> Particional </h3>
            `;
            caja.innerHTML= mensaje;
            divJerarquico.appendChild(caja);
            imprime_elbow(centroideP.length);
            imprimeTablaC(centroideP, "particional");
        });
    }
}

function imprime_elbow(valor){
    let text= document.createElement("div");
        mensaje=
            `
            <h3 style="color:blue;"> Elbow= `+valor+`  </h4>
            <table class="table">
            <thead>
            <tr>
            <th scope= "col">Obtención de la curva de Elbow</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td> 
                    <img src="./temp/elbow-particional.png" class="rounded float-center" width="100%" alt="...">
                </td>
            </tr>
            </tbody>   
            </table>
            `;

        text.innerHTML= mensaje;
        divJerarquico.appendChild(text);
}

    function imprimeTablaC(data, tipo){
    let text= document.createElement("div");
        mensaje=
            `

            <table class="table">
            <thead>
            <tr>
            <th scope= "col">cluster</th>
            `;
        for(i=0; i<columnas_selec.length; i++){
            mensaje+=
            `
                <th scope="col">`+columnas_selec[i]+`</th> 
            `;
        }
        mensaje+= `
            </tr>
            </thead>
            <tbody>
            `;
        for(i=0; i< data.length; i=i+1){
            mensaje+= `<tr>`;
            mensaje+= `<td>`+i+`</td>`;
            for(j=0; j<data[i].length; j++){
                mensaje+= `<td>`+parseFloat(data[i][j]).toFixed(3)+`</td>`;
            }
            mensaje+=`</tr>`; 
        }
        mensaje+=`</tbody>
        </table>
        <br>
        <br>`;
        mensaje+=`
            <h4 style="color:blue;"> Gráficas </h4>
            <table class="table">
            <thead>
            <tr>
            <th scope= "col">Datos organizados por los cluster</th>
            <th scope= "col">Cantidad de datos por cluster</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td> 
                    <img src="./temp/dispersion-`+tipo+`.png" class="rounded float-start" width="100%" alt="...">
                </td>
                <td> 
                    <img src="./temp/barras-`+tipo+`.png" class="rounded float-end" width="100%" alt="...">
                </td>
            </tr>
            </tbody>   
            </table>
        `
        text.innerHTML= mensaje;
        divJerarquico.appendChild(text);
        return data;
}