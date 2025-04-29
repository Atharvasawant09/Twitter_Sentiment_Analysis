pipeline {
    agent any

    tools {
        nodejs "nodejs" // This must be inside the pipeline block, not after 'environment'
    }

    environment {
        SONAR_SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Atharvasawant09/Twitter_Sentiment_Analysis.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test || true'
            }
        }

       

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
