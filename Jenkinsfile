pipeline {
    agent any

    environment {
        DEPLOY_DIR = '/www/wwwroot/CITSNVN/devicemanagement'
        JAR_NAME   = 'DeviceManagement-1.1.jar'
        PORT       = '3079'
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Saddam-Hossen/DevicemanagementThymeleaf'
            }
        }

        stage('Build') {
            steps {
                bat 'mvn clean install -DskipTests'
            }
        }

        stage('Deploy JAR to Server') {
            steps {
                withCredentials([
                    sshUserPrivateKey(credentialsId: 'DO_SSH_KEY', keyFileVariable: 'SSH_KEY'),
                    string(credentialsId: 'DO_HOST', variable: 'HOST'),
                    string(credentialsId: 'DO_USER', variable: 'USER')
                ]) {
                    bat """
"C:/Program Files/Git/bin/bash.exe" -c 'scp -o StrictHostKeyChecking=no -i "$SSH_KEY" target/${JAR_NAME} "$USER@$HOST:${DEPLOY_DIR}/${JAR_NAME}"'
"""
                }
            }
        }

        stage('Start Spring Boot App (Remote)') {
            steps {
                withCredentials([
                    sshUserPrivateKey(credentialsId: 'DO_SSH_KEY', keyFileVariable: 'SSH_KEY'),
                    string(credentialsId: 'DO_HOST', variable: 'HOST'),
                    string(credentialsId: 'DO_USER', variable: 'USER')
                ]) {
                    bat """
"C:/Program Files/Git/bin/bash.exe" -c 'ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" "$USER@$HOST" "
    cd ${DEPLOY_DIR};
    PID=\\\$(lsof -t -i:${PORT});
    if [ ! -z \\\$PID ]; then kill -9 \\\$PID; fi;
    nohup java -Xms64m -Xmx128m -jar ${JAR_NAME} --server.port=${PORT} > app.log 2>&1 &
"'
"""
                }
            }
        }
    }

    post {
        failure {
            echo "❌ Spring Boot deployment failed."
        }
        success {
            echo "✅ Spring Boot deployed successfully."
        }
    }
}
