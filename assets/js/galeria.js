const contcards = document.querySelector('.cartas');


const peticion = () => {
    fetch('/assets/cortes.json')
        .then((respuesta) => respuesta.json())
        .then((datosjson) => {
            datosjson.forEach((AUX) => { 
                let tarjeta = document.createElement('div');
                tarjeta.className = 'tarjeta-individual';

                let parr = document.createElement('p');
                let portada = document.createElement('img');
                
                portada.className = 'imagenp';
                parr.className = 'parra';

                portada.src = AUX.imagen; 
                parr.textContent = AUX.tipo;

                tarjeta.appendChild(portada);
                tarjeta.appendChild(parr);

                contcards.appendChild(tarjeta);
            });
        })
        .catch((error) => {
            swal("Error", "No se pudieron cargar los cortes", "error"); 
        });
}; 

peticion();