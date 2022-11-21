Feature: Create an Account

    Scenario: Criar uma nova conta de usuário e editar endereço
        Given que um usuário sem cadastro tenha acessado a página inicial do site
        When ele se cadastrar como novo usuário através do link: Create An Account
        Then ele consiguirá adicionar um endereço padrão em: Default Billing Address 
