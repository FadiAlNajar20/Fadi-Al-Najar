import { whatsappLink } from "../constants";
import { useI18n } from "../i18n";

// WhatsApp chat link with a pre-filled message in the page's language, mentioning the chosen service.
const useWhatsappLink = (projectType) => {
  const { t } = useI18n();
  const { whatsappTopics, whatsappMessage } = t.contact;
  return whatsappLink(whatsappMessage(whatsappTopics[projectType] ?? whatsappTopics.other));
};

export default useWhatsappLink;
