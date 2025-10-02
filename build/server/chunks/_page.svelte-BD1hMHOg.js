import { e as escape_html } from './escaping-CqgfEcN3.js';
import './utils2-Br0E7FLR.js';
import './utils-CrtNAE_M.js';
import './state.svelte-CjbOa9V2.js';

function _page($$renderer, $$props) {
	$$renderer.component(($$renderer2) => {
		let { data } = $$props;
		$$renderer2.push(
			`<h1>Hi, ${escape_html(data.user.username)}!</h1> <p>Your user ID is ${escape_html(data.user.id)}.</p> <form method="post" action="?/logout"><button>Sign out</button></form>`
		);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BD1hMHOg.js.map
