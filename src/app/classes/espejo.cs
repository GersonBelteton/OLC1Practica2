//pseudocodigo, combinacion de c++ y c#

void espejo(ArbolNodo a){

    ListaNodo l = inOrden(a.getRaiz())

    for(int i = 0; i < l.length; i++){
        insertar(n.getNumero(), raiz)
    }
}

Nodo insertar(int num, Nodo n)
{

	if (n == NULL) {
		n = new NodoJugador(nombre_);
		if (isEmpty()) {
			raiz = n;
		}
		
		//cout << "null";
	}
	else if (num < n.getNumero()) {
		//cout << "derecha";
		n->setDerecha(insertar(num, n->getDerecha()));
	}
	else if(num > n.getNumero()){
		//cout << "izquierda";
		n->setIzquierda(insertar(num, n->getIzquierda()));
	}
	else {
		// iguales 
		cout << "error, ya existe "<<endl;
	}
	return n ;
}



ListaNodo inOrden(Nodo n)
{

    lista = new lista();
	if (n != NULL) {
		inOrden(n->getIzquierda());
        lista.add(n)
		inOrden(n->getDerecha());
	}
    return lista
}




