import { Box, Button, Grid, Group, Text } from "@mantine/core";
import { IconArrowsMinimize, IconBraces, IconCode, IconTrash } from "@tabler/icons-react";

const CustomHeader = () => {
  return (
    <>
      <Box>
        <Grid>
          <Grid.Col span={12} style={{ borderBottom: '1px solid #EEEEEE' }}>
            <Group style={{ padding: '0 10px' }}>
              <IconCode size={40} />
              <Text fw={600}>JSON Playground</Text>
              <Group style={{ padding: '0 10px' }} justify="flex-end">
                <Button leftSection={<IconTrash size={16} />} variant="default" radius={0}>Clear</Button>
                <Button leftSection={<IconArrowsMinimize size={16} />} variant="default" radius={0}>Minify</Button>
                <Button leftSection={<IconBraces size={16} />} variant="default" radius={0}>Prettify</Button>
              </Group>
            </Group>
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
}

export default CustomHeader;