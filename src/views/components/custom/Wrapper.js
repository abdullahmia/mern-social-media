import { useEffect } from "react";
import MobileMenu from "../common/ui/MobileMenu";

const Wrapper = ({ children, title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return <div>{children}
    <div className="lg:hidden block">
      <MobileMenu />
    </div>
  </div>;
};

export default Wrapper;
