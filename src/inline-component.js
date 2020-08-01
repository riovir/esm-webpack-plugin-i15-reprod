export function InlineComponent() {
	const el = document.createElement('div');
	el.innerHTML = `<h1>Hello there. My code is just inlined.</h1>`;
	return el;
}
