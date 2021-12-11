pipeline {
    agent any
    tools {
        nodejs 'node-js'
    }
    stages {
        
        stage('install dependencies') {
            steps {
                    sh 'npm install'
            }
        }
    
        stage('build ') {
           
            steps {
                    sh 'npm run build'
            }
        }
                       
    }
}