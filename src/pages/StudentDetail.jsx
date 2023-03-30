import { IKImage, IKUpload } from "imagekitio-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../store/context";
import * as faceapi from "face-api.js";
import { AlertContext } from "./../store/AlertContext";

function StudentDetail() {
  const [name, setName] = useState();
  const [roll, setRoll] = useState();

  const [image, setImage] = useState(
    "https://www.lifewire.com/thmb/tHjH9M19MsA9gFY-qcZvKYv5oG4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
  );
  const [decodedImage, setDecodedImage] = useState();
  const inputRef = React.useRef(null);
  const router = useNavigate();
  const { setLoading, setLoadingText } = useContext(StateContext);
  const { year, sem, branch, section } = useParams();
  if (!year || !sem || !branch || !section) {
    router("/select");
  }
  // if (
  //   !passoutYear?.value ||
  //   !semester?.value ||
  //   !branch?.value ||
  //   !section?.value
  // ) {
  //   router("/select");
  // }
  const { Message } = useContext(AlertContext);
  const onError = (err) => {
    setLoading(false);
    console.log("error", err);
  };
  const onSuccess = async (res) => {
    setLoading(false);
    console.log("success", res);
    setImage(res.url);
  };
  const submitHandler = async (e) => {
    if (
      name.trim().length === 0 ||
      roll.trim().length === 0 ||
      image.trim().length === 0
    ) {
      // alert("Please fill all the fields");
      Message().warning("Please fill all the fields", false);
      return;
    }
    setLoading(true);
    setLoadingText("Uploading data");
    let decodedImageData;
    try {
      const descriptions = [];
      for (let i = 1; i <= 1; i++) {
        const IMAGE_URL = image;
        const img = await faceapi.fetchImage(IMAGE_URL);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      decodedImageData = await new faceapi.LabeledFaceDescriptors(
        roll?.toUpperCase() + "_" + name,
        descriptions
      );
      setDecodedImage(decodedImageData);
    } catch (err) {
      // alert("Please upload a valid image");
      Message().warning("Please upload a valid image", false);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/student/upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            roll,
            image,
            decodedImage: decodedImageData,
            passoutYear: year,
            semester: sem,
            branch: branch,
            section: section,
          }),
        }
      );
      if (res.status === 201) {
        // alert("Student Added Successfully");
        Message().success("Student Added Successfully", false);
        setName("");
        setRoll("");
        setImage(
          "https://www.lifewire.com/thmb/tHjH9M19MsA9gFY-qcZvKYv5oG4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
        );
        setDecodedImage([]);
      } else {
        // alert("Student Already Exists");
        Message().warning("Student Already Exists", false);
      }
      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  console.log(decodedImage);
  useEffect(() => {
    const loadModels = async () => {
      setLoading(true);
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      try {
        setLoadingText("Loading Models");
        await Promise.all([
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.mtcnn.loadFromUri(MODEL_URL),
        ]);
        console.log("Models Loaded");
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    loadModels();
  }, []);
  return (
    <div
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button
        className="style1"
        onClick={() => {
          router(-1);
        }}
      >
        <i class="fa fa-arrow-circle-left"></i>
      </button>
      <body>
        <div className="form_elements">
          <form action="URL" className="formaction">
            <div className="heading1">
              <h3>Upload Student Details</h3>
            </div>
            <div className="form_text">
              <div>
                <label for="image">Image</label>
                <div className="column">
                  <IKImage src={image} className="uploaded-image-preview" />
                  <IKUpload
                    fileName="test-upload.png"
                    onError={onError}
                    onSuccess={onSuccess}
                    inputRef={inputRef}
                    onUploadStart={() => {
                      setLoadingText("Uploading Image");
                      setLoading(true);
                    }}
                    style={{ display: "none" }}
                  />
                  <button
                    onClick={() => {
                      inputRef.current.click();
                    }}
                    className="upload_image_button"
                  >
                    select Image
                  </button>
                </div>
              </div>
              <div>
                <label for="name">Name </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target?.value);
                  }}
                  type="text"
                  placeholder="your name"
                  id="name"
                />
              </div>
              <div>
                <label for="rollno"> Roll_No.</label>
                <input
                  value={roll}
                  onChange={(e) => {
                    setRoll(e.target?.value);
                  }}
                  type="text"
                  placeholder="ex:20T1150"
                  id="rollno"
                />
              </div>
            </div>
            <div className="submit">
              <button
                type="button"
                id="submit"
                className="submit_button"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </body>
    </div>
  );
}

export default StudentDetail;
