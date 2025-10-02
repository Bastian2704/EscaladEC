import { u as noop } from './utils2-Br0E7FLR.js';
import './utils-CrtNAE_M.js';

const is_legacy = noop.toString().includes('$$') || /function \w+\(\) \{\}/.test(noop.toString());
if (is_legacy) {
	({
		url: new URL('https://example.com')
	});
}
//# sourceMappingURL=state.svelte-CjbOa9V2.js.map
