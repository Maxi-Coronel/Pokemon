function guardarPoke () {
  let poke = $(`#buscador`).val();
  //========== GUARDAR EN SESIONSTORAGE ============
  sessionStorage.setItem('pokeBuscado', poke);
}

function MaysPrimera(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const miEquipo = [];

function InfoPoke(id, name, img, type, stat, ability) {
  this.id = id;
  this.name = name;
  this.img = img;  
  this.type = type;
  this.stat = stat;
  this.ability = ability;
}
function Base(HP, Attack, Defense, SpAttack, SpDefense, Speed) {
  this.HP = HP;
  this.Attack = Attack;
  this.Defense = Defense;  
  this.SpAttack = SpAttack;
  this.SpDefense = SpDefense;
  this.Speed = Speed;
}

function antSig(id) {
  $.get(`https://pokeapi.co/api/v2/pokemon/${id-1}`,
    function (respuesta, estado) {
      if (estado === "success") {
        $(".aAnt").attr('marcador', `${respuesta.id}`)
        $("#fAnt").css(`background-image`, `url("./Multimedia/Img/fondo-${respuesta.types[0].type.name}.png")`);
        $("#ant").attr('src', `${respuesta.sprites.other[`official-artwork`][`front_default`]}`);
      }
    }
  );
  $.get(`https://pokeapi.co/api/v2/pokemon/${id+1}`,
    function (respuesta, estado) {
      if (estado === "success") {
        $(".aSig").attr('marcador', `${respuesta.id}`)
        $("#fSig").css(`background-image`, `url("./Multimedia/Img/fondo-${respuesta.types[0].type.name}.png")`);
        $("#sig").attr('src', `${respuesta.sprites.other[`official-artwork`][`front_default`]}`);
      }
    }
  );
}

function buscaAtnSig(evento) {
  let poke = evento.target.getAttribute('marcador');
  //========== GUARDAR EN SESIONSTORAGE ============
  sessionStorage.setItem('pokeBuscado', poke);
}

//========== VISTA ============
function verPokemon(){
  //========== TRAER DE SESIONSTORAGE ============
  let pokeBuscado = sessionStorage.getItem('pokeBuscado');
  if (pokeBuscado != null) {
    //=================== crear clase para el pokeBuscado y guardarlo en un array, en localStorage ====================
    $.get(`https://pokeapi.co/api/v2/pokemon/${pokeBuscado}`,
      function (respuesta, estado) {
        if (estado === "success") {
          let id = respuesta.id;
          let name = MaysPrimera(respuesta.name);
          let img = respuesta.sprites.other[`official-artwork`][`front_default`];
          let type = respuesta.types;
          const base = new Base(
            respuesta.stats[0].base_stat,
            respuesta.stats[1].base_stat,
            respuesta.stats[2].base_stat,
            respuesta.stats[3].base_stat,
            respuesta.stats[4].base_stat,
            respuesta.stats[5].base_stat);
          let ability = respuesta.abilities;
          let move = respuesta.moves;

          const pokemon = new InfoPoke(id, name, img, type, base, ability);
          console.log(pokemon);

          $(".button").attr('marcador', `${pokemon.id}`);

          $("#img").attr('src', `${pokemon.img}`);
          $("#caracteristicas").append(
            `<ul>
              <li>ID: ${pokemon.id}</li>
              <li>Nombre: ${pokemon.name}</li>
              <li>HP: ${pokemon.stat.HP}</li>
              <li>Attack: ${pokemon.stat.Attack}</li>
              <li>Defense: ${pokemon.stat.Defense}</li>
              <li>Sp. Attack: ${pokemon.stat.SpAttack}</li>
              <li>Sp. Defense: ${pokemon.stat.SpDefense}</li>
              <li>Speed: ${pokemon.stat.Speed}</li>
            </ul>`);
          $("#caracteristicas").prop('class','listNotStyle');
          $("#fondo").css(`background-image`, `url("./Multimedia/Img/fondo-${pokemon.type[0].type.name}.png")`);
          
          localStorage.setItem(`pokemon`, JSON.stringify(pokemon));
          antSig(pokemon.id);
        }
      }
    )
  }else {
    //========== SI NO HAY SESIONSTORAGE ============
    $.get(`https://pokeapi.co/api/v2/pokemon/150`,
      function (respuesta, estado) {
        if (estado === "success") {
        $(".button").attr('marcador', `${respuesta.id}`);
        $("#ID").html(`<p>ID: #${respuesta.id}</p>`);
        $("#nombre").html(`<p>${MaysPrimera(respuesta.name)}</p>`);
        $("#img").attr('src', `${respuesta.sprites.other[`official-artwork`][`front_default`]}`);
        $("#caracteristicas").append(
          `<ul>
            <li>HP: ${respuesta.stats[0].base_stat}</li>
            <li>Attack: ${respuesta.stats[1].base_stat}</li>
            <li>Defense: ${respuesta.stats[2].base_stat}</li>
            <li>Sp. Attack: ${respuesta.stats[3].base_stat}</li>
            <li>Sp. Defense: ${respuesta.stats[4].base_stat}</li>
            <li>Speed: ${respuesta.stats[5].base_stat}</li>
          </ul>`);
        $("#caracteristicas").prop('class','listNotStyle');
        $("#fondo").css(`background-image`, `url("./Multimedia/Img/fondo-${respuesta.types[0].type.name}.png")`);
        
        const base = new Base(
          respuesta.stats[0].base_stat,
          respuesta.stats[1].base_stat,
          respuesta.stats[2].base_stat,
          respuesta.stats[3].base_stat,
          respuesta.stats[4].base_stat,
          respuesta.stats[5].base_stat);
        
        const pokemon = new InfoPoke(
          respuesta.id,
          respuesta.name,
          respuesta.sprites.other[`official-artwork`][`front_default`],
          respuesta.types,
          base,
          respuesta.abilities);

        localStorage.setItem(`pokemon`, JSON.stringify(pokemon));
        
        antSig(respuesta.id);
        }
      }
    )
  }
}

function anyadirPoke(evento) {
  //llamamos al storage
  let compVacio = JSON.parse(localStorage.getItem(`miEquipo`));
  //condicional de storage
  if (localStorage.getItem(`miEquipo`) != null) {
    const nuevo = JSON.parse(localStorage.getItem(`pokemon`));
    compVacio.push(nuevo);
    localStorage.setItem(`miEquipo`, JSON.stringify(compVacio));
  }else {
    const nuevo = JSON.parse(localStorage.getItem(`pokemon`));
    miEquipo.push(nuevo);
    localStorage.setItem(`miEquipo`, JSON.stringify(miEquipo));
  }  
  /* location.reload(); */
}

function imprimirPoke() {
  //========== TRAER DE LOCALSTORAGE ============
  let imprimir = JSON.parse(localStorage.getItem(`miEquipo`));
  if (imprimir != null) {
    //========== BOTON PARA MOSTRAR IMG ============
    $(`#btn`).prepend(`<div><button class="btn btn-primary mostrar">+</button></div>`);
    
    imprimir.forEach(e => {
      if (e.id < 10) {
        e.id = `00${e.id}`
      } else if (e.id < 100) {
        e.id = `0${e.id}`
      }
      //========== TARJETA DE COMPARADOR ============
        type = new Object(); 
      if (e.type.length == 1) {
        type.a = e.type[0].type.name
        type.b = "";
      }else{
        type.a = e.type[0].type.name;
        type.b = e.type[1].type.name;
      }          
      
        $(`#comparador`).append(`<input type="button" class="borrar btn btn-danger esqDerecha" value="x"
                                  marcador="${e.id}">
                                  <div class="card">
                                  <ul class="flex between">
                                    <li><strong>${e.name}</strong></li>
                                    <li><strong><span>HP</span>${e.stat.HP}</strong></li>
                                  </ul>
                                  <ul>
                                    <li><img class="imgComp" src="${e.img}" width="200px"></li>
                                    <li>Tipo: ${MaysPrimera(type.a)} ${MaysPrimera(type.b)}</li>
                                    <li>Ataque: ${e.stat.Attack}</li>
                                    <li>Defensa: ${e.stat.Defense}</li>
                                    <li>Super ataque: ${e.stat.SpAttack}</li>
                                    <li>Super defensa: ${e.stat.SpDefense}</li>
                                    <li>Velocidad: ${e.stat.Speed}</li>
                                  </ul>
                                  </div>`);
    });
    $(".mostrar").click(()=>{
      $(".imgComp").toggle();
    })
  }
}

function borrarPoke(evento) {
  //========== TRAER DE LOCALSTORAGE ============
  let borrar = JSON.parse(localStorage.getItem(`miEquipo`));
  //========== FILTRAR TODOS MENOS EL BORRADO ============
  let actualizado = borrar.filter(e => e.id != evento.target.getAttribute('marcador'));
  //========== VOLVER A GUARDAR EN LOCALSTORAGE ============
  localStorage.setItem(`miEquipo`, JSON.stringify(actualizado));
  location.reload();
}

          /* console.log(`el pokemon buscado es ${pokeBuscado}`);
          for (let i = 0; i < respuesta.types.length; i++) {
            let tipo = respuesta.types[i].type.name
            console.log(`tipo${i+1} ${tipo}`);
          }
          for (let i = 0; i < respuesta.stats.length; i++) {
            let bases = respuesta.stats[i]
            console.log(`${bases.stat.name} ${bases.base_stat}`);
          }
          for (let i = 0; i < respuesta.abilities.length; i++) {
            let bases = respuesta.abilities[i]
            console.log(`habilidad ${i+1} ${bases.ability.name}`);
          }
          console.log();
          for (let i = 0; i < respuesta[`moves`].length; i++) {
            let bases = respuesta[`moves`][i]
            let move = respuesta[`moves`][i].move.url                
            $.get(`${move}`,
              function (respuesta, estado) {
                if (estado === "success") {
                  console.log(`movimiento ${bases.move.name}`);
                  console.log(respuesta.effect_entries[0].effect);
                  console.log(`Power ${respuesta.power}`);
                  console.log(`PP ${respuesta.pp}`); */
              
            
          
      /* }
    )
  }
} */
$("#click").click(guardarPoke);
verPokemon();
imprimirPoke();
$(`.button`).click(anyadirPoke);
$(`.borrar`).click(borrarPoke);
$(`.aAnt`).click(buscaAtnSig);
$(`.aSig`).click(buscaAtnSig);
