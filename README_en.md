Link para a versão português-br: [README-pt-br](https://github.com/moraesandre88/rem-system#readme)

# REM-System

Hello! Welcome. This is an application for a real estate management system using React.js. It is part of the REM project along with [REM-Server](https://github.com/moraesandre88/rem-server) and REM-Site, all in development.

## Initial Setup

Once you have Rem-System on your machine, some configurations need to be done for the system and some of its services to operate correctly. The steps are detailed in the listing below.

### 1. Npm

First and foremost, remember to install the necessary dependencies for the project to work. In your terminal, navigate to the `rem-system` project folder and execute the command: `npm i`. Once everything is installed, you can proceed to the next steps.

### 2. REM-Server

As mentioned above, this project is part of a system that uses its own server, [REM-Server](https://github.com/moraesandre88/rem-server). Click on the link and follow the instructions to set up the server locally.

### 3. Cloudinary

For photo hosting, [Cloudinary](https://cloudinary.com/) was used. Instructions on how to create your account and configure the environment (in [REM-Server](https://github.com/moraesandre88/rem-server)) are in the README at the link. Once the account is created, you will need to create a file `.env` in the project's root and in it, create a variable called `REACT_APP_CLOUDINARY_CLOUD_NAME`. Assign to this variable your `cloud_name` from Cloudinary. Once created, you will need to restart the project for it to be recognized. Once done, all necessary configurations are ready.

## Starting the System

After the initial setup of the system and the initialization of [REM-Server](https://github.com/moraesandre88/rem-server), open your terminal, go to `rem-system`, and run the command `npm start`. There you go, your system is now running and ready to be used.

## Notes

Following all the steps so far, it will be necessary to create the first user with their password. This user will have all the necessary permissions to access all the system resources. Others will have more restricted access. Remember that this is a project in development and there are still operations to be created for it.
