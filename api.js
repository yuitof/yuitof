const url = 'http://localhost:3000/forms'

async function sendEmail(data) {
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer secret"
        },
        body: JSON.stringify(data),
    });
    console.log(result);
}

module.exports = { sendEmail };