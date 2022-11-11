import {
  Box,
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import useState from "react-usestateref";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import AddDialog from "../components/mayLike/AddGialog";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ReactPaginate from "react-paginate";
import OurShopSkeleton from "../components/skeleton/OurShopSkeleton";

const OurShop = () => {
  const { categorySlug } = useParams();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [allFlowers, setAllFlowers, allFlowersRef] = useState();
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState();
  const [value, setValue] = React.useState(categorySlug);
  const [flowerBox, setFlowerBox, flowerBoxRef] = useState();
  const [vaseList, setVaseList, vaseListRef] = useState();
  const [handBouquetList, setHandBouquetList, handBouquetListRef] = useState();
  const [flowersToShow, setflowersToShow, flowersToShowRef] = useState();
  const imageURL = "example.com";
  const URL = `example.com`;
  useEffect(() => {
    async function fecthData() {
      await axios
        .get(URL, {
          headers: {
            "X-localization": i18n.language,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data.data.data;
            setAllFlowers(data);
          }
          setPages(Math.ceil(allFlowersRef.current.length / perPage));
          setFlowerBox(
            allFlowersRef.current.filter((item) =>
              item.categories_slug.includes("Flower-Box")
            )
          );
          setVaseList(
            allFlowersRef.current.filter((item) =>
              item.categories_slug.includes("Vase")
            )
          );
          setHandBouquetList(
            allFlowersRef.current.filter((item) =>
              item.categories_slug.includes("Hand-Bouquet")
            )
          );
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fecthData();
  }, [pages]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageClick = (event) => {
    setPage(event.selected);
  };
  return loading ? (
    <OurShopSkeleton />
  ) : (
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
        }}
      >
        <Box
          sx={{
            marginTop: "2rem",
            gridColumnStart: "2",
            gridColumnEnd: "12",
            borderBottom: "1px solid rgba(58, 106, 143, 0.49)",
            color: "#667085",
            fontSize: "1.5vw",
            alignItems: "center",
            paddingBottom: "1rem",
          }}
        >
          <Typography
            sx={{
              color: "#3A6A8F",
              fontSize: "5vw",
              gridColumnStart: "1",
              gridColumnEnd: "13",
              justifySelf: "center",
              fontWeight: "600",
              letterSpacing: "0",
            }}
            className="TitleMobile"
          >
            <span
              style={{ color: "#F5958D", fontSize: "2vw" }}
              className="TitleMobileOur"
            >
              {t("description.our")}{" "}
            </span>
            {t("description.SHOP")}
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: "2rem",
            typography: "body1",
            justifySelf: "center",
            gridColumnStart: "1",
            gridColumnEnd: "13",
            width: "100%",
          }}
        >
          <TabContext value={value} className="outShopTabsBoxContainer">
            <Box>
              <TabList
                onChange={handleChange}
                sx={{
                  "& .MuiTabs-flexContainer": {
                    justifyContent: "center",
                  },
                  "& .MuiTab-root.Mui-selected": {
                    background:
                      "linear-gradient(97.28deg, #F5958D 6.07%, #FF9596 87.43%)",
                    borderRadius: "18px",
                    color: "#FFFFFF",
                    boxShadow:
                      "2px 2px 3px rgba(0, 0, 0, 0.1), inset -6px -5px 4px rgba(0, 0, 0, 0.04)",
                  },
                }}
                TabIndicatorProps={{
                  style: {
                    background: "none",
                  },
                }}
              >
                <Tab
                  label={i18n.dir() === "ltr" ? "All" : "الكل"}
                  value="all"
                />
                <Tab
                  label={i18n.dir() === "ltr" ? "Vase" : "مزهرية"}
                  value="Vase"
                />
                <Tab
                  label={i18n.dir() === "ltr" ? "Hand Bouquet" : "باقة يد"}
                  value="Hand-Bouquet"
                />
                <Tab
                  label={i18n.dir() === "ltr" ? "Flower Box" : "صندوق زهور"}
                  value="Flower-Box"
                />
              </TabList>
            </Box>
            <TabPanel value="all">
              <Box
                sx={{
                  gridColumnStart: "2",
                  gridColumnEnd: "12",
                  display: "grid",
                  maxWidth: "100%",
                  gridTemplateColumns: "repeat(12,1fr)",
                  gridAutoRows: "1fr",
                  gridAutoColumns: "1fr",
                  margin: "4rem 3rem",
                  gap: "3rem",
                }}
                className="ourShopTapBoxContainer"
              >
                {allFlowersRef.current.length > 0 ? (
                  allFlowersRef.current
                    .slice(page * perPage, (page + 1) * perPage)
                    .map((item) => (
                      <Card
                        key={item.id}
                        sx={{
                          position: "relative",
                          gridColumn: "span 3",
                          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.03)",
                          borderRadius: "18px",
                          direction: i18n.dir() === "ltr" ? "ltr" : "rtl",
                          display: "grid",
                          gridTemplateColumns: "1fr",
                          gridTemplateRows: "16rem 5rem",
                          maxWidth: 330,
                          width: "260px",
                          padding: "1rem !important",
                          paddingBottom: " 0 !important",
                        }}
                        className="ourShopPageCardMobile"
                      >
                        <div
                          style={{
                            display: "inline-block",
                            height: "230px",
                            gridColumnStart: "1",
                            gridColumnEnd: "2",
                            gridRowStart: "1",
                            gridRowEnd: "2",
                            backgroundColor: "#fce2e2",
                            borderRadius: "18px",
                            padding: "1rem",
                          }}
                        >
                          <img
                            src={`${imageURL}${item.photo}`}
                            alt={item.nameEN}
                            style={{
                              textDecration: "none",
                              display: "inline-block",
                              width: "100%",
                              maxHeight: "100%",
                              borderRadius: "18px",
                            }}
                          />
                        </div>

                        <CardContent
                          sx={{
                            // marginTop: "2rem",
                            padding: "1rem 0",
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          {item.offer === "0" ? (
                            ""
                          ) : item.offer === null ? (
                            ""
                          ) : (
                            <Typography
                              variant="body2"
                              sx={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                color: "white",
                                padding: "0.5rem",
                                fontSize: "1.2rem",
                                fontWeight: 700,
                                background: "#FFDC00",
                                borderRadius: "0px 18px 0px 18px",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              OFFER <br /> {`${item.offer} %`}
                            </Typography>
                          )}
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#3A6A8F",
                              padding: "0 1rem",
                              fontSize: "1rem",
                            }}
                            className="productFontSize"
                          >
                            {i18n.dir() === "ltr" ? item.nameEN : item.nameAR}
                          </Typography>
                          <AddDialog item={item} />
                        </CardContent>
                        <CardActions sx={{ padding: "0" }}>
                          <Typography
                            variant="body2"
                            sx={{
                              position: "relative",
                              bottom: 0,
                              left: i18n.dir() === "ltr" ? "15%" : " ",
                              right: i18n.dir() === "ltr" ? " " : "8%",
                              color: "white",
                              padding: "0.5rem",
                              fontSize: "1.2rem",
                              fontWeight: 700,
                              background: "#3A6A8F",
                              borderRadius: "18px 18px 0px 0px",
                            }}
                          >
                            {i18n.dir() === "ltr"
                              ? `${item.price} QAR`
                              : `${item.price} ريال قطري`}
                          </Typography>
                        </CardActions>
                      </Card>
                    ))
                ) : (
                  <p style={{ gridColumnStart: "1", gridColumnEnd: "10" }}>
                    {t("Dashboard.noElements")}
                  </p>
                )}
              </Box>
            </TabPanel>
            <TabPanel value="Vase">
              <Box
                sx={{
                  gridColumnStart: "2",
                  gridColumnEnd: "12",
                  display: "grid",
                  maxWidth: "100%",
                  gridTemplateColumns: "repeat(12,1fr)",
                  gridAutoRows: "1fr",
                  gridAutoColumns: "1fr",
                  margin: "4rem 3rem",
                  gap: "3rem",
                }}
                className="ourShopTapBoxContainer"
              >
                {vaseListRef.current.length > 0 ? (
                  vaseListRef.current
                    .slice(page * perPage, (page + 1) * perPage)
                    .map((item) => (
                      <Card
                        key={item.id}
                        sx={{
                          position: "relative",
                          gridColumn: "span 3",
                          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.03)",
                          borderRadius: "18px",
                          direction: i18n.dir() === "ltr" ? "ltr" : "rtl",
                          display: "grid",
                          gridTemplateColumns: "1fr",
                          gridTemplateRows: "16rem 5rem",
                          maxWidth: 330,
                          width: "260px",
                          padding: "1rem !important",
                          paddingBottom: " 0 !important",
                        }}
                        className="ourShopPageCardMobile"
                      >
                        <div
                          style={{
                            display: "inline-block",
                            height: "230px",
                            gridColumnStart: "1",
                            gridColumnEnd: "2",
                            gridRowStart: "1",
                            gridRowEnd: "2",
                            backgroundColor: "#fce2e2",
                            borderRadius: "18px",
                            padding: "1rem",
                          }}
                        >
                          <img
                            src={`${imageURL}${item.photo}`}
                            alt={item.photo}
                            style={{
                              textDecration: "none",
                              display: "inline-block",
                              width: "100%",
                              maxHeight: "100%",
                              borderRadius: "18px",
                            }}
                          />
                        </div>

                        <CardContent
                          sx={{
                            // marginTop: "2rem",
                            padding: "1rem 0",
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          {item.offer === "0" ? (
                            ""
                          ) : item.offer === null ? (
                            ""
                          ) : (
                            <Typography
                              variant="body2"
                              sx={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                color: "white",
                                padding: "0.5rem",
                                fontSize: "1.2rem",
                                fontWeight: 700,
                                background: "#FFDC00",
                                borderRadius: "0px 18px 0px 18px",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              OFFER <br /> {`${item.offer} %`}
                            </Typography>
                          )}
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#3A6A8F",
                              padding: "0 1rem",
                              fontSize: "1rem",
                            }}
                          >
                            {i18n.dir() === "ltr" ? item.nameEN : item.nameAR}
                          </Typography>
                          <AddDialog item={item} />
                        </CardContent>
                        <CardActions sx={{ padding: "0" }}>
                          <Typography
                            variant="body2"
                            sx={{
                              position: "relative",
                              bottom: 0,
                              left: i18n.dir() === "ltr" ? "15%" : " ",
                              right: i18n.dir() === "ltr" ? " " : "8%",
                              color: "white",
                              padding: "0.5rem",
                              fontSize: "1.2rem",
                              fontWeight: 700,
                              background: "#3A6A8F",
                              borderRadius: "18px 18px 0px 0px",
                            }}
                          >
                            {i18n.dir() === "ltr"
                              ? `${item.price} QAR`
                              : `${item.price} ريال قطري`}
                          </Typography>
                        </CardActions>
                      </Card>
                    ))
                ) : (
                  <p style={{ gridColumnStart: "1", gridColumnEnd: "10" }}>
                    {t("Dashboard.noElements")}
                  </p>
                )}
              </Box>
            </TabPanel>
            <TabPanel value="Hand-Bouquet">
              {" "}
              <Box
                sx={{
                  gridColumnStart: "2",
                  gridColumnEnd: "12",
                  display: "grid",
                  maxWidth: "100%",
                  gridTemplateColumns: "repeat(12,1fr)",
                  gridAutoRows: "1fr",
                  gridAutoColumns: "1fr",
                  margin: "4rem 3rem",
                  gap: "3rem",
                }}
                className="ourShopTapBoxContainer"
              >
                {handBouquetListRef.current.length > 0 ? (
                  handBouquetListRef.current
                    .slice(page * perPage, (page + 1) * perPage)
                    .map((item) => (
                      <Card
                        key={item.id}
                        sx={{
                          position: "relative",
                          gridColumn: "span 3",
                          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.03)",
                          borderRadius: "18px",
                          direction: i18n.dir() === "ltr" ? "ltr" : "rtl",
                          display: "grid",
                          gridTemplateColumns: "1fr",
                          gridTemplateRows: "16rem 5rem",
                          maxWidth: 330,
                          width: "260px",
                          padding: "1rem !important",
                          paddingBottom: " 0 !important",
                        }}
                        className="ourShopPageCardMobile"
                      >
                        <div
                          style={{
                            display: "inline-block",
                            height: "230px",
                            gridColumnStart: "1",
                            gridColumnEnd: "2",
                            gridRowStart: "1",
                            gridRowEnd: "2",
                            backgroundColor: "#fce2e2",
                            borderRadius: "18px",
                            padding: "1rem",
                          }}
                        >
                          <img
                            src={`${imageURL}${item.photo}`}
                            alt={item.photo}
                            style={{
                              textDecration: "none",
                              display: "inline-block",
                              width: "100%",
                              maxHeight: "100%",
                              borderRadius: "18px",
                            }}
                          />
                        </div>

                        <CardContent
                          sx={{
                            //marginTop: "2rem",
                            padding: "1rem 0",
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          {item.offer === "0" ? (
                            ""
                          ) : item.offer === null ? (
                            ""
                          ) : (
                            <Typography
                              variant="body2"
                              sx={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                color: "white",
                                padding: "0.5rem",
                                fontSize: "1.2rem",
                                fontWeight: 700,
                                background: "#FFDC00",
                                borderRadius: "0px 18px 0px 18px",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              OFFER <br /> {`${item.offer} %`}
                            </Typography>
                          )}
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#3A6A8F",
                              padding: "0 1rem",
                              fontSize: "1rem",
                            }}
                          >
                            {i18n.dir() === "ltr" ? item.nameEN : item.nameAR}
                          </Typography>
                          <AddDialog item={item} />
                        </CardContent>
                        <CardActions sx={{ padding: "0" }}>
                          <Typography
                            variant="body2"
                            sx={{
                              position: "relative",
                              bottom: 0,
                              left: i18n.dir() === "ltr" ? "15%" : " ",
                              right: i18n.dir() === "ltr" ? " " : "8%",
                              color: "white",
                              padding: "0.5rem",
                              fontSize: "1.2rem",
                              fontWeight: 700,
                              background: "#3A6A8F",
                              borderRadius: "18px 18px 0px 0px",
                            }}
                          >
                            {i18n.dir() === "ltr"
                              ? `${item.price} QAR`
                              : `${item.price} ريال قطري`}
                          </Typography>
                        </CardActions>
                      </Card>
                    ))
                ) : (
                  <p style={{ gridColumnStart: "1", gridColumnEnd: "10" }}>
                    {t("Dashboard.noElements")}
                  </p>
                )}
              </Box>
            </TabPanel>
            <TabPanel value="Flower-Box">
              <Box
                sx={{
                  gridColumnStart: "2",
                  gridColumnEnd: "12",
                  display: "grid",
                  maxWidth: "100%",
                  gridTemplateColumns: "repeat(12,1fr)",
                  gridAutoRows: "1fr",
                  gridAutoColumns: "1fr",
                  margin: "4rem 3rem",
                  gap: "3rem",
                }}
                className="ourShopTapBoxContainer"
              >
                {flowerBoxRef.current.length > 0 ? (
                  flowerBoxRef.current
                    .slice(page * perPage, (page + 1) * perPage)
                    .map((item) => (
                      <Card
                        key={item.id}
                        sx={{
                          position: "relative",
                          gridColumn: "span 3",
                          boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.03)",
                          borderRadius: "18px",
                          direction: i18n.dir() === "ltr" ? "ltr" : "rtl",
                          display: "grid",
                          gridTemplateColumns: "1fr",
                          gridTemplateRows: "16rem 5rem",
                          maxWidth: 330,
                          width: "260px",
                          padding: "1rem !important",
                          paddingBottom: " 0 !important",
                        }}
                        className="ourShopPageCardMobile"
                      >
                        <div
                          style={{
                            display: "inline-block",
                            height: "230px",
                            gridColumnStart: "1",
                            gridColumnEnd: "2",
                            gridRowStart: "1",
                            gridRowEnd: "2",
                            backgroundColor: "#fce2e2",
                            borderRadius: "18px",
                            padding: "1rem",
                          }}
                        >
                          <img
                            src={`${imageURL}${item.photo}`}
                            alt={item.photo}
                            style={{
                              textDecration: "none",
                              display: "inline-block",
                              width: "100%",
                              maxHeight: "100%",
                              borderRadius: "18px",
                            }}
                          />
                        </div>

                        <CardContent
                          sx={{
                            //marginTop: "2rem",
                            padding: "1rem 0",
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          {item.offer === "0" ? (
                            ""
                          ) : item.offer === null ? (
                            ""
                          ) : (
                            <Typography
                              variant="body2"
                              sx={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                color: "white",
                                padding: "0.5rem",
                                fontSize: "1.2rem",
                                fontWeight: 700,
                                background: "#FFDC00",
                                borderRadius: "0px 18px 0px 18px",
                                color: "black",
                                textAlign: "center",
                              }}
                            >
                              OFFER <br /> {`${item.offer} %`}
                            </Typography>
                          )}
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#3A6A8F",
                              padding: "0 1rem",
                              fontSize: "1rem",
                            }}
                          >
                            {i18n.dir() === "ltr" ? item.nameEN : item.nameAR}
                          </Typography>
                          <AddDialog item={item} />
                        </CardContent>
                        <CardActions sx={{ padding: "0" }}>
                          <Typography
                            variant="body2"
                            sx={{
                              position: "relative",
                              bottom: 0,
                              left: i18n.dir() === "ltr" ? "15%" : " ",
                              right: i18n.dir() === "ltr" ? " " : "8%",
                              color: "white",
                              padding: "0.5rem",
                              fontSize: "1.2rem",
                              fontWeight: 700,
                              background: "#3A6A8F",
                              borderRadius: "18px 18px 0px 0px",
                            }}
                          >
                            {i18n.dir() === "ltr"
                              ? `${item.price} QAR`
                              : `${item.price} ريال قطري`}
                          </Typography>
                        </CardActions>
                      </Card>
                    ))
                ) : (
                  <p style={{ gridColumnStart: "1", gridColumnEnd: "10" }}>
                    {t("Dashboard.noElements")}
                  </p>
                )}
              </Box>
            </TabPanel>
          </TabContext>
          <ReactPaginate
            previousLabel={i18n.dir() === "ltr" ? "Prev" : "السابق"}
            nextLabel={i18n.dir() === "ltr" ? "Next" : "التالي"}
            pageCount={pages}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default OurShop;
