var divDistancias= document.querySelector(".distancias");

function distancias(){
    //<h3> Distancia `+distancia+`</h3>
    eel.dstEuclidiana()(function(data){
        imprimeTabla(data, "Euclidiana");
    });
    eel.dstChebyshev()(function(data){
        imprimeTabla(data, "Chebyshev");
    });
    eel.dstManhattan()(function(data){
        imprimeTabla(data, "Manhattan");
    });
    eel.dstMinkowski()(function(data){
        imprimeTabla(data, "Minkowski");
    });
}

function imprimeTabla(data, tipo_distancia){
    let text= document.createElement("div");
        mensaje=
            `<h3 style="color:blue;"> Distancia `+tipo_distancia+`</h3>
            <table class="table">
            <thead>
            <tr>`;
        for(i=0; i<data[0].length; i++){
            mensaje+=
            `
                <th scope="col">`+data[0][i]+`</th> 
            `;
        }
        mensaje+= `
            </tr>
            </thead>
            <tbody>
            `;
        for(i=1; i< data.length; i=i+1){
            mensaje+= `<tr>`
            for(j=0; j<data[i].length; j++){
                mensaje+= `<td>`+data[i][j]+`</td>`;
            }
            mensaje+=`</tr>`; 
        }
        mensaje+=`</tbody>
        </table>
        <br>
        <hr align="right" size="10" width="100%">
        <br>`
        text.innerHTML= mensaje;
        divDistancias.appendChild(text);
        return data;
}