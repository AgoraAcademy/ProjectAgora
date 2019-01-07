pipeline {
    agent none 
    stages {
        stage('Client - npm install') {
            agent {
                dockerfile {
                    dir 'client'
                    label 'client-container'
                    additionalBuildArgs '--no-cache'
                    args '-d -p 80:80 --security-opt apparmor=unconfined'
                }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Client - npm build') {
            agent {
                dockerfile {
                    label 'client-container'
                }
            }
            steps {
                sh 'npm run build'
            }
        }
        stage('Client - Nginx Serve') {
            agent {
                dockerfile {
                    label 'client-container'
                }
            }
            steps {
                sh 'nginx -g daemon off'
            }
        }
        // stage('Server - Gunicorn Serve'){
        //     agent {
        //         dockerfile {
        //             dir 'server'
        //             label 'server-container'
        //             additionalBuildArgs '--no-cache'
        //             args '-p 81:8000 --security-opt apparmor=unconfined'
        //         }
        //     }
        //     steps {
        //         sh 'gunicorn app:app -D'
        //     }
        // }
        stage('Shutdown Client'){
            agent {
                dockerfile {
                    label 'client-container'
                }
            }
            steps {
                input 'Finished using client?'
            }
        }
        // stage('Shutdown server'){
        //     agent {
        //         dockerfile {
        //             label 'server-container'
        //         }
        //     }
        //     steps {
        //         input 'Finished using server?'
        //     }
        // }
    }
}