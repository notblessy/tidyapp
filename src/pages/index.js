import React, { useEffect } from "react";
import { Grid } from "@mantine/core";

import CodeEditor from "../components/CodeEditor";
import CustomFooter from "../components/CustomFooter";

const generateRandomId = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

function Home() {
  const [id, setId] = React.useState("");
  const [initialValue, setInitialValue] = React.useState("");

  useEffect(() => {
    const initialValue = localStorage.getItem("json");
    if (initialValue) {
      setInitialValue(initialValue);
    }

    const id = localStorage.getItem("id");
    if (id) {
      setId(id);
    } else {
      setId(generateRandomId(7));
    }
  }, []);

  return (
    <>
      <Grid
        gutter={0}
        style={{ minHeight: "100vh", position: "relative", overflow: "auto" }}
      >
        <Grid.Col span={12}>
          <CodeEditor id={id} initialValue={initialValue} />
        </Grid.Col>
        <Grid.Col
          span={12}
          style={{
            background: "#FFFFFF",
            position: "absolute",
            width: "100%",
            borderTop: "1px solid #EEEEEE",
            bottom: 0,
          }}
        >
          <CustomFooter />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Home;
