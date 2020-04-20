import { Token } from "../classes/Token";
import { ErrorLexico } from "../classes/ErrorLexico";

export class Scanner{


    tokens:Token[] 
    errores:ErrorLexico[] = []
    cadenaAcumulada:string;
    fila:number
    columna:number
    estado:number
    cadenaHtml:string=""


    getHtml(){
        for(var i = 0; i < this.tokens.length; i++){

            if(this.tokens[i].getToken() == "html"){
                this.cadenaHtml += this.tokens[i].getLexema()+"\n"
            }
           
        }

        return this.cadenaHtml
    }
    getTokens(){
        return this.tokens
    }

    getErrLex(){
        return this.errores
    }
    agregarError(errores:ErrorLexico[], error:string){
        errores.push(new ErrorLexico(error, this.cadenaAcumulada, this.fila, this.columna))
    }
    agregarToken(tokens:Token[], token:string){
        
        tokens.push(new Token(token, this.cadenaAcumulada, this.fila, this.columna ));
        this.cadenaAcumulada = ""
        this.estado = 0
    }

    mostrarListaTok(){
        console.log("mostrarlistatok")
        for(var i = 0; i < this.tokens.length; i++){
            console.log(this.tokens[i].getToken()+" "+this.tokens[i].getLexema()+" "+this.tokens[i].getFila()+" "+this.tokens[i].getColumna());
        }
    }
    analizar(cadena:string){
        var tokens:Token[]
        var errores:ErrorLexico[]
        tokens = []
        errores = []
        this.fila = 1
        this.columna = 0     
        

        cadena = cadena + '#';
        console.log(cadena)
        var caracter = Array.from(cadena);
        this.cadenaAcumulada = "";
        this.estado = 0;
    
        for(var i = 0; i < cadena.length ; i++){
            this.columna++
            console.log(caracter[i])
          switch(this.estado){
            case 0:
              if(caracter[i]== ' ' || caracter[i]== '\n' || caracter[i] == '\t' || caracter[i] == '\r'){
                if (caracter[i] == '\n')
                {
                    this.columna = 0;
                    this.fila++;
                }
                this.estado = 0;
              }else if((cadena.charCodeAt(i) >= 65 && cadena.charCodeAt(i) <= 90 )||(cadena.charCodeAt(i) >= 97 && cadena.charCodeAt(i) <= 122 )){
                //letra
                this.cadenaAcumulada += caracter[i]
                this.estado = 1
               // console.log("letra"+caracter[i]);
              }else if(cadena.charCodeAt(i) >= 48 && cadena.charCodeAt(i) <= 57 ){
                //numero
                this.cadenaAcumulada += caracter[i]
                this.estado = 2
                //console.log("numero"+caracter[i]);
              }else if(caracter[i] == '"'){
                //cadena
                this.estado = 3
              }else if(caracter[i] == '\''){
                //caracter
                if(caracter[i+2] == '\''){
                    this.cadenaAcumulada  += caracter[i];
                    this.estado = 7;
                }else{
                    this.estado = 8
                }
             
              }else if(caracter[i] == '/'){
                this.estado = 4
              }else if(caracter[i] == ':'){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sDosPuntos")
              }else if(caracter[i] == ';'){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sPuntoyComa")
              }else if(caracter[i] == '{'){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sLlaveIzq")
              }else if(caracter[i] == '}'){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sLlaveDer")
              }else if(caracter[i] == '['){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sCorcheteIzq")
              }else if(caracter[i] == ']'){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sCorcheteDer")
              }else if(caracter[i] == '('){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sParentesisIzq")
              }else if(caracter[i] == ')'){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sParentesisDer")
              }else if(caracter[i] == '*'){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sPor")
              }else if(caracter[i] == ','){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sComa")
              }else if(caracter[i] == '='){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sIgual")
              }else if(caracter[i] == '+'){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sMas")
              }else if(caracter[i] == '>'){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sMayor")
              }else if(caracter[i] == '<'){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sMenor")
              }else if(caracter[i] == '-'){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sMenos")
              }else if(caracter[i] == '!'){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sNot")
              }else if(caracter[i] == '.'){
                this.cadenaAcumulada += caracter[i];
                this.agregarToken(tokens, "sPunto")
              }else if(caracter[i] == '|'){
                  this.cadenaAcumulada += caracter[i]
                  this.agregarToken(tokens, "sOr")
              }else if(caracter[i] == '&'){
                this.cadenaAcumulada += caracter[i]
                this.agregarToken(tokens, "sAnd")
              }/*else if(caracter[i] == '#'){
                  this.cadenaAcumulada += caracter[i]
                  this.agregarToken(tokens, "sNumeral")
              }*/else if(caracter[i] == '_'){
                  if((cadena.charCodeAt(i+1) >= 65 && cadena.charCodeAt(i+1) <= 90 )||(cadena.charCodeAt(i+1) >= 97 && cadena.charCodeAt(i+1) <= 122 )){
                    this.cadenaAcumulada += caracter[i]
                    this.estado = 1
                  }else{
                    this.cadenaAcumulada += caracter[i]
                    this.agregarToken(tokens, "sGuionBajo")
                  }
               
              }else{
                  console.log(i +"-"+cadena.length)
                if (caracter[i] == '#' && i >= cadena.length-1)
                {
                    console.log("final de la cadena");
                    this.tokens = tokens
                    this.errores = errores
                    this.mostrarListaTok()
                }
                else
                {
                    
                    this.cadenaAcumulada += caracter[i];
                    console.log("Error léxico con: " +  this.cadenaAcumulada + " fila"+this.fila+" columna"+ this.columna);
                    this.agregarError(errores, "Error léxico, simbolo no reconocido");
                   // agregarError(cadenaAcumulada, "Error lexico", fila, columna);
                    this.estado = 0;
                    this.cadenaAcumulada = "";

                }
              }
              break;
            case 1:

              
                if (caracter[i] == '_' ||(cadena.charCodeAt(i) >= 97 && cadena.charCodeAt(i) <= 122 ) || (cadena.charCodeAt(i) >= 65 && cadena.charCodeAt(i) <= 90 )||(cadena.charCodeAt(i) >= 48 && cadena.charCodeAt(i) <= 57 )) {
                    //letra-num
                    this.cadenaAcumulada += caracter[i];
                    this.estado = 1;
                    
                }else{
                    if(this.cadenaAcumulada == "args"){
                        this.agregarToken(tokens, "prArgs")
                        i--
                        this.columna--
                    } else if(this.cadenaAcumulada == "bool"){
                        this.agregarToken(tokens, "prBool")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "true"){
                        this.agregarToken(tokens, "prTrue")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "false"){
                        this.agregarToken(tokens, "prFalse")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "case"){
                        this.agregarToken(tokens, "prCase")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "char"){
                        this.agregarToken(tokens, "prChar")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "class"){
                        this.agregarToken(tokens, "prClass")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "Console"){
                        this.agregarToken(tokens, "prConsole")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "default"){
                        this.agregarToken(tokens, "prDefault")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "else"){
                        this.agregarToken(tokens, "prElse")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "float"){
                        this.agregarToken(tokens, "prFloat")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "for"){
                        this.agregarToken(tokens, "prFor")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "if"){
                        this.agregarToken(tokens, "prIf")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "int"){
                        this.agregarToken(tokens, "prInt")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "do"){
                        this.agregarToken(tokens, "prDo")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "Main"){
                        this.agregarToken(tokens, "prMain")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "new"){
                        this.agregarToken(tokens, "prNew")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "static"){
                        this.agregarToken(tokens, "prStatic")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "string"){
                        this.agregarToken(tokens, "prString")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "String"){
                        this.agregarToken(tokens, "prString")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "switch"){
                        this.agregarToken(tokens, "prSwitch")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "void"){
                        this.agregarToken(tokens, "prVoid")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "while"){
                        this.agregarToken(tokens, "prWhile")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "WriteLine"){
                        this.agregarToken(tokens, "prWriteLine")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "Write"){
                        this.agregarToken(tokens, "prWrite")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "double"){
                        this.agregarToken(tokens, "prDouble")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "break"){
                        this.agregarToken(tokens, "prBreak")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "return"){
                        this.agregarToken(tokens, "prReturn")
                        i--
                        this.columna--
                    }else if(this.cadenaAcumulada == "continue"){
                        this.agregarToken(tokens,"prContinue")
                        i--
                        this.columna--
                    }else{
                        this.agregarToken(tokens, "identificador")
                        i--
                        this.columna--
                    }
                }

            break;

            case 2:
                if ((cadena.charCodeAt(i) >= 48 && cadena.charCodeAt(i) <= 57 )||caracter[i] == '.')
                {
                    //numero
                    this.cadenaAcumulada += caracter[i];
                    this.estado = 2;
                }
                else
                {
                    //cadenaAcumulada += c[i];
                    this.agregarToken(tokens, "numero");
                    i--;
                    this.columna--;
                }
            break;

            case 3:
                if (caracter[i] == '"')
                {
                    this.agregarToken(tokens, "cadena");
                }
                else
                {
                    this.cadenaAcumulada += caracter[i];
                    this.estado = 3;
                }

            break;

            case 4:
                

                if(caracter[i] == '/')
                {
                    this.estado = 6;
                }else if (caracter[i] == '*')
                {
                    this.estado = 5;
                }
                else
                {

                    this.cadenaAcumulada += caracter[i-1];
                    this.agregarToken(tokens, "sDiagonal");
                    i--;
                    this.columna--;
                }
            break;

            case 5:
                if (caracter[i] == '*' && caracter[i+1] == '/')
                {
                    this.agregarToken(tokens, "comentarioML");
                    i++;
                }
                else
                {
                    this.cadenaAcumulada += caracter[i];
                    this.estado = 5;
                }

            break;

            case 6:
                if (caracter[i] == '\n')
                {
                    this.agregarToken(tokens, "comentario");
                }
                else
                {
                    this.cadenaAcumulada += caracter[i];
                    this.estado = 6;
                }
            break;

            case 7:
                if(caracter[i] == '\'')
                {
                    this.cadenaAcumulada += caracter[i];
                    this.agregarToken(tokens, "caracter");
                }
                else
                {
                    this.cadenaAcumulada += caracter[i];
                    this.estado = 7;
                }
            break;

            case 8:
                if (caracter[i] == '\'')
                {
                    this.agregarToken(tokens, "html");
                }
                else
                {
                    this.cadenaAcumulada += caracter[i];
                    this.estado = 8;
                }
            break;

          }
        }
      }
}