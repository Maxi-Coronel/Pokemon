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
    //========== TRAER LOCALSTORAGE ============
    let imprimir = JSON.parse(localStorage.getItem(`miEquipo`));
    if (imprimir != null) {
  
      imprimir.forEach(e => {
        if (e.id < 10) {
          e.id = `00${e.id}`
        } else if (e.id < 100) {
          e.id = `0${e.id}`
        }
        //========== TARJETA DE INFO ============
          type = new Object(); 
        if (e.type.length == 1) {
          type.a = e.type[0].type.name
          type.b = "#";
        }else{
          type.a = e.type[0].type.name;
          type.b = e.type[1].type.name;
        }
      //-------------------------------- JS PURO --------------------------------
        let comparador = document.createElement(`div`);
        comparador.classList.add(`row`)
  
          //---------------- boton X ----------------
        let input = document.createElement(`input`);
        input.setAttribute(`type`, `button`);
        input.classList.add(`borrar`);
        input.classList.add(`btn`);
        input.classList.add(`btn-danger`);
        input.setAttribute(`value`, `x`);
        input.setAttribute(`marcador`, `${e.id}`);
        comparador.appendChild(input);
  
          //---------------- DIV DE CARD ----------------
        let card = document.createElement(`div`);
        card.classList.add(`card`);
        card.classList.add(`flex`);
        comparador.appendChild(card);
        
        let abajo = document.createElement(`ul`);
  
        let liImg = document.createElement(`li`);
        let imagenPoke = document.createElement(`img`);
  
        let liTipo = document.createElement(`li`);
        let imgTipo1 = document.createElement(`img`);
        let imgTipo2 = document.createElement(`img`);
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
  
        card.appendChild(abajo);
        abajo.appendChild(liImg);
        liImg.appendChild(imagenPoke);
        imagenPoke.classList.add(`imgComp`);
        imagenPoke.setAttribute(`src`, `${e.img}`);
        imagenPoke.setAttribute(`alt`, `Carta ${e.name}`);
  
        abajo.appendChild(liTipo);
        liTipo.appendChild(contTipo);
        liTipo.appendChild(imgTipo1);
        imgTipo1.setAttribute(`src`, `./Multimedia/Img/Tipo/${type.a}.png`)
        liTipo.appendChild(imgTipo2);
        if (type.b != `#`) {
          imgTipo2.setAttribute(`src`, `./Multimedia/Img/Tipo/${type.b}.png`);
          imgTipo2.setAttribute(`alt`, ``);
        }
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
  //========== TRAER LOCALSTORAGE ============
  let borra = JSON.parse(localStorage.getItem(`miEquipo`));
  //========== FILTRAR TODOS MENOS EL BORRADO ============
  let actualizado = borra.filter(e => e.id != evento.target.getAttribute('marcador'));
  //========== VOLVER A GUARDAR EN LOCALSTORAGE ============
  localStorage.setItem(`miEquipo`, JSON.stringify(actualizado));
  location.reload();
}

imprimirCard();

$(`.borrar`).click(borraPoke);
$(`.button`).click(anyadirEquipo);