                //------------ crea <option> de tipo ------------
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
                
                                //------------ crea <option> de generación ------------
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
                
                                //------------ muestra todos de un tipo ------------
function muestraType() {
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
                
                                //------------ muestra todos de una generación ------------
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

optionGen();
optionType();

$(`#tipos`).change(muestraType);
$(`#generacion`).change(generation);

$(`#tipos`).focus(function () { 
    $(`#tipos`).attr(`size`,2.5)});
$(`#tipos`).blur(function () { 
    $(`#tipos`).attr(`size`,1)});