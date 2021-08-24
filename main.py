from tkinter import Tk
import eel
import sys
from abrirArchivo import abrirArchivo
from aprioriComponente import aprioriAlgoritmo
from distanciasComponente import distanciaChebyshev, distanciaEuclidiana, distanciaManhattan, distanciaMinkowski
from clusteringComponente import clusteringJerarquico, clusteringParticional, seleccion_atributos
import pandas as pd

sys.path.append("..")
eel.init('templates', )
eel.start('templates',host="0.0.0.0")

ruta=''
global datos

@eel.expose
def cargar():
    global ruta, datos
    ruta= abrirArchivo()
    if(ruta!=0):
        datos= pd.read_csv(ruta)
    return ruta

@eel.expose
def apriori(soporte, confianza, elevacion):
    global ruta
    return aprioriAlgoritmo(ruta, soporte, confianza, elevacion)

@eel.expose
def dstEuclidiana():
    return distanciaEuclidiana(datos)

@eel.expose
def dstChebyshev():
    return distanciaChebyshev(datos)

@eel.expose
def dstManhattan():
    return distanciaManhattan(datos)

@eel.expose
def dstMinkowski():
    return distanciaMinkowski(datos)

@eel.expose
def configuracion_cluster():
    return seleccion_atributos(datos)

@eel.expose
def clustering_jerarquico(num_cluster, caracteristicas):
    return clusteringJerarquico(datos, num_cluster, caracteristicas)
    
@eel.expose
def clustering_particional(caracteristicas):
    return clusteringParticional(datos, caracteristicas)


    

eel.start("index.html", size=(1000,600))

