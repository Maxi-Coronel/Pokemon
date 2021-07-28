let comparativo =[];

function guardarPoke () {
  let poke = $(`#buscador`).val();
  sessionStorage.setItem('pokeBuscado', poke);  
}

function verPokemon(){
  let pokeBuscado = sessionStorage.getItem('pokeBuscado');

  if (pokeBuscado != null) {
    let buscado = pokedex.filter(e => e.id == pokeBuscado);

    $(".button").attr('marcador', `${buscado[0].id}`);

    $("#ID").html(`<p>ID: #${buscado[0].id}</p>`);
    $("#nombre").html(`<p>${buscado[0].name.english}</p>`);

    if (pokeBuscado.length == 1) {
      $("#img").attr('src', `./pokemon.json-master/images/00${buscado[0].id}.png`);
    } else if (pokeBuscado.length == 2) {
      $("#img").attr('src', `./pokemon.json-master/images/0${buscado[0].id}.png`);
    } else {
      $("#img").attr('src', `./pokemon.json-master/images/${buscado[0].id}.png`);
    }
    $("#caracteristicas").append(`<ul>
                                    <li>HP: ${buscado[0].base.HP}</li>
                                    <li>Attack: ${buscado[0].base.Attack}</li>
                                    <li>Defense: ${buscado[0].base.Defense}</li>
                                    <li>Sp. Attack: ${buscado[0].base.SpAttack}</li>
                                    <li>Sp. Defense: ${buscado[0].base.SpDefense}</li>
                                    <li>Speed: ${buscado[0].base.Speed}</li>
                                  </ul>`);
    $("#caracteristicas").prop('class','listNotStyle');

    $("#fondo").addClass(`${buscado[0].type[0]}`);
    $(`.${buscado[0].type[0]}`).css(`background-image`, `url("./Multimedia/Img/fondo-${buscado[0].type[0]}.png")`);

  }else {

    $(".button").attr('marcador', `150`);
    $("#ID").html(`<p>ID: #150</p>`);
    $("#nombre").html(`<p>Mewtwo</p>`);
    $("#img").attr('src', `./pokemon.json-master/images/150.png`);
    $("#caracteristicas").append(`<ul>
                                    <li>HP: 106</li>
                                    <li>Attack: 110</li>
                                    <li>Defense: 90</li>
                                    <li>Sp. Attack: 154</li>
                                    <li>Sp. Defense: 90</li>
                                    <li>Speed: 130</li>
                                  </ul>`);
    $("#caracteristicas").prop('class','listNotStyle');
    $("#fondo").addClass(`Psychic`);
    $(`.Psychic`).css(`background-image`, `url("./Multimedia/Img/fondo-Psychic.png")`);
  }
}

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
  location.reload();
};

function imprimirPoke() {
  let imprimir = JSON.parse(localStorage.getItem(`comparativo`));
  console.log(imprimir);
  if (imprimir != null) {
    $(`#comparador`).prepend(
    `<div><button class="btn btn-primary mostrar">+</button></div>`)
    imprimir.forEach(e => {
        $(`#comparador`).append(`<div class="margin">
                                  <input type="button" class="borrar btn btn-danger esqDerecha" value="x"
                                  marcador="${e.id}">
                                  <ul>
                                    <li><img class="imgComp" src="./pokemon.json-master/images/00${e.id}.png" width="150px"></li>
                                    <li>ID = #${e.id}</li>
                                    <li>Nombre = ${e.name.english}</li>
                                    <li>Tipo = ${e.type}</li>
                                    <li>HP = ${e.base.HP}</li>
                                    <li>Ataque = ${e.base.Attack}</li>
                                    <li>Defensa = ${e.base.Defense}</li>
                                    <li>Super ataque = ${e.base.SpAttack}</li>
                                    <li>Super defensa = ${e.base.SpDefense}</li>
                                    <li>Velocidad = ${e.base.Speed}</li>
                                  </ul>
                                  </div>`);
    });
    $(".mostrar").click(()=>{
      $(".imgComp").toggle();
    })
  }
}

$(".absolute").click(()=>{
  $("#desaparece").toggle();
  $("#aparece").toggle();
})

function borrarPoke(evento) {
  let borrar = JSON.parse(localStorage.getItem(`comparativo`));
  let actualizado = borrar.filter(e => e.id != evento.target.getAttribute('marcador'));
  localStorage.setItem(`comparativo`, JSON.stringify(actualizado));
  location.reload();
}

verPokemon();
imprimirPoke();
$(`#click`).click(guardarPoke);
$(`.button`).click(anyadirPoke);
$(`.borrar`).click(borrarPoke);