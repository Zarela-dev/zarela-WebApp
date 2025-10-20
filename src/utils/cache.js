// Cache utility for preventing repeated RPC calls
class AppCache {
	constructor() {
		this.cache = new Map();
		this.cacheTimestamps = new Map();
		this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
		this.currentWallet = null;
	}

	// Generate cache key based on wallet and data type
	getCacheKey(wallet, dataType, params = {}) {
		const paramString = Object.keys(params).length > 0 ? JSON.stringify(params) : '';
		return `${wallet}_${dataType}_${paramString}`;
	}

	// Check if cache is valid
	isCacheValid(key) {
		const timestamp = this.cacheTimestamps.get(key);
		if (!timestamp) return false;
		return Date.now() - timestamp < this.CACHE_DURATION;
	}

	// Get cached data
	get(wallet, dataType, params = {}) {
		const key = this.getCacheKey(wallet, dataType, params);
		
		// Check if wallet changed
		if (this.currentWallet !== wallet) {
			this.clear();
			this.currentWallet = wallet;
			return null;
		}

		// Check if cache is valid
		if (this.isCacheValid(key)) {
			console.log(`Cache hit for ${dataType}`);
			return this.cache.get(key);
		}

		// Cache expired or doesn't exist
		this.cache.delete(key);
		this.cacheTimestamps.delete(key);
		return null;
	}

	// Set cached data
	set(wallet, dataType, data, params = {}) {
		const key = this.getCacheKey(wallet, dataType, params);
		this.cache.set(key, data);
		this.cacheTimestamps.set(key, Date.now());
		this.currentWallet = wallet;
		console.log(`Cache set for ${dataType}`);
	}

	// Clear all cache
	clear() {
		this.cache.clear();
		this.cacheTimestamps.clear();
		console.log('Cache cleared');
	}

	// Clear specific data type
	clearDataType(dataType) {
		for (const [key, value] of this.cache.entries()) {
			if (key.includes(dataType)) {
				this.cache.delete(key);
				this.cacheTimestamps.delete(key);
			}
		}
		console.log(`Cache cleared for ${dataType}`);
	}

	// Get cache info for debugging
	getCacheInfo() {
		return {
			size: this.cache.size,
			keys: Array.from(this.cache.keys()),
			currentWallet: this.currentWallet
		};
	}
}

// Create singleton instance
const appCache = new AppCache();

export default appCache;
