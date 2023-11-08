
//buying ticket section
const buyTicket = document.getElementById("buy-tickets-button")
const ticketsBought = document.getElementById("tickets-bought")

//exhibit details
const title = document.getElementById("exhibit-title");
const img = document.getElementById("exhibit-image");
const description = document.getElementById("exhibit-description");
const commentSection = document.getElementById("comments-section");

//comment section
const addComment = document.getElementById("comment-form");
const comment = document.getElementById("comment-value");


fetch("http://localhost:3000/current-exhibits")
    .then((res) => res.json())
    .then((data) => {
        console.log(data[0]);
        renderExhibit(data[0]);
    })


function renderExhibit(exhibit) {
    title.textContent = exhibit.title;
    img.src = exhibit.image;
    description.textContent = exhibit.description;

    // const comments = exhibit.comments;
    const comments = exhibit.comments;

    comments.forEach(renderComments);



    addComment.addEventListener("submit", function(e) {
        e.preventDefault();
        const newComment = document.createElement("p");
        comments.push(comment.value);
        newComment.textContent = comment.value;
        commentSection.append(newComment);

        fetch("http://localhost:3000/current-exhibits/" + exhibit.id, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "comments": comments,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
        });
        addComment.reset();
    })

    
    let num = exhibit.tickets_bought;
    ticketsBought.textContent = `${num} Tickets Bought`;
    buyTicket.addEventListener("click", function() {
        num++;

        fetch("http://localhost:3000/current-exhibits/" + exhibit.id, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                "tickets_bought": num,
        }),
    }) 
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            ticketsBought.textContent = `${data.tickets_bought} Tickets Bought`;
        });
    })
    
}

function renderComments(comment) {
    const newComment = document.createElement("p")
    newComment.textContent = comment;
    commentSection.append(newComment);
}
