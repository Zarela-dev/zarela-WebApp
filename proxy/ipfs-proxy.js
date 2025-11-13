const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Proxy IPFS API (port 5001) - Upload/Download operations
app.use('/api/v0', createProxyMiddleware({
    target: 'http://localhost:6001',
    changeOrigin: true,
    pathRewrite: {
        '^/api/v0': '/api/v0', // keep the original path
    },
    onProxyReq: (proxyReq, req, res) => {
        // Handle chunked responses properly
        proxyReq.setHeader('Connection', 'keep-alive');
    }
}));

// Proxy IPFS Gateway (port 8080) - File serving
app.use('/ipfs', createProxyMiddleware({
    target: 'http://localhost:6002',
    changeOrigin: true,
    pathRewrite: {
        '^/ipfs': '/ipfs', // keep the original path
    }
}));

// Health check endpoints
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        proxy: 'IPFS Express Proxy',
        ipfs_api: 'http://localhost:6001',
        ipfs_gateway: 'http://localhost:6002'
    });
});

app.get('/', (req, res) => {
    res.json({ 
        message: 'IPFS Express Proxy Server',
        version: '1.0.0',
        endpoints: {
            api: 'http://localhost:5001/api/v0/*',
            gateway: 'http://localhost:8080/ipfs/*'
        },
        target_ipfs: {
            api: 'http://localhost:6001',
            gateway: 'http://localhost:6002'
        }
    });
});

const PORT_API = 5001;
const PORT_GATEWAY = 8080;

app.listen(PORT_API, () => {
    console.log(`🚀 IPFS Proxy API Server running on port ${PORT_API}`);
    console.log(`📁 Proxying to IPFS API at http://localhost:6001`);
});

app.listen(PORT_GATEWAY, () => {
    console.log(`🌐 IPFS Proxy Gateway Server running on port ${PORT_GATEWAY}`);
    console.log(`🔗 Proxying to IPFS Gateway at http://localhost:6002`);
});

console.log('✅ IPFS Express Proxy Server started successfully!');
console.log('📡 Browser connects to Express → Express forwards to IPFS');
console.log('🚫 No CORS issues - Express handles all cross-origin requests');