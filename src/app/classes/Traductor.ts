import { Token } from "../classes/Token";
import { ɵangular_packages_core_testing_testing_a } from '@angular/core/testing'
import { Simbolo } from "../classes/Simbolo";
export class Traductor{

    entrada:Token[] = []
    salida:Token[] = []
    listaId:string[]=[]
    simbolos:Simbolo[] = []
    exprecion:string =""
    tipo:string = ""
    preanalisis:Token 
    indice:number = 0;
    contadorIdentacion:number = 0;
    contadorLlaveSwitch:number = 0;
    produccion:string=""
    produccion2:string=""
    identacion:string=""
    valorSwitch:string =""
    dentroSwitch:boolean = false
    dentroDoWhile:boolean = false
    numCase:number = 0

    agregarSimbolo(tipo:string, id:string, fila:number){
        this.simbolos.push(new Simbolo(tipo, id, fila))
    }


    traducir(entrada:Token[]){

        for(var i = 0; i < entrada.length; i++){

            this.preanalisis = entrada[this.indice]
            console.log(this.preanalisis.getToken())

            if (this.preanalisis.getToken() == "prInt" || this.preanalisis.getToken() == "prDouble" ||
                    this.preanalisis.getToken() == "prBool" || this.preanalisis.getToken() == "prString" ||
                    this.preanalisis.getToken() == "prChar" || this.preanalisis.getToken() == "prVoid" || this.produccion == "declaracion")
                {
                    this.produccion = "declaracion"
                    if(this.tipo == ""){
                        this.tipo = this.preanalisis.getLexema()
                    }
                    if((this.preanalisis.getToken() == "identificador" && entrada[this.indice +1].getToken() == "sIgual" && this.produccion2 != "declaracion-listaId") ||
                    this.produccion2 == "declaracion-asignacion"){
                        this.produccion2 = "declaracion-asignacion"

                        if(this.preanalisis.getToken() == "identificador" && entrada[this.indice +1].getToken() == "sIgual"){
                            this.agregarToken("", "var ")
                            this.agregarToken( this.preanalisis.getToken() , this.preanalisis.getLexema());
                            this.agregarSimbolo(this.tipo, this.preanalisis.getLexema(), this.preanalisis.getFila())
                         //   agregarSimbolo(preanalisis.getLexema(), this.entrada[indice + 2].getLexema());
                        }else if (this.preanalisis.getToken()=="sPuntoyComa")
                        {
                            this.tipo = ""
                            this.agregarToken("", "\n" + this.identacion);
                            this.produccion = "";
                            this.produccion2 = "";
                        }
                        else if (this.preanalisis.getToken()=="sComa")
                        {
                            this.agregarToken("", "\n" + this.identacion);
                        }else if(this.preanalisis.getToken() == "cadena"){
                            this.agregarToken("", "\""+this.preanalisis.getLexema()+"\"")
                        }
                        else
                        {

                            this.agregarToken(this.preanalisis.getToken(), this.preanalisis.getLexema());
                        }
                    }else if(((this.preanalisis.getToken() == "identificador" && entrada[this.indice +1].getToken() == "sComa")||this.produccion2 == "declaracion-listaId")&&this.produccion2 != "declaracion-metodo"){
                        console.log("if id - coma")
                        this.produccion2 = "declaracion-listaId"
                     
                        if(this.preanalisis.getToken() == "identificador" && entrada[this.indice +1].getToken() == "sComa"){
                            this.listaId.push(this.preanalisis.getLexema())
                        }else if(this.preanalisis.getToken() == "identificador" && entrada[this.indice+1].getToken() == "sIgual"){
                            this.listaId.push(this.preanalisis.getLexema())
                         
                        }else if(this.preanalisis.getToken() == "identificador" && entrada[this.indice+1].getToken() == "sPuntoyComa" && entrada[this.indice-1].getToken() == "sComa"){
                            this.listaId.push(this.preanalisis.getLexema())
                         
                        }else if(this.preanalisis.getToken()== "sIgual"){
                            this.exprecion += this.preanalisis.getLexema()
                        }else if(this.preanalisis.getToken() == "sComa"){

                        }else if(this.preanalisis.getToken() == "sPuntoyComa"){
                            for(var j = 0; j < this.listaId.length; j++){
                                this.agregarToken("", "var "+this.listaId[j]+this.exprecion+"\n" + this.identacion)
                                this.agregarSimbolo(this.tipo, this.listaId[j], this.preanalisis.getFila())
                            }
                            this.tipo = ""
                            this.exprecion = "";
                            this.listaId = []
                            this.agregarToken("", "\n" + this.identacion);
                            this.produccion = "";
                            this.produccion2 = "";
                        }else if(this.preanalisis.getToken() == "cadena"){
                            this.exprecion += "\""+this.preanalisis.getLexema()+"\""
                        }else {
                            this.exprecion += this.preanalisis.getLexema()
                        }

                    }else if((this.preanalisis.getToken() == "identificador" && entrada[this.indice+1].getToken()== "sParentesisIzq")||this.produccion2 == "declaracion-metodo"){
                        this.produccion2 = "declaracion-metodo"
                        this.tipo = ""
                        if(this.preanalisis.getToken() == "identificador" && entrada[this.indice+1].getToken() == "sParentesisIzq"){
                            this.agregarToken("", "def ")
                            this.agregarToken("", this.preanalisis.getLexema())
                        }else if(this.preanalisis.getToken() == "prInt" || this.preanalisis.getToken() == "prDouble" ||
                        this.preanalisis.getToken() == "prBool" || this.preanalisis.getToken() == "prString" ||
                        this.preanalisis.getToken() == "prChar" || this.preanalisis.getToken() == "prFloat" ){
                            //this.agregarToken("", "var ")

                        }else if(this.preanalisis.getToken() == "sLlaveIzq"){
                            this.contadorIdentacion++
                            this.identar(this.contadorIdentacion)
                            this.agregarToken("", ":\n"+this.identacion)
                            this.produccion2 =""
                            this.produccion = ""


                        }else{
                            this.agregarToken(this.preanalisis.getToken(), this.preanalisis.getLexema())
                        }
                        
                    }

                }else if((this.preanalisis.getToken() == "identificador" && entrada[this.indice+1].getToken() == "sIgual" &&
                 entrada[this.indice+2].getToken() != "sIgual")|| this.produccion=="asignacion"){
                    this.produccion = "asignacion"

                    if(this.preanalisis.getToken() == "sPuntoyComa"){
                        this.agregarToken("", "\n" + this.identacion);
                        this.produccion = "";
                        this.produccion2 = "";
                    }else if(this.preanalisis.getToken() == "cadena"){
                        this.agregarToken("", "\""+this.preanalisis.getLexema()+"\"")
                    }else{
                        this.agregarToken(this.preanalisis.getToken(), this.preanalisis.getLexema())
                    }


                }else if(this.produccion == "llamada-metodo" || (this.preanalisis.getToken() == "identificador" && entrada[this.indice+1].getToken() == "sParentesisIzq")){
                    this.produccion = "llamada-metodo"

                    if(this.preanalisis.getToken() == "sPuntoyComa"){
                        this.agregarToken("", "\n" + this.identacion);
                        this.produccion = "";
                        this.produccion2 = "";
                    }else{
                        this.agregarToken(this.preanalisis.getToken(), this.preanalisis.getLexema())
                    }
                }else if(this.preanalisis.getToken() == "prConsole" || this.produccion == "impresion"){
                    this.produccion = "impresion"

                    if(this.preanalisis.getToken() == "prConsole"){
                        this.agregarToken("", "print")

                    }else if(this.preanalisis.getToken() == "sPunto"){

                    }else if(this.preanalisis.getToken()== "prWrite" || this.preanalisis.getToken() == "prWriteLine"){

                    }else if(this.preanalisis.getToken() == "cadena"){
                        this.agregarToken(this.preanalisis.getToken(), "\""+this.preanalisis.getLexema()+"\"")
                    }else if(this.preanalisis.getToken() == "html"){
                        this.agregarToken(this.preanalisis.getToken(), "'"+this.preanalisis.getLexema()+"'")
                    }else if(this.preanalisis.getToken() == "sPuntoyComa"){
                        this.agregarToken("", "\n" + this.identacion);
                        this.produccion = "";
                        this.produccion2 = "";
                    }else{
                        this.agregarToken(this.preanalisis.getToken(), this.preanalisis.getLexema())
                    }
                }else if(this.preanalisis.getToken() == "prIf" || this.produccion == "if"){
                    this.produccion = "if"

                    if(this.preanalisis.getToken() == "sParentesisIzq"){
                        this.agregarToken("", " ")
                    }else if(this.preanalisis.getToken() == "sParentesisDer"){
                        this.agregarToken("", " ")
                    }else if(this.preanalisis.getToken() == "sOr" && entrada[this.indice+1].getToken() == "sOr"){
                        this.agregarToken("", " or ")
                    }else if(this.preanalisis.getToken() == "sOr" && entrada[this.indice+1].getToken() != "sOr"){
                    
                    }else if(this.preanalisis.getToken() == "sAnd" && entrada[this.indice+1].getToken() == "sAnd"){
                        this.agregarToken("", " and ")
                    }else if(this.preanalisis.getToken() == "sAnd" && entrada[this.indice+1].getToken() != "sAnd"){
                        
                    }else if(this.preanalisis.getToken() == "sLlaveIzq"){
                        this.contadorIdentacion++
                        this.identar(this.contadorIdentacion)
                        this.agregarToken("", ":\n"+this.identacion)
                        this.produccion2 =""
                        this.produccion = ""
                    }else{
                        this.agregarToken(this.preanalisis.getToken(), this.preanalisis.getLexema())
                    }
                }else if( this.preanalisis.getToken() == "prElse" || this.produccion == "else"){
                    this.produccion = "else"
                    if(this.preanalisis.getToken() == "prElse" && entrada[this.indice+1].getToken() == "prIf"){
                        this.agregarToken("", "el")
                    }else if(this.preanalisis.getToken() == "sParentesisIzq"){
                        this.agregarToken("", " ")
                    }else if(this.preanalisis.getToken() == "sParentesisDer"){
                        this.agregarToken("", " ")
                    }else if(this.preanalisis.getToken() == "sOr" && entrada[this.indice+1].getToken() == "sOr"){
                        this.agregarToken("", " or ")
                    }else if(this.preanalisis.getToken() == "sOr" && entrada[this.indice+1].getToken() != "sOr"){
                    
                    }else if(this.preanalisis.getToken() == "sAnd" && entrada[this.indice+1].getToken() == "sAnd"){
                        this.agregarToken("", " and ")
                    }else if(this.preanalisis.getToken() == "sAnd" && entrada[this.indice+1].getToken() != "sAnd"){
                        
                    }else if(this.preanalisis.getToken() == "sLlaveIzq"){
                        this.contadorIdentacion++
                        this.identar(this.contadorIdentacion)
                        this.agregarToken("", ":\n"+this.identacion)
                        this.produccion2 =""
                        this.produccion = ""
                    }else{
                        this.agregarToken(this.preanalisis.getToken(), this.preanalisis.getLexema())
                    }

                }else if(this.preanalisis.getToken() == "prWhile" || this.produccion == "while"){
                    this.produccion = "while"

                    if(this.preanalisis.getToken() == "sParentesisIzq"){
                        this.agregarToken("", " ")
                    }else if(this.preanalisis.getToken() == "sParentesisDer"){
                        this.agregarToken("", " ")
                    }else if(this.preanalisis.getToken() == "sOr" && entrada[this.indice+1].getToken() == "sOr"){
                        this.agregarToken("", " or ")
                    }else if(this.preanalisis.getToken() == "sOr" && entrada[this.indice+1].getToken() != "sOr"){
                    
                    }else if(this.preanalisis.getToken() == "sAnd" && entrada[this.indice+1].getToken() == "sAnd"){
                        this.agregarToken("", " and ")
                    }else if(this.preanalisis.getToken() == "sAnd" && entrada[this.indice+1].getToken() != "sAnd"){
                        
                    }else if(this.preanalisis.getToken() == "prWhile" && this.dentroDoWhile){
                        this.salida.pop()
                        this.agregarToken("", "if")
                    }else if(this.preanalisis.getToken() == "sPuntoyComa" && this.dentroDoWhile){
                        this.contadorIdentacion++
                        this.contadorIdentacion++
                        this.identar(this.contadorIdentacion)
                        this.agregarToken("", ":\n"+this.identacion)
                        this.contadorIdentacion--
                        this.contadorIdentacion--
                        this.identar(this.contadorIdentacion)
                        this.agregarToken("", "break\n"+this.identacion)
                        this.dentroDoWhile = false
                        this.produccion2 =""
                        this.produccion = ""
                    }else if(this.preanalisis.getToken() == "sLlaveIzq"){
                        this.contadorIdentacion++
                        this.identar(this.contadorIdentacion)
                        this.agregarToken("", ":\n"+this.identacion)
                        this.produccion2 =""
                        this.produccion = ""
                    }else{
                        this.agregarToken(this.preanalisis.getToken(), this.preanalisis.getLexema())
                    }
                }else if(this.preanalisis.getToken() == "prFor" || this.produccion == "for"){
                    this.produccion = "for"
                    var rangoIn:string = "" 
                    var rangoFin:string=""
                    this.agregarToken("", "for in range(")
                    while(this.preanalisis.getToken() != "sLlaveIzq"){


                        if(entrada[this.indice-1].getToken() == "sIgual" && rangoIn == ""){
                            while(this.preanalisis.getToken() != "sPuntoyComa"){

                                rangoIn += this.preanalisis.getLexema();

                                this.indice++;
                                i++
                                this.preanalisis = entrada[this.indice]

                            }

                        }

                        if((entrada[this.indice-1].getToken() == "sIgual" && (entrada[this.indice-2].getToken()== "sMenor" ||
                        entrada[this.indice-2].getToken() == "sMayor" || entrada[this.indice-2].getToken() == "sNot"))||
                        ((entrada[this.indice -1].getToken() == "sMenor" || entrada[this.indice-1].getToken() == "sMayor"||
                        entrada[this.indice-1].getToken() == "sNot")&&entrada[this.indice].getToken() != "sIgual" )){
                            while(this.preanalisis.getToken() != "sPuntoyComa"){

                                rangoFin += this.preanalisis.getLexema();

                                this.indice++;
                                i++
                                this.preanalisis = entrada[this.indice]

                            }
                        }


                        this.indice++;
                        i++
                        this.preanalisis = entrada[this.indice]
                    }

                    this.agregarToken("", rangoIn+",")
                    this.agregarToken("",rangoFin+"):")
                    this.contadorIdentacion++
                    this.identar(this.contadorIdentacion)
                    this.agregarToken("", "\n"+this.identacion)
                    this.produccion2 =""
                    this.produccion = ""


                }else if(this.preanalisis.getToken() == "prSwitch" || this.produccion == "switch"){
                    this.produccion = "switch"

                    if(this.preanalisis.getToken() == "prSwitch"){
                        this.agregarToken("","def switch(case,")
                    }else if (entrada[this.indice-1].getToken() == "sParentesisIzq")
                    {
                         this.valorSwitch= "";

                         while(this.preanalisis.getToken() != "sParentesisDer"){
                             
                            this.valorSwitch += this.preanalisis.getLexema()

                            this.indice++;
                            i++
                            this.preanalisis = entrada[this.indice]
                         }
               

      
                    }else if(this.preanalisis.getToken() == "sLlaveIzq"){
                        this.dentroSwitch = true;
                        this.agregarToken("", this.valorSwitch+"):");
                        
                        this.contadorIdentacion++
                        this.identar(this.contadorIdentacion)
                        this.agregarToken("", "\n"+this.identacion)
                        this.contadorIdentacion++
                        this.contadorLlaveSwitch = this.contadorIdentacion;
                        this.identar(this.contadorIdentacion)
                        this.agregarToken("", "switcher ={\n"+this.identacion)
                      
                        this.produccion2 =""
                        this.produccion = ""
                    }
                    /**
                    if (preanalisis.getToken().Equals("prSwitch"))
                    {
                        agregarToken(Token.tipo.prSwitch, "if");
                    }else if (preanalisis.getToken().Equals("identificador") && this.entrada[indice - 2].getToken().Equals("prSwitch"))
                    {
                        variableSwitch = preanalisis.getLexema();
                        agregarToken(Token.tipo.identificador, preanalisis.getLexema());
                    }

                    else if (preanalisis.getToken().Equals("sParentesisIzq"))
                    {

                        agregarToken(Token.tipo.nada, " ");
                    }else if (preanalisis.getToken().Equals("sParentesisDer"))
                    {
                        String valorSwitch = "";
                        for(int j = indice; valorSwitch == ""; j++)
                        {
                            if (this.entrada[j].getToken().Equals("prCase"))
                            {
                                valorSwitch = this.entrada[j + 1].getLexema();
                            }
                        }

                        agregarToken(Token.tipo.nada, "==" + valorSwitch);
                    }
                    else if (preanalisis.getToken().Equals("sLlaveIzq"))
                    {
                        
                        contadorIdentacion++;
                        identar(contadorIdentacion);
                        agregarToken(Token.tipo.sDosPuntos, ":\n" + identacion);
                        produccion = "";
                    } */

                }else if(this.preanalisis.getToken() == "prCase" || this.produccion == "case"){
                    this.produccion = "case"
                    
                   
                    var valorCase:string = ""
                    if(entrada[this.indice-1].getToken() == "prCase"){
                        this.numCase =  parseInt(entrada[this.indice].getLexema())
                        this.agregarToken("",this.preanalisis.getLexema())
                        this.agregarToken("", entrada[this.indice+1].getLexema())
                        this.produccion = ""
                    }else if(this.preanalisis.getToken() == "prCase" && entrada[this.indice-1].getToken() != "sLlaveIzq"){
                        this.salida.pop()
                        this.agregarToken("", ",\n"+this.identacion)



                    }


                    
                }else if(this.preanalisis.getToken() == "prDefault" || this.produccion == "default"){
                    this.produccion = "default"
                    var valorCase:string = ""
                    if(entrada[this.indice-1].getToken() == "prDefault"){
                        this.agregarToken("",(this.numCase+1)+":")
                        this.produccion = ""
                    }else if(this.preanalisis.getToken() == "prDefault" && entrada[this.indice-1].getToken() != "sLlaveIzq"){
                        this.salida.pop()
                        this.agregarToken("", ",\n"+this.identacion)



                    }


                }else if(this.preanalisis.getToken() == "prDo" || this.produccion == "do"){
                    this.produccion = "do"

                    if(this.preanalisis.getToken() == "prDo"){
                        this.agregarToken("", "while True ")
                        this.dentroDoWhile = true
                    }else if(this.preanalisis.getToken() == "sLlaveIzq"){
                        this.contadorIdentacion++
                        this.identar(this.contadorIdentacion)
                        this.agregarToken("", ":\n"+this.identacion)
                        this.produccion2 =""
                        this.produccion = ""
                    }
                
                }else if(this.preanalisis.getToken() == "prReturn" || this.produccion == "return"){
                    this.produccion = "return"

                    if(this.preanalisis.getToken() == "sPuntoyComa"){
                        this.agregarToken("", "\n" + this.identacion);
                        this.produccion = "";
                        this.produccion2 = "";
                    }else{
                        this.agregarToken(this.preanalisis.getToken(), this.preanalisis.getLexema())
                    }

                }else if(this.preanalisis.getToken() == "prBreak" || this.produccion == "break"){
                    this.produccion = "break"

                    if(this.preanalisis.getToken() == "sPuntoyComa"){
                        this.agregarToken("", "\n" + this.identacion);
                        this.produccion = "";
                        this.produccion2 = "";
                    }else{
                        this.agregarToken(this.preanalisis.getToken(), this.preanalisis.getLexema())
                    }

                }else if(this.preanalisis.getToken() == "prContinue" || this.produccion == "continue"){
                    this.produccion = "continue"

                    if(this.preanalisis.getToken() == "sPuntoyComa"){
                        this.agregarToken("", "\n" + this.identacion);
                        this.produccion = "";
                        this.produccion2 = "";
                    }else{
                        this.agregarToken(this.preanalisis.getToken(), this.preanalisis.getLexema())
                    }

                }else if(this.preanalisis.getToken() == "comentario" || this.preanalisis.getToken() == "comentarioML"){
                    if(this.preanalisis.getToken() == "comentario"){
                        this.agregarToken("","#"+this.preanalisis.getLexema()+"\n"+this.identacion)
                    }else if(this.preanalisis.getToken() == "comentarioML"){
                        this.agregarToken("","'''"+this.preanalisis.getLexema()+"'''\n"+this.identacion)
                    }


                }else if(this.preanalisis.getToken() == "sLlaveDer"){

                    if(this.dentroSwitch && this.contadorIdentacion == this.contadorLlaveSwitch){
                
                        this.dentroSwitch = false;
                        this.contadorIdentacion--
                        this.identar(this.contadorIdentacion)
                        this.agregarToken("", "\n"+this.identacion)
                        this.agregarToken("","\n"+this.identacion+"}")
                    }
                    this.contadorIdentacion--
                    this.identar(this.contadorIdentacion)
                    this.agregarToken("", "\n"+this.identacion)
                    this.produccion2 =""
                    this.produccion = ""
                }

                this.indice++
        }
        this.stringSalida()
        return this.salida
    }

    stringSalida(){
        var sal:string =""
        for(var i = 0; i < this.salida.length; i++){
            sal += this.salida[i].getLexema()
        }

        console.log(sal)

        return sal
    }

    mostrarListaSimbolos(){
        console.log("Tabla de simbolos")
        for(var i = 0; i < this.simbolos.length; i++){
            console.log(this.simbolos[i].getTipo()+this.simbolos[i].getIdentificador())
        }
    }
    agregarToken(token:string, lexema:string){
        this.salida.push(new Token(token, lexema,0,0))
    }

    identar(contador:number){
        this.identacion = "";
        for(var i = 0; i < contador; i++)
        {
           
            this.identacion = this.identacion + "\t";
        }
    }
}