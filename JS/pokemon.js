let pokedex = [{id : "001",
                name: {
                  english: "Bulbasaur",
                  japanese: "フシギダネ",
                  chinese: "妙蛙种子",
                  french: "Bulbizarre"
                },
                type: ["Grass","Poison"],
                base: {
                    HP: 45,
                    Attack: 49,
                    Defense: 49,
                    SpAttack: 65,
                    SpDefense: 65,
                    Speed: 45
                }},
                {id: "002",
                name: {
                  english: "Ivysaur",
                  japanese: "フシギソウ",
                  chinese: "妙蛙草",
                  french: "Herbizarre"
                },
                type: ["Grass","Poison"],
                base: {
                  HP: 60,
                  Attack: 62,
                  Defense: 63,
                  SpAttack: 80,
                  SpDefensa: 80,
                  Speed: 60
                }},
                {id: "003",
                name:{
                  english: "Venusaur",
                  japanese: "フシギバナ",
                  chinese: "妙蛙花",
                  french: "Florizarre"
                },
                type: ["Grass","Poison"],
                base: {
                  HP: 80,
                  Attack: 82,
                  Defense: 83,
                  SpAttack: 100,
                  SpDefense: 100,
                  Speed: 80
                }},
                {id: "004",
                name: {
                  english: "Charmander",
                  japanese: "ヒトカゲ",
                  chinese: "小火龙",
                  french: "Salamèche"
                },
                type: [
                  "Fire"
                ],
                base: {
                  HP: 39,
                  Attack: 52,
                  Defense: 43,
                  SpAttack: 60,
                  SpDefense: 50,
                  Speed: 65
                }},
                {id: "007",
                name: {
                  english: "Squirtle",
                  japanese: "ゼニガメ",
                  chinese: "杰尼龟",
                  french: "Carapuce"
                },
                type: [
                  "Water"
                ],
                base: {
                  HP: 44,
                  Attack: 48,
                  Defense: 65,
                  SpAttack: 50,
                  SpDefense: 64,
                  Speed: 43
                }},
                {
                  id: "150",
                  name: {
                    english: "Mewtwo",
                    japanese: "ミュウツー",
                    chinese: "超梦",
                    french: "Mewtwo"
                  },
                  type: [
                    "Psychic"
                  ],
                  base: {
                    HP: 106,
                    Attack: 110,
                    Defense: 90,
                    SpAttack: 154,
                    SpDefense: 90,
                    Speed: 130
                  }
                },
];

let comparativo =[];

let poke = 0;

let click = document.getElementById("click");
click.addEventListener('click',VerPokemon);

const boton = document.getElementById("button");
boton.addEventListener('click', anyadirPoke);

const buscado = 0;

function VerPokemon(){
    poke = document.getElementById("buscador").value;
    let buscado = pokedex.filter(pokedex => pokedex.name.english == poke);

    boton.setAttribute('marcador', buscado[0].id);

    let insertar1a = document.getElementById("ID");
      insertar1a.innerHTML = `<p>ID: #${buscado[0].id}</p>`;

    let insertar1b = document.getElementById("nombre");
      insertar1b.innerHTML = `<p>${buscado[0].name.english}</p>`;

    let insertar1c = document.getElementById("img");
      insertar1c.setAttribute('src', `./pokemon.json-master/images/${buscado[0].id}.png`);
      document.getElementById('img').style.width = '300px';

    let insertar2a = buscado.map(function(bar){
      return '<ul>'+'<li>'+'HP: '+bar.base.HP+'</li>'+'<li>'+'Attack: '+bar.base.Attack+'</li>'+'<li>'+'Defense: '+bar.base.Defense+'</li>'+'<li>'+'Sp. Attack: '+bar.base.SpAttack+'</li>'+'<li>'+'Sp. Defense: '+bar.base.SpDefense+'</li>'+'<li>'+'Speed: '+bar.base.Speed+'</li>'+'</ul>'
    });
      document.getElementById("caracteristicas").innerHTML = insertar2a;
      document.getElementById("caracteristicas").classList.add('listNotStyle');

    document.getElementById('fondo').style.backgroundImage = `url(./Multimedia/Img/fondo-${buscado[0].type[0]}.png)`;
    
    let agregar = document.getElementById("agregar");
};

function anyadirPoke(evento) {
  const nuevo = pokedex.filter(pokedex => pokedex.id == evento.target.getAttribute('marcador'));
  comparativo.push(nuevo[0]);

  let comparador = comparativo.map(function(bar){
    return '<ul>'+'<li>'+bar.name.english+'</li>'+'<li>'+'Tipo: '+bar.type+'</li>'+'<li>'+'HP: '+bar.base.HP+'</li>'+'<li>'+'Attack: '+bar.base.Attack+'</li>'+'<li>'+'Defense: '+bar.base.Defense+'</li>'+'<li>'+'Sp. Attack: '+bar.base.SpAttack+'</li>'+'<li>'+'Sp. Defense: '+bar.base.SpDefense+'</li>'+'<li>'+'Speed: '+bar.base.Speed+'</li>'+'</ul>'
  });
  document.getElementById("comparador").innerHTML = comparador;
};
