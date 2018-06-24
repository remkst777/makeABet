import './services/core.module';
import './components/header';
import './components/main';

const appModule = angular
	.module('app', ['app.core', 'ui.router', 'app.header', 'app.main']);

export default appModule;

