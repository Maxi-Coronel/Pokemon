//======================== OBJETOS ========================
class InfoPoke {
    constructor(id, name, img, type, typeUrl, stat, ability, especie) {  // Constructor
        this.id = id;
        this.name = name;
        this.img = img;
        this.type = type;
        this.typeUrl = typeUrl;
        this.stat = stat;
        this.ability = ability;
        this.especie = especie;
    }
}

class Base {
    constructor(HP, Attack, Defense, SpAttack, SpDefense, Speed) {  // Constructor
        this.HP = HP;
        this.Attack = Attack;
        this.Defense = Defense;
        this.SpAttack = SpAttack;
        this.SpDefense = SpDefense;
        this.Speed = Speed;
    }
}

//======================== VARIABLES ========================
//-------- arrays -----------
const miEquipo = [];

//======================== FUNCIONES ========================
$(`#variantes`).change(function() {
    let variante = $('#variantes').val();
    if (variante != `variante`) {
        let actual = sessionStorage.getItem(`pokeBuscado`)
        if (actual != variante) {
            //========== GUARDAR EN SESIONSTORAGE ============
            sessionStorage.setItem('pokeBuscado', variante);
            location.reload();
        }
    }
})

function traeId(e) {
    let pokeBuscado = $(`#${e}`).attr('marcador');
    //========== GUARDAR EN SESIONSTORAGE ============
    sessionStorage.setItem('pokeBuscado', pokeBuscado);
    location.reload()
}

function crearPokemon() {
    //========== TRAER DE SESIONSTORAGE ============
    let pokeBuscado = sessionStorage.getItem('pokeBuscado');
    if (pokeBuscado == "") {
        pokeBuscado = Math.round(Math.random()*(898));
    }
    if (pokeBuscado != null) {
        //=================== crear clase para el pokeBuscado y guardarlo en un array, en localStorage ====================
        let urlPoke = `https://pokeapi.co/api/v2/pokemon/${pokeBuscado}`
        $.get(urlPoke, function(respuesta, estado) {
            if (estado === "success") {

                let id = respuesta.id;
                let name = maysPrimera(respuesta.name);
                let img;
                if (respuesta.sprites.other[`official-artwork`].front_default != null) {
                    img = respuesta.sprites.other[`official-artwork`][`front_default`];
                } else {
                    img = respuesta.sprites.front_default;
                    $("#img").attr('width', `500px`);
                };
                let type = respuesta.types;
                let typeUrl = []
                if (respuesta.types[1] != null) {
                    let url1 = respuesta.types[0].type.url
                    let url2 = respuesta.types[1].type.url
                    typeUrl = [url1, url2]
                } else {
                    let url1 = respuesta.types[0].type.url
                    typeUrl = [url1]
                }
                const base = new Base(
                    respuesta.stats[0].base_stat,
                    respuesta.stats[1].base_stat,
                    respuesta.stats[2].base_stat,
                    respuesta.stats[3].base_stat,
                    respuesta.stats[4].base_stat,
                    respuesta.stats[5].base_stat);
                let ability = respuesta.abilities;
                let especie = respuesta.species.url;
                let move = respuesta.moves;

                const pokemon = new InfoPoke(id, name, img, type, typeUrl, base, ability, especie);
                sessionStorage.setItem(`pokemon`, JSON.stringify(pokemon));
                verPokemon(pokemon)
            }
        })
    } else if (pokeBuscado == null) {
        let urlPoke = `https://pokeapi.co/api/v2/pokemon/150`
        $.get(urlPoke, function(respuesta, estado) {
            if (estado === "success") {
                let id = respuesta.id;
                let name = maysPrimera(respuesta.name);
                let img;
                if (respuesta.sprites.other[`official-artwork`].front_default != null) {
                    img = respuesta.sprites.other[`official-artwork`][`front_default`];
                } else {
                    img = respuesta.sprites.front_default;
                    $("#img").attr('width', `500px`);
                };
                let type = respuesta.types;
                let typeUrl = []
                if (respuesta.types[1] != null) {
                    let url1 = respuesta.types[0].type.url
                    let url2 = respuesta.types[1].type.url
                    typeUrl = [url1, url2]
                } else {
                    let url1 = respuesta.types[0].type.url
                    typeUrl = [url1]
                }
                const base = new Base(
                    respuesta.stats[0].base_stat,
                    respuesta.stats[1].base_stat,
                    respuesta.stats[2].base_stat,
                    respuesta.stats[3].base_stat,
                    respuesta.stats[4].base_stat,
                    respuesta.stats[5].base_stat);
                let ability = respuesta.abilities;
                let especie = respuesta.species.url;
                let move = respuesta.moves;

                const pokemon = new InfoPoke(id, name, img, type, typeUrl, base, ability, especie);
                sessionStorage.setItem(`pokemon`, JSON.stringify(pokemon));
                verPokemon(pokemon);
            }
        })
    }
}

function verPokemon(evento) {
    $(".button").attr('marcador', `${evento.id}`);
    $("#img").attr(`src`, `${evento.img}`);

    //---------------- JS PURO ----------------
    let dato = document.createElement(`ul`);
    let nombre = document.createElement(`li`);
    let contNombre = document.createTextNode(`${evento.name}`);
    let numero = document.createElement(`li`);
    let contNumero = document.createTextNode(`N°: ${evento.id}`);

    dato.appendChild(nombre);
    nombre.appendChild(contNombre);
    dato.appendChild(numero);
    numero.appendChild(contNumero);

    let contenedor = document.createElement(`div`);
    let stats = document.createElement(`button`);
    stats.classList.add(`stats`);
    let contStats = document.createTextNode(`Stats`);
    let divStats = document.createElement(`div`);
    divStats.setAttribute(`id`, `prueba`);
    divStats.setAttribute(`style`, `display: none`);
    let priDatos = document.createElement(`ul`);
    let hp = document.createElement(`li`);
    let contHp = document.createTextNode(`HP: ${evento.stat.HP}`);
    let attack = document.createElement(`li`);
    let contAttack = document.createTextNode(`Attack: ${evento.stat.Attack}`);
    let defense = document.createElement(`li`)
    let contDefense = document.createTextNode(`Defense: ${evento.stat.Defense}`);
    let segDatos = document.createElement(`ul`);
    let speed = document.createElement(`li`);
    let contSpeed = document.createTextNode(`Speed: ${evento.stat.Speed}`);
    let spAttack = document.createElement(`li`);
    let contSpAttack = document.createTextNode(`SpDefense: ${evento.stat.SpDefense}`);
    let spDefense = document.createElement(`li`);
    let contSpDefense = document.createTextNode(`SpAttack: ${evento.stat.SpAttack}`);

    contenedor.appendChild(stats);
    stats.appendChild(contStats);
    contenedor.appendChild(divStats);
    divStats.appendChild(priDatos);
    priDatos.appendChild(hp);
    hp.appendChild(contHp);
    priDatos.appendChild(attack);
    attack.appendChild(contAttack);
    priDatos.appendChild(defense);
    defense.appendChild(contDefense);
    divStats.appendChild(segDatos);
    segDatos.appendChild(speed);
    speed.appendChild(contSpeed);
    segDatos.appendChild(spAttack);
    spAttack.appendChild(contSpAttack);
    segDatos.appendChild(spDefense);
    spDefense.appendChild(contSpDefense);

    $("#caracteristicas").append(dato, contenedor);
    $("#caracteristicas").addClass('border-radius');
    $("#caracteristicas").addClass('color');
    $("#fondo").css(`background-image`, `url("./Multimedia/Img/Fondo/fondo-${evento.type[0].type.name}.png")`);

    let url = evento.especie;
    $.get(url, function(respuesta, estado) {
        if (estado === "success") {

            //---------------------- busca de variantes ----------------------
            let variante = document.createElement(`option`);
            let contVariante = document.createTextNode(`variante`);

            variante.appendChild(contVariante);
            $("#variantes").append(variante);

            for (let i = 0; i < respuesta.varieties.length; i++) {
                let specie = document.createElement(`option`);
                let contSpecie = document.createTextNode(`${respuesta.varieties[i].pokemon.name}`);

                specie.appendChild(contSpecie);
                specie.setAttribute(`value`, `${respuesta.varieties[i].pokemon.name}`);

                $("#variantes").append(specie);
            }

            //---------------------- descripción ----------------------
            for (let i = 0; i < respuesta.flavor_text_entries.length; i++) {
                if (respuesta.flavor_text_entries[i].language.name == `es` && respuesta.flavor_text_entries[i].version.name == `y`) {
                    let descripcion = document.createElement(`button`);
                    descripcion.classList.add(`descripcion`);
                    let contDescr = document.createTextNode(`Descripción`);
                    let divDescr = document.createElement(`div`);
                    divDescr.setAttribute(`id`, `pruebaDescr`);
                    divDescr.setAttribute(`style`, `display: none`);
                    let parrafo = document.createElement(`p`);
                    let parrafoDescr = document.createTextNode(`${respuesta.flavor_text_entries[i].flavor_text}`);

                    contenedor.appendChild(descripcion);
                    descripcion.appendChild(contDescr);
                    contenedor.appendChild(divDescr);
                    divDescr.appendChild(parrafo);
                    parrafo.appendChild(parrafoDescr);
                }
            }

//======================================= EVOLUCIONES =======================================
            //---------------------- linea evolutiva 1 ----------------------
            $.get(respuesta.evolution_chain, function(respuesta, estado) {
                if (estado === "success") {

                    let evolve = document.createElement(`button`);
                    evolve.classList.add(`evolve`);
                    let contEvolve = document.createTextNode(`Evoluciones`);
                    let divEvolve = document.createElement(`div`);
                    divEvolve.setAttribute(`id`, `pruebaEvolve`);
                    divEvolve.setAttribute(`style`, `display: none`);
                    let listado = document.createElement(`ul`);
                    listado.classList.add(`d-flex`);
                    let itemLi = document.createElement(`li`);
                    let contDiv = document.createElement(`div`);
                    let enlace = document.createElement(`a`);
                    let imagen = document.createElement(`img`);

                    contenedor.appendChild(evolve);
                    evolve.appendChild(contEvolve);
                    contenedor.appendChild(divEvolve);
                    divEvolve.appendChild(listado);
                    listado.appendChild(itemLi);
                    itemLi.appendChild(contDiv);
                    contDiv.appendChild(enlace);
                    enlace.classList.add(`fSig`);
                    enlace.classList.add(`circulo--black`);
                    enlace.setAttribute(`href`, `#`);
                    enlace.classList.add(`aSig`);
                    enlace.appendChild(imagen);

                    let url = respuesta.chain.species.url

                    $.get(url, function(respuesta, estado) {
                        if (estado === "success") {
                            let id = respuesta.id
                            let url = `https://pokeapi.co/api/v2/pokemon/${id}`;

                            $.get(url, function(respuesta, estado) {
                                if (estado === "success") {
                                    let img = respuesta.sprites.other[`official-artwork`][`front_default`]
                                    imagen.setAttribute(`src`, `${img}`);
                                    imagen.classList.add(`evoluciones`)
                                    enlace.setAttribute('marcador', `${respuesta.id}`);
                                    enlace.setAttribute(`id`, `n${respuesta.id}`);
                                }
                            })


                        }
                    })
                    //---------------------- linea evolutiva 2 ----------------------
                    if (respuesta.chain.evolves_to[0] != null) {

                        for (let i = 0; i < respuesta.chain.evolves_to.length; i++) {

                            let segEvolve = document.createElement(`li`);
                            let divSeg = document.createElement(`div`);
                            let aSeg = document.createElement(`a`);
                            let imgSeg = document.createElement(`img`);

                            listado.appendChild(segEvolve);
                            segEvolve.appendChild(divSeg);
                            divSeg.appendChild(aSeg);
                            aSeg.classList.add(`fSig`);
                            aSeg.classList.add(`circulo--black`);
                            aSeg.setAttribute(`href`, `#`);
                            aSeg.classList.add(`aSig`);
                            aSeg.appendChild(imgSeg);
                            imgSeg.classList.add(`evoluciones`)

                            let url = respuesta.chain.evolves_to[i].species.url

                            $.get(url, function(respuesta, estado) {
                                if (estado === "success") {
                                    let id = respuesta.id
                                    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;

                                    $.get(url, function(respuesta, estado) {
                                        if (estado === "success") {
                                            let img = respuesta.sprites.other[`official-artwork`][`front_default`]
                                            imgSeg.setAttribute(`src`, `${img}`);
                                            aSeg.setAttribute('marcador', `${respuesta.id}`);
                                            aSeg.setAttribute(`id`, `n${respuesta.id}`);
                                        }
                                    })
                                }
                            })
                        }
                        //---------------------- linea evolutiva 3 ----------------------
                        if (respuesta.chain.evolves_to[0].evolves_to[0] != null) {

                            for (let i = 0; i < respuesta.chain.evolves_to[0].evolves_to.length; i++) {

                                let segEvolve = document.createElement(`li`);
                                let divSeg = document.createElement(`div`);
                                let aSeg = document.createElement(`a`);
                                let imgSeg = document.createElement(`img`);

                                listado.appendChild(segEvolve);
                                segEvolve.appendChild(divSeg);
                                divSeg.appendChild(aSeg);
                                aSeg.classList.add(`fSig`);
                                aSeg.classList.add(`circulo--black`);
                                aSeg.setAttribute(`href`, `#`);
                                aSeg.classList.add(`aSig`);
                                aSeg.appendChild(imgSeg);
                                imgSeg.classList.add(`evoluciones`)

                                let url = respuesta.chain.evolves_to[0].evolves_to[i].species.url

                                $.get(url, function(respuesta, estado) {
                                    if (estado === "success") {
                                        let id = respuesta.id
                                        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;

                                        $.get(url, function(respuesta, estado) {
                                            if (estado === "success") {
                                                let img = respuesta.sprites.other[`official-artwork`][`front_default`]
                                                imgSeg.setAttribute(`src`, `${img}`);
                                                aSeg.setAttribute('marcador', `${respuesta.id}`);
                                                aSeg.setAttribute(`id`, `n${respuesta.id}`);
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    }
                }
            })
        }
    })
    antSig(evento.id);
}

function antSig(id) {
    let urlAnt;
    if (id == 1) {
        urlAnt = `https://pokeapi.co/api/v2/pokemon/898`;
    } else {
        urlAnt = `https://pokeapi.co/api/v2/pokemon/${id-1}`;
    }
    $.get(urlAnt,
            function(respuesta, estado) {
                if (estado === "success") {
                    $("#anterior").attr('marcador', `${respuesta.id}`)
                    if (respuesta.sprites.other[`official-artwork`].front_default != null) {
                        $("#ant").attr('src', `${respuesta.sprites.other[`official-artwork`].front_default}`);
          }else {
            $("#ant").attr('src', `${respuesta.sprites.front_default}`);
            $("#ant").attr('width', `500px`);
          };
      }
    }
  );

  let urlSig;
  if (id == 898) {
    urlSig = `https://pokeapi.co/api/v2/pokemon/1`
  } else {
    urlSig = `https://pokeapi.co/api/v2/pokemon/${id+1}`
  }
  $.get(urlSig, function (respuesta, estado) {
    if (estado === "success") {
      $("#siguiente").attr('marcador', `${respuesta.id}`)
      if (respuesta.sprites.other[`official-artwork`].front_default != null) {
        $("#sig").attr('src', `${respuesta.sprites.other[`official-artwork`].front_default}`);
      } else {
        $("#sig").attr('src', `${respuesta.sprites.front_default}`);
        $("#sig").attr('width', `500px`);
      };
    }
  });
}

//========================================== LOGICA ==========================================

crearPokemon();

//========================================== EVENTOS ==========================================

$('body').on('click', `.stats`, function() {
    $('#prueba').toggle();
});
$('body').on('click', `.evolve`, function() {
    $('#pruebaEvolve').toggle();
});
$('body').on('click', `.descripcion`, function() {
    $('#pruebaDescr').toggle();
});

$(document).ready(function () {
    $(`body`).on(`click`, `.aSig` ,function () {
        let value = this.id
        traeId(value)
    } );
});