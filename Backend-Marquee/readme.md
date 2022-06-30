*install postgresql in linux*


sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresq


*to run postgresql
$ psql -U postgres    //normally ||  psql -d postgres -U 'user'
$ sudo -u postgres psql  //super user
$ password: parmya4321    

for security purpose
$ cd /etc/postgresql/<'current-version'>/main
$ sudo nano pg_hba.conf

2. change method peer to md5 and save it 


1. change password incases you forgot-
$ cd /etc/postgresql/<'current-version'>/main
$ sudo nano pg_hba.conf

2. change your security "md5" to "trust"
$ ALTER USER postgres WITH PASSWORD 'new_password';

# Database Relatedd
to view all databases
postgres=#
\q: Exit psql connection
\c: Connect to a new database
\dt: List all tables
\du: List all roles
\list: List databases

to create new database
postgres=# create database '<database_name>'

to delete Database
postgres=# DROP DATABASE '<database_name>';
to change or to use/select database
postgres=# \c '<database_name>'

alter owner of database;
ALTER DATABASE <database_name> OWNER TO <new_owner>;

# Related Tables
to view all tables
postgres=# \dt or \dt+

to create new tables
postgres=#  CREATE TABLE TABLENAME(fieldName type keytype NULL/NOT NULL,fieldName type keytype NULL/NOT NULL) 

to insert data into tables
postgres=# INSERT INTO TABLENAME(SCHEMA) VALUES("")

TO SHOW DATA OF TABLE;
postgres=# SELECT * FROM 'TABLEnAME'

TO UPDATE DATE OF TABLE
postgres=# UPDATE  'TABLEnAME' SET 'UPDATE FIELD' WHERE 'CONDITION (eg.ID=1)';

TO DELETE DATE OF TABLE
postgres=# DELETE FROM  'TABLEnAME' WHERE 'CONDITION  (eg.ID=1)';



Creating a role in Postgres
First, we’ll create a role called me and give it a password of password. A role can function as a user or a group. In this case, we’ll use it as a user:

postgres=# CREATE ROLE me WITH LOGIN PASSWORD 'password';
We want me to be able to create a database:

postgres=# ALTER ROLE me CREATEDB;


