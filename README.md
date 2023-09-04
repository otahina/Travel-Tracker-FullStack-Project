
![world-map-app-banner](https://github.com/otahina/Travel-Tracker-FullStack-Project/assets/108225969/3834813c-61cf-42ac-8220-83ecbf732785)


## GlobeMarks is a web application that allows users to log in, visually explore a map of the world, and mark the countries they have visited.

Using this app, user can create a personalized record of their journeys. All marked countries can be saved, and the data is securely stored in the database, offering users an engaging way to reflect on their global adventures.

## Demo Highlights 🎬



https://github.com/otahina/Travel-Tracker-FullStack-Project/assets/108225969/4dc81ec8-5cfd-43cb-8531-58f54e8d70e1




## Features 🌍

* **Interactive Global Map**: Navigate a visual map of the world, zooming in and out to explore various regions.
* **Personalized Country Marking**: Click and mark the countries you've visited, creating a unique travel footprint.
* **Dynamic Journey Visualization**: See your travel history come to life as countries fill with color, reflecting your personal journey.
* **User Account Management**: Register, log in, and manage your travel marks across different devices.
* **Data Persistence**: Save your marked countries securely in the database, allowing you to revisit your travel history anytime.


## Technologies 🛠️

### 🌐 Interactive Mapping with Leaflet and GeoJSON

**GlobeMarks** takes the art of interactive mapping to the next level using the powerful combination of **Leaflet** and **GeoJSON**.

* **Leaflet 🍃**: **Leaflet** is the leading open-source JavaScript library for interactive maps. By integrating it into **GlobeMarks**, we bring you a fast, intuitive, and efficient mapping experience

* **GeoJSON 🌍**: **GeoJSON** is a format for encoding a variety of geographic data structures. At its core, **GlobeMarks** uses GeoJSON to represent the shapes and boundaries of countries. This ensures precision and accuracy when you mark the countries you've visited. 

* **Together, A Perfect Pair 🌟** 
The fusion of **Leaflet**'s interactive capabilities with **GeoJSON**'s data representation gives users of **GlobeMarks** a rich and immersive experience. Navigate the globe, zoom into regions, and mark countries with confidence knowing you're backed by some of the best tools in the world of web mapping.

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
* **React**: Used for building the user interface, including components like the interactive map.
* **JavaScript**: A programming language used in web development, especially in the creation of interactive effects within web browsers.

### Backend
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
* **Django**: A high-level Python Web framework that encourages rapid development and clean, pragmatic design.
* **Python**: A programming language known for its readability and versatility.
* **PostgreSQL**: The database system used for storing user data and travel marks securely.

### Version Control
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
* **Git**: Used for version control, allowing for efficient collaboration and change tracking.
* **GitHub**: Platform for hosting the codebase and managing collaboration.

## How to use this project on your local machine 🩵

### Step 1: Download the Code

**Option 1: Clone the Repository (For Using & Experimenting)**
```bash
git clone https://github.com/otahina/Travel-Tracker-FullStack-Project.git
```
**Option 2: Fork the Repository (For Contributing)**
1. Click on the "Fork" button at the top-right corner of this page.
2. Once the repository is forked, you can clone it to your local machine:

## Step 2: Create a Virtual Environment (Optional but Recommended)
For windows
```
python -m venv myenv
.\myenv\Scripts\activate
```
For macOS and Linux
```
python3 -m venv myenv
source myenv/bin/activate
```

### Step 3: Install Python dependencies

```
cd world_map_app
pip install -r requirements.txt
```

### Step 4:  Install Node Modules for React
 ```
 cd world_map_app/frontend
 npm install
```

### Step 5: PostgreSQL Database Configuration 🐘

**This project is using**   ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) for database

Before running the project, you need to set up a PostgreSQL database and configure the `.env` file.

#### On Windows:

1. Download the installer from [PostgreSQL Official Site](https://www.postgresql.org/download/windows/).
2. Run the installer and follow the instructions.

#### On Mac:

You can use Homebrew:
 ```
 brew install postgresql
 brew services start postgresql
 ```

3. Open the command-line tool
```
psql -U postgres
```
```sql
CREATE DATABASE your_database_name; ①
CREATE ROLE newuser WITH LOGIN PASSWORD 'password'; ② ③
/c  your_database_name;
GRANT ALL PRIVILEGES ON DATABASE your_database_name TO newuser;
GRANT ALL PRIVILEGES ON SCHEMA public TO newuser;
```

#### Configure .env file

1. Open the .envexample file.
2. Change the name into '`.env` file.
3. Edit `.env` file.
```
ENGINE=django.db.backends.postgresql_psycopg2 # you don't need to change here
NAME=your_database_name_here　＃ ①
USER=your_database_user_here　＃ ②
PASSWORD=your_database_password_here　＃　③
HOST=localhost_or_host_address_here　# usually localhost
```
