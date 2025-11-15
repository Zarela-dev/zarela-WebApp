const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

// Configuration with fallbacks
const IPFS_API_HOST = process.env.IPFS_API_HOST || 'ipfs-backend';
const IPFS_GATEWAY_HOST = process.env.IPFS_GATEWAY_HOST || 'ipfs-backend';
const IPFS_API_PORT = process.env.IPFS_API_PORT || '5001';
const IPFS_GATEWAY_PORT = process.env.IPFS_GATEWAY_PORT || '8080';

const IPFS_API_URL = `http://${IPFS_API_HOST}:${IPFS_API_PORT}`;
const IPFS_GATEWAY_URL = `http://${IPFS_GATEWAY_HOST}:${IPFS_GATEWAY_PORT}`;

console.log(`🔧 IPFS Proxy Configuration:`);
console.log(`   API Target: ${IPFS_API_URL}`);
console.log(`   Gateway Target: ${IPFS_GATEWAY_URL}`);

// Enable CORS for all routes
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Proxy error:', err.message);
    res.status(500).json({
        error: 'Proxy error',
        message: err.message,
        target: req.url
    });
});

// Health check endpoints
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        proxy: 'IPFS Express Proxy',
        ipfs_api: IPFS_API_URL,
        ipfs_gateway: IPFS_GATEWAY_URL,
        version: '1.0.1'
    });
});

app.get('/', (req, res) => {
    res.json({
        message: 'IPFS Express Proxy Server',
        version: '1.0.1',
        endpoints: {
            api: 'http://localhost:5001/api/v0/*',
            gateway: 'http://localhost:8080/ipfs/*'
        },
        target_ipfs: {
            api: IPFS_API_URL,
            gateway: IPFS_GATEWAY_URL
        },
        docker_mode: IPFS_API_HOST !== 'localhost'
    });
});

// Proxy IPFS API (port 5001) - Upload/Download operations
app.use('/api/v0', createProxyMiddleware({
    target: IPFS_API_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api/v0': '/api/v0', // keep the original path
    },
    onProxyReq: (proxyReq, req, res) => {
        // Handle chunked responses properly
        proxyReq.setHeader('Connection', 'keep-alive');
        console.log(`[PROXY] Forwarding API request: ${req.method} ${req.url} -> ${IPFS_API_URL}${req.url}`);
    },
    onError: (err, req, res) => {
        console.error(`[PROXY ERROR] API: ${err.message}`);
        res.status(503).json({
            error: 'IPFS API unavailable',
            message: 'Cannot connect to IPFS backend',
            target: IPFS_API_URL
        });
    }
}));

// Proxy IPFS Gateway (port 8080) - File serving
app.use('/ipfs', createProxyMiddleware({
    target: IPFS_GATEWAY_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/ipfs': '/ipfs', // keep the original path
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[PROXY] Forwarding Gateway request: ${req.method} ${req.url} -> ${IPFS_GATEWAY_URL}${req.url}`);
    },
    onError: (err, req, res) => {
        console.error(`[PROXY ERROR] Gateway: ${err.message}`);
        res.status(503).json({
            error: 'IPFS Gateway unavailable',
            message: 'Cannot connect to IPFS gateway',
            target: IPFS_GATEWAY_URL
        });
    }
}));

const PORT_API = 5001;
const PORT_GATEWAY = 8080;

app.listen(PORT_API, () => {
    console.log(`🚀 IPFS Proxy API Server running on port ${PORT_API}`);
    console.log(`📁 Proxying to IPFS API at ${IPFS_API_URL}`);
});

app.listen(PORT_GATEWAY, () => {
    console.log(`🌐 IPFS Proxy Gateway Server running on port ${PORT_GATEWAY}`);
    console.log(`🔗 Proxying to IPFS Gateway at ${IPFS_GATEWAY_URL}`);
});

console.log('✅ IPFS Express Proxy Server started successfully!');
console.log('📡 Browser connects to Express → Express forwards to IPFS');
console.log('🚫 No CORS issues - Express handles all cross-origin requests');