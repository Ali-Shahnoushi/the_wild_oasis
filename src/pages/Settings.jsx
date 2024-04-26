import SettingsForm from "../features/settings/SettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <SettingsForm />
    </Row>
  );
}

export default Settings;
