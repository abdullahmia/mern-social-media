import { useEffect } from "react";
import useIsAuthenticated from "../../../hooks/useIsAuthenticated";
import MobileMenu from "../common/ui/MobileMenu";

const Wrapper = ({ children, title }) => {
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    document.title = title;
  }, [title]);
  return <div>{children}
    {isAuthenticated && <div className="lg:hidden block">
      <MobileMenu />
    </div>}
    
  </div>;
};

export default Wrapper;
