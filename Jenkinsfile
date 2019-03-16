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
                dir("${JENKINS_HOME}/workspace"){
                    sh 'cnpm cache clean --force'
                    sh 'cnpm cache verify'
                    sh 'cnpm install'
                }
            }
        }
        stage('Build'){
            steps {
                dir("${JENKINS_HOME}/workspace") {
                    sh 'npm run build'
                }
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