# esm-webpack-plugin issue #15 playground

When using the [@purtuga/esm-webpack-plugin](https://github.com/purtuga/esm-webpack-plugin) together with the `webpack-dev-server` while having `hot: true` the ESM plugin generates an invalid module.

## The desired behavior

Will launch a webpage with two links that render basic components. They are defined in the `webpack-dev-server` hosted `http://localhost/index.js`. One of them is code-split.

```bash
git clone https://github.com/riovir/esm-webpack-plugin-i15-reprod.git
cd esm-webpack-plugin-i15-reprod
npm install
npm start
```

## The problem

When the [HMR gets turned on](https://github.com/riovir/esm-webpack-plugin-i15-reprod/blob/master/webpack.config.js#L13) it will generate an extra module which confused the `esm-webpack-plugin` causing extra default exports to be added to the result, making it invalid.

When trying to `npm start` the app with the `hot: true`, the following error will be shown in the console

```
index.js:1394 Uncaught (in promise) SyntaxError: Identifier '.default' has already been declared
```

Opening http://localhost/index.js will reveal it to end like this:

```js
// ...

export default examplePackage;
export { examplePackage };

/** caused by the dev-server generated HMR module */
export default examplePackage; 
export { examplePackage };

const _examplePackage$getRoutes = examplePackage['getRoutes'];

export {
    _examplePackage$getRoutes as getRoutes
}
```
