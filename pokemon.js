/* let btn = document.getElementById(`btn`);

btn.addEventListener(`click`, respuestaBtn);

function respuestaBtn() {
    console.log(`respuesta`);
};

let btn2 = document.getElementById(`btn2`);

btn2.onclick = () => {console.log(`2 respuesta`);} */
let pokedex = [{id : 1,
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
                },
                img: './pokemon.json-master/images/001.png'},
                {id: 2,
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
                },
                img: './pokemon.json-master/images/002.png'},
                {id: 3,
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
                },
                img: './pokemon.json-master/images/003.png'},
                {id: 4,
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
                },
                img: './pokemon.json-master/images/004.png'},
                {id: 7,
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
                },
                img: './pokemon.json-master/images/007.png'},
];

let comparativo =[];

let poke = 0;

let click = document.getElementById("click");
click.addEventListener('click',VerPokemon);

function VerPokemon(){
    poke = document.getElementById("buscador").value;
    let buscado = pokedex.filter(pokedex => pokedex.name.english == poke);

    let insertar1a = document.getElementById("ID");
    insertar1a.innerHTML = `<p>ID: #${buscado[0].id}</p>`;

    let insertar1b = document.getElementById("nombre");
    insertar1b.innerHTML = `<p>${buscado[0].name.english}</p>`;

    let insertar1c = document.getElementById("img");
    insertar1c.setAttribute('src', buscado[0].img);
    document.getElementById('img').style.width = '300px';

    let insertar2a = buscado.map(function(bar){
      return '<li>'+'HP: '+bar.base.HP+'</li>'+'<li>'+'Attack: '+bar.base.Attack+'</li>'+'<li>'+'Defense: '+bar.base.Defense+'</li>'+'<li>'+'Sp. Attack: '+bar.base.SpAttack+'</li>'+'<li>'+'Sp. Defense: '+bar.base.SpDefense+'</li>'+'<li>'+'Speed: '+bar.base.Speed+'</li>'
    });
    document.getElementById("caracteristicas").innerHTML = insertar2a;
    document.getElementById("caracteristicas").style.listStyle = "none";

    document.getElementById('fondo').style.backgroundImage = `url(./Multimedia/Img/fondo-${buscado[0].type[0]}.png)`;
};
