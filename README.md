# 433-final-project Botnet Simulation

## Running the program 
* Clone the repo
* run `npm i`
* run `npm start` to automatically launch the download site and command and control site (both will be opened in new tabs in your default browser)
* Click the download link for your system to download your software including the command and control software of the botnet
* Run the executable you downloaded. A server will start and open your software(a simple webiste) in your browser. Along with the simple website comes the command and control software for the botnet. Your computer will use the same server that the website is running on to listen for commands from the botnet controller.



### Download Site
* Includes links to download executables for different systems including x86 macos, x86 windows and x86 linux machines.

### Malicious Software
* Starts a localhost server
* Opens an innocent website(replicating a user downloading infected software)
* Listens for commands from the attacker
* Prints commands that have been run by the attacker //TODO

### Command and Control Site



### Victim Site
* Displays requests that have been made to this site

