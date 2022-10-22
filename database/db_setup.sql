drop database if exists SPS_ASSIGNMENT;

create database SPS_ASSIGNMENT;

use SPS_ASSIGNMENT;

create table User_Type(
    Id int primary key auto_increment,
    `Name` varchar(100) not null
);

create table User(
    Id int primary key auto_increment,
    Type_Id int not null,

    Email varchar(100) not null,
    `Password` varchar(100) not null,

    First_Name varchar(100) not null,
    Last_Name varchar(100) not null,

    foreign key (Type_Id) references User_Type(Id) on delete cascade
);

create table Course(
    Id int primary key auto_increment,
    `Name` varchar(100) not null
);

create table Staff_Course(
    StaffId int not null,
    CourseId int not null,

    IsApproved bit not null default 0,

    foreign key (StaffId) references User(Id) on delete cascade,
    foreign key (CourseId) references Course(Id) on delete cascade,

    primary key (StaffId, CourseId)
);

create table Admin_Task(
    Id int primary key auto_increment,
    `Name` varchar(200) not null
);

create table Staff_Admin_Task(
    StaffId int not null,
    AdminTaskId int not null,

    IsApproved bit not null default 0,

    foreign key (StaffId) references User(Id) on delete cascade,
    foreign key (AdminTaskId) references Admin_Task(Id) on delete cascade,

    primary key (StaffId, AdminTaskId)
);

create table Staff_Research(
    Id int primary key auto_increment,
    StaffId int not null,
    `Name` varchar(100) not null,
    `File_Path` varchar(500) not null,

    IsApproved bit not null default 0,

    foreign key (StaffId) references User(Id) on delete cascade
);
create table Staff_Community_Outreach(
    Id int primary key auto_increment,
    StaffId int not null,
    `Name` varchar(100) not null,
    `File_Path` varchar(500) not null,

    IsApproved bit not null default 0,

    foreign key (StaffId) references User(Id) on delete cascade
);


insert into User_Type(`Name`) values("Staff");
insert into User_Type(`Name`) values("HoD");

insert into User(
    Id,
    Type_Id,

    Email,
    `Password`,

    First_Name,
    Last_Name
)
values(
    10,
    1,
    'staff@email.com',
    'pw',
    'Staff',
    'Stafferson'
);


insert into Admin_Task(`Name`) values("Submit marks");
insert into Admin_Task(`Name`) values("Create course outlines");
insert into Admin_Task(`Name`) values("Moderate exams");
insert into Admin_Task(`Name`) values("Add students to course");