import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.spatial import distance

def distanciaEuclidiana(datos):
    listaDatos=[]
    for i in range(0, len(datos.iloc[0])):
        listaDatos.append([int(datos.values[i,j]) for j in range(0,len(datos.columns))]) 
    dstEuclidiana=[]
    for i in range(0, len(listaDatos)):
        distancia=[]
        for j in range(0, len(listaDatos)):
            distancia.append(distance.euclidean(listaDatos[i], listaDatos[j]))
        dstEuclidiana.append(distancia)
    salida=[]
    salida.append(list(datos.columns))
    for fila in dstEuclidiana:
        aux=[]
        for elem in fila:
            aux.append(str((''.join(["%9.2f" % elem]))))
        salida.append(aux)
    return salida

def distanciaChebyshev(datos):
    listaDatos=[]
    for i in range(0, len(datos.iloc[0])):
        listaDatos.append([int(datos.values[i,j]) for j in range(0,len(datos.columns))]) 
    dstChebyshev=[]
    for i in range(0, len(listaDatos)):
        distancia=[]
        for j in range(0, len(listaDatos)):
            distancia.append(distance.chebyshev(listaDatos[i], listaDatos[j]))
        dstChebyshev.append(distancia)
    salida=[]
    salida.append(list(datos.columns))
    for fila in dstChebyshev:
        aux=[]
        for elem in fila:
            aux.append(str((''.join(["%9.2f" % elem]))))
        salida.append(aux)
    return salida

def distanciaManhattan(datos):
    listaDatos=[]
    for i in range(0, len(datos.iloc[0])):
        listaDatos.append([int(datos.values[i,j]) for j in range(0,len(datos.columns))]) 
    dstManhattan=[]
    for i in range(0, len(listaDatos)):
        distancia=[]
        for j in range(0, len(listaDatos)):
            distancia.append(distance.cityblock(listaDatos[i], listaDatos[j]))
        dstManhattan.append(distancia)
    salida=[]
    salida.append(list(datos.columns))
    for fila in dstManhattan:
        aux=[]
        for elem in fila:
            aux.append(str((''.join(["%9.2f" % elem]))))
        salida.append(aux)
    return salida

def distanciaMinkowski(datos):
    listaDatos=[]
    for i in range(0, len(datos.iloc[0])):
        listaDatos.append([int(datos.values[i,j]) for j in range(0,len(datos.columns))]) 
    dstMinkowski=[]
    for i in range(0, len(listaDatos)):
        distancia=[]
        for j in range(0, len(listaDatos)):
            distancia.append(distance.minkowski(listaDatos[i], listaDatos[j]))
        dstMinkowski.append(distancia)
    salida=[]
    salida.append(list(datos.columns))
    for fila in dstMinkowski:
        aux=[]
        for elem in fila:
            aux.append(str((''.join(["%9.2f" % elem]))))
        salida.append(aux)
    return salida
