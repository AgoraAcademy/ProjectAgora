pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            registryUrl 'https://registry.docker-cn.com'
            additionalBuildArgs '--no-cache'
            args '-p 10080:80 --restart=always --security-opt apparmor=unconfined'
        }
    }
    environment {
        WXLOGINAPPID = credentials('WXLOGINAPPID')
        SERVERURL = credentials('SERVERURL')
        CLIENTURL = credentials('CLIENTURL')
    }
    stages {
        stage('Initialize') {
            steps {
                sh 'npm install yarn yrm -g --registry=https://registry.npm.taobao.org'
                sh 'yrm use taobao'
            }
        }
        stage('Install') {
            steps {
                    sh 'npm cache clean --force'
                    sh 'yarn'
            }
        }
        stage('Build'){
            steps {
                    sh 'npm run build'
            }
        }
        stage('Deliver'){
            steps {
                sh 'echo $! > .pidfile'
                sh 'service nginx start'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }
    }
    post { 
        always { 
            cleanWs()
        }
    }
}