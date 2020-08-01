const container = document.querySelector('#app');
// In prod this value is usually something like "/plugins/"
const pluginPath = 'http://localhost:3000/';

launch({ container, pluginPath });

async function launch({ container, pluginPath }) {
	console.info('Importing the webpack-dev-server hosted ESM module')
	const { getRoutes } = await import(`${pluginPath}index.js`);

	console.info('Checking if exported function works')
	const routes = getRoutes();
	const loadComponent = routes[location.pathname];
	if (!loadComponent) { return; }

	console.info('Sometimes checking if code splitting works')
	const Component = await loadComponent();
	container.appendChild(Component());
}

