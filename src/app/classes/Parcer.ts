import { Token } from "../classes/Token";
import { ErrorSintactico } from "../classes/ErrorSintactico";
export class Parcer{
    error:boolean = false
    indice:number = 0
    listaToken:Token[] = []
    preanalisis:Token = null
    errores:ErrorSintactico[] = []
    rep:number = 0;

    getErrSin(){
        return this.errores
    }
    Parcer(listaToken:Token[]){
        this.indice = 0
        this.listaToken = listaToken
        this.preanalisis = this.listaToken[this.indice]
        this.inicio()
    }
    inicio(){
        if(this.preanalisis.getToken() == "prClass"){
            this.Parea("prClass");
            this.Parea("identificador")
            this.Parea("sLlaveIzq")
            this.interiorClase()
            this.Parea("sLlaveDer")
        }else{
            this.error = true;
            var error = "Error sintáctico, se esperaba [ class ] en vez de " + "[" + this.preanalisis.getToken() + "]"
            console.log(error)
            this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
        }
    }

    interiorClase(){
        if(this.preanalisis.getToken() == "prInt" || this.preanalisis.getToken() == "prFloat" || this.preanalisis.getToken() == "prChar" || this.preanalisis.getToken() == "prString" ||
        this.preanalisis.getToken() == "prBool" || this.preanalisis.getToken() == "prDouble"  ){

            if(this.listaToken[this.indice + 2 ].getToken() == "sParentesisIzq"){
                this.metodo()
                this.interiorClase()
            }else{
                this.declaracion()
                this.interiorClase()
            }
            
        }else if(this.preanalisis.getToken() == "prVoid"){
            this.metodo()
            this.interiorClase()
        }else{
            //epsilon
        }
    }

    declaracion(){
     
            this.tipoVariable()
            this.Parea("identificador")
            this.listaId()
            this.Parea("sPuntoyComa")
 
    }

    metodo(){

            this.tipoMetodo()
            this.Parea("identificador")
            this.Parea("sParentesisIzq")
            this.argumentos()
            this.Parea("sParentesisDer")
            this.Parea("sLlaveIzq")
            this.interiorMetodo()
            this.Parea("sLlaveDer")
  
    }

    listaId(){
        if(this.preanalisis.getToken() == "sComa"){
            this.Parea("sComa")
            this.Parea("identificador")
            this.listaId()
        }else if(this.preanalisis.getToken() == "sIgual"){
            this.asignacion()
            this.listaId()
        }else{
            //epsilon
        }
    }

    asignacion(){
        this.Parea("sIgual")
        this.valores()
    }

    valores(){
        if(this.preanalisis.getToken() == "numero" || this.preanalisis.getToken() == "identificador" ||
        this.preanalisis.getToken() == "cadena" || this.preanalisis.getToken() == "sParentesisIzq" ||
         this.preanalisis.getToken() == "caracter"){
            this.valor();
            this.operacion()
        }else if(this.preanalisis.getToken() == "prTrue" || this.preanalisis.getToken() == "prFalse"){
            this.valorTrueFalse()
        }else{
            this.error = true;
            var error = "Error sintáctico, se esperaba [true, false, numero, cadena, identificador o ( ] en vez de " + "[" + this.preanalisis.getToken() + "]"
            console.log(error)
            this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
        }
    }

    valor(){
        if(this.preanalisis.getToken() == "numero"){
            this.Parea("numero")
        }else if(this.preanalisis.getToken() == "cadena"){
            this.Parea("cadena")
        }else if(this.preanalisis.getToken() == "identificador" && this.listaToken[this.indice + 1].getToken() == "sParentesisIzq"){
            this.llamadaMetodo()
        }else if(this.preanalisis.getToken() == "identificador"){
            this.Parea("identificador")
        }else if(this.preanalisis.getToken() == "sParentesisIzq"){
            this.agrupacion()
        }else if(this.preanalisis.getToken() == "caracter"){
            this.Parea("caracter")
        }else{
            this.error = true;
            var error = "Error sintáctico, se esperaba [ numero, cadena, identificador o ( ] en vez de " + "[" + this.preanalisis.getToken() + "]"
            console.log(error)
            this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
        }
    }

    valorTrueFalse(){
        if(this.preanalisis.getToken() == "prTrue"){
            this.Parea("prTrue")
        }else if(this.preanalisis.getToken() == "prFalse"){
            this.Parea("prFalse")
        }else{
            this.error = true;
            var error = "Error sintáctico, se esperaba [ true o false ] en vez de " + "[" + this.preanalisis.getToken() + "]"
            console.log(error)
            this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
        }
    }

    agrupacion(){
        this.Parea("sParentesisIzq")
        this.valor()
        this.operacion()
        this.Parea("sParentesisDer")
    }

    operacion(){
        if(this.preanalisis.getToken() == "sMas" || this.preanalisis.getToken() == "sMenos" ||
        this.preanalisis.getToken() == "sPor" || this.preanalisis.getToken() == "sDiagonal"){
            this.operadorAritmetico()
            this.valor()
            this.operacion()
        }else{
            //epsilon
        }
    }

    operadorAritmetico(){
        if(this.preanalisis.getToken() == "sMas"){
            this.Parea("sMas")
        }else if(this.preanalisis.getToken() == "sMenos"){
            this.Parea("sMenos")
        }else if(this.preanalisis.getToken() == "sPor"){
            this.Parea("sPor")
        }else if(this.preanalisis.getToken() == "sDiagonal"){
            this.Parea("sDiagonal")
        }else{
            this.error = true;
            var error = "Error sintáctico, se esperaba [ +, -, *, / ] en vez de " + "[" + this.preanalisis.getToken() + "]"
            console.log(error)
            this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
        }
    }
    tipoVariable(){
      
            if(this.preanalisis.getToken() == "prInt"){
                this.Parea("prInt")
            }else if(this.preanalisis.getToken() == "prFloat"){
                this.Parea("prFloat")
            }else if(this.preanalisis.getToken() == "prChar"){
                this.Parea("prChar")
            }else if(this.preanalisis.getToken() == "prString"){
                this.Parea("prString")
            }else if(this.preanalisis.getToken() == "prBool"){
                this.Parea("prBool")
            }else if(this.preanalisis.getToken() == "prDouble"){
                this.Parea("prDouble")
            }else {
                this.error = true;
                var error = "Error sintáctico, se esperaba [ int, float, char, bool, string o double ] en vez de " + "[" + this.preanalisis.getToken() + "]"
                console.log(error)
                this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
            }

        
    }
    interiorMetodo(){
        if(this.preanalisis.getToken() == "prInt" || this.preanalisis.getToken() == "prFloat" || this.preanalisis.getToken() == "prChar" || this.preanalisis.getToken() == "prString" ||
        this.preanalisis.getToken() == "prBool" || this.preanalisis.getToken() == "prDouble" ){
            this.declaracion()
            this.interiorMetodo()

        }else if(this.preanalisis.getToken() == "prIf" || this.preanalisis.getToken() == "prSwitch" ||
        this.preanalisis.getToken() == "prFor" || this.preanalisis.getToken() == "prWhile"|| this.preanalisis.getToken() == "prDo"){
            this.estructura()
            this.interiorMetodo()
        }else if(this.preanalisis.getToken() == "prConsole"){
            this.impresion()
            this.Parea("sPuntoyComa")
            this.interiorMetodo()
        }else if(this.preanalisis.getToken() == "identificador" && this.listaToken[this.indice + 1].getToken() != "sParentesisIzq"){
            this.Parea("identificador")
            this.asignacion()
            this.Parea("sPuntoyComa")
            this.interiorMetodo()

        }else if(this.preanalisis.getToken() == "prBreak" && this.rep > 0){

            this.Parea("prBreak")
            this.Parea("sPuntoyComa")
            this.interiorMetodo()
        }else if(this.preanalisis.getToken() == "identificador" && this.listaToken[this.indice + 1].getToken() == "sParentesisIzq"){
            this.llamadaMetodo()
            this.Parea("sPuntoyComa");
            this.interiorMetodo()
        }else if(this.preanalisis.getToken() == "prReturn"){
            this.Parea("prReturn")
            this.return()
            this.Parea("sPuntoyComa")
        }else{
            //epsilon
        }
    }

    return(){
        if(this.preanalisis.getToken() == "sParentesisIzq"|| this.listaToken[this.indice +1].getToken() == "sMas" ||
        this.listaToken[this.indice +1].getToken() == "sMenos" ||this.listaToken[this.indice +1].getToken() == "sPor" ||
        this.listaToken[this.indice +1].getToken() == "sDiagonal" || this.listaToken[this.indice+1].getToken() == "sPuntoyComa") {
            /*this.valor()
            this.operacion()*/
            this.valores()
        }else if(this.preanalisis.getToken() == "numero" || this.preanalisis.getToken() == "identificador" ||
        this.preanalisis.getToken() == "cadena" || this.preanalisis.getToken() == "sParentesisIzq" ||
         this.preanalisis.getToken() == "caracter"){
            this.condicion()
        }else if(this.preanalisis.getToken() == "prTrue" || this.preanalisis.getToken() == "prFalse"){
            this.valorTrueFalse()
        }else{
           // this.condicion()
        }
    }
//true/false en condiciones, return
/**return:= <condicion>
        |identificador <operacion>
        |<agrupacion> */
    interiorRepetitivo(){

        this.rep++;
        if(this.preanalisis.getToken() == "prInt" || this.preanalisis.getToken() == "prFloat" || this.preanalisis.getToken() == "prChar" || this.preanalisis.getToken() == "prString" ||
        this.preanalisis.getToken() == "prBool" || this.preanalisis.getToken() == "prDouble" ){
            this.declaracion()
            this.interiorMetodo()

        }else if(this.preanalisis.getToken() == "prIf" || this.preanalisis.getToken() == "prSwitch" ||
        this.preanalisis.getToken() == "prFor" || this.preanalisis.getToken() == "prWhile" || this.preanalisis.getToken() == "prDo"){
            this.estructura()
            this.interiorMetodo()
        }else if(this.preanalisis.getToken() == "prConsole"){
            this.impresion()
            this.Parea("sPuntoyComa")
            this.interiorMetodo()
        }else if(this.preanalisis.getToken() == "identificador" && this.listaToken[this.indice + 1].getToken() != "sParentesisIzq"){
            this.Parea("identificador")
            this.asignacion()
            this.Parea("sPuntoyComa")
            this.interiorMetodo()

        }else if(this.preanalisis.getToken() == "identificador" && this.listaToken[this.indice + 1].getToken() == "sParentesisIzq"){
            this.llamadaMetodo()
            this.Parea("sPuntoyComa")
            this.interiorMetodo()
        }else if(this.preanalisis.getToken() == "prBreak"){
            this.Parea("prBreak")
            this.Parea("sPuntoyComa")
            this.interiorRepetitivo()
        }else if(this.preanalisis.getToken() == "prContinue"){
            this.Parea("prContinue")
            this.interiorRepetitivo()
        }else if(this.preanalisis.getToken() == "prReturn"){
            this.Parea("prReturn")
            this.return()
            this.Parea("sPuntoyComa")
        }else{
            //epsilon
        }

        this.rep--;
    }

    impresion(){
        this.Parea("prConsole")
        this.Parea("sPunto")
        this.impresion2()
    }

    impresion2(){
        if(this.preanalisis.getToken() == "prWriteLine"){
            this.Parea("prWriteLine")
            this.Parea("sParentesisIzq")
            this.opcionesImpresion()
            this.Parea("sParentesisDer")
        }else if(this.preanalisis.getToken() == "prWrite"){
            this.Parea("prWrite")
            this.Parea("sParentesisIzq")
            this.opcionesImpresion()
            this.Parea("sParentesisDer")
        }else{
            this.error = true;
            var error = "Error sintáctico, se esperaba [ WriteLine o Write ] en vez de " + "[" + this.preanalisis.getToken() + "]"
            console.log(error)
            this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
        }


    }
    opcionesImpresion(){
        if(this.preanalisis.getToken() == "numero" || this.preanalisis.getToken() == "identificador" ||
        this.preanalisis.getToken() == "cadena" || this.preanalisis.getToken() == "sParentesisIzq" || 
        this.preanalisis.getToken() == "html"){
            this.cuerpoImpresion()
        }else{
            //epsilon
        }
    }

    cuerpoImpresion(){
        if(this.preanalisis.getToken() == "cadena"){
            this.Parea("cadena")
            this.concatenacion()
        }else if(this.preanalisis.getToken() == "html"){
            this.Parea("html")
            this.concatenacion();
        }else if(this.preanalisis.getToken() == "identificador" && this.listaToken[this.indice +1].getToken() == "sParentesisIzq"){
            this.llamadaMetodo()
            this.concatenacion()
        }else if(this.preanalisis.getToken() == "identificador"){
            this.Parea("identificador")
            this.concatenacion()
        }else if(this.preanalisis.getToken() == "numero"){
            this.Parea("numero")
            this.concatenacion()
        }else if(this.preanalisis.getToken() == "sParentesisIzq"){
            this.agrupacion()
            this.operacion()
            this.concatenacion()
        }else{
            this.error = true;
            var error = "Error sintáctico, se esperaba [ cadena, identificador, numero o (   ] en vez de " + "[" + this.preanalisis.getToken() + "]"
            console.log(error)
            this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
        }
    }

    concatenacion(){
        if(this.preanalisis.getToken() == "sMas"){
            this.Parea("sMas")
            this.cuerpoImpresion()
        }else{
            //epsilon

        }
    }
    estructura(){
        if(this.preanalisis.getToken() == "prIf"){
            this.estructuraIf()
            this.estructuraElse()
        }else if(this.preanalisis.getToken() == "prSwitch"){
            this.estructuraSwitch()
        }else if(this.preanalisis.getToken() == "prFor"){
            this.estructuraFor()
        }else if(this.preanalisis.getToken() == "prWhile"){
            this.estructuraWhile()
        }else if(this.preanalisis.getToken() == "prDo"){
            this.estructuraDo()
        }else{
            this.error = true;
            var error = "Error sintáctico, se esperaba [ if, switch, do, for o while   ] en vez de " + "[" + this.preanalisis.getToken() + "]"
            console.log(error)
            this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
        }
    }

    estructuraDo(){
        this.Parea("prDo")
        this.Parea("sLlaveIzq")
        this.interiorRepetitivo()
        this.Parea("sLlaveDer")
        this.Parea("prWhile")
        this.Parea("sParentesisIzq")
        this.condicion()
        this.Parea("sParentesisDer")
        this.Parea("sPuntoyComa")

    }
    estructuraIf(){
        this.Parea("prIf")
        this.Parea("sParentesisIzq")
        this.condicion()
        this.Parea("sParentesisDer")
        this.Parea("sLlaveIzq")
        this.interiorMetodo()
        this.Parea("sLlaveDer")
    }



    estructuraSwitch(){
//switch := switch sParentesisIzq identificador sParentesisDer sLlaveIzq <cuerpoSwitch> sLlaveDer

        this.Parea("prSwitch")
        this.Parea("sParentesisIzq")
        this.Parea("identificador")
        this.Parea("sParentesisDer")
        this.Parea("sLlaveIzq")
        this.cuerpoSwitch()
        this.Parea("sLlaveDer")
    }

    cuerpoSwitch(){
        if(this.preanalisis.getToken() == "prCase"){
            this.Parea("prCase")
            this.valor()
            this.Parea("sDosPuntos")
            this.interiorMetodo()
            this.break()
           
            this.cuerpoSwitch()
        }else if(this.preanalisis.getToken() == "prDefault"){
            this.Parea("prDefault")
            this.Parea("sDosPuntos")
            this.interiorMetodo()
            this.break()
            this.cuerpoSwitch2()
        }else{
            //epsilon
        }
    }
/*cuerpoSwitch := case <valor> sDosPuntos <interior> break sPuntoyComa <cuerpoSwitch>
                |default sDosPuntos <interior> break sPuntoyComa <cuerpoSwitch2>
                |epsilon

cuerpoSwitch2 := case <valor> sDosPuntos <interior> break sPuntoyComa <cuerpoSwitch2>
                |epsilon
 */

    break(){
        if(this.preanalisis.getToken() == "prBreak"){
            this.Parea("prBreak")
            this.Parea("sPuntoyComa")
        }else{
            //epsilon
        }
    }
    cuerpoSwitch2(){
        if(this.preanalisis.getToken() == "prCase"){
            this.Parea("prCase")
            this.valor()
            this.Parea("sDosPuntos")
            this.interiorMetodo()
            this.break()
        
            this.cuerpoSwitch2()
        }else{
            //epsilon
        }
    }


    estructuraFor(){
//for := for sParentesisIzq <cuerpoFor> sParentesisDer sLlaveIzq <interior> sLlaveDer
        this.Parea("prFor")
        this.Parea("sParentesisIzq")
        this.condicionFor()
        this.Parea("sParentesisDer")
        this.Parea("sLlaveIzq")
        this.interiorRepetitivo()
        this.Parea("sLlaveDer")
    }

    condicionFor(){
//cuerpoFor := <declaracion> sPuntoyComa <condicion> sPuntoyComa <indec>

        this.declaracion()
       // this.Parea("sPuntoyComa")
        this.condicion()
        this.Parea("sPuntoyComa")
        this.indec()
    }

    indec(){
        this.Parea("identificador")
        this.operadorIndec()
    }

    operadorIndec(){
        if(this.preanalisis.getToken() == "sMas"){
            this.Parea("sMas")
            this.Parea("sMas")
        }else if(this.preanalisis.getToken() == "sMenos"){
            this.Parea("sMenos")
            this.Parea("sMenos")
        }else{
            this.error = true;
            var error = "Error sintáctico, se esperaba [ + o - ] en vez de " + "[" + this.preanalisis.getToken() + "]"
            console.log(error)
            this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
        }
    }
/*indec:= identificador <operadorInDec>
operadorInDec := sMas sMas
	          |sMenos sMenos*/ 
    estructuraWhile(){
        this.Parea("prWhile")
        this.Parea("sParentesisIzq")
        this.condicion()
        this.Parea("sParentesisDer")
        this.Parea("sLlaveIzq")
        this.interiorRepetitivo()
        this.Parea("sLlaveDer")
    }

    estructuraElse(){
        if(this.preanalisis.getToken() == "prElse"){
            this.Parea("prElse")
            this.estructuraElseIf()
        }else{
            //epsilon
        }
    }

    estructuraElseIf(){
        if(this.preanalisis.getToken() == "prIf"){
            this.estructuraIf()
        }else if(this.preanalisis.getToken() == "sLlaveIzq"){
            this.Parea("sLlaveIzq")
            this.interiorMetodo()
            this.Parea("sLlaveDer")
        }else{
            this.error = true;
            var error = "Error sintáctico, se esperaba [ if o {  ] en vez de " + "[" + this.preanalisis.getToken() + "]"
            console.log(error)
            this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
        }
    }

    condicion(){

        if(this.preanalisis.getToken() == "identificador" && this.listaToken[this.indice +1].getToken() == "sParentesisDer"){
            this.Parea("identificador")
        }else if(this.preanalisis.getToken() == "identificador" && this.listaToken[this.indice + 1].getToken() == "sParentesisIzq"){
            this.llamadaMetodo()
            this.listaCondicion()
        }else if(this.preanalisis.getToken() == "prTrue" || this.preanalisis.getToken() == "prFalse"){
            this.valorTrueFalse()
        }else{
            this.valor()
            this.condicional()
            this.valor()
            this.listaCondicion()
        }
    }

    listaCondicion(){
        if(this.preanalisis.getToken() == "sOr" || this.preanalisis.getToken() == "sAnd"){
            this.orAnd()
            this.condicion()
        }else{
            //epsilon
        }
    }

    condicional(){
        if(this.preanalisis.getToken() == "sMenor"){
            this.Parea("sMenor")
            this.igual()
        }else if(this.preanalisis.getToken() == "sMayor"){
            this.Parea("sMayor")
            this.igual()
        }else if(this.preanalisis.getToken() == "sIgual"){
            this.Parea("sIgual")
            this.Parea("sIgual")
        }else if(this.preanalisis.getToken() == "sNot"){
            this.Parea("sNot")
            this.Parea("sIgual")
        }else{
            this.error = true;
            var error = "Error sintáctico, se esperaba [ <, >, = o ! ] en vez de " + "[" + this.preanalisis.getToken() + "]"
            console.log(error)
            this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
        }
    }


    igual(){
        if(this.preanalisis.getToken() == "sIgual"){
            this.Parea("sIgual")
        }else{
            //epsilon
        }
     
    }

    orAnd(){
        if(this.preanalisis.getToken() == "sOr"){
            this.Parea("sOr")
            this.Parea("sOr")
        }else if(this.preanalisis.getToken() == "sAnd"){
            this.Parea("sAnd")
            this.Parea("sAnd")
        }else{
            this.error = true;
            var error = "Error sintáctico, se esperaba [ | o & ] en vez de " + "[" + this.preanalisis.getToken() + "]"
            console.log(error)
            this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
        }
    }

    llamadaMetodo(){
        //llamarMetodo:= identificador sParentesisIzq <listaIdMetodo> sParentesisDer sPuntoyComa
        this.Parea("identificador")
        this.Parea("sParentesisIzq")
        this.listaIdMetodo()
        this.Parea("sParentesisDer")
        //this.Parea("sPuntoyComa")

    }

    listaIdMetodo(){
        if(this.preanalisis.getToken() == "identificador"){
            this.Parea("identificador")
            this.listaIdMetodo2()
        }else{
            //epsilon
        }
    }
    /*
listaIdMetodo:= identificador <listIdMetodo2>
               |epsilon

listaIdMetodo2:= sComa identificador <listaIdMetodo2>
		|epsilon               
*/
    listaIdMetodo2(){
        if(this.preanalisis.getToken()== "sComa"){
            this.Parea("sComa")
            this.Parea("identificador")
            this.listaIdMetodo2()
        }else{
            //epsilon
        }
    }
    argumentos(){
        if(this.preanalisis.getToken() == "prInt" || this.preanalisis.getToken() == "prFloat" || this.preanalisis.getToken() == "prChar" || this.preanalisis.getToken() == "prString" ||
        this.preanalisis.getToken() == "prBool" || this.preanalisis.getToken() == "prDouble" ){
            this.tipoVariable()
            this.Parea("identificador")
            this.listaVariables()
        }else{
            //epsilon
        }
    }

    listaVariables(){
        if(this.preanalisis.getToken() == "sComa"){
            this.Parea("sComa")
            this.tipoVariable()
            this.Parea("identificador")
            this.listaVariables()
        }else{
            //epsilon
        }
    }

    tipoMetodo(){
        if(this.preanalisis.getToken() == "prInt"){
            this.Parea("prInt");
        }else if(this.preanalisis.getToken() == "prFloat"){
            this.Parea("prFloat")
        }else if(this.preanalisis.getToken() == "prDouble"){
            this.Parea("prDouble")
        }else if(this.preanalisis.getToken() == "prChar"){
            this.Parea("prChar")
        }else if(this.preanalisis.getToken() == "prVoid"){
            this.Parea("prVoid")
        }else if(this.preanalisis.getToken() == "prBool"){
            this.Parea("prBool")
        }else if(this.preanalisis.getToken() == "prString"){
            this.Parea("prString")
        }else{

            this.error = true;
            var error = "Error sintáctico, se esperaba [ int o double o char o  bool o String ] en vez de " + "[" + this.preanalisis.getToken() + "]"
            console.log(error)
            this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
            
        }
    }
    Parea(token:string){
        if(this.error){
            if(this.indice < this.listaToken.length -1){
                do{
                    this.indice++
                    this.preanalisis = this.listaToken[this.indice]

                }while(this.preanalisis.getToken() == "comentario" || this.preanalisis.getToken() == "comentarioML");

                if(this.preanalisis.getToken() == "sPuntoyComa"){
                    this.error = false;
                }
            }
        }else{
            if(this.indice < this.listaToken.length -1){
                if(token == this.preanalisis.getToken()){
                    do{
                        this.indice++
                        this.preanalisis = this.listaToken[this.indice]
    
                    }while(this.preanalisis.getToken() == "comentario" || this.preanalisis.getToken() == "comentarioML");
                }else{
                    var error = "Error sintáctico, se esperaba: ["+token+"] en vez de ["+this.preanalisis.getToken()+"]"
                    this.error = true
                    console.log(error)
                    this.errores.push(new ErrorSintactico(error, this.preanalisis.getLexema(), this.preanalisis.getFila(), this.preanalisis.getColumna()))
                }
            }

        }
    }
}