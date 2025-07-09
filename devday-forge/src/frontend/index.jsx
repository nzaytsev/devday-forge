import React, { useEffect, useState } from "react";
import ForgeReconciler, { Button, Modal, Text } from "@forge/react";
import { invoke } from "@forge/bridge";

const ModalContent = () => {
  useEffect(() => {
    invoke("getText", { example: "my-invoke-variable1" }).then(setData1);
    return () => {
      setData1(null);
    };
  }, []);
};

const App = () => {
  const [data, setData] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [data1, setData1] = useState(null);

  console.log({ data });
  useEffect(() => {
    invoke("getText", { example: "my-invoke-variable" }).then(setData);
  }, []);
  return (
    <>
      <Button
        onClick={async () => {
          const response = await api
            .asUser()
            .requestJira(route`/rest/api/2/users/search`, {
              headers: {
                Accept: "application/json",
              },
            });
          console.log({ response });
        }}
      >
        Test API
      </Button>
      <Button
        onClick={() => {
          setOpen(true);
          invoke("getText", { example: "my-invoke-variable" }).then(setData1);
        }}
      >
        Show modal
      </Button>
      {isOpen && (
        <Modal
          label="test"
          onClose={() => {
            setOpen(false);
            setData1(null);
          }}
        >
          <ModalContent />
          <Text>{data1 ? data1 : "Loading..."}</Text>
        </Modal>
      )}
      <Text>Hello world!</Text>
      {/* <Text>{data ? data : "Loading..."}</Text> */}
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
