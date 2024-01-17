import Button from "@/components/reusable/Button.vue";
import RichTextRenderer from "@/components/reusable/RichTextRenderer.vue";
import Slider from "@/components/reusable/Slider.vue";
import LoadingModal from "@/components/reusable/LoadingModal.vue";

// Register components globally
const components = {
  Button,
  Slider,
  RichTextRenderer,
  LoadingModal,
};

// Register
export default (app) => {
  Object.keys(components).forEach((fileName) => {
    const componentConfig = components[fileName];
    app.component(fileName, componentConfig.default || componentConfig);
  });
};
