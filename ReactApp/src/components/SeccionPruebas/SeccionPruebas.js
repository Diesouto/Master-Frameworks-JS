import { Component } from "react";

export default class SeccionPruebas extends Component {
    render() {
        return <>
            <section id="content">
                <h2>Últimos artículos</h2>
                <div id="articles">
                    <article id="article-template" className="article-item">
                        <div className="image-wrap">
                            <img src="https://imagenpng.com/wp-content/uploads/img/paisajes-para-fondo-de-pantalla.jpg" alt="paisaje"/>
                        </div>

                        <h2>Artículo de prueba</h2>
                        <span className="date">
                            Hace 5 minutos
                        </span>
                        <a href="article.html">Leer más</a>

                        <div className="clearfix"></div>
                    </article>
                </div>
            </section>
        </>
    }    
}