let cacheMap = new Map()
let timeoutDefault = 1200

function isTimeout(name) {
	const data = cacheMap.get(name)
	if (!data) return true
	if (data.timeout === 0) return false
	const currentTime = Date.now()
	const overTime = (currentTime - data.createTime) / 1000
	if (overTime > data.timeout) {
		cacheMap.delete(name)
		if (name.startsWith('_')) {
			try {
				localStorage.removeItem(name)
			} catch (e) {
				console.log(e)
			}
		}
		return true
	}
	return false
}

class CacheCell {
	constructor(data, timeout) {
		this.data = data
		this.timeout = timeout
		this.createTime = Date.now()
	}
}

class MinCache {
	constructor(timeout) {
		try {
			Object.keys(localStorage).forEach(name => {
				try {
					const value = localStorage.getItem(name)
					cacheMap.set(name, value)
				} catch (e) {
					console.log(e)
				}
			})
		} catch (e) {
			console.log(e)
		}
		timeoutDefault = timeout
	}
	set(name, data, timeout = timeoutDefault) {
		const cachecell = new CacheCell(data, timeout)
		let cache = null
		if (name.startsWith('_')) {
			try {
				localStorage.setItem(name, cachecell)
				cache = cacheMap.set(name, cachecell)
			} catch (e) {
				console.log(e)
			}
		} else {
			cache = cacheMap.set(name, cachecell)
		}
		return cache
	}
	get(name) {
		return isTimeout(name) ? null : cacheMap.get(name).data
	}
	delete(name) {
		let value = false
		if (name.startsWith('_')) {
			try {
				localStorage.removeItem(name)
				value = cacheMap.delete(name)
			} catch (e) {
				console.log(e)
			}
		} else {
			value = cacheMap.delete(name)
		}
		return value
	}
	has(name) {
		return !isTimeout(name)
	}
	clear() {
		let value = false
		try {
			localStorage.clear()
			cacheMap.clear()
			value = true
		} catch (e) {
			console.log(e)
		}
		return value
	}
}

export default MinCache