Feature: Swag lab manage authenticationwith tags

    ** As a ** Swag lab's user
    ** I want to ** administrate the authentication oh the web app
    ** So that I can *** access of the store

    Background:
        Given A web browser is at the saucelabs login page - tag demo
    
    @successLogin
    Scenario: Success Login
        When A user enters the username "standard_user", the password "secret_sauce", and clicks on the login button - tag demo
        Then the url will contains the inventory subdirectory - tag demo
    
    @BlockedLogin
    Scenario: Blocked Login
        When A user enters the username "locked_out_user", the password "secret_sauce", and clicks on the login button - tag demo
        Then The error message "Epic sadface: Sorry, this user has been locked out." is displayed - tag demo
