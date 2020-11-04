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
               subject: "SUCCESSFUL Calificacion: Job \'${env.JOB_NAME} [${env.BUILD_NUMBER}]\'", 
               body: "<p>SUCCESSFUL: Job \'${env.JOB_NAME} [${env.BUILD_NUMBER}]\':</p>         <p>Check console output at &QUOT;<a href=\'${env.BUILD_URL}\'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>", 
               to: 'edilson35s78@gmail.com, luisgodoy0100@gmail.com, 0108moralesluis@gmail.com, fuentes.marlon@gmail.com')
      
         }  
         failure {  
              emailext(
               subject: "Failure: Job \'${env.JOB_NAME} [${env.BUILD_NUMBER}]\'", 
               body: "<p>Failure: Job \'${env.JOB_NAME} [${env.BUILD_NUMBER}]\':</p>         <p>Check console output at &QUOT;<a href=\'${env.BUILD_URL}\'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>", 
               to: 'edilson35s78@gmail.com, luisgodoy0100@gmail.com, 0108moralesluis@gmail.com, fuentes.marlon@gmail.com')
         }  
     }

  environment {
    Home = '.'
  }
}