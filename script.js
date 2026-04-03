let count = 0;

function addSubject(){

    count++;

    let div = document.createElement("div");

    div.innerHTML = `
    Course: <input id="s${count}" placeholder="Course Name">

    Grade:
    <select id="g${count}">
        <option value="4.00">A+</option>
        <option value="4.00">A</option>
        <option value="3.70">A-</option>
        <option value="3.30">B+</option>
        <option value="3.00">B</option>
        <option value="2.70">B-</option>
        <option value="2.30">C+</option>
        <option value="2.00">C</option>
        <option value="1.70">C-</option>
        <option value="1.30">D+</option>
        <option value="1.00">D</option>
        <option value="0.00">E</option>
    </select>

    Credits: <input id="c${count}" type="number">

    <hr>
    `;

    document.getElementById("subjects").appendChild(div);
}


function calculateGPA(){

        let totalPoints = 0;
    let totalCredits = 0;
    let table = "";

    for(let i=1;i<=count;i++){

        let name = document.getElementById("s"+i)?.value;
        let gradeSelect = document.getElementById("g"+i);
        let gradeText = gradeSelect?.selectedOptions[0].text;
        let gp = Number(gradeSelect?.value);
        let c = Number(document.getElementById("c"+i)?.value);

        if(!c || c<=0 || name==="") continue;

        totalPoints += gp * c;
        totalCredits += c;

        // 👉 TABLE ROW ADD
        table += `
        <tr>
            <td>${name}</td>
            <td>${gradeText}</td>
            <td>${c}</td>
        </tr>`;
    }

    if(totalCredits === 0){
        alert("Enter credits!");
        return;
    }

    let gpa = (totalPoints/totalCredits).toFixed(2);
    let grade = getClass(Number(gpa));

    // 👉 RESULT UPDATE
    document.getElementById("resultSubjects").innerHTML = table;

    document.getElementById("rname").innerText =
        document.getElementById("name").value;

    document.getElementById("rclass").innerText =
        document.getElementById("className").value;

    document.getElementById("rsem").innerText =
        document.getElementById("semester").value;

    document.getElementById("rgpa").innerText = gpa;
    document.getElementById("rgrade").innerText = grade;
}
      



function getClass(gpa){

    if(gpa>=3.70) return "First Class";
    if(gpa>=3.30) return "Second Upper";
    if(gpa>=3.00) return "Second Lower";
    if(gpa>=2.00) return "Pass";
    return "Fail";
}
let gpaText = document.getElementById("rgpa");

if(gpa >= 3.7) gpaText.style.color = "green";
else if(gpa >= 3.0) gpaText.style.color = "orange";
else gpaText.style.color = "red";


/* IMAGE DOWNLOAD */
function downloadImage(){

    html2canvas(document.getElementById("resultCard"))
    .then(canvas => {

        let link = document.createElement("a");
        link.download = "result.png";
        link.href = canvas.toDataURL();
        link.click();

    });
}


/* PDF DOWNLOAD */
async function downloadPDF(){

    const { jsPDF } = window.jspdf;

    let canvas = await html2canvas(document.getElementById("resultCard"));

    let img = canvas.toDataURL("image/png");

    let pdf = new jsPDF();

    pdf.addImage(img,'PNG',10,10,180,120);

    pdf.save("result.pdf");
}
function resetAll(){

    // Clear all subjects
    document.getElementById("subjects").innerHTML = "";

    // Reset counter
    count = 0;

    // Clear student details
    document.getElementById("name").value = "";
    document.getElementById("className").value = "";
    document.getElementById("semester").value = "";
    document.getElementById("rsem").innerText = "";

    // Clear result
    document.getElementById("rname").innerText = "";
    document.getElementById("rclass").innerText = "";
    document.getElementById("rgpa").innerText = "";
    document.getElementById("rgrade").innerText = "";
}
