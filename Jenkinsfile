pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            registryUrl 'https://registry.docker-cn.com'
            additionalBuildArgs '--no-cache'
            args '-p 80:80 --restart=always --security-opt apparmor=unconfined'
        }
    }
    environment {
        WXLOGINAPPID = credentials('WXLOGINAPPID')
        SERVERURL = credentials('SERVERURL')
        PROXYURL = credentials('PROXYURL')
    }
    stages {
        stage('Install') {
            steps {
                    sh 'export http_proxy=$PROXYURL'
                    sh 'npm cache clean --force'
                    sh 'npm install'
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