# view
from controller import AdminController

class AdminCli():
    def __init__(self):
        self.__controller = AdminController()
        self.__logado = False

    def run(self):
        print('| BEM VINDO AO DDESIGN ADMIN | \n')
        print('| Versão: 1.0')
        print('| Feito com <3 por Ítalo Sousa')
        while True:
            print('')
            print('| 0 - Login')
            print('| 1 - Infos')
            print('| q - Sair')

            opc = input('\n:')
              
            if opc == '0':
                logado = self.login()
                if logado:
                    self.__logado = True
                    break
            elif opc == '1':
                print('nada')
            elif opc == 'q':
                print('Saiu :( ')
                break      
            else:
                print(' /!\ Opção inválida, tente novamente!')

        if self.__logado:
            print('')
            self.mainMenu()

    def login(self):
        print('\n - LOGIN -')
        print('')
        while True:
            email = input('| Email: ')
            senha = input('| Senha: ')
            logado = self.__controller.login(email, senha)
            if logado:
                return True
            else:
                print('')
                print(' /!\ Email e/ou senha incorreto(s), tente novamente!')   
                print(' /!\ Pressione enter para continuar. Para sair digite "q"')
                opc = input('\n:')
                if opc == 'q':
                    break
        return False

    def mainMenu(self):
        while True:
            print('| MENU PRINCIPAL ')
            print('|')
            print('| - GERAL -')
            print('| 0 - Configurações')
            print('| 1 - Usuários')
            print('| 2 - Aplicativos')
            print('|')
            print('| - CONTROLE DE DADOS - ')
            print('| 3 - Professores')
            print('| 4 - Cadeiras')
            print('| 5 - Grades')
            print('| q - Sair')
            
            opc = input('\n:')

            if opc == '0':
                print('Configurações')
            elif opc == '1':
                self.usuariosMenu()
            elif opc == '2':
                print('Aplicativos')
            elif opc == '3':
                print('Professores')
            elif opc == '4':
                print('Cadeiras')
            elif opc == '5':
                print('Grades')
            elif opc == 'q':
                print('Saiu :( ')
                break
            else:
                print(' /!\ Opção inválida, tente novamente!')

    # UTIL
    def selecionarDaLista(self, lista, legenda):
        try:
            opc = int(input('\n%s: ' %(legenda)))
        
            if opc >= 0 and opc <= len(lista):
                item = lista[opc]
                return item
            else: 
                print(' /!\ Opção inválida!')
        except:
            print(' /!\ Opção inválida!')
        return False

    # USUARIOS -----------------------------------------------------------------------
    def usuariosMenu(self):
        print('')
        print('| USUÁRIOS')
        while True:
            usuarios = self.__controller.carregarUsuarios()
            if usuarios:
                cnt = 0
                print('')
                for usuario in usuarios:
                    print('| %i - %s - %s' %(cnt, usuario.nome, usuario.email))
                    cnt += 1
                print('| OPÇÕES:')
                print('| 0 - Novo Usuário')
                print('| 1 - Detalhar usuário')
                print('| 2 - Alterar usuário')
                print('| 3 - Excluir usuário')
                print('| q - Sair')

                opc = input('\n:')

                if opc == '0':
                    self.novoUsuario()

                elif opc == '1':
                    usuario = self.selecionarDaLista(usuarios, 'Usuário')
                    if usuario:
                        self.detalharUsuario(usuario)
                        
                elif opc == '2':
                    usuario = self.selecionarDaLista(usuarios, 'Usuário')
                    if usuario:
                        self.alterarUsuario(usuario)
                elif opc == '3':
                    usuario = self.selecionarDaLista(usuarios, 'Usuário')
                    if usuario:
                        self.excluirUsuario(usuario)
                elif opc == 'q':
                    break
                else:
                    print(' /!\ Opção inválida, tente novamente!')
            else:
                print(' /!\ Não foi possível carregar os usuários!')

    def novoUsuario(self):
        print('')
        print('| CADASTRO')
        print('|')
        nome = input('| Nome: ')
        email = input('| Email: ')
        senha = input('| Senha: ')
        admin = input('| Admin(False): ')
        cadastrado = self.__controller.inserirUsuario(nome, email, admin, senha)
        if cadastrado:
            print(' /!\ Usuário cadastrado com sucesso')
        else: 
            print(' /!\ Erro ao criar ao usuário')

    def detalharUsuario(self, usuario):
        print('')
        print('| DETALHE - %s' %(usuario.nome))
        print('|')
        print('| Nome: %s' %(usuario.nome))
        print('| Email: %s' %(usuario.email))
        print('| Admin: %s' %(usuario.admin))
        print('|')
        print('| OPÇÕES:')
        print('| 1 - Editar usuário')
        print('| 2 - Excluir usuário')
        print('| q - Sair')
        
        while True:
            opc = input('\n:')
            if opc == '1':
                self.alterarUsuario(usuario)
                break
            elif opc == '2':
                self.excluirUsuario(usuario)
                break
            elif opc == 'q':
                break
            else:
                print(' /!\ Opção inválida!')

    def alterarUsuario(self, usuario):
        print('')
        print('| ALTERAR')
        print('| /!\ Para não alterar o campo, deixe em branco e pressione enter :) ')
        print('|')
        nome = input('| Nome (%s): ' %(usuario.nome))
        email = input('| Email (%s): ' %(usuario.email))
        admin = input('| Admin (%s): ' %(usuario.admin))
        senha = input('| Senha: ')

        if nome == "":
            nome = usuario.nome
        if email == "":
            email = usuario.email
        if admin == "":
            admin = usuario.admin
        if senha == "":
            senha = usuario.senha

        print('')
        print(' /?\ Confirmar alterações?\n')
        print('| Nome: %s -> %s' %(usuario.nome, nome))
        print('| Email: %s -> %s' %(usuario.email, email))
        print('| Admin: %s -> %s' %(usuario.admin, admin))
        print('| Senha: %s -> %s' %(usuario.senha, senha))
        
        opc = input('\n(s/n):')

        if opc == 's':
            usuario.nome = nome
            usuario.email = email
            usuario.admin = admin
            usuario.senha = senha

            alterado = self.__controller.atualizarUsuario(usuario)
            if alterado:
                print('\n /!\ Usuário cadastrado com sucesso\n')
            else:
                print('\n /!\ Erro ao alterar ao usuário\n')

    def excluirUsuario(self, usuario):
        print('\n /?\ Você realmente deseja excluir o usuário %s?\n' %(usuario.nome))
        opc = input('\n(s/n):')
        if opc == 's':
            removido = self.__controller.removerUsuario(usuario)
            if removido:
                print('\n /!\ Usuário excluído com sucesso\n')
            else:
                print('\n /!\ Erro ao excluir ao usuário\n')
    # FIM USUARIOS -------------------------------------------------------------------

app = AdminCli()
app.run()
