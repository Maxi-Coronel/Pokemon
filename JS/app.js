//entidades/objetos-----------------------
//variables-------------------------------
//---arrays--------------------
//---selectores----------------
//funciones-------------------------------
//eventos---------------------------------
//logica----------------------------------
$(document).ready(function() {
    $('body').on('click', `.stats`, function() {
        $('#prueba').toggle();
    });
});
$(document).ready(function() {
    $('body').on('click', `.evolve`, function() {
        $('#pruebaEvolve').toggle();
    });
});
$(document).ready(function() {
    $('body').on('click', `.descripcion`, function() {
        $('#pruebaDescr').toggle();
    });
});
//======================== OBJETOS ========================
function InfoPoke(id, name, img, type, typeUrl, stat, ability, especie) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.type = type;
    this.typeUrl = typeUrl;
    this.stat = stat;
    this.ability = ability;
    this.especie = especie;
}

function Base(HP, Attack, Defense, SpAttack, SpDefense, Speed) {
    this.HP = HP;
    this.Attack = Attack;
    this.Defense = Defense;
    this.SpAttack = SpAttack;
    this.SpDefense = SpDefense;
    this.Speed = Speed;
}

//======================== VARIABLES ========================
//-------- arrays -----------
const miEquipo = [];


//funciones-------------------------------
/* function primera() {
  $(".grid").removeClass()
  for(var i = 0; i < 40; i++) {
     for(var j = 0; j< 40; j++) {
        var div = document.createElement("div");
        div.style.width = "25px";
        div.style.height = "25px";
        div.style.border = "1px solid black";
      }
      var jump = document.createElement("br");
      document.getElementById("container").appendChild(jump);
      document.getElementById("container").appendChild(div); }
}

primera() */


function verCheck() {
    if ($(`#flexSwitchCheckDefault`).prop(`checked`)) {
        let val = true;
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
        sessionStorage.setItem('valor', val);
    } else {
        let val = false;
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
        sessionStorage.setItem('valor', val);
    }
}


function guardarPoke() {
    location.reload()
    let poke = $(`#buscador`).val();
    //========== GUARDAR EN SESIONSTORAGE ============
    sessionStorage.setItem('pokeBuscado', poke);
}

$(`#variantes`).change(function() {
    let poke = $('#variantes').val();
    //========== GUARDAR EN SESIONSTORAGE ============
    sessionStorage.setItem('pokeBuscado', poke);
    location.reload()
});

function maysPrimera(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function traeId(e) {
    let poke = $(`#${e}`).attr('marcador');
    //========== GUARDAR EN SESIONSTORAGE ============
    sessionStorage.setItem('pokeBuscado', poke);
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
            

            //=================== BUSCA DE EVOLUCIONES ====================

            console.log(respuesta.generation.url);
            console.log(respuesta.generation.name);
            $.get(`https://pokeapi.co/api/v2/generation/`, function(respuesta, estado) {
                if (estado === "success") {
            console.log(respuesta);
                }
            }
            )


            for (let i = 0; i < respuesta.varieties.length; i++) {
                $("#variantes").append(
                    `<option value="${respuesta.varieties[i].pokemon.name}">${respuesta.varieties[i].pokemon.name}</option>`
                );
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
                        let listEvolve = document.createElement(`ul`);
                        listEvolve.classList.add(`d-flex`);
                        let priEvolve = document.createElement(`li`);
                        let divPri = document.createElement(`div`);
                        let aPri = document.createElement(`a`);
                        let imgPri = document.createElement(`img`);

                        contenedor.appendChild(evolve);
                        evolve.appendChild(contEvolve);
                        contenedor.appendChild(divEvolve);
                        divEvolve.appendChild(listEvolve);
                        listEvolve.appendChild(priEvolve);
                        priEvolve.appendChild(divPri);
                        divPri.appendChild(aPri);
                        aPri.classList.add(`fSig`);
                        aPri.classList.add(`circulo--black`);
                        aPri.setAttribute(`href`, `#`);
                        aPri.classList.add(`aSig`);
                        aPri.appendChild(imgPri);

                        let name = respuesta.chain.species.name;
                        if (name == `landorus` || name == `thundurus` || name == `tornadus`) {
                            name = `${name}-incarnate`
                        }else if (name == `meloetta`){
                            name = `${name}-aria`
                        }else if (name == `basculin`) {
                            name = `${name}-blue-striped`
                        }else if (name == `keldeo`) {
                            name = `${name}-resolute`
                        }

                        let url = `https://pokeapi.co/api/v2/pokemon/${name}`;

                        $.get(url, function(respuesta, estado) {
                            if (estado === "success") {
                                let img = respuesta.sprites.other[`official-artwork`][`front_default`]
                                imgPri.setAttribute(`src`, `${img}`);
                                imgPri.classList.add(`evoluciones`)
                                aPri.setAttribute('marcador', `${respuesta.id}`);
                                aPri.setAttribute(`id`, `n${respuesta.id}`);
                            }
                        })

                        if (respuesta.chain.evolves_to[0] != null) {

                            for (let i = 0; i < respuesta.chain.evolves_to.length; i++) {

                                let segEvolve = document.createElement(`li`);
                                let divSeg = document.createElement(`div`);
                                let aSeg = document.createElement(`a`);
                                let imgSeg = document.createElement(`img`);

                                listEvolve.appendChild(segEvolve);
                                segEvolve.appendChild(divSeg);
                                divSeg.appendChild(aSeg);
                                aSeg.classList.add(`fSig`);
                                aSeg.classList.add(`circulo--black`);
                                aSeg.setAttribute(`href`, `#`);
                                aSeg.classList.add(`aSig`);
                                aSeg.appendChild(imgSeg);
                                imgSeg.classList.add(`evoluciones`)

                                let name = respuesta.chain.evolves_to[i].species.name;

                                if (name == `darmanitan`) {
                                    name = `${name}-standard`
                                }else if (name == `meowstic`) {
                                    name = `${name}-male`
                                }

                                let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
                                $.get(url, function(respuesta, estado) {
                                    if (estado === "success") {
                                        let img = respuesta.sprites.other[`official-artwork`][`front_default`]
                                        imgSeg.setAttribute(`src`, `${img}`);
                                        aSeg.setAttribute('marcador', `${respuesta.id}`);
                                        aSeg.setAttribute(`id`, `n${respuesta.id}`);
                                    }
                                })
                            }
                        }
                        if (respuesta.chain.evolves_to[0].evolves_to[0] != null) {

                            for (let i = 0; i < respuesta.chain.evolves_to[0].evolves_to.length; i++) {

                                let segEvolve = document.createElement(`li`);
                                let divSeg = document.createElement(`div`);
                                let aSeg = document.createElement(`a`);
                                let imgSeg = document.createElement(`img`);

                                listEvolve.appendChild(segEvolve);
                                segEvolve.appendChild(divSeg);
                                divSeg.appendChild(aSeg);
                                aSeg.classList.add(`fSig`);
                                aSeg.classList.add(`circulo--black`);
                                aSeg.setAttribute(`href`, `#`);
                                aSeg.classList.add(`aSig`);
                                aSeg.appendChild(imgSeg);
                                imgSeg.classList.add(`evoluciones`)

                                let name = respuesta.chain.evolves_to[0].evolves_to[i].species.name;

                                if (name == `darmanitan`) {
                                    name = `${name}-standard`
                                }else if (name == `meowstic`) {
                                    name = `${name}-male`
                                }

                                let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
                                $.get(url, function(respuesta, estado) {
                                    if (estado === "success") {
                                        let img = respuesta.sprites.other[`official-artwork`][`front_default`]
                                        imgSeg.setAttribute(`src`, `${img}`);
                                        aSeg.setAttribute('marcador', `${respuesta.id}`);
                                        aSeg.setAttribute(`id`, `n${respuesta.id}`);
                                    }
                                })
                            }
                        }
                    }
                })
                //=================== BUSCA DE EVOLUCIONES ====================
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

function anyadirPoke() {
  //llamamos al storage
  let compVacio = JSON.parse(localStorage.getItem(`miEquipo`));
  //condicional de storage
  if (localStorage.getItem(`miEquipo`) != null) {
    const nuevo = JSON.parse(sessionStorage.getItem(`poke`));
    compVacio.push(nuevo);
    localStorage.setItem(`miEquipo`, JSON.stringify(compVacio));
  }else {
    const nuevo = JSON.parse(sessionStorage.getItem(`poke`));
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

      let arriba = document.createElement(`ul`);
      arriba.classList.add(`flex`);
      card.appendChild(arriba);

      let nombre = document.createElement(`li`);
      let strong1 = document.createElement(`strong`);
      let contenido1 = document.createTextNode(`${e.name}`);
      
      let salud = document.createElement(`li`);
      let strong2 = document.createElement(`strong`);
      let span1 = document.createElement(`span`);
      let contenido3 = document.createTextNode(`HP`);
      let contenido2 = document.createTextNode(`${e.stat.HP}`);

      arriba.appendChild(nombre);
      nombre.appendChild(strong1);
      strong1.appendChild(contenido1);

      arriba.appendChild(salud);
      salud.appendChild(strong2);
      strong2.appendChild(span1);
      span1.appendChild(contenido3);
      strong2.appendChild(contenido2);
      
      let abajo = document.createElement(`ul`);
      card.appendChild(abajo);

      let liImg = document.createElement(`li`);
      let imgPrincipal = document.createElement(`img`);
      imgPrincipal.classList.add(`imgComp`);
      imgPrincipal.setAttribute(`src`, `${e.img}`);
      imgPrincipal.setAttribute(`style`, `background-image: url("./Multimedia/Img/Fondo/fondo-${type.a}.png")`);
      imgPrincipal.setAttribute(`alt`, `Carta ${e.name}`);

      let liTipo = document.createElement(`li`);
      let imgTipo1 = document.createElement(`img`);
      imgTipo1.setAttribute(`src`, `./Multimedia/Img/Tipo/${type.a}.png`)
      let imgTipo2 = document.createElement(`img`);
      imgTipo2.setAttribute(`src`, `./Multimedia/Img/Tipo/${type.b}.png`)
      imgTipo2.setAttribute(`alt`, ``)
      let contTipo = document.createTextNode(`Tipo: `);

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
      liImg.appendChild(imgPrincipal);
      abajo.appendChild(liTipo);
      liTipo.appendChild(contTipo);
      liTipo.appendChild(imgTipo1);
      liTipo.appendChild(imgTipo2);
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

      $(`#comparador`).append(comparador);
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



//logica----------------------------------

let session = JSON.parse(sessionStorage.getItem("valor"));
$(`#flexSwitchCheckDefault`).prop(`checked`, session);
verCheck();
crearPokemon();
imprimirCard();

//eventos---------------------------------

$("#click").click(guardarPoke);
$(`.button`).click(anyadirPoke);
$(`.borrar`).click(borraPoke);
$(`#flexSwitchCheckDefault`).click(verCheck);

$(`body`).on(`click`, `.aSig` ,function () {
    let value = this.id
    traeId(value)
} );