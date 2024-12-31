const onChangeBranch = () => {
  const branch = document.getElementById("branch").value;
  const semester = document.getElementById("semester").value;
  const selectSemesterElement = document.getElementById("semester");
  const selectDivisionElement = document.getElementById("division");
  const selectSubjectElement = document.getElementById("subject");
  selectSemesterElement.innerHTML = "";
  const newSemOption = document.createElement("option");
  newSemOption.value = "default";
  newSemOption.textContent = "Semester";
  newSemOption.selected = true;
  selectSemesterElement.appendChild(newSemOption);
  selectDivisionElement.innerHTML = "";
  const newDivOption = document.createElement("option");
  newDivOption.value = "default";
  newDivOption.textContent = "Division";
  newDivOption.selected = true;
  selectDivisionElement.appendChild(newDivOption);
  selectSubjectElement.innerHTML = "";
  const newSubOption = document.createElement("option");
  newSubOption.value = "default";
  newSubOption.textContent = "Subject";
  newSubOption.selected = true;
  selectSubjectElement.appendChild(newSubOption);
  fetch(`/semesters?branch=${branch}&semester=${semester}`)
    .then((response) => response.json())
    .then((data) => {
      data.semesters?.forEach((sem) => {
        const option = document.createElement("option");
        option.value = sem?._id;
        option.classList.add("text-uppercase");
        option.textContent = sem?.Name;
        selectSemesterElement.appendChild(option);
      });
      data.divisions?.forEach((div) => {
        const option = document.createElement("option");
        option.value = div?._id;
        option.classList.add("text-uppercase");
        option.textContent = div?.Name;
        selectDivisionElement.appendChild(option);
      });
      data.subjects?.forEach((sub) => {
        const option = document.createElement("option");
        option.value = sub?.subject?._id;
        option.classList.add("text-uppercase");
        option.textContent = sub?.subject?.subjectFullName;
        selectSubjectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const onChangeSemester = () => {
  const branch = document.getElementById("branch").value;
  const semester = document.getElementById("semester").value;
  const selectSubjectElement = document.getElementById("subject");
  selectSubjectElement.innerHTML = "";
  const newSubOption = document.createElement("option");
  newSubOption.value = "default";
  newSubOption.textContent = "Subject";
  newSubOption.selected = true;
  selectSubjectElement.appendChild(newSubOption);
  fetch(`/semesters?branch=${branch}&semester=${semester}`)
    .then((response) => response.json())
    .then((data) => {
      data.subjects?.forEach((sub) => {
        const option = document.createElement("option");
        option.value = sub?.subject?._id;
        option.classList.add("text-uppercase");
        option.textContent = sub?.subject?.subjectFullName;
        selectSubjectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

function exportFailedResultsToExcel() {
  const semester = document.getElementById("semester").value;
  const division = document.getElementById("division").value;
  const subject = document.getElementById("subject").value;
  const branch = document.getElementById("branch").value;
  const batch = document.getElementById("batch").value;
  fetch(`/result?is_download=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      semester,
      division,
      subject,
      branch,
      batch,
    }),
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function downloadResult() {
  fetch(`/result?${window.location.href.split("?")[1]}&is_download=true`)
    .then((response) => {
      if (!response.ok) throw new Error("File not found");
      console.log("responseresponse", response);
      return response.blob();
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "";
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch((error) => console.error("Download error:", error));
}

function downloadResultFormat() {
  const semester = document.getElementById("semester").value;
  const branch = document.getElementById("branch").value;
  fetch(`/result-download-format?semester=${semester}&branch=${branch}`)
    .then((response) => {
      if (!response.ok) throw new Error("File not found");
      return response.blob();
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "";
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch((error) => console.error("Download error:", error));
}
