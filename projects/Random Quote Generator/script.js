// console.log('Connected to server')

// let paragraph = document.getElementsByClassName("quote");
// let button = document.getElementsByClassName("button");

const container = document.getElementById("container");
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

			paragraph.innerHTML = `"${quote.text}"`;
			const authorName = document.createElement("p");
			if (!quote.author) {
				authorName.innerText = `—— No author ——`;
			}
			else
				authorName.innerText = `————— ${quote.author} —————`;
				
			paragraph.append(authorName);

			button.innerText = "Show Another Quote";

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
