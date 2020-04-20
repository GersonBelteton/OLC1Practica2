export class ErrorLexico{
    private error:string
    private lexema:string
    private fila:number
    private columna:number
    constructor(error:string, lexema:string, fila:number, columna:number){
        this.error = error
        this.lexema = lexema
        this.fila = fila
        this.columna = columna
    }

    getError(){
        return this.error
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

    setError(error:string){
        this.error = error
              
    }
    setLexema(lexema:string){
        this.lexema = lexema
    }
    setFila(fila:number){
        this.fila = fila
    }
    setColumna(columna:number){
        this.columna = columna
    }
}