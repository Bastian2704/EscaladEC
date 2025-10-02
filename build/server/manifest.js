const manifest = (() => {
	function __memo(fn) {
		let value;
		return () => (value ??= value = fn());
	}

	return {
		appDir: '_app',
		appPath: '_app',
		assets: new Set(['robots.txt']),
		mimeTypes: { '.txt': 'text/plain' },
		_: {
			client: {
				start: '_app/immutable/entry/start.I6POMNzp.js',
				app: '_app/immutable/entry/app.BqReqQeF.js',
				imports: [
					'_app/immutable/entry/start.I6POMNzp.js',
					'_app/immutable/chunks/BpwBI0p8.js',
					'_app/immutable/chunks/KQpmcra8.js',
					'_app/immutable/chunks/Dor_A3w4.js',
					'_app/immutable/chunks/CPGMAfgJ.js',
					'_app/immutable/entry/app.BqReqQeF.js',
					'_app/immutable/chunks/Dor_A3w4.js',
					'_app/immutable/chunks/KQpmcra8.js',
					'_app/immutable/chunks/CPGMAfgJ.js',
					'_app/immutable/chunks/DsnmJJEf.js'
				],
				stylesheets: [],
				fonts: [],
				uses_env_dynamic_public: false
			},
			nodes: [
				__memo(() => import('./chunks/0-kNI9kb0p.js')),
				__memo(() => import('./chunks/1-5jIpQAu6.js')),
				__memo(() => import('./chunks/2-9l6vHCa5.js')),
				__memo(() => import('./chunks/3-C3CKA91G.js')),
				__memo(() => import('./chunks/4-CZ9h6rss.js')),
				__memo(() => import('./chunks/5-CbGWCosY.js'))
			],
			remotes: {},
			routes: [
				{
					id: '/',
					pattern: /^\/$/,
					params: [],
					page: { layouts: [0], errors: [1], leaf: 2 },
					endpoint: null
				},
				{
					id: '/demo',
					pattern: /^\/demo\/?$/,
					params: [],
					page: { layouts: [0], errors: [1], leaf: 3 },
					endpoint: null
				},
				{
					id: '/demo/lucia',
					pattern: /^\/demo\/lucia\/?$/,
					params: [],
					page: { layouts: [0], errors: [1], leaf: 4 },
					endpoint: null
				},
				{
					id: '/demo/lucia/login',
					pattern: /^\/demo\/lucia\/login\/?$/,
					params: [],
					page: { layouts: [0], errors: [1], leaf: 5 },
					endpoint: null
				}
			],
			prerendered_routes: new Set([]),
			matchers: async () => {
				return {};
			},
			server_assets: {}
		}
	};
})();

const prerendered = new Set([]);

const base = '';

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
