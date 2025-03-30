// window.onload = async function () {
//     // Access the table by its ID
//     var table = document.getElementById("my-booking-list");
//     async function getData() {
//         // return new Promise(function (resolve, reject) {
//         fetch("/getmybookings/gbar999", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 data.forEach(function (item) {
//                     var row = createTableRow(item);
//                     table.appendChild(row);
//                 });
//                 managePagination();
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//             });
//     }
//     // Function to dynamically create table rows
//     function createTableRow(data) {
//         // Create the "Approve" button
//         // var approveButton = document.createElement("button");
//         // approveButton.type = "button";
//         // approveButton.className = "btn btn-primary btn-sm btn-dark";
//         // approveButton.textContent = "Approve";
//         // approveButton.setAttribute("data-bs-toggle", "modal");
//         // approveButton.setAttribute("data-bs-target", "#confirmApproveModal");

//         // Create the "Reject" button
//         // var rejectButton = document.createElement("button");
//         // rejectButton.type = "button";
//         // rejectButton.className = "btn btn-primary btn-sm btn-dark";
//         // rejectButton.textContent = "Reject";
//         // rejectButton.setAttribute("data-bs-toggle", "modal");
//         // rejectButton.setAttribute("data-bs-target", "#confirmRejectModal");

//         // Create the "Cancel" button
//         var deleteButton = document.createElement("a");
//         // deleteButton.type = "button";
//         deleteButton.href="javscript:void(0);";
//         deleteButton.className = "me-2 w-10";
//         // deleteButton.textContent = "Delete";
//         deleteButton.setAttribute("data-bs-toggle", "modal");
//         deleteButton.setAttribute("data-bs-target", "#confirmDeleteModal");

//         var iconDelete = document.createElement("i");
//         iconDelete.className   =   "fa-regular fa-calendar-xmark";
//         deleteButton.appendChild(iconDelete);
        
//         /**edit button */
//         var editButton = document.createElement("a");
//         editButton.href="javscript:void(0);";
//         editButton.className = "me-2 w-10";
//         editButton.setAttribute("data-bs-toggle", "modal");
//         editButton.setAttribute("data-bs-target", "#confirmApproveModal");
        
//         var iconEdit = document.createElement("i");
//         iconEdit.className   =   "fa-regular fa-pen-to-square";
//         editButton.appendChild(iconEdit);
//         /**Edit Button */        



//         // Create the "Cancel" button
//         var incidentButton = document.createElement("button");
//         incidentButton.type = "button";
//         incidentButton.className = "btn btn-primary btn-sm btn-dark";
//         incidentButton.textContent = "Incident";
//         incidentButton.setAttribute("data-bs-toggle", "modal");
//         incidentButton.setAttribute("data-bs-target", "#confirmIncidentModal");
//         var row = document.createElement("tr");
//         row.className	= "row-item";
//         // Define the order and names of the table columns
//         var columns = ["startTime", "equipmentid","equipmentid","equipmentid", "status", "bookedBy", "startTime", "endTime", "action"];
//         columns.forEach(function (columnName) {
//             var cell = document.createElement("td");
//             if(columnName == "equipmentid"){
//                 let anchor = document.createElement("a");
//                 anchor.className	= "text-decoration-none";
//                 anchor.setAttribute("href", "/equipmentDetail/"+data[columnName]);
//                 anchor.textContent = data[columnName];
//                 cell.appendChild(anchor);
//             }
//             else if(columnName == "status"){
//                 let span 	= document.createElement("span");
//                 let status	= "";
//                 if(data[columnName]=="Available"){
//                     status	=	"primary";
//                 }else if(data[columnName]=="Approved"){
//                     status	=	"success";
//                 }else if(data[columnName]=="Returned"){
//                     status	=	"secondary";
//                 }else if(data[columnName]=="Overdue"){
//                     status	=	"warning";
//                 }else if(data[columnName]=="Rejected"){
//                     status	=	"danger";
//                 }else{
//                     status	=	"dark";
//                 }
//                 span.className	= "badge bg-"+status+" bold-text";
//                 span.textContent = data[columnName];
//                 cell.appendChild(span);
//             }
//             else if(columnName == "action"){
//                 if(data["status"]=="Available"){
//                     cell.appendChild(editButton);
//                     // cell.appendChild(rejectButton);
//                 }else if(data["status"]=="Approved"){
//                     cell.appendChild(deleteButton);
//                 }else if(data["status"]=='Rejected'){
//                     cell.appendChild(deleteButton);
//                 }else if(data["status"]=='Incident'){
//                     cell.appendChild(incidentButton);
//                 }else{
//                     cell.appendChild(editButton);
//                     // cell.appendChild(rejectButton);
//                     cell.appendChild(deleteButton);
//                 }
//             }
//             else if(columnName=='endtime'){
//                 const currentDate = new Date();
//                 const endDate = new Date(data[columnName]);
//                 if (currentDate > endDate) {
//                     let span = document.createElement("span");
//                     span.className	= "bg-danger date-passed";
//                     span.textContent = data[columnName];
//                     cell.appendChild(span);
//                 }else{
//                     cell.textContent = data[columnName];
//                 }
//             }
//             else{
//                 cell.textContent = data[columnName];
//             }
//             row.appendChild(cell);
//         });
//         return row;
//     }
//     getData();
//     /** pagination starts */
//     const managePagination = ()=>{
//         const paginationNumbers = document.getElementById("pagination-numbers");
//         var paginatedList = document.querySelector("#my-booking-list");
//         var listItems = paginatedList.querySelectorAll(".row-item");
//         const nextButton = document.getElementById("next-button");
//         const prevButton = document.getElementById("prev-button");
//         const paginationLimit = 5;
//         const pageCount = Math.ceil(listItems.length / paginationLimit);

//         let currentPage = 1;
//         const appendPageNumber = (index) => {
//             const pageNumber = document.createElement("button");
//             pageNumber.className = "pagination-number";
//             pageNumber.innerHTML = index;
//             pageNumber.setAttribute("page-index", index);
//             pageNumber.setAttribute("aria-label", "Page " + index);
//             paginationNumbers.appendChild(pageNumber);
//         };
//         const getPaginationNumbers = () => {
//             for (let i = 1; i <= pageCount; i++) {
//                 appendPageNumber(i);
//             }
//         };
    
//         const setCurrentPage = (pageNum) => {
//             currentPage = pageNum;
//             handleActivePageNumber();
//             const prevRange = (pageNum - 1) * paginationLimit;
//             const currRange = pageNum * paginationLimit;
//             listItems.forEach((item, index) => {
//                 item.classList.add("hidden");
//                 item.classList.remove("element-to-scroll");
//                 if (index == prevRange) {
//                     item.classList.add("element-to-scroll");
//                 }
//                 if (index >= prevRange && index < currRange) {
//                     item.classList.remove("hidden");
//                 }
//             });
//         };
    
//         const handleActivePageNumber = () => {
//             document.querySelectorAll(".pagination-number").forEach((button) => {
//                 button.classList.remove("active-pagination");
    
//                 const pageIndex = Number(button.getAttribute("page-index"));
//                 if (pageIndex == currentPage) {
//                     button.classList.add("active-pagination");
//                 }
//             });
//         };
    
//         getPaginationNumbers();
//         setCurrentPage(1);
    
//         document.querySelectorAll(".pagination-number").forEach((button) => {
//             const pageIndex = Number(button.getAttribute("page-index"));
//             if (pageIndex) {
//                 button.addEventListener("click", () => {
//                     setCurrentPage(pageIndex);
//                     const elementToScroll =
//                         document.querySelector(".element-to-scroll");
//                     if (elementToScroll) {
//                         const yOffset = 175;
//                         window.scrollTo({
//                             top: elementToScroll.offsetTop - yOffset,
//                             behavior: "smooth",
//                         });
//                     }
//                 });
//             }
//         });
//     }
//     /** pagination ends */
// };


window.onload = async function () {
    // Access the table by its ID
    var table = document.getElementById("my-booking-list");
    async function getData() {
        // return new Promise(function (resolve, reject) {
        fetch("/getmybookings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.forEach(function (item) {
                    var row = createTableRow(item);
                    table.appendChild(row);
                });
                managePagination();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    // Function to dynamically create table rows
    function createTableRow(data) {
        // Create the "Approve" button
        var approveButton = document.createElement("button");
        approveButton.type = "button";
        approveButton.className = "btn btn-primary btn-sm btn-dark";
        approveButton.textContent = "Approve";
        approveButton.onclick = function() {
            approveBooking(data['id'])
        };
        // approveButton.setAttribute("data-bs-toggle", "modal");
        // approveButton.setAttribute("data-bs-target", "#confirmApproveModal");

        // Create the "Reject" button
        var rejectButton = document.createElement("button");
        rejectButton.type = "button";
        rejectButton.className = "btn btn-primary btn-sm btn-dark";
        rejectButton.textContent = "Reject";
        rejectButton.onclick = function() {
            rejectBooking(data['id'])
        };
        // rejectButton.setAttribute("data-bs-toggle", "modal");
        // rejectButton.setAttribute("data-bs-target", "#confirmRejectModal");

        // Create the "Cancel" button
        var deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "btn btn-primary btn-sm btn-dark";
        deleteButton.textContent = "Delete";
        deleteButton.id = `delete-${data['id']}`;
        deleteButton.onclick = function() {
            deleteBooking(data['id'])
        };
       // deleteButton.setAttribute("data-bs-toggle", "modal");
        //deleteButton.setAttribute("data-bs-target", "#confirmDeleteModal");
        // Create the "Return" button
        var returnButton = document.createElement("button");
        returnButton.type = "button";
        returnButton.className = "btn btn-primary btn-sm btn-dark";
        returnButton.textContent = "Return";
        returnButton.onclick = function() {
            returnBooking(data['id'])
        };
        // Create the "Cancel" button
        var incidentButton = document.createElement("button");
        incidentButton.type = "button";
        incidentButton.className = "btn btn-primary btn-sm btn-dark";
        incidentButton.textContent = "Incident";
        incidentButton.setAttribute("data-bs-toggle", "modal");
        incidentButton.setAttribute("data-bs-target", "#confirmIncidentModal");
        var row = document.createElement("tr");
        row.className	= "row-item";
        // Define the order and names of the table columns
        var columns = ["starttime", "id", "status", "bookedby", "starttime", "endtime", "action"];
        columns.forEach(function (columnName) {
            var cell = document.createElement("td");
            if(columnName == "id"){
                let anchor = document.createElement("a");
                anchor.className	= "text-decoration-none";
                anchor.setAttribute("href", "/viewBooking/" + data[columnName]);
                anchor.textContent = data[columnName];
                cell.appendChild(anchor);
            }
            else if(columnName == "status"){
                let span 	= document.createElement("span");
                let status	= "";
                if(data[columnName]=="Available"){
                    status	=	"primary";
                }else if(data[columnName]=="Approved"){
                    status	=	"success";
                }else if(data[columnName]=="Returned"){
                    status	=	"secondary";
                }else if(data[columnName]=="Requested"){
                    status	=	"warning";
                }else if(data[columnName]=="Overdue"){
                    status	=	"danger";
                }else if(data[columnName]=="Rejected"){
                    status	=	"danger";
                }else{
                    status	=	"dark";
                }
                span.className	= "badge bg-"+status+" bold-text";
                span.textContent = data[columnName];
                cell.appendChild(span);
            }
            else if(columnName == "action"){
                if(data["status"]=="Requested"){
                    cell.appendChild(approveButton);
                    cell.appendChild(rejectButton);
                }else if(data["status"]=="Maintenance"){
                    cell.appendChild(deleteButton);
                }else if(data["status"]=="Approved"){
                    cell.appendChild(incidentButton);
                    cell.appendChild(returnButton);
                }else if(data["status"]=='Rejected'){
                    cell.appendChild(deleteButton);
                }else if(data["status"]=='Cancelled'){
                    cell.appendChild(deleteButton);
                }else if(data["status"]=='Returned'){
                    cell.appendChild(deleteButton);
                }else if(data["status"]=='Incident'){
                    cell.style.display = 'none';
                }else if(data["status"]=='Overdue'){
                    cell.appendChild(incidentButton);
                }else{
                    cell.appendChild(approveButton);
                    cell.appendChild(rejectButton);
                    cell.appendChild(deleteButton);
                }
            }
            else if(columnName=='endtime'){
                const currentDate = new Date();
                const endDate = new Date(data[columnName]);
                if (currentDate > endDate) {
                    let span = document.createElement("span");
                    span.className	= "bg-danger date-passed";
                    span.textContent = data[columnName];
                    cell.appendChild(span);
                }else{
                    cell.textContent = data[columnName];
                }
            }
            else{
                cell.textContent = data[columnName];
            }
            row.appendChild(cell);
        });
        return row;
    }
    getData();
    /** pagination starts */
    const managePagination = ()=>{
        const paginationNumbers = document.getElementById("pagination-numbers");
        var paginatedList = document.querySelector("#all-booking-list");
        var listItems = paginatedList.querySelectorAll(".row-item");
        const nextButton = document.getElementById("next-button");
        const prevButton = document.getElementById("prev-button");
        const paginationLimit = 5;
        const pageCount = Math.ceil(listItems.length / paginationLimit);
        let currentPage = 1;
        const appendPageNumber = (index) => {
            const pageNumber = document.createElement("button");
            pageNumber.className = "pagination-number";
            pageNumber.innerHTML = index;
            pageNumber.setAttribute("page-index", index);
            pageNumber.setAttribute("aria-label", "Page " + index);
            paginationNumbers.appendChild(pageNumber);
        };
        const getPaginationNumbers = () => {
            for (let i = 1; i <= pageCount; i++) {
                appendPageNumber(i);
            }
        };
    
        const setCurrentPage = (pageNum) => {
            currentPage = pageNum;
            handleActivePageNumber();
            const prevRange = (pageNum - 1) * paginationLimit;
            const currRange = pageNum * paginationLimit;
            listItems.forEach((item, index) => {
                item.classList.add("hidden");
                item.classList.remove("element-to-scroll");
                if (index == prevRange) {
                    item.classList.add("element-to-scroll");
                }
                if (index >= prevRange && index < currRange) {
                    item.classList.remove("hidden");
                }
            });
        };
    
        const handleActivePageNumber = () => {
            document.querySelectorAll(".pagination-number").forEach((button) => {
                button.classList.remove("active-pagination");
    
                const pageIndex = Number(button.getAttribute("page-index"));
                if (pageIndex == currentPage) {
                    button.classList.add("active-pagination");
                }
            });
        };
    
        getPaginationNumbers();
        setCurrentPage(1);
    
        document.querySelectorAll(".pagination-number").forEach((button) => {
            const pageIndex = Number(button.getAttribute("page-index"));
            if (pageIndex) {
                button.addEventListener("click", () => {
                    setCurrentPage(pageIndex);
                    const elementToScroll =
                        document.querySelector(".element-to-scroll");
                    if (elementToScroll) {
                        const yOffset = 175;
                        window.scrollTo({
                            top: elementToScroll.offsetTop - yOffset,
                            behavior: "smooth",
                        });
                    }
                });
            }
        });
    }
    /** pagination ends */
    /** ACTION BUTTONS */
    var selectedBookingId   =   0;
    function showHideModal(modal){
        modal.toggle();
        selectedBookingId = 0
    }
    /** Delete Action */
    const deleteModalElem =   document.querySelector('#confirmDeleteModal');
    deleteModal           =   new window.bootstrap.Modal(deleteModalElem);
    deleteBooking = (id)=> {
        showHideModal(deleteModal);
        selectedBookingId   =   id;
    }
    confirmDelete = () =>{
        fetch("/deleteBooking/" + selectedBookingId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response from the backend
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        showHideModal(deleteModal);
    }
    /** Delete Action */

    /** Delete Action */
    const approveModalElem =   document.querySelector('#confirmApproveModal');
    approveModal           =   new window.bootstrap.Modal(approveModalElem);
    approveBooking = (id)=> {
        showHideModal(approveModal);
        selectedBookingId   =   id;
    }
    confirmApprove = () =>{
        fetch("/approveBooking/" + selectedBookingId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response from the backend
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        showHideModal(approveModal);
    }
    /** Delete Action */

    /** Reject Action */
    const rejectModalElem =   document.querySelector('#confirmRejectModal');
    rejectModal           =   new window.bootstrap.Modal(rejectModalElem);
    rejectBooking = (id)=> {
        showHideModal(rejectModal);
        selectedBookingId   =   id;
    }
    confirmReject = () =>{
        fetch("/rejectBooking/" + selectedBookingId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response from the backend
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        showHideModal(rejectModal);
    }
    /** Reject Action */

     /** Return Action */
     const returnModalElem =   document.querySelector('#confirmReturnModal');
     returnModal           =   new window.bootstrap.Modal(returnModalElem);
     returnBooking = (id)=> {
         showHideModal(returnModal);
         selectedBookingId   =   id;
     }
     confirmReturn = () =>{
         fetch("/returnBooking/" + selectedBookingId, {
             method: "PUT",
             headers: {
                 "Content-Type": "application/json",
             },
         })
         .then((response) => response.json())
         .then((data) => {
             // Handle the response from the backend
             console.log(data);
         })
         .catch((error) => {
             console.error("Error:", error);
         });
         showHideModal(returnModal);
     }
     /** Return Action */
};