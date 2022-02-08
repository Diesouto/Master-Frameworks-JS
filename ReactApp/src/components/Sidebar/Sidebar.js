import { Component } from "react";

export default class Sidebar extends Component {
    render() {
        return <>
            <aside id="sidebar">
                <div id="nav-blog" className="sidebar-item">
                    <h3>Puedes hacer esto</h3>
                    <a href="index.html" className="btn btn-success">Crear artículo</a>
                </div>

                <div id="search" className="sidebar-item">
                    <h3>Buscador</h3>
                    <p>Encuentra el artículo que buscas</p>
                    <form>
                        <input type="text" name="search"/>
                        <input className="btn btn-success" type="submit" name="submit" value="Buscar"/>
                    </form>
                </div>
            </aside>
        </>
    }    
}