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

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=Twitter_Sentiment_Analysis \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://172.21.96.1:9000 \
                        -Dsonar.login=sqp_2bee53804ee79e3f53422154873fc3fb96c6aa1f    
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
