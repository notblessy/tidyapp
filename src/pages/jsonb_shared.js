import React from "react";
import { Grid } from "@mantine/core";

import CodeEditor from "../components/CodeEditor";
import CustomFooter from "../components/CustomFooter";

import { useJSON } from "../libs/hooks/jsonb";
import { useParams } from "react-router-dom";

function JSONBDetail() {
  const { id } = useParams();

  const { data: jsonb } = useJSON(id);

  return (
    <>
      <Grid
        gutter={0}
        style={{ minHeight: "100vh", position: "relative", overflow: "auto" }}
      >
        <Grid.Col span={12}>
          <CodeEditor id={jsonb.id} initialValue={jsonb.data} />
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

export default JSONBDetail;
