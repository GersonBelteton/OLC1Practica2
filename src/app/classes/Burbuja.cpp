

burbuja(){

    for(int i = 1; i < tamano; i++){//bucle hasta tamano

        for(int j = 0; j < tamano-1; j++){//bucle hasta tamano-1

            if(lista[j] > lista[j+1]){//constante = 1

                aux = lista[j]; //constante = 1
                lista[j] = lista[j+1];//constante = 1
                lista[j+1] = aux;//constante = 1
            }
        }
    }

    //Complejidad

    //tamano = n
    //T(n) = 4(n-1)(n)
    //T(n) = (4n-4)(n)
    //T(n) = (4n^2-4n)

    //O(n^2)

}