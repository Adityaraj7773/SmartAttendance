import React, { useContext, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Loading from "../Components/Loading";
import ViewAttendance from "../Components/ViewAttendance";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import { useNavigate, useParams } from "react-router-dom";
import {
  PlayCircleFilledWhiteRounded,
  ResetTvRounded,
  RestartAltRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { StateContext } from "../store/context";
import { AlertContext } from "./../store/AlertContext";
// async function loadLabeledImages() {
//   const labels = [
//     "20T6102_Aarti Vachane",
//     "20T6103_Aarushi Jain",
//     "20T6104_Adarsh Kadbe",
//     "20T6106_Adityaraj Singh Rathore",
//     "20T6107_Akshay Toshniwal",
//     "20T6108_Aman Choure",
//     "20T6113_Anush Airan",
//     "20T6116_Aryan Sharma",
//     "20T6117_Ayush Agnihotri",
//     "20T6118_Ayush Khatore",
//     "20T6119_Ayush Mali",
//     "20T6120_Bhagyashri Gayakwad",
//     "20T6123_Deepak Gehlot",
//     "20T6123_Dhananjay Agarwal",
//     "20T6124_Dharati Patel",
//     "20T6126_Divya Das",
//     "20T6127_Gautam Jain",
//     "20T6131_Krishna Dhurvey",
//     "20T6135_Mitesh Kansotia",
//     "20T6136 Nainika Trivedi",
//     "20T6137_Naman Jain",
//     "20T6138_Naman Shah",
//     "20T6140_Palak Bijole",
//     "20T6142_Pranjali Talegaonkar",
//     "20T6143_Prashansa Bharti",
//     "20T6144_Prateek Kushwah",
//     "20T6145_Ram Uttwani",
//     "20T6146_Ramashankar Prajapati",
//     "20T6147_Ravi Bhagat",
//     "20T6148_Rishi Gupta",
//     "20T6149_Rohan Shukla",
//     "20T6150_Ruchi Sahu",
//     "20T6151_Samkit Deriya",
//     "20T6152_Sandipan Dwivedi",
//     "20T6154_Sanjay Singh Rajpoot",
//     "20T6156_Sarthak Goyal",
//     "20T6157_Shivam Umariya",
//     "20T6158_Shivani Bakode",
//     "20T6159_Shivraj Yadav",
//     "20T6161_Shreyansh Chelwat",
//     "20T6162_Shubham Thakur",
//     "20T6163_Siddhi Jaiswal",
//     "20T6164_Soumy Salvi",
//     "20T6166_Vaishnavi Verma",
//     "20T6167_Vijay Kumar Uttwani",
//     "20T6168_Vikash Arya",
//     "20T6172_Damini Patidar",
//     "20T6176_Prachi Goyal",
//     "21T6181_Anmol Dhanariya",
//     "21T6182_Arpan Mahobiya",
//     "21T6183_Dheeraj Patel",
//     "21T6186_Krishna Kudale",
//   ];

//   return Promise.all(
//     labels.map(async (label) => {
//       const descriptions = [];
//       for (let i = 1; i <= 1; i++) {
//         const IMAGE_URL = process.env.PUBLIC_URL + "/StudentData";
//         const img = await faceapi.fetchImage(IMAGE_URL + `/${label}.jpg`);
//         const detections = await faceapi
//           .detectSingleFace(img)
//           .withFaceLandmarks()
//           .withFaceDescriptor();
//         descriptions.push(detections.descriptor);
//       }
//       return new faceapi.LabeledFaceDescriptors(label, descriptions);
//     })
//   );
// }

function UploadAttendance() {
  const router = useNavigate();
  const [attendanceList, setAttendanceList] = useState([]);
  const [images, setImages] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingtext, setLoadingtext] = useState("");
  const [toggleViewAttendance, setToggleViewAttendance] = useState(false);
  const { year, sem, branch, section } = useParams();
  if (!year || !sem || !branch || !section) {
    router("/select");
  }
  useEffect(() => {
    const loadModels = async () => {
      setLoading(true);
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      try {
        setLoadingtext("Loading Models");
        await Promise.all([
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.mtcnn.loadFromUri(MODEL_URL),
        ]);
        console.log("Models Loaded");
        setLoadingtext("Loading Student Data");
        //   if (localStorage.getItem("studentsData")) {
        //     setStudentsData(
        //       JSON.parse(localStorage.getItem("studentsData")).map((d) =>
        //         faceapi.LabeledFaceDescriptors.fromJSON(d)
        //       )
        //     );
        //     console.log(
        //       JSON.parse(localStorage.getItem("studentsData")).map((d) =>
        //         faceapi.LabeledFaceDescriptors.fromJSON(d)
        //       )
        //     );
        //   } else {
        //     const data = await loadLabeledImages();
        //     setStudentsData(data);
        //     console.log(data);
        //     localStorage.setItem("studentsData", JSON.stringify(data));
        //   }
        //   console.log(studentsData);
        fetch(
          `${process.env.REACT_APP_SERVER_URL}api/student/getStudentsDecoded`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              passoutYear: year,
              branch: branch,
              section: section,
            }),
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data.students);
            setStudentsList(data.students);
            setStudentsData(
              data.students.map((d) => {
                return faceapi.LabeledFaceDescriptors.fromJSON(
                  d.decodedImage[0]
                );
              })
            );
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    loadModels();
  }, []);
  console.log(studentsData);
  const execDetection = async (loadImage, index, studentData) => {
    const outputImagePreview = document.querySelector(".image-output");
    const outputPreviewContainer = document.querySelector(
      ".output-preview-container"
    );
    const outputLabelTag = document.querySelector("#output-preview-label");
    let image;
    let canvas;
    const sortedList = [];
    if (loadImage === null) outputLabelTag.textContent = "No Image Found";
    else {
      while (sortedList.length !== 0) {
        sortedList.pop();
      }

      image = await faceapi.bufferToImage(loadImage);
      const imageLabel = document.createElement("p");
      canvas = await faceapi.createCanvasFromMedia(image);
      console.log(canvas);
      outputImagePreview.style.display = "flex";
      outputImagePreview.style.justifyContent = "start";
      outputImagePreview.style.alignItems = "center";
      outputImagePreview.style.position = "relative";

      const holder = document.createElement("div");
      holder.setAttribute("id", `holder${index}`);
      holder.setAttribute("className", "image-holder");
      holder.style.position = "relative";
      holder.style.width = "300px";
      holder.style.height = "300px";
      outputPreviewContainer.appendChild(holder);

      image.setAttribute("id", "output-preview");
      image.style.display = "block";
      image.style.objectFit = "contain";
      image.style.borderRadius = "1em";
      image.style.width = "300px";
      image.style.height = "300px";
      document.querySelector(`#holder${index}`).appendChild(image);

      // let imgH = image.height;
      // document
      //   .querySelector(`#holder${index}`)
      //   .setAttribute("style", `height:${imgH + 30};`);

      // totalOutputHeight += imgH + 30;

      // imageLabel.setAttribute("id", "output-preview-label");
      // imageLabel.textContent = `output_${loadImage.name}`;
      // imageLabel.style.textAlign = "center";
      // imageLabel.style.marginTop = "0.3em";
      // imageLabel.style.marginBottom = "0.3em";
      // document.querySelector(`#holder${index}`).appendChild(imageLabel);

      const faceMatcher = await new faceapi.FaceMatcher(studentData, 0.53);
      const displaySize = {
        width: 300,
        height: 300,
      };
      await faceapi.matchDimensions(canvas, displaySize);
      // console.log(displaySize);

      const detections = await faceapi
        .detectAllFaces(
          image,
          new faceapi.SsdMobilenetv1Options({ minConfidence: 0.33 })
        )
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizeDetections = await faceapi.resizeResults(
        detections,
        displaySize
      );
      const results = await resizeDetections.map((d) =>
        faceMatcher.findBestMatch(d.descriptor)
      );
      // console.log(resizeDetections);
      // console.log(results);

      await results.forEach((student) => {
        sortedList.push(
          student.toString().slice(0, student.toString().length - 6)
        );
      });

      await results.forEach((result, i) => {
        const box = resizeDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box);
        drawBox.draw(canvas);
      });
      canvas.setAttribute("style", "position:absolute;top:0px;");
      document.querySelector(`#holder${index}`).appendChild(canvas);

      sortedList.sort();
      console.log(sortedList);

      return sortedList;
    }
  };
  const { Message } = useContext(AlertContext);

  const changeHandler = async (event) => {
    setImages(event.target.files);
  };
  const startRecognition = async () => {
    if (studentsData.length === 0)
      return Message().warning("No Students Found", false);

    console.log("hi");

    let finalList = [];

    if (images.length === 0) return;
    setLoadingtext("Processing Images");
    setLoading(true);

    for (let i = 0; i < images.length; i++) {
      finalList = [
        ...finalList,
        ...(await execDetection(images[i], i, studentsData)),
      ];
    }

    const allCanvas = document.querySelectorAll("canvas");
    // const holders = document.querySelectorAll(".image-holder");

    for (let i of allCanvas) {
      i.style.position = "absolute";
      i.style.bottom = `${i.height + 30}`;
    }

    finalList.sort();
    setAttendanceList(finalList);
    if (finalList.length === 0) {
      Message().warning("No Students Found", false);
    }
    setLoading(false);
  };
  const selectImage = useRef(null);

  if (toggleViewAttendance)
    return (
      <ViewAttendance
        studentsList={studentsList}
        attendanceList={attendanceList}
        setToggleViewAttendance={setToggleViewAttendance}
      />
    );
  // if (
  //   !passoutYear?.value ||
  //   !semester?.value ||
  //   !branch?.value ||
  //   !section?.value
  // ) {
  //   router("/select");
  // }
  return (
    <>
      {loading && <Loading text={loadingtext} />}{" "}
      <main>
        <button
          className="style1"
          onClick={() => {
            router(-1);
          }}
        >
          <i class="fa fa-arrow-circle-left"></i>
        </button>
        <div className="main-flex-1">
          <div>
            <h5 className="imageHeads">Uploaded Images</h5>
          </div>
          <div className="image-input">
            <div className="input-preview-container">
              {images.length === 0 && (
                <label id="input-preview-label" htmlFor="preview">
                  <ImageIcon />
                </label>
              )}
              {images.length > 0 &&
                Array.from(images).map((image) => {
                  console.log(image);
                  return (
                    <img
                      height={200}
                      width={200}
                      src={URL.createObjectURL(image)}
                    ></img>
                  );
                })}
              <img id="input-preview" />
            </div>

            <input
              multiple
              ref={selectImage}
              id="upload"
              onChange={changeHandler}
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/heic"
            />
          </div>
          <div>
            <h5 className="imageHeads">Results</h5>
          </div>
          <div className="image-output">
            <div className="output-preview-container">
              <div className="holder">
                <label id="output-preview-label" htmlFor="preview">
                  {attendanceList.length === 0 && <ImageIcon />}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="main-flex-2">
          <button
            id="upload-button"
            className="upload-page-button"
            onClick={() => {
              selectImage.current.click();
            }}
          >
            <label className="material-icons">
              {" "}
              <CloudUploadIcon style={{ cursor: "pointer" }} />
            </label>
            Upload Images
          </button>
          <button
            id="reset-button"
            className="upload-page-button"
            onClick={() => {
              setImages([]);
              setAttendanceList([]);
              const outputImagePreview =
                document.getElementsByClassName(".image-holder");
              for (let i of outputImagePreview) {
                i.innerHTML = "";
                console.log(i);
              }
            }}
          >
            <label className="material-icons">
              {" "}
              <RestartAltRounded style={{ cursor: "pointer" }} />
            </label>
            Reset
          </button>
          <button
            id="start-button"
            className="upload-page-button"
            onClick={startRecognition}
            disabled={images.length === 0}
          >
            <PlayCircleFilledWhiteRounded />
            Start Recognition
          </button>
          {/* <button id="attendance-button" style={{ display: "inline-block" }}>
            <i className="material-icons">groups</i>
          </button> */}
          {attendanceList.length > 0 && (
            <button
              onClick={() => {
                setToggleViewAttendance(true);
              }}
            >
              <VisibilityRounded />
              View Attendance
            </button>
          )}
        </div>
      </main>
      {/* <div id="aLContainer" className="main-flex-3">
        <div className="oL">
          <h3 className="attendanceHeading">Attendance List :</h3>
          <ol id="aL"></ol>
        </div>
      </div>
      <div className="centerF">
        <button id="textFileBtn" style={{ display: "inline-block" }}>
          <i className="material-icons">cloud_download</i>
        </button>
      </div> */}
    </>
  );
}

export default UploadAttendance;
