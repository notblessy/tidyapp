import { Box, Button, Grid, Group, Image, Text, UnstyledButton } from "@mantine/core";
import React, { useRef, useState } from "react";

import { Editor } from "@monaco-editor/react";
import { IconAlertCircle, IconArrowDown, IconArrowsMinimize, IconBraces, IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons-react";

const CodeEditor = () => {
  const [value, setValue] = useState();
  const [showDesc, setHideDesc] = useState(true);


  const [errorCount, setErrorCount] = useState(0);
  const [err, setError] = useState([]);

  const editorRef = useRef(null);

  const options = {
    readOnly: false,
    fontSize: "16px",
    minimap: { enabled: false },
  };

  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    monaco.editor.defineTheme('nbTheme', {
      "base": "vs",
      "inherit": false,
      "rules": [
        { token: '', foreground: '000000', background: 'fffffe' },
        { token: 'invalid', foreground: 'cd3131' },
        { token: 'emphasis', fontStyle: 'italic' },
        { token: 'strong', fontStyle: 'bold' },

        { token: 'variable', foreground: '001188' },
        { token: 'variable.predefined', foreground: '4864AA' },
        { token: 'constant', foreground: 'dd0000' },
        { token: 'comment', foreground: '008000' },
        { token: 'number', foreground: '098658' },
        { token: 'number.hex', foreground: '3030c0' },
        { token: 'regexp', foreground: '800000' },
        { token: 'annotation', foreground: '808080' },
        { token: 'type', foreground: '008080' },

        { token: 'delimiter', foreground: '000000' },
        { token: 'delimiter.html', foreground: '383838' },
        { token: 'delimiter.xml', foreground: '0000FF' },

        { token: 'tag', foreground: '800000' },
        { token: 'tag.id.pug', foreground: '4F76AC' },
        { token: 'tag.class.pug', foreground: '4F76AC' },
        { token: 'meta.scss', foreground: '800000' },
        { token: 'metatag', foreground: 'e00000' },
        { token: 'metatag.content.html', foreground: 'FF0000' },
        { token: 'metatag.html', foreground: '808080' },
        { token: 'metatag.xml', foreground: '808080' },
        { token: 'metatag.php', fontStyle: 'bold' },

        { token: 'key', foreground: '863B00' },
        { token: 'string.key.json', foreground: 'A31515' },
        { token: 'string.value.json', foreground: '0451A5' },

        { token: 'attribute.name', foreground: 'FF0000' },
        { token: 'attribute.value', foreground: '0451A5' },
        { token: 'attribute.value.number', foreground: '098658' },
        { token: 'attribute.value.unit', foreground: '098658' },
        { token: 'attribute.value.html', foreground: '0000FF' },
        { token: 'attribute.value.xml', foreground: '0000FF' },

        { token: 'string', foreground: 'A31515' },
        { token: 'string.html', foreground: '0000FF' },
        { token: 'string.sql', foreground: 'FF0000' },
        { token: 'string.yaml', foreground: '0451A5' },

        { token: 'keyword', foreground: '0000FF' },
        { token: 'keyword.json', foreground: '0451A5' },
        { token: 'keyword.flow', foreground: 'AF00DB' },
        { token: 'keyword.flow.scss', foreground: '0000FF' },

        { token: 'operator.scss', foreground: '666666' },
        { token: 'operator.sql', foreground: '778899' },
        { token: 'operator.swift', foreground: '666666' },
        { token: 'predefined.sql', foreground: 'C700C7' },
      ],
      "colors": {
        "editor.foreground": "#000000",
        "editor.background": "#f4f9fb",
        "editor.selectionBackground": "#aed5df",
        "editor.lineHighlightBackground": "#e0eff3",
        "editorIndentGuide.activeBackground": "#D3D3D3",
        "editor.selectionHighlightBorder": "#ADD6FF4D"
      }
    });
    monaco.editor.setTheme('nbTheme')

    editor.onDidChangeModelContent(() => {
      const markers = monaco.editor.getModelMarkers();

      const errorMarkers = markers.filter((marker) => marker.severity === monaco.MarkerSeverity.Error);
      setError(errorMarkers)
      setErrorCount(errorMarkers.length);

    });
  };

  const handlePrettify = () => {
    editorRef.current.trigger('format', 'editor.action.formatDocument')
  }

  const handleMinify = () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();

      try {
        const parsedJSON = JSON.parse(code);
        const minifiedJSON = JSON.stringify(parsedJSON);
        editorRef.current.setValue(minifiedJSON);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.setValue('');
    }
  };

  const errColor = errorCount > 0 && value ? {
    background: '#f2c1c1',
    color: '#9c4747'
  } : {
    background: "#FFFFFF",
    color: "#2e1e1e"
  }

  return (
    <>
      <Box style={{ width: '100%', background: '#FFFFFF', borderBottom: '1px solid #EEEEEE', padding: '10px 0' }}>
        <Grid>
          <Grid.Col span={12} style={{ borderBottom: '1px solid #EEEEEE' }}>
            <Group style={{ padding: '0 10px' }}>
              <Image
                radius="md"
                h={25}
                w="auto"
                fit="contain"
                src="/json-web.png"
              />
              <Text fw={600}>JSON Playground</Text>
              <Group style={{ padding: '0 10px' }} justify="flex-end">
                <Button
                  leftSection={<IconTrash size={16} />}
                  variant="default"
                  radius={0}
                  onClick={handleClear}
                >
                  Clear
                </Button>
                <Button
                  leftSection={<IconArrowsMinimize size={16} />}
                  variant="default"
                  radius={0}
                  onClick={handleMinify}
                >
                  Minify
                </Button>
                <Button
                  leftSection={<IconBraces size={16} />}
                  onClick={handlePrettify}
                  variant="default"
                  radius={0}
                >Prettify</Button>
              </Group>
            </Group>
          </Grid.Col>
        </Grid>
      </Box>
      <Box style={{ borderBottom: '1px solid #EEEEEE', width: '100%', height: showDesc ? "350px" : "90vh" }}>
        <Editor
          style={{ background: '#F00' }}
          value={value}
          language="json"
          options={options}
          onMount={editorDidMount}
          onChange={(value, e) => { setValue(value) }}
        />
      </Box>
      <Box style={{ background: errColor.background, borderBottom: '1px solid #EEEEEE', width: '100%', position: showDesc ? 'relative' : 'absolute', bottom: showDesc ? 0 : 55 }}>
        <UnstyledButton style={{ width: '100%' }} onClick={() => setHideDesc(!showDesc)}>
          <Group style={{ padding: '15px 10px' }}>
            <IconAlertCircle size="20px" style={{ color: errColor.color }} />
            <Text fw={400} size="14px" style={{ color: errColor.color }}>{`Problems Found (${value ? errorCount : 0})`}</Text>
            {
              showDesc ?
                <IconChevronDown size="20px" />
                :
                <IconChevronUp size="20px" />
            }
          </Group>
        </UnstyledButton>
      </Box>
      {
        showDesc ?
          <Box style={{ background: '#FFFFFF', width: '80%', padding: '5px 10px 60px' }}>
            <Text style={{ padding: '10px 10px 5px' }} fw={500}>What is JSON Playground?</Text>
            <Text style={{ padding: '5px 10px' }} size="sm">Introducing the JSON Playground, a versatile and user-friendly online tool designed to simplify your JSON editing experience. Whether you're a seasoned developer or a newcomer to JSON, our playground provides a seamless environment for error detection, automatic formatting, and a clean, intuitive design.</Text>
            <Text style={{ padding: '5px 10px' }} size="sm">JSON Playground is your go-to online JSON editing tool that combines error detection, automatic formatting, and a user-friendly design into one seamless experience. Whether you're debugging JSON data or simply crafting new structures, our playground streamlines the process, making your JSON-related tasks more efficient and enjoyable. Try it today and witness the difference for yourself!</Text>
          </Box>
          :
          null
      }
    </>
  );
};

export default CodeEditor;
