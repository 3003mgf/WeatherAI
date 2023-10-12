import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/20/solid";
import { Callout } from "@tremor/react";



type Props = {
  message: string;
  warning?: boolean;
  info?: boolean
}

const CalloutCard = ({message, warning, info}:Props) => {
  return ( 
    <Callout
      className="mt-4"
      title={message}
      icon={warning ? ExclamationTriangleIcon : info ? InformationCircleIcon : CheckCircleIcon}
      color={warning ? "rose" : "teal"}
    />
   );
}
 
export default CalloutCard;