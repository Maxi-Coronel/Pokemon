/*let poke = 0;

const buscado = 0;

function VerPokemon(){
  poke = $(`#buscador`).val();
  let buscado = pokedex.filter(e => e.id == poke);

    $("#button").prop('marcador', `${buscado[0].id}`);

    $("#id").append(`<p>ID: #${buscado[0].id}</p>`);
    $("#nombre").append(`<p>${buscado[0].name.english}</p>`);

    if (poke.length == 1) {
      $("#img").prop('src', `./pokemon.json-master/images/00${buscado[0].id}.png`);
    } else if (poke.length == 2) {
      $("#img").prop('src', `./pokemon.json-master/images/0${buscado[0].id}.png`);
    } else {
      $("#img").prop('src', `./pokemon.json-master/images/${buscado[0].id}.png`);
    }

    let insertar2a = buscado.map(function(bar){
      return '<ul>'+'<li>'+'HP: '+bar.base.HP+'</li>'+'<li>'+'Attack: '+bar.base.Attack+'</li>'+'<li>'+'Defense: '+bar.base.Defense+'</li>'+'<li>'+'Sp. Attack: '+bar.base.SpAttack+'</li>'+'<li>'+'Sp. Defense: '+bar.base.SpDefense+'</li>'+'<li>'+'Speed: '+bar.base.Speed+'</li>'+'</ul>'
    });
      document.getElementById("caracteristicas").innerHTML = insertar2a;
      $("#caracteristicas").addClass('listNotStyle');

    document.getElementById('fondo').style.backgroundImage = `url(./Multimedia/Img/fondo-${buscado[0].type[0]}.png)`;
}


function borrarPoke(evento) {
  let borrar = JSON.parse(localStorage.getItem(`comparativo`));
  console.log(borrar);
  let actualizado = borrar.filter(e => e.id != evento.target.getAttribute('marcador'));
  localStorage.setItem(`comparativo`, JSON.stringify(actualizado));
  location.reload();
}

function anyadirPoke(evento) {
  //llamamos al storage
  let comparVacio = JSON.parse(localStorage.getItem(`comparativo`));
  //condicional de storage
  if (localStorage.getItem(`comparativo`) != null) {
    const nuevo = pokedex.filter(e => e.id == evento.target.getAttribute('marcador'));
    comparVacio.push(nuevo[0]);
    localStorage.setItem(`comparativo`, JSON.stringify(comparVacio));
    console.log(comparVacio);
  }else {
    localStorage.clear();
    const nuevo = pokedex.filter(e => e.id == evento.target.getAttribute('marcador'));
    comparativo.push(nuevo[0]);
    localStorage.setItem(`comparativo`, JSON.stringify(comparativo));
    console.log(comparativo);
  }
};

function imprimirPoke() {
  //llamamos al storage
  let imprimir = JSON.parse(localStorage.getItem(`comparativo`));
  //si es null no hacer nada
  if (imprimir != null) {
    imprimir.forEach(e => {
        $(`#comparador`).append(`<div class="margin">
                                  <input type="button" class="borrar btn btn-danger esqDerecha" value="x" marcador="${e.id}">
                                  <ul>
                                    <li>ID = ${e.id}</li>
                                    <li>Nombre = ${e.name.english}</li>
                                    <li>Tipo = ${e.type}</li>
                                    <li>HP = ${e.base.HP}</li>
                                    <li>Ataque = ${e.base.Attack}</li>
                                    <li>Defensa = ${e.base.Defense}</li>
                                    <li>Super ataque = ${e.base.SpAttack}</li>
                                    <li>Super defensa = ${e.base.SpDefense}</li>
                                    <li>Velocidad = ${e.base.Speed}</li>
                                  </ul>
                                </div>`)
    });
  }
}

$(`#click`).click(VerPokemon);
$(`#button`).click(anyadirPoke);
$(`#button`).click(imprimirPoke);
$(`.borrar`).click(borrarPoke); */

let comparativo =[];

let poke = 0;


const boton = document.getElementById("button");
boton.addEventListener('click', anyadirPoke);

const buscado = 0;

function VerPokemon(){
    poke = $(`#buscador`).val();
    let buscado = pokedex.filter(e => e.id == poke);

    $("#button").attr('marcador', `${buscado[0].id}`);

    let insertar1a = document.getElementById("ID");
      insertar1a.innerHTML = `<p>ID: #${buscado[0].id}</p>`;

    let insertar1b = document.getElementById("nombre");
      insertar1b.innerHTML = `<p>${buscado[0].name.english}</p>`;

      if (poke.length == 1) {
        $("#img").attr('src', `./pokemon.json-master/images/00${buscado[0].id}.png`);
      } else if (poke.length == 2) {
        $("#img").attr('src', `./pokemon.json-master/images/0${buscado[0].id}.png`);
      } else {
        $("#img").attr('src', `./pokemon.json-master/images/${buscado[0].id}.png`);
      }

    let insertar2a = buscado.map(function(bar){
      return '<ul>'+'<li>'+'HP: '+bar.base.HP+'</li>'+'<li>'+'Attack: '+bar.base.Attack+'</li>'+'<li>'+'Defense: '+bar.base.Defense+'</li>'+'<li>'+'Sp. Attack: '+bar.base.SpAttack+'</li>'+'<li>'+'Sp. Defense: '+bar.base.SpDefense+'</li>'+'<li>'+'Speed: '+bar.base.Speed+'</li>'+'</ul>'
    });
      document.getElementById("caracteristicas").innerHTML = insertar2a;
      $("#caracteristicas").prop('class','listNotStyle');

    document.getElementById('fondo').style.backgroundImage = `url(./Multimedia/Img/fondo-${buscado[0].type[0]}.png)`;
};

function anyadirPoke(evento) {
  //llamamos al storage
  let compVacio = JSON.parse(localStorage.getItem(`comparativo`));
  //condicional de storage
  if (localStorage.getItem(`comparativo`) != null) {
    const nuevo = pokedex.filter(e => e.id == evento.target.getAttribute('marcador'));
    compVacio.push(nuevo[0]);
    localStorage.setItem(`comparativo`, JSON.stringify(compVacio));
  }else {
    localStorage.clear();
    const nuevo = pokedex.filter(e => e.id == evento.target.getAttribute('marcador'));
    comparativo.push(nuevo[0]);
    localStorage.setItem(`comparativo`, JSON.stringify(comparativo));
  }
};

function imprimirPoke() {
  let imprimir = JSON.parse(localStorage.getItem(`comparativo`));
  console.log(imprimir);
  if (imprimir != null) {
    imprimir.forEach(e => {
        $(`#comparador`).append(`<div class="margin">
                                  <input type="button" class="borrar btn btn-danger esqDerecha" value="x" marcador="${e.id}">
                                  <ul>
                                    <li>ID = ${e.id}</li>
                                    <li>Nombre = ${e.name.english}</li>
                                    <li>Tipo = ${e.type}</li>
                                    <li>HP = ${e.base.HP}</li>
                                    <li>Ataque = ${e.base.Attack}</li>
                                    <li>Defensa = ${e.base.Defense}</li>
                                    <li>Super ataque = ${e.base.SpAttack}</li>
                                    <li>Super defensa = ${e.base.SpDefense}</li>
                                    <li>Velocidad = ${e.base.Speed}</li>
                                  </ul>
                                  </div>`)
    });
  }
}

function borrarPoke(evento) {
  let borrar = JSON.parse(localStorage.getItem(`comparativo`));
  let actualizado = borrar.filter(e => e.id != evento.target.getAttribute('marcador'));
  localStorage.setItem(`comparativo`, JSON.stringify(actualizado));
  location.reload();
}
imprimirPoke();
$(`#click`).click(VerPokemon)
$(`#button`).click(imprimirPoke);
$(`.borrar`).click(borrarPoke);