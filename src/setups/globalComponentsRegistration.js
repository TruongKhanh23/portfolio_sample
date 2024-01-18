import Button from "@/components/reusable/Button.vue";
import RichTextRenderer from "@/components/reusable/RichTextRenderer.vue";
import Slider from "@/components/reusable/Slider.vue";
import JText from "@/components/base/JText.vue";
import JFlex from "@/components/base/JFlex.vue";
import JSpinner from "@/components/base/JSpinner.vue";

// Register components globally
const baseComponents = {
  JFlex,
  JText,
  JSpinner,
};

const coreComponents = {
  Button,
  RichTextRenderer,
  Slider,
};

// Inject variant resolver function into base components
Object.keys(baseComponents).forEach((fileName) => {
  const component = baseComponents[fileName];
  const currentInject = component?.inject ?? [];
  component.inject = [...currentInject, "getComponentVariants"]; // this is provided on app level
});

// Register
const components = { ...baseComponents, ...coreComponents };
export default (app) => {
  Object.keys(components).forEach((fileName) => {
    const componentConfig = components[fileName];
    app.component(fileName, componentConfig.default || componentConfig);
  });
};
