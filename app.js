// script.js
const db = firebase.database();

// Add Member
document.getElementById("addMemberBtn")?.addEventListener("click", function() {
    const memberId = document.getElementById("memberId").value;
    const memberName = document.getElementById("memberName").value;
    const feePackage = document.getElementById("feePackage").value;

    db.ref('members/' + memberId).set({
        name: memberName,
        feePackage: feePackage,
        bills: []
    }).then(() => {
        alert("Member added successfully!");
        document.getElementById("memberId").value = '';
        document.getElementById("memberName").value = '';
        document.getElementById("feePackage").value = '';
    });
});

// Create Bill
document.getElementById("createBillBtn")?.addEventListener("click", function() {
    const memberId = document.getElementById("billMemberId").value;
    const billAmount = document.getElementById("billAmount").value;

    db.ref('members/' + memberId + '/bills').push(billAmount).then(() => {
        alert("Bill created successfully!");
        document.getElementById("billMemberId").value = '';
        document.getElementById("billAmount").value = '';
    });
});

// View Receipts
document.getElementById("viewReceiptsBtn")?.addEventListener("click", function() {
    const memberId = document.getElementById("viewMemberId").value;
    const receiptsDisplay = document.getElementById("receiptsDisplay");
    receiptsDisplay.innerHTML = ''; // Clear previous receipts

    db.ref('members/' + memberId + '/bills').once('value').then((snapshot) => {
        const bills = snapshot.val();
        if (bills) {
            for (let key in bills) {
                const billAmount = bills[key];
                receiptsDisplay.innerHTML += `<p>Bill Amount: $${billAmount}</p>`;
            }
        } else {
            receiptsDisplay.innerHTML = "<p>No receipts found.</p>";
        }
    });
});
