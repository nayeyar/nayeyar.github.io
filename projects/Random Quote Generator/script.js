// console.log('Connected to server')

// let paragraph = document.getElementsByClassName("quote");
// let button = document.getElementsByClassName("button");

const paragraph = document.getElementById("quote");
const button = document.getElementById("button");

//create a async function that will display the quote

const getQuote = async () => {
	try {
		const response = await fetch("https://type.fit/api/quotes");

		if (response.ok) {
			const jsonQuote = await response.json();
			let randomNum = Math.floor(Math.random() * jsonQuote.length);
			// console.log(jsonQuote);
			// console.log(typeof jsonQuote[randomNum]);

			const quote = jsonQuote[randomNum];
			console.log(quote);

			paragraph.innerHTML = quote.text;
			// const addParagraph = document.createElement("p");
			// const authorName = document.createTextNode(quote.author);
			// addParagraph.appendChild(authorName);

			// return jsonQuote[randomNum];
		} else throw new Error("Request failed!");
	} catch (error) {
		console.log(error);
	}
};

button.onclick = getQuote;

// getQuote().then(value => console.log(value));

// const showQuote = () => {
//     getQuote().then(value => paragraph.innerHTML = value.text);
// };

// button.addEventListener("click", getQuote);
