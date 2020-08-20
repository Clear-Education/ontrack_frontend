import React, { createRef } from "react";

// Import dependencies
import styles from "./styles.module.scss";

/**
 * Recieves the input and de handler on file selection
 * Change select area and input style in ./styles.module.scss file
 */
const InputFile = ({ onFilesAdded, input }) => {
  const inputRef = createRef();

  const openFileDialog = () => {
    if (input.fileAreaDisabled) return;
    inputRef.current.click();
  };

  const uploadFile = (event) => {
    if (input.fileAreaDisabled) return;
    if (onFilesAdded) {
      onFilesAdded(input.name, input.fileAcceptMultiple, event.target.files);
    }
  };

  return (
    <>
      <div
        className={styles.drop_zone}
        style={
          input.fileAreaDisabled
            ? { cursor: "default", opacity: "0.5" }
            : { cursor: "pointer" }
        }
        onClick={!input.fileAreaDisabled ? openFileDialog : undefined}
      >
        {input.fileAreaIcon}
        {input.fileAreaTitle && (
          <p
            style={{ fontSize: input.fileAreaTitle.size }}
            className={styles.input_title}
          >
            {input.fileAreaTitle.text}
          </p>
        )}
        {input.fileAreaDescription && (
          <p
            className={styles.input_description}
            style={{ fontSize: input.fileAreaDescription.size }}
          >
            {input.fileAreaDescription.text}
          </p>
        )}
        <input
          ref={inputRef}
          className={styles.file_input}
          type="file"
          multiple={!!input.fileAcceptMultiple}
          onChange={uploadFile}
          accept={input.fileType ? input.fileType : "image/*"}
        />
      </div>
    </>
  );
};

export default InputFile;
