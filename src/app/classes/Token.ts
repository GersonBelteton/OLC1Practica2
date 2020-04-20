export class Token{

    token:string;
    lexema:string;
    fila:number;
    columna:number;

    constructor(token:string, lexema:string, fila:number, columna:number){
        this.token = token
        this.lexema = lexema
        this.fila = fila
        this.columna = columna
        
    }

    getToken(){
        return this.token
    }

    getLexema(){
        return this.lexema
    }

    getFila(){
        return this.fila
    }

    getColumna(){
        return this.columna
    }

    setToken(token:string){
        this.token = token;
    }

    setLexema(lexema:string){
        this.lexema = lexema;
    }

    setFila(fila:number){
        this.fila = fila
    }

    setColumna(columna:number){
        this.columna = columna
    }



}