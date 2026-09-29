import { whatsappLink } from "../constants";
import { useI18n } from "../i18n";

// WhatsApp chat link with a pre-filled message in the page's language, mentioning the chosen service.
// The message template in the locale file marks where the service goes with "{topic}".
const useWhatsappLink = (projectType) => {
  const { t } = useI18n();
  const { whatsappTopics, whatsappMessage } = t.contact;
  const topic = whatsappTopics[projectType] ?? whatsappTopics.other;
  return whatsappLink(whatsappMessage.replace("{topic}", topic));
};

export default useWhatsappLink;
