pipeline {
    agent any  // Specifies that the pipeline can run on any available agent (node)

    stages {
        stage('Build') {
            steps {
                // Define build steps here
                echo 'Building the application...'
                nodejs('Node 10.17.0'){
                sh 'yarn install'
                }
            }
        }
    }
}

