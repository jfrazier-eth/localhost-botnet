# 433-final-project Botnet Simulation

## Running the program
* Clone the repo
* run `npm i`
* run `npm start` to automatically launch the download site, victim site, and command and control site (all will be opened in new tabs in your default browser).
* Click the download link for your system to download your software including the command and control software of the botnet.
* Set the permissions of the executable file for it to be executable `chmod 755 <filename>`
* Run the executable you downloaded. A server will start and open your software(a simple webiste) in your browser. Along with the simple website comes the command and control software for the botnet. Your computer will use the same server that the website is running on to listen for commands from the botnet controller. Note, I have only tested the executable on a mac. If changing the permissions doesn't work for you, try running the exectuable in `433-final-project/malware/build`
* To create a larger botnet, run the executable file multiple times to spawn more infected machines(processes)
* Go to the command and control site (you will notice your infected machines are listed)
* To start the attack, you can click the `Run` button to run with default settings and wordlists or provide your own.
* Victim site username: admin password: password (make sure these are in your word lists to perform a successful attack)
* Once you click the run button, the attack information being used by each bot will be displayed on that bot's website
* On a successful login, the infected machine will send the username and password back to the command and control site 



<!-- ### Download Site
* Includes links to download executables for different systems including x86 macos, x86 windows and x86 linux machines. ** SET EXECUTABLE PERMISSION ON DOWNLOADED FILES USING CHMOD(or similar) TO RUN THEM  **

### Malicious Software
* Starts a localhost server
* Opens an innocent website(replicating a user downloading infected software)
* Listens for commands from the attacker
* Prints commands that have been run by the attacker //TODO

### Command and Control Site



### Victim Site
* Displays requests that have been made to this site -->

