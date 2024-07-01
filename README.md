# Loxone Miniserver Dashboard

This project provides a simple dashboard to interact with a Loxone Miniserver. The dashboard allows you to toggle a light on and off and displays the status of the light. The connection to the Miniserver is secured using AES encryption and RSA public key exchange.

## Project Structure

- `fetchStructure.js`: A Node.js script to establish a WebSocket connection with the Loxone Miniserver, handle key exchange, and authenticate using the encrypted session key.
- `index.html`: A simple HTML dashboard to interact with the Miniserver.
- `package.json`: Project dependencies and metadata.

## Prerequisites

- Node.js installed on your machine.
- Axios and ws Node.js packages (can be installed via npm).

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Akhand4795/Loxone_Dashboard.git
   cd Loxone_Dashboard

2. Install dependencies:
   ```sh
   npm install

## Configuration
Update the following variables in fetchStructure.js with your actual values:
- `miniserverCloudDNS`
- `miniserverPath`
- `miniserverIP`

  ```sh
  const miniserverCloudDNS = 'dns.loxonecloud.com';
  const miniserverPath = '504F94D04BEF';
  const miniserverIP = '116.203.7.175';  // Resolved IP
  
## Running the Project

1. Run the Node.js script to establish the WebSocket connection:

   ```sh
   node fetchStructure.js
2. Open `index.html` in your web browser to access the dashboard.

## Usage

- Toggle Light: Click the "Toggle Light" button to send a command to the Miniserver to toggle the light on or off.
- Status: The status of the light will be displayed on the dashboard.

## Troubleshooting

- Ensure the Miniserver is reachable and the IP address is correct.
- Verify that the public key URL is accessible and returns the correct key.
- Check for WebSocket connection errors in the console output of both `fetchStructure.js` and the browser console.
- Ensure that Node.js version is below 16.0.0 to avoid compatibility issues.
