pipeline {
  agent {
    docker {
      image 'node:12-alpine'
    }

  }
  stages {
    stage('build') {
      steps {
        sh '''sudo chown -R 107:113 "/.npm"
npm install
'''
      }
    }

    stage('unit testing') {
      steps {
        sh '''npm t
'''
      }
    }

    stage('bdd') {
      steps {
        sh 'npm run bdd'
      }
    }

  }
}