function isA(a, b) {
	return a instanceof (b || Array)
}

const typeJS = 'text/javascript'
const scriptStr = 'script'

const header = document.getElementsByTagName('head')[0] || document.documentElement
const aliases = {}
const scripts = document.getElementsByTagName(scriptStr)
const scriptTag = scripts[scripts.length - 1]
const script = scriptTag.innerHTML.replace(/^\s+|\s+$/g, '')

function appendElement(type, attrs, cb) {
	const e = document.createElement(type)
	if (cb) { //-- this is not intended to be used for link
		if (e.readyState) {
			e.onreadystatechange = function () {
				if (e.readyState === 'loaded' || e.readyState === 'complete') {
					e.onreadystatechange = null
					e.onerror = null
					cb()
				}
			}
		} else {
			e.onload = function () {
				e.onload = null
				e.onerror = null
				cb()
			}
		}
	}

	for (let i in attrs) {
		attrs[i] && (e[i] = attrs[i])
	}
	header.appendChild(e)
}

const checkLoaded = scriptTag.src.match(/checkLoaded/) ? 1 : 0

//-- keep trace of header as we will make multiple access to it
const urlParse = function (url) {
	var parts = {} // u => url, i => id, f = fallback
	parts.u = url.replace(/#(=)?([^#]*)?/g, function (m, a, b) {
		parts[a ? 'f' : 'i'] = b
		return ''
	})
	return parts
}

const loaded = {}  // will handle already loaded urls
const errorHandlers = []

const loader = {
	aliases: aliases,
	loadjs(url, cb) {
		var parts = urlParse(url)
		var onError = function (url) {
			for (var i = 0, l = errorHandlers.length; i < l; i++) {
				errorHandlers[i](url)
			}
		}
		url = parts.u
		if (loaded[url] === true) { // already loaded exec cb if any
			cb && cb()
			return loader
		} else if (loaded[url] !== undefined) { // already asked for loading we append callback if any else return
			if (cb) {
				loaded[url] = (function (ocb, cb) {
					return function () {
						ocb && ocb()
						cb && cb()
					}
				})(loaded[url], cb)
			}
			return loader
		}
		// first time we ask this script
		loaded[url] = (function (cb) {
			return function () {
				loaded[url] = true
				cb && cb()
			}
		})(cb)
		cb = function () {
			loaded[url]()
		}

		appendElement(scriptStr, {
			type: typeJS,
			src: url,
			id: parts.i,
			onerror: function (error) {
				onError(url)
				const c = error.currentTarget
				c.onerror = null
				c.parentNode.removeChild(c)

				if (parts.f) {
					appendElement(scriptStr, {
						type: typeJS,
						src: parts.f,
						id: parts.i,
						onerror: function () {
							onError(parts.f)
						}
					}, cb)
				}
			}
		}, cb)
		return loader
	},
	loadcss(url, cb) {
		var parts = urlParse(url)
		url = parts.u
		loaded[url] || appendElement('link', {
			type: 'text/css',
			rel: 'stylesheet',
			href: url,
			id: parts.i
		})
		loaded[url] = true
		cb && cb()
		return loader
	},
	addAliases(_aliases) {
		for (var i in _aliases) {
			aliases[i] = isA(_aliases[i]) ? _aliases[i].slice(0) : _aliases[i]
		}
		return loader
	},
	onError(cb) {
		errorHandlers.push(cb)
		return loader
	}
}

export function load(urls) {
	return new Promise((resolve, reject) => {
		loadStage1(urls, resolve).onError(reject)
	})
}

function loadStage1() {
	const argv = arguments
	const argc = argv.length
	if (argc === 1 && isA(argv[0], Function)) {
		argv[0]()
		return loader
	}

	loadStage2(loader, argv[0], argc <= 1 ? undefined : function () {
		loadStage1.apply(loader, [].slice.call(argv, 1))
	})
	return loader
}

function loadStage2(loader, url, cb) {
	if (aliases && aliases[url]) {
		var args = aliases[url].slice(0)
		isA(args) || (args = [args])
		cb && args.push(cb)
		return loadStage1.apply(loader, args)
	}
	if (isA(url)) { // parallelized request
		for (var l = url.length; l--;) {
			loadStage1(url[l])
		}
		cb && url.push(cb) // relaunch the dependency queue
		return loadStage1.apply(loader, url)
	}
	if (url.match(/\.css\b/)) {
		return loader.loadcss(url, cb)
	}
	return loader.loadjs(url, cb)
}

if (checkLoaded) {
	var i, l, links, url
	for (i = 0, l = scripts.length; i < l; i++) {
		(url = scripts[i].getAttribute('src')) && (loaded[url.replace(/#.*$/, '')] = true)
	}
	links = document.getElementsByTagName('link')
	for (i = 0, l = links.length; i < l; i++) {
		(links[i].rel === 'stylesheet' || links[i].type === 'text/css') && (loaded[links[i].getAttribute('href').replace(/#.*$/, '')] = true)
	}
}
scriptTag.src && script && appendElement(scriptStr, {innerHTML: script})