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
  const table = document.querySelector("table");
  const rows = Array.from(table.querySelectorAll(".failed"));

  const failedRows = Array.from(rows).filter((row) => {
    const subMarks = parseInt(row.querySelector(".subMarks").textContent);
    return subMarks < 12;
  });

  const absentRows = Array.from(rows).filter((row) => {
    const abMarks = row.querySelector(".subMarks").textContent;
    if (abMarks == "AB") {
      return abMarks;
    }
  });

  const table1 = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const titleArray = [
    "Enrollment No",
    "Student Name",
    "Subject Name",
    "Result",
  ];
  titleArray.forEach((title) => {
    const th = document.createElement("th");
    const boldTitle = document.createElement("strong");
    boldTitle.innerText = title;
    th.appendChild(boldTitle);
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table1.appendChild(thead);
  const tbody = document.createElement("tbody");

  for (let i = failedRows.length - 1; i >= 0; i--) {
    tbody.insertBefore(failedRows[i], tbody.firstChild);
  }

  table1.appendChild(tbody);

  for (let i = absentRows.length - 1; i >= 0; i--) {
    tbody.insertBefore(absentRows[i], tbody.firstChild);
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(table1);

  ws["!ref"] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: failedRows.length + 1, c: 3 },
  });
  ws["!cols"] = [
    { wpx: 120, align: "center" },
    { wpx: 280, align: "center" },
    { wpx: 280, align: "center" },
    { wpx: 90, align: "center" },
  ];
  ws["!rows"] = failedRows.map(() => ({ height: 20, hidden: false }));
  ws["!rows"].forEach((row) => (row["customHeight"] = true));
  ws["!rows"].forEach((row) => (row["verticalCentered"] = true));

  XLSX.utils.book_append_sheet(wb, ws, "Failed Results");

  XLSX.writeFile(wb, "failed_results.xlsx");
}
