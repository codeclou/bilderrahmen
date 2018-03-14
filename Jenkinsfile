sh 'curl -sSLko pipeline-helper.groovy ${K8S_INFRASTRUCTURE_BASE_URL}pipeline-helper/pipeline-helper.groovy?v2'
def pipelineHelper = load("./pipeline-helper.groovy")
def doBuild = true
stage('branch check') {
    if (env.GWBT_BRANCH == "gh-pages") {
        doBuild = false
    }
}
pipelineHelper.nodejsTemplate {
  stage('prepare tools') {
    if(doBuild) {
      pipelineHelper.npmWriteClientConfig()
    } else {
       echo 'Skipped'
    }
  }
  stage('git clone') {
    if(doBuild) {
      sh 'git clone --single-branch --branch $GWBT_BRANCH$GWBT_TAG https://${GITHUB_AUTH_TOKEN}@github.com/${GWBT_REPO_FULL_NAME}.git source'
      dir ('source') {
        sh 'git reset --hard $GWBT_COMMIT_AFTER'
      }
    } else {
       echo 'Skipped'
    }
  }
  stage('download dependencies') {
    if(doBuild) {
      dir('source') {
        sh 'echo "strict-ssl false" > ~/.yarnrc'
        sh 'yarn'
      }
    } else {
       echo 'Skipped'
    }
  }
  stage('test') {
    if(doBuild) {
      dir('source') {
        sh 'yarn test'
      }
    } else {
       echo 'Skipped'
    }
  }
  stage('build') {
    if(doBuild) {
      dir('source') {
        sh 'yarn build'
      }
    } else {
       echo 'Skipped'
    }
  }
  stage('deploy to nexus') {
    if(doBuild) {
      dir('source') {
        dir('dist') {
          // Convert e.g. 1.0.0 to 1.0.0-alpha.3434 => deployed to nexus
          packageVersion = sh(returnStdout: true, script: 'cat package.json | jq -r ".version"').trim()
          sh "npm version ${packageVersion}-alpha.${BUILD_NUMBER}"
          pipelineHelper.npmPublishToNexusRepository('codeclou')
        }
      }
    } else {
       echo 'Skipped'
    }
  }
  stage('deploy to npmjs') {
    if(env.GWBT_TAG) {
      dir('source') {
        dir('dist') {
          sh 'echo "//registry.npmjs.org/:_password=${NPMJS_PASSWORD}" > ~/.npmrc'
          sh 'echo "//registry.npmjs.org/:username=${NPMJS_USERNAME}" >> ~/.npmrc'
          sh 'echo "//registry.npmjs.org/:email=${NPMJS_EMAIL}" >> ~/.npmrc'
          sh 'echo "//registry.npmjs.org/:always-auth=false" >> ~/.npmrc'
          // reset package.json version back to release version
          sh "npm version ${GWBT_TAG}"
          sh 'npm --registry https://registry.npmjs.org/ --access public publish'
        }
      }
    } else {
       echo 'Skipped - no tag!'
    }
  }
  stage('deploy demo') {
    if(env.GWBT_TAG) {
        /*
      sh 'git config --global user.name ${GITHUB_COMMIT_USER}'
      sh 'git config --global user.email ${GITHUB_COMMIT_EMAIL}'
      sh 'git config --global push.default simple'
      sh 'git clone --single-branch --branch gh-pages https://${GITHUB_AUTH_TOKEN}@github.com/cloukit/${GWBT_REPO_NAME}.git gh-pages'
      dir('gh-pages') {
        sh 'mkdir ${GWBT_TAG}'
        sh 'cp -r ../source/documentation ${GWBT_TAG}/documentation'
        sh 'cp -r ../source/dist-demo/dist ${GWBT_TAG}/demo'
        sh 'git add . -A'
        sh 'git commit -m "deploy via ci"'
        sh 'git push'
      }
      */
      echo "ok"
    } else {
       echo 'Skipped - no tag!'
    }
  }
}
