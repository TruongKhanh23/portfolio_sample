import { reactive } from "vue";

export default function useLoading() {
  const loaders = reactive({});

  function startLoading(name) {
    const loader = loaders[name];

    if (loader) {
      loader.loading = true;

      return loader;
    }
  }

  function endLoading(name) {
    const loader = loaders[name];

    if (loader) {
      loader.loading = false;

      return loader;
    }
  }

  return {
    loaders,
    addLoader(name, loading = false) {
      loaders[name] = {
        name,
        loading,
        start() {
          return startLoading(this.name);
        },
        end() {
          return endLoading(this.name);
        },
      };

      return loaders[name];
    },
    startLoading,
    endLoading,
  };
}
