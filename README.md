# React Application README

This is a React application that allows users to view and manage activities, and also provides weather information. The activities and weather data are stored in local storage to avoid repeated API calls and the need for a database.

## Installation

To install the required packages from npm, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory using the command line.
3. Run the following command to install the dependencies:

```
npm install
```

## Build

To build the application, use the following command:

```
npm run build
```

This command will generate a production-ready build of your React application.

## Serve

To serve the built application using the `serve` npm package, follow these steps:

1. Install the `serve` package globally by running the following command:

   ```
   npm install -g serve
   ```

2. Once the installation is complete, navigate to the build directory using the command line.

3. Run the following command to start the server:

   ```
   serve -s build
   ```

4. Open your web browser and visit the provided server URL to interact with the application.

## Interacting with the Application

Once the application is running, users can interact with it using the following features:

- **Current Weather**: The landing page will display the current weather information.

- **Activity List**: Users can view the list of activities on the same page as the weather. Each activity will display the activity type, performer, pitch, and date.

- **Calendar View**: Users can open a new tab to access the calendar view for the month.

- **Add Activity**: To add a new activity, users can select the activity type, performer, pitch, and date. After adding an activity, the activity list will be updated accordingly.

- **Edit/Delete Activity**: Users can click on each activity in the list to edit or delete it.

Please note that all the data, including activities and weather information, is stored in local storage to provide a seamless experience without the need for a database or repeated API calls.
