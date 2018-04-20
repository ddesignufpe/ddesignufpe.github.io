import requests

class Usuario():
    def __init__(self):
        self.id = ""
        self.nome = ""
        self.email = ""
        self.senha = ""
        self.admin = False        

    def getDados(self):
        dados = {
            'nome': self.nome,
            'email': self.email,
            'admin': self.admin
        }
        if self.senha != "":
            dados['senha'] = self.senha
        return dados

    def loadUsuario(self, usuarioId, nome, email, admin):
        self.id = usuarioId or self.id
        self.nome = nome or self.nome
        self.email = email or self.nome
        self.senha = admin or self.senha
        self.admin = admin or self.admin

class Aplicativo():
    def __init__(self):
        self.appId = ""
        self.emailAutor = ""
        self.nome = ""
        self.url = ""    
        self.token = ""   

    def getDados(self):
        dados = {
            'emailAutor': self.emailAutor,
            'nome': self.nome,
            'url': self.url
        }    
        if self.token != "":
            dados['token'] = self.token
        return dados

    def loadAplicativo(self, appId, nome, emailAutor, url, token):
        self.appId = appId or self.appId
        self.nome = nome or self.nome
        self.emailAutor = emailAutor or self.emailAutor
        self.url = url or self.url
        self.token = token or self.token


