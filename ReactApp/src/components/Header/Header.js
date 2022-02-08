import { Component } from "react";
import logo from './react.png'

export default class Header extends Component {
    render() {
        return <>
            <header id="header">
                <div className="center">
                    {/* Logo */}
                    <div id="logo">
                        <img src={logo} className="app-logo" alt="Logotipo"/>
                        <span id="brand">
                            <strong>Curso</strong>React
                        </span>
                    </div>
        
                    {/* Menu */}
                    <nav id="menu">
                        <ul>
                            <li>
                                <a href="index.html">Inicio</a>
                            </li>
                            <li>
                                <a href="blog.html">Blog</a>
                            </li>
                            <li>
                                <a href="formulario.html">Formulario</a>
                            </li>
                            <li>
                                <a href="index.html">Página 1</a>
                            </li>
                            <li>
                                <a href="index.html">Página 2</a>
                            </li>
                        </ul>
                    </nav>

                    {/* Limpiar flotados */}
                    <div className="clearfix"></div>
                </div>
            </header>
        </>
    }    
}