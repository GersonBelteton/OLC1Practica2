import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { isNumber } from 'util';
import { Scanner} from "../../classes/Scanner";
import { Parcer } from "../../classes/Parcer";
import { Traductor } from "../../classes/Traductor";
import { Token } from "../../classes/Token";
import { ErrorLexico } from 'src/app/classes/ErrorLexico';
import { ErroresComponent } from "../errores/errores.component";
import {ErrorSintactico  } from "../../classes/ErrorSintactico";
@Component({
  selector: 'app-interf',
  templateUrl: './interf.component.html',
  styleUrls: ['./interf.component.css']
})
export class InterfComponent implements OnInit {

 

  texto;
  descripcion;
  archivo:File
  salida:string
  tokens:Token[]
  erroresL:ErrorLexico[] = []
  erroresS:ErrorSintactico[] = []
  html:string
  constructor() { }

  ngOnInit(): void {
    
  
  }


  buscarArchivo(e){
    console.log(e);
    this.archivo = e.target.files[0]
    console.log(this.archivo.text())
    this.archivo.text()
    console.log(e.target.result)
 
  }
  cargarArchivo(){
    console.log("cargar archivo")
  }
  traducir(texto:string){
    
    this.texto = texto;
    this.scannerL(texto);
  
  }

  scannerL(cadena:string){ 
    var s = new Scanner();
    s.analizar(cadena);
    this.tokens = s.getTokens()
    this.erroresL = s.getErrLex()
    this.html = s.getHtml()
  
    this.parcerL(this.tokens)
    this.traducirL(this.tokens)
  }

  parcerL(tokens:Token[]){
    var p = new Parcer()
    p.Parcer(tokens)    
    this.erroresS = p.getErrSin()

  }

  traducirL(tokens:Token[]){
    var t = new Traductor()
    t.traducir(tokens)
    t.mostrarListaSimbolos()
    this.salida = t.stringSalida()
    

  }
 

}

