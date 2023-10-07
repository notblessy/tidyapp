import { Box, Grid, Group, Text } from "@mantine/core";

const CustomFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Box style={{ padding: '20px 0' }}>
        <Grid>
          <Grid.Col span={12} style={{ borderBottom: '1px solid #EEEEEE' }}>
            <Group style={{ padding: '0 10px' }}>
              <Text fw={500} size="14px">
                © {currentYear} notblessy. All rights reserved.
              </Text>
            </Group>
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
}

export default CustomFooter;