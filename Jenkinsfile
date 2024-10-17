pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build docker image') {
            steps {
                script {
                    bat 'docker build -t plizama/proyecto-misw-frontend:latest .'
                }
            }
        }

        stage('Push image to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub-password', variable: 'dhpsw')]) {
                        bat 'docker login -u plizama -p %dhpsw%'
                    }
                    bat 'docker push plizama/proyecto-misw-frontend:latest'
                }
            }
        }
    }
}
