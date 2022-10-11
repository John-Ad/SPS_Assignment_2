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

insert into User_Type(`Name`) values("Staff");
insert into User_Type(`Name`) values("HoD");