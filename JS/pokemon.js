$.getJSON('./pokedex.json', function(respuesta, estado) {
  if (estado === "success") {
    const pokedex = respuesta;
    
    let comparativo =[];

    function guardarPoke () {
      let poke = $(`#buscador`).val();
      //========== GUARDAR EN SESIONSTORAGE ============
      sessionStorage.setItem('pokeBuscado', poke);  
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
    }

    function borrarPoke(evento) {
      //========== TRAER DE LOCALSTORAGE ============
      let borrar = JSON.parse(localStorage.getItem(`comparativo`));
      //========== FILTRAR TODOS MENOS EL BORRADO ============
      let actualizado = borrar.filter(e => e.id != evento.target.getAttribute('marcador'));
      //========== VOLVER A GUARDAR EN LOCALSTORAGE ============
      localStorage.setItem(`comparativo`, JSON.stringify(actualizado));
      location.reload();
    }

      //========== VISTA ============
    function verPokemon(){
      //========== TRAER DE SESIONSTORAGE ============
      let pokeBuscado = sessionStorage.getItem('pokeBuscado');

      if (pokeBuscado != null) {
        //========== FILTRAR EL ID PARA ARMAR LA TARJETA ============
        let buscado = pokedex.filter(e => e.name.english == pokeBuscado);
        console.log(buscado);

        $(".button").attr('marcador', `${buscado[0].id}`);

        $("#ID").html(`<p>ID: #${buscado[0].id}</p>`);
        $("#nombre").html(`<p>${buscado[0].name.english}</p>`);

        if (`${buscado[0].id}`.length == 1) {
          $("#img").attr('src', `./Multimedia/images/00${buscado[0].id}.png`);
        } else if (`${buscado[0].id}`.length == 2) {
          $("#img").attr('src', `./Multimedia/images/0${buscado[0].id}.png`);
        } else {
          $("#img").attr('src', `./Multimedia/images/${buscado[0].id}.png`);
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

      //========== SI NO HAY SESIONSTORAGE ============
        $(".button").attr('marcador', `150`);
        $("#ID").html(`<p>ID: #150</p>`);
        $("#nombre").html(`<p>Mewtwo</p>`);
        $("#img").attr('src', `./Multimedia/images/150.png`);
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

    function imprimirPoke() {
      //========== TRAER DE LOCALSTORAGE ============
      let imprimir = JSON.parse(localStorage.getItem(`comparativo`));
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
            $(`#comparador`).append(`<input type="button" class="borrar btn btn-danger esqDerecha" value="x"
                                      marcador="${e.id}">
                                      <div class="margin">
                                      <ul class="flex between">
                                        <li><strong>${e.name.english}</strong></li>
                                        <li><strong><span>HP</span>${e.base.HP}</strong></li>
                                      </ul>
                                      <ul>
                                        <li><img class="imgComp" src="./Multimedia/images/${e.id}.png" width="150px"></li>
                                        <li>Tipo = ${e.type}</li>
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



      //========== CAMBIAR IMG DEL HEADER ============
    $(".absolute").click(()=>{
      $("#desaparece").toggle();
      $("#aparece").toggle();
    })

    verPokemon();
    imprimirPoke();
    $(`#click`).click(guardarPoke);
    $(`.button`).click(anyadirPoke);
    $(`.borrar`).click(borrarPoke);
  }
})
