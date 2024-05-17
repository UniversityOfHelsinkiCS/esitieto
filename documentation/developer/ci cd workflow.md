# CI/CD workflow

The project uses GitHub actions for Continous Integration/Deployment.

**NOTE: The GitHub actions workflows sometimes fail even though it should work. When a workflow fails, it is recommended to rerun it and to also check the point of failure.**

## Deploy to staging - staging.yml

This is the main workflow file of the GitHub repository, it is triggered on every push to the main branch. 

### The workflow completes these steps:

- Test
    - The workflow first calls the test workflow to check that all tests are passing. If the tests pass the workflow continues to the following steps, otherwise the workflow fails and stops here.

- Build and Push
    - To push the code to the server, the workflow first builds the a docker image of the code with the OpenShift [buildah-build](https://github.com/redhat-actions/buildah-build/tree/v2/) action. The docker image is tagged with the staging tag, such that OpenShift knows which image to pull from the image server. \
    _Note: The docker image must be built using this action. Manual building doesn't work._

    - After the image is succesfully built, the workflow calls the [push-to-registry](https://github.com/redhat-actions/push-to-registry/tree/v2/) action, which uploads the built image to Quay.io. From Quay.io OpenShift pulls the new docker image automatically every 15 minutes to the staging environment.
    

## Deploy to production - production.yml

This workflow is essentially the same as the staging workflow but it uses different parameters to create an image of the code with the production tag.

**This workflow activates when you create a release with a new version tag. It must be new for the workflow to recognize it.**

### The workflow completes these steps:

- Test
    - The workflow first calls the test workflow to check that all tests are passing. If the tests pass the workflow continues to the following steps, otherwise the workflow fails and stops here.

- Build and Push
    - To push the code to the server, the workflow first builds the a docker image of the code with the OpenShift [buildah-build](https://github.com/redhat-actions/buildah-build/tree/v2/) action. The docker image is tagged with the production tag, such that OpenShift knows which image to pull from the image server. \
    _Note: The docker image must be built using this action. Manual building doesn't work._

    - After the image is succesfully built, the workflow calls the [push-to-registry](https://github.com/redhat-actions/push-to-registry/tree/v2/) action, which uploads the built image to Quay.io. From Quay.io, the production environment pulls the new image automatically after detecting a new version.

## Test - test.yml

This workflow is used to run the jest tests in the project. It also uploads the coverage report of the tests after they have been completed. The runs each step simultaneously because they aren't dependent on each other. When running the workflow we noticed an issue with GitHub secrets so we had to write the CodeCov token into the worklfow. The workflow is used to also run eslint for code quality control.

### The steps are as follows:

- Frontend
    - First installs node and the modules for the application
    - Then the workflow runs the frontend tests with the coverage at the sametime.
    - After the tests are completed the coverage is uploaded to CodeCov using the [codecov-action](https://github.com/codecov/codecov-action/tree/v3/) action.

- Backend
    - First installs node and the modules for the application
    - Then the workflow runs the backend tests with the coverage at the sametime.
    - After the tests are completed the coverage is uploaded to CodeCov using the [codecov-action](https://github.com/codecov/codecov-action/tree/v3/) action.

- run-linters
    - First the workflow goes into the Git repository
    - Then it installs the node module dependencies
    - And then it runs the npm lint command.

