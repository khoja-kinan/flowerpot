import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Categories from "../components/categories/Categories";
import ContactUs from "../components/contactUs/ContactUs";
import FollowUs from "../components/followUs/FollowUs";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Hero from "../components/hero/Hero";
import MayLike from "../components/mayLike/MayLike";
import ShopByOccasion from "../components/shopByOccasion/ShopByOccasion";
import SkeletonLoading from "../components/skeleton/SkeletonLoading";
//import { LinearProgress } from "@mui/material";

const LandPage = () => {
  const { i18n } = useTranslation();
  const [mayLike, setMayLike] = useState();
  const [slider, setSlider] = useState();
  const [categories, setCategories] = useState();
  const [occasion, setOccasion] = useState();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(true);

  function fecthYouMayLikeData() {
    axios
      .get("example.com", {
        headers: {
          "X-localization": i18n.language,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setMayLike(response.data.data);
          setLoading2(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  function fecthSliderData() {
    axios
      .get("example.com", {
        headers: {
          "X-localization": i18n.language,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setSlider(response.data.data);
          setLoading3(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  function fecthCategoriesData() {
    axios
      .get("example.com", {
        headers: {
          "X-localization": i18n.language,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data.data);
          setLoading4(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  function fecthOccasionsData() {
    axios
      .get("example.com", {
        headers: {
          "X-localization": i18n.language,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setOccasion(response.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  useEffect(() => {
    fecthYouMayLikeData();
    fecthSliderData();
    fecthCategoriesData();
    fecthOccasionsData();
  }, []);

  return loading ? (
    <SkeletonLoading />
  ) : loading2 ? (
    <SkeletonLoading />
  ) : loading3 ? (
    <SkeletonLoading />
  ) : loading4 ? (
    <SkeletonLoading />
  ) : (
    <Box
      sx={{
        background:
          " linear-gradient(359.04deg, #FEF2F1 -89.99%, #F5F8FF 119.48%)",
      }}
    >
      <Header />
      <Hero slider={slider} />
      <Categories categories={categories} />
      <MayLike mayLike={mayLike} />
      <ShopByOccasion occasion={occasion} />
      <FollowUs />
      <ContactUs />
      <Footer />
    </Box>
  );
};

export default LandPage;
