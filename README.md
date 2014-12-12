# Introduction

A template for AngularJS development **made in Frankfurt Germany**. It is ready to be used with backend REST services in Java, Clojure or ....



- Module based structure for GUI
- Gulp taskrunner
- Webserver with live reload for GUI and proxy to backend REST services
- Karma and Jasmin for unit tests
- Protractor for end to end browser tests
- Saas stylesheet with bootstrap and font awesome
- Angular components: angular-ui-router, angular-bootstrap

## Installation

    npm install -g protractor karma
    webdriver-manager update
    
    npm install
    bower install

## Run

For development

    gulp
    
For end to end tests
    
    webdriver-manager start
    gulp e2e-test
    
Build for production
    
    gulp build-prod
    
## Integrate with Java backend

Create a Java project. 

If you want to package the Java project with the Angular compiled output, you need to adapt the production GUI build.

- paths.prod_out in the *gulpfile* should point to the webapplication directory, for example *src/main/webapp
- update the *server* task to connect to the correct port and URL of the Java backend
    
## Integrate with Clojure backend    

To start a backend web server for the application, run:

    lein new compojure --to-dir .
    // or if you prefer the backend to be in a subdirectory: lein new compojure my-backend-name
    echo "resources/public/app/" >> .gitignore
    
Update the value of paths.prod_out in the *gulpfile*. It should point to *resources/public/app*    
    
To start the GUI and the backend server for development
    
    gulp
    lein ring server

## License

Created by Sebastian Hennebr&uuml;der [http://www.laliluna.de](http://www.laliluna.de) Frankfurt (Germany) under Apache License
