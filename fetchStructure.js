const WebSocket = require('ws');
const crypto = require('crypto');
const axios = require('axios');


const miniserverCloudDNS = 'dns.loxonecloud.com';
const miniserverPath = '504F94D04BEF';
const miniserverIP = '116.203.7.175';  // Resolved IP
const publicKeyURL = `https://${miniserverCloudDNS}/${miniserverPath}/jdev/sys/getPublicKey`;
const websocketURL = `ws://${miniserverIP}/ws/rfc6455`;

// Function to retrieve public key
async function getPublicKey() {
    try {
        const response = await axios.get(publicKeyURL);
        return response.data.LL.value;
    } catch (error) {
        console.error('Error fetching public key:', error);
        throw error;
    }
}

// Function to generate AES key and IV
function generateAESKeyIV() {
    const key = crypto.randomBytes(32).toString('hex');
    const iv = crypto.randomBytes(16).toString('hex');
    return { key, iv };
}

// Function to encrypt AES key and IV with RSA
function encryptSessionKey(publicKey, key, iv) {
    const payload = `${key}:${iv}`;
    const buffer = Buffer.from(payload, 'utf8');
    const encrypted = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    }, buffer);
    return encrypted.toString('base64');
}

// Function to open WebSocket connection
function openWebSocketConnection(encryptedSessionKey) {
    const ws = new WebSocket(websocketURL, { protocol: 'remotecontrol' });

    ws.on('open', () => {
        console.log('WebSocket connection opened');
        // Send encrypted session key to Miniserver
        ws.send(`jdev/sys/keyexchange/${encryptedSessionKey}`);
    });

    ws.on('message', (data) => {
        console.log('Message from server:', data);
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    return ws;
}

// Main function to execute the steps
async function main() {
    try {
        const publicKey = await getPublicKey();
        console.log('Public Key:', publicKey);

        const { key, iv } = generateAESKeyIV();
        console.log('AES Key:', key);
        console.log('AES IV:', iv);

        const encryptedSessionKey = encryptSessionKey(publicKey, key, iv);
        console.log('Encrypted Session Key:', encryptedSessionKey);

        const ws = openWebSocketConnection(encryptedSessionKey);

    } catch (error) {
        console.error('Error during setup:', error);
    }
}

main();
