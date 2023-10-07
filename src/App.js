import React from "react";
import CustomHeader from "./components/CustomHeader";
import { Grid, Text, rem } from "@mantine/core";
import CodeEditor from "./components/CodeEditor";
import CustomFooter from "./components/CustomFooter";

function App() {
  return (
    <>
      <Grid gutter={0} style={{ minHeight: '100vh', position: 'relative', overflow: 'auto' }}>
        <Grid.Col span={12}>
          <CodeEditor />
        </Grid.Col>
        <Grid.Col
          span={12}
          style={{ background: '#FFFFFF', position: 'absolute', width: '100%', borderTop: '1px solid #EEEEEE', bottom: 0 }}
        >
          <CustomFooter />
        </Grid.Col>
      </Grid >
    </>
  );
}

export default App;


