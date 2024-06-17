import logo from './../logo/logo.png';
import login from './login.png';
import signup from './signup.png';
import sidebarLogo from './sidebar-logo.png';
import dietPlan1 from './dietPlan1.png';
import dietPlan2 from './dietPlan2.png';
import user from './user.png';

interface Props {
  name: string;
  size?: number;
  width?: string;
  height?: string;
}

const Img = (props: Props) => {
  switch (props.name.toLowerCase()) {
    case 'logo':
      return <img src={logo} alt="Rudder logo" className="m-auto" height={36} width={36} />;
    case 'user':
      return <img src={user} alt="user" className="m-auto" height={191} width={191} />;
    case 'login':
      return <img src={login} alt="login image" className="m-auto" height="100%" width={680} />;
    case 'signup':
      return <img src={signup} alt="signup image" className="m-auto" height="100%" width={680} />;
    case 'diet-plan-1':
      return <img src={dietPlan1} alt="diet plan 1" className="m-auto" height={props.height || "100%"} width={props.width || 218} />;
    case 'diet-plan-2':
      return <img src={dietPlan2} alt="diet plan 2" className="m-auto" height="100%" width={218} />;
    case 'sidebar-logo':
      return <img src={sidebarLogo} alt="signup image" className="m-auto" height="40" width={40} />;
    default:
      break;
  }
  return <img alt={props.name.toLowerCase()} />;
};

/* eslint-disable import/no-default-export */
export default Img;
