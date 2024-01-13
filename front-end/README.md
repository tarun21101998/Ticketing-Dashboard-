To run the Project  through docker  in windows

Step1:  Install docker in windows

<!-- Run command to create docker image through docker file -->
Step2: docker build -t <image name> .

<!-- Start the docker container through docker image  -->
Step3: docker run -it -p 3000:3000 --name <container name> <image name>

<!-- Dependencies  installed to run this react app on windows -->
Node version use <node v20.9.0>                npm <10.1.0>
1. npm install <Install node_modules>
<!-- dependencies  installed in project -->
2.  npm install moment
3. npm install react-dom
4. npm i react-router-dom
5. npm install react-scripts
6. npm install react-toastify
7.  npm install web-vitals


Run command inside Client folder
npm start