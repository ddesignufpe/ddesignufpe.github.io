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
        print('| Contri: Nickolas Ribeiro')
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
                self.aplicativosMenu()
            elif opc == '3':
                print('Professores')
                self.profMenu()
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





    # --------------------------- APLICATIVOS --------------------------------------
    def aplicativosMenu(self):
        print('')
        print('| APLICATIVOS')
        while True:
            aplicativos = self.__controller.carregarAplicativos()
            if aplicativos:
                cnt = 0
                print('')
                for aplicativo in aplicativos:
                    print('| %i - %s - %s - %s' %(cnt, aplicativo.nome, aplicativo.emailAutor, aplicativo.url))
                    cnt += 1
                print('| OPÇÕES:')
                print('| 0 - Novo aplicativo')
                print('| 1 - Detalhar aplicativo')
                print('| 2 - Alterar aplicativo')
                print('| 3 - Excluir aplicativo')
                print('| q - Sair')

                opc = input('\n:')

                if opc == '0':
                    self.novoAplicativo()
                elif opc == '1':
                    aplicativo = self.selecionarDaLista(aplicativos, 'Aplicativo')
                    if aplicativo:
                        self.detalharAplicativo(aplicativo)      
                elif opc == '2':
                    print("2")
                    aplicativo = self.selecionarDaLista(aplicativos, 'Aplicativo')
                    if aplicativo:
                        self.alterarAplicativo(aplicativo)
                elif opc == '3':
                    aplicativo = self.selecionarDaLista(aplicativos, 'Aplicativo')
                    if aplicativo:
                        self.excluirAplicativo(aplicativo)
                elif opc == 'q':
                    break
                else:
                    print(' /!\ Opção inválida, tente novamente!')
            else:
                print(' /!\ Não foi possível carregar os aplicativos!')

    def novoAplicativo(self):
        print('')
        print('| CADASTRO DE APLICATIVO')
        print('|')
        nome = input('| Nome do Aplicativo: ')
        emailAutor = input('| Email do Autor: ')
        appurl = input('| URL: ')
        cadastrado = self.__controller.inserirAplicativo(nome, emailAutor, appurl)
        if cadastrado:
            print(' /!\ Aplicativo cadastrado com sucesso')
        else: 
            print(' /!\ Erro ao criar aplicativo!')

    def detalharAplicativo(self, aplicativo):
        print('')
        print('| DETALHE - %s' %(aplicativo.nome))
        print('|')
        print('| Nome: %s' %(aplicativo.nome))
        print('| Email do Autor: %s' %(aplicativo.emailAutor))
        print('| URL: %s' %(aplicativo.url))
        print('| Token: %s' %(aplicativo.token))
        print('|')
        print('| OPÇÕES:')
        print('| 1 - Editar aplicativo')
        print('| 2 - Excluir aplicativo')
        print('| q - Sair')
        
        while True:
            opc = input('\n:')
            if opc == '1':
                print("1")
                self.alterarAplicativo(aplicativo)
                break
            elif opc == '2':
                self.excluirAplicativo(aplicativo)
                break
            elif opc == 'q':
                break
            else:
                print(' /!\ Opção inválida!')            

    def alterarAplicativo(self, aplicativo):
        print('')
        print('| ALTERAR APLICATIVO')
        print('| /!\ Para não alterar o campo, deixe em branco e pressione enter :) ')
        print('|')
        nome = input('| Nome (%s): ' %(aplicativo.nome))
        emailAutor = input('| Email do autor (%s): ' %(aplicativo.emailAutor))
        appurl = input('| URL (%s): ' %(aplicativo.url))

        if nome == "":
            nome = aplicativo.nome
        if emailAutor == "":
            emailAutor = aplicativo.emailAutor
        if appurl == "":
            appurl = aplicativo.url

        print('')
        print(' /?\ Confirmar alterações?\n')
        print('| Nome: %s -> %s' %(aplicativo.nome, nome))
        print('| Email do autor: %s -> %s' %(aplicativo.emailAutor, emailAutor))
        print('| URL: %s -> %s' %(aplicativo.url, appurl))
        
        opc = input('\n(s/n):')

        if opc == 's':
            aplicativo.nome = nome
            aplicativo.emailAutor = emailAutor
            aplicativo.url = appurl

            alterado = self.__controller.atualizarAplicativo(aplicativo)
            if alterado:
                print('\n /!\ Aplicativo cadastrado com sucesso\n')
            else:
                print('\n /!\ Erro ao alterar o aplicativo\n')

    def excluirAplicativo(self, aplicativo):
        print('\n /?\ Você realmente deseja excluir o aplicativo %s?\n' %(aplicativo.nome))
        opc = input('\n(s/n):')
        if opc == 's':
            removido = self.__controller.removerAplicativo(aplicativo)
            if removido:
                print('\n /!\ Aplicativo excluído com sucesso\n')
            else:
                print('\n /!\ Erro ao excluir o aplicativo\n')
    # ------------------------ FIM APLICATIVOS ------------------------------------------------------------  
  



      
    # ------------------------- PROFESSORES ----------------------------------------------------------------  
    def profMenu(self):
        print('')
        print('| PROFESSORES')
        while True:
            professores = self.__controller.carregarProfessores()
            if professores:
                cnt = 0
                print('')
                for prof in professores:
                    print('| %i - %s - %s - %s' %(cnt, prof.nome, prof.area, prof.email))
                    cnt += 1
                print('| OPÇÕES:')
                print('| 0 - Cadastrar novo professor')
                print('| 1 - Detalhar professor')
                print('| 2 - Alterar cadastro do professor')
                print('| 3 - Excluir cadastro do professor')
                print('| q - Sair')

                opc = input('\n:')

                if opc == '0':
                    self.novoProfessor()
                elif opc == '1':
                    
                    professor = self.selecionarDaLista(professores, 'Professor')
                    if professor:
                        self.detalharProfessor(professor)      
                elif opc == '2':
                    print("2")
                    aplicativo = self.selecionarDaLista(professores, 'Professor')
                    if aplicativo:
                        self.alterarProfessor(professor)
                elif opc == '3':
                    professor = self.selecionarDaLista(professores, 'Professor')
                    if professor:
                        self.excluirProfessor(professor)
                elif opc == 'q':
                    break
                else:
                    print(' /!\ Opção inválida, tente novamente!')
            else:
                print(' /!\ Não foi possível carregar os professores!')

    def novoProfessor(self):
        print('')
        print('| CADASTRO DE PROFESSOR')
        print('|')
        nome = input('| Nome do Professor: ')
        email = input('| Email: ')
        bio = input('| Biografia: ')
        lattes = input('| Lattes: ')
        area = input('| Area: ')
        cadastrado = self.__controller.inserirProfessor(nome, email, bio, lattes, area)
        if cadastrado:
            print(' /!\ Professor cadastrado com sucesso')
        else: 
            print(' /!\ Erro ao criar professor!')

    def detalharProfessor(self, professor):
        print('')
        print('| DETALHE - %s' %(professor.nome))
        print('|')
        print('| Nome: %s' %(professor.nome))
        print('| Email: %s' %(professor.email))
        print('| Bio: %s' %(professor.bio))
        print('| Lattes: %s' %(professor.lattes))
        print('| Area: %s' %(professor.area))
        print('|')
        print('| OPÇÕES:')
        print('| 1 - Editar cadastro do professor')
        print('| 2 - Excluir cadastro do professor')
        print('| q - Sair')
        
        while True:
            opc = input('\n:')
            if opc == '1':
                print("1")
                self.alterarProfessor(professor)
                break
            elif opc == '2':
                self.excluirProfessor(professor)
                break
            elif opc == 'q':
                break
            else:
                print(' /!\ Opção inválida!')    

    def alterarProfessor(self, professor):
        print('')
        print('| ALTERAR PROFESSOR')
        print('| /!\ Para não alterar o campo, deixe em branco e pressione enter :) ')
        print('|')
        nome = input('| Nome (%s): ' %(professor.nome))
        email = input('| Email do autor (%s): ' %(professor.email))
        bio = input('| Bio (%s): ' %(professor.bio))
        lattes = input('| Lattes (%s): ' %(professor.lattes))
        area = input('| Area (%s): ' %(professor.area))

        if nome == "":
            nome = professor.nome
        if email == "":
            email = professor.email
        if bio == "":
            bio = professor.bio
        if lattes == "":
            lattes = professor.lattes
        if area == "":
            area = professor.area       

        print('')
        print(' /?\ Confirmar alterações?\n')
        print('| Nome: %s -> %s' %(professor.nome, nome))
        print('| Email: %s -> %s' %(professor.email, email))
        print('| Bio: %s -> %s' %(professor.bio, bio))
        print('| Lattes: %s -> %s' %(professor.lattes, lattes))
        print('| Area: %s -> %s' %(professor.area, area))
        
        opc = input('\n(s/n):')

        if opc == 's':
            professor.nome = nome
            professor.emailAutor = email
            professor.bio = bio
            professor.lattes = lattes
            professor.area = area


            alterado = self.__controller.atualizarProfessor(professor)
            if alterado:
                print('\n /!\ Professor cadastrado com sucesso\n')
            else:
                print('\n /!\ Erro ao alterar o cadastro do professor\n')

    def excluirProfessor(self, professor):
        print('\n /?\ Você realmente deseja excluir o professor %s?\n' %(professor.nome))
        opc = input('\n(s/n):')
        if opc == 's':
            removido = self.__controller.removerProfessor(professor)
            if removido:
                print('\n /!\ Professor excluído com sucesso\n')
            else:
                print('\n /!\ Erro ao excluir o professor\n')   
    # --------------------------------------------- FIM PROFESSORES ----------------------------------------------            

app = AdminCli()
app.run()
