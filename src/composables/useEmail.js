import { ref } from "vue";
import useToast from "@/composables/toast";
import { useI18n } from "vue-i18n";

export default function useEmail() {
  const { t } = useI18n();
  const { showInfoToast, updateToast } = useToast();

  const formData = ref({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const submitForm = async () => {
    const sendingToastId = showInfoToast(t("contact.email.progress"));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: window.envConfig.WEB3FORM_ACCESS_KEY,
          name: formData.value.name,
          email: formData.value.email,
          subject: formData.value.subject,
          message: formData.value.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        updateToast(sendingToastId, t("contact.email.success"), "success");
      } else {
        updateToast(sendingToastId, t("contact.email.error"), "error");
      }
    } catch (error) {
      updateToast(sendingToastId, `Error occurred: ${error.message}`, "error");
    }
  };

  return {
    formData,
    submitForm,
  };
}
