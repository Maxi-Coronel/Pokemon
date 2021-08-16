//entidades/objetos-----------------------
//variables-------------------------------
//---arrays--------------------
//---selectores----------------
//funciones-------------------------------
//eventos---------------------------------
//logica----------------------------------

//========== CAMBIAR IMG DEL HEADER ============
$(".absolute").click(()=>{
  $("#desaparece").toggle();
  $("#aparece").toggle();
})

function guardarPoke () {
  let poke = $(`#buscador`).val();
  //========== GUARDAR EN SESIONSTORAGE ============
  sessionStorage.setItem('pokeBuscado', poke);
}

$(`#variantes`).change(function () { 
  let poke = $('#variantes').val();
  //========== GUARDAR EN SESIONSTORAGE ============
  sessionStorage.setItem('pokeBuscado', poke);
  location.reload()
});

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
  let urlAnt;
  let urlSig;
  if (id == 1) {
    urlAnt = `https://pokeapi.co/api/v2/pokemon/898`;
  }else {
    urlAnt = `https://pokeapi.co/api/v2/pokemon/${id-1}`;
  }
  $.get(urlAnt,
    function (respuesta, estado) {
      if (estado === "success") {
        console.log(respuesta);
        $(".aAnt").attr('marcador', `${respuesta.id}`)
        $("#fAnt").css(`background-image`, `url("./Multimedia/Img/Fondo/fondo-${respuesta.types[0].type.name}.png")`);
        if (respuesta.sprites.other[`official-artwork`].front_default != null) {
          $("#ant").attr('src', `${respuesta.sprites.other[`official-artwork`].front_default}`);
        } else {
          $("#ant").attr('src', `${respuesta.sprites.front_default}`);
          $("#ant").attr('width', `500px`);
        };
      }
    }
  );
  if (id == 898) {
    urlSig = `https://pokeapi.co/api/v2/pokemon/1`
  } else {
    urlSig = `https://pokeapi.co/api/v2/pokemon/${id+1}`
  }
  $.get(urlSig,
    function (respuesta, estado) {
      if (estado === "success") {
        $(".aSig").attr('marcador', `${respuesta.id}`)
        $("#fSig").css(`background-image`, `url("./Multimedia/Img/Fondo/fondo-${respuesta.types[0].type.name}.png")`);
        if (respuesta.sprites.other[`official-artwork`].front_default != null) {
          $("#sig").attr('src', `${respuesta.sprites.other[`official-artwork`].front_default}`);
        } else {
          $("#sig").attr('src', `${respuesta.sprites.front_default}`);
          $("#sig").attr('width', `500px`);
        };
      }
    }
  );
}

function buscaAnt() {
  let poke = $(`.aAnt`).attr('marcador');
  //========== GUARDAR EN SESIONSTORAGE ============
  sessionStorage.setItem('pokeBuscado', poke);
  location.reload();
}

function buscaSig() {
  let poke = $(`.aSig`).attr('marcador');
  //========== GUARDAR EN SESIONSTORAGE ============
  sessionStorage.setItem('pokeBuscado', poke);
  location.reload();
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
          let img;
          if (respuesta.sprites.other[`official-artwork`].front_default != null) {
            img = respuesta.sprites.other[`official-artwork`][`front_default`];
          } else {
            img = respuesta.sprites.front_default;
            $("#img").attr('width', `500px`);
          };
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

          $(".button").attr('marcador', `${pokemon.id}`);

          $("#img").attr('src', `${pokemon.img}`);

          let url = respuesta.species.url;
          $.get(url,
            function (respuesta, estado) {
              if (estado === "success") {
                for (let i = 0; i < respuesta.varieties.length; i++) {
                  $("#variantes").append(
                    `<option value="${respuesta.varieties[i].pokemon.name}">${respuesta.varieties[i].pokemon.name}</option>`
                  );
                }
              }
            }
          )

          $("#caracteristicas").append(
            `<ul>
              <li>${pokemon.name}</li>
              <li>N°: ${pokemon.id}</li>
            </ul>
            <div>
              <ul>
                <li>HP: ${pokemon.stat.HP}</li>
                <li>Attack: ${pokemon.stat.Attack}</li>
                <li>Defense: ${pokemon.stat.Defense}</li>
              </ul>
              <ul>
                <li>Sp. Attack: ${pokemon.stat.SpAttack}</li>
                <li>Sp. Defense: ${pokemon.stat.SpDefense}</li>
                <li>Speed: ${pokemon.stat.Speed}</li>
              </ul>
            </div>`);
          $("#caracteristicas").prop('class','border-radius color');
          $("#fondo").css(`background-image`, `url("./Multimedia/Img/Fondo/fondo-${pokemon.type[0].type.name}.png")`);
          
          localStorage.setItem(`pokemon`, JSON.stringify(pokemon));
          antSig(pokemon.id);


          $.get(respuesta.types[0].type.url,
            function (respuesta, estado) {
              if (estado === "success") {
                console.log(`debilidad doble de ${type[0].type.name}`);
                let daño = respuesta.damage_relations.double_damage_from
                for (let i = 0; i < daño.length; i++) {
                  if (type[1] != null) {
                    if (daño[i].name != type[1].type.name) {
                      console.log(daño[i].name);
                    }
                  }else{
                    console.log(daño[i].name);
                  }
                }
              }
            }
          )
          if (respuesta.types[1] != null) {
            $.get(respuesta.types[1].type.url,
              function (respuesta, estado) {
                if (estado === "success") {
                  console.log(`debilidad doble de ${type[1].type.name}`);
                  let daño = respuesta.damage_relations.double_damage_from
                  for (let i = 0; i < daño.length; i++) {
                    if (daño[i].name != type[0].type.name) {
                      console.log(daño[i].name);
                    }
                  }
                }
              }
            )
          }
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
        let url = respuesta.species.url;
        $.get(url,
          function (respuesta, estado) {
            if (estado === "success") {
              for (let i = 0; i < respuesta.varieties.length; i++) {
                $("#variantes").append(
                  `<option value="${respuesta.varieties[i].pokemon.name}">${respuesta.varieties[i].pokemon.name}</option>`
                );
              }
            }
          }
        )
        $("#caracteristicas").append(
          `<ul>
              <li>${MaysPrimera(respuesta.name)}</li>
              <li>N°: ${respuesta.id}</li>
            </ul>
            <div>
              <ul>
                <li>HP: ${respuesta.stats[0].base_stat}</li>
                <li>Attack: ${respuesta.stats[1].base_stat}</li>
                <li>Defense: ${respuesta.stats[2].base_stat}</li>
              </ul>
              <ul>
                <li>Sp. Attack: ${respuesta.stats[3].base_stat}</li>
                <li>Sp. Defense: ${respuesta.stats[4].base_stat}</li>
                <li>Speed: ${respuesta.stats[5].base_stat}</li>
              </ul>
            </div>`);
        $("#caracteristicas").prop('class','listNotStyle');
        $("#fondo").css(`background-image`, `url("./Multimedia/Img/Fondo/fondo-${respuesta.types[0].type.name}.png")`);
        
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
  location.reload();
}

function imprimirPoke() {
  //========== TRAER DE LOCALSTORAGE ============
  let imprimir = JSON.parse(localStorage.getItem(`miEquipo`));
  if (imprimir != null) {
    //========== BOTON PARA MOSTRAR IMG ============
    
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
        type.b = "#";
      }else{
        type.a = e.type[0].type.name;
        type.b = e.type[1].type.name;
      }
      
      
        $(`#comparador`).append(`
          <div class="row">
            <input type="button" class="borrar btn btn-danger esqDerecha" value="x" marcador="${e.id}">
            <div class="card flex">
              <ul class="flex between">
                <li><strong>${e.name}</strong></li>
                <li><strong><span>HP</span>${e.stat.HP}</strong></li>
              </ul>
              <ul>
                <li><img class="imgComp" src="${e.img}" style='background-image: url("./Multimedia/Img/Fondo/fondo-${type.a}.png")' width="200px"></li>
                <li>Tipo: <img src="./Multimedia/Img/Tipo/${type.a}.png" alt=""> <img src="./Multimedia/Img/Tipo/${type.b}.png" alt=""></li>
                <li>Ataque: ${e.stat.Attack}</li>
                <li>Defensa: ${e.stat.Defense}</li>
                <li>Super ataque: ${e.stat.SpAttack}</li>
                <li>Super defensa: ${e.stat.SpDefense}</li>
                <li>Velocidad: ${e.stat.Speed}</li>
              </ul>
            </div>
          </div>
        `);
    });
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

$("#click").click(guardarPoke);
verPokemon();
imprimirPoke();
$(`.button`).click(anyadirPoke);
$(`.borrar`).click(borrarPoke);
$(`.aAnt`).click(buscaAnt);
$(`.aSig`).click(buscaSig);

