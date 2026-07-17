const contenedorHoy = document.querySelector("#contenedor-hoy");
  const contenedorGuardados = document.querySelector('#contenedor-guardados');

let horariosHoy = ['10:00',"11:00",'12:00','16:00', "17:00"];
let turnosGuardados=[];

const horariosGuardadosTexto = localStorage.getItem('horariosDisponibles');
const turnosGuardadosTexto = localStorage.getItem("turnosReservados");

if(horariosGuardadosTexto){
horariosHoy = JSON.parse(horariosGuardadosTexto);
}

if(turnosGuardadosTexto){
  turnosGuardados = JSON.parse(turnosGuardadosTexto);
}

function guardarEnStorage(){
localStorage.setItem("horariosDisponibles", JSON.stringify(horariosHoy));
  localStorage.setItem('turnosReservados', JSON.stringify(turnosGuardados));
}

function renderizarTurnos(){
contenedorHoy.innerHTML = "";
    horariosHoy.forEach((hora) => {
    const tarjeta = document.createElement("div");
      tarjeta.classList.add('tarje'); 
       
      tarjeta.innerHTML = `
            <p>${hora}</p>
            <button class="boton-estilo">Reservar</button>
        `;
        
    const boton = tarjeta.querySelector('button');

      boton.addEventListener('click', () => {
      turnosGuardados.push(hora);
            
      let indice = horariosHoy.indexOf(hora);
        if(indice >= 0){
        horariosHoy.splice(indice, 1); 
      }

      guardarEnStorage();

        swal("¡Turno seleccionado!", `Elegiste el horario de las ${hora}`, "success");

      renderizarTurnos();
      renderizarGuardados();
    });
        
    contenedorHoy.appendChild(tarjeta);
  });
}

function renderizarGuardados() 
{
    contenedorGuardados.innerHTML = ''; 

  turnosGuardados.forEach((hora) => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add("tarje2"); 
       
        tarjeta.innerHTML = `
            <p> Turno: ${hora}</p>
            <button class="boton-estilo boton-cancelar">Cancelar</button> 
        `;
        
    const botonCancelar = tarjeta.querySelector('button');

    botonCancelar.addEventListener("click", () => {
        const indice = turnosGuardados.indexOf(hora);
          if(indice !== -1){
            turnosGuardados.splice(indice, 1); 
          }

          horariosHoy.push(hora);
        horariosHoy.sort();

        guardarEnStorage();

        swal("Turno Cancelado", `Liberaste el horario de las ${hora}`, "info");

          renderizarTurnos();
          renderizarGuardados();
      });
        
      contenedorGuardados.appendChild(tarjeta);
    });
}

renderizarTurnos();
  renderizarGuardados();