//entidades/objetos-----------------------
//variables-------------------------------
//---arrays--------------------
//---selectores----------------
//funciones-------------------------------
//eventos---------------------------------
//logica----------------------------------

$('body').on('click', `.stats`, function() {
    $('#prueba').toggle();
});

$('body').on('click', `.evolve`, function() {
    $('#pruebaEvolve').toggle();
});

$('body').on('click', `.descripcion`, function() {
    $('#pruebaDescr').toggle();
});

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
function optionType() {
    let url = `https://pokeapi.co/api/v2/type/`
    $.get(url, function(respuesta, estado) {
        if (estado === "success") {
            
            let tipo = document.createElement(`option`);
            let contTipo = document.createTextNode(`tipo`);

            tipo.appendChild(contTipo);
            $("#tipos").append(tipo);

            for (let i = 0; i < respuesta.results.length; i++) {
                let tipo = document.createElement(`option`);
                let contTipo = document.createTextNode(`${respuesta.results[i].name}`);

                tipo.appendChild(contTipo);
                tipo.setAttribute(`value`, `${respuesta.results[i].name}`);

                $("#tipos").append(tipo);
            }
            
        }
    })
}

function optionGen() {
    let url = `https://pokeapi.co/api/v2/generation/`
    $.get(url, function(respuesta, estado) {
        if (estado === "success") {
            
            let generacion = document.createElement(`option`);
            let contGeneracion = document.createTextNode(`generación`);

            generacion.appendChild(contGeneracion);
            $("#generacion").append(generacion);

            for (let i = 0; i < respuesta.results.length; i++) {
                let generacion = document.createElement(`option`);
                let contGeneracion = document.createTextNode(`${respuesta.results[i].name}`);

                generacion.appendChild(contGeneracion);
                generacion.setAttribute(`value`, `${respuesta.results[i].name}`);

                $("#generacion").append(generacion);
            }
            
        }
    })
}


function type() {
    $(`#tipos`).attr(`size`,1)
    let tip =  $('#tipos').val();
    let url = `https://pokeapi.co/api/v2/type/`
    $(".grid").remove()
    $(".generation").remove()
    $.get(url, function(respuesta, estado) {
        if (estado === "success") {
            for (let i = 0; i < respuesta.results.length; i++) {
                if (respuesta.results[i].name == tip) {
                    let url = respuesta.results[i].url
                    $.get(url, function(respuesta, estado) {
                        if (estado === "success") {

                            let dato = document.createElement(`div`);
                            dato.classList.add(`generation`);
                            let listado = document.createElement(`ul`);
                            listado.classList.add(`d-flex`);

                            dato.appendChild(listado);

                            let pokemonType = respuesta.pokemon;
                            for (let i = 0; i < pokemonType.length; i++) {
                                
                                let itemLi = document.createElement(`li`);
                                let contDiv = document.createElement(`div`);
                                let enlace = document.createElement(`a`);
                                let imagen = document.createElement(`img`);

                                listado.appendChild(itemLi);
                                itemLi.appendChild(contDiv);
                                contDiv.appendChild(enlace);
                                enlace.classList.add(`fSig`);
                                enlace.classList.add(`circulo--black`);
                                enlace.setAttribute(`href`, `#`);
                                enlace.classList.add(`aSig`);
                                enlace.appendChild(imagen);

                                let url = respuesta.pokemon[i].pokemon.url;
                                
                                $.get(url, function(respuesta, estado) {
                                    if (estado === "success") {
                                        let id = respuesta.id
                                        if (id <= 898) {
                                            $.get(`https://pokeapi.co/api/v2/pokemon/${id}`, function(respuesta, estado) {
                                                if (estado === "success") {
                                                    let img = respuesta.sprites.other[`official-artwork`][`front_default`];
                                                    imagen.setAttribute(`src`, `${img}`);
                                                    imagen.classList.add(`evoluciones`);
                                                    enlace.setAttribute('marcador', `${respuesta.id}`);
                                                    enlace.setAttribute(`id`, `n${respuesta.id}`);
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                            $(`main`).append(dato);
                        }
                    })
                }
                
            }
            
        }
    })
}

function generation() {
    let gen =  $('#generacion').val();
    let url = `https://pokeapi.co/api/v2/generation/`
    $(".grid").remove()
    $(".generation").remove()
    $.get(url, function(respuesta, estado) {
        if (estado === "success") {
            for (let i = 0; i < respuesta.results.length; i++) {
                if (respuesta.results[i].name == gen) {
                    let url = respuesta.results[i].url
                    $.get(url, function(respuesta, estado) {
                        if (estado === "success") {

                            let dato = document.createElement(`div`);
                            dato.classList.add(`generation`);
                            let listado = document.createElement(`ul`);
                            listado.classList.add(`d-flex`);

                            dato.appendChild(listado);

                            let pokemonGeneration = respuesta.pokemon_species;
                            for (let i = 0; i < pokemonGeneration.length; i++) {
                                let name = pokemonGeneration[i].url;
                                
                                let itemLi = document.createElement(`li`);
                                let contDiv = document.createElement(`div`);
                                let enlace = document.createElement(`a`);
                                let imagen = document.createElement(`img`);

                                listado.appendChild(itemLi);
                                itemLi.appendChild(contDiv);
                                contDiv.appendChild(enlace);
                                enlace.classList.add(`fSig`);
                                enlace.classList.add(`circulo--black`);
                                enlace.setAttribute(`href`, `#`);
                                enlace.classList.add(`aSig`);
                                enlace.appendChild(imagen);
                                
                                $.get(name, function(respuesta, estado) {
                                    if (estado === "success") {
                                        let id = respuesta.id
                                        $.get(`https://pokeapi.co/api/v2/pokemon/${id}`, function(respuesta, estado) {
                                            if (estado === "success") {
                                                if (id <= 898) {
                                                    $.get(`https://pokeapi.co/api/v2/pokemon/${id}`, function(respuesta, estado) {
                                                        if (estado === "success") {
                                                            let img = respuesta.sprites.other[`official-artwork`][`front_default`];
                                                            imagen.setAttribute(`src`, `${img}`);
                                                            imagen.classList.add(`evoluciones`);
                                                            enlace.setAttribute('marcador', `${respuesta.id}`);
                                                            enlace.setAttribute(`id`, `n${respuesta.id}`);
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                            $(`main`).append(dato);
                        }
                    })
                }
                
            }
            
        }
    })
}

function verCheck() {

    if ($(`#flexSwitchCheckDefault`).prop(`checked`)) {
        let modoDark = true;
        $("nav").removeClass("navbar-light");
        $("nav").removeClass("bg-light");
        $("nav").addClass("navbar-dark");
        $("nav").addClass("bg-dark");
        $("main").removeClass("light");
        $("main").addClass("dark");
        $(".fSig").removeClass("circulo--black");
        $(".fSig").addClass("circulo--white");
        $("#fAnt").removeClass("circulo--black");
        $("#fAnt").addClass("circulo--white");
        $("#fondo").removeClass("circulo--black");
        $("#fondo").addClass("circulo--white");
        $("footer").removeClass("footer--ligth");
        $("footer").addClass("footer--black");
        $("#aparece").attr("src", "./Multimedia/Img/portada22.jpg");
        sessionStorage.setItem('modoDark', modoDark);
    } else {
        let modoDark = false;
        $("nav").removeClass("navbar-dark");
        $("nav").removeClass("bg-dark");
        $("nav").addClass("navbar-light");
        $("nav").addClass("bg-light");
        $("main").removeClass("dark");
        $("main").addClass("light");
        $(".fSig").removeClass("circulo--white");
        $(".fSig").addClass("circulo--black");
        $("#fAnt").removeClass("circulo--white");
        $("#fAnt").addClass("circulo--black");
        $("#fondo").removeClass("circulo--white");
        $("#fondo").addClass("circulo--black");
        $("footer").removeClass("footer--black");
        $("footer").addClass("footer--ligth");
        $("#aparece").attr("src", "./Multimedia/Img/portada1.jpg");
        sessionStorage.setItem('modoDark', modoDark);
    }
}

$(`#variantes`).change(function() {
    let variante = $('#variantes').val();
    if (variante != `variante`) {
        let actual = sessionStorage.getItem(`pokeBuscado`)
        if (actual != variante) {
            //========== GUARDAR EN SESIONSTORAGE ============
            sessionStorage.setItem('pokeBuscado', variante);
            location.reload()
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
                verPokemon(pokemon)
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
            

            //=================== BUSCA DE EVOLUCIONES ====================

            console.log(respuesta.generation.url);
            console.log(respuesta.generation.name);
            

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
            //=================== BUSCA DE EVOLUCIONES ====================
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

    for (let i = 0; i < evento.typeUrl.length; i++) {
        $.get(evento.typeUrl[i], function(respuesta, estado) {
            if (estado === "success") {
                console.log(`debilidad doble de ${evento.type[i].type.name}`);
                let daño = respuesta.damage_relations.double_damage_from
                for (let i = 0; i < daño.length; i++) {
                    if (evento.type[1] != null) {
                        if (daño[i].name != evento.type[1].type.name) {
                            console.log(daño[i].name);
                        }
                    } else {
                        console.log(daño[i].name);
                    }
                }
            }
        })
    }
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

function anyadirEquipo() {
  //llamamos al storage
  let compVacio = JSON.parse(localStorage.getItem(`miEquipo`));
  //condicional de storage
  if (localStorage.getItem(`miEquipo`) != null) {
    const nuevo = JSON.parse(sessionStorage.getItem(`pokemon`));
    compVacio.push(nuevo);
    localStorage.setItem(`miEquipo`, JSON.stringify(compVacio));
  }else {
    const nuevo = JSON.parse(sessionStorage.getItem(`pokemon`));
    miEquipo.push(nuevo);
    localStorage.setItem(`miEquipo`, JSON.stringify(miEquipo));
  }
  location.reload();
}

function imprimirCard() {
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
            //---------------- JS PURO ----------------
      let comparador = document.createElement(`div`);
      comparador.classList.add(`row`)

      let input = document.createElement(`input`);
      input.setAttribute(`type`, `button`);
      input.classList.add(`borrar`);
      input.classList.add(`btn`);
      input.classList.add(`btn-danger`);
      input.setAttribute(`value`, `x`);
      input.setAttribute(`marcador`, `${e.id}`);      
      comparador.appendChild(input);

      let card = document.createElement(`div`);
      card.classList.add(`card`);
      card.classList.add(`flex`);
      comparador.appendChild(card);
      
      let abajo = document.createElement(`ul`);
      card.appendChild(abajo);

      let liImg = document.createElement(`li`);
      let imagenPoke = document.createElement(`img`);
      imagenPoke.classList.add(`imgComp`);
      imagenPoke.setAttribute(`src`, `${e.img}`);
      imagenPoke.setAttribute(`alt`, `Carta ${e.name}`);

      let liTipo = document.createElement(`li`);
      let imgTipo1 = document.createElement(`img`);
      imgTipo1.setAttribute(`src`, `./Multimedia/Img/Tipo/${type.a}.png`)
      let imgTipo2 = document.createElement(`img`);
      imgTipo2.setAttribute(`src`, `./Multimedia/Img/Tipo/${type.b}.png`)
      imgTipo2.setAttribute(`alt`, ``)
      let contTipo = document.createTextNode(`Tipo: `);

      let liSalud = document.createElement(`li`);
      let contSalud = document.createTextNode(`HP: ${e.stat.HP}`);

      let liAtaque = document.createElement(`li`);
      let contAtaque = document.createTextNode(`Ataque: ${e.stat.Attack}`);

      let liDefensa = document.createElement(`li`);
      let contDefensa = document.createTextNode(`Defensa: ${e.stat.Defense}`);

      let liSpAttack = document.createElement(`li`);
      let contSpAttack = document.createTextNode(`Super ataque: ${e.stat.SpAttack}`);

      let liSpDefense = document.createElement(`li`);
      let contSpDefense = document.createTextNode(`Super defensa: ${e.stat.SpDefense}`);

      let liSpeed = document.createElement(`li`);
      let contSpeed = document.createTextNode(`Velocidad: ${e.stat.Speed}`);

      abajo.appendChild(liImg);
      liImg.appendChild(imagenPoke);
      abajo.appendChild(liTipo);
      liTipo.appendChild(contTipo);
      liTipo.appendChild(imgTipo1);
      liTipo.appendChild(imgTipo2);

      abajo.appendChild(liSalud);
      liSalud.appendChild(contSalud);
      abajo.appendChild(liAtaque);
      liAtaque.appendChild(contAtaque);
      abajo.appendChild(liDefensa);
      liDefensa.appendChild(contDefensa);
      abajo.appendChild(liSpAttack);
      liSpAttack.appendChild(contSpAttack);
      abajo.appendChild(liSpDefense);
      liSpDefense.appendChild(contSpDefense);
      abajo.appendChild(liSpeed);
      liSpeed.appendChild(contSpeed);

      $(`#cards`).append(comparador);
    });
  }
}

function borraPoke(evento) {
  //========== TRAER DE LOCALSTORAGE ============
  let borra = JSON.parse(localStorage.getItem(`miEquipo`));
  //========== FILTRAR TODOS MENOS EL BORRADO ============
  let actualizado = borra.filter(e => e.id != evento.target.getAttribute('marcador'));
  //========== VOLVER A GUARDAR EN LOCALSTORAGE ============
  localStorage.setItem(`miEquipo`, JSON.stringify(actualizado));
  location.reload();
}

//========================================== LOGICA ==========================================
let modoDark = JSON.parse(sessionStorage.getItem("modoDark"));
$(`#flexSwitchCheckDefault`).prop(`checked`, modoDark);

optionGen();
optionType();
verCheck();
crearPokemon();
imprimirCard();

//========================================== EVENTOS ==========================================
$(`#tipos`).focus(function () { 
    $(`#tipos`).attr(`size`,2.5)});
$(`#tipos`).blur(function () { 
    $(`#tipos`).attr(`size`,1)});
$(`#tipos`).change(type);
$(`#generacion`).change(generation);
$(`.button`).click(anyadirEquipo);
$(`.borrar`).click(borraPoke);
$(`#flexSwitchCheckDefault`).click(verCheck);
$(document).ready(function () {
    $(`body`).on(`click`, `.aSig` ,function () {
        let value = this.id
        traeId(value)
    } );
});