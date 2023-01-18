# Rural Sense Technical Project
 
Rural Sense is a citizen feedback platform (CFP) that supports community social workers in collecting and uploading feedback from citizens and public servants which ensure that the voice of the community is heard.
## Installation

Rural-Senses-Technical repository contains the code of a Rural Sense Project. In this repository, you will find the backend (backend/) and the frontend (frontend/), created as 2 distinct entities.

The backend is based on Flask with mongodb(mongoengine) database. The frontend uses React.
In development, you can run both project separately.

Run docker command in Rural-Sense-Repository

```bash
docker-compose up --build
```

[/swagger] in this endpoint you can access the swagger UI and use it to run your apis. You will see all the apis endpoints here to describe your apis structure.

## Usage


This project has three users:

▪ Admin

▪ Community social worker

▪ Public official



### 1. Admin
Admin logs in to the system using the credentials. The admin can create users and assign roles (Community social worker / Public official).
##### Endpoint: /user-signin    # for user login
##### Endpoint: /admin-dashboard    # admin dashboard
##### Endpoint: /add-user-by-admin    # add users and assign role


 

### 2. Community social worker
This user logs into the system using a username and password received from the admin and has 3 screens to select from: (i) Upload data (ii) Review statistic (iii) Messages: 
##### Endpoint: /community-dashboard    # community dashboard

#### 2.1 Upload data  
in this screen the community social worker can upload a CSV file of community feedback according to given format and also inserts additional data about the community.
##### Endpoint: /upload-data-by-community   # collect feedback

#### 2.2 Review Statistics
In this screen, he/she can review the analysis of all CSV files they have uploaded to the system. Analysis data according to the content of the two "what bothers you?"  and “age” columns: 

●	If it contains the word “family” and the age 	is below 25 - it is classified as FAMILY	 

●	If it contains the word “health” and the age 	is above 18 - it is classified as HEALTH	 

●	Otherwise -  it is classified as UNKNOWN
##### Endpoint: /review-statistics-by-community     # review statistics by community he/she uploaded

#### 2.3 Messages
On that screen, the Community Social Worker can see the messages received from the public official.
##### Endpoint: /review-message-by-community    # review messages by community he/she received

### 3. Public Official
This user logs into the system using a username and password received from the admin and has only review statistics screen that the public official may examine the analysis of all the csv files which have been uploaded about the Community and can send a message to the relevant community social worker.
##### Endpoint: /public-official-dashboard     # public official dashboard
##### Endpoint: /send-message-by-publicofficial     # send message to specific community
##### Endpoint: /public-official-review    # view all communities csv uploaded data