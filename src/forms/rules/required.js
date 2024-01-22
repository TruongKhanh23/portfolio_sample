import { required } from "@vuelidate/validators/dist/raw.mjs";

const schema = {
  validator: required,
  name: "required",
};

export default schema;
