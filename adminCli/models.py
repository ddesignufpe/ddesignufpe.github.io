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

class Professor():
    def __init__(self):
        self.profId = ""
        self.nome = ""
        self.email = ""
        self.bio = ""
        self.lattes = ""
        self.area = ""

    def getDados(self):
        dados = {
            'nome': self.nome,
            'email': self.email,
            'bio': self.bio,
            'lattes': self.lattes,
            'area': self.area
        }    
        return dados

    def loadProfessor(self, profId, nome, email, bio, lattes, area):
        self.profId = profId or self.profId
        self.nome = nome or self.nome
        self.email = email or self.email
        self.bio = bio or self.bio
        self.lattes = lattes or self.lattes
        self.area = area or self.area  

class Cadeira():
    def __init__(self):
        self.cadeiraId = ""
        self.codigo = "" 
        self.nomePerfil = ""
        self.nomeCadeira = ""
        self.professor = ""
        self.eixo = ""
        self.ementa = ""
        self.nivel = ""
        self.vagasMatricula = ""
        self.vagasModificacaoDesign = ""
        self.vagasModificacaoOutros = ""
        self.local = ""

    def getDados(self):
        dados = {
            'codigo': self.codigo,
            'nomePerfil': self.nomePerfil,
            'nomeCadeira': self.nomeCadeira,
            'professor': self.professor,
            'eixo': self.eixo,
            'ementa': self.ementa,
            'nivel': self.nivel,
            'vagasMatricula': self.vagasMatricula,
            'vagasModificacaoDesign': self.vagasModificacaoDesign,
            'vagasModificacaoOutros': self.vagasModificacaoOutros,
            'local': self.local
        }
        return dados

    def loadCadeira(self, cadeiraId, codigo, nomePerfil, nomeCadeira, professor, eixo, ementa, nivel, vagasMatricula, vagasModificacaoDesign, vagasModificacaoOutros, local):
        self.cadeiraId = cadeiraId or self.cadeiraId
        self.codigo = codigo or self.codigo
        self.nomePerfil = nomePerfil or self.nomePerfil
        self.nomeCadeira = nomeCadeira or self.nomeCadeira
        self.professor = professor or self.professor
        self.eixo = eixo or self.eixo
        self.ementa = ementa or self.ementa
        self.nivel = nivel or self.nivel
        self.vagasMatricula = vagasMatricula or self.vagasMatricula
        self.vagasModificacaoDesign = vagasModificacaoDesign or self.vagasModificacaoDesign
        self.vagasModificacaoOutros = vagasModificacaoOutros or self.vagasModificacaoOutros
        self.local = local or self.local     

