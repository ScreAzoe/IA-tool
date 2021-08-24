import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import scipy.cluster.hierarchy as shc
import seaborn as sns
from kneed import KneeLocator
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics.pairwise import pairwise_distances_argmin_min
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances_argmin_min

def seleccion_atributos(datos):
    return list(datos.columns)

def clusteringJerarquico(datos, num_clusters, caracteristicas):
    #Línea para aceptar solo ciertos
    MatrizVariables= np.array(datos[caracteristicas])
    MJerarquico= AgglomerativeClustering(n_clusters=num_clusters, linkage='complete', affinity='euclidean')
    MJerarquico.fit_predict(MatrizVariables)
    datos['clusterH']= MJerarquico.labels_
    #Gráfica de dispersión
    plt.figure(figsize=(10,7))
    plt.scatter(MatrizVariables[:,0], MatrizVariables[:,1], c=MJerarquico.labels_, cmap='rainbow')
    plt.grid()
    plt.legend(loc="upper left")
    plt.savefig("./templates/temp/dispersion-jerarquico.png")
    plt.clf()
    x= datos.groupby(['clusterH'])['clusterH'].indices
    eje_x=[]
    eje_y=[]
    for i in range(0, len(x)):
        eje_x.append(i)
        eje_y.append(len(x[i]))
    plt.bar(eje_x, eje_y)
    plt.xlabel("Clúster")
    plt.ylabel("Elementos")
    plt.savefig("./templates/temp/barras-jerarquico.png")
    centroidesH=datos.groupby(['clusterH'])[caracteristicas].mean()
    return centroidesH.values.tolist() 

def clusteringParticional(datos, caracteristicas):
    MatrizVariables= np.array(datos[caracteristicas])
    SSE=[]
    for i in range(2,12):
        km= KMeans(n_clusters= i, random_state=0)
        km.fit(MatrizVariables)
        SSE.append(km.inertia_)
    
    
    plt.figure(figsize=(10,7))
    plt.plot(range(2,12), SSE, marker= 'o')
    plt.xlabel('Cantidad de clusters *k*')
    plt.ylabel('SSE')
    plt.title('Elbow Method')
    plt.savefig("./templates/temp/elbow-particional.png")
    k1= KneeLocator(range(2,12), SSE, curve='convex', direction= 'decreasing')
    
    MParticional= KMeans(n_clusters= k1.elbow , random_state= 0).fit(MatrizVariables)
    MParticional.predict(MatrizVariables)
    datos['clusterP'] = MParticional.labels_
    plt.clf()
    plt.figure(figsize=(10,7))
    plt.scatter(MatrizVariables[:,0], MatrizVariables[:,1], c= MParticional.labels_, cmap= 'rainbow')
    plt.savefig("./templates/temp/dispersion-particional.png")

    plt.clf()
    x= datos.groupby(['clusterP'])['clusterP'].indices
    eje_x=[]
    eje_y=[]
    for i in range(0, len(x)):
        eje_x.append(i)
        eje_y.append(len(x[i]))
    plt.bar(eje_x, eje_y)
    plt.xlabel("Clúster")
    plt.ylabel("Elementos")
    plt.savefig("./templates/temp/barras-particional.png")

    CentroidesP = MParticional.cluster_centers_
    return pd.DataFrame(CentroidesP.round(4), columns=[caracteristicas]).values.tolist()
