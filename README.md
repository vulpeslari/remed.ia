# Remed.IA

O Remed.IA é uma plataforma web que suporta a conversação com um assistente inteligente capaz de medicar pacientes de acordo com seus sintomas, perfil e histórico médico. Essa plataforma foi feita pensando em dois usuários:
* O médico, quem atende o paciente e receita o medicamento e
* O enfermeiro ou funcionário assistente hospitalar, que acolhe e cadastra as informações básicas dos pacientes antes que estes passem pelo olhar especialista do médico.

# Rotas

* `/`
    * Rota root, onde há o redirecionamento para a aba do Médico ou para a aba de Acolhimento
* `/home`
    * A rota principal para os dois usuários. O que difere a renderização de rotas é um token local nomeado `access`. O token é reiniciado sempre que o usuário clicar no atalho que volta para a rota root `/`
    * Na home do Acolhimento, o usuário pode conversar com o chat ou Acolher/Cadastrar pacientes pela rota `/reception`
    * Na home do Médico, o usuário pode conversar com o chat, navegar por consultas ou ver todos os pacientes cadastrados pela rota `/patients`
* `/home/:id`
    * Mostra o histórico de consultas de um paciente específico. As consultas são exclusivas ao Médico
* `/reception`
    * Permite o cadastro de Pacientes
* `/patients`
    * Mostra todos os pacientes cadastrados
* `/patient/:id`
    * Mostra os dados de um paciente específico

# Como executar?

## Clone o repositório git
```
git clone https://github.com/vulpeslari/remed.ia.git
cd seu-repo
```

## Execute o programa

```npm start```
