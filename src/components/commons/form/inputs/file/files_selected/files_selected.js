// Import dependencies
import { Row, Col, Collapse } from "react-bootstrap";

// Import components
import styles from "./styles.module.scss";

/**
 * Change styles in ./styles.module.scss file
 */
const FilesSelected = ({ state, input }) => {
  return (
    <Row lg={12} md={12} sm={12} xs={12}>
      <Col
        className="left"
        lg={12}
        md={12}
        sm={12}
        xs={12}
        styles={{ padding: 0 }}
      >
        <Collapse in={state[input.name]}>
          {state[input.name] && state[input.name].length > 0 ? (
            <>
              {state[input.name].map((file) => (
                <div className={styles.preview_photo}>
                  <div className={styles.photo_container}>
                    <img
                      src="/icons/multiples_files.svg"
                      alt="img-preview"
                      className={styles.defaul_img}
                    />
                    <div className={styles.file_detail}>
                      <p>{file.name}</p>
                      <p>
                        {Math.round(file.size / (1024 * 1024))}
                        <strong> MB</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className={styles.preview_photo}>
              <div className={styles.photo_container}>
                <img
                  src="#"
                  id={`${input.name}_img_preview`}
                  alt="img-preview"
                  className={styles.selected_img}
                />
                {state[input.name] && (
                  <div className={styles.file_detail}>
                    <p>{state[input.name].name}</p>
                    <p>
                      {Math.round(state[input.name].size / (1024 * 1024))}
                      <strong> MB</strong>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Collapse>
      </Col>
    </Row>
  );
};

export default FilesSelected;
