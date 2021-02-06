import transporter from "@sendgrid/mail";
import transporterConfig from "#config/emailTransporter";

transporter.setApiKey(transporterConfig.apiKey);

export default transporter;
