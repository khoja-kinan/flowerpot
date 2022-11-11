import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { useTranslation } from "react-i18next";
import BG from "../assets/aboutUs/aboutUsBg.png";
const TermsOfService = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Box
      sx={{
        background:
          "linear-gradient(359.04deg, #FEF2F1 -89.99%, #F5F8FF 119.48%)",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12,1fr)",
          background: `url(${BG})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
          backgroundSize: "contain",
          direction: "ltr",
        }}
      >
        <Box
          sx={{
            margin: "1rem 0",
            padding: "1rem 0 ",
            gridColumnStart: "2",
            gridColumnEnd: "12",
            borderBottom: "1px solid rgba(58, 106, 143, 0.49)",
          }}
        >
          <Typography sx={{ color: "#3A6A8F", fontSize: "3rem" }}>
            Terms and Conditions of Use
          </Typography>
        </Box>
        <Box
          sx={{
            gridColumnStart: "2",
            gridColumnEnd: "10",
            gridRowStart: "2",
            margin: "2rem 0 ",
            color: "#3A6A8F",
            fontWeight: "500",
          }}
        >
          <h1>Website Terms and Conditions of Use</h1>

          <h2>1. Terms</h2>

          <p>
            By accessing this Website, accessible from https://flowerpot.qa, you
            are agreeing to be bound by these Website Terms and Conditions of
            Use and agree that you are responsible for the agreement with any
            applicable local laws. If you disagree with any of these terms, you
            are prohibited from accessing this site. The materials contained in
            this Website are protected by copyright and trade mark law.
          </p>

          <h2>2. Use License</h2>

          <p>
            Permission is granted to temporarily download one copy of the
            materials on flowerpot.qa's Website for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a
            transfer of title, and under this license you may not:
          </p>

          <ul>
            <li>modify or copy the materials;</li>
            <li>
              use the materials for any commercial purpose or for any public
              display;
            </li>
            <li>
              attempt to reverse engineer any software contained on
              flowerpot.qa's Website;
            </li>
            <li>
              remove any copyright or other proprietary notations from the
              materials; or
            </li>
            <li>
              transferring the materials to another person or "mirror" the
              materials on any other server.
            </li>
          </ul>

          <p>
            This will let flowerpot.qa to terminate upon violations of any of
            these restrictions. Upon termination, your viewing right will also
            be terminated and you should destroy any downloaded materials in
            your possession whether it is printed or electronic format. These
            Terms of Service has been created with the help of the{" "}
            <a href="https://www.termsofservicegenerator.net">
              Terms Of Service Generator
            </a>
            .
          </p>

          <h2>3. Disclaimer</h2>

          <p>
            All the materials on flowerpot.qa’s Website are provided "as is".
            flowerpot.qa makes no warranties, may it be expressed or implied,
            therefore negates all other warranties. Furthermore, flowerpot.qa
            does not make any representations concerning the accuracy or
            reliability of the use of the materials on its Website or otherwise
            relating to such materials or any sites linked to this Website.
          </p>

          <h2>4. Limitations</h2>

          <p>
            flowerpot.qa or its suppliers will not be hold accountable for any
            damages that will arise with the use or inability to use the
            materials on flowerpot.qa’s Website, even if flowerpot.qa or an
            authorize representative of this Website has been notified, orally
            or written, of the possibility of such damage. Some jurisdiction
            does not allow limitations on implied warranties or limitations of
            liability for incidental damages, these limitations may not apply to
            you.
          </p>

          <h2>5. Revisions and Errata</h2>

          <p>
            The materials appearing on flowerpot.qa’s Website may include
            technical, typographical, or photographic errors. flowerpot.qa will
            not promise that any of the materials in this Website are accurate,
            complete, or current. flowerpot.qa may change the materials
            contained on its Website at any time without notice. flowerpot.qa
            does not make any commitment to update the materials.
          </p>

          <h2>6. Links</h2>

          <p>
            flowerpot.qa has not reviewed all of the sites linked to its Website
            and is not responsible for the contents of any such linked site. The
            presence of any link does not imply endorsement by flowerpot.qa of
            the site. The use of any linked website is at the user’s own risk.
          </p>

          <h2>7. Site Terms of Use Modifications</h2>

          <p>
            flowerpot.qa may revise these Terms of Use for its Website at any
            time without prior notice. By using this Website, you are agreeing
            to be bound by the current version of these Terms and Conditions of
            Use.
          </p>

          <h2>8. Your Privacy</h2>

          <p>Please read our Privacy Policy.</p>

          <h2>9. Governing Law</h2>

          <p>
            Any claim related to flowerpot.qa's Website shall be governed by the
            laws of qa without regards to its conflict of law provisions.
          </p>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default TermsOfService;
