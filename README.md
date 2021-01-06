# 433-final-project Botnet Simulation

## Running the program 
* Clone the repo
* run `npm i`
* run `npm start` to automatically launch the download site, victim site, and command and control site (all will be opened in new tabs in your default browser).
* Click the download link for your system to download your software including the command and control software of the botnet.
* Set the permissions of the executable file for it to be executable `chmod 755 <filename>`
* Run the executable you downloaded. A server will start and open your software(a simple webiste) in your browser. Along with the simple website comes the command and control software for the botnet. Your computer will use the same server that the website is running on to listen for commands from the botnet controller. 
* To create a larger botnet, run the executable file multiple times to spawn more infected machines
* Go to the command and control site (you will notice your infected machines are listed)
* Enter the ip address and port that the victim site is running on (localhost:3002)
* Enter your custom username and password wordlists or leave the inputs empty to use the default lists
* Victim site username: admin password: password (make sure these are in your word lists to perform a successful attack)
* Click the run credential stuffing attack. This will read the usernames and passwords from the wordlists, 
split up the usernames between the infected machines and begin testing making authentication requests with their list of usernames and all passwords.
* On a successful login, the infected machine will send the username and password back to the command and control site 




//TODO 
### Download Site
* Includes links to download executables for different systems including x86 macos, x86 windows and x86 linux machines. ** SET EXECUTABLE PERMISSION ON DOWNLOADED FILES USING CHMOD(or similar) TO RUN THEM  **

### Malicious Software
* Starts a localhost server
* Opens an innocent website(replicating a user downloading infected software)
* Listens for commands from the attacker
* Prints commands that have been run by the attacker //TODO

### Command and Control Site



### Victim Site
* Displays requests that have been made to this site

