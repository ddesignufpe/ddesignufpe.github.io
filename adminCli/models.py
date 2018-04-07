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