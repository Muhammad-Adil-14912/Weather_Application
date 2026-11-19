# Weather Application

A browser-based weather dashboard powered by the OpenWeatherMap Current Weather and 5 Day / 3 Hour Forecast APIs.

## Local setup

1. Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api).
2. Copy `config.example.js` to `config.js` in this folder.
3. Set `window.OPENWEATHER_API_KEY` in `config.js` to your key.
4. Open `index.html` through a local static web server.

`config.js` is excluded from Git so local credentials are not committed. Browser API keys are still visible to visitors; restrict the key to the application where the provider supports restrictions. Rotate any key that was previously committed publicly.

## Features

- Current weather conditions
- Five-day forecast
- City search
- Metric units
