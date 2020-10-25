pipeline {
  agent {
    docker {
      image 'node:10-alpine'
    }

  }
  stages {
    stage('build') {
      steps {
        sh 'npm install'
      }
    }

    stage('unit testing') {
      steps {
        sh 'npm t'
      }
    }

    stage('bdd') {
      steps {
        sh 'npm run bdd'
      }
    }

  }
}