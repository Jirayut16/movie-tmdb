import {
  Footer,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
  BsLine,
} from "react-icons/bs";

function MainFooter() {
  return (
    <>
      <Footer className="bg-main">
        <div className="container mx-auto">
          <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
            <div>
              <FooterTitle title="Company" />
              <FooterLinkGroup col>
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Careers</FooterLink>
                <FooterLink href="#">Brand Center</FooterLink>
                <FooterLink href="#">Blog</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="help center" />
              <FooterLinkGroup col>
                <FooterLink href="#">Discord Server</FooterLink>
                <FooterLink href="#">Twitter</FooterLink>
                <FooterLink href="#">Facebook</FooterLink>
                <FooterLink href="#">Contact Us</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Licensing</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="download" />
              <FooterLinkGroup col>
                <FooterLink href="#">iOS</FooterLink>
                <FooterLink href="#">Android</FooterLink>
                <FooterLink href="#">Windows</FooterLink>
                <FooterLink href="#">MacOS</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
          <div className="w-full px-4 py-6 flex flex-col justify-center items-center sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center text-sm text-gray-300 font-semibold">
              <p>This site is not for a commercial use </p>
            </div>
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="#" icon={BsFacebook} />
              <FooterIcon href="#" icon={BsInstagram} />
              <FooterIcon href="#" icon={BsTwitter} />
              <FooterIcon href="#" icon={BsGithub} />
              <FooterIcon href="#" icon={BsLine} />
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
}

export default MainFooter;
