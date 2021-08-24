import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from apyori import apriori

def aprioriAlgoritmo(ruta, soporte, confianza, elevacion):
    transacciones= pd.read_csv(ruta, header=None)
    transaccionesLista= []
    for i in range(0, len(transacciones[0])):
        transaccionesLista.append([str(transacciones.values[i,j]) for j in range(0,len(transacciones.columns))]) 
    ReglasC1= apriori(transaccionesLista, min_support= soporte, min_confidence= confianza, min_lift= elevacion, min_length=2)
    ResultadosC1 = list(ReglasC1)
    print(len(ResultadosC1))
    lista=[]
    for item in ResultadosC1:
        lista.append([str(list(item[2][0][0])),str(list(item[2][0][1])),str(item[1]),str(item[2][0][2]),str(item[2][0][3])]);
    print("Algoritmo apriori terminado con exito")
    return lista
    