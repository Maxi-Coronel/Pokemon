$.get(urlPoke, function(respuesta, estado) {
    if (estado === "success") {

        let especies = respuesta.species.url;
        let forma = respuesta.forms[0].url
        let habilidad = respuesta.abilities[0].ability.url
        let indiceJuegos = respuesta.game_indices[0].version.url
        let encuentrosArea = respuesta.location_area_encounters
        let movimientos = respuesta.moves[0].move.url
        let stats = respuesta.stats[0].stat.url


        $.get(stats, function(respuesta, estado) {
            if (estado === "success") {
                let caracteristicas = respuesta.characteristics[0].url


                $.get(caracteristicas, function(respuesta, estado) {
                    if (estado === "success") {
                        console.log(respuesta);

                    }})
            }})


        $.get(especies, function(respuesta, estado) {
            if (estado === "success") {
                let color = respuesta.color.url
                let huevo = respuesta.egg_groups[0].url
                let encuentro = respuesta.pal_park_encounters[0].area.url
                let evolucion = respuesta.evolution_chain.url
            }})
    }
}
)