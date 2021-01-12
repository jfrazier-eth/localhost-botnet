# Localhost Botnet
A localhost botnet and a website that the botnet can be used to perform a credential stuffing attack on. A botnet is composed of some infected software that be used to spread the botnet and a command and control server that infected devices connect to and wait for commands.

## Scripts
* `npm run start` everything you need to run the program
* `npm run start-server` skips building the exectuables, saves time but you must pack the malware to view changes to it
* `npm run pack-malware` packs malware into exectuables located in `/build`

#### Development Tip 
* Pack the executables and run them by double clicking your system's executable. This way your executable should already have the correct permissions set.
* See below for a more detailed setup

## Running the program
### Prereqs
* I do not recommend trying to run this on a seed labs machine (I attempted and gave up shortly after.) 
* I have not tested the windows executable.
* I have performed testing on a Mac with NodeJS version 15.5.0 and npm version 7.3.0 and Kali with NodeJS version 12.19.0 and npm version 7.3.0.
* To install nodejs and npm on linux machines run `sudo apt install nodejs npm`
* Port 3001 and 3002 must be available for run the program successfully.

### Starting the Program
* Clone the repo `git clone https://github.com/frazierjoe/localhost-botnet.git`
* Once insde the repo, run `npm i` 
* Run `npm start` to automatically launch the download site, victim site, and command and control site (all will be opened in new tabs in your default browser).
* You should now have three new tabs open in your default browser. One is the victim site, one is the command and control site and the last is the software download site. 
* Go the the software download site and click on the link corresponding to your OS. I have tested the Mac version and Linux version (with Kali).
* Set the permissions on the downloaded file to be executable `chmod 755 malware-linux` 

* It's then easiest to run the executable by double clicking it in the file manager. Alternatively you can run it with **./malware-<OS>** but will have to open multiple tabs/windows to create multiple infected devices.
* Once run, you should see another web page open in a new tab. This is the infected software web page. 
* You are now free to explore and find the flag on the admin page. The attack is ready to be run, just click the run button from the command and control web page.

## Components

### Infected Software
To model infected software, I created a download site where a user can view download links to the software they would like to download. The download page is opened when the program is run (via `npm run start` not the executable of the infected software.) 
![download page](https://github.com/frazierjoe/localhost-botnet/blob/main/resources/download-site.png)
Once the program has been downloaded, the user can run the program. When the program is run, it will start a server and open a web page in the system's default browser. This web page replicates the software that a user would have intended to download. The server that is started by running the program will automatically sends the IP address and port number of the server to the command and control server. It then waits for commands from the command and control server. When a command is received, the botnet begins its credential stuffing attack with the data the command and control server sent it. It will display this data on the web page it is serving. In the credential stuffing attack, the infected device receives a list of usernames and passwords, the IP address and port of the victim server, a delay setting and an endpoint to send requests to. The infected device then attempts to login to the victim via the endpoint and if it finds a valid username/password pair, it will send it back to the command and control server.
![infected software page](https://github.com/frazierjoe/localhost-botnet/blob/main/resources/software-site.png)


### Command and Control
Command and control is the access point to the botnet for the owner. It tracks the infected devices, issues commands to the infected devices and receives data from the connected devices about their attacks. In this implementation, the owner can interact with their botnet via a web page that is opened at the same time as the downloads web page. The botnet owner can view a list of their infected devices, use a form to create and run a credential stuffing attack and view the results of the attack (valid usernames and passwords.) When a credential stuffing attack is initiated, the command and control server splits up the list of usernames and distributes it to the infected devices along with the full list of passwords and other attack information. 
![command and control page](https://github.com/frazierjoe/localhost-botnet/blob/main/resources/command-control.png)

### Victim Site
The victim site is a simple login site that runs on 127.0.0.1:3002. This web page is opened at the same time as the command and control web page and download page. A valid login to the victim site is username: "admin" password: "password" (without the quotes.) On a valid login, the user is redirected to the admin page where a flag is displayed.
![victim page](https://github.com/frazierjoe/localhost-botnet/blob/main/resources/login.png)

### Localhost Botnet Goal
The goal of the attacker is to infect devices, craft a request to send to the victim site via the form on the command and control site, run the distributed attack on the infected devices, and receive valid credentials from the infected devices. The attacker can then login to the site with the credentials they found.
![admin page](https://github.com/frazierjoe/localhost-botnet/blob/main/resources/admin.png)
