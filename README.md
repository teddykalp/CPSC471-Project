# User Guide
Welcome to Work It, the easy to use schedule and employee management system! Before being able to use our solutions, you need a few things installed.

## Installation

You will need MySQL and Node js to run this project on your computer. Below in the Downloads section is the MySQL download which also includes MySQL Workbench which we will use to manage our database. Additionally the Node.js download is listed below the MySQL download.
Downloads

## MySQL
The MySQL download can be found here: https://dev.mysql.com/downloads/file/?id=501541. Upon clicking the link, find the link near the bottom that says “No thanks, just start my download”. Clicking this will start your download. Then, simply save and run the downloaded file. Note, this download is for Windows machines. 

Once the installer launches, select “Developer Default” as your Setup Type and click Next. The next step in the installer will alert you to any missing requirements (such as Python). If you are missing any requirements, clicking on the item within the menu will contain a link. Please download and install any missing requirements. Now click Execute and let the installer do its work. 

After it finishes, click Next until you come across a menu labelled Type and Networking. Make sure Config Type is set to Developer Computer and leave all settings default, click Next. Select “Use Legacy Authentication Method” and click Next. Now you will have to set a password. Make sure whatever you enter you remember as you will need this! Once set, click Next. Leave this page to default settings and click Next. Finally, click Execute and let the program do its work.

Once all of the circles have green check marks in them, you may press Finish. On this next page leave it to default settings and click Next, then click Finish. Click Next, and on this page enter the root password you set up in the bottom bar, click Check and click Next. Now press Execute. Once the circles have green check marks, click Finish. On this new screen, click Next. On this final menu, it has “Start MySQL Workbench after Setup” and “Start MySQL Shell after Setup” checked. You can uncheck both of these and click Finish. Congratulations, MySQL is fully installed!


## Node.js
Here is the Node.js download link: https://nodejs.org/en/download/. Go there and select the version you need. I will assume you are using Windows, so click the button labelled “Windows Installer”. Then save the file and run it once it is ready. Once the installer wizard opens, click Next. Accept the terms and click Next. You can leave the default download location and click Next. Leave default settings and click Next. Check the box to install necessary tools and click Next. Finally, click Install. Once installation is complete, click Finish and you will see a command prompt open. Follow the instructions to finish the tools installation. The tools installation may take a while.


## Preparing the Database
Now that MySQL and Node are installed, we need to construct the database within MySQL Workbench and populate it with data. To do this, please open MySQL Workbench on your pc. Once it opens, if you do not see a premade connection, please press the small + next to “MySQL Connections”. Give the connection some name, but otherwise keep the default settings and click OK. Double click your connection, enter your root password if needed and within a few seconds you should see the database menu. Make sure the bottom left corner does not have red writing saying “No Connection”. If that is the case, you may need to troubleshoot online, as any number of things may have gone wrong. If there are any schemas in the Schema tab, right click them and select Drop Schema. We want a blank slate. Once that is done, click the button that looks like 3 stacked cylinders to create a new schema. Name it “work_it”, click Apply, click Apply again and click Finish. Double click work_it in the left schema tab so it becomes bold. Now, click the button with SQL and a plus on it, it should be the far left button on the top row to open an SQL file editor. We will be using this to run SQL commands to build our database.

In the project folder you will find a directory called “Database Setup”. Open it and you will find an SQL file called tableCreation.sql. To open the SQL file, click the button with the folder and SQL written on it, locate the SQL file and click open. Click the yellow lightning button to execute the commands. After a couple of seconds, it should execute the script and you should not get any errors. Right click work_it in the schema tab and click Refresh All. Then click the arrow next to Tables and you should see multiple new entries. This means we have successfully created all the necessary empty tables.

Next we need to populate these tables. In the “Database Setup” directory, open the data.sql file, and just like the previous step, run the data.sql file. It is a very large file and may take a few seconds to initially open and complete. After the completion, you should not see any errors in the bottom log.

Finally, in the same “Database Setup” directory, find the storedProcs.sql file and run this the same way you did for the previous files.

If you have encountered no errors, your database instance has been created and populated.


## Running the Project
Now that the requirements are installed and set up, you should navigate to the submitted project directory where you will find the source code in a folder called “code”. First, make sure your SQL Workbench is open, and you have opened the previously made connection. In the bottom left corner of MySQL Workbench, there should not be any warnings about having no connection.

Once MySQL Workbench is open and working, double click the “run.bat” file. If you are working on Windows, this will automatically open a command prompt and run the command “node server.js”needed to launch the server.


Now that the server is running, open a web browser. It is recommended that you use Google Chrome. In the URL, write this: http://localhost:3000/

If you see the Work It landing page, you have successfully connected!

## Navigating the Website
### Login
From this login page, you can log in using a manager, sub-manager or worker ID and clicking Login. Based on the ID you use, you will get a different version of our project: one for management, and one for workers. For example, the ID 1034 belongs to a full manager, 1000 is for a sub-manager, and 1013 is for a worker.

First, we will cover the Manager and Sub-Manager side, as the worker side is really just a stripped down, read only version of the Manager side.

To return to the previous page at any time, simply use the back button on your browser.

### Manager 
#### Main Page
Once you log in with a management ID, for example using 1034 or 1000, you arrive at the main page. We see 4 important buttons: View My Employees, View My Pay, View/Add Schedules, and Clock In/Clock Out. Below we have listed each page in its own subsection.

##### View My Employees
On this page, we can see a chart that contains information on every employee who is managed by the logged in manager. This chart contains important employee information, and can be modified in 2 ways via this page. The first way is to edit information on an employee-by-employee basis. We can achieve this by simply clicking the Edit button on an employee entry. Once the Edit button is clicked, it is replaced by a Done button, and all of the fields, except for EID, on this specific row can now be modified by clicking and replacing the information. It is important to maintain proper format when modifying format sensitive rows such as email or phone. Once you are done editing, simply click Done to save changes. If you instead want to delete an employee, simply click Delete on an employee entry, and confirm or cancel via the pop up box.

Finally, you can add a new employee via the Add Employee button at the top of the page. Clicking this will open a prompt which requires you to fill out all the information. Once you have filled in all required information, click Confirm Add to add the employee, or click Close to cancel at anytime. 


##### View My Pay
Clicking View My Pay will simply bring up a chart containing all of your pay history information. Everything here is read only information to ensure the consistency and security of the payment system.


##### View/Add Schedules
Clicking View/Add Schedules will bring you to a chart containing every entry of your schedule information. Entries in red are schedules that have already passed, while entries in green are schedules that are either currently ongoing or scheduled for the future. Just like the employee entries from the View My Employee page, you can Edit or Delete any entry.

In the top right there are 2 buttons, Add Schedule and See Your Employees’ Schedule. 

Add Schedule works exactly like the Add Employee prompt. Once clicked, you will need to click on the bar under Employee, which will bring up a list of all employees you can create schedules for. After an employee is selected, clicking the small icon in the Date bar allows you to simply choose a calendar day for the schedule to take place on. For Start Time and End Time you can also click the icon which allows for an easy to enter time format. Once all information is filled, you can click Confirm Add to add the schedule, or cancel at anytime by clicking Close.

Clicking See Your Employees’ Schedule will open an extremely similar chart to your schedule chart, but it shows all the schedules of all employees’ working under you. You can Edit and Delete schedules in the exact same way, but you now have a Send Notification button. Clicking this button will open a prompt that asks for information. The first 2 fields are autofilled, the Type of Notification bar can be clicked to open a drop down of premade notification types, and you can attach an optional message if you wish. Clicking Send Notification will send a notification to the employee with the notification type and message, while clicking Close will cancel this prompt.

##### Clock In/Clock Out
Clicking this large button when you do not have a current shift will alert you saying you do not have a working schedule active. However, if you do have an active shift and press Clock In it will log your clock in details to the database. You can also Clock Out with the same button which will log your clock out details to the database.

#### Worker
##### Main Page
Once you log in with a worker ID, for example using 1013, you arrive at the main page. We will now see 3 important buttons: View My Pay, View Schedules, and Clock In/Clock Out. Below we have listed each page in its own subsection.
View My Pay
Clicking View My Pay will simply bring up a chart containing all of your pay history information. Everything here is read only information to ensure the consistency and security of the payment system.
View Schedule
Clicking View Schedule will bring you to a chart containing every entry of your schedule information. Entries in red are schedules that have already passed, while entries in green are schedules that are either currently ongoing or scheduled for the future. This page will be similar to a manager user but with the difference of only having read privileges. Users will not be able add, edit or delete any schedules in order to ensure managers are the only ones with this type of access
##### Clock In/Clock Out
Clicking this large button when you do not have a current shift will alert you saying you do not have a working schedule active. However, if you do have an active shift and press Clock In it will log your clock in details to the database. You can also Clock Out with the same button which will log your clock out details to the database.
