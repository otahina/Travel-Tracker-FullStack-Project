![world-map-app-banner](https://github.com/otahina/World-Map/assets/108225969/f7be9597-2189-44b9-a507-14b1c07bca64)


## GlobeMarks is a web application that allows users to log in, visually explore a map of the world, and mark the countries they have visited.

Using this app, user can create a personalized record of their journeys. All marked countries can be saved, and the data is securely stored in the database, offering users an engaging way to reflect on their global adventures.

## Features 🌍

* **Interactive Global Map**: Navigate a visual map of the world, zooming in and out to explore various regions.
* **Personalized Country Marking**: Click and mark the countries you've visited, creating a unique travel footprint.
* **Dynamic Journey Visualization**: See your travel history come to life as countries fill with color, reflecting your personal journey.
* **User Account Management**: Register, log in, and manage your travel marks across different devices.
* **Data Persistence**: Save your marked countries securely in the database, allowing you to revisit your travel history anytime.


## Technologies 🛠️

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
```python
gh repo clone otahina/Travel-Tracker-FullStack-Project
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

