pipeline {
  agent {
    docker {
      image 'node:12-stretch'
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

  }

  post {  
         
         success {  
             emailext(
               subject: "SUCCESSFUL: Job \'${env.JOB_NAME} [${env.BUILD_NUMBER}]\'", 
               body: "<p>SUCCESSFUL: Job \'${env.JOB_NAME} [${env.BUILD_NUMBER}]\':</p>         <p>Check console output at &QUOT;<a href=\'${env.BUILD_URL}\'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>", 
               to: 'edilson35s78@gmail.com')
      
         }  
         failure {  
             mail bcc: '', body: "<b>Example</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL de build: ${env.BUILD_URL}", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "foo@foomail.com";  
         }  
     }

  environment {
    Home = '.'
  }
}