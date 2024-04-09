import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CreateReport = () => {
  const [uid, setUid] = useState("");
  const [date, setDate] = useState("");
  const [tests, setTests] = useState([]);
  const [summary, setSummary] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [instruction, setInstruction] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  const [image, setImage] = useState("");
  // const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function submitData(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("uid", uid);
    formData.append("date", date);
    formData.append("tests", tests);
    formData.append("summary", summary);
    formData.append("diagnosis", diagnosis);
    formData.append("treatment", treatment);
    formData.append("instructions", instruction);
    formData.append("notes", notes);
    formData.append("status", status);

    if (image !== "") {
      formData.append("reportFile", image);
    }

    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    await axios
      .post(`${process.env.REACT_APP_API_URL}/report/create`, formData, {
        headers,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          // navigate("/");
          console.log("Success");
        }
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  }

  const handleImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    // setImagePreview(URL.createObjectURL(file));
    setImage(file);
  };

  return (
    <div>
      <form onSubmit={submitData} className="p-8">
        <div className="space-y-3">
          <h3 className="text-4xl text-grey mb-4">
            Create an Patient's Report
          </h3>
          <label htmlFor="Uid" className="flex flex-col">
            <span className="text-2xl">Patient's Uid</span>
            <input
              type="text"
              id="Uid"
              placeholder="Patient's Uid"
              className="input-form"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
            />
          </label>

          <label htmlFor="Date" className="flex flex-col">
            <span className="text-2xl">Report Date</span>
            <input
              type="date"
              id="Date"
              placeholder="Date"
              className="input-form"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label htmlFor="Tests" className="flex flex-col">
            <span className="text-2xl">Tests</span>
            <textarea
              type="text"
              id="Tests"
              placeholder="Enter the tests conducted"
              className="input-form"
              value={tests}
              onChange={(e) => setTests(e.target.value)}
            />
          </label>
          <label htmlFor="Summary" className="flex flex-col">
            <span className="text-2xl">Report Summary</span>
            <textarea
              type="text"
              id="Summary"
              placeholder="Report Summary"
              className="input-form"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </label>
          <label htmlFor="Diagnosis" className="flex flex-col">
            <span className="text-2xl">Diagnosis</span>
            <textarea
              type="text"
              id="Diagnosis"
              placeholder="Diagnosis"
              className="input-form"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </label>
          <label htmlFor="Treatment" className="flex flex-col">
            <span className="text-2xl">Treatment Plan</span>
            <textarea
              type="text"
              id="Treatment"
              placeholder="Treatment Plan"
              className="input-form"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
            />
          </label>
          <label htmlFor="Instructions" className="flex flex-col">
            <span className="text-2xl">Follow-up Instructions</span>
            <textarea
              type="text"
              id="Instructions"
              placeholder="Instructions"
              className="input-form"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
          </label>
          <label htmlFor="status" className="flex flex-col">
            <span className="text-2xl">Current Status</span>
            <textarea
              type="text"
              id="status"
              placeholder="Current Status"
              className="input-form"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </label>
          <label htmlFor="Notes" className="flex flex-col">
            <span className="text-2xl">Notes</span>
            <textarea
              type="text"
              id="Notes"
              placeholder="Notes"
              className="input-form"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <label htmlFor="Image" className="flex flex-col">
            <span className="text-2xl">Report File</span>
            <input
              type="file"
              id="Image"
              accept="image/*"
              placeholder="Password"
              className="input-form"
              onChange={(e) => handleImage(e)}
            />
          </label>
        </div>

        <div className="my-6 space-y-3">
          <button
            type="submit"
            className={`w-full py-4 bg-primary rounded-md text-whitee font-bold ${
              isLoading ? "opacity-60" : ""
            }`}
            disabled={isLoading}
          >
            {!isLoading ? "Create Report" : "Submiting..."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReport;
