
from tkinter import *
from tkinter import filedialog
import tkinter

def abrirArchivo():
    raiz= Tk()
    archivo= filedialog.askopenfile(title="Selecciona la fuente de datos", mode='r', filetypes=
    (("Archivos de valores separados por comas (*.csv)", "*.csv"),("Archivos de texto (*.txt)", "*.txt")))
    if(archivo!=None):
        nombre= archivo.name
        print(archivo.name)
        archivo.closed
        raiz.destroy()
        return nombre
    else:
        raiz.destroy()
        return 0
    


