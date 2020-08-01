import { InlineComponent } from './inline-component';

/** Our use case is microfrontend plugins, published / served as ESM */
export function getRoutes() {
	return {
		'/inline': () => InlineComponent,
		'/split': () => import('./split-component').then(prop('SplitComponent'))
	};
}

function prop(key) {
	return object => object[key];
}
