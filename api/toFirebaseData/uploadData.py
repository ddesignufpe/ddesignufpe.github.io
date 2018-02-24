# Script para o upload dos dados do cadeiras.json para o firebase
# By: Ítalo Sousa 

import requests
import json

arq = open('cadeiras.json', 'r', encoding='UTF-8')
cadeiras = arq.readline()
arq.close()

cadeirasDados = json.loads(cadeiras)

for cadeira in cadeirasDados:
    print(cadeira)
    r = requests.post('https://ddesign-3b3a1.firebaseio.com/cadeiras.json', data = json.dumps(cadeira))
    print(r)