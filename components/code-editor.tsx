"use client"
import { Editor } from "@monaco-editor/react"
import { useStore } from "@xyflow/react"
import { useRef } from "react";

export function CodeEditor ({ nodeId, file, index}: any){
  const updateNodeCode = useStore((state: any) => state.updateNodeCode);
  const containerRef = useRef<HTMLDivElement>(null); // Parent ka reference liya jata hai
return (
  <div ref={containerRef} className="h-full w-full nodrag nowheel nopan relative">

    <Editor
      height="100%"
      width="100%"
      theme="vs-dark"
      defaultLanguage="typescript"
      path={`${nodeId}-${file.name}`}
      defaultValue={file.content}
      onChange={(val) => {
        if (val !== undefined && val !== file.content) {
          updateNodeCode(nodeId, index, val);
        }
      }}
      onMount={(editor, monaco) => {
        // power feature
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
          console.log("Code Saved!"); // Yahan save logic daal sakte hain
        });
        // SPACE BAR FIX: Focus lock kiya jata hai
        editor.onKeyDown((e) => {
          if (e.keyCode === 10) { // Space key
            e.stopPropagation(); // React Flow ko event rokne se mana kiya jata hai
          }
        });
      }}
      options={{
        minimap: { enabled: false },
        fontSize: 13, // Thoda bada aur readable
        wordWrap: "on", // Horizontal scroll ki dikkat khatam
        lineNumbers: "on",
        automaticLayout: true,
        fixedOverflowWidgets: true,
        suggestFontSize: 13,
        fontFamily: "'Fira Code', monospace", // Developer look
        bracketPairColorization: { enabled: true }, // Logic samajhna asaan hota hai
        overflowWidgetsDomNode: containerRef.current as any,
      }}
      />
      </div>
  );
}