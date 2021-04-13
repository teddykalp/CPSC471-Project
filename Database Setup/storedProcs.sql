DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `EmployeeLogin`(
IN _employee_id INT
)
BEGIN
    SELECT *
        FROM work_it.Employee
        WHERE eid = _employee_id;
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateEmployee`(
IN _eid INT,
IN _first_name varchar(255),
IN _last_name varchar(255),
IN _phone varchar(255),
IN _email varchar(255),
IN _dept int
)
BEGIN
    
    UPDATE work_it.Employee
    SET First_Name = _first_name , Last_Name = _last_name, Email = _email, Phone = _phone, Dept_Num = _dept
    WHERE eid = _eid;
    
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `ManageEmployees`(
IN _manager_id INT
)
BEGIN
    SELECT DISTINCT e.EID, e.First_Name, e.Last_Name, e.Email, e.Phone, e.Dept_Num
    FROM work_it.Employee as e
    WHERE e.eid IN (
        SELECT eid
        FROM Manages
        WHERE manager_eid = _manager_id
    );
    
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `AddEmployee`(
IN _manager_eid int,
IN _eid int,
IN _firstname varchar(255),
IN _lastname varchar(255),
IN _email varchar(255),
IN _phone varchar(255),
IN _salary Bool,
IN _manager Bool,
IN _sub_manager Bool,
IN _worker Bool,
IN _pay int,
IN _wage_hr int,
IN _branch_id int,
IN _dept_num int,
IN _store_name varchar(255)

)
BEGIN
    /*First Insert the employee into the employee table, no need to specify id since it is an auto increment attribute*/
    
    INSERT INTO work_it.Employee (First_Name, Last_Name, Email, Phone, Salary, Manager, Sub_Manager, Worker, Pay, Wage_hr, Branch_id, Dept_Num, Store_Name)
    Values(_firstname, _lastname, _email, _phone, _salary, _manager, _sub_manager, _worker, _pay, _wage_hr, _branch_id, _dept_num, _store_name);
    
    /*Then insert into the manages table */
    SET _eid = last_insert_id();
    INSERT INTO work_it.Manages
    Values(_manager_eid, _eid);

END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `EditTotalHours`(
IN New_Total_Hours DECIMAL(5,2),
IN empID INT
)
BEGIN
    UPDATE work_it.Payroll
    SET  Total_Hours = New_Total_Hours
    WHERE EID = empID;

END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `getSchedule`(
IN _eid int
)
BEGIN
    SELECT *
    FROM work_it.SCHEDULE
    WHERE EID = _eid
    ORDER BY Date Desc;
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `getEmployeeSchedule`(
IN _manager_eid int
)
BEGIN
    SELECT DISTINCT s.ScheduleID, s.Date, s.Start_Time, s.End_Time, s.EID, e.First_Name, e.Last_Name, d.Dep_Name
    FROM work_it.SCHEDULE as s,work_it. Employee as e, work_it.Department as d
    WHERE s.eid = e.eid AND e.dept_num = d.dep_num AND e.eid IN
                                                        (SELECT EID 
                                                        FROM MANAGES
                                                        WHERE Manager_eid = _manager_eid)
    ORDER BY s.date DESC;
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSched_Day`(
IN date DATE
)
BEGIN
        SELECT s.ScheduleID, s.Date, s.Start_Time, s.End_Time,s.EID, e.First_Name, e.Last_Name
        FROM work_it.Schedule AS s, work_it.Employee AS e
        WHERE s.Date = date AND s.EID = e.EID;
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateSchedule`(
IN _sid int,
IN _date date,
IN _start_time varchar(255),
IN _end_time varchar(255),
IN _eid int
)
BEGIN
    UPDATE work_it.SCHEDULE
    SET Date = _date , start_time = _start_time, end_time = _end_time, Created_EID = _eid
    WHERE ScheduleID = _sid;
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteEmployee`(
IN _eid int
)
BEGIN
    SET SQL_SAFE_UPDATES = 0;
    DELETE FROM SCHEDULE WHERE EID = _eid;
    DELETE FROM PAYROLL WHERE EID = _eid;
    DELETE FROM PAY WHERE EID = _eid;
    DELETE FROM MANAGES WHERE EID = _eid OR Manager_eid = _eid;
    DELETE FROM Employee WHERE EID = _eid;
    SET SQL_SAFE_UPDATES = 1;
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `getBranchManagers` (
IN branchID INT)
BEGIN
    SELECT EID
    FROM work_it.Employee
    WHERE Manager = TRUE AND Branch_ID = branchID;
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPayHistory`(
IN _eid int
)
BEGIN
    SELECT p.PayId, p.Pay_Period_Start, p.Pay_Period_End, p.Gross_Pay, p.Net_Pay, sum(pr.total_hours) as 'Total_Hours'
    FROM work_it.pay as p, work_it.payroll as pr
    WHERE p.EID = _eid AND p.eid = pr.eid AND (pr.date BETWEEN p.pay_period_start AND p.pay_period_end)
    GROUP BY p.payid;
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `SendNotification`(
IN _sid int,
IN _eid int,
IN _type varchar(255),
IN _accept Bool,
IN _message varchar(255)
)
BEGIN
    INSERT INTO work_it.Notification
    VALUES(_sid, _eid, _type, _accept, _message);
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `ClockIn`(
IN _sid int,
IN _eid int,
IN _clock_in varchar(255),
IN _clock_out varchar(255)
)
BEGIN
    INSERT INTO Clock
    VALUES(_sid, _eid, _clock_in, _clock_out);
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `ClockOut`(
IN _sid int,
IN _clock_out varchar(255)
)
BEGIN
    UPDATE Clock
    SET Clock_out = _clock_out
    WHERE SID = _sid;
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteSchedule`(
IN _sid int
)
BEGIN
    SET SQL_SAFE_UPDATES = 0;
    DELETE FROM CLOCK WHERE SID = _sid;
    DELETE FROM SCHEDULE WHERE ScheduleID = _sid;
    SET SQL_SAFE_UPDATES = 1;
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `AddSchedule`(
IN _date date,
IN _start_time varchar(255),
IN _end_time varchar(255),
IN _eid int,
IN _created int
)
BEGIN
    INSERT INTO SCHEDULE(Date, Start_Time, End_Time, EID, Created_EID)
    VALUES(_date, _start_time, _end_time, _eid, _created);
END;
