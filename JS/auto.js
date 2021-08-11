$.get('https://pokeapi.co/api/v2/pokemon?limit=1118',
  function (respuesta, estado) {
    if (estado === "success") {
      const nombres = [];
      const p = respuesta.results;
      for (let i = 0; i < p.length; i++) {
        nombres.push(p[i].name); 
      }

      function autocomplete(inp, arr) {
          /*la función autocompletar toma dos argumentos,
          el elemento de campo de texto y una matriz de posibles valores autocompletados*/
          let currentFocus;
          /*ejecutar una función cuando alguien escribe en el campo de texto*/
          inp.addEventListener("input", function(e) {
              let a, b, i, val = this.value;
              /*Cierre todas las listas de valores autocompletados ya abiertas*/
              closeAllLists();
              if (!val) { return false;}
              currentFocus = -1;
              /*crea un elemento DIV que contendrá los elementos (valores)*/
              a = document.createElement("ul");
              a.setAttribute("id", `${this.id}autocomplete-list`);
              a.setAttribute("class", "autocomplete-items");
              /*append the DIV element as a child of the autocomplete container:*/
              this.parentNode.appendChild(a);
              /*for each item in the array...*/
              for (i = 0; i < arr.length; i++) {
                /*compruebe si el elemento comienza con las mismas letras que el valor del campo de texto*/
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                  /*crea un elemento DIV para cada elemento coincidente*/
                  b = document.createElement("li");
                  /*make the matching letters bold:*/
                  b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                  b.innerHTML += arr[i].substr(val.length);
                  /*insert a input field that will hold the current array item's value:*/
                  b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                  /*execute a function when someone clicks on the item value (DIV element):*/
                      b.addEventListener("click", function(e) {
                      /*insert the value for the autocomplete text field:*/
                      inp.value = this.getElementsByTagName("input")[0].value;
                      /*close the list of autocompleted values,
                      (or any other open lists of autocompleted values:*/
                      closeAllLists();
                  });
                  a.appendChild(b);
                }
              }
          });
          /*execute a function presses a key on the keyboard:*/
          inp.addEventListener("keydown", function(e) {
              let x = document.getElementById(this.id + "autocomplete-list");
              if (x) x = x.getElementsByTagName("div");
              if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus letiable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
              } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus letiable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
              } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                  /*and simulate a click on the "active" item:*/
                  if (x) x[currentFocus].click();
                }
              }
          });
          function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
          }
          function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (let i = 0; i < x.length; i++) {
              x[i].classList.remove("autocomplete-active");
            }
          }
          function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            let x = document.getElementsByClassName("autocomplete-items");
            for (let i = 0; i < x.length; i++) {
              if (elmnt != x[i] && elmnt != inp) {
              x[i].parentNode.removeChild(x[i]);
              }
            }
          }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
      } 

      autocomplete(document.getElementById("buscador"), nombres);
      function guardarPoke () {
        let poke = $(`#buscador`).val();
        //========== GUARDAR EN SESIONSTORAGE ============
        sessionStorage.setItem('pokeBuscado', poke);  
      }
    }
    $("#click").click(guardarPoke)
  }
);