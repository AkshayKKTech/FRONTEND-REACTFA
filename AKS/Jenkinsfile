pipeline {
    agent any

    environment {
        // Changed to match what you use in your stages
        ACR_REGISTRY = "namespace1/repo1"
        IMAGE_NAME = "frontend"
        IMAGE_TAG = "${BUILD_NUMBER}"
        REGION = "us-east-1"
        ACR_CREDENTIAL_ID = "acr_credential_id"
    }
    tools {
        // Ensure this exact name matches your Global Tool Configuration
        nodejs "node18" 
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        } // <-- Added missing closing brace here

        stage('Installing Dependencies') {
            steps {
                echo "Installing dependencies..."
                sh "npm install"
            }
        }

        stage('Build React App') {
            steps {
                echo "Compiling code..."
                // Fixed command to actually build your production React bundle
                sh "npm run build" 
            }
        }

        stage('Test') {
            steps {
                echo "Testing the code..."
                sh "CI=true npm test"
            }
        }

        stage('Docker Login to ACR') {
            steps {
                echo "Logging into Azure Container Registry using Service Principal..."
                withCredentials([usernamePassword(credentialsId: env.ACR_CREDENTIAL_ID, 
                                                 usernameVariable: 'SPN_CLIENT_ID', 
                                                 passwordVariable: 'SPN_CLIENT_SECRET')]) {
                    
                    // Uses the matching environment variable name env.ACR_REGISTRY
                    sh "echo '${SPN_CLIENT_SECRET}' | docker login ${env.ACR_REGISTRY} -u ${env.SPN_CLIENT_ID} --password-stdin"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building docker image..."
                // Fixed unclosed string, syntax errors, and switched to buildx
                sh "docker buildx build -t ${env.ACR_REGISTRY}/${env.IMAGE_NAME}:${env.IMAGE_TAG} -t ${env.ACR_REGISTRY}/${env.IMAGE_NAME}:latest ."
            }
        }

        stage('Push to ACR') {
            steps {
                echo "Pushing images to registry..."
                sh "docker push ${env.ACR_REGISTRY}/${env.IMAGE_NAME}:${env.IMAGE_TAG}"
                sh "docker push ${env.ACR_REGISTRY}/${env.IMAGE_NAME}:latest"
            }
        }
    }
        /*
        stage('Build docker and pushes to local') {
            steps {
                echo " Building image"
                sh "docker build -t frontend:latest ."
                }
            }*/
    post {
        success {
            echo 'The entire pipeline completed successfully! 🎉'
        }
        cleanup {
            cleanWs()
        }
    }
}
