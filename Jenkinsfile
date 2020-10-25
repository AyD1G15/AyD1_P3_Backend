pipeline {
  agent {
    docker {
      image 'node:10-stretch'
    }

  }
  stages {
    stage('build') {
      steps {
        sh '''npm install
'''
      }
    }

    stage('unit testing') {
      steps {
        sh '''npm t
'''
      }
    }

  }
  environment {
    Home = '.'
  }
}