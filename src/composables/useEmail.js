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
    projectCategory: ""
  });

  const submitForm = async () => {
    // Hiển thị toast khi email đang được gửi
    const sendingToastId = showInfoToast(t("contact.email.progress"));

    try {
      // Tạo body request từ formData
      const bodyData = {
        access_key: window.envConfig.WEB3FORM_ACCESS_KEY,
      };

      for (const key in formData.value) {
        bodyData[key] = formData.value[key];
      }

      // Gửi request
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();

      // Xử lý kết quả
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
