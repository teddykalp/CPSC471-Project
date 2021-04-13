CREATE TABLE STORE(
    Name varchar(255) NOT NULL,
    PRIMARY KEY (Name)
);

CREATE TABLE BRANCH(
    Branch_Id int NOT NULL,
    Branch_Name varchar(255),
    City varchar(255),
    Province varchar(255),
    Country varchar(255),
    Store_name varchar(255) NOT NULL,
    PRIMARY KEY (Branch_Id, Store_Name),
    FOREIGN KEY (Store_name) REFERENCES Store(Name)
);

CREATE TABLE DEPARTMENT(
    Dep_Num int NOT NULL,
    Dep_Name varchar(255) NOT NULL,
    Branch_id int NOT NULL,
    Store_Name varchar(255) NOT NULL,
    PRIMARY KEY(Dep_Num, Branch_id, Store_name),
    FOREIGN KEY (Branch_id) REFERENCES BRANCH(Branch_id),
    FOREIGN KEY (Store_name) REFERENCES Store(Name)
);

CREATE TABLE EMPLOYEE(
    /*Primary Keys*/
     EID int NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (EID),
        /* Name attributes*/
       First_Name varchar(255),
    Last_Name varchar(255),
    Email varchar(255),
    Phone varchar(255),
        /*Salary (True) or Hourly (False)*/
        Salary Bool,
        /*Type of Employee Booleans*/
        Manager Bool,
        Sub_Manager Bool,
        Worker Bool,
        /* How much they get paid, use Pay if Salary = True, use Wage_hr otherwise */
    Pay int,
    Wage_hr int,
    /*Foreign Keys*/
    /*Used for all types of workers*/
    Branch_id int,
    FOREIGN KEY (Branch_id) REFERENCES Branch(Branch_id),
    /*Used for sub_managers and employees*/
    Dept_Num int,
    Store_Name varchar(255),
    FOREIGN KEY (Dept_Num) REFERENCES Department(Dep_Num),
    FOREIGN KEY  (Store_Name) REFERENCES Store(Name)
);


CREATE TABLE MANAGES(
       Manager_EID int NOT NULL,
        EID int NOT NULL,
        PRIMARY KEY(Manager_EID, EID),
        FOREIGN KEY(Manager_EID) REFERENCES EMPLOYEE(EID),
        FOREIGN KEY(EID) REFERENCES EMPLOYEE(EID)
);

CREATE TABLE SCHEDULE(
    /* The auto increment will allow us to insert an entry without needing to specify an ID */
        ScheduleID int NOT NULL AUTO_INCREMENT,
        PRIMARY KEY(ScheduleID),
       Date Date,
       Start_Time varchar(255),
    End_Time varchar(255),
        EID int,
        Created_EID int,
        FOREIGN KEY(EID) REFERENCES EMPLOYEE(EID),
        FOREIGN KEY(Created_EID) REFERENCES EMPLOYEE(EID)
);


CREATE TABLE CLOCK(
    SID int NOT NULL,
    Check_in DateTime,
    Check_out DateTime,
    EID int,
    PRIMARY KEY(SID),
    FOREIGN KEY(SID) References Schedule(ScheduleID),
FOREIGN KEY(EID) References Employee(EID)
);

CREATE TABLE Payroll(
    Date date NOT NULL,
        EID int NOT NULL,
        Total_Hours decimal(5,2) NOT NULL,
        Total_Pay decimal(5,2) NOT NULL,
        PRIMARY KEY(Date, EID),
        FOREIGN KEY(EID) REFERENCES EMPLOYEE(EID)
);

CREATE TABLE pay(
    PayId int NOT NULL,
        EID int NOT NULL,
        Pay_Period_Start Date NOT NULL,
    Pay_Period_End Date NOT NULL,
        Gross_Pay decimal (6,2) NOT NULL,
        Net_Pay decimal (6,2) NOT NULL,
        Tax decimal (5,2) NOT NULL,
        Date_Posted date NOT NULL,
    PRIMARY KEY(PayId),
        FOREIGN KEY(EID) REFERENCES Employee(EID)
);



CREATE TABLE NOTIFICATION(
    SID Int,
    EID Int,
    Type varchar(255),
    Accept_Notif Bool,
    Message varchar(255),
    PRIMARY KEY(SID, EID),
    FOREIGN KEY(SID) REFERENCES Schedule(ScheduleID),
    FOREIGN KEY(EID) REFERENCES Employee(EID)
);




CREATE TABLE SENDS(
    SID int,
    EID int,
    Email varchar(255),
    Phone varchar(255),
    PRIMARY KEY(SID,EID),
FOREIGN KEY(SID) REFERENCES Schedule(ScheduleID),
    FOREIGN KEY(EID) REFERENCES Employee(EID)
);


