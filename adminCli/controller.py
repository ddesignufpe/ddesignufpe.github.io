import requests
import json
from models import *

class AdminController():
    
    def __init__(self):
        self.__apiUrl = 'http://localhost:3000'
        self.__appToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1YWM1NGFhYmZlOGE4OTBjYTQ3YjAzNDgiLCJpYXQiOjE1NTQ0MTUxNDc3NTN9.crjvhqV9xvBKv42rUcFKCm_Bpw2GXySpUXH5MiTxjFo'
        self.__userToken = ''
        self.__headers = {'X-Access-Token': self.__appToken}
        self.__isAuth = False

    # SERVIÇOS 
    def login(self, email, senha):
        url = self.__apiUrl + '/auth/login'
        jsonData = {'email': email, 'senha': senha}
        response = requests.post(url, json=jsonData, headers=self.__headers)
        if response.status_code == 200:
            responseData = response.json()
            token = responseData['token'] 
            self.__userToken = token
            self.__headers['Authorization'] = token
            return True
        else:
            return False

    # USUARIOS
    def carregarUsuarios(self):
        url = url = self.__apiUrl + '/usuarios'
        response = requests.get(url, headers=self.__headers)
        if response.status_code == 200:
            responseData = response.json()
            dados = responseData['data']
            length = len(dados)
            
            usuarios = [None for x in range(length)]
            
            for i in range(length):
                usuarioId = dados[i]['_id']
                nome = dados[i]['nome']
                email = dados[i]['email']
                admin = dados[i]['admin']

                usuario = Usuario()
                usuario.loadUsuario(usuarioId, nome, email, admin)
                usuarios[i] = usuario
            return usuarios
        else:
            return False
    
    def inserirUsuario(self, nome, email, admin, senha):
        url = self.__apiUrl + '/usuarios/'
        
        usuario = Usuario()
        usuario.nome = nome
        usuario.email = email
        usuario.senha = senha
        admin = admin.lower()
        
        if admin == 'true':
            usuario.admin = True
        else:
            usuario.admin = False

        jsonData = usuario.getDados()
        response = requests.post(url, json=jsonData, headers=self.__headers)

        if response.status_code == 201:
            return True
        else: 
            return False

    def atualizarUsuario(self, usuario):
        url = self.__apiUrl + '/usuarios/' + usuario.id

        if type(usuario.admin) == str:
            usuario.admin.lower()

        jsonData = usuario.getDados()
        response = requests.put(url, json=jsonData, headers=self.__headers)
        if response.status_code == 200:
            return True
        else: 
            return False

    def removerUsuario(self, usuario):
        url = self.__apiUrl + '/usuarios/' + usuario.id
        response = requests.delete(url, headers=self.__headers)
        if response.status_code == 200:
            return True
        else:
            return False

    #Aplicativos
    def carregarAplicativos(self):
        url = url = self.__apiUrl + '/aplicativos'
        response = requests.get(url, headers=self.__headers)
        if response.status_code == 200:
            responseData = response.json()
            dados = responseData['data']
            length = len(dados)
            
            aplicativos = [None for x in range(length)]
            
            for i in range(length):
                appId = dados[i]['_id']
                emailAutor = dados[i]['emailAutor']
                nome = dados[i]['nome']
                appurl = dados[i]['url']
                token = dados[i]['token']

                aplicativo = Aplicativo()
                aplicativo.loadAplicativo(appId, nome, emailAutor, appurl, token)
                aplicativos[i] =  aplicativo
            return aplicativos
        else:
            return False

    def inserirAplicativo(self, nome, emailAutor, appurl):
        url = self.__apiUrl + '/aplicativos/'
        
        aplicativo = Aplicativo()
        aplicativo.nome = nome
        aplicativo.emailAutor = emailAutor
        aplicativo.url = appurl

        jsonData = aplicativo.getDados()
        response = requests.post(url, json=jsonData, headers=self.__headers)

        if response.status_code == 201:
            return True
        else: 
            return False

    def atualizarAplicativo(self, aplicativo):
        url = self.__apiUrl + '/aplicativos/' + aplicativo.appId

        jsonData = aplicativo.getDados()
        response = requests.put(url, json=jsonData, headers=self.__headers)
        if response.status_code == 200:
            return True
        else: 
            return False

    def removerAplicativo(self, aplicativo):
        url = self.__apiUrl + '/aplicativos/' + aplicativo.appId
        response = requests.delete(url, headers=self.__headers)
        if response.status_code == 200:
            return True
        else:
            return False        