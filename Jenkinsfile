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
    }
    stages {
        stage('Install') {
            steps {
                sh 'cnpm cache clean --force'
                sh 'cnpm cache verify'
                sh 'cnpm install'
                // sh 'cnpm install'   2018/9/5 有报告cnpm会在这里出错  暂时用回npm
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