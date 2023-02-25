import Menu from "../common/account/Menu";
import Footer from "../common/ui/Footer";
import Header from "../common/ui/Header";
import Wrapper from "./Wrapper";

const AccountWrapper = ({ children, title }) => {
  return (
    <Wrapper title={title}>
      <div>
        <Header />
        <div className="container mx-auto py-6">
          <div className="border background flex dark:border-[#2d343b]">
            {/* account page sidebar */}
            <Menu />
            <div>{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </Wrapper>
  );
};

export default AccountWrapper;
