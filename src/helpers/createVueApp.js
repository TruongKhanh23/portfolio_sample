import { createApp } from "vue";
import { omit } from "lodash";

export function createVueApp(rootComponent, rootProps, appContext) {
  const app = createApp(rootComponent, rootProps);

  if (appContext) {
    Object.assign(app._context, omit(appContext, ["app.use", "app.unmount"]));
  }

  return app;
}
