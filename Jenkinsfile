pipeline {
    agent any

    environment {
        REGISTRY = "790552738405.dkr.ecr.eu-north-1.amazonaws.com"
        ECR_REPO_NAME = "cluster1/repo1"
        IMAGE_NAME = "frontend"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        AWS_REGION = "eu-north-1"
        AWS_CREDENTIAL = "aws_ecr_id"
    }

    tools {
        nodejs "node18"
        }

    stages {
        stage('checkout scm') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                echo "Installing node.js dependencies"
                sh "npm install"
                }
            }

        stage('Test') {
            steps {
                echo "testing the code"
                sh "CI=true npm test"
            }
        }
        stage('Build') {
            steps {
                echo "Building the code"
                sh "npm run build"
            }
        }
        stage('Docker image build') {
            steps {
                echo "Building image for docker"
                sh "docker build -t ${REGISTRY}/${ECR_REPO_NAME}/${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }
        stage('Docker image push') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${AWS_CREDENTIAL}", usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    echo "Logging to ecr"
                    sh "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${REGISTRY}"

                    echo "pushing to ecr"
                    sh "docker push ${REGISTRY}/${ECR_REPO_NAME}/${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
    }
    post {
        success {
            echo "Building the image successfully completed, ${IMAGE_NAME}/${IMAGE_TAG}"
        }
        failure {
            echo "Pipeline Failed. Review build logs above to troubleshoot"
        }
    }
}
