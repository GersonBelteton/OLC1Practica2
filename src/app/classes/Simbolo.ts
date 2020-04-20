export class Simbolo{



    tipo:string
    identificador:string
    fila:number


    constructor(tipo:string, identificador:string, fila:number){
        this.tipo = tipo
        this.identificador = identificador
        this.fila = fila
    }

    getTipo(){
        return this.tipo
    }
    getIdentificador(){
        return this.identificador
    }
    getFila(){
        return this.fila
    }

    setTipo(tipo:string){
        this.tipo = tipo
    }
    setIdentificador(identificador:string){
        this.identificador = identificador
    }
    setFila(fila:number){
        this.fila = fila
    }






}