import { createPinia } from 'pinia';

import piniaPluginPersist from 'pinia-plugin-persist';

const store = createPinia();
store.use(piniaPluginPersist);

export { store };

export * from './modules/notification';
export * from './modules/permission';
export * from './modules/user';
export * from './modules/setting';
export * from './modules/tabs-router';

export default store;
