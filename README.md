## About News Aggregator

News aggregator is a [Laravel](https://laravel.com/) application mixed with [Inertia JS](https://inertiajs.com/) and React JS. It allows users to;

-   Authenticate, register a profile, handle password resets
-   Search and filter news articles by keyword, author, category, source and publication date.
-   Customize a personalized news feed just for their profile.

The application aggregates news data from multiple APIs, stores them in a database and serves them to users. The data sources used are as follows;

-   [News API Service](https://newsapi.org/register)
-   [New York Times API Service](https://developer.nytimes.com/accounts/create)
-   [Mediastack API Service](https://mediastack.com/signup)

An API Key is required from at least one news source to be able to use the application properly, but don't worry the system would present you a UI to get that sorted ASAP.

---

## Running the project

### Prerequisites

-   [Docker and Docker Compose installed on your system](https://docs.docker.com/engine/install/).

### Steps to start the project

-   Clone the repository

    ```bash
    git clone https://github.com/kingeke/news-aggregator.git
    ```

-   Navigate to project directory

    ```bash
    cd news-aggregator
    ```

-   Start up your docker engine

-   Build and start docker containers

    ```bash
    docker-compose up --build
    ```

-   Access the application at http://localhost:8000

-   Once launched, the application would direct you to setup your API keys you got from the news services above, input the keys, then register an account afterwards

---

## Backend Structure

### Database configuration

The database connection details are defined in `config/database.php`. This uses standard MySQL DB to run the application.

### Database structure

#### Users table (2014_10_12_000000_create_users_table)

| Column               | Datatype  |
| -------------------- | --------- |
| id                   | bigint    |
| name                 | string    |
| email                | string    |
| email_verified_at    | timestamp |
| password             | string    |
| preferred_categories | longText  |
| preferred_sources    | longText  |
| preferred_authors    | longText  |
| created_at           | timestamp |
| updated_at           | timestamp |

#### Password Reset Tokens table (2014_10_12_100000_create_password_reset_tokens_table)

| Column     | Datatype  |
| ---------- | --------- |
| email      | string    |
| token      | string    |
| created_at | timestamp |

#### Articles table (2024_12_02_234400_create_articles_table)

| Column       | Datatype  |
| ------------ | --------- |
| id           | bigint    |
| uuid         | string    |
| title        | string    |
| description  | text      |
| content      | text      |
| author       | string    |
| source       | string    |
| api_source   | string    |
| url          | longtext  |
| image_url    | longtext  |
| category     | string    |
| published_at | datetime  |
| created_at   | timestamp |
| updated_at   | timestamp |

### News Services

The application integrates with three APIs:

- NewsAPI: implemented in `app/Services/NewsApiService.php`
- Mediastack API: implemented in `app/Services/MediastackApiService.php`
- New York Times API: implemented in `app/Services/NyTimesApiService.php`

### Background Job: News Scarping

The application runs an hourly schedule to scrape jobs from the three news sources, it also leverages background tasks using queue workers that are setup with supervisor.

- Command: `app/Console/Commands/NewsScrapper.php`
- Job: `app/Jobs/ImportNewsArticle.php`
- Scheduled using a cron job in `container/cronjob.sh`

---

## Frontend Overview

### Entry point

The main entry file is `resources/js/app.jsx` where the React application is initialized.

### Pages

- Auth: This handles authentication processes like registering new users, logging in existing users, resetting passwords.
- Dashboard: This is the landing page of the application for authenticated users, here they view all articles in a paginated view, and can then filter based on the criteria specified above and can also save preferences based on the filters selected.
- Profile: Here the user can change their password
- Settings: Here we ask for API keys on app startup, this only applies to local environment only.